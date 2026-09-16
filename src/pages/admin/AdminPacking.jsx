import { useState, useEffect, useCallback } from 'react'
import { ARC_CONTENT } from '../../data/arcs/index'
import { ARCS } from '../../data/worldTour/arcs'
import { getPackingNotesOverride, setPackingNotesOverride } from '../../services/cms/index'
import { resolvePackingNotes } from '../../services/contentResolver/index'

// ── Merge bundled ARC_CONTENT.packingNotes + CMS overrides ──────────────────
// Section-level: a category present in the CMS override replaces that whole
// category's icon/items; categories not touched by CMS stay bundled.

function loadCategories(arcYear) {
  const bundled = ARC_CONTENT[arcYear]?.packingNotes || []
  const cms = getPackingNotesOverride(arcYear)
  if (!cms?.categories?.length) return bundled.map(c => ({ ...c, items: [...c.items] }))
  return resolvePackingNotes(arcYear, bundled).map(c => ({ ...c, items: [...c.items] }))
}

const INPUT = {
  padding: '6px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
  background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
}

// ── Category block ────────────────────────────────────────────────────────────

function CategoryBlock({ cat, catIdx, onUpdateMeta, onUpdateItem, onAddItem, onDeleteItem }) {
  const [open, setOpen] = useState(catIdx === 0)

  return (
    <div style={{ marginBottom: 8, border: '1.5px solid var(--border)', background: 'var(--surf)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
        background: open ? 'var(--border)' : 'var(--surf)',
        borderBottom: open ? '1px solid var(--border)' : 'none',
      }}>
        <input
          style={{ ...INPUT, width: 44, textAlign: 'center', flexShrink: 0 }}
          value={cat.icon}
          onChange={e => onUpdateMeta(catIdx, 'icon', e.target.value)}
        />
        <input
          style={{ ...INPUT, flex: 1, fontWeight: 600 }}
          value={cat.category}
          onChange={e => onUpdateMeta(catIdx, 'category', e.target.value)}
          placeholder="Category name…"
        />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>
          {cat.items.length} items
        </span>
        <button onClick={() => setOpen(v => !v)} style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--ink3)', padding: '3px 8px', fontSize: 12 }}>
          {open ? '▾' : '▸'}
        </button>
      </div>

      {open && (
        <div style={{ padding: '12px 14px' }}>
          {cat.items.map((item, ii) => (
            <div key={ii} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <input
                style={{ ...INPUT, flex: 1, boxSizing: 'border-box' }}
                value={item}
                onChange={e => onUpdateItem(catIdx, ii, e.target.value)}
              />
              <button
                onClick={() => onDeleteItem(catIdx, ii)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#b5451b', fontSize: 14, padding: '0 4px' }}
              >×</button>
            </div>
          ))}
          <button
            onClick={() => onAddItem(catIdx)}
            style={{
              width: '100%', border: '1px dashed var(--border)', background: 'none',
              color: 'var(--ink4)', padding: '7px', cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, marginTop: 4,
            }}
          >
            + Add Item
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminPacking({ arcYear = ARCS[0].year }) {
  const [categories, setCategories] = useState(() => loadCategories(arcYear))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategories(loadCategories(arcYear))
  }, [arcYear])

  const handleSave = () => {
    setPackingNotesOverride(arcYear, { categories })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const handleReset = () => {
    if (!window.confirm('Reset to bundled packing notes? CMS edits will be lost.')) return
    const bundled = (ARC_CONTENT[arcYear]?.packingNotes || []).map(c => ({ ...c, items: [...c.items] }))
    setCategories(bundled)
    setPackingNotesOverride(arcYear, { categories: bundled })
  }

  const handleAddCategory = () => {
    setCategories(prev => [...prev, { category: 'New Category', icon: '📦', items: [] }])
  }

  const updateMeta = useCallback((catIdx, key, val) => {
    setCategories(prev => {
      const next = [...prev]
      next[catIdx] = { ...next[catIdx], [key]: val }
      return next
    })
  }, [])

  const addItem = useCallback((catIdx) => {
    setCategories(prev => {
      const next = [...prev]
      next[catIdx] = { ...next[catIdx], items: [...next[catIdx].items, ''] }
      return next
    })
  }, [])

  const updateItem = useCallback((catIdx, itemIdx, val) => {
    setCategories(prev => {
      const next = [...prev]
      const items = [...next[catIdx].items]
      items[itemIdx] = val
      next[catIdx] = { ...next[catIdx], items }
      return next
    })
  }, [])

  const deleteItem = useCallback((catIdx, itemIdx) => {
    setCategories(prev => {
      const next = [...prev]
      next[catIdx] = { ...next[catIdx], items: next[catIdx].items.filter((_, i) => i !== itemIdx) }
      return next
    })
  }, [])

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0)

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
            Packing Editor — {ARCS.find(a => a.year === arcYear)?.title || arcYear}
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
            {categories.length} Categories · {totalItems} Items
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {saved && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32', alignSelf: 'center' }}>✓ Saved</span>}
          <button onClick={handleReset} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink3)',
            padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            ↺ Reset to Bundled
          </button>
          <button onClick={handleAddCategory} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink)',
            padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            + Add Category
          </button>
          <button onClick={handleSave} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            background: 'var(--ink)', color: 'var(--surf)', border: 'none',
            padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            Save
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {categories.map((cat, i) => (
          <CategoryBlock
            key={i}
            cat={cat}
            catIdx={i}
            onUpdateMeta={updateMeta}
            onUpdateItem={updateItem}
            onAddItem={addItem}
            onDeleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  )
}
