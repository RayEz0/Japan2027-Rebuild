import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { useAuth } from './AuthContext'
import { useTravel } from './TravelContext'
import { scopedGlobalKey, migrateGlobalToScopedKey } from '../utils/storage'

const LEGACY_KEY = 'wtjournal_v1'

function uid() {
  return `j_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function load(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key))
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

function persist(key, entries) {
  try { localStorage.setItem(key, JSON.stringify(entries)) } catch { /* intentional */ }
}

// ── Schema ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const MOODS = [
  { id: 'amazing', label: 'Amazing', emoji: '🤩' },
  { id: 'great',   label: 'Great',   emoji: '😄' },
  { id: 'good',    label: 'Good',    emoji: '🙂' },
  { id: 'okay',    label: 'Okay',    emoji: '😐' },
  { id: 'tough',   label: 'Tough',   emoji: '😔' },
]

// eslint-disable-next-line react-refresh/only-export-components
export const WEATHER_OPTS = [
  { id: 'sunny',  label: 'Sunny',  emoji: '☀️' },
  { id: 'cloudy', label: 'Cloudy', emoji: '⛅' },
  { id: 'rainy',  label: 'Rainy',  emoji: '🌧' },
  { id: 'stormy', label: 'Stormy', emoji: '⛈' },
  { id: 'snowy',  label: 'Snowy',  emoji: '❄️' },
  { id: 'windy',  label: 'Windy',  emoji: '💨' },
  { id: 'hot',    label: 'Hot',    emoji: '🌡' },
  { id: 'misty',  label: 'Misty',  emoji: '🌫' },
]

// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_ENTRY = {
  id:          '',
  tripId:      '',
  arcYear:     null,
  placeId:     '',
  country:     '',
  city:        '',
  date:        '',
  title:       '',
  mood:        '',
  weather:     '',
  notes:       '',
  highlights:  [],
  companions:  [],
  tags:        [],
  photos:      [],     // [{ id, url, caption, favourite, location, cameraNotes }]
  favourite:   false,
  createdAt:   '',
  updatedAt:   '',
}

function rowToEntry(r) {
  return {
    id: r.id, tripId: r.trip_id, arcYear: r.arc_year, placeId: r.place_id || '',
    country: r.country || '', city: r.city || '', date: r.entry_date || '',
    title: r.title || '', mood: r.mood || '', weather: r.weather || '',
    notes: r.notes || '', highlights: r.highlights || [], companions: r.companions || [],
    tags: r.tags || [], photos: r.photos || [], favourite: r.favourite || false,
    createdAt: r.created_at, updatedAt: r.updated_at,
  }
}

function entryToRow(userId, e) {
  return {
    id: e.id, user_id: userId, trip_id: e.tripId || 'japan2027', arc_year: e.arcYear,
    place_id: e.placeId || '', country: e.country || '', city: e.city || '',
    entry_date: e.date || '', title: e.title || '', mood: e.mood || '', weather: e.weather || '',
    notes: e.notes || '', highlights: e.highlights || [], companions: e.companions || [],
    tags: e.tags || [], photos: e.photos || [], favourite: e.favourite || false,
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
//
// Journal is intentionally trip-agnostic in the UI — it's one continuous
// "memories" log across the whole traveller's journey, and every entry
// already self-tags with tripId/arcYear. Only the storage key is user-scoped
// (wt:<userId|guest>:global:journal) to stop entries leaking between accounts;
// entries are never filtered by the currently active trip.

const JournalContext = createContext(null)

export function JournalProvider({ children }) {
  const { user, supabase } = useAuth()
  const { activeTrip: trip, activeYear } = useTravel()

  const storageKey = scopedGlobalKey(user?.id, 'journal')
  const [entries, setEntries] = useState(() => {
    migrateGlobalToScopedKey(LEGACY_KEY, 'journal')
    return load(storageKey)
  })

  // Reload local data when the signed-in user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setEntries(load(storageKey))
  }, [storageKey])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('journal')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data) return
        if (data.length > 0) {
          const loaded = data.map(rowToEntry)
          setEntries(loaded)
          persist(storageKey, loaded)
        } else {
          const local = load(storageKey)
          if (local.length > 0) {
            supabase.from('journal').insert(local.map(e => entryToRow(user.id, e))).then(() => {})
          }
        }
      })
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const create = useCallback((data) => {
    const now = new Date().toISOString()
    const entry = {
      ...DEFAULT_ENTRY, ...data, id: uid(),
      tripId: data.tripId || trip?.id || 'japan2027',
      arcYear: data.arcYear ?? activeYear,
      createdAt: now, updatedAt: now,
    }
    setEntries(prev => {
      const next = [entry, ...prev]
      persist(storageKey, next)
      return next
    })
    if (user && supabase) {
      supabase.from('journal').insert(entryToRow(user.id, entry)).then(() => {})
    }
    return entry.id
  }, [storageKey, user, supabase, trip, activeYear])

  const update = useCallback((id, patch) => {
    setEntries(prev => {
      const next = prev.map(e =>
        e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e
      )
      persist(storageKey, next)
      if (user && supabase) {
        const updated = next.find(e => e.id === id)
        if (updated) supabase.from('journal').upsert(entryToRow(user.id, updated)).then(() => {})
      }
      return next
    })
  }, [storageKey, user, supabase])

  const remove = useCallback((id) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id)
      persist(storageKey, next)
      return next
    })
    if (user && supabase) {
      supabase.from('journal').delete().eq('id', id).eq('user_id', user.id).then(() => {})
    }
  }, [storageKey, user, supabase])

  return (
    <JournalContext.Provider value={{ entries, create, update, remove }}>
      {children}
    </JournalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useJournal() {
  const ctx = useContext(JournalContext)
  if (!ctx) throw new Error('useJournal must be used inside JournalProvider')
  return ctx
}
