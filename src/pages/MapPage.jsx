import { useState, useEffect, useMemo, useRef, useCallback, memo } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useTravel } from '../context/TravelContext'
import { TRIPS } from '../services/trips/index'
import { fetchRoadRoute } from '../lib/routeGeometry'
import { allPlaces } from '../data/places/index'
import { resolvePlaces } from '../services/contentResolver/index'
import { usePlaceStatus } from '../hooks/usePlaceStatus'

// Fix Leaflet default icon broken by Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Respect user's reduced-motion preference for all animations
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Arc metadata ──────────────────────────────────────────────────────────────
const ARC_META = {
  2027: { bestSeason: 'Nov – Dec', scenicRating: 4.5, scenicNote: 'Mt Fuji Road Trip'   },
  2028: { bestSeason: 'Jun – Aug', scenicRating: 4.8, scenicNote: 'Norwegian Fjords'    },
  2029: { bestSeason: 'Sep – Oct', scenicRating: 4.9, scenicNote: 'Amalfi Coast Drive'  },
  2030: { bestSeason: 'Jan – Feb', scenicRating: 4.7, scenicNote: 'Snowy Japan'         },
  2031: { bestSeason: 'May – Jun', scenicRating: 4.6, scenicNote: 'Loire Valley'        },
  2032: { bestSeason: 'Jun – Aug', scenicRating: 4.8, scenicNote: 'Swiss Alps'          },
  2033: { bestSeason: 'Apr – May', scenicRating: 4.7, scenicNote: 'Jeju Coastal Drive'  },
  2034: { bestSeason: 'Mar – Apr', scenicRating: 4.9, scenicNote: 'South Island NZ'     },
  2035: { bestSeason: 'Oct – Nov', scenicRating: 4.6, scenicNote: 'Pacific Coast Hwy'   },
}

// ── Transport config ──────────────────────────────────────────────────────────
const OSRM_TYPES = new Set(['rental_car', 'camper_van', 'road_trip', 'bus'])
const ROAD_TYPES = new Set(['rental_car', 'camper_van', 'road_trip'])

function getColor(type, accent) {
  const m = {
    rental_car: () => accent,
    road_trip:  () => accent,
    camper_van: () => '#16A34A',
    train:      () => '#374151',
    bus:        () => '#EA580C',
    ferry:      () => '#2563EB',
    flight:     () => '#9CA3AF',
    walking:    () => '#059669',
  }
  return (m[type] || m.train)(accent)
}

const TRANSPORT_INFO = {
  rental_car: { label: 'Road Trip',    weight: 7,   opacity: 0.92, dashArray: null   },
  camper_van: { label: 'Camper Van',   weight: 7,   opacity: 0.92, dashArray: null   },
  road_trip:  { label: 'Road Trip',    weight: 7,   opacity: 0.92, dashArray: null   },
  train:      { label: 'Train / Rail', weight: 3.5, opacity: 0.85, dashArray: '10 4' },
  bus:        { label: 'Bus',          weight: 2.5, opacity: 0.65, dashArray: '5 5'  },
  ferry:      { label: 'Ferry',        weight: 3,   opacity: 0.72, dashArray: '8 6'  },
  flight:     { label: 'Flight',       weight: 1.5, opacity: 0.40, dashArray: '3 9'  },
  walking:    { label: 'Walking',      weight: 2,   opacity: 0.72, dashArray: '3 4'  },
}

function getSegmentStyle(type, color) {
  const info = TRANSPORT_INFO[type] || TRANSPORT_INFO.train
  return { color, weight: info.weight, opacity: info.opacity, dashArray: info.dashArray, lineCap: 'round', lineJoin: 'round' }
}

// ── Route stats helpers ───────────────────────────────────────────────────────
function parseDistanceKm(str) {
  if (!str) return 0
  const m = String(str).replace(/,/g, '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

function parseDurationMins(str) {
  if (!str) return 0
  let mins = 0
  const h = String(str).match(/(\d+)\s*h/)
  const m = String(str).match(/(\d+)\s*m(?!o)/i)
  if (h) mins += parseInt(h[1]) * 60
  if (m) mins += parseInt(m[1])
  return mins
}

function formatMins(mins) {
  if (!mins || mins <= 0) return null
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m}m`
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

// ── Day parsing ───────────────────────────────────────────────────────────────
function parseDayRange(dayStr) {
  if (!dayStr) return []
  const s = String(dayStr)
  const parts = s.split(/[–-]/)
  if (parts.length === 1) {
    const n = parseInt(parts[0].trim())
    return isNaN(n) ? [] : [n]
  }
  const [start, end] = parts.map(p => parseInt(p.trim()))
  if (isNaN(start) || isNaN(end)) return []
  const arr = []
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
}

// ── Category colors & groups ─────────────────────────────────────────────────
const CAT_COLORS = {
  food: '#E65100', coffee: '#795548', cafe: '#795548', market: '#E65100', nightlife: '#4A148C',
  shrine: '#6A1B9A', temple: '#6A1B9A', castle: '#4E342E', museum: '#37474F',
  historic: '#4E342E', architecture: '#546E7A', garden: '#388E3C',
  nature: '#2E7D32', park: '#388E3C', hiking: '#33691E',
  viewpoint: '#F57F17', sunrise: '#BF360C', sunset: '#BF360C',
  photography: '#006064', 'night-view': '#1A237E',
  attraction: '#1565C0', landmark: '#1565C0',
  entertainment: '#6A1B9A', shopping: '#AD1457',
  sports: '#1B5E20', basketball: '#1B5E20', 'car-culture': '#212121', cars: '#212121',
  'hidden-gem': '#880E4F', 'road-stop': '#795548',
}

const PLACE_CAT_GROUPS = [
  { id: 'all',         label: 'All Places' },
  { id: 'food',        label: 'Food & Cafes', cats: ['food','coffee','cafe','market','nightlife'] },
  { id: 'culture',     label: 'Culture',      cats: ['shrine','temple','castle','museum','historic','architecture'] },
  { id: 'nature',      label: 'Nature',       cats: ['nature','park','hiking'] },
  { id: 'views',       label: 'Views & Photo',cats: ['viewpoint','sunrise','sunset','photography','night-view'] },
  { id: 'attractions', label: 'Attractions',  cats: ['attraction','landmark','entertainment'] },
  { id: 'sports',      label: 'Sports',       cats: ['basketball','car-culture','cars','sports'] },
  { id: 'hidden',      label: 'Hidden Gems',  cats: ['hidden-gem','road-stop'] },
]

const PLACE_STATUS_OPTS = [
  { id: 'all',      label: 'All' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'visited',  label: 'Visited' },
  { id: 'booked',   label: 'Booked' },
]

const CATEGORY_LABEL_MAP = {
  landmark: 'Landmark', attraction: 'Attraction', food: 'Food', nightlife: 'Nightlife',
  cafe: 'Café', coffee: 'Coffee', market: 'Market', entertainment: 'Entertainment',
  shrine: 'Shrine', temple: 'Temple', park: 'Park', nature: 'Nature', garden: 'Garden',
  sports: 'Sports', basketball: 'Basketball', 'car-culture': 'Car Culture', cars: 'Cars',
  historic: 'Historic', architecture: 'Architecture', castle: 'Castle', museum: 'Museum',
  viewpoint: 'Viewpoint', sunrise: 'Sunrise', sunset: 'Sunset',
  photography: 'Photography', hiking: 'Hiking',
  'hidden-gem': 'Hidden Gem', 'road-stop': 'Road Stop', 'night-view': 'Night View',
}

// Category sets for shape selection
const PHOTO_CATS  = new Set(['photography','viewpoint','sunrise','sunset','night-view'])
const FOOD_CATS   = new Set(['food','cafe','coffee','market','nightlife'])
const CULT_CATS   = new Set(['shrine','temple','castle','museum','historic','architecture','landmark','attraction'])
const GEM_CATS    = new Set(['hidden-gem'])

// ── Marker type inference ─────────────────────────────────────────────────────
function getMarkerType(m, allSegs) {
  if (m.markerType) return m.markerType
  if (m.type === 'secondary') {
    const seg = allSegs.find(s => s.id === m.segment)
    if (seg?.transportType === 'flight') return 'airport'
    if (seg?.transportType === 'train')  return 'train'
    return 'secondary'
  }
  const connected = allSegs.filter(s => s.from === m.name || s.to === m.name)
  if (connected.some(s => s.transportType === 'flight')) return 'airport'
  if (connected.length && connected.every(s => s.transportType === 'train')) return 'train'
  return 'city'
}

// ── Route stop icons (typed) ─────────────────────────────────────────────────
function makeStopIconTyped(markerType, color, dimmed = false) {
  const op = dimmed ? 0.22 : 1
  const ds = `opacity:${op};display:block;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.30))`

  switch (markerType) {
    case 'airport':
      return L.divIcon({
        className: '',
        html: `<svg width="20" height="20" viewBox="0 0 20 20" style="${ds}">
          <circle cx="10" cy="10" r="9" fill="${color}" stroke="white" stroke-width="1.8"/>
          <path d="M10,4 L12.5,9.5 L18,10 L12.5,10.5 L10,16 L7.5,10.5 L2,10 L7.5,9.5 Z" fill="white" opacity="0.92"/>
        </svg>`,
        iconSize: [20,20], iconAnchor: [10,10], popupAnchor: [0,-13],
      })

    case 'train':
      return L.divIcon({
        className: '',
        html: `<svg width="16" height="20" viewBox="0 0 16 20" style="${ds}">
          <rect x="1" y="1" width="14" height="15" rx="3.5" fill="${color}" stroke="white" stroke-width="1.6"/>
          <rect x="3" y="3" width="10" height="4.5" rx="1" fill="rgba(255,255,255,0.52)"/>
          <rect x="3" y="9" width="10" height="4.5" rx="1" fill="rgba(255,255,255,0.52)"/>
          <line x1="5" y1="16" x2="3" y2="19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
          <line x1="11" y1="16" x2="13" y2="19" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        iconSize: [16,20], iconAnchor: [8,10], popupAnchor: [0,-14],
      })

    case 'roadstop':
      return L.divIcon({
        className: '',
        html: `<svg width="16" height="16" viewBox="0 0 16 16" style="${ds}">
          <polygon points="8,1 15,8 8,15 1,8" fill="${color}" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="8" cy="8" r="2.5" fill="white" opacity="0.85"/>
        </svg>`,
        iconSize: [16,16], iconAnchor: [8,8], popupAnchor: [0,-11],
      })

    case 'secondary':
      return L.divIcon({
        className: '',
        html: `<div style="width:8px;height:8px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 5px rgba(0,0,0,0.24);opacity:${op}"></div>`,
        iconSize: [8,8], iconAnchor: [4,4], popupAnchor: [0,-7],
      })

    default: // 'city'
      return L.divIcon({
        className: '',
        html: `<svg width="18" height="18" viewBox="0 0 18 18" style="${ds}">
          <circle cx="9" cy="9" r="7.5" fill="${color}" stroke="white" stroke-width="2.2"/>
          <circle cx="9" cy="9" r="3" fill="white" opacity="0.90"/>
        </svg>`,
        iconSize: [18,18], iconAnchor: [9,9], popupAnchor: [0,-13],
      })
  }
}

