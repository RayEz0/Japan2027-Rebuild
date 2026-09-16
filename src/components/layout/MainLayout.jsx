import { useState } from 'react'
import Sidebar               from './Sidebar'
import MobileNav             from './MobileNav'
import ArcTransitionOverlay  from '../arc/ArcTransitionOverlay'
import BackToIndex           from '../common/BackToIndex'
import { useTravel }         from '../../context/TravelContext'

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { activeArc: arc } = useTravel()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#main-scroll"
        style={{
          position: 'absolute', top: -100, left: 14, zIndex: 9999,
          padding: '8px 16px',
          background: 'var(--ink)', color: 'var(--surf)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          letterSpacing: '0.8px', textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'top 0.1s',
        }}
        onFocus={e => { e.currentTarget.style.top = '14px' }}
        onBlur={e => { e.currentTarget.style.top = '-100px' }}
      >
        Skip to content
      </a>

      {/* Mobile dim overlay */}
      {sidebarOpen && (
        <div
          className="mobile-only"
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 498 }}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* key={arc?.year} forces a full remount of all page content on arc switch,
          resetting scroll position and all page-local state. */}
      <main
        key={arc?.year}
        id="main-scroll"
        className="main-content"
        aria-label="Main content"
        style={{
          marginLeft: 'var(--sb-w)',
          flex: 1, overflowY: 'auto', minWidth: 0,
          background: 'var(--paper)',
        }}
      >
        {children}
      </main>

      <MobileNav onMenuOpen={() => setSidebarOpen(true)} />

      {/* Global arc transition — renders above everything when an arc is selected */}
      <ArcTransitionOverlay />

      {/* Floating back-to-index button — scroll-aware, theme-aware */}
      <BackToIndex />
    </div>
  )
}
