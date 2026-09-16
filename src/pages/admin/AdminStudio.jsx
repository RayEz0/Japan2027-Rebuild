import { useState, useMemo, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ARCS } from '../../data/worldTour/arcs'
import { TRIPS } from '../../data/trips/index'
import AdminOverview   from './AdminOverview'
import AdminPlaces     from './AdminPlaces'
import AdminItinerary  from './AdminItinerary'
import AdminMap        from './AdminMap'
import AdminBookings   from './AdminBookings'
import AdminBudget     from './AdminBudget'
import AdminPacking    from './AdminPacking'
import AdminGifts      from './AdminGifts'
import AdminMedia      from './AdminMedia'
import AdminSystem     from './AdminSystem'

// ── Nav config ────────────────────────────────────────────────────────────────
// `scope` marks which sections need the trip/arc selector in the sidebar:
//   'trip' — edits one specific trip's data (Itinerary, Budget)
//   'arc'  — edits one arc's shared content, spanning all its trips (Bookings, Packing, Gifts)
//   none   — global, not trip/arc-specific (Overview, Places, Map, Media, System)

const NAV = [
  { id: 'overview',   label: 'Overview',   icon: '◈' },
  { id: 'places',     label: 'Places',     icon: '◉' },
  { id: 'itinerary',  label: 'Itinerary',  icon: '◫', scope: 'trip' },
  { id: 'map',        label: 'Map',        icon: '◎' },
  { id: 'bookings',   label: 'Bookings',   icon: '◷', scope: 'arc' },
  { id: 'budget',     label: 'Budget',     icon: '◈', scope: 'trip' },
  { id: 'packing',    label: 'Packing',    icon: '◫', scope: 'arc' },
  { id: 'gifts',      label: 'Gifts',      icon: '◈', scope: 'arc' },
  { id: 'media',      label: 'Media',      icon: '◰' },
  { id: 'system',     label: 'System',     icon: '◫' },
]

// ── Scope selector ────────────────────────────────────────────────────────────

function ScopeSelector({ scope, arcYear, tripId, onArcChange, onTripChange }) {
  if (!scope) return null

  const arc = ARCS.find(a => a.year === arcYear) || ARCS[0]
  const tripOptions = arc.tripIds

  const selectStyle = {
    width: '100%', padding: '6px 8px', marginBottom: 8,
    fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
    background: 'var(--paper)', border: '1px solid var(--border)',
    outline: 'none', cursor: 'pointer',
  }
  const labelStyle = {
    display: 'block', fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
    color: 'var(--ink4)', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 3,
  }

  return (
    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
      <label style={labelStyle}>Arc</label>
      <select style={selectStyle} value={arcYear} onChange={e => onArcChange(Number(e.target.value))}>
        {ARCS.map(a => (
          <option key={a.year} value={a.year}>Arc {a.no} — {(a.navLabel || a.title)} ({a.year})</option>
        ))}
      </select>

      {scope === 'trip' && tripOptions.length > 1 && (
        <>
          <label style={labelStyle}>Trip</label>
          <select style={{ ...selectStyle, marginBottom: 0 }} value={tripId} onChange={e => onTripChange(e.target.value)}>
            {tripOptions.map(id => (
              <option key={id} value={id}>{TRIPS[id]?.title || id}</option>
            ))}
          </select>
        </>
      )}
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function AdminSidebar({ section, onSelect, activeNav, scopeProps }) {
  return (
    <div style={{
      width: 200, flexShrink: 0, borderRight: '1.5px solid var(--ink)',
      display: 'flex', flexDirection: 'column', background: 'var(--surf)',
      height: '100vh', overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', letterSpacing: '1.5px', textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          Admin Studio
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
          World Tour CMS
        </div>
      </div>

      <ScopeSelector scope={activeNav?.scope} {...scopeProps} />

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        {NAV.map(item => {
          const active = section === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 16px',
                fontFamily: 'Outfit, sans-serif', fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--ink)' : 'var(--ink3)',
                background: active ? 'var(--border)' : 'none',
                border: 'none', cursor: 'pointer',
                borderLeft: active ? '3px solid var(--ink)' : '3px solid transparent',
                transition: 'all 0.1s',
              }}
            >
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                color: active ? 'var(--ink)' : 'var(--ink4)',
              }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: 12 }}>
        <Link
          to="/"
          style={{
            display: 'block', width: '100%',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            color: 'var(--ink3)', textDecoration: 'none',
            border: '1px solid var(--border)', padding: '6px 10px',
            textAlign: 'center', letterSpacing: '0.4px',
          }}
        >
          ← Return to App
        </Link>
      </div>
    </div>
  )
}

// ── Loader ────────────────────────────────────────────────────────────────────

function AdminLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%',
      fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
      color: 'var(--ink4)', letterSpacing: '0.5px',
    }}>
      Loading…
    </div>
  )
}

// ── Section renderer ──────────────────────────────────────────────────────────

function ActiveSection({ section, arcYear, tripId }) {
  switch (section) {
    case 'overview':   return <AdminOverview />
    case 'places':     return <AdminPlaces />
    case 'itinerary':  return <AdminItinerary tripId={tripId} />
    case 'map':        return <AdminMap />
    case 'bookings':   return <AdminBookings arcYear={arcYear} />
    case 'budget':     return <AdminBudget tripId={tripId} />
    case 'packing':    return <AdminPacking arcYear={arcYear} />
    case 'gifts':      return <AdminGifts arcYear={arcYear} />
    case 'media':      return <AdminMedia />
    case 'system':     return <AdminSystem />
    default:           return <AdminOverview />
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminStudio() {
  const [section, setSection] = useState('overview')
  const [arcYear, setArcYear] = useState(ARCS[0].year)
  const [tripId,  setTripId]  = useState(ARCS[0].tripIds[0])

  const activeNav = useMemo(() => NAV.find(n => n.id === section), [section])

  const handleArcChange = (year) => {
    setArcYear(year)
    const arc = ARCS.find(a => a.year === year)
    setTripId(arc?.tripIds[0] || 'japan2027')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      display: 'flex', background: 'var(--surf)',
      fontFamily: 'Outfit, sans-serif',
    }}>
      <AdminSidebar
        section={section}
        onSelect={setSection}
        activeNav={activeNav}
        scopeProps={{ arcYear, tripId, onArcChange: handleArcChange, onTripChange: setTripId }}
      />

      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <Suspense fallback={<AdminLoader />}>
          <ActiveSection section={section} arcYear={arcYear} tripId={tripId} />
        </Suspense>
      </div>
    </div>
  )
}
