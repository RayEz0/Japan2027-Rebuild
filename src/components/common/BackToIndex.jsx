import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getPageNav } from '../../utils/pageOrder'

/**
 * Floating "Back to Index" button — bottom-right, scroll-aware, theme-aware.
 * Appears after scrolling 200px. Links to the section index for the current route.
 */
export default function BackToIndex() {
  const [visible, setVisible] = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const nav       = getPageNav(location.pathname)

  useEffect(() => {
    const el = document.getElementById('main-scroll')
    if (!el) return
    const onScroll = () => setVisible(el.scrollTop > 200)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Only show when we have a meaningful index target that differs from current path
  if (!nav || nav.indexPath === location.pathname) return null

  return (
    <button
      onClick={() => navigate(nav.indexPath)}
      aria-label={`Back to ${nav.indexLabel}`}
      title={`Back to ${nav.indexLabel}`}
      style={{
        position: 'fixed',
        bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))',
        right: 20,
        zIndex: 450,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        background: 'var(--ink)',
        color: 'var(--surf)',
        border: 'none',
        cursor: 'pointer',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 8.5,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
        boxShadow: '0 2px 12px rgba(12,12,12,0.18)',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      {nav.indexLabel}
    </button>
  )
}
