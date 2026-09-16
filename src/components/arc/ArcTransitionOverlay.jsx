import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTravel } from '../../context/TravelContext'
import { TRIPS } from '../../data/trips/index'

// Fallback used when all trip/arc images fail to load.
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=80&auto=format&fit=crop'

const ARC_TAGLINES = {
  2027: 'From neon streets to ancient temples.',
  2028: 'Roads through the Highlands and into the Fjords.',
  2029: 'History, coastlines, and Mediterranean sunsets.',
  2030: 'Powder snow, onsen silence, and winter light.',
  2031: 'Boulevards, autobahns, and canal cities.',
  2032: 'Alpine peaks, aurora nights, midnight trains.',
  2033: 'Megacities, dynasty ruins, and street food alleys.',
  2034: 'Fiordlands, starfields, and roads at the end of the earth.',
  2035: 'Skyscrapers, Pacific cliffs, and cobblestone Lisbon.',
}

function buildCandidates(arc) {
  const primaryTrip = arc ? (TRIPS[arc.tripIds?.[0]] || null) : null
  return [
    arc?.heroImage,
    primaryTrip?.heroImage,
    DEFAULT_IMAGE,
  ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i)
}

// Fullscreen cinematic overlay triggered whenever the user picks a new arc.
// Plays for ~1800ms then commits the arc and redirects to Dashboard.
export default function ArcTransitionOverlay() {
  const { pendingTransition, commitTransition } = useTravel()
  const navigate = useNavigate()

  const [localArc, setLocalArc]         = useState(null)
  const [phase, setPhase]               = useState('idle') // 'idle' | 'visible' | 'fading'
  const [textIn, setTextIn]             = useState(false)
  const [imgCandidates, setImgCandidates] = useState([DEFAULT_IMAGE])
  const [imgIdx, setImgIdx]             = useState(0)
  const [imgSrc, setImgSrc]             = useState(DEFAULT_IMAGE)

  useEffect(() => {
    if (!pendingTransition) return

    const candidates = buildCandidates(pendingTransition)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalArc(pendingTransition)
    setImgCandidates(candidates)
    setImgIdx(0)
    setImgSrc(candidates[0] ?? DEFAULT_IMAGE)
    setTextIn(false)
    setPhase('visible')

    const tText = setTimeout(() => setTextIn(true), 80)
    const t1    = setTimeout(() => setPhase('fading'), 1700)
    const t2    = setTimeout(() => {
      commitTransition(pendingTransition.year)
      navigate('/')
      setPhase('idle')
    }, 2100)

    return () => { clearTimeout(tText); clearTimeout(t1); clearTimeout(t2) }
  }, [pendingTransition?.year]) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'idle' || !localArc) return null

  const { theme } = localArc
  const tagline   = ARC_TAGLINES[localArc.year] || localArc.subtitle?.split(' · ')[0] || ''

  const handleImgError = () => {
    const next = imgIdx + 1
    if (next < imgCandidates.length) {
      setImgIdx(next)
      setImgSrc(imgCandidates[next])
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      opacity: phase === 'fading' ? 0 : 1,
      transition: phase === 'fading' ? 'opacity 0.4s var(--ease-out)' : 'none',
      pointerEvents: phase === 'fading' ? 'none' : 'all',
    }}>
      {/* Hero image — always rendered; backgroundColor guarantees no transparency */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: '#0c0c0c',
        backgroundImage: `url('${imgSrc}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        animation: 'arcImageIn 1.8s var(--ease-out) both',
      }} />
      {/* Hidden probe: tries next candidate if current URL fails */}
      <img
        key={imgSrc}
        src={imgSrc}
        onError={handleImgError}
        aria-hidden="true"
        style={{ display: 'none', position: 'absolute' }}
        alt=""
      />

      {/* Gradient overlay — arc-tinted */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, ${theme.accent}44 0%, rgba(6,6,6,0.88) 60%, rgba(0,0,0,0.96) 100%)`,
      }} />

      {/* Top accent stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: theme.accent,
        animation: 'arcBarIn 1.8s linear both',
      }} />

      {/* Text content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 32px',
        gap: 0,
      }}>
        {/* Arc number + year */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: theme.accent, letterSpacing: '4px', textTransform: 'uppercase',
          fontWeight: 600, marginBottom: 22,
          opacity: textIn ? 1 : 0, transform: textIn ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s var(--ease), transform 0.5s var(--ease)',
          transitionDelay: '0ms',
        }}>
          Arc {localArc.no} · {localArc.year}
        </div>

        {/* Arc title */}
        <div style={{
          fontFamily: 'Fraunces, serif', fontWeight: 700,
          lineHeight: 0.88, letterSpacing: '-2px', color: '#fff',
          marginBottom: 24, maxWidth: 820,
          fontSize: localArc.title.length > 16 ? 48 : 64,
          opacity: textIn ? 1 : 0, transform: textIn ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.55s var(--ease), transform 0.55s var(--ease)',
          transitionDelay: '80ms',
        }}>
          {localArc.title}
        </div>

        {/* Separator line */}
        <div style={{
          width: 40, height: 1.5, background: theme.accent,
          marginBottom: 22,
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.4s var(--ease)',
          transitionDelay: '180ms',
        }} />

        {/* Tagline */}
        {tagline && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5,
            color: 'rgba(255,255,255,0.60)', lineHeight: 1.9,
            maxWidth: 460, letterSpacing: '0.2px',
            fontStyle: 'italic',
            opacity: textIn ? 1 : 0, transform: textIn ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s var(--ease), transform 0.5s var(--ease)',
            transitionDelay: '220ms',
          }}>
            {tagline}
          </div>
        )}

        {/* Progress bar */}
        <div style={{
          marginTop: 56, width: 120, height: 1.5,
          background: 'rgba(255,255,255,0.14)', overflow: 'hidden',
          opacity: textIn ? 1 : 0,
          transition: 'opacity 0.3s var(--ease)',
          transitionDelay: '300ms',
        }}>
          <div style={{
            height: '100%', background: theme.accent,
            animation: 'arcBarFill 1.6s linear forwards',
            animationDelay: '200ms',
          }} />
        </div>

        {/* Country pills */}
        {localArc.countries?.length > 0 && (
          <div style={{
            display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center',
            opacity: textIn ? 1 : 0,
            transition: 'opacity 0.5s var(--ease)',
            transitionDelay: '350ms',
          }}>
            {localArc.countries.map(code => (
              <span key={code} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                color: 'rgba(255,255,255,0.50)', letterSpacing: '1.5px',
                textTransform: 'uppercase', padding: '3px 8px',
                border: '1px solid rgba(255,255,255,0.18)',
              }}>
                {code}
              </span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes arcBarFill {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes arcImageIn {
          from { transform: scale(1.04); }
          to   { transform: scale(1); }
        }
        @keyframes arcBarIn {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
      `}</style>
    </div>
  )
}
