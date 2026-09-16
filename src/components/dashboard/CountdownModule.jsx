import { useCountdown } from '../../hooks/useCountdown'
import { useTravel } from '../../context/TravelContext'

function Pad(n) { return String(n).padStart(2, '0') }

export default function CountdownModule() {
  const { primaryTrip: trip } = useTravel()
  const { days, hours, minutes, seconds, departed, unknown } = useCountdown(trip?.departure)

  const routeSegs = trip?.routeFull ? trip.routeFull.split('→') : []

  return (
    <div style={{
      padding: '40px 36px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      borderRight: '1px solid var(--border)',
      minHeight: 320,
    }}>
      {/* Top — days counter */}
      <div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', fontWeight: 500,
          marginBottom: 8,
        }}>
          {departed ? 'Trip Underway' : unknown ? 'Date Not Set' : 'Departure In'}
        </div>

        <div style={{
          fontFamily: 'Fraunces, serif',
          fontSize: unknown ? 60 : days >= 1000 ? 80 : 120,
          fontWeight: 300, lineHeight: 0.85,
          color: 'var(--ink)', letterSpacing: '-5px',
          margin: '12px 0 4px',
        }}>
          {departed ? '✈' : unknown ? 'TBD' : days}
        </div>

        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: 'var(--ink3)', letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>
          {departed ? 'Days in ' + (trip?.arrivalCity || 'Country') : unknown ? 'Planning phase' : 'Days'}
        </div>

        {/* HH:MM:SS — only when date is set and not departed */}
        {!departed && !unknown && (
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginTop: 20 }}>
            {[
              { val: Pad(hours),   lbl: 'Hrs' },
              { val: ':',          lbl: null  },
              { val: Pad(minutes), lbl: 'Min' },
              { val: ':',          lbl: null  },
              { val: Pad(seconds), lbl: 'Sec' },
            ].map((item, i) => (
              item.lbl === null ? (
                <div key={i} style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 22,
                  color: 'var(--ink4)', lineHeight: 1, paddingBottom: 0,
                }}>{item.val}</div>
              ) : (
                <div key={i}>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
                    color: 'var(--ink3)', letterSpacing: '1px',
                    textTransform: 'uppercase', marginBottom: 2,
                  }}>{item.lbl}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 22,
                    fontWeight: 400, color: 'var(--ink)', lineHeight: 1,
                  }}>{item.val}</div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Departure date */}
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 15,
          color: 'var(--ink3)', fontStyle: 'italic', marginTop: 16,
        }}>
          {trip?.departure
            ? new Date(trip.departure).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'Departure date TBD'
          }
        </div>
      </div>

      {/* Bottom — route */}
      {routeSegs.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
            letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)',
            marginBottom: 8, fontWeight: 500,
          }}>Route</div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: 'var(--ink2)', lineHeight: 1.9,
          }}>
            {routeSegs.map((seg, i, arr) => (
              <span key={i}>
                {seg.trim()}
                {i < arr.length - 1 && <span style={{ color: 'var(--ink4)' }}> → </span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
