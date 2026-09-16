import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { fetchRoadRoute } from '../../lib/routeGeometry'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const TRANSPORT_STYLES = {
  rental_car: { weight: 5, opacity: 0.85, dashArray: null  },
  camper_van: { weight: 5, opacity: 0.85, dashArray: null  },
  road_trip:  { weight: 5, opacity: 0.85, dashArray: null  },
  train:      { weight: 2.5, opacity: 0.75, dashArray: null  },
  bus:        { weight: 2, opacity: 0.60, dashArray: '5 5' },
  ferry:      { weight: 2.5, opacity: 0.65, dashArray: '8 5' },
  flight:     { weight: 1.5, opacity: 0.32, dashArray: '4 9' },
  walking:    { weight: 2, opacity: 0.68, dashArray: '3 4' },
}

const TRANSPORT_COLORS = {
  camper_van: '#16A34A',
  train:      '#374151',
  bus:        '#EA580C',
  ferry:      '#2563EB',
  flight:     '#9CA3AF',
  walking:    '#059669',
}

const ROAD_TYPES = new Set(['rental_car', 'camper_van', 'road_trip'])
const OSRM_TYPES = new Set(['rental_car', 'camper_van', 'road_trip', 'bus'])

function segColor(type, accent) {
  return TRANSPORT_COLORS[type] || accent
}

function makeStopIcon(color, type = 'primary') {
  const size   = type === 'primary' ? 11 : 7
  const border = type === 'primary' ? 2.5 : 1.5
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:${border}px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.35)"></div>`,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 3],
  })
}

function SegmentPolyline({ seg, accent }) {
  const [pts, setPts] = useState(seg.waypoints || [])
  const color   = segColor(seg.transportType, accent)
  const style   = TRANSPORT_STYLES[seg.transportType] || TRANSPORT_STYLES.train
  const isRoad  = ROAD_TYPES.has(seg.transportType)
  const osrmOk  = OSRM_TYPES.has(seg.transportType)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPts(seg.waypoints || [])
    if (!osrmOk || !seg.waypoints || seg.waypoints.length < 2) return
    let cancelled = false
    fetchRoadRoute(seg.waypoints, seg.label).then(route => {
      if (!cancelled && route && route.length > seg.waypoints.length) setPts(route)
    })
    return () => { cancelled = true }
  }, [seg.id, osrmOk]) // eslint-disable-line

  if (pts.length < 2) return null
  return (
    <>
      {isRoad && (
        <Polyline
          positions={pts}
          pathOptions={{ color, weight: 18, opacity: 0.08, lineCap: 'round', interactive: false }}
        />
      )}
      <Polyline
        positions={pts}
        pathOptions={{
          color, weight: style.weight, opacity: style.opacity,
          dashArray: style.dashArray, lineCap: 'round', lineJoin: 'round',
        }}
      />
    </>
  )
}

export default function ArcRouteMap({ mapData, accent, scrollWheelZoom = true }) {
  if (!mapData) return null
  const { center, zoom, markers = [], segments = [], route = [] } = mapData
  const hasSegments = segments.length > 0 && segments.some(s => s.waypoints?.length > 1)

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: 360, background: '#e8e0d8' }}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {hasSegments
        ? segments.filter(s => s.waypoints?.length > 1).map(s => (
            <SegmentPolyline key={s.id} seg={s} accent={accent} />
          ))
        : route.length > 1 && (
          <Polyline
            positions={route}
            pathOptions={{ color: accent, weight: 2.5, opacity: 0.72, dashArray: '7 5' }}
          />
        )
      }

      {markers.map(m => {
        const mColor  = m.type === 'secondary' ? accent : accent
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}`
        return (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={makeStopIcon(mColor, m.type || 'primary')}
            zIndexOffset={m.type === 'primary' ? 400 : 150}
          >
            <Popup maxWidth={200}>
              <div style={{ fontFamily: 'Outfit, sans-serif', minWidth: 160 }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 4 }}>
                  {m.name}
                </div>
                {m.day && (
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#888', marginBottom: 8 }}>
                    Day {m.day}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${m.name} in Google Maps`}
                    style={{
                      display: 'inline-block', padding: '4px 10px',
                      background: '#111', color: '#fff',
                      fontSize: 10, textDecoration: 'none',
                      fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.3px',
                    }}
                  >Maps ↗</a>
                  <a
                    href="/itinerary"
                    aria-label={`Open itinerary for ${m.name}`}
                    style={{
                      display: 'inline-block', padding: '4px 10px',
                      background: 'none', border: '1px solid #ddd', color: '#777',
                      fontSize: 10, textDecoration: 'none',
                      fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.3px',
                    }}
                  >Itinerary →</a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
