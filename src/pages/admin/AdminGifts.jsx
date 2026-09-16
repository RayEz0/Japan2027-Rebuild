import { useState, useEffect, useCallback } from 'react'
import { ARC_CONTENT } from '../../data/arcs/index'
import { ARCS } from '../../data/worldTour/arcs'
import { getGiftIdeasOverride, setGiftIdeasOverride } from '../../services/cms/index'
import { resolveGiftIdeas } from '../../services/contentResolver/index'

// ── Merge bundled ARC_CONTENT.giftIdeas + CMS overrides ─────────────────────
// Section-level: a country present in the CMS override replaces that whole
// country's items; countries not touched by CMS stay bundled.

function loadCountries(arcYear) {
  const bundled = ARC_CONTENT[arcYear]?.giftIdeas || []
  const cms = getGiftIdeasOverride(arcYear)
  if (!cms?.countries?.length) return bundled.map(c => ({ ...c, items: [...c.items] }))
  return resolveGiftIdeas(arcYear, bundled).map(c => ({ ...c, items: [...c.items] }))
}

const INPUT = {
  padding: '6px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
  background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
}

// ── Country block ─────────────────────────────────────────────────────────────

function CountryBlock({ country, countryIdx, onUpdateMeta, onUpdateItem, onAddItem, onDeleteItem }) {
  const [open, setOpen] = useState(countryIdx === 0)

  return (
    <div style={{ marginBottom: 8, border: '1.5px solid var(--border)', background: 'var(--surf)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
        background: open ? 'var(--border)' : 'var(--surf)',
        borderBottom: open ? '1px solid var(--border)' : 'none',
      }}>
        <input
          style={{ ...INPUT, width: 44, textAlign: 'center', flexShrink: 0 }}
          value={country.flag}
          onChange={e => onUpdateMeta(countryIdx, 'flag', e.target.value)}
        />
        <input
          style={{ ...INPUT, flex: 1, fontWeight: 600 }}
          value={country.country}
          onChange={e => onUpdateMeta(countryIdx, 'country', e.target.value)}
          placeholder="Country name…"
        />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>
          {country.items.length} ideas
        </span>
        <button onClick={() => setOpen(v => !v)} style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--ink3)', padding: '3px 8px', fontSize: 12 }}>
          {open ? '▾' : '▸'}
        </button>
      </div>

      {open && (
        <div style={{ padding: '12px 14px' }}>
          {country.items.map((item, ii) => (
            <div key={ii} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 6, marginBottom: 6 }}>
              <input
                style={{ ...INPUT, boxSizing: 'border-box' }}
                value={item.name}
                onChange={e => onUpdateItem(countryIdx, ii, 'name', e.target.value)}
                placeholder="Gift idea…"
              />
              <input
                style={{ ...INPUT, boxSizing: 'border-box' }}
                value={item.where}
                onChange={e => onUpdateItem(countryIdx, ii, 'where', e.target.value)}
                placeholder="Where to buy…"
              />
              <button
                onClick={() => onDeleteItem(countryIdx, ii)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#b5451b', fontSize: 14, padding: '0 4px' }}
              >×</button>
            </div>
          ))}
          <button
            onClick={() => onAddItem(countryIdx)}
            style={{
              width: '100%', border: '1px dashed var(--border)', background: 'none',
              color: 'var(--ink4)', padding: '7px', cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, marginTop: 4,
            }}
          >
            + Add Gift Idea
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminGifts({ arcYear = ARCS[0].year }) {
  const [countries, setCountries] = useState(() => loadCountries(arcYear))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountries(loadCountries(arcYear))
  }, [arcYear])

  const handleSave = () => {
    setGiftIdeasOverride(arcYear, { countries })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const handleReset = () => {
    if (!window.confirm('Reset to bundled gift ideas? CMS edits will be lost.')) return
    const bundled = (ARC_CONTENT[arcYear]?.giftIdeas || []).map(c => ({ ...c, items: [...c.items] }))
    setCountries(bundled)
    setGiftIdeasOverride(arcYear, { countries: bundled })
  }

  const handleAddCountry = () => {
    setCountries(prev => [...prev, { country: 'New Country', flag: '🌍', items: [] }])
  }

  const updateMeta = useCallback((idx, key, val) => {
    setCountries(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [key]: val }
      return next
    })
  }, [])

  const addItem = useCallback((idx) => {
    setCountries(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], items: [...next[idx].items, { name: '', where: '' }] }
      return next
    })
  }, [])

  const updateItem = useCallback((idx, itemIdx, key, val) => {
    setCountries(prev => {
      const next = [...prev]
      const items = [...next[idx].items]
      items[itemIdx] = { ...items[itemIdx], [key]: val }
      next[idx] = { ...next[idx], items }
      return next
    })
  }, [])

  const deleteItem = useCallback((idx, itemIdx) => {
    setCountries(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], items: next[idx].items.filter((_, i) => i !== itemIdx) }
      return next
    })
  }, [])

  const totalItems = countries.reduce((s, c) => s + c.items.length, 0)

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
            Gift Ideas Editor — {ARCS.find(a => a.year === arcYear)?.title || arcYear}
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
            {countries.length} Countries · {totalItems} Ideas
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
          <button onClick={handleAddCountry} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink)',
            padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            + Add Country
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
        {countries.map((country, i) => (
          <CountryBlock
            key={i}
            country={country}
            countryIdx={i}
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