// ── Place layer icons (category-shaped) ──────────────────────────────────────
function makeCategoryPlaceIcon(category, visited = false, isWishlist = false) {
  const color = CAT_COLORS[category] || '#666'
  const bdr   = visited ? '#fff' : (isWishlist ? '#e0e0e0' : 'rgba(255,255,255,0.72)')

  if (PHOTO_CATS.has(category)) {
    const s = visited ? 14 : 12
    const h = Math.round(s * 0.87)
    return L.divIcon({
      className: '',
      html: `<svg width="${s}" height="${h}" viewBox="0 0 12 10" style="display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.28))">
        <polygon points="6,1 11,9 1,9" fill="${color}" stroke="${bdr}" stroke-width="1.3" stroke-linejoin="round"/>
      </svg>`,
      iconSize: [s,h], iconAnchor: [s/2,h/2], popupAnchor: [0,-h/2-3],
    })
  }

  if (FOOD_CATS.has(category)) {
    const s = visited ? 11 : 9
    return L.divIcon({
      className: '',
      html: `<svg width="${s}" height="${s}" viewBox="0 0 10 10" style="display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.28))">
        <polygon points="5,0.5 9.5,5 5,9.5 0.5,5" fill="${color}" stroke="${bdr}" stroke-width="1.3"/>
      </svg>`,
      iconSize: [s,s], iconAnchor: [s/2,s/2], popupAnchor: [0,-s/2-3],
    })
  }

  if (CULT_CATS.has(category)) {
    const s = visited ? 11 : 9
    return L.divIcon({
      className: '',
      html: `<svg width="${s}" height="${s}" viewBox="0 0 10 10" style="display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.28))">
        <rect x="0.8" y="0.8" width="8.4" height="8.4" rx="1.5" fill="${color}" stroke="${bdr}" stroke-width="1.3"/>
      </svg>`,
      iconSize: [s,s], iconAnchor: [s/2,s/2], popupAnchor: [0,-s/2-3],
    })
  }

  if (GEM_CATS.has(category)) {
    const s = visited ? 14 : 12
    return L.divIcon({
      className: '',
      html: `<svg width="${s}" height="${s}" viewBox="0 0 14 14" style="display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.28))">
        <polygon points="7,1 8.8,5.5 13.5,7 8.8,8.5 7,13 5.2,8.5 0.5,7 5.2,5.5" fill="${color}" stroke="${bdr}" stroke-width="1.1"/>
      </svg>`,
      iconSize: [s,s], iconAnchor: [s/2,s/2], popupAnchor: [0,-s/2-4],
    })
  }

  // Default: circle (nature, sports, road-stop, etc.)
  const size = visited ? 9 : 7
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:1.5px solid ${bdr};box-shadow:0 1px 5px rgba(0,0,0,0.30)"></div>`,
    iconSize: [size,size], iconAnchor: [size/2,size/2], popupAnchor: [0,-size/2-3],
  })
}

