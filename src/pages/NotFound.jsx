import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="page-enter" style={{ padding: '80px 52px' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: 'var(--ink4)', letterSpacing: '1.8px', textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        404 — Not Found
      </div>
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700,
        lineHeight: 0.95, letterSpacing: '-1px', color: 'var(--ink)',
        marginBottom: 20,
      }}>
        Page not found.
      </div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 48,
        maxWidth: 420,
      }}>
        The page you're looking for doesn't exist or has been moved.
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'var(--ink)', color: 'var(--surf)',
            border: 'none', padding: '12px 24px', cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.2px', transition: 'opacity 0.14s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate('/world-tour')}
          style={{
            background: 'transparent', color: 'var(--ink)',
            border: '1.5px solid var(--ink)', padding: '12px 24px', cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.2px', transition: 'border-color 0.14s, color 0.14s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--ink3)'
            e.currentTarget.style.color = 'var(--ink3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--ink)'
            e.currentTarget.style.color = 'var(--ink)'
          }}
        >
          World Tour
        </button>
      </div>
    </div>
  )
}
