import { useTokyoTime } from '../../hooks/useTokyoTime'
import { useTravel } from '../../context/TravelContext'

function cityFromTimezone(tz) {
  if (!tz) return 'Destination'
  const city = tz.split('/').pop().replace(/_/g, ' ')
  return city
}

export default function DestinationTimeModule() {
  const { primaryTrip: trip } = useTravel()
  const tz = trip?.timezone || 'Asia/Tokyo'
  const { time, dateShort, day } = useTokyoTime(tz)
  const cityName = cityFromTimezone(tz)

  const [hh, mm, ss] = time.split(':')

  return (
    <div style={{
      padding: '28px 28px',
      borderBottom: '1px solid var(--border)',
      borderLeft: '1px solid var(--border)',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 14,
      }}>
        {cityName} Time · {tz}
      </div>

      {/* Large time display */}
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 44,
        fontWeight: 300, lineHeight: 1, color: 'var(--ink)',
        letterSpacing: '-2px', marginBottom: 4,
      }}>
        {hh}
        <span style={{ color: 'var(--ink4)' }}>:</span>
        {mm}
        <span style={{ color: 'var(--ink4)', fontSize: 28 }}>:{ss}</span>
      </div>

      {/* Day + Date */}
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: 'var(--ink3)', marginTop: 8, letterSpacing: '0.3px',
      }}>
        {day}
      </div>
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 16,
        color: 'var(--ink2)', fontStyle: 'italic', marginTop: 2,
      }}>
        {dateShort}
      </div>

      {/* Timezone badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        marginTop: 14, padding: '3px 8px',
        border: '1px solid var(--border)',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
        color: 'var(--ink3)', letterSpacing: '0.5px', textTransform: 'uppercase',
      }}>
        {trip?.flag || '🌍'} {tz}
      </div>
    </div>
  )
}
