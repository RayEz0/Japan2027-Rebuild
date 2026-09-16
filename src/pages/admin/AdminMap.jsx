import { useState, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { allPlaces } from '../../data/places/index'
import { getAllPlaceOverrides, setPlaceOverride } from '../../services/cms/index'

// Fix Leaflet icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ── Icons ─────────────────────────────────────────────────────────────────────

const makeIcon = (color = '#333', selected = false) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:${selected ? 16 : 10}px;height:${selected ? 16 : 10}px;
      border-radius:50%;background:${color};
      border:${selected ? '3px solid #fff' : '1.5px solid rgba(255,255,255,0.5)'};
      box-shadow:0 1px 5px rgba(0,0,0,0.35);
      transition:all 0.12s;
    "></div>`,
    iconSize:    [selected ? 16 : 10, selected ? 16 : 10],
    iconAnchor:  [selected ? 8 : 5, selected ? 8 : 5],
    popupAnchor: [0, -8],
  })

const CAT_COLORS = {
  photography: '#8B5CF6', viewpoint: '#8B5CF6', sunrise: '#F59E0B', sunset: '#F59E0B',
  'night-view': '#1D4ED8', food: '#EF4444', cafe: '#92400E', coffee: '#92400E',
  museum: '#059669', shrine: '#6366F1', temple: '#6366F1', castle: '#374151',
  basketball: '#F97316', 'car-culture': '#6B7280', cars: '#6B7280',
  'hidden-gem': '#EC4899', 'road-stop': '#EC4899', nature: '#16A34A', park: '#16A34A',
}

// ── Click-to-add handler ──────────────────────────────────────────────────────

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) { onMapClick(e.latlng) },
  })
  return null
}

// ── Coord editor panel ────────────────────────────────────────────────────────

