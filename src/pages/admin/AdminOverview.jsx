import { useMemo } from 'react'
import { allPlaces }        from '../../data/places/index'
import { ARCS }             from '../../data/worldTour/arcs'
import { DAYS }             from '../../data/trips/japan2027/itinerary'
import { BOOKING_ITEMS }    from '../../data/trips/japan2027/bookingRoadmap'
import { BUDGET_ITEMS }     from '../../data/trips/japan2027/budget'
import { useJournal }       from '../../context/JournalContext'
import { usePlaceStatus }   from '../../hooks/usePlaceStatus'
import {
  getAllPlaceOverrides, getMeta, runValidation,
} from '../../services/cms/index'
import { ITINERARY_NAME_MAP } from '../../data/places/index'

// ── Stat box ──────────────────────────────────────────────────────────────────

function Stat({ label, value, sub, accent }) {
  return (
    <div style={{
      flex: '1 1 130px', padding: '14px 16px',
      border: '1px solid var(--border)', background: 'var(--surf)',
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 700,
        color: accent || 'var(--ink)', lineHeight: 1,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
          {sub}
        </div>
      )}
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: 'var(--ink4)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>
        {label}
      </div>
    </div>
  )
}

// ── Issue row ─────────────────────────────────────────────────────────────────

function IssueRow({ issue }) {
  const cols = { warn: '#C9954C', info: 'var(--ink3)', error: '#b5451b' }
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'center',
      padding: '7px 16px', borderBottom: '1px solid var(--border)',
      fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
        color: cols[issue.severity], letterSpacing: '0.3px', textTransform: 'uppercase',
        minWidth: 36,
      }}>
        {issue.severity}
      </span>
      <span style={{ flex: 1 }}>{issue.label || issue.placeId}</span>
      <span style={{ color: 'var(--ink4)', fontSize: 11 }}>{issue.msg}</span>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminOverview() {
  const { entries }      = useJournal()
  const { totals }       = usePlaceStatus()
  const meta             = getMeta()
  const overrides        = getAllPlaceOverrides()
  const overrideCount    = Object.keys(overrides).length

  const countries   = useMemo(() => [...new Set(allPlaces.map(p => p.country || 'Japan'))].length, [])
  const cities      = useMemo(() => [...new Set(allPlaces.map(p => p.city))].length, [])
  const withCoords  = useMemo(() => allPlaces.filter(p => p.coordinates?.lat).length, [])
  const withImage   = useMemo(() => allPlaces.filter(p => p.heroImage || p.image).length, [])

  const budgetTotal = useMemo(() => BUDGET_ITEMS.reduce((s, b) => s + b.max, 0), [])

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const issues = useMemo(() =>
    runValidation(allPlaces, DAYS, ITINERARY_NAME_MAP).slice(0, 20),
  [])

  const warnCount = issues.filter(i => i.severity === 'warn').length
  const infoCount = issues.filter(i => i.severity === 'info').length

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '20px 28px 16px',
        borderBottom: '1.5px solid var(--ink)',
        background: 'var(--surf)',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 6,
        }}>
          Admin Studio — Overview
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
          System Overview
        </div>
        {meta.lastExport && (
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginTop: 6 }}>
            Last export: {meta.lastExport.slice(0, 19).replace('T', ' ')}
          </div>
        )}
      </div>

      <div style={{ padding: '24px 28px' }}>

        {/* Places stats */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 10,
        }}>
          Places Database
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1, background: 'var(--border)', marginBottom: 24 }}>
          <Stat label="Total Places"   value={allPlaces.length} />
          <Stat label="Countries"      value={countries} />
          <Stat label="Cities"         value={cities} />
          <Stat label="With Coords"    value={withCoords}   sub={`${Math.round(withCoords / allPlaces.length * 100)}%`} />
          <Stat label="With Image"     value={withImage}    sub={`${Math.round(withImage  / allPlaces.length * 100)}%`} />
          <Stat label="CMS Overrides"  value={overrideCount} accent={overrideCount > 0 ? '#C9954C' : undefined} />
        </div>

        {/* App stats */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 10,
        }}>
          App Content
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1, background: 'var(--border)', marginBottom: 24 }}>
          <Stat label="Arcs"           value={ARCS.length} />
          <Stat label="Itinerary Days" value={DAYS.length} />
          <Stat label="Bookings"       value={BOOKING_ITEMS.length} />
          <Stat label="Budget Items"   value={BUDGET_ITEMS.length} sub={`₹${(budgetTotal / 1000).toFixed(0)}k total max`} />
          <Stat label="Journal"        value={entries.length} />
          <Stat label="Places Visited" value={totals.visited} />
        </div>

        {/* Validation summary */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span>Validation (first 20 issues)</span>
          <span style={{ color: '#C9954C' }}>{warnCount} warnings</span>
          <span style={{ color: 'var(--ink4)' }}>{infoCount} info</span>
        </div>

        <div style={{ border: '1px solid var(--border)', marginBottom: 24 }}>
          {issues.length === 0 ? (
            <div style={{
              padding: '16px', fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9, color: '#2e7d32', textAlign: 'center',
            }}>
              ✓ No issues found
            </div>
          ) : (
            issues.map((issue, i) => <IssueRow key={i} issue={issue} />)
          )}
        </div>

        {/* Arc status */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 10,
        }}>
          Arc Status
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
          {ARCS.map(arc => (
            <div key={arc.no} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--surf)', padding: '10px 16px',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                color: 'var(--ink4)', minWidth: 28,
              }}>
                {String(arc.no).padStart(2, '0')}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
                  {arc.title}
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 1 }}>
                  {arc.year} · {arc.countries?.join(', ')}
                </div>
              </div>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                color: arc.status === 'active' ? '#2e7d32' : 'var(--ink4)',
                textTransform: 'uppercase', letterSpacing: '0.4px',
              }}>
                {arc.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
