import { Link, useLocation } from 'react-router-dom'
import { getPageNav } from '../../utils/pageOrder'

const mono = { fontFamily: '"JetBrains Mono", monospace' }

/**
 * PageNav — Previous / Next navigation rendered at the bottom of content pages.
 * Auto-generated from the canonical page order in utils/pageOrder.js.
 */
export default function PageNav({ style = {} }) {
  const location = useLocation()
  const nav      = getPageNav(location.pathname)

  if (!nav || (!nav.prev && !nav.next)) return null

  return (
    <nav
      aria-label="Page navigation"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border)',
        marginTop: 48,
        paddingTop: 20,
        gap: 12,
        ...style,
      }}
    >
      {/* Previous */}
      <div style={{ flex: 1 }}>
        {nav.prev && (
          <Link
            to={nav.prev.path}
            style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: 4 }}
          >
            <span style={{ ...mono, fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ← Previous
            </span>
            <span style={{ ...mono, fontSize: 10.5, color: 'var(--ink)', fontWeight: 500 }}>
              {nav.prev.label}
            </span>
          </Link>
        )}
      </div>

      {/* Index link — centre */}
      {nav.indexPath && (
        <Link
          to={nav.indexPath}
          style={{
            ...mono,
            fontSize: 8,
            color: 'var(--ink3)',
            textDecoration: 'none',
            border: '1px solid var(--border)',
            padding: '5px 14px',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            flexShrink: 0,
            transition: 'color 0.14s, border-color 0.14s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink3)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          aria-label={`Back to ${nav.indexLabel}`}
        >
          ↑ {nav.indexLabel}
        </Link>
      )}

      {/* Next */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {nav.next && (
          <Link
            to={nav.next.path}
            style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}
          >
            <span style={{ ...mono, fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Next →
            </span>
            <span style={{ ...mono, fontSize: 10.5, color: 'var(--ink)', fontWeight: 500 }}>
              {nav.next.label}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}
