import { useState, useCallback } from 'react'
import { getChecklist, setChecklist } from '../../services/offline/index'

// ── Checklist definitions ─────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'documents',
    label: 'Documents',
    icon: '🪪',
    items: [
      { id: 'passport',   label: 'Passport' },
      { id: 'visa',       label: 'Japan Visa' },
      { id: 'insurance',  label: 'Travel Insurance Card' },
      { id: 'idp',        label: 'International Driving Permit' },
      { id: 'wallet',     label: 'Wallet + Cards' },
      { id: 'tickets',    label: 'Flight Tickets (offline)' },
    ],
  },
  {
    id: 'electronics',
    label: 'Electronics',
    icon: '🔌',
    items: [
      { id: 'phone',       label: 'Phone Charged' },
      { id: 'powerbank',   label: 'Power Bank Charged' },
      { id: 'camera-main', label: 'DJI Pocket 3 + Battery' },
      { id: 'camera-2',   label: 'Insta360 GO 3 + Battery' },
      { id: 'earphones',  label: 'Earphones / AirPods' },
      { id: 'adapter',    label: 'Universal Adapter (Japan: Type A)' },
      { id: 'cable',      label: 'USB / Lightning Cable' },
    ],
  },
  {
    id: 'essentials',
    label: 'Essentials',
    icon: '🎒',
    items: [
      { id: 'water',     label: 'Reusable Water Bottle' },
      { id: 'umbrella',  label: 'Compact Umbrella' },
      { id: 'layers',    label: 'Warm Layers (Nov = 5–14°C)' },
      { id: 'mask',      label: 'Face Mask (train etiquette)' },
      { id: 'painkillers',label: 'Painkillers / Basic Meds' },
    ],
  },
  {
    id: 'japan',
    label: 'Japan-Specific',
    icon: '🇯🇵',
    items: [
      { id: 'suica',     label: 'Suica Card (IC card) topped up' },
      { id: 'yen',       label: 'Yen cash (¥10,000 minimum)' },
      { id: 'gmaps',     label: 'Google Maps offline area saved' },
      { id: 'translate', label: 'Google Translate (Japanese downloaded)' },
      { id: 'jr-pass',   label: 'JR Pass (if using)' },
    ],
  },
  {
    id: 'morning',
    label: 'Morning Routine',
    icon: '☀️',
    reset: true,
    items: [
      { id: 'breakfast',  label: 'Breakfast' },
      { id: 'sunscreen',  label: 'Sunscreen' },
      { id: 'review',     label: "Today's plan reviewed" },
      { id: 'hotel-key',  label: 'Hotel key / keycard' },
      { id: 'offline',    label: 'Offline data saved' },
    ],
  },
]

// ── Item row ──────────────────────────────────────────────────────────────────

function CheckItem({ item, checked, onToggle }) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      style={{
        width: '100%', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 12px',
        background: checked ? '#f1f8f1' : 'var(--surf)',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background 0.1s',
      }}
    >
      {/* Checkbox */}
      <div style={{
        width: 22, height: 22, flexShrink: 0,
        border: `2px solid ${checked ? '#2e7d32' : 'var(--border)'}`,
        background: checked ? '#2e7d32' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <span style={{ color: '#fff', fontSize: 12, lineHeight: 1 }}>✓</span>}
      </div>

      {/* Label */}
      <span style={{
        fontFamily: 'Outfit, sans-serif', fontSize: 14,
        color: checked ? '#2e7d32' : 'var(--ink)',
        textDecoration: checked ? 'line-through' : 'none',
        opacity: checked ? 0.6 : 1,
        flex: 1,
      }}>
        {item.label}
      </span>
    </button>
  )
}

// ── Category block ────────────────────────────────────────────────────────────

