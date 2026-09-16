import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allPlaces } from '../data/places/index'
import { usePlaceStatus } from '../hooks/usePlaceStatus'
import { useTravel } from '../context/TravelContext'
import { resolvePlaces } from '../services/contentResolver/index'

// ── Category system (old + new place schemas) ────────────────────────────────

const CATEGORY_GROUPS = [
  { id: 'all',           label: 'All' },
  { id: 'attraction',    label: 'Attraction',    cats: ['attraction', 'landmark'] },
  { id: 'culture',       label: 'Culture',       cats: ['shrine', 'temple', 'castle', 'museum', 'historic', 'architecture', 'garden'] },
  { id: 'nature',        label: 'Nature',        cats: ['nature', 'park', 'hiking'] },
  { id: 'food',          label: 'Food & Drink',  cats: ['food', 'coffee', 'cafe', 'market', 'nightlife'] },
  { id: 'viewpoint',     label: 'Viewpoints',    cats: ['viewpoint', 'sunrise', 'sunset', 'night-view', 'photography'] },
  { id: 'shopping',      label: 'Shopping',      cats: ['shopping'] },
  { id: 'entertainment', label: 'Entertainment', cats: ['entertainment'] },
  { id: 'sports',        label: 'Sports',        cats: ['sports', 'basketball', 'car-culture', 'cars'] },
  { id: 'hidden',        label: 'Hidden Gems',   cats: ['hidden-gem', 'road-stop'] },
]

// eslint-disable-next-line react-refresh/only-export-components
export const CATEGORY_LABEL = {
  landmark:      'Landmark',
  attraction:    'Attraction',
  food:          'Food',
  nightlife:     'Nightlife',
  entertainment: 'Entertainment',
  shrine:        'Shrine',
  shopping:      'Shopping',
  temple:        'Temple',
  market:        'Market',
  park:          'Park',
  nature:        'Nature',
  garden:        'Garden',
  coffee:        'Coffee',
  cafe:          'Café',
  sports:        'Sports',
  basketball:    'Basketball',
  'car-culture': 'Car Culture',
  cars:          'Cars',
  historic:      'Historic',
  architecture:  'Architecture',
  castle:        'Castle',
  museum:        'Museum',
  viewpoint:     'Viewpoint',
  sunrise:       'Sunrise',
  sunset:        'Sunset',
  photography:   'Photography',
  hiking:        'Hiking',
  'hidden-gem':  'Hidden Gem',
  'road-stop':   'Road Stop',
  'night-view':  'Night View',
}

// ── Status and sort options ───────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { id: 'all',       label: 'All' },
  { id: 'wishlist',  label: 'Wishlist' },
  { id: 'planned',   label: 'Planned' },
  { id: 'booked',    label: 'Booked' },
  { id: 'visited',   label: 'Visited' },
  { id: 'favourite', label: 'Favourite' },
  { id: 'skipped',   label: 'Skipped' },
]

const PRIORITY_OPTIONS = [
  { id: 'all',      label: 'All' },
  { id: 'must',     label: 'Must Do' },
  { id: 'high',     label: 'High' },
  { id: 'optional', label: 'Optional' },
]

const SORT_OPTIONS = [
  { id: 'default',  label: 'Default' },
  { id: 'alpha',    label: 'A → Z' },
  { id: 'priority', label: 'Priority' },
  { id: 'city',     label: 'City' },
  { id: 'category', label: 'Category' },
]

const PRIORITY_ORDER = { must: 0, high: 1, optional: 2 }

// ── Collections ──────────────────────────────────────────────────────────────

