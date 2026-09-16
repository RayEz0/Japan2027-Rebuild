import { useState, useMemo, useCallback } from 'react'
import { allPlaces }      from '../../data/places/index'
import {
  getAllPlaceOverrides, setPlaceOverride, deletePlaceOverride,
} from '../../services/cms/index'

// ── Category options ──────────────────────────────────────────────────────────

const CATEGORIES = [
  'landmark', 'attraction', 'food', 'nightlife', 'cafe', 'coffee', 'market',
  'entertainment', 'shrine', 'temple', 'park', 'nature', 'garden', 'sports',
  'basketball', 'car-culture', 'cars', 'historic', 'architecture', 'castle',
  'museum', 'viewpoint', 'sunrise', 'sunset', 'photography', 'hiking',
  'hidden-gem', 'road-stop', 'night-view',
]

const STATUS_OPTS = ['active', 'draft', 'archived']

const PRIORITY_OPTS = ['', 'must-do', 'high', 'medium', 'low']

// ── Field components ──────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: 'block', fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
        color: 'var(--ink4)', letterSpacing: '0.4px', textTransform: 'uppercase',
        marginBottom: 5,
      }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const INPUT_STYLE = {
  width: '100%', padding: '7px 10px', boxSizing: 'border-box',
  fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)',
  background: 'var(--paper)', border: '1px solid var(--border)',
  outline: 'none',
}

const SELECT_STYLE = { ...INPUT_STYLE, cursor: 'pointer' }

// ── Place editor form ─────────────────────────────────────────────────────────

