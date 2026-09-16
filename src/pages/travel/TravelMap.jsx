import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { allPlaces, ITINERARY_NAME_MAP } from '../../data/places/index'
import { usePlaceStatus } from '../../hooks/usePlaceStatus'
import { useTravel } from '../../context/TravelContext'
import { useTripDay } from '../../hooks/useTripDay'
import { resolvePlaces } from '../../services/contentResolver/index'
import { isOnline }       from '../../services/offline/index'

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ── Icon factory ──────────────────────────────────────────────────────────────

const makeIcon = (color, size = 10, ring = false) => L.divIcon({
  className: '',
  html: `<div style="
    width:${size}px;height:${size}px;border-radius:50%;
    background:${ring ? 'none' : color};
    border:${ring ? `3px solid ${color}` : '1.5px solid rgba(255,255,255,0.6)'};
    box-shadow:0 1px 5px rgba(0,0,0,0.3);
  "></div>`,
  iconSize:    [size, size],
  iconAnchor:  [size / 2, size / 2],
  popupAnchor: [0, -size / 2 - 4],
})

// ── Layer filters ─────────────────────────────────────────────────────────────

const FILTER_OPTS = [
  { id: 'all',      label: 'All',       desc: 'All places with coordinates' },
  { id: 'visited',  label: 'Visited',   desc: 'Places you\'ve been' },
  { id: 'wishlist', label: 'Wishlist',  desc: 'Want to visit' },
  { id: 'today',    label: 'Today',     desc: 'Today\'s itinerary' },
  { id: 'favourite',label: '★ Favs',    desc: 'Your favourites' },
]

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TravelMap() {
  const { get, totals } = usePlaceStatus()
  const { activeArc: arc, content } = useTravel()
  const tripDay = useTripDay()
  const [filter, setFilter] = useState('all')
  const [, setSelectedId] = useState(null)
  const online = isOnline()

  const todayIds = useMemo(() => {
    const acts = tripDay.day?.places || []
    return acts.map(p => ITINERARY_NAME_MAP[p.name]).filter(Boolean)
  }, [tripDay.day])

  // Scope the map to places belonging to the active arc's trip(s)
  const arcPlaces = useMemo(() => {
    if (!arc) return []
    const tripIds = new Set(arc.tripIds)
    return resolvePlaces(allPlaces).filter(p => tripIds.has(p.tripId ?? 'japan2027'))
  }, [arc])

  const visiblePlaces = useMemo(() => {
    return arcPlaces.filter(p => {
      if (!p.coordinates?.lat || !p.coordinates?.lng) return false
      const s = get(p.id)
      switch (filter) {
        case 'visited':   return s.visited
        case 'wishlist':  return s.wantToVisit && !s.visited
        case 'today':     return todayIds.includes(p.id)
        case 'favourite': return s.favourite
        default:          return s.visited || s.wantToVisit || s.favourite || todayIds.includes(p.id)
      }
    })
  }, [arcPlaces, filter, totals.visited, totals.want, totals.favourite]) // eslint-disable-line react-hooks/exhaustive-deps

  const getMarkerConfig = (place) => {
    const s         = get(place.id)
    const isToday   = todayIds.includes(place.id)
    if (isToday)       return { color: '#C9954C', size: 14, ring: false }
    if (s.favourite)   return { color: '#b5451b', size: 12, ring: false }
    if (s.visited)     return { color: '#2e7d32', size: 10, ring: false }
    if (s.wantToVisit) return { color: '#555',    size: 8,  ring: true  }
    return { color: '#aaa', size: 7, ring: true }
  }

  // Active arc's own map center/zoom, falling back to a world view
  const center = content?.map?.center || [20, 0]
  const zoom   = content?.map?.zoom ?? 2

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Offline notice */}
      {!online && (
        <div style={{
          padding: '6px 14px', background: '#fbe9e7',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: '#b5451b', textAlign: 'center',
        }}>
          ◌ OFFLINE — Map tiles may not load · markers work from cache
        </div>
      )}

      {/* Filter strip */}
      <div style={{
        padding: '8px 12px', borderBottom: '1px solid var(--border)',
        display: 'flex', gap: 5, overflowX: 'auto',
        background: 'var(--surf)', flexShrink: 0,
      }}>
        {FILTER_OPTS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              flexShrink: 0,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              background: filter === f.id ? 'var(--ink)' : 'none',
              color: filter === f.id ? 'var(--surf)' : 'var(--ink4)',
              border: `1px solid ${filter === f.id ? 'var(--ink)' : 'var(--border)'}`,
              padding: '5px 10px', cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
        <span style={{
          flexShrink: 0, fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink4)', alignSelf: 'center', paddingLeft: 6,
        }}>
          {visiblePlaces.length} places
        </span>
      </div>

      {/* Legend */}
      <div style={{
        padding: '5px 12px', background: 'var(--paper)',
        display: 'flex', gap: 12, flexShrink: 0,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)',
      }}>
        {[
          { color: '#C9954C', label: 'Today', ring: false },
          { color: '#b5451b', label: 'Fav',   ring: false },
          { color: '#2e7d32', label: 'Visited', ring: false },
          { color: '#555',    label: 'Wishlist', ring: true },
        ].map(l => (
          <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: l.ring ? 'none' : l.color,
              border: l.ring ? `2px solid ${l.color}` : 'none',
            }} />
            {l.label}
          </span>
        ))}
      </div>

      {/* Map */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom
          zoomSnap={0.5}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {visiblePlaces.map(place => {
            const cfg   = getMarkerConfig(place)
            const s     = get(place.id)
            const isToday = todayIds.includes(place.id)

            return (
              <Marker
                key={place.id}
                position={[place.coordinates.lat, place.coordinates.lng]}
                icon={makeIcon(cfg.color, cfg.size, cfg.ring)}
                eventHandlers={{ click: () => setSelectedId(place.id) }}
              >
                <Popup>
                  <div style={{ minWidth: 180, maxWidth: 220 }}>
                    {(place.heroImage || place.image) && (
                      <div style={{ height: 80, margin: '-8px -8px 8px', overflow: 'hidden' }}>
                        <img src={place.heroImage || place.image} alt={place.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: '#888', marginBottom: 3 }}>
                      {place.city} · {place.category}
                    </div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 6 }}>
                      {place.name}
                    </div>

                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 7 }}>
                      {isToday   && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, background: '#fff3e0', color: '#C9954C', padding: '1px 5px' }}>TODAY</span>}
                      {s.visited && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, background: '#e8f5e9', color: '#2e7d32', padding: '1px 5px' }}>✓ VISITED</span>}
                      {s.favourite && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, background: '#fbe9e7', color: '#b5451b', padding: '1px 5px' }}>★ FAV</span>}
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <a href={`/place/${place.id}`} style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                        color: '#111', textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: 1,
                      }}>View →</a>
                      <a
                        href={place.googleMaps || place.mapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + (place.country || ''))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                          color: '#555', textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: 1,
                        }}
                      >
                        Maps ↗
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}