const COLLECTIONS = [
  { id: 'must-do',      label: 'Must Do',           icon: '★', filter: p => p.priority === 'must' },
  { id: 'photography',  label: 'Photography Spots',  icon: '📷', filter: p => ['photography','viewpoint','sunrise','sunset','night-view'].includes(p.category) },
  { id: 'best-cafes',   label: 'Best Cafes',         icon: '☕', filter: p => ['coffee','cafe'].includes(p.category) },
  { id: 'food-stops',   label: 'Food Stops',         icon: '🍜', filter: p => ['food','market','nightlife'].includes(p.category) },
  { id: 'hidden-gems',  label: 'Hidden Gems',        icon: '◆', filter: p => ['hidden-gem','road-stop'].includes(p.category) },
  { id: 'basketball',   label: 'Basketball Courts',  icon: '🏀', filter: p => p.category === 'basketball' || (p.category === 'sports' && p.tags?.includes('basketball')) },
  { id: 'car-culture',  label: 'Car Culture',        icon: '🚗', filter: p => ['car-culture','cars'].includes(p.category) },
  { id: 'sunrises',     label: 'Sunrise Spots',      icon: '🌅', filter: p => p.category === 'sunrise' || p.tags?.includes('sunrise') },
  { id: 'sunsets',      label: 'Sunset Spots',       icon: '🌇', filter: p => p.category === 'sunset' || p.tags?.some(t => t.includes('sunset')) },
  { id: 'hiking',       label: 'Hiking',             icon: '⛰', filter: p => p.category === 'hiking' || p.tags?.includes('hiking') },
  { id: 'museums',      label: 'Museums',            icon: '🏛', filter: p => p.category === 'museum' },
  { id: 'castles',      label: 'Castles',            icon: '🏰', filter: p => p.category === 'castle' },
  { id: 'temples',      label: 'Temples & Shrines',  icon: '⛩', filter: p => ['temple','shrine'].includes(p.category) },
  { id: 'night-views',  label: 'Night Views',        icon: '🌃', filter: p => p.category === 'night-view' || p.tags?.some(t => t.includes('night')) },
  { id: 'road-trips',   label: 'Road Trip Stops',    icon: '🛣', filter: p => p.category === 'road-stop' || p.tags?.some(t => ['road-trip','scenic-drive','scenic drive'].includes(t)) },
]

// ── Countries in arc order (derived once at module level) ────────────────────

const ALL_COUNTRIES = (() => {
  const seen = new Set()
  const list = []
  for (const p of allPlaces) {
    const c = p.country || 'Japan'
    if (!seen.has(c)) { seen.add(c); list.push(c) }
  }
  return list
})()

const PLACE_COUNT_BY_COUNTRY = ALL_COUNTRIES.reduce((acc, c) => {
  acc[c] = allPlaces.filter(p => (p.country || 'Japan') === c).length
  return acc
}, {})

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterChip({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
        letterSpacing: '0.6px', textTransform: 'uppercase',
        background: active ? 'var(--ink)' : 'none',
        border: `1px solid ${active ? 'var(--ink)' : 'var(--border)'}`,
        color: active ? 'var(--surf)' : 'var(--ink3)',
        padding: '5px 11px', cursor: 'pointer',
        transition: 'all 0.14s', whiteSpace: 'nowrap',
        display: 'inline-flex', alignItems: 'center', gap: 5,
      }}
    >
      {label}
      {count != null && (
        <span style={{ opacity: active ? 0.7 : 0.5, fontSize: 7 }}>{count}</span>
      )}
    </button>
  )
}

function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
        letterSpacing: '0.4px', textTransform: 'uppercase',
        border: '1px solid var(--border)', background: 'var(--surf)',
        color: 'var(--ink3)', padding: '5px 10px', cursor: 'pointer',
        outline: 'none', appearance: 'none',
        paddingRight: 24,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%23888'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'calc(100% - 8px) center',
      }}
    >
      {SORT_OPTIONS.map(o => (
        <option key={o.id} value={o.id}>{o.label}</option>
      ))}
    </select>
  )
}

function StatusBadge({ status }) {
  if (status.visited) return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
      background: '#2e7d32', color: '#fff',
      padding: '2px 6px', letterSpacing: '0.5px',
    }}>VISITED</span>
  )
  if (status.favourite) return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
      background: '#b5451b', color: '#fff',
      padding: '2px 6px', letterSpacing: '0.5px',
    }}>FAVOURITE</span>
  )
  if (status.booked) return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
      background: 'var(--accent)', color: '#fff',
      padding: '2px 6px', letterSpacing: '0.5px',
    }}>BOOKED</span>
  )
  if (status.planned) return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
      background: '#1565c0', color: '#fff',
      padding: '2px 6px', letterSpacing: '0.5px',
    }}>PLANNED</span>
  )
  if (status.wantToVisit) return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
      background: 'var(--ink)', color: '#fff',
      padding: '2px 6px', letterSpacing: '0.5px',
    }}>WISHLIST</span>
  )
  if (status.skipped) return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
      background: 'var(--ink4)', color: '#fff',
      padding: '2px 6px', letterSpacing: '0.5px',
    }}>SKIPPED</span>
  )
  return null
}

