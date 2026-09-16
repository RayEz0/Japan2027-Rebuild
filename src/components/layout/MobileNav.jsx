import { NavLink, useLocation } from 'react-router-dom'

const NAV = [
  {
    to: '/', exact: true, label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/>
        <rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/>
      </svg>
    ),
  },
  {
    to: '/expenses', label: 'Spend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1v14M3 5h10M2 9h12"/>
        <path d="M11 3c0-1.1-1.3-2-3-2S5 1.9 5 3s1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2"/>
      </svg>
    ),
  },
  {
    to: '/packing', label: 'Pack',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="12" height="9"/>
        <path d="M5 5V3a3 3 0 016 0v2"/>
        <path d="M6 10l1.5 1.5L11 8"/>
      </svg>
    ),
  },
  {
    to: '/bookings', label: 'Book',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12"/>
        <path d="M2 6h12M6 2v12"/><path d="M9 9l1.5 1.5L13 8"/>
      </svg>
    ),
  },
]

function MobileNavItem({ item, location }) {
  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to)

  return (
    <NavLink
      to={item.to}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 3,
        textDecoration: 'none',
        color: isActive ? 'var(--ink)' : 'var(--ink4)',
        borderTop: isActive ? '2px solid var(--accent)' : '2px solid transparent',
        background: 'transparent', transition: 'color 0.14s',
        paddingTop: 2,
      }}
    >
      <span aria-hidden="true">{item.icon}</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 7.5, letterSpacing: '0.5px', textTransform: 'uppercase',
      }}>{item.label}</span>
    </NavLink>
  )
}

export default function MobileNav({ onMenuOpen }) {
  const location = useLocation()

  return (
    <nav className="mobile-nav no-print" aria-label="Mobile navigation">
      {NAV.map(item => (
        <MobileNavItem key={item.to} item={item} location={location} />
      ))}
      <button
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 3,
          border: 'none', background: 'transparent', cursor: 'pointer',
          color: 'var(--ink4)', borderTop: '2px solid transparent',
          paddingTop: 2,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M2 4h12M2 8h12M2 12h12"/>
        </svg>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 7.5, letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>Menu</span>
      </button>
    </nav>
  )
}
