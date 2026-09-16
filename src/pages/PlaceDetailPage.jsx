import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { WEATHER_OPTS } from '../context/JournalContext'
import { placeMapById, allPlaces, ITINERARY_NAME_MAP, BBALL_SOURCE_MAP, CAR_SOURCE_MAP } from '../data/places/index'
import { BASKETBALL_COURTS } from '../data/trips/japan2027/basketball'
import { CAR_SPOTS, GTR_NIGHT } from '../data/trips/japan2027/cars'
import { usePlaceStatus } from '../hooks/usePlaceStatus'
import { useTravel } from '../context/TravelContext'
import { useTripData } from '../hooks/useTripData'
import { resolvePlace, resolvePlaces } from '../services/contentResolver/index'

// ── Runtime reverse maps — no data modification ──────────────────────────────

const ID_TO_ITIN_NAME = Object.fromEntries(
  Object.entries(ITINERARY_NAME_MAP).map(([name, id]) => [id, name])
)
const ID_TO_BBALL_ID = Object.fromEntries(
  Object.entries(BBALL_SOURCE_MAP).map(([courtId, placeId]) => [placeId, courtId])
)
const ID_TO_CAR_ID = Object.fromEntries(
  Object.entries(CAR_SOURCE_MAP).map(([carId, placeId]) => [placeId, carId])
)

// ── Display maps ─────────────────────────────────────────────────────────────

const CATEGORY_LABEL = {
  landmark: 'Landmark', attraction: 'Attraction',
  food: 'Food', nightlife: 'Nightlife', cafe: 'Café', coffee: 'Coffee', market: 'Market',
  entertainment: 'Entertainment', shrine: 'Shrine', shopping: 'Shopping',
  temple: 'Temple', park: 'Park', nature: 'Nature', garden: 'Garden',
  sports: 'Sports', basketball: 'Basketball', 'car-culture': 'Car Culture', cars: 'Cars',
  historic: 'Historic', architecture: 'Architecture', castle: 'Castle', museum: 'Museum',
  viewpoint: 'Viewpoint', sunrise: 'Sunrise', sunset: 'Sunset',
  photography: 'Photography', hiking: 'Hiking',
  'hidden-gem': 'Hidden Gem', 'road-stop': 'Road Stop', 'night-view': 'Night View',
}

const PRIORITY_META = {
  must:     { label: 'Must Do',       color: 'var(--accent)' },
  high:     { label: 'High Priority', color: 'var(--ink)'    },
  optional: { label: 'Optional',      color: 'var(--ink4)'   },
}

// ── Enrichment lookup ─────────────────────────────────────────────────────────

