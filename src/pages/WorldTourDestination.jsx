import { useParams, Link, useNavigate } from 'react-router-dom'
import { TRIPS } from '../services/trips/index'
import { useTravel } from '../context/TravelContext'

function fmtDeparture(dep) {
  if (!dep) return null
  try {
    return new Date(dep).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return null }
}

// ── Active trip view ──────────────────────────────────────────────────────────

function ActiveDestination({ trip, isCurrentTrip, onSwitch }) {
  const navigate  = useNavigate()
  const depDate   = fmtDeparture(trip.departure)
  const mustDo    = trip.quickStats?.mustDo || []
  const hasBasket = !!trip.sports?.basketball
  const hasCars   = !!trip.sports?.cars

  function switchAndGo(path) {
    if (!isCurrentTrip) onSwitch(trip.id)
    navigate(path)
  }

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${trip.heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.08) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
            <span style={{ fontSize: 32, lineHeight: 1 }}>{trip.flag}</span>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
              World Tour · {trip.year}
            </div>
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            {trip.title}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
            {trip.routeFull}
          </div>
        </div>
      </div>

      <div style={{ padding: '36px 52px 80px' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: 28 }}>
          <Link
            to="/world-tour"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', textDecoration: 'none', letterSpacing: '0.5px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink3)'}
          >
            ← World Tour
          </Link>
        </div>

        {/* Status banner */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '16px 20px',
          borderLeft: '3px solid var(--accent)', background: 'var(--paper)',
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
              Active
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
              {trip.nights} nights · {trip.region}
              {depDate && ` · Departs ${depDate}`}
            </div>
          </div>
          {isCurrentTrip && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', border: '1px solid var(--border)', padding: '2px 8px', whiteSpace: 'nowrap' }}>
              Current Trip
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32 }}>
          {[
            { label: 'Duration',       value: `${trip.duration} days`                    },
            { label: 'Budget',         value: trip.budgetDisplay                          },
            { label: 'Destinations',   value: `${trip.quickStats?.cities || trip.cities?.length || 0} cities` },
            { label: 'Planned Spots',  value: `${trip.quickStats?.plannedSpots || 0} places` },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surf)', padding: '20px 24px' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Route pillars */}
        {trip.route?.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 12 }}>
              Route
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {trip.route.map((stop, i) => (
                <span key={stop} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    color: 'var(--ink)', border: '1.5px solid var(--ink)',
                    padding: '4px 12px',
                  }}>
                    {stop}
                  </span>
                  {i < trip.route.length - 1 && (
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink3)' }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Must-do list */}
        {mustDo.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 14 }}>
              Must-Do — {mustDo.length} highlights
            </div>
            <div style={{ border: '1px solid var(--border)' }}>
              {mustDo.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '12px 18px',
                  borderBottom: i < mustDo.length - 1 ? '1px solid var(--border)' : 'none',
                  background: 'var(--surf)',
                }}>
                  <div style={{
                    fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 300,
                    color: 'var(--ink4)', flexShrink: 0, lineHeight: 1.5, minWidth: 22,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink2)', lineHeight: 1.7 }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cities */}
        {trip.cities?.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 14 }}>
              Cities
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1, background: 'var(--border)' }}>
              {trip.cities.map(c => (
                <div key={c.name} style={{ background: c.color || 'var(--surf)', padding: '18px 20px' }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{c.emoji}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{c.name}</div>
                  {c.nights > 0 && (
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', marginTop: 2 }}>
                      {c.nights}n
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sports / special features */}
        {(hasBasket || hasCars) && (
          <div style={{ marginBottom: 32, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {hasBasket && (
              <div style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'var(--surf)', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
                🏀 Basketball planned
              </div>
            )}
            {hasCars && (
              <div style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'var(--surf)', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
                🚗 Car culture planned
              </div>
            )}
          </div>
        )}

        {/* Planning entry points */}
        <div style={{ borderTop: '1.5px solid var(--ink)', paddingTop: 28, marginTop: 4 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Planning Tools
          </div>

          {/* Switch CTA */}
          {!isCurrentTrip && (
            <button
              onClick={() => { onSwitch(trip.id); navigate('/') }}
              style={{
                display: 'block', width: '100%', marginBottom: 16,
                background: 'var(--ink)', color: 'var(--surf)', border: 'none',
                padding: '14px 20px', cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif', fontSize: 13.5, fontWeight: 500,
                textAlign: 'left',
                transition: 'opacity 0.14s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Switch to {trip.title} →
            </button>
          )}

          {/* Tool grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {[
              { label: 'Itinerary', path: '/itinerary', icon: '📅' },
              { label: 'Places',    path: '/places',    icon: '📍' },
              { label: 'Budget',    path: '/budget',    icon: '₹'  },
              { label: 'Packing',   path: '/packing',   icon: '🎒' },
            ].map(({ label, path, icon }) => (
              <button
                key={label}
                onClick={() => switchAndGo(path)}
                style={{
                  background: 'var(--surf)', border: 'none', cursor: 'pointer',
                  padding: '18px 20px', textAlign: 'left',
                  transition: 'background 0.14s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}
              >
                <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>
                  {label}
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', marginTop: 2, letterSpacing: '0.3px' }}>
                  {!isCurrentTrip ? `Switch + View` : `View`}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Planned trip view (unchanged placeholder) ─────────────────────────────────

function PlannedDestination({ trip }) {
  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${trip.heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.08) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
            <span style={{ fontSize: 32, lineHeight: 1 }}>{trip.flag}</span>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
              World Tour · {trip.year}
            </div>
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            {trip.title}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
            {trip.routeFull}
          </div>
        </div>
      </div>

      <div style={{ padding: '36px 52px 80px' }}>
        <div style={{ marginBottom: 28 }}>
          <Link
            to="/world-tour"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', textDecoration: 'none', letterSpacing: '0.5px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink3)'}
          >
            ← World Tour
          </Link>
        </div>

        {/* Placeholder status banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
          borderLeft: '3px solid var(--ink)', background: 'var(--paper)',
          marginBottom: 32,
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
            Coming {trip.year}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
            Full planning and booking tools coming in {trip.year - 1}
          </div>
        </div>

        {/* Quick facts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32 }}>
          {[
            { label: 'Target Year', value: String(trip.year || '—') },
            { label: 'Cities',      value: `${trip.cities?.length || 0} planned` },
            { label: 'Style',       value: trip.style },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surf)', padding: '20px 24px' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Cities */}
        {trip.cities?.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 14 }}>Planned Cities</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1, background: 'var(--border)' }}>
              {trip.cities.map(c => (
                <div key={c.name} style={{ background: c.color || 'var(--surf)', padding: '18px 20px' }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{c.emoji}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder note */}
        <div style={{
          padding: '24px', border: '1px solid var(--border)', background: 'var(--surf)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.9,
        }}>
          Itinerary · Budget · Bookings · Packing · Savings tools will be built closer to {trip.year}.
        </div>
      </div>
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────

export default function WorldTourDestination() {
  const { slug }            = useParams()
  const { activeTrip, setTrip } = useTravel()
  const trip = TRIPS[slug]

  if (!trip) {
    return (
      <div style={{ padding: '52px', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink3)' }}>
        Destination not found.{' '}
        <Link to="/world-tour" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>← Back</Link>
      </div>
    )
  }

  if (trip.status === 'active') {
    return (
      <ActiveDestination
        trip={trip}
        isCurrentTrip={activeTrip?.id === trip.id}
        onSwitch={setTrip}
      />
    )
  }

  return <PlannedDestination trip={trip} />
}
