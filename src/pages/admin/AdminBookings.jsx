import { useState, useMemo, useEffect } from 'react'
import { ARC_CONTENT } from '../../data/arcs/index'
import { ARCS } from '../../data/worldTour/arcs'
import { getContentBookings, setContentBookings } from '../../services/cms/index'
import { resolveContentBookings } from '../../services/contentResolver/index'

// ── Merge bundled ARC_CONTENT bookings + CMS overrides ───────────────────────
// Admin-only editorial fields (cmsStatus, confirmationNo, amountPaid,
// bookingLink, cmsNotes) don't exist in the bundled data at all — they live
// only in the CMS override, layered on top of each bundled booking item.

function loadBookings(arcYear) {
  const bundled = ARC_CONTENT[arcYear]?.bookings || []
  const cms = getContentBookings(arcYear)
  if (!cms?.items?.length) return bundled.map(b => ({ ...b }))
  return resolveContentBookings(arcYear, bundled)
}

// ── Priority colors ───────────────────────────────────────────────────────────

const PRIORITY_COLORS = {
  critical: '#b5451b',
  high:     '#C9954C',
  medium:   '#2e7d32',
  low:      'var(--ink4)',
}

const CATEGORY_LABELS = {
  document: 'Document', transport: 'Transport', experience: 'Experience',
  accommodation: 'Stay', insurance: 'Insurance', activity: 'Activity',
}

// ── Status options ────────────────────────────────────────────────────────────

const STATUS_OPTS = ['pending', 'in-progress', 'done', 'skipped']

const INPUT = {
  padding: '6px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
  background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
}

// ── Booking row ───────────────────────────────────────────────────────────────

function BookingRow({ booking, onUpdate }) {
  const [expanded, setExpanded] = useState(false)
  const statusColor = {
    done: '#2e7d32', 'in-progress': '#C9954C', pending: 'var(--ink4)', skipped: 'var(--ink3)',
  }[booking.cmsStatus || 'pending']

  return (
    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surf)' }}>
      {/* Row */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer' }}
        onClick={() => setExpanded(v => !v)}
      >
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
          background: PRIORITY_COLORS[booking.priority] || 'var(--ink4)',
          color: '#fff', padding: '2px 5px', flexShrink: 0, textTransform: 'uppercase',
        }}>
          {booking.priority}
        </span>

        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', flexShrink: 0, minWidth: 80,
        }}>
          {CATEGORY_LABELS[booking.category] || booking.category}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {booking.label}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 1 }}>
            {booking.window?.start} → {booking.window?.end}
          </div>
        </div>

        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: statusColor, flexShrink: 0 }}>
          {(booking.cmsStatus || 'pending').toUpperCase()}
        </span>

        {booking.confirmationNo && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', flexShrink: 0 }}>
            #{booking.confirmationNo}
          </span>
        )}

        <span style={{ color: 'var(--ink4)', fontSize: 11 }}>{expanded ? '▾' : '▸'}</span>
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{ padding: '10px 16px 14px', borderTop: '1px solid var(--border)', background: 'var(--paper)' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Status</label>
              <select
                style={{ ...INPUT, width: '100%', cursor: 'pointer' }}
                value={booking.cmsStatus || 'pending'}
                onChange={e => onUpdate(booking.id, 'cmsStatus', e.target.value)}
              >
                {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Confirmation No.</label>
              <input
                style={{ ...INPUT, width: '100%', boxSizing: 'border-box' }}
                value={booking.confirmationNo || ''}
                onChange={e => onUpdate(booking.id, 'confirmationNo', e.target.value)}
                placeholder="e.g. AB-123456"
              />
            </div>

            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Amount Paid</label>
              <input
                style={{ ...INPUT, width: '100%', boxSizing: 'border-box' }}
                value={booking.amountPaid || ''}
                onChange={e => onUpdate(booking.id, 'amountPaid', e.target.value)}
                placeholder="₹0"
              />
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Booking Link</label>
            <input
              style={{ ...INPUT, width: '100%', boxSizing: 'border-box' }}
              value={booking.bookingLink || ''}
              onChange={e => onUpdate(booking.id, 'bookingLink', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Notes</label>
            <textarea
              style={{ ...INPUT, width: '100%', boxSizing: 'border-box', minHeight: 52, resize: 'vertical', fontSize: 11 }}
              value={booking.cmsNotes || booking.notes || ''}
              onChange={e => onUpdate(booking.id, 'cmsNotes', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminBookings({ arcYear = ARCS[0].year }) {
  const [bookings, setBookingsState] = useState(() => loadBookings(arcYear))
  const [catFilter, setCatFilter]    = useState('')
  const [statusFilter, setStatus]    = useState('')
  const [saved, setSaved]            = useState(false)

  // Reload when the selected arc changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookingsState(loadBookings(arcYear))
  }, [arcYear])

  const cats = useMemo(() => [...new Set(bookings.map(b => b.category))], [bookings])

  const filtered = useMemo(() => bookings.filter(b => {
    const matchCat    = !catFilter    || b.category       === catFilter
    const matchStatus = !statusFilter || (b.cmsStatus || 'pending') === statusFilter
    return matchCat && matchStatus
  }), [bookings, catFilter, statusFilter])

  const handleUpdate = (id, key, val) => {
    setBookingsState(prev => prev.map(b => b.id === id ? { ...b, [key]: val } : b))
  }

  const handleSave = () => {
    setContentBookings(arcYear, { items: bookings })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const done        = bookings.filter(b => b.cmsStatus === 'done').length
  const inProgress  = bookings.filter(b => b.cmsStatus === 'in-progress').length
  const critical    = bookings.filter(b => b.priority === 'critical' && b.cmsStatus !== 'done').length

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'var(--surf)', zIndex: 10,
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 4 }}>
            Booking Editor — {ARCS.find(a => a.year === arcYear)?.title || arcYear}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
              {bookings.length} Bookings
            </div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#2e7d32' }}>{done} done</span>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#C9954C' }}>{inProgress} in progress</span>
            {critical > 0 && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#b5451b' }}>{critical} critical pending</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {saved && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32', alignSelf: 'center' }}>✓ Saved</span>}
          <button onClick={handleSave} style={{
            background: 'var(--ink)', color: 'var(--surf)', border: 'none',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            Save
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        padding: '10px 24px', borderBottom: '1px solid var(--border)',
        display: 'flex', gap: 8, background: 'var(--paper)',
      }}>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{
          padding: '5px 8px', fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          border: '1px solid var(--border)', background: 'var(--surf)', color: 'var(--ink)', cursor: 'pointer',
        }}>
          <option value="">All categories</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={statusFilter} onChange={e => setStatus(e.target.value)} style={{
          padding: '5px 8px', fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          border: '1px solid var(--border)', background: 'var(--surf)', color: 'var(--ink)', cursor: 'pointer',
        }}>
          <option value="">All statuses</option>
          {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', alignSelf: 'center' }}>
          {filtered.length} shown
        </span>
      </div>

      {/* List */}
      <div>
        {filtered.map(b => (
          <BookingRow key={b.id} booking={b} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  )
}
