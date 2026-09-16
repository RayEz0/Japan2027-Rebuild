import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useRole } from '../../context/RoleContext'
import { useTravel } from '../../context/TravelContext'
import { TRIP_LIST } from '../../services/trips/index'
import TripSwitcher from './TripSwitcher'

const COLLAPSE_KEY = 'worldtour_sidebar_collapsed'

const TRIP_NAV = [
  {
    to: '/', label: 'Dashboard', exact: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/>
        <rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/>
      </svg>
    ),
  },
  {
    to: '/itinerary', label: 'Itinerary',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="6.5" r="2.5"/>
        <path d="M8 1C5.2 1 3 3.2 3 6.5c0 4 5 9 5 9s5-5 5-9C13 3.2 10.8 1 8 1z"/>
      </svg>
    ),
  },
  {
    to: '/budget', label: 'Budget',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="14" height="10"/>
        <path d="M1 6h14M5 3v10M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
      </svg>
    ),
  },
  {
    to: '/savings', label: 'Savings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 6a5 5 0 11-10 0 5 5 0 0110 0z"/>
        <path d="M8 3v3l2 1"/><path d="M10.5 11.5l1.5 3"/><path d="M5.5 11.5L4 14.5"/>
      </svg>
    ),
  },
  {
    to: '/expenses', label: 'Expenses',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1v14M3 5h10M2 9h12"/>
        <path d="M11 3c0-1.1-1.3-2-3-2S5 1.9 5 3s1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2"/>
      </svg>
    ),
  },
  {
    to: '/stays', label: 'Stays',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12V6l7-4 7 4v6"/><rect x="5" y="8" width="6" height="4"/>
        <path d="M1 12h14"/>
      </svg>
    ),
  },
  {
    to: '/packing', label: 'Packing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="12" height="9"/>
        <path d="M5 5V3a3 3 0 016 0v2"/>
        <path d="M6 10l1.5 1.5L11 8"/>
      </svg>
    ),
  },
  {
    to: '/gifts', label: 'Gifts',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="5" width="14" height="10"/>
        <path d="M1 8h14M8 5V15"/>
        <path d="M8 5c0-2 2-4 3-2.5S9.5 5 8 5zM8 5c0-2-2-4-3-2.5S6.5 5 8 5z"/>
      </svg>
    ),
  },
  {
    to: '/map', label: 'Map',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="1,3 6,1 10,3 15,1 15,13 10,15 6,13 1,15"/>
        <line x1="6" y1="1" x2="6" y2="13"/>
        <line x1="10" y1="3" x2="10" y2="15"/>
      </svg>
    ),
  },
  {
    to: '/export', label: 'Export',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2h4v4M14 2l-6 6M9 4H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V8"/>
      </svg>
    ),
  },
]


function HamburgerIcon() {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="1" y1="1.5" x2="12" y2="1.5"/>
      <line x1="1" y1="5.5" x2="12" y2="5.5"/>
      <line x1="1" y1="9.5" x2="12" y2="9.5"/>
    </svg>
  )
}

function NavItem({ item, location }) {
  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to)

  return (
    <NavLink
      to={item.to}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--paper)'
          e.currentTarget.style.color = 'var(--ink)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--ink3)'
        }
      }}
      style={{
        display: 'flex', alignItems: 'center',
        height: 44, width: '100%',
        textDecoration: 'none',
        fontFamily: 'Outfit, sans-serif', fontSize: 12.5, fontWeight: 500,
        color: isActive ? 'var(--ink)' : 'var(--ink3)',
        background: isActive ? 'var(--paper)' : 'transparent',
        position: 'relative',
        transition: 'background 0.14s, color 0.14s',
        border: 'none',
      }}
    >
      {isActive && (
        <span aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 2.5, background: 'var(--accent)',
        }} />
      )}
      <span aria-hidden="true" style={{
        width: 52, height: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {item.icon}
      </span>
      <span style={{ letterSpacing: '0.1px', fontSize: 12 }}>{item.label}</span>
    </NavLink>
  )
}

function AuthBadge() {
  const { user, hasSupabase, signOut } = useAuth()
  const navigate = useNavigate()

  if (!hasSupabase) return null

  return (
    <button
      onClick={() => user ? signOut() : navigate('/login')}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', cursor: 'pointer',
        borderTop: '1px solid var(--border)',
        background: 'none', border: 'none', width: '100%', textAlign: 'left',
      }}
      title={user ? `Signed in as ${user.email} — click to sign out` : 'Click to sign in for cloud sync'}
      aria-label={user ? `Signed in as ${user.email} — click to sign out` : 'Not synced — click to sign in'}
    >
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: user ? '#4caf50' : 'var(--border)',
        flexShrink: 0,
      }} />
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: 'var(--ink4)', letterSpacing: '0.5px',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {user ? user.email : 'Not synced — click to sign in'}
      </div>
    </button>
  )
}

function arcBrandLabel(arc) {
  if (!arc) return 'World Tour'
  return (arc.navLabel || arc.title).replace(/\s·\s/g, ' + ')
}

function arcBrandSubline(arc) {
  if (!arc) return 'World Tour Platform'
  return `${arc.month} · ${arc.duration}`
}

function toggleBtnStyle(base = {}) {
  return {
    width: 30, height: 30,
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(6px)',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--ink3)',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    flexShrink: 0,
    ...base,
  }
}