// ── Vehicle icons ─────────────────────────────────────────────────────────────
function getBearing([lat1, lng1], [lat2, lng2]) {
  const toRad = d => d * Math.PI / 180
  const dLon  = toRad(lng2 - lng1)
  const la1   = toRad(lat1), la2 = toRad(lat2)
  const y     = Math.sin(dLon) * Math.cos(la2)
  const x     = Math.cos(la1) * Math.sin(la2) - Math.sin(la1) * Math.cos(la2) * Math.cos(dLon)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

function smoothBearing(pts, i) {
  const w = pts.length > 50 ? 20 : 3
  const a = pts[Math.max(0, i - w)]
  const b = pts[Math.min(pts.length - 1, i + w + 1)]
  return getBearing(a, b)
}

function makeCarIcon(bearing, color) {
  return L.divIcon({
    className: '',
    html: `<svg width="18" height="28" viewBox="0 0 18 28" style="transform:rotate(${bearing}deg);display:block;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.50))">
      <rect x="2" y="6" width="14" height="20" rx="3" fill="${color}" stroke="white" stroke-width="1.5"/>
      <polygon points="9,0 16,7 2,7" fill="${color}" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
      <rect x="3" y="8" width="12" height="4" rx="1" fill="rgba(180,220,255,0.42)"/>
      <rect x="3" y="20" width="12" height="3.5" rx="1" fill="rgba(180,220,255,0.26)"/>
      <rect x="0" y="9" width="2.5" height="5" rx="1.2" fill="rgba(0,0,0,0.32)"/>
      <rect x="15.5" y="9" width="2.5" height="5" rx="1.2" fill="rgba(0,0,0,0.32)"/>
      <rect x="0" y="18" width="2.5" height="5" rx="1.2" fill="rgba(0,0,0,0.32)"/>
      <rect x="15.5" y="18" width="2.5" height="5" rx="1.2" fill="rgba(0,0,0,0.32)"/>
    </svg>`,
    iconSize:   [18,28], iconAnchor: [9,14],
  })
}

function makeVanIcon(bearing, color) {
  return L.divIcon({
    className: '',
    html: `<svg width="21" height="28" viewBox="0 0 21 28" style="transform:rotate(${bearing}deg);display:block;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.50))">
      <rect x="1" y="5" width="19" height="22" rx="2" fill="${color}" stroke="white" stroke-width="1.5"/>
      <polygon points="10.5,0 19,6 2,6" fill="${color}" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
      <rect x="2" y="6" width="17" height="5" rx="1" fill="rgba(180,220,255,0.40)"/>
      <rect x="2" y="14" width="7.5" height="5" rx="1" fill="rgba(180,220,255,0.26)"/>
      <rect x="11.5" y="14" width="7.5" height="5" rx="1" fill="rgba(180,220,255,0.26)"/>
      <rect x="0" y="10" width="2" height="6" rx="1" fill="rgba(0,0,0,0.32)"/>
      <rect x="19" y="10" width="2" height="6" rx="1" fill="rgba(0,0,0,0.32)"/>
      <rect x="0" y="20" width="2" height="5" rx="1" fill="rgba(0,0,0,0.32)"/>
      <rect x="19" y="20" width="2" height="5" rx="1" fill="rgba(0,0,0,0.32)"/>
    </svg>`,
    iconSize:   [21,28], iconAnchor: [10,14],
  })
}

function makeRouteLabelIcon(text, color) {
  const w = Math.max(60, Math.round(text.length * 5.4 + 18))
  return L.divIcon({
    className: '',
    html: `<div style="background:rgba(255,253,250,0.92);border:1px solid ${color};color:${color};padding:2px 9px;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.4px;white-space:nowrap;pointer-events:none;box-shadow:0 1px 5px rgba(0,0,0,0.14)">${text}</div>`,
    iconSize:   [w,16], iconAnchor: [w/2,8],
  })
}

function makeNameLabelIcon(text, color) {
  const w = Math.max(44, Math.round(text.length * 5.6 + 18))
  return L.divIcon({
    className: '',
    html: `<div style="background:rgba(255,253,250,0.90);color:${color};padding:2px 8px;font-family:'JetBrains Mono',monospace;font-size:7.5px;font-weight:600;letter-spacing:0.3px;white-space:nowrap;pointer-events:none;box-shadow:0 1px 4px rgba(0,0,0,0.12);border-bottom:1.5px solid ${color}">${text}</div>`,
    iconSize:   [w,14], iconAnchor: [w/2,-10],
  })
}

// ── MapViewSync / MapInstanceCapture ─────────────────────────────────────────
function MapViewSync({ center, zoom }) {
  const map = useMap()
  useEffect(() => { map.setView(center, zoom, { animate: true, duration: 0.6 }) }, [center, zoom, map])
  return null
}

function MapInstanceCapture({ onReady }) {
  const map = useMap()
  useEffect(() => { onReady(map) }, [map, onReady])
  return null
}

// ── SegmentLayer ──────────────────────────────────────────────────────────────
const MAX_VEHICLE_ICONS = 3

const SegmentLayer = memo(function SegmentLayer({ seg, accent, onSegmentClick, hidden }) {
  const [pts, setPts] = useState(seg.waypoints || [])
  const isRoad        = ROAD_TYPES.has(seg.transportType)
  const osrmEligible  = OSRM_TYPES.has(seg.transportType)
  const color         = getColor(seg.transportType, accent)
  const style         = getSegmentStyle(seg.transportType, color)
  const mainPolyRef   = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPts(seg.waypoints || [])
    if (!osrmEligible || !seg.waypoints || seg.waypoints.length < 2) return
    let cancelled = false
    fetchRoadRoute(seg.waypoints, seg.label).then(route => {
      if (!cancelled && route && route.length > seg.waypoints.length) setPts(route)
    })
    return () => { cancelled = true }
  }, [seg.id, osrmEligible]) // eslint-disable-line

  // Animate road route drawing when points load
  useEffect(() => {
    if (!mainPolyRef.current || !isRoad || prefersReducedMotion) return
    const el = mainPolyRef.current?.getElement?.()
    if (!el || typeof el.getTotalLength !== 'function') return
    try {
      const len = el.getTotalLength()
      el.style.strokeDasharray  = `${len} ${len}`
      el.style.strokeDashoffset = len
      el.style.transition = 'none'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition       = 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)'
          el.style.strokeDashoffset = '0'
        })
      })
    } catch {
      // SVG path API not available in some test environments
    }
    const elRef = el
    return () => {
      if (elRef) { elRef.style.strokeDasharray = ''; elRef.style.strokeDashoffset = ''; elRef.style.transition = '' }
    }
  }, [pts, isRoad])

  if (hidden || pts.length < 2) return null

  const total     = pts.length - 1
  const step      = Math.max(1, Math.ceil(total / MAX_VEHICLE_ICONS))
  const labelText = seg.mapLabel || (seg.highlight ? seg.label : null)
  const labelPt   = labelText && pts.length > 1 ? pts[Math.floor(pts.length * 0.38)] : null

  return (
    <>
      {isRoad && (
        <Polyline
          positions={pts}
          pathOptions={{ color, weight: 24, opacity: 0.08, lineCap: 'round', interactive: false }}
        />
      )}
      <Polyline
        ref={mainPolyRef}
        positions={pts}
        pathOptions={style}
        eventHandlers={isRoad ? { click: () => onSegmentClick(seg) } : {}}
      />
      {isRoad && pts.slice(0, -1).map((_, i) => {
        if (i % step !== 0) return null
        const mid     = [(pts[i][0] + pts[i+1][0]) / 2, (pts[i][1] + pts[i+1][1]) / 2]
        const bearing = smoothBearing(pts, i)
        const icon    = seg.transportType === 'camper_van'
          ? makeVanIcon(bearing, color)
          : makeCarIcon(bearing, color)
        return <Marker key={i} position={mid} icon={icon} interactive={false} zIndexOffset={200} />
      })}
      {labelPt && (
        <Marker position={labelPt} icon={makeRouteLabelIcon(labelText, color)} interactive={false} zIndexOffset={150} />
      )}
    </>
  )
})