function PlaceEditor({ place, onSaved, onClose }) {
  const overrides  = getAllPlaceOverrides()
  const existing   = overrides[place.id] || {}

  const merged = { ...place, ...existing }

  const [form, setForm] = useState({
    name:             merged.name             || '',
    country:          merged.country          || '',
    city:             merged.city             || '',
    category:         merged.category         || '',
    lat:              merged.coordinates?.lat || '',
    lng:              merged.coordinates?.lng || '',
    heroImage:        merged.heroImage || merged.image || '',
    description:      merged.description      || '',
    bestSeason:       merged.bestSeason       || '',
    weather:          merged.weather          || '',
    parking:          merged.parking          || '',
    publicTransport:  merged.publicTransport  || '',
    accessibility:    merged.accessibility    || '',
    priority:         merged.priority         || '',
    status:           merged._status          || 'active',
    photographyNotes: merged.photographyNotes || '',
    foodRecs:         merged.foodRecs         || '',
    tags:             (merged.tags || []).join(', '),
    googleMaps:       merged.googleMaps || merged.mapsUrl || '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const hasOverride = !!overrides[place.id]

  const handleSave = () => {
    const data = {
      ...form,
      coordinates: { lat: parseFloat(form.lat) || null, lng: parseFloat(form.lng) || null },
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      _status: form.status,
    }
    setPlaceOverride(place.id, data)
    onSaved?.()
  }

  const handleReset = () => {
    deletePlaceOverride(place.id)
    onSaved?.()
  }

  return (
    <div style={{ padding: '20px 24px', height: '100%', overflowY: 'auto' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20,
      }}>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>
            {place.name}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginTop: 3 }}>
            ID: {place.id}
            {hasOverride && <span style={{ marginLeft: 8, color: '#C9954C' }}>● CMS OVERRIDE ACTIVE</span>}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: '1px solid var(--border)', color: 'var(--ink3)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, padding: '5px 12px', cursor: 'pointer',
        }}>
          ✕ Close
        </button>
      </div>

      {/* Image preview */}
      {form.heroImage && (
        <div style={{ height: 140, marginBottom: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img src={form.heroImage} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Two-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>

        <Field label="Name">
          <input style={INPUT_STYLE} value={form.name} onChange={e => set('name', e.target.value)} />
        </Field>

        <Field label="Category">
          <select style={SELECT_STYLE} value={form.category} onChange={e => set('category', e.target.value)}>
            <option value="">— select —</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Country">
          <input style={INPUT_STYLE} value={form.country} onChange={e => set('country', e.target.value)} />
        </Field>

        <Field label="City">
          <input style={INPUT_STYLE} value={form.city} onChange={e => set('city', e.target.value)} />
        </Field>

        <Field label="Latitude">
          <input style={INPUT_STYLE} value={form.lat} onChange={e => set('lat', e.target.value)} type="number" step="0.000001" />
        </Field>

        <Field label="Longitude">
          <input style={INPUT_STYLE} value={form.lng} onChange={e => set('lng', e.target.value)} type="number" step="0.000001" />
        </Field>

        <Field label="Priority">
          <select style={SELECT_STYLE} value={form.priority} onChange={e => set('priority', e.target.value)}>
            {PRIORITY_OPTS.map(p => <option key={p} value={p}>{p || '— none —'}</option>)}
          </select>
        </Field>

        <Field label="Status">
          <select style={SELECT_STYLE} value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

      </div>

      {/* Hero image URL */}
      <Field label="Hero Image URL">
        <input style={INPUT_STYLE} value={form.heroImage} onChange={e => set('heroImage', e.target.value)} placeholder="https://..." />
      </Field>

      {/* Google Maps URL */}
      <Field label="Google Maps URL">
        <input style={INPUT_STYLE} value={form.googleMaps} onChange={e => set('googleMaps', e.target.value)} placeholder="https://maps.google.com/..." />
      </Field>

      {/* Description */}
      <Field label="Description">
        <textarea
          style={{ ...INPUT_STYLE, minHeight: 72, resize: 'vertical' }}
          value={form.description}
          onChange={e => set('description', e.target.value)}
        />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Best Season">
          <input style={INPUT_STYLE} value={form.bestSeason} onChange={e => set('bestSeason', e.target.value)} placeholder="e.g. Nov–Mar" />
        </Field>
        <Field label="Weather">
          <input style={INPUT_STYLE} value={form.weather} onChange={e => set('weather', e.target.value)} placeholder="e.g. Cold, Clear" />
        </Field>
        <Field label="Parking">
          <input style={INPUT_STYLE} value={form.parking} onChange={e => set('parking', e.target.value)} />
        </Field>
        <Field label="Public Transport">
          <input style={INPUT_STYLE} value={form.publicTransport} onChange={e => set('publicTransport', e.target.value)} />
        </Field>
      </div>

      <Field label="Accessibility">
        <input style={INPUT_STYLE} value={form.accessibility} onChange={e => set('accessibility', e.target.value)} />
      </Field>

      <Field label="Photography Notes">
        <textarea
          style={{ ...INPUT_STYLE, minHeight: 60, resize: 'vertical' }}
          value={form.photographyNotes}
          onChange={e => set('photographyNotes', e.target.value)}
        />
      </Field>

      <Field label="Food Recommendations">
        <textarea
          style={{ ...INPUT_STYLE, minHeight: 60, resize: 'vertical' }}
          value={form.foodRecs}
          onChange={e => set('foodRecs', e.target.value)}
        />
      </Field>

      <Field label="Tags (comma-separated)">
        <input style={INPUT_STYLE} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="sakura, night, photography" />
      </Field>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            background: 'var(--ink)', color: 'var(--surf)',
            border: 'none', padding: '9px 16px', cursor: 'pointer',
            letterSpacing: '0.4px', textTransform: 'uppercase',
          }}
        >
          Save Override
        </button>
        {hasOverride && (
          <button
            onClick={handleReset}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              background: 'none', border: '1px solid #b5451b', color: '#b5451b',
              padding: '9px 16px', cursor: 'pointer',
              letterSpacing: '0.4px', textTransform: 'uppercase',
            }}
          >
            Remove Override
          </button>
        )}
      </div>

      {hasOverride && (
        <div style={{
          marginTop: 10, padding: '8px 12px', background: '#FFFBEB',
          border: '1px solid #C9A227', fontFamily: '"JetBrains Mono", monospace',
          fontSize: 7.5, color: '#92690a',
        }}>
          ● CMS override is active for this place. Static JS file is not modified.
          Export JSON to persist changes permanently.
        </div>
      )}
    </div>
  )
}

// ── Place list item ───────────────────────────────────────────────────────────