function CategoryBlock({ cat, state, onToggle, onResetCat }) {
  const [open,       setOpen]  = useState(cat.reset || cat.id === 'documents')
  const checkedCount           = cat.items.filter(i => state[i.id]).length
  const allChecked             = checkedCount === cat.items.length

  return (
    <div style={{ marginBottom: 8, border: '1px solid var(--border)', background: 'var(--surf)' }}>
      {/* Header */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', cursor: 'pointer',
          background: allChecked ? '#e8f5e9' : 'var(--surf)',
        }}
      >
        <span style={{ fontSize: 18, flexShrink: 0 }}>{cat.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
            {cat.label}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 1 }}>
            {checkedCount} / {cat.items.length}
          </div>
        </div>

        {/* Progress bar mini */}
        <div style={{ width: 50, height: 3, background: 'var(--border)', marginRight: 4, flexShrink: 0 }}>
          <div style={{
            height: '100%',
            width: `${Math.round(checkedCount / cat.items.length * 100)}%`,
            background: allChecked ? '#2e7d32' : 'var(--ink)',
          }} />
        </div>

        {cat.reset && checkedCount > 0 && (
          <button
            onClick={e => { e.stopPropagation(); onResetCat(cat.id) }}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              border: '1px solid var(--border)', background: 'none', color: 'var(--ink4)',
              padding: '3px 7px', cursor: 'pointer', marginRight: 6,
            }}
          >
            Reset
          </button>
        )}

        <span style={{ color: 'var(--ink4)', fontSize: 10 }}>{open ? '▾' : '▸'}</span>
      </div>

      {/* Items */}
      {open && (
        <div>
          {cat.items.map(item => (
            <CheckItem
              key={item.id}
              item={item}
              checked={!!state[item.id]}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

const DATE_KEY = () => new Date().toISOString().slice(0, 10)

export default function TravelChecklist() {
  const [state, setState] = useState(() => getChecklist(DATE_KEY()))

  const totalItems   = CATEGORIES.reduce((s, c) => s + c.items.length, 0)
  const checkedTotal = CATEGORIES.reduce((s, c) => s + c.items.filter(i => state[i.id]).length, 0)
  const pct          = Math.round(checkedTotal / totalItems * 100)

  const handleToggle = useCallback((itemId) => {
    setState(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] }
      setChecklist(DATE_KEY(), next)
      return next
    })
  }, [])

  const handleResetCat = useCallback((catId) => {
    const cat = CATEGORIES.find(c => c.id === catId)
    if (!cat) return
    setState(prev => {
      const next = { ...prev }
      cat.items.forEach(i => { delete next[i.id] })
      setChecklist(DATE_KEY(), next)
      return next
    })
  }, [])

  const handleResetAll = () => {
    if (!window.confirm("Reset today's checklist?")) return
    setState({})
    setChecklist(DATE_KEY(), {})
  }

  return (
    <div style={{ padding: 16 }}>

      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>
              Today's Checklist
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
              {checkedTotal} / {totalItems}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 700, color: pct === 100 ? '#2e7d32' : 'var(--ink)', lineHeight: 1 }}>
              {pct}%
            </div>
            {pct === 100 && (
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#2e7d32', marginTop: 2 }}>
                ALL SET ✓
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: 'var(--border)' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: pct === 100 ? '#2e7d32' : 'var(--ink)',
            transition: 'width 0.2s',
          }} />
        </div>
      </div>

      {/* Categories */}
      {CATEGORIES.map(cat => (
        <CategoryBlock
          key={cat.id}
          cat={cat}
          state={state}
          onToggle={handleToggle}
          onResetCat={handleResetCat}
        />
      ))}

      {/* Reset all */}
      <button
        onClick={handleResetAll}
        style={{
          width: '100%', marginTop: 8, padding: '10px',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          border: '1px solid var(--border)', background: 'none', color: 'var(--ink4)',
          cursor: 'pointer', letterSpacing: '0.4px',
        }}
      >
        Reset All for Today
      </button>

      <div style={{
        marginTop: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: 'var(--ink4)', textAlign: 'center',
      }}>
        Checklist saves to device · resets with each new day
      </div>
    </div>
  )
}
