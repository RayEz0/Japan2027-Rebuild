import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { useResolvedContent } from '../hooks/useResolvedContent'
import { createPackingNotesService } from '../services/packingNotes/index'

function makeItemKey(catIdx, itemIdx) {
  return `${catIdx}_${itemIdx}`
}

function PackingItem({ label, itemKey, checked, onToggle }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '8px 0',
      borderBottom: '1px solid var(--border)',
      cursor: 'pointer',
    }}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={() => onToggle(itemKey)}
        style={{
          marginTop: 2, flexShrink: 0,
          width: 14, height: 14,
          accentColor: 'var(--accent)',
          cursor: 'pointer',
        }}
      />
      <span style={{
        fontFamily: '"Outfit", sans-serif', fontSize: 13.5,
        color: checked ? 'var(--ink4)' : 'var(--ink)',
        textDecoration: checked ? 'line-through' : 'none',
        lineHeight: 1.5,
        transition: 'color 0.15s',
      }}>{label}</span>
    </label>
  )
}

function CategoryCard({ cat, catIdx, checkedMap, onToggle }) {
  const total = cat.items.length
  const done  = cat.items.filter((_, ii) => checkedMap[makeItemKey(catIdx, ii)]).length
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0
  const allDone = done === total

  return (
    <div style={{
      background: 'var(--surf)',
      border: '1px solid var(--border)',
      marginBottom: -1,
    }}>
      {/* Category header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 20px 10px',
        borderBottom: '1px solid var(--border)',
        background: allDone ? '#f0faf0' : 'var(--surf)',
      }}>
        <span style={{ fontSize: 16 }}>{cat.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            letterSpacing: '0.8px', textTransform: 'uppercase',
            color: allDone ? '#2e7d32' : 'var(--ink)',
            fontWeight: 600,
          }}>{cat.category}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {allDone ? (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              background: '#2e7d32', color: '#fff', padding: '2px 7px',
              letterSpacing: '0.5px',
            }}>DONE</span>
          ) : (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              color: 'var(--ink3)',
            }}>{done}/{total}</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: '#E5E2DA' }}>
        <div style={{
          height: '100%',
          background: allDone ? '#4caf50' : 'var(--ink)',
          width: `${pct}%`,
          transition: 'width 0.4s',
        }} />
      </div>

      {/* Items */}
      <div style={{ padding: '0 20px' }}>
        {cat.items.map((item, ii) => {
          const key = makeItemKey(catIdx, ii)
          return (
            <PackingItem
              key={key}
              itemKey={key}
              label={item}
              checked={!!checkedMap[key]}
              onToggle={onToggle}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function Packing() {
  const { user } = useAuth()
  const { activeArc: arc } = useTravel()
  const content = useResolvedContent()
  const arcYear = arc?.year || 2027
  const service = useMemo(() => createPackingNotesService(arcYear, user?.id), [arcYear, user?.id])

  const packingNotes = content?.packingNotes || []

  const [checkedMap, setCheckedMap] = useState(() => service.load())

  // Reload when the arc or signed-in user changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckedMap(service.load())
  }, [service])

  const onToggle = useCallback((key) => {
    setCheckedMap(prev => {
      const next = { ...prev, [key]: !prev[key] }
      service.save(next)
      return next
    })
  }, [service])

  // Overall progress
  const totalItems = packingNotes.reduce((sum, cat) => sum + cat.items.length, 0)
  const doneItems  = packingNotes.reduce((sum, cat, ci) =>
    sum + cat.items.filter((_, ii) => checkedMap[makeItemKey(ci, ii)]).length
  , 0)
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0
  const allDone = doneItems === totalItems && totalItems > 0

  const heroImage = arc?.heroImage || ''

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: heroImage ? `url('${heroImage}')` : 'none',
          background: heroImage ? undefined : 'var(--ink)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(12,12,12,0.1) 0%, rgba(12,12,12,0.7) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px', width: '100%' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>
            Arc {arc?.no || '01'} — {arc?.title || 'Packing'}
          </div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 42,
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff',
          }}>Packing</div>
        </div>
      </div>

      {/* Overall progress */}
      <div style={{
        padding: '20px 52px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--paper)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
          <span style={{
            fontFamily: 'Fraunces, serif', fontSize: 32,
            fontWeight: 600, color: allDone ? '#2e7d32' : 'var(--ink)', lineHeight: 1,
          }}>{doneItems}</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink3)',
          }}>/ {totalItems} items packed</span>
          <span style={{
            marginLeft: 'auto',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            color: allDone ? '#2e7d32' : 'var(--ink3)',
          }}>{pct}%</span>
        </div>

        <div style={{ height: 4, background: '#E5E2DA' }}>
          <div style={{
            height: '100%',
            background: allDone ? '#4caf50' : 'var(--ink)',
            width: `${pct}%`,
            transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>

        {allDone && totalItems > 0 && (
          <div style={{
            marginTop: 10, padding: '8px 14px',
            background: '#f0faf0', border: '1px solid #a5d6a7',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: '#2e7d32', letterSpacing: '0.5px',
          }}>
            ✓ All items packed — ready to travel.
          </div>
        )}
      </div>

      {/* No data */}
      {packingNotes.length === 0 && (
        <div style={{
          padding: '80px 52px', textAlign: 'center',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink4)',
        }}>
          Packing list not yet defined for this arc.
        </div>
      )}

      {/* Categories */}
      <div style={{ padding: '24px 52px', display: 'flex', flexDirection: 'column' }}>
        {packingNotes.map((cat, ci) => (
          <CategoryCard
            key={ci}
            cat={cat}
            catIdx={ci}
            checkedMap={checkedMap}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}
