import { useNavigate } from 'react-router-dom'
import { TRIPS } from '../services/trips/index'
import { ARCS } from '../data/worldTour/arcs'

export default function WorldTour() {
  const navigate   = useNavigate()
  const arcCount   = ARCS.length
  const totalCount = Object.keys(TRIPS).length
  const activeCount = Object.values(TRIPS).filter(t => t.status === 'active').length
  const yearRange  = `${ARCS[0].year}–${ARCS[ARCS.length - 1].year}`
  const subtitle   = `${arcCount} Arcs · ${totalCount} Destinations · ${activeCount} Active · ${yearRange}`

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=70&auto=format&fit=crop')",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>World Tour · Admin</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            World <em style={{ color: 'rgba(180,220,255,0.92)' }}>Tour</em>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
            {subtitle}
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 52px 80px' }}>
        {ARCS.map(arc => {
          const arcTrips = arc.tripIds.map(id => TRIPS[id]).filter(Boolean)
          const arcActiveCount = arcTrips.filter(t => t.status === 'active').length

          return (
            <div key={arc.no} style={{ marginBottom: 48 }}>
              {/* Arc heading */}
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12,
                marginBottom: 18, paddingBottom: 12, borderBottom: `1.5px solid var(--ink)`,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
                    {arc.year}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                      color: arc.theme.accent, border: `1px solid ${arc.theme.accent}`,
                      padding: '1px 5px', letterSpacing: '0.5px',
                    }}>
                      ARC {arc.no}
                    </div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', letterSpacing: '0.5px' }}>
                      {arc.title}
                    </div>
                    {arcActiveCount > 0 && (
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.3px' }}>
                        · {arcActiveCount} active
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '0.3px', textAlign: 'right' }}>
                    {arc.budgetDisplay} · {arc.duration} · {arc.countries.length} {arc.countries.length === 1 ? 'country' : 'countries'}
                  </div>
                  <button
                    onClick={() => navigate(`/arc/${arc.year}`)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                      color: arc.theme.accent, letterSpacing: '0.5px',
                      padding: 0, whiteSpace: 'nowrap',
                      transition: 'opacity 0.14s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    View Arc →
                  </button>
                </div>
              </div>

              {/* Trip cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 1, background: 'var(--border)' }}>
                {arcTrips.map(t => {
                  const isActive = t.status === 'active'
                  return (
                    <button
                      key={t.id}
                      onClick={() => navigate(`/world-tour/${t.id}`)}
                      style={{
                        background: 'var(--surf)', textAlign: 'left', border: 'none', cursor: 'pointer',
                        padding: '24px 28px', transition: 'background 0.14s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                        <span style={{ fontSize: 28, lineHeight: 1 }}>{t.flag}</span>
                        <div>
                          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 19, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{t.title}</div>
                          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: 3 }}>
                            {arc.year} · {t.style}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)', lineHeight: 2 }}>
                        {t.route?.join(' → ')}
                      </div>
                      {/* Per-trip stats */}
                      {(t.duration > 0 || t.budgetDisplay) && (
                        <div style={{
                          marginTop: 10, display: 'flex', gap: 12,
                          fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', letterSpacing: '0.3px',
                        }}>
                          {t.duration > 0 && <span>{t.duration}d</span>}
                          {t.budgetDisplay && t.budgetDisplay !== 'TBD' && <span>{t.budgetDisplay}</span>}
                        </div>
                      )}
                      {/* Status badge */}
                      {isActive ? (
                        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            display: 'inline-block',
                            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                            letterSpacing: '0.5px', textTransform: 'uppercase',
                            color: 'var(--accent)', border: '1px solid var(--accent)',
                            padding: '2px 7px',
                          }}>
                            Active
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          marginTop: 12, display: 'inline-block',
                          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                          letterSpacing: '0.5px', textTransform: 'uppercase',
                          color: 'var(--ink4)', border: '1px solid var(--border)',
                          padding: '2px 7px',
                        }}>
                          Planning starts {t.year - 1}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
