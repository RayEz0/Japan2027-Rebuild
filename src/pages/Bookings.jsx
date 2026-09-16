import { useState, useEffect } from 'react'
import { useBookings }  from '../hooks/useBookings'
import { useTravel } from '../context/TravelContext'
import { useResolvedContent } from '../hooks/useResolvedContent'

function getBookingStatus(item, doneIds) {
  if (doneIds.includes(item.id)) return 'done'
  const now = new Date()
  const year = now.getFullYear(), month = now.getMonth() + 1
  const [sy, sm] = item.window.start.split('-').map(Number)
  const [ey, em] = item.window.end.split('-').map(Number)
  const afterStart = year > sy || (year === sy && month >= sm)
  const beforeEnd  = year < ey || (year === ey && month <= em)
  if (afterStart && beforeEnd) return 'active'
  if (year > ey || (year === ey && month > em)) return 'overdue'
  return 'upcoming'
}

function formatWindow(item) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const [sy, sm] = item.window.start.split('-').map(Number)
  const [ey, em] = item.window.end.split('-').map(Number)
  const startLabel = `${months[sm - 1]} ${sy}`
  const endLabel   = `${months[em - 1]} ${ey}`
  return sm === em && sy === ey ? startLabel : `${startLabel} – ${endLabel}`
}

const STATUS_STYLES = {
  done:     { tagColor: '#2e7d32',        tagBg: '#e8f5e9',          label: 'Done ✓'  },
  active:   { tagColor: 'var(--accent)',  tagBg: 'var(--accent-bg)', label: 'Book Now' },
  overdue:  { tagColor: 'var(--accent)',  tagBg: 'var(--accent-bg)', label: 'Overdue'  },
  upcoming: { tagColor: 'var(--ink3)', tagBg: 'transparent', label: 'Upcoming' },
}

const CATEGORY_LABELS = {
  document:      { label: 'Document',    color: '#D8E6F2' },
  transport:     { label: 'Transport',   color: '#DCE8DD' },
  experience:    { label: 'Experience',  color: '#F4D6D6' },
  accommodation: { label: 'Stay',        color: '#E8DCC7' },
  setup:         { label: 'Setup',       color: '#EFEDE7' },
  gear:          { label: 'Gear',        color: '#E8E4D0' },
}