function PlaceItem({ place, overrides, active, onClick }) {
  const hasOverride = !!overrides[place.id]
  const hasCoords   = !!(place.coordinates?.lat)
  const hasImage    = !!(place.heroImage || place.image)

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', padding: '9px 12px',
        background: active ? 'var(--border)' : 'var(--surf)',
        border: 'none', borderBottom: '1px solid var(--border)',
        borderLeft: active ? '3px solid var(--ink)' : '3px solid transparent',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      {/* Indicators */}
      <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: hasImage  ? '#2e7d32' : '#ddd' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: hasCoords ? '#2e7d32' : '#ddd' }} />
        {hasOverride && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9954C' }} />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: active ? 600 : 400,
          color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {place.name}
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginTop: 1 }}>
          {place.city}
        </div>
      </div>

      {place.category && (
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 6.5,
          color: 'var(--ink4)', flexShrink: 0, maxWidth: 60,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {place.category}
        </span>
      )}
    </button>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminPlaces() {
  const [query,          setQuery]    = useState('')
  const [catFilter,      setCatFilter]= useState('')
  const [countryFilter,  setCountryFilter] = useState('')
  const [selected,       setSelected] = useState(null)
  const [overrides,      setOverrides] = useState(() => getAllPlaceOverrides())
  const [savedFlash,     setSavedFlash] = useState(false)

  const countries = useMemo(() => [...new Set(allPlaces.map(p => p.country || 'Japan'))].sort(), [])
  const cats      = useMemo(() => [...new Set(allPlaces.map(p => p.category).filter(Boolean))].sort(), [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return allPlaces.filter(p => {
      const matchQ   = !q || p.name.toLowerCase().includes(q) || p.city?.toLowerCase().includes(q)
      const matchCat = !catFilter || p.category === catFilter
      const matchCtr = !countryFilter || (p.country || 'Japan') === countryFilter
      return matchQ && matchCat && matchCtr
    })
  }, [query, catFilter, countryFilter])

  const selectedPlace = useMemo(
    () => selected ? allPlaces.find(p => p.id === selected) : null,
    [selected]
  )

  const handleSaved = useCallback(() => {
    setOverrides(getAllPlaceOverrides())
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* LEFT — Place list */}
      <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1.5px solid var(--border)', height: '100vh', overflowY: 'auto' }}>

        {/* Header + search */}
        <div style={{ padding: '16px 12px 10px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--surf)', zIndex: 10 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 8,
          }}>
            {filtered.length} / {allPlaces.length} places
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search places…"
            style={{
              width: '100%', padding: '7px 10px', boxSizing: 'border-box',
              fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
              background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
              marginBottom: 6,
            }}
          />
          <div style={{ display: 'flex', gap: 5 }}>
            <select
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
              style={{
                flex: 1, padding: '5px 6px',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink)',
                background: 'var(--paper)', border: '1px solid var(--border)', cursor: 'pointer',
              }}
            >
              <option value="">All countries</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              style={{
                flex: 1, padding: '5px 6px',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink)',
                background: 'var(--paper)', border: '1px solid var(--border)', cursor: 'pointer',
              }}
            >
              <option value="">All cats</option>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          padding: '6px 12px', borderBottom: '1px solid var(--border)',
          display: 'flex', gap: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)',
        }}>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#2e7d32', marginRight: 3 }} />img</span>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#2e7d32', marginRight: 3 }} />coords</span>
          <span><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#C9954C', marginRight: 3 }} />override</span>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(p => (
            <PlaceItem
              key={p.id}
              place={p}
              overrides={overrides}
              active={p.id === selected}
              onClick={() => setSelected(p.id)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — Editor */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>

        {savedFlash && (
          <div style={{
            position: 'fixed', top: 20, right: 20, zIndex: 9999,
            background: '#2e7d32', color: '#fff', padding: '8px 18px',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            letterSpacing: '0.4px',
          }}>
            ✓ Saved
          </div>
        )}

        {selectedPlace ? (
          <PlaceEditor
            key={selectedPlace.id}
            place={selectedPlace}
            onSaved={handleSaved}
            onClose={() => setSelected(null)}
          />
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '100%', flexDirection: 'column', gap: 12,
          }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, color: 'var(--ink2)' }}>
              Select a place to edit
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)' }}>
              {allPlaces.length} places · {Object.keys(overrides).length} CMS overrides
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