function onToggleEnter(e) {
  e.currentTarget.style.background = 'rgba(255,255,255,0.96)'
  e.currentTarget.style.color = 'var(--ink)'
  e.currentTarget.style.borderColor = 'var(--ink3)'
}
function onToggleLeave(e) {
  e.currentTarget.style.background = 'rgba(255,255,255,0.72)'
  e.currentTarget.style.color = 'var(--ink3)'
  e.currentTarget.style.borderColor = 'var(--border)'
}

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation()
  const { activeArc } = useTravel()
  const { isAdmin } = useRole()

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const val = localStorage.getItem(COLLAPSE_KEY) === 'true'
      // Set CSS variable synchronously on load to prevent layout flash
      if (val && window.innerWidth > 768) {
        document.documentElement.style.setProperty('--sb-w', '0px')
      }
      return val
    } catch { return false }
  })

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Post-paint update so CSS transition on .main-content fires
  useEffect(() => {
    if (!isMobile) {
      document.documentElement.style.setProperty('--sb-w', collapsed ? '0px' : '230px')
    }
  }, [collapsed, isMobile])

  const toggle = () => {
    setCollapsed(prev => {
      const next = !prev
      try { localStorage.setItem(COLLAPSE_KEY, String(next)) } catch { /* intentional */ }
      return next
    })
  }

  const monogram = activeArc ? activeArc.countries[0].slice(0, 2) : 'WT'
  const desktopHidden = collapsed && !isMobile

  return (
    <>
      {/* Floating hamburger — shown on desktop when sidebar is hidden */}
      {desktopHidden && (
        <button
          onClick={toggle}
          style={toggleBtnStyle({
            position: 'fixed',
            top: 16, left: 16,
            zIndex: 600,
            width: 34, height: 34,
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          })}
          onMouseEnter={onToggleEnter}
          onMouseLeave={onToggleLeave}
          aria-label="Show sidebar"
          title="Show sidebar"
        >
          <HamburgerIcon />
        </button>
      )}

      <aside
        className={`sidebar-panel no-print${isOpen ? ' is-open' : ''}`}
        aria-label="Site navigation"
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: 230,
          // Desktop only: slide out via transform; mobile uses CSS class/drawer
          transform: isMobile ? undefined : (collapsed ? 'translateX(-100%)' : 'translateX(0)'),
          transition: isMobile ? undefined : 'transform 0.25s var(--ease)',
          background: 'var(--surf)',
          borderRight: '1.5px solid var(--ink)',
          display: 'flex', flexDirection: 'column',
          zIndex: 500,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Brand */}
        <div style={{
          height: 62, borderBottom: '1.5px solid var(--ink)',
          display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 12, flexShrink: 0,
        }}>
          <div style={{
            width: 30, height: 30,
            background: activeArc?.theme?.accent || 'var(--ink)', color: '#fff',
            fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            letterSpacing: '0.5px', flexShrink: 0,
            transition: 'background 0.3s var(--ease)',
          }}>{monogram}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600,
              color: 'var(--ink)', lineHeight: 1,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {arcBrandLabel(activeArc)}
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)',
              letterSpacing: '0.8px', marginTop: 3, textTransform: 'uppercase',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {arcBrandSubline(activeArc)}
            </div>
          </div>

          {/* Mobile close button */}
          <button
            className="mobile-only"
            onClick={onClose}
            style={{
              border: 'none', background: 'none', cursor: 'pointer',
              color: 'var(--ink3)', fontSize: 20, lineHeight: 1,
              padding: '4px', flexShrink: 0,
            }}
            aria-label="Close menu"
          >×</button>

          {/* Desktop collapse toggle */}
          <button
            className="desktop-only"
            onClick={toggle}
            style={toggleBtnStyle()}
            onMouseEnter={onToggleEnter}
            onMouseLeave={onToggleLeave}
            aria-label="Hide sidebar"
            title="Hide sidebar"
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* Section label */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase',
          padding: '10px 0 3px 14px',
        }}>
          Trip
        </div>

        {/* Navigation */}
        <nav aria-label="Trip navigation">
          {TRIP_NAV.map(item => (
            <NavItem key={item.to} item={item} location={location} />
          ))}
        </nav>

        {/* Footer — trip selector, admin, auth. Pushed to bottom via flex. */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 8,
          marginTop: 'auto', flexShrink: 0,
        }}>
          {isAdmin && (
            <Link
              to="/admin"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 14px',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                color: location.pathname.startsWith('/admin') ? 'var(--ink)' : 'var(--ink4)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                letterSpacing: '0.5px',
                background: location.pathname.startsWith('/admin') ? 'var(--border)' : 'none',
              }}
            >
              <span style={{ fontSize: 11 }}>⬡</span>
              Admin Studio
            </Link>
          )}
          <AuthBadge />
          <TripSwitcher />
          <div style={{ padding: '8px 14px 10px' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
            }}>
              World Tour Platform
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink3)', marginTop: 3,
            }}>
              {TRIP_LIST.filter(t => t.status === 'active').length} Active Trips
            </div>
          </div>
        </div>

        {/* Travel Mode shortcut — always the last item in the sidebar */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '8px 12px', flexShrink: 0 }}>
          <Link
            to="/travel"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px',
              fontFamily: 'Outfit, sans-serif', fontSize: 12.5, fontWeight: 600,
              color: location.pathname.startsWith('/travel') ? 'var(--surf)' : 'var(--ink)',
              background: location.pathname.startsWith('/travel') ? 'var(--ink)' : 'var(--paper)',
              textDecoration: 'none',
              border: '1px solid var(--ink)',
              letterSpacing: '0.1px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1L1 5v6l7 4 7-4V5z"/>
              <path d="M8 1v14M1 5l7 4 7-4"/>
            </svg>
            Travel Mode
          </Link>
        </div>
      </aside>
    </>
  )
}
