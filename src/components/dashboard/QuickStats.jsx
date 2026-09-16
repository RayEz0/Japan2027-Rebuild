import { useCountdown } from '../../hooks/useCountdown'
import { useTravel } from '../../context/TravelContext'

function StatCard({ value, label, sub, accent }) {
  return (
    <div style={{
      padding: '18px 20px',
      borderRight: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif',
        fontSize: 42, fontWeight: 300,
        color: accent ? 'var(--accent)' : 'var(--ink)',
        lineHeight: 1, letterSpacing: '-2px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: 'var(--ink3)', letterSpacing: '0.8px',
        textTransform: 'uppercase', marginTop: 6,
      }}>
        {label}
      </div>
      {sub && (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink4)', marginTop: 2,
        }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export default function QuickStats() {
  const { primaryTrip: trip } = useTravel()
  const { days, unknown } = useCountdown(trip?.departure)

  const stats = trip?.quickStats || {}
  const cities = trip?.cities || []
  const cityNames = cities.map(c => c.name).join(' · ')

  const nightsSub = cities
    .filter(c => c.nights > 0)
    .map(c => `${c.nights} ${c.name}`)
    .join(' · ') || (trip?.nights > 0 ? `${trip.nights} total` : 'TBD')

  const daysValue = unknown ? '—' : days

  return (
    <div style={{ padding: '0' }}>
      <div style={{
        padding: '20px 24px 12px',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500,
        borderBottom: '1px solid var(--border)',
      }}>
        Quick Stats
      </div>

      {/* 2×2 stat grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>
        <StatCard
          value={stats.cities || trip?.quickStats?.cities || '—'}
          label="Cities"
          sub={cityNames || 'TBD'}
        />
        <StatCard
          value={daysValue}
          label="Days Left"
          sub={trip?.departure ? `Until ${new Date(trip.departure).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : 'Date TBD'}
          accent
        />
        <StatCard
          value={trip?.nights || '—'}
          label="Nights"
          sub={nightsSub}
        />
        <StatCard
          value={stats.plannedSpots > 0 ? `${stats.plannedSpots}+` : '—'}
          label="Planned Spots"
          sub={stats.plannedSpots > 0 ? `Across ${stats.daysInCountry || trip?.duration || '?'} travel days` : 'Planning in progress'}
        />
      </div>
    </div>
  )
}