function BookingCard({ item, bookingData, doneIds, onToggle, onSetField, isMobile }) {
  const status   = getBookingStatus(item, doneIds)
  const styles   = STATUS_STYLES[status] || STATUS_STYLES.upcoming
  const catStyle = CATEGORY_LABELS[item.category] || {}
  const [open, setOpen] = useState(status === 'active' || status === 'overdue')

  const inputStyle = {
    width: '100%', border: 'none', borderBottom: '1px solid var(--border)',
    background: 'none', fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10.5, color: 'var(--ink)', padding: '4px 0', outline: 'none',
  }

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      background: bookingData.done ? 'var(--paper)' : 'var(--surf)',
    }}>
      {/* Card header */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={`${item.label} — click to ${open ? 'collapse' : 'expand'}`}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) } }}
        style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '20px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        {/* Done checkbox */}
        <div
          role="checkbox"
          tabIndex={0}
          aria-checked={bookingData.done}
          aria-label={`Mark ${item.label} as ${bookingData.done ? 'incomplete' : 'done'}`}
          onClick={(e) => { e.stopPropagation(); onToggle(item.id) }}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onToggle(item.id) } }}
          style={{
            padding: '5px', margin: '-5px',
            flexShrink: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            width: 20, height: 20,
            border: `1.5px solid ${bookingData.done ? 'var(--ink)' : 'var(--border)'}`,
            background: bookingData.done ? 'var(--ink)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.14s',
          }}>
            {bookingData.done && <span style={{ color: 'var(--surf)', fontSize: 11, lineHeight: 1 }}>✓</span>}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              letterSpacing: '0.8px', textTransform: 'uppercase',
              color: styles.tagColor, background: styles.tagBg,
              padding: '2px 6px',
              border: status === 'upcoming' ? '1px solid var(--border)' : 'none',
            }}>{styles.label}</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              letterSpacing: '0.5px', textTransform: 'uppercase',
              color: 'var(--ink3)', background: catStyle.color || 'var(--paper)',
              padding: '2px 6px',
            }}>{catStyle.label || item.category}</span>
            {item.priority === 'critical' && (
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                color: 'var(--accent)', border: '1px solid var(--accent)',
                padding: '2px 6px', letterSpacing: '0.5px',
              }}>CRITICAL</span>
            )}
          </div>

          <div style={{
            fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 500,
            color: bookingData.done ? 'var(--ink4)' : 'var(--ink)',
            textDecoration: bookingData.done ? 'line-through' : 'none',
            lineHeight: 1.2,
          }}>
            {item.label}
          </div>

          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            color: 'var(--ink3)', marginTop: 3,
          }}>
            {formatWindow(item)}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {bookingData.confirmRef && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: '#2e7d32', background: '#e8f5e9', padding: '2px 7px',
              maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              REF: {bookingData.confirmRef}
            </span>
          )}
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
            color: 'var(--ink3)', transform: open ? 'rotate(90deg)' : 'none',
            transition: 'transform 0.2s',
          }}>›</span>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{ padding: '16px 0 28px 36px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5 }}>Booking Link</div>
              <input
                style={inputStyle}
                placeholder="https://..."
                value={bookingData.link || ''}
                onChange={e => onSetField(item.id, 'link', e.target.value)}
              />
              {bookingData.link && (
                <a href={bookingData.link} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                  color: 'var(--ink3)', textDecoration: 'underline', marginTop: 4, display: 'block',
                }}>Open →</a>
              )}
            </div>
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5 }}>Confirmation Ref</div>
              <input
                style={inputStyle}
                placeholder="Booking ID / PNR / Reference"
                value={bookingData.confirmRef || ''}
                onChange={e => onSetField(item.id, 'confirmRef', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5 }}>Personal Notes</div>
            <textarea
              style={{
                width: '100%', border: '1px solid var(--border)',
                background: 'var(--paper)', fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10.5, color: 'var(--ink)', padding: '8px 10px',
                outline: 'none', resize: 'vertical', minHeight: 60, lineHeight: 1.6,
              }}
              placeholder="Add notes, deadlines, contacts..."
              value={bookingData.notes || ''}
              onChange={e => onSetField(item.id, 'notes', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Bookings() {
  const { get, setField, toggle, doneIds } = useBookings()
  const { activeArc: arc } = useTravel()
  const content = useResolvedContent()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 640)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const BOOKING_ITEMS = content?.bookings || []

  const doneCount  = BOOKING_ITEMS.filter(i => doneIds.includes(i.id)).length
  const totalCount = BOOKING_ITEMS.length
  const pct        = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  const activeItems  = BOOKING_ITEMS.filter(i => !doneIds.includes(i.id) && getBookingStatus(i, doneIds) === 'active')
  const overdueItems = BOOKING_ITEMS.filter(i => !doneIds.includes(i.id) && getBookingStatus(i, doneIds) === 'overdue')

  const heroImage = arc?.heroImage
    || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=70&auto=format&fit=crop'

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>Arc {arc?.no || '01'} — Roadmap</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Booking <em style={{ color: 'rgba(255,200,150,0.95)' }}>Tracker</em>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 52px 16px' }}>
        {/* Progress summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
              {doneCount}<span style={{ fontSize: 20, color: 'var(--ink3)' }}>/{totalCount}</span>
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: 3 }}>Completed</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase' }}>Progress</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink)' }}>{pct}%</div>
            </div>
            <div style={{ height: 3, background: '#E5E2DA' }}>
              <div style={{ height: '100%', background: 'var(--ink)', width: `${pct}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        {(activeItems.length > 0 || overdueItems.length > 0) && (
          <div style={{ marginBottom: 24 }}>
            {overdueItems.map(i => (
              <div key={i.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 14px', marginBottom: 4,
                borderLeft: '3px solid var(--accent)', background: '#FDF1EE',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>OVERDUE</span>
                <span style={{ color: 'var(--ink)' }}>{i.label}</span>
                <span style={{ color: 'var(--ink3)' }}>· {formatWindow(i)}</span>
              </div>
            ))}
            {activeItems.map(i => (
              <div key={i.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 14px', marginBottom: 4,
                borderLeft: '3px solid var(--ink)', background: 'var(--paper)',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
              }}>
                <span style={{ color: 'var(--ink)', fontWeight: 700 }}>BOOK NOW</span>
                <span style={{ color: 'var(--ink)' }}>{i.label}</span>
                <span style={{ color: 'var(--ink3)' }}>· {formatWindow(i)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking list */}
      <div style={{ padding: '0 52px 80px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', marginBottom: 12,
        }}>All Bookings — {arc?.title}</div>

        {BOOKING_ITEMS.length === 0 ? (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: 'var(--ink4)', padding: '32px 0', lineHeight: 2,
          }}>
            Booking roadmap not yet configured for this arc.
          </div>
        ) : BOOKING_ITEMS.map(item => (
          <BookingCard
            key={item.id}
            item={item}
            bookingData={get(item.id)}
            doneIds={doneIds}
            onToggle={toggle}
            onSetField={setField}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  )
}