function PlaceCard({ place, status, onToggle, showCountry }) {
  const heroImg = place.heroImage || place.image

  return (
    <div style={{
      background: 'var(--surf)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Image */}
      {heroImg && (
        <div style={{ height: 164, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          <img
            src={heroImg}
            alt={place.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Status badge */}
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <StatusBadge status={status} />
          </div>
          {/* Category badge */}
          <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              background: 'rgba(12,12,12,0.75)', color: '#fff',
              padding: '2px 8px', letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>
              {CATEGORY_LABEL[place.category] || place.category}
            </span>
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '12px 16px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* Location row */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
          color: 'var(--accent)', letterSpacing: '0.8px', textTransform: 'uppercase',
        }}>
          {showCountry && (
            <span style={{ color: 'var(--ink3)', marginRight: 4 }}>
              {place.country || 'Japan'} ·{' '}
            </span>
          )}
          {place.city}
          {place.region && place.region !== place.city && ` · ${place.region}`}
          {place.tripDay && (
            <span style={{ color: 'var(--ink4)' }}> · Day {place.tripDay}</span>
          )}
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 15.5, fontWeight: 600,
          color: 'var(--ink)', lineHeight: 1.2,
        }}>
          {place.name}
        </div>

        {/* Description */}
        <div style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.72, flex: 1 }}>
          {place.description}
        </div>

        {/* Hours + Cost */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 2,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)',
        }}>
          {place.openingHours && <span>⏰ {place.openingHours}</span>}
          {place.estimatedCost === 0 && <span>Free entry</span>}
          {place.estimatedCost > 0 && <span>~¥{place.estimatedCost.toLocaleString()}</span>}
          {place.cost && !place.estimatedCost && <span>{place.cost}</span>}
          {place.bookingRequired && (
            <span style={{ color: 'var(--accent)' }}>Book ahead</span>
          )}
        </div>

        {/* Tags */}
        {place.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {place.tags.slice(0, 4).map(t => (
              <span key={t} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                color: 'var(--ink4)', border: '1px solid var(--border)',
                padding: '1px 6px', letterSpacing: '0.3px',
              }}>{t}</span>
            ))}
          </div>
        )}

        {/* Priority pip */}
        {place.priority === 'must' && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
            color: 'var(--accent)', letterSpacing: '0.8px', textTransform: 'uppercase',
          }}>
            Must Do
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex', gap: 5, paddingTop: 8,
          borderTop: '1px solid var(--border)',
          flexWrap: 'wrap', alignItems: 'center',
        }}>
          <Link
            to={`/place/${place.id}`}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink)', textDecoration: 'none',
              border: '1.5px solid var(--ink)', padding: '4px 10px',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              letterSpacing: '0.6px', textTransform: 'uppercase',
            }}
          >
            Details →
          </Link>
          {(place.googleMaps || place.mapsUrl) && (
            <a
              href={place.googleMaps || place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                color: 'var(--ink3)', textDecoration: 'none',
                border: '1.5px solid var(--border)', padding: '4px 10px',
                display: 'inline-flex', alignItems: 'center', gap: 4,
                letterSpacing: '0.6px', textTransform: 'uppercase',
              }}
            >
              Maps
            </a>
          )}
          <button
            onClick={() => onToggle(place.id, 'wantToVisit')}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              letterSpacing: '0.5px', textTransform: 'uppercase',
              background: status.wantToVisit ? 'var(--ink)' : 'none',
              border: `1px solid ${status.wantToVisit ? 'var(--ink)' : 'var(--border)'}`,
              color: status.wantToVisit ? 'var(--surf)' : 'var(--ink4)',
              padding: '3px 9px', cursor: 'pointer',
              transition: 'all 0.14s',
            }}
          >
            {status.wantToVisit ? '★ Want' : '☆ Want'}
          </button>
          <button
            onClick={() => onToggle(place.id, 'visited')}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              letterSpacing: '0.5px', textTransform: 'uppercase',
              background: status.visited ? '#2e7d32' : 'none',
              border: `1px solid ${status.visited ? '#2e7d32' : 'var(--border)'}`,
              color: status.visited ? '#fff' : 'var(--ink4)',
              padding: '3px 9px', cursor: 'pointer',
              transition: 'all 0.14s',
            }}
          >
            {status.visited ? '✓' : '○'} Visited
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Collections grid ─────────────────────────────────────────────────────────

