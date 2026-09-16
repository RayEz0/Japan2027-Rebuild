import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { tripStorageKey, scopedStorageKey, migrateToScopedKey } from '../utils/storage'
import { DAYS } from '../data/trips/japan2027/itinerary'
import { ITINERARY_NAME_MAP } from '../data/places/index'

const LEGACY_KEY     = 'jp27_places_v1'
const LEGACY_FLAG    = 'jp27_places_migrated_v2'
const DEFAULT        = {
  wantToVisit:     false,
  booked:          false,
  visited:         false,
  planned:         false,
  skipped:         false,
  favourite:       false,
  rating:          0,
  wouldVisitAgain: null,
  dateVisited:     '',
  actualDuration:  '',
  actualCost:      '',
  visitWeather:    '',
  favouriteMemory: '',
  personalPhotos:  [],   // [{ id, url, caption }]
  notes:           '',
  priority:        '',
}

function loadLocal(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {} } catch { return {} }
}
function saveLocal(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* intentional */ }
}

// ── One-time migration: day_index keys → place.id keys ───────────────────────
//
// Before Phase 8D the Itinerary page keyed place status as "${day.num}_${pi}"
// (e.g. "01_0"). After 8D the Itinerary uses place.id (e.g. "tokyo-shinjuku-area").
// This migration runs once per tripId and converts any legacy keys in storage.
// Keys with no matching place.id (optional/unmapped places) are kept as-is.
// Only applies to japan2027 — other trips start clean.

function buildLegacyKeyMap() {
  // Returns { '01_0': 'tokyo-shinjuku-area', '01_1': 'tokyo-omoide-yokocho', ... }
  const map = {}
  for (const day of DAYS) {
    day.places.forEach((p, pi) => {
      const placeId = ITINERARY_NAME_MAP[p.name]
      if (placeId) map[`${day.num}_${pi}`] = placeId
    })
  }
  return map
}

