/**
 * PageLoader — shown as the Suspense fallback while lazy-loaded routes hydrate.
 * Uses the shared `.skeleton` shimmer from index.css.
 */
export default function PageLoader() {
  return (
    <div
      className="page-enter"
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-busy="true"
      aria-label="Loading page"
    >
      {/* Skeleton hero */}
      <div className="skeleton" style={{ height: 200, flexShrink: 0 }} />

      {/* Skeleton content rows */}
      <div style={{ padding: '28px 52px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="skeleton" style={{ height: 12, width: '35%' }} />
        <div className="skeleton" style={{ height: 36, width: '55%' }} />
        <div style={{ height: 20 }} />
        <div style={{ display: 'flex', gap: 12 }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: 80, flex: 1 }} />
          ))}
        </div>
        <div style={{ height: 8 }} />
        <div className="skeleton" style={{ height: 12, width: '80%' }} />
        <div className="skeleton" style={{ height: 12, width: '65%' }} />
        <div className="skeleton" style={{ height: 12, width: '70%' }} />
      </div>

      {/* Subtle text hint */}
      <div style={{
        position: 'absolute',
        bottom: 32, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 8.5,
        color: 'var(--ink4)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        Loading…
      </div>
    </div>
  )
}