function CoordEditor({ place, onSave, onCancel }) {
  const overrides = getAllPlaceOverrides()
  const existing  = overrides[place.id] || {}
  const merged    = { ...place, ...existing }

  const [lat, setLat] = useState(merged.coordinates?.lat || '')
  const [lng, setLng] = useState(merged.coordinates?.lng || '')

  const INPUT = {
    padding: '7px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
    border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)',
    width: '100%', boxSizing: 'border-box', outline: 'none',
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
        {place.name}
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginBottom: 14 }}>
        {place.city} · {place.category}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Latitude</label>
        <input style={INPUT} type="number" step="0.000001" value={lat} onChange={e => setLat(e.target.value)} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Longitude</label>
        <input style={INPUT} type="number" step="0.000001" value={lng} onChange={e => setLng(e.target.value)} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onSave(place.id, parseFloat(lat), parseFloat(lng))}
          style={{
            flex: 1, background: 'var(--ink)', color: 'var(--surf)', border: 'none',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9, padding: '8px',
            cursor: 'pointer', letterSpacing: '0.4px',
          }}
        >
          Save Coords
        </button>
        <button
          onClick={onCancel}
          style={{
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink3)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9, padding: '8px 14px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── New place panel ───────────────────────────────────────────────────────────

function NewPlacePanel({ latlng, onCancel, onSaved }) {
  const [form, setForm] = useState({ name: '', city: '', country: '', category: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const INPUT = {
    padding: '6px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12,
    border: '1px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)',
    width: '100%', boxSizing: 'border-box', outline: 'none', marginBottom: 8,
  }

  const handleSave = () => {
    if (!form.name) return
    const id = `cms-${form.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    setPlaceOverride(id, {
      ...form,
      coordinates: { lat: latlng.lat, lng: latlng.lng },
      _cmsCreated: true,
    })
    onSaved()
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
        New Place
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginBottom: 12 }}>
        {latlng.lat.toFixed(6)}, {latlng.lng.toFixed(6)}
      </div>
      <input style={INPUT} placeholder="Name *" value={form.name} onChange={e => set('name', e.target.value)} />
      <input style={INPUT} placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
      <input style={INPUT} placeholder="Country" value={form.country} onChange={e => set('country', e.target.value)} />
      <input style={INPUT} placeholder="Category" value={form.category} onChange={e => set('category', e.target.value)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleSave} style={{
          flex: 1, background: 'var(--ink)', color: 'var(--surf)', border: 'none',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9, padding: '8px', cursor: 'pointer',
        }}>Create Place</button>
        <button onClick={onCancel} style={{
          border: '1px solid var(--border)', background: 'none', color: 'var(--ink3)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9, padding: '8px 12px', cursor: 'pointer',
        }}>Cancel</button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminMap() {
  const [selected,    setSelected]   = useState(null)
  const [newPoint,    setNewPoint]   = useState(null)
  const [overrides,   setOverrides]  = useState(() => getAllPlaceOverrides())
  const [savedFlash,  setSavedFlash] = useState(false)
  const [countryFilt, setCountryFilt]= useState('')
  const [showMissing, setShowMissing]= useState(false)

  const countries = useMemo(() => [...new Set(allPlaces.map(p => p.country || 'Japan'))].sort(), [])

  const placesWithCoords = useMemo(() => {
    return allPlaces.filter(p => {
      const o = overrides[p.id]
      const coords = o?.coordinates || p.coordinates
      const has = coords?.lat && coords?.lng
      if (showMissing) return !has
      const matchCtr = !countryFilt || (p.country || 'Japan') === countryFilt
      return has && matchCtr
    })
  }, [overrides, countryFilt, showMissing])

  const selectedPlace = useMemo(
    () => selected ? allPlaces.find(p => p.id === selected) : null,
    [selected]
  )

  const handleSaveCoords = useCallback((id, lat, lng) => {
    const existing = overrides[id] || {}
    setPlaceOverride(id, { ...existing, coordinates: { lat, lng } })
    setOverrides(getAllPlaceOverrides())
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
    setSelected(null)
  }, [overrides])

  const handleMapClick = useCallback((latlng) => {
    if (selected) return
    setNewPoint(latlng)
  }, [selected])

  const handleNewSaved = () => {
    setOverrides(getAllPlaceOverrides())
    setNewPoint(null)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Sidebar */}
      <div style={{
        width: 300, flexShrink: 0, borderRight: '1.5px solid var(--border)',
        display: 'flex', flexDirection: 'column', background: 'var(--surf)',
      }}>
        {/* Header */}
        <div style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 6 }}>
            Map Editor
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700, color: 'var(--ink)', lineHeight: 1, marginBottom: 10 }}>
            Place Coordinates
          </div>

          <select
            value={countryFilt}
            onChange={e => setCountryFilt(e.target.value)}
            style={{
              width: '100%', padding: '6px 8px', marginBottom: 6, boxSizing: 'border-box',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink)',
              background: 'var(--paper)', border: '1px solid var(--border)', cursor: 'pointer',
            }}
          >
            <option value="">All countries</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showMissing}
              onChange={e => setShowMissing(e.target.checked)}
            />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)' }}>
              Show only missing coords
            </span>
          </label>
        </div>

        {/* Instructions */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', lineHeight: 1.8 }}>
            Click a marker → edit coordinates<br />
            Click blank map → create new place<br />
            {savedFlash && <span style={{ color: '#2e7d32' }}>✓ Saved!</span>}
          </div>
        </div>

        {/* Selected / New form */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {newPoint && !selected && (
            <NewPlacePanel latlng={newPoint} onCancel={() => setNewPoint(null)} onSaved={handleNewSaved} />
          )}
          {selectedPlace && !newPoint && (
            <CoordEditor
              place={selectedPlace}
              onSave={handleSaveCoords}
              onCancel={() => setSelected(null)}
            />
          )}
          {!selectedPlace && !newPoint && (
            <div style={{ padding: 14 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>
                {placesWithCoords.length} places visible
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[35.6762, 139.6503]}
          zoom={5}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <ClickHandler onMapClick={handleMapClick} />

          {placesWithCoords.map(p => {
            const o      = overrides[p.id]
            const coords = o?.coordinates || p.coordinates
            if (!coords?.lat || !coords?.lng) return null
            const color   = CAT_COLORS[p.category] || '#555'
            const isSelected = p.id === selected

            return (
              <Marker
                key={p.id}
                position={[coords.lat, coords.lng]}
                icon={makeIcon(color, isSelected)}
                eventHandlers={{ click: () => { setNewPoint(null); setSelected(p.id) } }}
              >
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#888' }}>{p.city} · {p.category}</div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#aaa', marginTop: 4 }}>
                      {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                    </div>
                    {o?.coordinates && (
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: '#C9954C', marginTop: 3 }}>● CMS override</div>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          })}

          {/* New point preview */}
          {newPoint && (
            <Marker position={[newPoint.lat, newPoint.lng]} icon={makeIcon('#2e7d32', true)}>
              <Popup>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9 }}>New place</div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  )
}
