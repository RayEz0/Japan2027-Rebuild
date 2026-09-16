import { useTravel } from '../context/TravelContext'
import { TRIPS } from '../data/trips/index'
import { CAR_SPOTS, GTR_NIGHT, FUJI_DRIVE, CAR_TIPS } from '../data/trips/japan2027/cars'

function SpotCard({ spot }) {
  const isPrimary = spot.id === 'daikoku'
  return (
    <div style={{
      background: 'var(--surf)', border: `1px solid var(--border)`,
      borderLeftWidth: isPrimary ? 3 : 1,
      borderLeftColor: isPrimary ? 'var(--ink)' : 'var(--border)',
      padding: '20px 22px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{spot.name}</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', marginTop: 2 }}>{spot.location}</div>
        </div>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
          textTransform: 'uppercase', letterSpacing: '0.5px',
          color: 'var(--ink3)', background: 'var(--paper)',
          padding: '2px 6px', flexShrink: 0,
        }}>{spot.type}</span>
      </div>

      <div className="rule" style={{ margin: '10px 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', marginBottom: 12 }}>
        {[
          { k: 'Best Time', v: spot.bestTime },
          { k: 'Access',    v: spot.access   },
          { k: 'Fee',       v: spot.fee || 'Free' },
          { k: 'Highway',   v: spot.highway  },
        ].filter(r => r.v).map(({ k, v }) => (
          <div key={k} style={{ gridColumn: k === 'Access' || k === 'Highway' ? 'span 2' : 'auto' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink)', marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      {spot.cars && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Cars Spotted</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {spot.cars.map(c => (
              <span key={c} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                color: 'var(--ink2)', background: 'var(--paper)',
                border: '1px solid var(--border)', padding: '2px 7px',
              }}>{c}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.75, marginBottom: 10 }}>{spot.description}</div>

      <div style={{
        padding: '8px 12px', borderLeft: '3px solid var(--border)',
        background: 'var(--paper)', fontFamily: '"JetBrains Mono", monospace',
        fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.7, marginBottom: 12,
      }}>
        <span style={{ color: 'var(--accent)', marginRight: 6 }}>TIP</span>
        {spot.tip}
      </div>

      <a
        href={spot.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          letterSpacing: '0.6px', textTransform: 'uppercase',
          color: 'var(--ink3)', textDecoration: 'none',
          border: '1.5px solid var(--border)', padding: '4px 10px',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}
      >📍 Maps</a>
    </div>
  )
}

function JapanCars() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=70&auto=format&fit=crop')",
          backgroundSize: 'cover', backgroundPosition: 'center 60%',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>009 — Culture</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            JDM <em style={{ color: 'rgba(255,200,150,0.95)' }}>Tokyo</em>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 52px 80px' }}>

        {/* GTR Night Experience — Featured */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Featured Experience
          </div>
          <div style={{
            background: 'var(--ink)', color: 'var(--surf)',
            padding: '24px 28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>{GTR_NIGHT.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.55)' }}>{GTR_NIGHT.provider} · {GTR_NIGHT.instagram}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: '#fff' }}>{GTR_NIGHT.cost}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{GTR_NIGHT.duration}</div>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 14 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Route</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{GTR_NIGHT.route}</div>
              </div>
              <div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Book Window</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.8)' }}>{GTR_NIGHT.bookWindow}</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Cars</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {GTR_NIGHT.cars.map(c => (
                  <span key={c} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                    color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)',
                    padding: '2px 8px',
                  }}>{c}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Includes</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {GTR_NIGHT.includes.map(inc => (
                  <span key={inc} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                    color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.07)',
                    padding: '2px 8px',
                  }}>✓ {inc}</span>
                ))}
              </div>
            </div>

            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
              color: 'rgba(255,255,255,0.45)', borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 10, lineHeight: 1.6,
            }}>
              {GTR_NIGHT.note}
            </div>
          </div>
        </div>

        {/* Car Spots */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Car Spots — {CAR_SPOTS.length} locations
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {CAR_SPOTS.map(spot => <SpotCard key={spot.id} spot={spot} />)}
          </div>
        </div>

        {/* Fuji Road Trip */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Fuji Road Trip
          </div>
          <div style={{ background: 'var(--surf)', border: '1px solid var(--border)', padding: '20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px 20px', marginBottom: 12 }}>
              {[
                { k: 'Route',    v: FUJI_DRIVE.route    },
                { k: 'Duration', v: FUJI_DRIVE.duration  },
                { k: 'Car',      v: FUJI_DRIVE.car       },
                { k: 'Toll',     v: FUJI_DRIVE.toll      },
              ].map(({ k, v }) => (
                <div key={k} style={{ gridColumn: k === 'Route' || k === 'Car' ? 'span 2' : 'auto' }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink)', lineHeight: 1.6 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{
              padding: '8px 12px', borderLeft: '3px solid var(--border)',
              background: 'var(--paper)', fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.7,
            }}>
              <span style={{ color: 'var(--accent)', marginRight: 6 }}>NOTE</span>
              {FUJI_DRIVE.note}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 12 }}>
            Self-Drive Notes
          </div>
          {CAR_TIPS.map((tip, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: '10px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 300,
                color: 'var(--ink4)', width: 24, flexShrink: 0, lineHeight: 1.4,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7 }}>{tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Generic trip car content (from TRIP_META.sports.cars — thinner than
// Japan's dedicated data file, so this renders whichever fields exist) ──────

function GenericCars({ trip, cars }) {
  const spots = cars.spots || []
  const experiences = cars.experiences || []

  return (
    <div className="page-enter" style={{ padding: '52px', maxWidth: 760 }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
        Car Culture — {trip?.title}
      </div>

      {cars.highlight && (
        <div style={{
          padding: '18px 22px', border: '1px solid var(--border)',
          background: 'var(--surf)', marginBottom: 28,
          fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8,
        }}>
          {cars.highlight}
        </div>
      )}

      {spots.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Spots — {spots.length}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {spots.map((s, i) => (
              <div key={s.name || i} style={{ background: 'var(--surf)', padding: '18px 20px' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', marginBottom: 8 }}>{s.location}{s.type ? ` · ${s.type}` : ''}</div>
                <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.7 }}>{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {experiences.length > 0 && (
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Experiences
          </div>
          {experiences.map((e, i) => (
            <div key={i} style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              {typeof e === 'string' ? e : (
                <>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{e.name}</div>
                  {(e.provider || e.cost) && (
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', marginBottom: 4 }}>
                      {[e.provider, e.cost].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  {e.notes}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── No-cars fallback ──────────────────────────────────────────────────────────

function NoCars({ trip }) {
  return (
    <div className="page-enter" style={{ padding: '52px', maxWidth: 600 }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>Cars</div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
        Not planned for {trip?.title || 'this trip'}
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.8 }}>
        Car culture content is currently detailed for Japan 2027; a few other trips have a short highlight only.
      </div>
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────

export default function Cars() {
  const { activeTrip: trip } = useTravel()
  const cars = TRIPS[trip?.id]?.sports?.cars

  if (trip?.id === 'japan2027') return <JapanCars />
  if (cars) return <GenericCars trip={trip} cars={cars} />
  return <NoCars trip={trip} />
}
