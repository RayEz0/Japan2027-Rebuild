import { useTravel } from '../context/TravelContext'
import { useNavigate } from 'react-router-dom'

export default function ComingSoon({ pageName }) {
  const { trip, setTrip } = useTravel()
  const navigate = useNavigate()

  const switchToJapan = () => {
    setTrip('japan2027')
    navigate('/')
  }

  return (
    <div className="page-enter" style={{ padding: '80px 52px', minHeight: 400 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
        color: 'var(--ink4)', letterSpacing: '1.5px', textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        {trip?.flag} {trip?.title} · {pageName || 'This Page'}
      </div>

      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 48,
        fontWeight: 300, color: 'var(--ink)', lineHeight: 0.95,
        letterSpacing: '-2px', marginBottom: 20,
      }}>
        Coming Soon
      </div>

      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5,
        color: 'var(--ink3)', lineHeight: 2, maxWidth: 440,
        marginBottom: 32,
      }}>
        Content for <strong style={{ color: 'var(--ink)' }}>{trip?.title}</strong> is being
        planned. Full data will be added before this trip is activated.
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={switchToJapan}
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            letterSpacing: '0.8px', textTransform: 'uppercase',
            background: 'var(--ink)', color: 'var(--surf)',
            border: '1.5px solid var(--ink)', padding: '9px 18px',
            cursor: 'pointer', transition: 'opacity 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Switch to Japan 2027 →
        </button>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          color: 'var(--ink4)',
        }}>
          The only fully planned trip
        </span>
      </div>
    </div>
  )
}
