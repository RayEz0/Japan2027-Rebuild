import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isOnline, onConnectivityChange } from '../../services/offline/index'
import TravelHome      from './TravelHome'
import TravelMap       from './TravelMap'
import TravelEmergency from './TravelEmergency'
import TravelCurrency  from './TravelCurrency'
import TravelJournal   from './TravelJournal'
import TravelChecklist from './TravelChecklist'

// ── Nav config ────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'home',      label: 'Today',     icon: '◈' },
  { id: 'map',       label: 'Map',       icon: '◎' },
  { id: 'emergency', label: 'SOS',       icon: '⬡' },
  { id: 'currency',  label: '¥ ₹',       icon: '◷' },
  { id: 'journal',   label: 'Journal',   icon: '◰' },
  { id: 'checklist', label: 'Check',     icon: '◫' },
]

// ── Section renderer ──────────────────────────────────────────────────────────

function ActiveSection({ tab }) {
  switch (tab) {
    case 'home':      return <TravelHome />
    case 'map':       return <TravelMap />
    case 'emergency': return <TravelEmergency />
    case 'currency':  return <TravelCurrency />
    case 'journal':   return <TravelJournal />
    case 'checklist': return <TravelChecklist />
    default:          return <TravelHome />
  }
}

// ── Bottom nav ────────────────────────────────────────────────────────────────

function BottomNav({ tab, onSelect }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 58, display: 'flex',
      background: 'var(--surf)', borderTop: '1.5px solid var(--ink)',
      zIndex: 10,
    }}>
      {TABS.map(t => {
        const active = tab === t.id
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            aria-pressed={active}
            aria-label={t.label}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              background: active ? 'var(--border)' : 'none',
              border: 'none', borderTop: active ? '2px solid var(--ink)' : '2px solid transparent',
              cursor: 'pointer', padding: 0,
            }}
          >
            <span aria-hidden="true" style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
              color: active ? 'var(--ink)' : 'var(--ink4)',
              lineHeight: 1,
            }}>
              {t.icon}
            </span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
              color: active ? 'var(--ink)' : 'var(--ink4)',
              letterSpacing: '0.3px', textTransform: 'uppercase',
            }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TravelMode() {
  const [tab,    setTab]    = useState('home')
  const [online, setOnline] = useState(isOnline())

  useEffect(() => {
    return onConnectivityChange(setOnline)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 8000,
      display: 'flex', justifyContent: 'center',
      background: 'rgba(0,0,0,0.06)',
    }}>
      {/* Mobile-width container */}
      <div style={{
        width: '100%', maxWidth: 480,
        background: 'var(--paper)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 0 40px rgba(0,0,0,0.12)',
      }}>
        {/* Header */}
        <div style={{
          height: 50, flexShrink: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px',
          borderBottom: '1.5px solid var(--ink)',
          background: 'var(--surf)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 700, color: 'var(--ink)',
            }}>
              Travel Mode
            </div>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
              background: online ? '#e8f5e9' : '#fbe9e7',
              color: online ? '#2e7d32' : '#b5451b',
              padding: '2px 7px', letterSpacing: '0.4px',
            }}>
              {online ? '● ONLINE' : '◌ OFFLINE'}
            </span>
          </div>

          <Link
            to="/"
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink4)', textDecoration: 'none',
              border: '1px solid var(--border)', padding: '4px 10px',
            }}
          >
            ← App
          </Link>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 58 }}>
          <ActiveSection tab={tab} />
        </div>

        {/* Bottom nav */}
        <BottomNav tab={tab} onSelect={setTab} />
      </div>
    </div>
  )
}