function useEnrichment(place) {
  const { days } = useTripData()
  const { activeTrip: trip } = useTravel()
  return useMemo(() => {
    if (!place) return {}

    const itinName = ID_TO_ITIN_NAME[place.id]
    let itinEntry = null
    let itinDay   = null
    if (itinName) {
      for (const day of days) {
        const p = day.places.find(p => p.name === itinName)
        if (p) { itinEntry = p; itinDay = day; break }
      }
    }

    const bbCourtId = ID_TO_BBALL_ID[place.id]
    const bbCourt   = bbCourtId ? BASKETBALL_COURTS.find(c => c.id === bbCourtId) : null

    const carSpotId = ID_TO_CAR_ID[place.id]
    const carSpot   = carSpotId ? CAR_SPOTS.find(s => s.id === carSpotId) : null
    const gtrNight  = place.id === 'tokyo-jdm-daikoku' ? GTR_NIGHT : null

    return { itinEntry, itinDay, bbCourt, carSpot, gtrNight }
  }, [place?.id, trip?.id]) // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Related places ────────────────────────────────────────────────────────────

function getRelated(place, count = 5) {
  if (!place) return []
  const tripId = place.tripId ?? 'japan2027'
  return resolvePlaces(allPlaces)
    .filter(p =>
      p.id !== place.id &&
      p.city === place.city &&
      (p.tripId ?? 'japan2027') === tripId
    )
    .map(p => ({
      ...p,
      _score:
        (p.category === place.category ? 2 : 0) +
        (p.tripDay && p.tripDay === place.tripDay ? 1 : 0),
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, count)
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BackBtn() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: 'absolute', top: 16, left: 16, zIndex: 4,
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
        letterSpacing: '0.6px', textTransform: 'uppercase',
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.35)',
        color: '#fff', padding: '6px 12px',
        cursor: 'pointer', transition: 'background 0.14s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.30)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
    >
      ← Places
    </button>
  )
}

function PlaceHero({ place }) {
  const priorityMeta = PRIORITY_META[place.priority]
  const heroImg = place.heroImage || place.image
  const hasImage = !!heroImg

  return (
    <div style={{
      position: 'relative', height: 360, overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end',
      background: hasImage ? undefined : 'var(--ink)',
    }}>
      {hasImage && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${heroImg}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: hasImage
          ? 'linear-gradient(180deg, rgba(12,12,12,0.15) 0%, rgba(12,12,12,0.78) 100%)'
          : 'rgba(12,12,12,0.85)',
      }} />

      <BackBtn />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 52px 28px', width: '100%' }}>
        {/* Badges row */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            background: 'rgba(12,12,12,0.65)', color: 'rgba(255,255,255,0.85)',
            padding: '3px 8px', letterSpacing: '0.6px', textTransform: 'uppercase',
          }}>
            {place.city}{place.region && place.region !== place.city ? ` · ${place.region}` : ''}
          </span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            background: 'rgba(12,12,12,0.65)', color: 'rgba(255,255,255,0.85)',
            padding: '3px 8px', letterSpacing: '0.6px', textTransform: 'uppercase',
          }}>
            {CATEGORY_LABEL[place.category] || place.category}
          </span>
          {priorityMeta && place.priority !== 'optional' && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              background: place.priority === 'must' ? 'var(--accent)' : 'rgba(12,12,12,0.65)',
              color: '#fff',
              padding: '3px 8px', letterSpacing: '0.6px', textTransform: 'uppercase',
            }}>
              {priorityMeta.label}
            </span>
          )}
          {place.tripDay && (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              background: 'rgba(12,12,12,0.65)', color: 'rgba(255,255,255,0.7)',
              padding: '3px 8px', letterSpacing: '0.6px', textTransform: 'uppercase',
            }}>
              Day {place.tripDay}
            </span>
          )}
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 40,
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.5px', color: '#fff',
          maxWidth: 640,
        }}>
          {place.name}
        </div>
      </div>
    </div>
  )
}

function PlaceActions({ place, status, onToggle }) {
  const mapsUrl    = place.googleMaps || place.mapsUrl
  const { lat, lng } = place.coordinates || {}
  const streetViewUrl = lat && lng
    ? `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}`
    : null
  const navigateUrl = lat && lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : null

  const btnBase = {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
    letterSpacing: '0.6px', textTransform: 'uppercase',
    padding: '7px 14px', cursor: 'pointer', transition: 'all 0.14s',
  }
  const linkBase = {
    ...btnBase,
    textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 5,
  }

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkBase, color: 'var(--ink)', border: '1.5px solid var(--ink)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--surf)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)' }}
        >
          Open Maps
        </a>
      )}
      {streetViewUrl && (
        <a
          href={streetViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkBase, color: 'var(--ink3)', border: '1.5px solid var(--border)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Street View
        </a>
      )}
      {navigateUrl && (
        <a
          href={navigateUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkBase, color: 'var(--ink3)', border: '1.5px solid var(--border)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Navigate →
        </a>
      )}
      {place.website && (
        <a
          href={place.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkBase, color: 'var(--ink3)', border: '1.5px solid var(--border)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          ↗ Website
        </a>
      )}
      {place.bookingLink && (
        <a
          href={place.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...linkBase, color: 'var(--accent)', border: '1.5px solid var(--accent)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
        >
          Book Tickets
        </a>
      )}

      <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 2px' }} />

      <button
        onClick={() => onToggle(place.id, 'wantToVisit')}
        style={{
          ...btnBase,
          background: status.wantToVisit ? 'var(--ink)' : 'none',
          border: `1.5px solid ${status.wantToVisit ? 'var(--ink)' : 'var(--border)'}`,
          color: status.wantToVisit ? 'var(--surf)' : 'var(--ink3)',
        }}
      >
        {status.wantToVisit ? '★ Wishlist' : '☆ Wishlist'}
      </button>
      <button
        onClick={() => onToggle(place.id, 'visited')}
        style={{
          ...btnBase,
          background: status.visited ? '#2e7d32' : 'none',
          border: `1.5px solid ${status.visited ? '#2e7d32' : 'var(--border)'}`,
          color: status.visited ? '#fff' : 'var(--ink3)',
        }}
      >
        {status.visited ? '✓ Visited' : '○ Mark Visited'}
      </button>
      <button
        onClick={() => onToggle(place.id, 'favourite')}
        style={{
          ...btnBase,
          background: status.favourite ? '#b5451b' : 'none',
          border: `1.5px solid ${status.favourite ? '#b5451b' : 'var(--border)'}`,
          color: status.favourite ? '#fff' : 'var(--ink3)',
        }}
      >
        {status.favourite ? '♥ Favourite' : '♡ Favourite'}
      </button>
    </div>
  )
}

function PlaceInfo({ place }) {
  const rows = [
    place.openingHours              && { label: 'Hours',       value: place.openingHours },
    place.recommendedTime           && { label: 'Time Needed', value: place.recommendedTime },
    place.estimatedCost === 0       && { label: 'Entry',       value: 'Free' },
    place.estimatedCost > 0         && { label: 'Est. Cost',   value: `~¥${place.estimatedCost.toLocaleString()}` },
    (place.cost && !place.estimatedCost) && { label: 'Cost',   value: place.cost },
    place.bestSeason                && { label: 'Best Season', value: place.bestSeason },
    place.bookingRequired           && { label: 'Booking',     value: 'Required in advance' },
    place.accessibility             && { label: 'Access',      value: place.accessibility },
    place.parking                   && { label: 'Parking',     value: place.parking },
    place.publicTransport           && { label: 'Transit',     value: place.publicTransport },
    place.address                   && { label: 'Address',     value: place.address },
    place.coordinates               && { label: 'Coords',      value: `${place.coordinates.lat}, ${place.coordinates.lng}` },
  ].filter(Boolean)

  if (!rows.length) return null

  return (
    <div style={{
      border: '1px solid var(--border)', background: 'var(--surf)',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        letterSpacing: '1.2px', textTransform: 'uppercase',
        color: 'var(--ink4)', padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        Info
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'flex', gap: 12, padding: '9px 16px',
          borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
          alignItems: 'flex-start',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)', letterSpacing: '0.5px', textTransform: 'uppercase',
            width: 72, flexShrink: 0, paddingTop: 1,
          }}>
            {row.label}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.6 }}>
            {row.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionHeader({ label }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
      letterSpacing: '1.5px', textTransform: 'uppercase',
      color: 'var(--accent)', marginBottom: 14,
      paddingBottom: 8, borderBottom: '1px solid var(--border)',
    }}>
      {label}
    </div>
  )
}

