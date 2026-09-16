import { useState, useEffect } from 'react'
import { useTravel } from '../context/TravelContext'

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 640)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= 640)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}

function CityRow({ city, isLast, isMobile }) {
  if (isMobile) {
    return (
      <div style={{
        padding: '14px 20px',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>
            {city.city}
            {city.nights === 0 && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginLeft: 6 }}>day trip</span>}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink)', fontWeight: 500, marginBottom: 3 }}>{city.type}</div>
          {city.note && <div style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.5 }}>{city.note}</div>}
        </div>
        {city.nights > 0 && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{city.nights}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 1 }}>{city.nights === 1 ? 'night' : 'nights'}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr 100px',
      gap: 0,
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
      padding: '14px 24px',
      alignItems: 'flex-start',
    }}>
      {/* City */}
      <div>
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 16,
          fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
        }}>{city.city}</div>
        {city.nights === 0 && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)', letterSpacing: '0.5px', marginTop: 2,
          }}>day trip</div>
        )}
      </div>

      {/* Type + note */}
      <div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          color: 'var(--ink)', fontWeight: 500, marginBottom: 4,
        }}>{city.type}</div>
        {city.note && (
          <div style={{
            fontSize: 12, color: 'var(--ink3)', lineHeight: 1.55,
          }}>{city.note}</div>
        )}
      </div>

      {/* Nights */}
      <div style={{ textAlign: 'right' }}>
        {city.nights > 0 ? (
          <>
            <div style={{
              fontFamily: 'Fraunces, serif', fontSize: 20,
              fontWeight: 600, color: 'var(--ink)', lineHeight: 1,
            }}>{city.nights}</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink4)', letterSpacing: '0.5px', marginTop: 2,
            }}>{city.nights === 1 ? 'night' : 'nights'}</div>
          </>
        ) : (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)',
          }}>—</div>
        )}
      </div>
    </div>
  )
}

function CountryBlock({ block, isLast, isMobile }) {
  const totalNights = block.cities.reduce((s, c) => s + (c.nights || 0), 0)

  return (
    <div style={{
      borderBottom: isLast ? 'none' : '2.5px solid var(--ink)',
    }}>
      {/* Country header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '18px 24px 12px',
        borderBottom: '2px solid var(--ink)',
        background: 'var(--surf)',
      }}>
        <span style={{ fontSize: 20 }}>{block.flag}</span>
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 22,
          fontWeight: 700, color: 'var(--ink)', flex: 1,
        }}>{block.country}</div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: 'var(--ink4)', letterSpacing: '0.8px',
        }}>
          {block.cities.length} stops · {totalNights} nights
        </div>
      </div>

      {/* Column headers — desktop only */}
      {!isMobile && (
        <div style={{
          display: 'grid', gridTemplateColumns: '180px 1fr 100px',
          padding: '6px 24px 4px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--paper)',
        }}>
          {['City', 'Accommodation', 'Nights'].map((h, i) => (
            <div key={h} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase',
              textAlign: i === 2 ? 'right' : 'left',
            }}>{h}</div>
          ))}
        </div>
      )}

      {/* City rows */}
      <div style={{ background: 'var(--surf)' }}>
        {block.cities.map((city, ci) => (
          <CityRow key={ci} city={city} isLast={ci === block.cities.length - 1} isMobile={isMobile} />
        ))}
      </div>
    </div>
  )
}

export default function Stays() {
  const { activeArc: arc, content } = useTravel()
  const stays   = content?.stays || []
  const isMobile = useIsMobile()

  const totalNights = stays.reduce(
    (sum, block) => sum + block.cities.reduce((s, c) => s + (c.nights || 0), 0), 0
  )

  const heroImage = arc?.heroImage
    || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=70&auto=format&fit=crop'

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden', height: 200,
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>Arc {arc?.no || '01'} — Accommodation</div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 42,
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff',
          }}>Stays</div>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{
        display: 'flex', gap: 32, alignItems: 'center',
        padding: '14px 52px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--paper)',
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Total Nights</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>{totalNights}</div>
        </div>
        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Countries</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>{stays.length}</div>
        </div>
        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Stops</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>
            {stays.reduce((s, b) => s + b.cities.length, 0)}
          </div>
        </div>
      </div>

      {/* No data */}
      {stays.length === 0 && (
        <div style={{
          padding: '80px 52px', textAlign: 'center',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink4)',
        }}>
          Accommodation not yet planned for this arc.
        </div>
      )}

      {/* Country blocks */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {stays.map((block, bi) => (
          <CountryBlock key={bi} block={block} isLast={bi === stays.length - 1} isMobile={isMobile} />
        ))}
      </div>
    </div>
  )
}
