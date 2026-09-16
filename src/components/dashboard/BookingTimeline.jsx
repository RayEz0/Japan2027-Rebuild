import { useTravel } from '../../context/TravelContext'
import { useResolvedContent } from '../../hooks/useResolvedContent'
import { useBookings }  from '../../hooks/useBookings'

function fmtDate(str, opts) {
  if (!str) return ''
  const d = new Date(str.includes('T') ? str : str + 'T12:00:00')
  return isNaN(d) ? str : d.toLocaleDateString('en-GB', opts)
}

function getBookingStatus(item, doneIds = []) {
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
  done:     { node: 'done',   tagColor: '#2e7d32',     tagBg: '#e8f5e9',      label: 'Done ✓'   },
  active:   { node: 'active', tagColor: 'var(--accent)', tagBg: 'var(--accent-bg)', label: 'Book Now' },
  overdue:  { node: 'active', tagColor: 'var(--accent)', tagBg: 'var(--accent-bg)', label: 'Overdue'  },
  upcoming: { node: '',       tagColor: 'var(--ink3)', tagBg: 'transparent',  label: 'Upcoming' },
}

export default function BookingTimeline() {
  const { primaryTrip: trip } = useTravel()
  const content = useResolvedContent()
  const { doneIds, toggle } = useBookings()

  const bookingItems = content?.bookings || []

  if (!bookingItems.length) {
    return (
      <div style={{ padding: '32px 52px 40px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500, marginBottom: 12,
        }}>Booking Roadmap</div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: 'var(--ink4)', lineHeight: 2,
        }}>
          Booking timeline for {trip?.title || 'this arc'} is not configured yet.
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '32px 52px 48px', borderTop: '1px solid var(--border)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 28,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500,
        }}>
          Booking Roadmap
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: 'var(--ink3)',
        }}>
          {doneIds.length}/{bookingItems.length} completed
        </div>
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {bookingItems.map((item, i) => {
          const status  = getBookingStatus(item, doneIds)
          const style   = STATUS_STYLES[status] || STATUS_STYLES.upcoming
          const isLast  = i === bookingItems.length - 1
          const window_ = formatWindow(item)

          return (
            <div key={item.id} style={{ display: 'flex', marginBottom: 0 }}>
              {/* Left: date + node + line */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: 130, flexShrink: 0, paddingTop: 3,
              }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                  color: 'var(--ink3)', letterSpacing: '0.3px',
                  marginBottom: 8, textAlign: 'center', lineHeight: 1.4,
                  maxWidth: 110,
                }}>
                  {window_}
                </div>
                <div className={`tl-node${style.node ? ' ' + style.node : ''}`} />
                {!isLast && <div className="tl-line" />}
              </div>

              {/* Right: content */}
              <div style={{ flex: 1, paddingBottom: 24, paddingLeft: 16 }}>
                {/* Status tag */}
                <div style={{
                  display: 'inline-block',
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                  letterSpacing: '0.8px', textTransform: 'uppercase',
                  color: style.tagColor, background: style.tagBg,
                  padding: '2px 6px', marginBottom: 5,
                  border: status === 'upcoming' ? '1px solid var(--border)' : 'none',
                }}>
                  {style.label}
                  {item.priority === 'critical' && (
                    <span style={{ marginLeft: 4, color: 'var(--accent)' }}>·</span>
                  )}
                </div>

                {/* Title + toggle */}
                <div style={{
                  display: 'flex', alignItems: 'flex-start',
                  justifyContent: 'space-between', gap: 12,
                }}>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: 13.5, fontWeight: 500,
                    color: status === 'done' ? 'var(--ink4)' : 'var(--ink)',
                    lineHeight: 1.3,
                    textDecoration: status === 'done' ? 'line-through' : 'none',
                  }}>
                    {item.label}
                  </div>
                  <button
                    onClick={() => toggle(item.id)}
                    style={{
                      flexShrink: 0,
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                      letterSpacing: '0.5px', textTransform: 'uppercase',
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: status === 'done' ? '#2e7d32' : 'var(--ink3)',
                      padding: '3px 8px', cursor: 'pointer',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    {status === 'done' ? '✓ Done' : 'Mark Done'}
                  </button>
                </div>

                {/* Notes */}
                {item.notes && (
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                    color: 'var(--ink3)', marginTop: 4,
                  }}>
                    {item.notes}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Departure marker */}
      {trip?.departure && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginTop: 4, paddingTop: 12,
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
            color: 'var(--ink3)',
          }}>✈ Departure — {fmtDate(trip.departure, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          {trip.return_ && (
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              color: 'var(--ink4)',
            }}>{trip.exitCity || trip.arrivalCity} Return {fmtDate(trip.return_, { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          )}
        </div>
      )}
    </div>
  )
}
