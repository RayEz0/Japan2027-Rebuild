import { useState, useEffect } from 'react'
import { loadTripData } from '../../context/TripDataContext'
import { TRIPS } from '../../data/trips/index'
import { getBudget, setBudget } from '../../services/cms/index'
import { resolveBudgetItems } from '../../services/contentResolver/index'

const CATEGORY_COLORS = {
  transport:    '#2563EB',
  stay:         '#7C3AED',
  food:         '#EA580C',
  experience:   '#16A34A',
  shopping:     '#DB2777',
  insurance:    '#0891B2',
  misc:         '#6B7280',
}

// ── Slider row ────────────────────────────────────────────────────────────────

function BudgetRow({ item, onUpdate, totalMax }) {
  const [expanded, setExpanded] = useState(false)
  const range    = item.max - item.min // eslint-disable-line no-unused-vars
  const pct      = totalMax > 0 ? Math.round(item.max / totalMax * 100) : 0
  const color    = CATEGORY_COLORS[item.category] || '#6B7280'

  return (
    <div style={{ marginBottom: 1, background: 'var(--surf)', border: '1px solid var(--border)' }}>
      {/* Main row */}
      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.name}
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
              {item.category} · {pct}% of total
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
              ₹{item.min.toLocaleString()} – ₹{item.max.toLocaleString()}
            </div>
          </div>

          <button onClick={() => setExpanded(v => !v)} style={{
            border: '1px solid var(--border)', background: 'none', cursor: 'pointer',
            color: 'var(--ink4)', padding: '3px 8px', fontSize: 10,
          }}>
            {expanded ? '▾' : '▸'}
          </button>
        </div>

        {/* Bar */}
        <div style={{ height: 4, background: 'var(--border)', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: `${pct}%`, height: '100%', background: color,
          }} />
        </div>

        {/* Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px', marginTop: 10 }}>
          <div>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
              Min (₹{item.min.toLocaleString()})
            </label>
            <input
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={item.min}
              onChange={e => onUpdate(item.id, 'min', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: color }}
            />
          </div>
          <div>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
              Max (₹{item.max.toLocaleString()})
            </label>
            <input
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={item.max}
              onChange={e => onUpdate(item.id, 'max', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: color }}
            />
          </div>
        </div>
      </div>

      {/* Expanded notes */}
      {expanded && (
        <div style={{ padding: '0 18px 14px', borderTop: '1px solid var(--border)' }}>
          <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4, marginTop: 12 }}>
            Notes
          </label>
          <textarea
            value={item.notes}
            onChange={e => onUpdate(item.id, 'notes', e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '7px 10px', resize: 'vertical',
              fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
              background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
              minHeight: 60,
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>INR Display</label>
              <input
                value={item.inr}
                onChange={e => onUpdate(item.id, 'inr', e.target.value)}
                style={{ padding: '6px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12, border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)', width: '100%', boxSizing: 'border-box', outline: 'none' }}
                placeholder="₹0 – ₹0"
              />
            </div>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>JPY Display</label>
              <input
                value={item.jpy}
                onChange={e => onUpdate(item.id, 'jpy', e.target.value)}
                style={{ padding: '6px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12, border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)', width: '100%', boxSizing: 'border-box', outline: 'none' }}
                placeholder="¥0 – ¥0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminBudget({ tripId = 'japan2027' }) {
  const [bundledItems, setBundledItems] = useState(null)
  const [items, setItems] = useState([])
  const [saved, setSaved] = useState(false)

  // Load the selected trip's bundled budget, then layer any CMS override on
  // top for the editor's starting state.
  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBundledItems(null)
    loadTripData(tripId).then(data => {
      if (cancelled) return
      const bundled = data.budgetItems || []
      setBundledItems(bundled)
      const cms = getBudget(tripId)
      setItems(cms?.items?.length ? resolveBudgetItems(tripId, bundled) : bundled.map(b => ({ ...b })))
    })
    return () => { cancelled = true }
  }, [tripId])

  const totalMin = items.reduce((s, b) => s + b.min, 0)
  const totalMax = items.reduce((s, b) => s + b.max, 0)

  const handleUpdate = (id, key, val) => {
    setItems(prev => prev.map(b => b.id === id ? { ...b, [key]: val } : b))
  }

  const handleSave = () => {
    setBudget(tripId, { items })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const handleReset = () => {
    if (!window.confirm('Reset to static budget data?')) return
    setItems((bundledItems || []).map(b => ({ ...b })))
  }

  if (!bundledItems) {
    return <div style={{ padding: 24, fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>Loading…</div>
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'var(--surf)', zIndex: 10,
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 4 }}>
            Budget Editor — {TRIPS[tripId]?.title || tripId}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
              ₹{totalMin.toLocaleString()} – ₹{totalMax.toLocaleString()}
            </div>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>total range</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {saved && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32', alignSelf: 'center' }}>✓ Saved</span>}
          <button onClick={handleReset} style={{
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink3)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            padding: '7px 14px', cursor: 'pointer',
          }}>
            ↺ Reset
          </button>
          <button onClick={handleSave} style={{
            background: 'var(--ink)', color: 'var(--surf)', border: 'none',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            padding: '7px 20px', cursor: 'pointer',
          }}>
            Save
          </button>
        </div>
      </div>

      {/* Total bar */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
        <div style={{ display: 'flex', gap: 2, height: 8 }}>
          {items.map(item => {
            const w = Math.round(item.max / totalMax * 100)
            return (
              <div
                key={item.id}
                style={{ flex: `0 0 ${w}%`, height: '100%', background: CATEGORY_COLORS[item.category] || '#ccc' }}
                title={`${item.name}: ₹${item.max.toLocaleString()}`}
              />
            )
          })}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: 8 }}>
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) =>
            items.some(i => i.category === cat) ? (
              <span key={cat} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, background: color, display: 'inline-block', borderRadius: '50%' }} />
                {cat}
              </span>
            ) : null
          )}
        </div>
      </div>

      {/* Budget items */}
      <div style={{ padding: '12px 24px' }}>
        {items.map(item => (
          <BudgetRow key={item.id} item={item} onUpdate={handleUpdate} totalMax={totalMax} />
        ))}
      </div>
    </div>
  )
}