// ── MapLegend (marker types + transport routes, collapsible) ──────────────────
const MapLegend = memo(function MapLegend({ segments, accent, hiddenTypes, onToggleType }) {
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640
  )

  const activeTypes = useMemo(() =>
    [...new Set(segments.filter(s => s.waypoints?.length > 1).map(s => s.transportType))],
  [segments])

  const markerDefs = [
    { key: 'city',     label: 'City',          el: <svg width="14" height="14" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7.5" fill={accent} stroke="white" strokeWidth="2"/><circle cx="9" cy="9" r="3" fill="white" opacity="0.9"/></svg> },
    { key: 'airport',  label: 'Airport',        el: <svg width="14" height="14" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill={accent} stroke="white" strokeWidth="1.8"/><path d="M10,4 L12.5,9.5 L18,10 L12.5,10.5 L10,16 L7.5,10.5 L2,10 L7.5,9.5 Z" fill="white" opacity="0.92"/></svg> },
    { key: 'train',    label: 'Train Station',  el: <svg width="12" height="15" viewBox="0 0 16 20"><rect x="1" y="1" width="14" height="15" rx="3.5" fill="#374151" stroke="white" strokeWidth="1.6"/><rect x="3" y="3" width="10" height="4.5" rx="1" fill="rgba(255,255,255,0.52)"/></svg> },
    { key: 'roadstop', label: 'Road Trip Stop', el: <svg width="13" height="13" viewBox="0 0 16 16"><polygon points="8,1 15,8 8,15 1,8" fill={accent} stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="8" cy="8" r="2.5" fill="white" opacity="0.85"/></svg> },
    { key: 'photo',    label: 'Photography',    el: <svg width="12" height="10" viewBox="0 0 12 10"><polygon points="6,1 11,9 1,9" fill="#006064" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
    { key: 'cafe',     label: 'Café & Food',    el: <svg width="11" height="11" viewBox="0 0 10 10"><polygon points="5,0.5 9.5,5 5,9.5 0.5,5" fill="#795548" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3"/></svg> },
    { key: 'culture',  label: 'Culture',        el: <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.8" y="0.8" width="8.4" height="8.4" rx="1.5" fill="#4E342E" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3"/></svg> },
    { key: 'hiddengem',label: 'Hidden Gem',     el: <svg width="13" height="13" viewBox="0 0 14 14"><polygon points="7,1 8.8,5.5 13.5,7 8.8,8.5 7,13 5.2,8.5 0.5,7 5.2,5.5" fill="#880E4F" stroke="rgba(255,255,255,0.7)" strokeWidth="1.1"/></svg> },
  ]

  return (
    <div
      role="region"
      aria-label="Map legend"
      style={{
        position: 'absolute', top: 14, left: 14, zIndex: 500,
        background: 'rgba(255,253,250,0.97)', backdropFilter: 'blur(6px)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        minWidth: collapsed ? 'auto' : 160,
      }}
    >
      <button
        onClick={() => setCollapsed(v => !v)}
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Expand map legend' : 'Collapse map legend'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10, padding: '9px 12px', width: '100%',
          background: 'none', border: 'none', cursor: 'pointer',
          touchAction: 'manipulation',
        }}
      >
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {collapsed ? '≡ Legend' : 'Legend'}
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', lineHeight: 1 }}>
          {collapsed ? '▼' : '▲'}
        </span>
      </button>

      {!collapsed && (
        <div style={{ padding: '0 12px 12px' }}>
          {/* Marker types */}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7, borderTop: '1px solid var(--border)', paddingTop: 8 }}>
            Markers
          </div>
          {markerDefs.map(({ key, label, el }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
              <div style={{ width: 16, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {el}
              </div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}

          {/* Transport routes */}
          {activeTypes.length > 0 && (
            <>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7, borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4 }}>
                Routes
              </div>
              {activeTypes.map((type, i) => {
                const info   = TRANSPORT_INFO[type] || TRANSPORT_INFO.train
                const color  = getColor(type, accent)
                const hidden = hiddenTypes?.has(type)
                return (
                  <button
                    key={type}
                    onClick={() => onToggleType?.(type)}
                    aria-pressed={!hidden}
                    aria-label={`Toggle ${info.label} route`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      marginBottom: i < activeTypes.length - 1 ? 7 : 0,
                      background: 'none', border: 'none', cursor: onToggleType ? 'pointer' : 'default',
                      padding: 0, opacity: hidden ? 0.28 : 1, transition: 'opacity 0.15s',
                      touchAction: 'manipulation',
                    }}
                  >
                    <svg width="36" height="8" viewBox="0 0 36 8" aria-hidden="true">
                      <line x1="2" y1="4" x2="34" y2="4"
                        stroke={color}
                        strokeWidth={Math.min(info.weight, 4)}
                        strokeDasharray={info.dashArray || ''}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>
                      {info.label}
                    </span>
                  </button>
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  )
})

// ── SegmentPanel ──────────────────────────────────────────────────────────────
function SegmentPanel({ segment, accent, onClose }) {
  const color = getColor(segment.transportType, accent)
  const rows  = [
    ['Distance', segment.distance],
    ['Time',     segment.duration],
    ['Vehicle',  segment.vehicle],
  ].filter(([, v]) => v)

  return (
    <div
      role="dialog"
      aria-label={`Route details: ${segment.label}`}
      style={{
        position: 'absolute', bottom: 20, left: 14, zIndex: 500,
        background: 'rgba(255,253,250,0.98)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--border)',
        boxShadow: `0 4px 24px rgba(0,0,0,0.14), inset 0 3px 0 0 ${color}`,
        padding: '14px 18px', maxWidth: 280,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
            {TRANSPORT_INFO[segment.transportType]?.label || 'Route'}
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
            {segment.label}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close route details"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink3)', fontSize: 18, lineHeight: 1, padding: 0, flexShrink: 0, marginTop: 2, minWidth: 32, minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'manipulation' }}
        >×</button>
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', letterSpacing: '0.2px', marginBottom: 12 }}>
        {segment.from} → {segment.to}
      </div>
      {rows.length > 0 && (
        <div style={{ display: 'flex', gap: 20, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          {rows.map(([label, value]) => (
            <div key={label}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── RouteStatsBar ─────────────────────────────────────────────────────────────
const RouteStatsBar = memo(function RouteStatsBar({ segments, markers, arc, arcPlaces }) {
  const meta = ARC_META[arc?.year] || {}

  const stats = useMemo(() => {
    const totalKm    = segments.reduce((s, sg) => s + parseDistanceKm(sg.distance), 0)
    const totalMins  = segments.reduce((s, sg) => s + parseDurationMins(sg.duration), 0)
    const roadMins   = segments.filter(sg => ROAD_TYPES.has(sg.transportType)).reduce((s, sg) => s + parseDurationMins(sg.duration), 0)
    const flights    = segments.filter(sg => sg.transportType === 'flight').length
    const trains     = segments.filter(sg => sg.transportType === 'train').length
    const primary    = markers.filter(m => m.type !== 'secondary')
    const cities     = [...new Set(primary.map(m => m.name))]
    const tripIds    = [...new Set(primary.map(m => m.tripId).filter(Boolean))]
    const drivingDays = roadMins > 0 ? Math.ceil(roadMins / 480) : 0
    const photoSpots = arcPlaces?.filter(p => PHOTO_CATS.has(p.category)).length || 0
    const cafes      = arcPlaces?.filter(p => FOOD_CATS.has(p.category)).length || 0

    return { totalKm, totalMins, flights, trains, stops: cities.length, countries: tripIds.length, drivingDays, photoSpots, cafes }
  }, [segments, markers, arcPlaces])

  const items = [
    stats.totalKm > 0      && { label: 'Distance',    value: `${stats.totalKm.toLocaleString()} km`, sym: '↔' },
    stats.totalMins > 0    && { label: 'Travel Time',  value: formatMins(stats.totalMins),             sym: '⏱' },
    stats.stops > 0        && { label: 'Destinations', value: stats.stops,                             sym: '◎' },
    stats.countries > 0    && { label: 'Countries',    value: stats.countries,                         sym: '◈' },
    stats.drivingDays > 0  && { label: 'Driving Days', value: `${stats.drivingDays}d`,                 sym: '⊕' },
    stats.flights > 0      && { label: 'Flights',      value: stats.flights,                           sym: '✈' },
    stats.trains > 0       && { label: 'Train Legs',   value: stats.trains,                            sym: '⊟' },
    stats.photoSpots > 0   && { label: 'Photo Spots',  value: stats.photoSpots,                        sym: '▲' },
    stats.cafes > 0        && { label: 'Cafés',        value: stats.cafes,                             sym: '◆' },
    meta.bestSeason        && { label: 'Best Season',  value: meta.bestSeason,                         sym: '☀' },
    meta.scenicRating      && { label: 'Scenic',       value: `${meta.scenicRating}/5`,                sym: '★' },
  ].filter(Boolean)

  if (!items.length) return null

  return (
    <div
      role="region"
      aria-label="Route statistics"
      className="map-stats-bar"
      style={{
        display: 'flex', alignItems: 'stretch',
        overflowX: 'auto', padding: '0 20px',
        background: 'var(--paper)',
        borderBottom: '1px solid var(--border)',
        scrollbarWidth: 'none',
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px 9px 0',
            marginRight: 18,
            borderRight: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 11, flexShrink: 0 }} aria-hidden="true">{item.sym}</span>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '0.7px', textTransform: 'uppercase', lineHeight: 1, marginBottom: 2 }}>
              {item.label}
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

// ── DayTimeline ───────────────────────────────────────────────────────────────
const DayTimeline = memo(function DayTimeline({ itinerary, allMarkers, selectedIdx, onSelect, accent, mapInstance }) {
  if (!itinerary?.length) return null

  function handleSelect(entry, idx) {
    if (selectedIdx === idx) { onSelect(null, null); return }
    onSelect(entry, idx)
    const m = allMarkers.find(mk =>
      mk.name === entry.city && (!entry.country || mk.tripId === entry.country)
    ) || allMarkers.find(mk =>
      parseDayRange(mk.day).some(d => parseDayRange(entry.days).includes(d))
    )
    if (m && mapInstance) {
      mapInstance.setView([m.lat, m.lng], 10, { animate: true, duration: 0.7 })
    }
  }

  return (
    <nav
      aria-label="Trip day timeline"
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        overflowX: 'auto', padding: '7px 20px',
        background: 'var(--surf)',
        borderBottom: '1px solid var(--border)',
        scrollbarWidth: 'none',
      }}
    >
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0, marginRight: 4 }}>
        Stop:
      </span>
      <button onClick={() => onSelect(null, null)} aria-pressed={selectedIdx === null} aria-label="Show all stops" style={stopBtnStyle(selectedIdx === null, accent)}>All</button>
      {itinerary.map((entry, idx) => (
        <button
          key={idx}
          onClick={() => handleSelect(entry, idx)}
          aria-pressed={selectedIdx === idx}
          aria-label={`${entry.city}, Days ${entry.days}`}
          style={stopBtnStyle(selectedIdx === idx, accent)}
        >
          <span style={{ opacity: 0.7, fontSize: 7 }}>Day {entry.days} · </span>
          {entry.city}
        </button>
      ))}
    </nav>
  )
})

function stopBtnStyle(active, accent) {
  return {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
    padding: '4px 10px', cursor: 'pointer', flexShrink: 0,
    border: active ? `1.5px solid ${accent}` : '1px solid var(--border)',
    background: active ? accent : 'transparent',
    color: active ? '#fff' : 'var(--ink3)',
    letterSpacing: '0.3px', transition: 'all 0.12s', whiteSpace: 'nowrap',
    minHeight: 32, touchAction: 'manipulation',
  }
}

// ── MapControlsOverlay ────────────────────────────────────────────────────────
function MapControlsOverlay({ onFit, showLabels, onToggleLabels, showHighlights, onToggleHighlights }) {
  const btnBase = {
    width: 40, height: 40,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
    backdropFilter: 'blur(4px)',
    boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
    transition: 'all 0.12s',
    touchAction: 'manipulation',
  }
  return (
    <div
      role="toolbar"
      aria-label="Map controls"
      style={{ position: 'absolute', bottom: 60, right: 14, zIndex: 500, display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'all' }}
    >
      <button
        onClick={onFit}
        title="Fit route to screen"
        aria-label="Fit all stops to screen"
        style={{ ...btnBase, background: 'rgba(255,253,250,0.95)', color: 'var(--ink3)' }}
      >⊡</button>
      <button
        onClick={onToggleLabels}
        title={showLabels ? 'Hide city labels' : 'Show city labels'}
        aria-label={showLabels ? 'Hide city name labels' : 'Show city name labels'}
        aria-pressed={showLabels}
        style={{ ...btnBase, background: showLabels ? 'var(--ink)' : 'rgba(255,253,250,0.95)', color: showLabels ? '#fff' : 'var(--ink3)', border: showLabels ? '1px solid var(--ink)' : '1px solid var(--border)' }}
      >A</button>
      <button
        onClick={onToggleHighlights}
        title={showHighlights ? 'Hide scenic highlights' : 'Show scenic highlights'}
        aria-label={showHighlights ? 'Hide scenic highlights' : 'Show scenic highlights'}
        aria-pressed={showHighlights}
        style={{ ...btnBase, background: showHighlights ? 'var(--ink)' : 'rgba(255,253,250,0.95)', color: showHighlights ? '#fff' : 'var(--ink3)', border: showHighlights ? '1px solid var(--ink)' : '1px solid var(--border)' }}
      >★</button>
    </div>
  )
}

// ── ScenicHighlights panel ────────────────────────────────────────────────────
const ScenicHighlights = memo(function ScenicHighlights({ arcPlaces, accent, mapInstance }) {
  const sections = useMemo(() => {
    const byCategories = cats => arcPlaces.filter(p => cats.includes(p.category) && p.coordinates?.lat)
    return [
      { id: 'viewpoints', label: 'Viewpoints',   sym: '▲', places: byCategories(['viewpoint','photography']).slice(0,5) },
      { id: 'sunrise',    label: 'Sunrise Spots', sym: '◐', places: byCategories(['sunrise']).slice(0,3) },
      { id: 'sunset',     label: 'Sunset Spots',  sym: '◑', places: byCategories(['sunset']).slice(0,3) },
      { id: 'hidden',     label: 'Hidden Gems',   sym: '★', places: byCategories(['hidden-gem']).slice(0,4) },
      { id: 'cafe',       label: 'Top Cafés',     sym: '◆', places: byCategories(['cafe','coffee']).slice(0,4) },
    ].filter(s => s.places.length > 0)
  }, [arcPlaces])

  if (!sections.length) return null

  function flyTo(place) {
    if (!mapInstance) return
    mapInstance.setView([place.coordinates.lat, place.coordinates.lng], 14, { animate: true, duration: 0.8 })
  }

  return (
    <div
      role="region"
      aria-label="Scenic highlights"
      style={{
        position: 'absolute', top: 14, right: 14, zIndex: 500,
        background: 'rgba(255,253,250,0.97)', backdropFilter: 'blur(6px)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        maxWidth: 190, maxHeight: 'calc(100% - 120px)',
        overflowY: 'auto', scrollbarWidth: 'thin',
      }}
    >
      <div style={{ padding: '10px 12px 2px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Highlights
        </span>
      </div>
      {sections.map(s => (
        <div key={s.id} style={{ padding: '8px 12px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: accent }}>{s.sym}</span>
            {s.label}
          </div>
          {s.places.map(p => (
            <button
              key={p.id}
              onClick={() => flyTo(p)}
              aria-label={`Zoom to ${p.name}`}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '3px 0', touchAction: 'manipulation',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = accent }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink2)' }}
            >
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11.5, color: 'var(--ink2)', lineHeight: 1.4, display: 'block', transition: 'color 0.12s' }}>
                {p.name}
              </span>
              {p.city && (
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.2px' }}>
                  {p.city}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
})

// ── Stop popup (route marker) ─────────────────────────────────────────────────
function StopPopup({ m, trip, segInfo, mColor, mapsUrl, arcPlaces, arcMeta }) {
  const cityPlace = useMemo(() =>
    arcPlaces?.find(p => p.city === m.name && (p.heroImage || p.image)),
  [m.name, arcPlaces])

  const imgUrl    = m.image || cityPlace?.heroImage || cityPlace?.image
  const markerBadge = m.type === 'primary' ? 'DESTINATION' : 'STOP'

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', minWidth: 220, padding: '2px 0' }}>
      {/* Hero image */}
      {imgUrl && (
        <div style={{ height: 110, overflow: 'hidden', margin: '-8px -8px 10px', position: 'relative' }}>
          <img
            src={imgUrl}
            alt={m.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.30) 100%)' }} />
        </div>
      )}

      {/* Category badge + trip meta */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: mColor, border: `1px solid ${mColor}`, padding: '1px 6px', letterSpacing: '0.5px',
        }}>
          {markerBadge}
        </span>
        {trip && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#888', letterSpacing: '0.3px' }}>
            {trip.flag} {trip.title?.replace(/\s+\d{4}$/, '')}
          </span>
        )}
        {m.day && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#bbb' }}>
            Day {m.day}
          </span>
        )}
      </div>

      {/* Title */}
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 6, lineHeight: 1.2 }}>
        {m.name}
      </div>

      {/* Segment info */}
      {segInfo && (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          color: mColor, letterSpacing: '0.3px', marginBottom: 10,
          paddingLeft: 8, borderLeft: `2px solid ${mColor}`, lineHeight: 1.7,
        }}>
          <div>{TRANSPORT_INFO[segInfo.transportType]?.label}</div>
          {segInfo.distance && <div>{segInfo.distance}</div>}
          {segInfo.duration && <div>{segInfo.duration}</div>}
        </div>
      )}

      {/* Quick stats row */}
      {(arcMeta?.bestSeason || arcMeta?.scenicRating) && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
          {arcMeta.bestSeason && (
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: '#bbb', letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: 1 }}>Best Season</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, color: '#444', fontWeight: 600 }}>{arcMeta.bestSeason}</div>
            </div>
          )}
          {arcMeta.scenicRating && (
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: '#bbb', letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: 1 }}>Scenic</div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, color: '#444', fontWeight: 600 }}>★ {arcMeta.scenicRating}/5</div>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${m.name} in Google Maps`}
          style={{
            display: 'inline-block', padding: '5px 12px',
            background: '#111', color: '#fff', fontSize: 10,
            textDecoration: 'none', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.3px',
          }}
        >Maps ↗</a>
        <a
          href="/itinerary"
          aria-label={`Open itinerary`}
          style={{
            display: 'inline-block', padding: '5px 12px',
            background: 'none', color: '#777', fontSize: 10,
            textDecoration: 'none', fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.3px', border: '1px solid #ddd',
          }}
        >Itinerary →</a>
      </div>
    </div>
  )
}

// ── MapInner ──────────────────────────────────────────────────────────────────
function MapInner({
  markers, segments, allSegments, route, accent, center, zoom,
  trips, onSegmentClick, hiddenTypes, showLabels,
  selectedItinEntry, onMapReady, arcPlaces, arcMeta, revealedIds,
}) {
  const hasSegments = segments.length > 0
  const visibleMarkers = revealedIds ? markers.filter(m => revealedIds.has(m.id)) : markers

  return (
    <>
      <MapInstanceCapture onReady={onMapReady} />
      <MapViewSync center={center} zoom={zoom} />

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {hasSegments
        ? segments.filter(seg => seg.waypoints?.length > 1).map(seg => (
            <SegmentLayer
              key={seg.id}
              seg={seg}
              accent={accent}
              onSegmentClick={onSegmentClick}
              hidden={hiddenTypes?.has(seg.transportType)}
            />
          ))
        : route.length > 1 && (
          <Polyline
            positions={route}
            pathOptions={{ color: accent, weight: 2.5, opacity: 0.72, dashArray: '7 5' }}
          />
        )
      }

      {visibleMarkers.map(m => {
        const trip      = trips.find(t => t.id === m.tripId)
        const segInfo   = allSegments.find(s => s.id === m.segment)
        const mapsUrl   = `https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}`
        const mType     = getMarkerType(m, allSegments)
        const mColor    = (m.type === 'secondary' && segInfo)
          ? getColor(segInfo.transportType, accent)
          : accent

        let dimmed = false
        if (selectedItinEntry) {
          const entryDays  = parseDayRange(selectedItinEntry.days)
          const markerDays = parseDayRange(m.day)
          dimmed = !markerDays.some(d => entryDays.includes(d)) && m.name !== selectedItinEntry.city
        }

        return (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={makeStopIconTyped(mType, mColor, dimmed)}
            zIndexOffset={m.type === 'primary' ? (dimmed ? 50 : 400) : 150}
          >
            <Popup maxWidth={280}>
              <StopPopup
                m={m}
                trip={trip}
                segInfo={segInfo}
                mColor={mColor}
                mapsUrl={mapsUrl}
                accent={accent}
                arcPlaces={arcPlaces}
                arcMeta={arcMeta}
              />
            </Popup>
          </Marker>
        )
      })}

      {showLabels && visibleMarkers.filter(m => m.type === 'primary').map(m => (
        <Marker
          key={`lbl-${m.id}`}
          position={[m.lat, m.lng]}
          icon={makeNameLabelIcon(m.name, accent)}
          interactive={false}
          zIndexOffset={600}
        />
      ))}
    </>
  )
}

// ── PlacesLayer ───────────────────────────────────────────────────────────────
const PlacesLayer = memo(function PlacesLayer({ places, getStatus }) {
  return (
    <>
      {places.map(p => {
        const s        = getStatus(p.id)
        const catLabel = CATEGORY_LABEL_MAP[p.category] || p.category
        const imgUrl   = p.heroImage || p.image
        const mapsUrl  = p.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${p.coordinates.lat},${p.coordinates.lng}`
        const isPhoto  = PHOTO_CATS.has(p.category)

        return (
          <Marker
            key={p.id}
            position={[p.coordinates.lat, p.coordinates.lng]}
            icon={makeCategoryPlaceIcon(p.category, s.visited, s.wantToVisit)}
          >
            <Popup maxWidth={260}>
              <div style={{ minWidth: 190, maxWidth: 250, padding: '2px 0', fontFamily: 'Outfit, sans-serif' }}>
                {/* Hero image */}
                {imgUrl && (
                  <div style={{ height: 100, overflow: 'hidden', margin: '-8px -8px 9px', position: 'relative' }}>
                    <img
                      src={imgUrl}
                      alt={p.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}

                {/* Meta + category badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#888', letterSpacing: '0.3px' }}>
                    {p.city}{p.country ? ` · ${p.country}` : ''}
                  </span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: CAT_COLORS[p.category] || '#666', border: `1px solid ${CAT_COLORS[p.category] || '#ccc'}`, padding: '0px 5px', letterSpacing: '0.3px' }}>
                    {catLabel}
                  </span>
                </div>

                {/* Name */}
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 5, lineHeight: 1.2 }}>
                  {p.name}
                </div>

                {/* Status badges */}
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 6 }}>
                  {s.visited   && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, background: '#e8f5e9', color: '#2e7d32', padding: '1px 6px' }}>✓ VISITED{s.dateVisited ? ` · ${s.dateVisited}` : ''}</span>}
                  {s.favourite && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, background: '#fbe9e7', color: '#b5451b', padding: '1px 6px' }}>★ FAV</span>}
                  {!s.visited && s.wantToVisit && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, background: '#eee', color: '#555', padding: '1px 6px' }}>WISHLIST</span>}
                </div>

                {/* Description */}
                {p.description && (
                  <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5, marginBottom: 8, maxWidth: 220 }}>
                    {p.description.slice(0, 100)}{p.description.length > 100 ? '…' : ''}
                  </div>
                )}

                {/* Extra info row */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  {p.openingHours && (
                    <div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: '#bbb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 1 }}>Hours</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, color: '#555' }}>{p.openingHours}</div>
                    </div>
                  )}
                  {isPhoto && (
                    <div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: '#bbb', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 1 }}>Type</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, color: '#006064', fontWeight: 600 }}>▲ Photo spot</div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`/place/${p.id}`} aria-label={`View details for ${p.name}`}
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#222', textDecoration: 'none', border: '1px solid #111', padding: '4px 10px' }}>
                    View →
                  </a>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name} in Google Maps`}
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#777', textDecoration: 'none', border: '1px solid #ddd', padding: '4px 10px' }}>
                    Maps ↗
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
})

// ── Filter / Ctrl button helpers ──────────────────────────────────────────────
function FilterTab({ label, active, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        padding: '5px 10px', cursor: 'pointer',
        border: active ? `1.5px solid ${accent}` : '1px solid var(--border)',
        background: active ? accent : 'transparent',
        color: active ? '#fff' : 'var(--ink3)',
        letterSpacing: '0.3px', transition: 'all 0.12s',
        minHeight: 34, touchAction: 'manipulation',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink3)' } }}
    >
      {label}
    </button>
  )
}

function CtrlBtn({ children, active, accent, onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      style={{
        background: active ? 'var(--ink)' : 'none',
        border: active ? '1px solid var(--ink)' : '1px solid var(--border)',
        cursor: 'pointer',
        color: active ? 'var(--surf)' : 'var(--ink3)',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        padding: '5px 10px', letterSpacing: '0.3px', transition: 'all 0.12s',
        whiteSpace: 'nowrap', minHeight: 34, touchAction: 'manipulation',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink3)' } }}
    >
      {children}
    </button>
  )
}

// ── MapPage ───────────────────────────────────────────────────────────────────
function arcLabel(arc) {
  return (arc.navLabel || arc.title).replace(/\s·\s/g, ' + ')
}

export default function MapPage() {
  const { activeArc: arc, content }  = useTravel()
  const [selectedTripId,    setSelectedTripId]    = useState('all')
  const [activeSegment,     setActiveSegment]      = useState(null)
  const [fullscreen,        setFullscreen]         = useState(false)
  const [showPlacesLayer,   setShowPlacesLayer]    = useState(false)
  const [placeCatFilter,    setPlaceCatFilter]     = useState('all')
  const [placeStatusFilter, setPlaceStatusFilter]  = useState('all')
  const [showStats,         setShowStats]          = useState(true)
  const [showTimeline,      setShowTimeline]       = useState(false)
  const [selectedItinIdx,   setSelectedItinIdx]    = useState(null)
  const [selectedItinEntry, setSelectedItinEntry]  = useState(null)
  const [hiddenTypes,       setHiddenTypes]        = useState(() => new Set())
  const [showMarkerLabels,  setShowMarkerLabels]   = useState(false)
  const [mapInstance,       setMapInstance]        = useState(null)
  const [showHighlights,    setShowHighlights]     = useState(false)
  const [revealedIds,       setRevealedIds]        = useState(null) // null = all visible

  const { get: getPlaceStatus } = usePlaceStatus()

  const arcPlaces = useMemo(() => {
    if (!arc) return []
    const tripIds = new Set(arc.tripIds)
    return resolvePlaces(allPlaces).filter(p => {
      const tId = p.tripId ?? 'japan2027'
      return tripIds.has(tId) && p.coordinates?.lat && p.coordinates?.lng
    })
  }, [arc?.tripIds]) // eslint-disable-line

  // Progressive marker reveal on arc change
  useEffect(() => {
    if (!arc) return
    const mapData    = content?.map
    const allMarkers = mapData?.markers || []

    if (prefersReducedMotion || !allMarkers.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRevealedIds(null)
      return
    }

    setRevealedIds(new Set())
    const timers = allMarkers.map((m, i) =>
      setTimeout(() => setRevealedIds(prev => {
        if (!prev) return null
        return new Set([...prev, m.id])
      }), 280 + i * 190)
    )
    return () => timers.forEach(clearTimeout)
  }, [arc?.year]) // eslint-disable-line

  const visiblePlacesLayer = useMemo(() => {
    if (!showPlacesLayer) return []
    let list = arcPlaces
    if (placeCatFilter !== 'all') {
      const group = PLACE_CAT_GROUPS.find(g => g.id === placeCatFilter)
      if (group?.cats) list = list.filter(p => group.cats.includes(p.category))
    }
    if (placeStatusFilter !== 'all') {
      list = list.filter(p => {
        const s = getPlaceStatus(p.id)
        if (placeStatusFilter === 'wishlist') return s.wantToVisit
        if (placeStatusFilter === 'visited')  return s.visited
        if (placeStatusFilter === 'booked')   return s.booked
        return true
      })
    }
    return list
  }, [showPlacesLayer, placeCatFilter, placeStatusFilter, arcPlaces, getPlaceStatus])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedTripId('all')
    setActiveSegment(null)
    setSelectedItinIdx(null)
    setSelectedItinEntry(null)
    setHiddenTypes(new Set())
  }, [arc?.year])

  const handleToggleType = useCallback((type) => {
    setHiddenTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }, [])

  const handleItinSelect = useCallback((entry, idx) => {
    setSelectedItinIdx(idx)
    setSelectedItinEntry(entry)
  }, [])

  const handleMapReady = useCallback((map) => { setMapInstance(map) }, [])

  // Hoist all computations + hooks above the null guard so hooks are never skipped
  const trips     = (arc?.tripIds ?? []).map(id => TRIPS[id]).filter(Boolean)
  const isMulti   = trips.length > 1
  const mapData   = content?.map
  const itinerary = content?.itinerary || []
  const arcMeta   = ARC_META[arc?.year] || {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allMarkers  = mapData?.markers  || []
  const allRoute    = mapData?.route    || []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allSegments = mapData?.segments || []

  const markers = useMemo(() => {
    const byTrip = selectedTripId === 'all'
      ? allMarkers
      : allMarkers.filter(m => m.tripId === selectedTripId)
    return byTrip
  }, [selectedTripId, allMarkers])

  const segments = useMemo(() => {
    const byTrip = selectedTripId === 'all'
      ? allSegments
      : allSegments.filter(s => !s.tripId || s.tripId === selectedTripId)
    return byTrip.filter(s => !hiddenTypes.has(s.transportType))
  }, [selectedTripId, allSegments, hiddenTypes])

  const statsSegments = useMemo(() =>
    selectedTripId === 'all'
      ? allSegments
      : allSegments.filter(s => !s.tripId || s.tripId === selectedTripId),
  [selectedTripId, allSegments])

  const route = selectedTripId === 'all'
    ? allRoute
    : markers.filter(m => m.type !== 'secondary').map(m => [m.lat, m.lng])

  const filteredTrip   = selectedTripId !== 'all' ? trips.find(t => t.id === selectedTripId) : null
  const primaryMarkers = markers.filter(m => m.type !== 'secondary')

  const center = filteredTrip && primaryMarkers.length > 0
    ? [
        primaryMarkers.reduce((s, m) => s + m.lat, 0) / primaryMarkers.length,
        primaryMarkers.reduce((s, m) => s + m.lng, 0) / primaryMarkers.length,
      ]
    : (mapData?.center || [20, 0])

  const zoom = selectedTripId !== 'all' ? (mapData?.zoom ?? 6) + 1 : (mapData?.zoom ?? 5)

  const allPositions = useMemo(() => {
    const pts = markers.map(m => [m.lat, m.lng])
    return pts.length > 0 ? pts : route
  }, [markers, route])

  const handleFit = useCallback(() => {
    if (!mapInstance || allPositions.length < 2) return
    mapInstance.fitBounds(L.latLngBounds(allPositions), { padding: [50, 50], animate: true })
  }, [mapInstance, allPositions])

  const accent  = arc?.theme?.accent ?? ''

  function switchTrip(id) { setSelectedTripId(id); setActiveSegment(null) }

  if (!arc) return (
    <div style={{ padding: 52, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink3)' }}>
      No active arc selected.
    </div>
  )

  return (
    <div style={{
      position: fullscreen ? 'fixed' : 'relative',
      inset: fullscreen ? 0 : undefined,
      zIndex: fullscreen ? 800 : undefined,
      background: 'var(--surf)',
      display: 'flex', flexDirection: 'column',
      // '100%' fills the parent <main> (which is 100vh in the flex layout).
      // This prevents <main overflowY="auto"> from becoming scrollable,
      // which was causing wheel events to scroll the page instead of zooming the map.
      height: '100%',
    }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header style={{
        height: 64, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', gap: 10,
        borderBottom: `1.5px solid ${accent}`,
        background: 'var(--surf)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, flexShrink: 0 }} aria-hidden="true" />
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1, margin: 0 }}>
            {arcLabel(arc)}
          </h1>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', letterSpacing: '0.5px' }}>
            {arc.year}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {isMulti && (
            <div role="group" aria-label="Trip filter" style={{ display: 'flex', gap: 4 }}>
              <FilterTab label="All" active={selectedTripId === 'all'} accent={accent} onClick={() => switchTrip('all')} />
              {trips.map(t => (
                <FilterTab
                  key={t.id}
                  label={`${t.flag} ${t.title.replace(/\s+\d{4}$/, '')}`}
                  active={selectedTripId === t.id}
                  accent={accent}
                  onClick={() => switchTrip(t.id)}
                />
              ))}
            </div>
          )}

          {itinerary.length > 0 && (
            <CtrlBtn active={showTimeline} accent={accent} onClick={() => setShowTimeline(v => !v)} ariaLabel={showTimeline ? 'Hide day timeline' : 'Show day timeline'}>
              ◈ Days
            </CtrlBtn>
          )}

          <CtrlBtn active={showStats} accent={accent} onClick={() => setShowStats(v => !v)} ariaLabel={showStats ? 'Hide route statistics' : 'Show route statistics'}>
            ∑ Stats
          </CtrlBtn>

          <CtrlBtn active={showPlacesLayer} accent={accent} onClick={() => setShowPlacesLayer(v => !v)} ariaLabel={showPlacesLayer ? 'Hide places layer' : `Show places layer (${arcPlaces.length} places)`}>
            ◉ Places {arcPlaces.length > 0 ? `(${arcPlaces.length})` : ''}
          </CtrlBtn>

          <CtrlBtn active={false} accent={accent} onClick={() => setFullscreen(f => !f)} ariaLabel={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
            {fullscreen ? '⊡ Exit' : '⊞ Full'}
          </CtrlBtn>
        </div>
      </header>

      {/* ── Day timeline ─────────────────────────────────────────────────────── */}
      {showTimeline && itinerary.length > 0 && (
        <DayTimeline
          itinerary={itinerary}
          allMarkers={allMarkers}
          selectedIdx={selectedItinIdx}
          onSelect={handleItinSelect}
          accent={accent}
          mapInstance={mapInstance}
        />
      )}

      {/* ── Route stats bar ───────────────────────────────────────────────────── */}
      {showStats && (statsSegments.length > 0 || allMarkers.length > 0) && (
        <RouteStatsBar
          segments={statsSegments}
          markers={markers}
          arc={arc}
          arcPlaces={arcPlaces}
        />
      )}

      {/* ── Places filter strip ───────────────────────────────────────────────── */}
      {showPlacesLayer && (
        <div
          role="region"
          aria-label="Places layer filters"
          style={{
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
            padding: '7px 20px', background: 'var(--paper)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>
            Category:
          </span>
          <div role="group" aria-label="Filter by place category" style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1 }}>
            {PLACE_CAT_GROUPS.map(g => (
              <button
                key={g.id}
                onClick={() => setPlaceCatFilter(g.id)}
                aria-pressed={placeCatFilter === g.id}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                  letterSpacing: '0.4px', textTransform: 'uppercase',
                  background: placeCatFilter === g.id ? 'var(--ink)' : 'none',
                  border: `1px solid ${placeCatFilter === g.id ? 'var(--ink)' : 'var(--border)'}`,
                  color: placeCatFilter === g.id ? 'var(--surf)' : 'var(--ink4)',
                  padding: '3px 9px', cursor: 'pointer', transition: 'all 0.12s',
                  minHeight: 28, touchAction: 'manipulation',
                }}
              >{g.label}</button>
            ))}
          </div>
          <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>
            Status:
          </span>
          <div role="group" aria-label="Filter by visit status" style={{ display: 'flex', gap: 4 }}>
            {PLACE_STATUS_OPTS.map(o => (
              <button
                key={o.id}
                onClick={() => setPlaceStatusFilter(o.id)}
                aria-pressed={placeStatusFilter === o.id}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                  letterSpacing: '0.4px', textTransform: 'uppercase',
                  background: placeStatusFilter === o.id ? 'var(--ink)' : 'none',
                  border: `1px solid ${placeStatusFilter === o.id ? 'var(--ink)' : 'var(--border)'}`,
                  color: placeStatusFilter === o.id ? 'var(--surf)' : 'var(--ink4)',
                  padding: '3px 9px', cursor: 'pointer', transition: 'all 0.12s',
                  minHeight: 28, touchAction: 'manipulation',
                }}
              >{o.label}</button>
            ))}
          </div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginLeft: 4 }}>
            {visiblePlacesLayer.length} visible
          </span>
        </div>
      )}

      {/* ── Map area ─────────────────────────────────────────────────────────── */}
      {!mapData ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0ede8' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Map data for {arcLabel(arc)} is being prepared
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
          <MapLegend
            segments={allSegments}
            accent={accent}
            hiddenTypes={hiddenTypes}
            onToggleType={handleToggleType}
          />

          {activeSegment && (
            <SegmentPanel segment={activeSegment} accent={accent} onClose={() => setActiveSegment(null)} />
          )}

          <MapControlsOverlay
            onFit={handleFit}
            showLabels={showMarkerLabels}
            onToggleLabels={() => setShowMarkerLabels(v => !v)}
            showHighlights={showHighlights}
            onToggleHighlights={() => setShowHighlights(v => !v)}
          />

          {showHighlights && arcPlaces.length > 0 && (
            <ScenicHighlights
              arcPlaces={arcPlaces}
              accent={accent}
              mapInstance={mapInstance}
            />
          )}

          <MapContainer
            center={center}
            zoom={zoom}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom
            zoomSnap={0.5}
          >
            <MapInner
              markers={markers}
              segments={segments}
              allSegments={allSegments}
              route={route}
              accent={accent}
              center={center}
              zoom={zoom}
              trips={trips}
              onSegmentClick={setActiveSegment}
              hiddenTypes={hiddenTypes}
              showLabels={showMarkerLabels}
              selectedItinEntry={selectedItinEntry}
              onMapReady={handleMapReady}
              arcPlaces={arcPlaces}
              arcMeta={arcMeta}
              revealedIds={revealedIds}
            />
            {visiblePlacesLayer.length > 0 && (
              <PlacesLayer places={visiblePlacesLayer} getStatus={getPlaceStatus} />
            )}
          </MapContainer>
        </div>
      )}
    </div>
  )
}