// ── Gallery ──────────────────────────────────────────────────────────────────

function GallerySection({ images, personalPhotos }) {
  const hasPersonal = personalPhotos?.length > 0
  const urls = hasPersonal
    ? personalPhotos.map(p => p.url).filter(Boolean)
    : (images || [])

  if (!urls.length) return null

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--accent)',
          paddingBottom: 8, borderBottom: '1px solid var(--border)', flex: 1,
        }}>
          Gallery
        </div>
        {hasPersonal && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
            color: '#2e7d32', border: '1px solid #c8e6c9',
            background: '#f1f8f1', padding: '2px 8px', letterSpacing: '0.5px',
            flexShrink: 0,
          }}>
            My Photos
          </span>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: urls.length === 1
          ? '1fr'
          : urls.length === 2
          ? '1fr 1fr'
          : 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 2,
      }}>
        {urls.slice(0, 8).map((src, i) => (
          <div key={i} style={{ height: urls.length === 1 ? 320 : 180, overflow: 'hidden' }}>
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
      {hasPersonal && personalPhotos.some(p => p.caption) && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {personalPhotos.filter(p => p.caption).map(p => (
            <div key={p.id} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
              color: 'var(--ink3)', lineHeight: 1.5,
            }}>
              — {p.caption}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Weather / Season ─────────────────────────────────────────────────────────

function WeatherSection({ place }) {
  if (!place.weatherNotes && !place.bestSeason) return null
  return (
    <div style={{ marginBottom: 28 }}>
      <SectionHeader label="When to Visit" />
      {place.bestSeason && (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: 'var(--ink3)', marginBottom: 8, letterSpacing: '0.3px',
        }}>
          Best season: <span style={{ color: 'var(--ink)' }}>{place.bestSeason}</span>
        </div>
      )}
      {place.weatherNotes && (
        <div style={{
          padding: '12px 14px',
          borderLeft: '3px solid var(--border)', background: 'var(--paper)',
          fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.78,
        }}>
          {place.weatherNotes}
        </div>
      )}
    </div>
  )
}

// ── Personal section ─────────────────────────────────────────────────────────

function PhotoInput({ photos, onChange }) {
  const [newUrl, setNewUrl] = useState('')

  const addPhoto = () => {
    const url = newUrl.trim()
    if (!url) return
    const id = `pp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
    onChange([...(photos || []), { id, url, caption: '' }])
    setNewUrl('')
  }

  const removePhoto = (id) => onChange((photos || []).filter(p => p.id !== id))

  const updateCaption = (id, caption) =>
    onChange((photos || []).map(p => p.id === id ? { ...p, caption } : p))

  const inputStyle = {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
    border: '1px solid var(--border)', background: 'var(--paper)',
    color: 'var(--ink)', padding: '5px 9px', outline: 'none',
  }

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
        marginBottom: 8,
      }}>
        My Photos {photos?.length > 0 && `(${photos.length})`}
      </div>

      {photos?.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 4, marginBottom: 10 }}>
          {photos.map(p => (
            <div key={p.id} style={{ position: 'relative' }}>
              <div style={{ height: 100, overflow: 'hidden', background: 'var(--border)' }}>
                <img
                  src={p.url} alt={p.caption || 'Photo'} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
              <input
                type="text"
                value={p.caption}
                onChange={e => updateCaption(p.id, e.target.value)}
                placeholder="Caption…"
                style={{
                  ...inputStyle, width: '100%', boxSizing: 'border-box',
                  borderTop: 'none', fontSize: 8,
                }}
              />
              <button
                onClick={() => removePhoto(p.id)}
                style={{
                  position: 'absolute', top: 4, right: 4,
                  background: 'rgba(0,0,0,0.55)', border: 'none',
                  color: '#fff', fontSize: 10, width: 20, height: 20,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type="url"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addPhoto()}
          placeholder="Paste photo URL…"
          style={{ ...inputStyle, flex: 1 }}
        />
        <button
          onClick={addPhoto}
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            background: newUrl.trim() ? 'var(--ink)' : 'none',
            border: '1px solid var(--border)',
            color: newUrl.trim() ? 'var(--surf)' : 'var(--ink4)',
            padding: '5px 12px', cursor: 'pointer', transition: 'all 0.14s',
          }}
        >
          Add
        </button>
      </div>
    </div>
  )
}

function PersonalSection({ placeId, status, onToggle, onSet }) {
  const [draft,         setDraft]         = useState(status.notes           || '')
  const [memoryDraft,   setMemoryDraft]   = useState(status.favouriteMemory || '')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(status.notes || '')
    setMemoryDraft(status.favouriteMemory || '')
  }, [status.notes, status.favouriteMemory])

  const STARS = [1, 2, 3, 4, 5]

  const fieldLabel = (text) => (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
      color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
      marginBottom: 7,
    }}>
      {text}
    </div>
  )

  const inputStyle = {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
    border: '1px solid var(--border)', background: 'var(--paper)',
    color: 'var(--ink)', padding: '5px 10px', outline: 'none',
  }

  return (
    <div style={{
      border: '1px solid var(--border)', background: 'var(--surf)',
      marginBottom: 28,
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        letterSpacing: '1.2px', textTransform: 'uppercase',
        color: 'var(--ink4)', padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        My Visit
      </div>

      <div style={{ padding: '16px' }}>
        {/* Status toggles */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
          {[
            { field: 'wantToVisit', label: 'Wishlist',  activeColor: 'var(--ink)' },
            { field: 'planned',     label: 'Planned',   activeColor: '#1565c0' },
            { field: 'booked',      label: 'Booked',    activeColor: 'var(--accent)' },
            { field: 'visited',     label: 'Visited',   activeColor: '#2e7d32' },
            { field: 'favourite',   label: 'Favourite', activeColor: '#b5451b' },
            { field: 'skipped',     label: 'Skipped',   activeColor: 'var(--ink4)' },
          ].map(({ field, label, activeColor }) => (
            <button
              key={field}
              onClick={() => onToggle(placeId, field)}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                letterSpacing: '0.5px', textTransform: 'uppercase',
                background: status[field] ? activeColor : 'none',
                border: `1px solid ${status[field] ? activeColor : 'var(--border)'}`,
                color: status[field] ? '#fff' : 'var(--ink4)',
                padding: '4px 10px', cursor: 'pointer', transition: 'all 0.14s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Rating */}
        <div style={{ marginBottom: 14 }}>
          {fieldLabel('Rating')}
          <div style={{ display: 'flex', gap: 4 }}>
            {STARS.map(n => (
              <button
                key={n}
                onClick={() => onSet(placeId, 'rating', status.rating === n ? 0 : n)}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 16,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: n <= (status.rating || 0) ? '#e6a817' : 'var(--border)',
                  padding: '0 2px', lineHeight: 1, transition: 'color 0.12s',
                }}
              >
                {n <= (status.rating || 0) ? '★' : '☆'}
              </button>
            ))}
          </div>
        </div>

        {/* Visit details — only shown when marked visited */}
        {status.visited && (
          <div style={{
            borderTop: '1px solid var(--border)', paddingTop: 14,
            marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {/* Date */}
            <div>
              {fieldLabel('Date Visited')}
              <input
                type="date"
                value={status.dateVisited || ''}
                onChange={e => onSet(placeId, 'dateVisited', e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Duration + cost row */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 120px' }}>
                {fieldLabel('Time Spent')}
                <input
                  type="text"
                  value={status.actualDuration || ''}
                  onChange={e => onSet(placeId, 'actualDuration', e.target.value)}
                  placeholder="e.g. 45 min, 2 hrs"
                  style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ flex: '1 1 120px' }}>
                {fieldLabel('Actual Cost')}
                <input
                  type="text"
                  value={status.actualCost || ''}
                  onChange={e => onSet(placeId, 'actualCost', e.target.value)}
                  placeholder="e.g. ¥500, free"
                  style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Weather */}
            <div>
              {fieldLabel('Weather')}
              <select
                value={status.visitWeather || ''}
                onChange={e => onSet(placeId, 'visitWeather', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">— not recorded —</option>
                {WEATHER_OPTS.map(w => (
                  <option key={w.id} value={w.id}>{w.emoji} {w.label}</option>
                ))}
              </select>
            </div>

            {/* Favourite memory */}
            <div>
              {fieldLabel('Favourite Memory')}
              <textarea
                value={memoryDraft}
                onChange={e => setMemoryDraft(e.target.value)}
                onBlur={() => onSet(placeId, 'favouriteMemory', memoryDraft)}
                placeholder="The one thing you'll always remember about this place…"
                rows={2}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                  border: '1px solid var(--border)', background: 'var(--paper)',
                  color: 'var(--ink)', padding: '8px 10px',
                  resize: 'vertical', outline: 'none', lineHeight: 1.65,
                  letterSpacing: '0.2px',
                }}
              />
            </div>
          </div>
        )}

        {/* Would visit again */}
        <div style={{ marginBottom: 14 }}>
          {fieldLabel('Would visit again?')}
          <div style={{ display: 'flex', gap: 5 }}>
            {[true, false].map(val => (
              <button
                key={String(val)}
                onClick={() => onSet(placeId, 'wouldVisitAgain', status.wouldVisitAgain === val ? null : val)}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                  letterSpacing: '0.5px', textTransform: 'uppercase',
                  background: status.wouldVisitAgain === val ? 'var(--ink)' : 'none',
                  border: `1px solid ${status.wouldVisitAgain === val ? 'var(--ink)' : 'var(--border)'}`,
                  color: status.wouldVisitAgain === val ? 'var(--surf)' : 'var(--ink4)',
                  padding: '4px 12px', cursor: 'pointer', transition: 'all 0.14s',
                }}
              >
                {val ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Photos */}
        <PhotoInput
          photos={status.personalPhotos || []}
          onChange={photos => onSet(placeId, 'personalPhotos', photos)}
        />

        {/* Notes */}
        <div>
          {fieldLabel('Notes')}
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={() => onSet(placeId, 'notes', draft)}
            placeholder="Add your personal notes, tips, memories…"
            rows={4}
            style={{
              width: '100%', boxSizing: 'border-box',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5,
              border: '1px solid var(--border)', background: 'var(--paper)',
              color: 'var(--ink)', padding: '10px 12px',
              resize: 'vertical', outline: 'none', lineHeight: 1.65,
              letterSpacing: '0.2px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Categorised nearby ────────────────────────────────────────────────────────

function NearbySection({ place }) {
  const tripId = place.tripId ?? 'japan2027'
  const nearby = useMemo(() => {
    const FOOD_CATS   = new Set(['food', 'coffee', 'cafe', 'market', 'nightlife'])
    const VIEW_CATS   = new Set(['viewpoint', 'sunrise', 'sunset', 'night-view', 'nature', 'park'])
    const PHOTO_CATS  = new Set(['photography', 'viewpoint', 'sunrise', 'sunset', 'night-view'])
    const HIDDEN_CATS = new Set(['hidden-gem', 'road-stop'])

    const candidates = resolvePlaces(allPlaces).filter(p =>
      p.id !== place.id &&
      p.city === place.city &&
      (p.tripId ?? 'japan2027') === tripId
    )
    const food    = candidates.filter(p => FOOD_CATS.has(p.category)).slice(0, 4)
    const views   = candidates.filter(p => VIEW_CATS.has(p.category) && !PHOTO_CATS.has(p.category)).slice(0, 3)
    const photo   = candidates.filter(p => PHOTO_CATS.has(p.category)).slice(0, 4)
    const hidden  = candidates.filter(p => HIDDEN_CATS.has(p.category)).slice(0, 4)
    const covered = new Set([...food, ...views, ...photo, ...hidden].map(p => p.id))
    const other   = candidates.filter(p => !covered.has(p.id)).slice(0, 4)
    return { food, views, photo, hidden, other }
  }, [place.id, place.city, tripId])

  const groups = [
    { label: 'Nearby Food & Drink',      items: nearby.food   },
    { label: 'Photography Spots Nearby', items: nearby.photo  },
    { label: 'Nearby Viewpoints',        items: nearby.views  },
    { label: 'Hidden Gems Nearby',       items: nearby.hidden },
    { label: 'More Nearby',              items: nearby.other  },
  ].filter(g => g.items.length > 0)

  if (!groups.length) return null

  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginBottom: 28 }}>
      {groups.map(group => (
        <div key={group.label} style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            {group.label}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {group.items.map(p => (
              <Link
                key={p.id}
                to={`/place/${p.id}`}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                  color: 'var(--ink2)', textDecoration: 'none',
                  border: '1px solid var(--border)', padding: '5px 12px',
                  background: 'var(--surf)', letterSpacing: '0.3px',
                  transition: 'background 0.12s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}
              >
                {p.name}
                <span style={{ marginLeft: 6, color: 'var(--ink4)', fontSize: 7.5 }}>
                  {CATEGORY_LABEL[p.category] || p.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ItinerarySection({ itinEntry, itinDay }) {
  const images = itinEntry.images || []

  return (
    <div>
      <SectionHeader label="On the Itinerary" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        {itinDay && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink3)', border: '1px solid var(--border)',
            padding: '3px 10px', letterSpacing: '0.4px',
          }}>
            {itinDay.city} · {itinDay.date}
          </span>
        )}
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink3)', border: '1px solid var(--border)',
          padding: '3px 10px', letterSpacing: '0.4px',
        }}>
          ⏰ {itinEntry.time}
        </span>
      </div>

      <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.82, marginBottom: 16 }}>
        {itinEntry.description}
      </p>

      {(itinEntry.cost || itinEntry.tip) && (
        <div style={{
          padding: '10px 14px', marginBottom: 16,
          borderLeft: '3px solid var(--border)', background: 'var(--paper)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: 'var(--ink2)', lineHeight: 1.9,
        }}>
          {itinEntry.cost && (
            <div style={{ color: 'var(--ink3)' }}>{itinEntry.cost}</div>
          )}
          {itinEntry.tip && (
            <div style={{ marginTop: itinEntry.cost ? 4 : 0 }}>
              <em>{itinEntry.tip}</em>
            </div>
          )}
        </div>
      )}

      {itinEntry.transport && (
        <div style={{
          display: 'flex', gap: 7, alignItems: 'flex-start',
          padding: '8px 0', marginBottom: 16,
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        }}>
          <span>🚃</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.55 }}>
            {itinEntry.transport}
          </span>
        </div>
      )}

      {/* Photo gallery */}
      {images.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: images.length === 1
            ? '1fr'
            : images.length === 2
            ? '1fr 1fr'
            : 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2,
        }}>
          {images.slice(0, 6).map((src, i) => (
            <div key={i} style={{
              height: images.length === 1 ? 280 : 160,
              overflow: 'hidden',
            }}>
              <img
                src={src}
                alt={`${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BasketballSection({ court }) {
  const metaItems = [
    { label: 'Surface',  value: court.surface },
    { label: 'Hoops',    value: `${court.hoops} hoops` },
    { label: 'Type',     value: court.type },
    { label: 'Hours',    value: court.hours },
    { label: 'Fee',      value: court.fee },
    { label: 'Level',    value: court.level },
    { label: 'Lighting', value: court.lighting ? 'Yes' : 'No' },
    { label: 'Pickup',   value: court.pickup ? 'Active pickup runs' : 'Solo / shooting only' },
  ].filter(item => item.value)

  return (
    <div>
      <SectionHeader label="Court Details" />

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 1, background: 'var(--border)',
        border: '1px solid var(--border)', marginBottom: 16,
      }}>
        {metaItems.map((item, i) => (
          <div key={i} style={{ background: 'var(--surf)', padding: '10px 14px' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
              marginBottom: 3,
            }}>
              {item.label}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {court.note && (
        <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.78, marginBottom: 12 }}>
          {court.note}
        </p>
      )}

      {court.dayTip && (
        <div style={{
          padding: '9px 14px',
          borderLeft: '3px solid var(--ink)',
          background: 'var(--paper)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: 'var(--ink2)', lineHeight: 1.85,
        }}>
          <em>{court.dayTip}</em>
        </div>
      )}
    </div>
  )
}

function CarSection({ carSpot, gtrNight }) {
  return (
    <div>
      <SectionHeader label="Car Culture" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink3)', border: '1px solid var(--border)',
          padding: '3px 10px', letterSpacing: '0.4px',
        }}>
          {carSpot.type === 'meet' ? 'Car Meet' : 'Street Scene'}
        </span>
        {carSpot.bestTime && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink3)', border: '1px solid var(--border)',
            padding: '3px 10px', letterSpacing: '0.4px',
          }}>
            ⏰ {carSpot.bestTime}
          </span>
        )}
        {carSpot.fee && carSpot.fee !== 'Free' && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--accent)', border: '1px solid var(--border)',
            padding: '3px 10px', letterSpacing: '0.4px',
          }}>
            {carSpot.fee}
          </span>
        )}
      </div>

      {carSpot.description && (
        <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.78, marginBottom: 12 }}>
          {carSpot.description}
        </p>
      )}

      {carSpot.cars?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: 7,
          }}>
            Cars Spotted
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {carSpot.cars.map(c => (
              <span key={c} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                color: 'var(--ink2)', border: '1px solid var(--border)',
                padding: '3px 8px',
              }}>{c}</span>
            ))}
          </div>
        </div>
      )}

      {carSpot.access && (
        <div style={{
          display: 'flex', gap: 7, alignItems: 'flex-start',
          padding: '8px 0', marginBottom: 12,
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>ACCESS</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.55 }}>
            {carSpot.access}
          </span>
        </div>
      )}

      {carSpot.tip && (
        <div style={{
          padding: '9px 14px', marginBottom: gtrNight ? 20 : 0,
          borderLeft: '3px solid var(--border)', background: 'var(--paper)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: 'var(--ink2)', lineHeight: 1.9,
        }}>
          <em>{carSpot.tip}</em>
        </div>
      )}

      {/* GTR Night Booking Block */}
      {gtrNight && (
        <div style={{
          border: '1.5px solid var(--ink)', padding: '20px',
          background: 'var(--surf)', marginTop: 4,
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            letterSpacing: '1.2px', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 8,
          }}>
            GTR Night Experience
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>
            {gtrNight.name}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 1, background: 'var(--border)',
            border: '1px solid var(--border)', marginBottom: 14,
          }}>
            {[
              { label: 'Provider',  value: gtrNight.provider },
              { label: 'Cost',      value: gtrNight.cost },
              { label: 'Duration',  value: gtrNight.duration },
              { label: 'Instagram', value: gtrNight.instagram },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--surf)', padding: '10px 12px' }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
                  color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3,
                }}>{item.label}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)', letterSpacing: '0.5px', textTransform: 'uppercase',
            marginBottom: 5,
          }}>
            Route
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.7, marginBottom: 12 }}>
            {gtrNight.route}
          </div>

          {gtrNight.includes?.length > 0 && (
            <>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                color: 'var(--ink4)', letterSpacing: '0.5px', textTransform: 'uppercase',
                marginBottom: 5,
              }}>
                Includes
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                {gtrNight.includes.map((inc, i) => (
                  <li key={i} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                    color: 'var(--ink3)', lineHeight: 1.8,
                  }}>{inc}</li>
                ))}
              </ul>
            </>
          )}

          {gtrNight.bookWindow && (
            <div style={{
              marginTop: 12, padding: '8px 12px',
              background: 'var(--paper)', border: '1px solid var(--border)',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              color: 'var(--accent)',
            }}>
              ⚠ Book Window: {gtrNight.bookWindow}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RelatedPlaces({ places }) {
  const navigate = useNavigate()
  if (!places.length) return null

  return (
    <div style={{ borderTop: '1.5px solid var(--ink)', paddingTop: 0 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        letterSpacing: '1.2px', textTransform: 'uppercase',
        color: 'var(--ink4)', padding: '12px 52px 8px',
        borderBottom: '1px solid var(--border)',
      }}>
        More in {places[0]?.city}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 1, background: 'var(--border)',
      }}>
        {places.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/place/${p.id}`)}
            style={{
              background: 'var(--surf)', cursor: 'pointer',
              transition: 'background 0.14s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}
          >
            {(p.heroImage || p.image) ? (
              <div style={{ height: 130, overflow: 'hidden' }}>
                <img src={p.heroImage || p.image} alt={p.name} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ) : (
              <div style={{ height: 56, background: 'var(--paper)' }} />
            )}
            <div style={{ padding: '10px 14px 14px' }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                color: 'var(--accent)', letterSpacing: '0.7px', textTransform: 'uppercase',
                marginBottom: 3,
              }}>
                {CATEGORY_LABEL[p.category] || p.category}
                {p.tripDay && <span style={{ color: 'var(--ink4)' }}> · Day {p.tripDay}</span>}
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
                {p.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 404 ──────────────────────────────────────────────────────────────────────

function NotFound({ id }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 52px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 72,
        fontWeight: 300, color: 'var(--ink4)', lineHeight: 1,
        marginBottom: 16,
      }}>404</div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
        color: 'var(--ink3)', marginBottom: 6,
      }}>
        Place not found
      </div>
      {id && (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: 'var(--ink4)', marginBottom: 28,
        }}>
          id: {id}
        </div>
      )}
      <Link
        to="/places"
        style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          letterSpacing: '0.8px', textTransform: 'uppercase',
          color: 'var(--ink)', textDecoration: 'none',
          border: '1.5px solid var(--ink)', padding: '9px 20px',
          display: 'inline-block',
        }}
      >
        ← Back to Places
      </Link>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PlaceDetailPage() {
  const { id } = useParams()
  const { get, toggle, set } = usePlaceStatus()

  const place = useMemo(() => resolvePlace(placeMapById[id]), [id])

  const { itinEntry, itinDay, bbCourt, carSpot, gtrNight } = useEnrichment(place)

  const related = useMemo(() => getRelated(place), [place?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!place) return <NotFound id={id} />

  const status = get(place.id)

  return (
    <div className="page-enter">
      <PlaceHero place={place} />

      {/* Actions + Info strip */}
      <div style={{
        borderBottom: '1.5px solid var(--ink)',
        background: 'var(--surf)',
      }}>
        <div style={{ padding: '16px 52px' }}>
          <PlaceActions place={place} status={status} onToggle={toggle} />
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '32px 52px', maxWidth: 800 }}>

        {/* Tags */}
        {place.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 20 }}>
            {place.tags.map(t => (
              <span key={t} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                color: 'var(--ink4)', border: '1px solid var(--border)',
                padding: '2px 8px', letterSpacing: '0.3px',
              }}>{t}</span>
            ))}
          </div>
        )}

        {/* Place description */}
        <p style={{
          fontSize: 15, color: 'var(--ink)', lineHeight: 1.85,
          marginBottom: 24, fontWeight: 400,
        }}>
          {place.description}
        </p>

        {/* Gallery: shows personal photos when present, falls back to stock */}
        <GallerySection images={place.gallery} personalPhotos={status.personalPhotos} />

        {/* Info metadata */}
        <div style={{ marginBottom: 28 }}>
          <PlaceInfo place={place} />
        </div>

        {/* Weather / season */}
        <WeatherSection place={place} />

        {/* Divider before enrichment sections */}
        {(itinEntry || bbCourt || carSpot) && (
          <div style={{ borderTop: '1px solid var(--border)', marginBottom: 28 }} />
        )}

        {/* Itinerary narrative */}
        {itinEntry && (
          <div style={{ marginBottom: 32 }}>
            <ItinerarySection itinEntry={itinEntry} itinDay={itinDay} />
          </div>
        )}

        {/* Basketball detail */}
        {bbCourt && (
          <div style={{ marginBottom: 32 }}>
            <BasketballSection court={bbCourt} />
          </div>
        )}

        {/* Car culture detail */}
        {carSpot && (
          <div style={{ marginBottom: 28 }}>
            <CarSection carSpot={carSpot} gtrNight={gtrNight} />
          </div>
        )}

        {/* Nearby places by category */}
        <NearbySection place={place} />

        {/* Personal notes & status */}
        <PersonalSection
          placeId={place.id}
          status={status}
          onToggle={toggle}
          onSet={set}
        />
      </div>

      {/* Related places grid */}
      {related.length > 0 && <RelatedPlaces places={related} />}
    </div>
  )
}