const PAGES_PER_LOAD = 60

function CollectionCard({ collection, places, countryFilter }) {
  const items = places.filter(collection.filter)
  if (items.length === 0) return null

  const previewImgs = items
    .filter(p => p.heroImage || p.image)
    .slice(0, 3)
    .map(p => p.heroImage || p.image)

  const firstImg = previewImgs[0]

  return (
    <Link
      to={`/places?collection=${collection.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div style={{
        background: 'var(--surf)', cursor: 'pointer',
        transition: 'background 0.14s',
        display: 'flex', flexDirection: 'column',
        height: '100%',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}
      >
        {/* Preview image */}
        {firstImg ? (
          <div style={{ height: 130, overflow: 'hidden', flexShrink: 0 }}>
            <img
              src={firstImg}
              alt={collection.label}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ) : (
          <div style={{ height: 80, background: 'var(--paper)', flexShrink: 0 }} />
        )}

        <div style={{ padding: '12px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14 }}>{collection.icon}</span>
            <span style={{
              fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600,
              color: 'var(--ink)', lineHeight: 1.1,
            }}>
              {collection.label}
            </span>
          </div>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)', letterSpacing: '0.5px',
          }}>
            {items.length} {items.length === 1 ? 'place' : 'places'}
            {countryFilter !== 'All' && ` in ${countryFilter}`}
          </span>
        </div>
      </div>
    </Link>
  )
}

function CollectionsView({ places, countryFilter }) {
  const hasAny = COLLECTIONS.some(c => places.filter(c.filter).length > 0)

  if (!hasAny) return (
    <div style={{
      padding: '80px 52px', textAlign: 'center',
      fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink4)',
    }}>
      No collections available for current filter.
    </div>
  )

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: 1,
      background: 'var(--border)',
    }}>
      {COLLECTIONS.map(c => (
        <CollectionCard key={c.id} collection={c} places={places} countryFilter={countryFilter} />
      ))}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Places() {
  const { get, toggle, totals } = usePlaceStatus()
  const { activeTrip: trip } = useTravel()
  const places = useMemo(() => resolvePlaces(allPlaces), [])

  const [view,     setView]     = useState('places')   // 'places' | 'collections'
  const [country,  setCountry]  = useState('All')
  const [city,     setCity]     = useState('All')
  const [catGroup, setCat]      = useState('all')
  const [status,   setStatus]   = useState('all')
  const [priority, setPriority] = useState('all')
  const [sort,     setSort]     = useState('default')
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)

  // Sync country to active trip on mount / trip change
  useEffect(() => {
    if (!trip) return
    const sample = places.find(p => (p.tripId ?? 'japan2027') === trip.id)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountry(sample?.country || 'Japan')
    setCity('All')
  }, [trip?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reset city + page when country changes
  const handleCountryChange = (c) => {
    setCountry(c)
    setCity('All')
    setPage(1)
  }

  // Cities within selected country
  const cities = useMemo(() => {
    const base = country === 'All'
      ? places
      : places.filter(p => (p.country || 'Japan') === country)
    return ['All', ...[...new Set(base.map(p => p.city))]]
  }, [country, places])

  // Use totals as change signal for status-based filtering
  const totalsKey = Object.values(totals).join(':')

  const filtered = useMemo(() => {
    let list = places

    if (country !== 'All') list = list.filter(p => (p.country || 'Japan') === country)
    if (city !== 'All')    list = list.filter(p => p.city === city)

    if (catGroup !== 'all') {
      const cats = CATEGORY_GROUPS.find(g => g.id === catGroup)?.cats || []
      list = list.filter(p => cats.includes(p.category))
    }

    if (priority !== 'all') {
      list = list.filter(p => (p.priority || 'optional') === priority)
    }

    if (status !== 'all') {
      list = list.filter(p => {
        const s = get(p.id)
        if (status === 'wishlist')  return s.wantToVisit
        if (status === 'planned')   return s.planned
        if (status === 'booked')    return s.booked
        if (status === 'visited')   return s.visited
        if (status === 'skipped')   return s.skipped
        if (status === 'favourite') return s.favourite
        return true
      })
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.country || 'Japan').toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q) ||
        p.region?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    if (sort === 'alpha')    list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'priority') list = [...list].sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3))
    if (sort === 'city')     list = [...list].sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
    if (sort === 'category') list = [...list].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))

    return list
  }, [places, country, city, catGroup, priority, status, sort, search, totalsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const totalVisible   = country === 'All' ? places.length : places.filter(p => (p.country || 'Japan') === country).length
  const showCountry    = country === 'All'
  const visiblePlaces  = filtered.slice(0, page * PAGES_PER_LOAD)
  const hasMore        = visiblePlaces.length < filtered.length

  // Place statistics
  const placeStats = useMemo(() => {
    const src = country === 'All' ? places : places.filter(p => (p.country || 'Japan') === country)
    const catCounts = {}
    for (const p of src) {
      const c = CATEGORY_LABEL[p.category] || p.category
      catCounts[c] = (catCounts[c] || 0) + 1
    }
    const top = Object.entries(catCounts)
      .sort(([,a],[,b]) => b - a)
      .slice(0, 5)
    return { total: src.length, top }
  }, [country, places])

  return (
    <div className="page-enter">

      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden', height: 200,
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1400&q=70&auto=format&fit=crop')",
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(12,12,12,0.10) 0%, rgba(12,12,12,0.72) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>003 — World Places</div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 42,
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff',
          }}>
            Places <em style={{ color: 'rgba(255,200,150,0.95)' }}>Database</em>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 52px', borderBottom: '1px solid var(--border)',
        background: 'var(--surf)', flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase',
        }}>
          {placeStats.total} places · {ALL_COUNTRIES.length} countries
        </div>
        {/* Top categories */}
        {placeStats.top.map(([cat, count]) => (
          <span key={cat} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', border: '1px solid var(--border)',
            padding: '1px 7px', letterSpacing: '0.3px',
          }}>{cat} {count}</span>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {totals.visited > 0 && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px',
            }}>✓ {totals.visited} visited</span>
          )}
          {totals.want > 0 && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              background: 'var(--paper)', color: 'var(--ink3)',
              border: '1px solid var(--border)', padding: '2px 8px',
            }}>★ {totals.want} wishlist</span>
          )}
          {totals.favourite > 0 && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              background: '#fbe9e7', color: '#b5451b', padding: '2px 8px',
            }}>{totals.favourite} faves</span>
          )}
          {/* View toggle */}
          <div style={{ display: 'flex', gap: 1, border: '1px solid var(--border)' }}>
            {[
              { id: 'places',      label: 'Places' },
              { id: 'collections', label: 'Collections' },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                  letterSpacing: '0.5px', textTransform: 'uppercase',
                  background: view === v.id ? 'var(--ink)' : 'none',
                  border: 'none',
                  color: view === v.id ? 'var(--surf)' : 'var(--ink4)',
                  padding: '4px 10px', cursor: 'pointer',
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--surf)',
        borderBottom: '1.5px solid var(--ink)',
      }}>

        {/* Row 1: Country selector */}
        <div style={{
          display: 'flex', alignItems: 'stretch',
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto',
        }}>
          {/* "All" tab */}
          {['All', ...ALL_COUNTRIES].map(c => (
            <button
              key={c}
              onClick={() => handleCountryChange(c)}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                letterSpacing: '0.7px', textTransform: 'uppercase',
                background: 'none', border: 'none',
                borderBottom: country === c ? '2px solid var(--ink)' : '2px solid transparent',
                color: country === c ? 'var(--ink)' : 'var(--ink3)',
                padding: '11px 14px 9px',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'color 0.14s, border-color 0.14s',
                fontWeight: country === c ? 600 : 400,
              }}
            >
              {c}
              {c !== 'All' && (
                <span style={{ marginLeft: 4, color: 'var(--ink4)', fontWeight: 400, fontSize: 7 }}>
                  {PLACE_COUNT_BY_COUNTRY[c]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Row 2: City tabs (only when a country is selected) */}
        {country !== 'All' && (
          <div style={{
            display: 'flex', alignItems: 'stretch',
            borderBottom: '1px solid var(--border)',
            overflowX: 'auto',
          }}>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: '0.7px', textTransform: 'uppercase',
                  background: 'none', border: 'none',
                  borderBottom: city === c ? '2px solid var(--ink)' : '2px solid transparent',
                  color: city === c ? 'var(--ink)' : 'var(--ink3)',
                  padding: '10px 14px 8px',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'color 0.14s, border-color 0.14s',
                  fontWeight: city === c ? 600 : 400,
                  fontSize: 7.5,
                }}
              >
                {c}
                {c !== 'All' && (
                  <span style={{ marginLeft: 4, color: 'var(--ink4)', fontWeight: 400, fontSize: 6.5 }}>
                    {places.filter(p => p.city === c && (p.country || 'Japan') === country).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Row 3: Category + Status + Priority + Sort + Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 52px', flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          {/* Category chips */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
            {CATEGORY_GROUPS.map(g => (
              <FilterChip
                key={g.id}
                label={g.label}
                active={catGroup === g.id}
                onClick={() => setCat(g.id)}
              />
            ))}
          </div>

          {/* Right-side controls */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
            {/* Status filter */}
            <div style={{ display: 'flex', gap: 3 }}>
              {STATUS_OPTIONS.map(o => (
                <FilterChip
                  key={o.id}
                  label={o.label}
                  active={status === o.id}
                  onClick={() => setStatus(o.id)}
                />
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'var(--border)' }} />

            {/* Priority filter */}
            <div style={{ display: 'flex', gap: 3 }}>
              {PRIORITY_OPTIONS.map(o => (
                <FilterChip
                  key={o.id}
                  label={o.label}
                  active={priority === o.id}
                  onClick={() => setPriority(o.id)}
                />
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'var(--border)' }} />

            {/* Sort */}
            <SortSelect value={sort} onChange={setSort} />

            {/* Search */}
            <input
              type="text"
              placeholder="Search places…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                border: '1px solid var(--border)', background: 'var(--paper)',
                color: 'var(--ink)', padding: '5px 11px', outline: 'none',
                width: 190, letterSpacing: '0.3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={{
        padding: '9px 52px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--paper)',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
        }}>
          {filtered.length === totalVisible
            ? `All ${totalVisible} places`
            : `${filtered.length} of ${totalVisible} places`}
          {country !== 'All' && ` — ${country}`}
        </span>
        {/* Active filter pills */}
        {status !== 'all' && (
          <span
            onClick={() => setStatus('all')}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink3)', border: '1px solid var(--border)',
              padding: '1px 8px', cursor: 'pointer', letterSpacing: '0.3px',
            }}
          >
            Status: {STATUS_OPTIONS.find(o => o.id === status)?.label} ×
          </span>
        )}
        {priority !== 'all' && (
          <span
            onClick={() => setPriority('all')}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink3)', border: '1px solid var(--border)',
              padding: '1px 8px', cursor: 'pointer', letterSpacing: '0.3px',
            }}
          >
            Priority: {PRIORITY_OPTIONS.find(o => o.id === priority)?.label} ×
          </span>
        )}
        {search && (
          <span
            onClick={() => setSearch('')}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink3)', border: '1px solid var(--border)',
              padding: '1px 8px', cursor: 'pointer', letterSpacing: '0.3px',
            }}
          >
            "{search}" ×
          </span>
        )}
      </div>

      {/* Collections or card grid */}
      {view === 'collections' ? (
        <CollectionsView places={filtered} countryFilter={country} />
      ) : filtered.length === 0 ? (
        <div style={{
          padding: '80px 52px',
          textAlign: 'center',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          color: 'var(--ink4)', letterSpacing: '0.5px',
        }}>
          No places match your filters.
          <div style={{ marginTop: 14, fontSize: 9 }}>
            <span
              style={{ color: 'var(--ink3)', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => { setCat('all'); setStatus('all'); setPriority('all'); setSearch('') }}
            >
              Clear all filters
            </span>
          </div>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(288px, 1fr))',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {visiblePlaces.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                status={get(place.id)}
                onToggle={toggle}
                showCountry={showCountry}
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16,
              padding: '32px 52px', borderTop: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                color: 'var(--ink4)', letterSpacing: '0.4px',
              }}>
                Showing {visiblePlaces.length} of {filtered.length}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                  letterSpacing: '0.6px', textTransform: 'uppercase',
                  background: 'var(--ink)', color: 'var(--surf)',
                  border: 'none', padding: '8px 20px', cursor: 'pointer',
                }}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
