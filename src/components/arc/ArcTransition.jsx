import { useState, useEffect } from 'react'

// Fallback used when all trip/arc images fail to load.
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=80&auto=format&fit=crop'

function buildCandidates(arc, primaryTrip) {
  return [
    arc.heroImage,
    primaryTrip?.heroImage,
    DEFAULT_IMAGE,
  ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i)
}

// Fullscreen cinematic overlay shown on first mount of an arc page.
// Visible 1000ms, fades over 400ms. Does not re-trigger on same-arc navigation.
export default function ArcTransition({ arc, primaryTrip }) {
  const [phase, setPhase] = useState('visible') // 'visible' | 'fading' | 'done'

  const candidates = buildCandidates(arc, primaryTrip)
  const [imgIdx, setImgIdx] = useState(0)
  const imgSrc = candidates[imgIdx] ?? DEFAULT_IMAGE

  useEffect(() => {
    const show = setTimeout(() => setPhase('fading'), 1000)
    const hide = setTimeout(() => setPhase('done'),   1400)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [arc.year])

  if (phase === 'done') return null

  const theme = arc.theme

  return (
    <div
      role="status"
      aria-label={`Loading Arc ${arc.no} — ${arc.title}`}
      aria-live="polite"
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.4s ease-out' : 'none',
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      {/* Hero image layer — always rendered; backgroundColor guarantees no transparency */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#0c0c0c',
        backgroundImage: `url('${imgSrc}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {/* Hidden probe: tries next candidate if current URL fails */}
      <img
        key={imgSrc}
        src={imgSrc}
        aria-hidden="true"
        style={{ display: 'none', position: 'absolute' }}
        onError={() => { if (imgIdx < candidates.length - 1) setImgIdx(i => i + 1) }}
        alt=""
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${theme.accent}55 0%, rgba(8,8,8,0.88) 100%)`,
      }} />

      {/* Theme accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: theme.accent }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 32px',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: theme.accent, letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: 20, fontWeight: 600,
        }}>
          Arc {arc.no} · {arc.year}
        </div>
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 64, fontWeight: 700,
          lineHeight: 0.88, letterSpacing: '-2px',
          color: '#fff',
          marginBottom: 20,
          maxWidth: 800,
        }}>
          {arc.title}
        </div>
        {arc.subtitle && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            color: 'rgba(255,255,255,0.52)', lineHeight: 1.9,
            maxWidth: 460, letterSpacing: '0.3px',
          }}>
            {arc.subtitle}
          </div>
        )}
        {/* Animated loading bar */}
        <div style={{
          marginTop: 48, width: 80, height: 1.5, background: 'rgba(255,255,255,0.18)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', background: theme.accent,
            animation: 'arcTransitionBar 1s linear forwards',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes arcTransitionBar {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