function migrateIfNeeded(tripId, localKey) {
  if (tripId !== 'japan2027') return
  try {
    const migratedFlag = `${tripId}_places_migrated_v2`
    // Also accept the original legacy flag (pre-Phase 11) as done
    if (localStorage.getItem(migratedFlag) || localStorage.getItem(LEGACY_FLAG)) {
      // Phase 8D migration already ran under legacy key — copy to scoped key if needed
      if (!localStorage.getItem(localKey)) {
        const legacyData = localStorage.getItem(LEGACY_KEY)
        if (legacyData) localStorage.setItem(localKey, legacyData)
      }
      localStorage.setItem(migratedFlag, '1')
      return
    }

    // First ever migration: run day_index → place.id conversion on the legacy key
    const raw = localStorage.getItem(LEGACY_KEY)
    if (!raw) { localStorage.setItem(migratedFlag, '1'); return }

    const oldData   = JSON.parse(raw) || {}
    const legacyMap = buildLegacyKeyMap()
    const newData   = {}

    for (const [key, value] of Object.entries(oldData)) {
      const newKey = legacyMap[key] || key
      if (newData[newKey]) {
        newData[newKey] = {
          wantToVisit: newData[newKey].wantToVisit || value.wantToVisit,
          booked:      newData[newKey].booked      || value.booked,
          visited:     newData[newKey].visited     || value.visited,
          notes:       newData[newKey].notes       || value.notes || '',
          priority:    newData[newKey].priority    || value.priority || '',
        }
      } else {
        newData[newKey] = value
      }
    }

    // Write to both legacy and new scoped key so rollback still works
    localStorage.setItem(LEGACY_KEY,  JSON.stringify(newData))
    localStorage.setItem(localKey,    JSON.stringify(newData))
    localStorage.setItem(LEGACY_FLAG, '1')
    localStorage.setItem(migratedFlag, '1')
  } catch { /* intentional */ }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export const PRIORITIES = [
  { id: 'must',  label: 'Must Do',      color: 'var(--accent)' },
  { id: 'nice',  label: 'Nice To Have', color: 'var(--ink2)'   },
  { id: 'maybe', label: 'Maybe',        color: 'var(--ink4)'   },
]

function toDbRow(userId, tripId, placeKey, entry) {
  return {
    user_id:  userId,
    trip_id:  tripId,
    place_id: placeKey,           // migration 002 renamed place_key → place_id
    want:     entry.wantToVisit || false,  // migration 002 renamed want_to_visit → want
    booked:   entry.booked      || false,
    visited:  entry.visited     || false,
    notes:    entry.notes       || '',
    priority: entry.priority    || '',
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function usePlaceStatus() {
  const { user, supabase } = useAuth()
  const { activeTrip: trip } = useTravel()
  const tripId   = trip?.id || 'japan2027'
  const localKey = useMemo(() => {
    const legacyKey = tripStorageKey(tripId, 'places')
    migrateIfNeeded(tripId, legacyKey)
    migrateToScopedKey(tripId, 'places')
    return scopedStorageKey(user?.id, tripId, 'places')
  }, [tripId, user?.id])

  const [data, setData] = useState(() => loadLocal(localKey))

  // Reload when the active trip or user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setData(loadLocal(localKey))
  }, [localKey])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('place_status')
      .select('*')
      .eq('user_id', user.id)
      .eq('trip_id', tripId)
      .then(({ data: rows, error }) => {
        if (error || !rows) return
        if (rows.length > 0) {
          const loaded = {}
          for (const r of rows) {
            // Compat: post-migration 002 uses place_id/want; pre-migration uses place_key/want_to_visit
            const key = r.place_id ?? r.place_key
            if (!key) continue
            loaded[key] = {
              wantToVisit: r.want ?? r.want_to_visit ?? false,
              booked:      r.booked   ?? false,
              visited:     r.visited  ?? false,
              notes:       r.notes    ?? '',
              priority:    r.priority ?? '',
            }
          }
          setData(loaded)
          saveLocal(localKey, loaded)
        } else {
          const local = loadLocal(localKey)
          const localEntries = Object.entries(local)
          if (localEntries.length > 0) {
            const upsertRows = localEntries.map(([k, v]) => toDbRow(user.id, tripId, k, v))
            supabase.from('place_status').upsert(upsertRows, { onConflict: 'user_id,place_id' }).then(() => {})
          }
        }
      })
  }, [user?.id, tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  const persist = (next) => { saveLocal(localKey, next); return next }

  const get = (key) => ({ ...DEFAULT, ...data[key] })

  const toggle = (key, field) => {
    setData(prev => {
      const cur   = { ...DEFAULT, ...prev[key] }
      const entry = { ...cur, [field]: !cur[field] }
      const next  = persist({ ...prev, [key]: entry })
      if (user && supabase) {
        supabase.from('place_status').upsert(toDbRow(user.id, tripId, key, entry), { onConflict: 'user_id,place_id' }).then(() => {})
      }
      return next
    })
  }

  const set = (key, field, val) => {
    setData(prev => {
      const cur   = { ...DEFAULT, ...prev[key] }
      const entry = { ...cur, [field]: val }
      const next  = persist({ ...prev, [key]: entry })
      if (user && supabase) {
        supabase.from('place_status').upsert(toDbRow(user.id, tripId, key, entry), { onConflict: 'user_id,place_id' }).then(() => {})
      }
      return next
    })
  }

  const totals = Object.values(data).reduce((acc, v) => {
    if (v.wantToVisit) acc.want++
    if (v.booked)      acc.booked++
    if (v.visited)     acc.visited++
    if (v.planned)     acc.planned++
    if (v.skipped)     acc.skipped++
    if (v.favourite)   acc.favourite++
    return acc
  }, { want: 0, booked: 0, visited: 0, planned: 0, skipped: 0, favourite: 0 })

  return { get, toggle, set, totals }
}

// ── Exported key resolver — use this everywhere a place key is needed ─────────
//
// Priority: place.id via ITINERARY_NAME_MAP → legacy fallback "${dayNum}_${pi}"
// The legacy fallback covers optional/unmapped itinerary places only.

export function resolvePlaceKey(dayNum, place, placeIndex) {
  return ITINERARY_NAME_MAP[place.name] || `${dayNum}_${placeIndex}`
}
