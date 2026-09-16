import { createContext, useState, useEffect } from 'react'
import { useTravel, STORAGE_KEY, deriveArcForTrip } from './TravelContext'
import { TRIPS } from '../data/trips/index'

// ── Shape ──────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const EMPTY_TRIP_DATA = {
  days: [], totalPlaces: 0,
  budgetItems: [], budgetTotal: { min: 0, max: 0 },
  budgetCategories: {}, plannedByCategory: {},
  stays: [], packingCategories: [], totalItems: 0, bookingItems: [],
}

// ── Cache ──────────────────────────────────────────────────────────────────────

const pending  = {}  // tripId -> Promise
const resolved = {}  // tripId -> data

async function fetchTripData(tripId) {
  if (tripId === 'japan2027') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/japan2027/itinerary'),
      import('../data/trips/japan2027/budget'),
      import('../data/trips/japan2027/stays'),
      import('../data/trips/japan2027/packing'),
      import('../data/trips/japan2027/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'scotland') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/scotland/itinerary'),
      import('../data/trips/scotland/budget'),
      import('../data/trips/scotland/stays'),
      import('../data/trips/scotland/packing'),
      import('../data/trips/scotland/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'norway2028') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/norway2028/itinerary'),
      import('../data/trips/norway2028/budget'),
      import('../data/trips/norway2028/stays'),
      import('../data/trips/norway2028/packing'),
      import('../data/trips/norway2028/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'korea') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/korea/itinerary'),
      import('../data/trips/korea/budget'),
      import('../data/trips/korea/stays'),
      import('../data/trips/korea/packing'),
      import('../data/trips/korea/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'italy') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/italy/itinerary'),
      import('../data/trips/italy/budget'),
      import('../data/trips/italy/stays'),
      import('../data/trips/italy/packing'),
      import('../data/trips/italy/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'greece') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/greece/itinerary'),
      import('../data/trips/greece/budget'),
      import('../data/trips/greece/stays'),
      import('../data/trips/greece/packing'),
      import('../data/trips/greece/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'france') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/france/itinerary'),
      import('../data/trips/france/budget'),
      import('../data/trips/france/stays'),
      import('../data/trips/france/packing'),
      import('../data/trips/france/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'china') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/china/itinerary'),
      import('../data/trips/china/budget'),
      import('../data/trips/china/stays'),
      import('../data/trips/china/packing'),
      import('../data/trips/china/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'newzealand') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/newzealand/itinerary'),
      import('../data/trips/newzealand/budget'),
      import('../data/trips/newzealand/stays'),
      import('../data/trips/newzealand/packing'),
      import('../data/trips/newzealand/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'sweden') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/sweden/itinerary'),
      import('../data/trips/sweden/budget'),
      import('../data/trips/sweden/stays'),
      import('../data/trips/sweden/packing'),
      import('../data/trips/sweden/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'germany') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/germany/itinerary'),
      import('../data/trips/germany/budget'),
      import('../data/trips/germany/stays'),
      import('../data/trips/germany/packing'),
      import('../data/trips/germany/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'japan2030') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/japan2030/itinerary'),
      import('../data/trips/japan2030/budget'),
      import('../data/trips/japan2030/stays'),
      import('../data/trips/japan2030/packing'),
      import('../data/trips/japan2030/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'thailand') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/thailand/itinerary'),
      import('../data/trips/thailand/budget'),
      import('../data/trips/thailand/stays'),
      import('../data/trips/thailand/packing'),
      import('../data/trips/thailand/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'switzerland') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/switzerland/itinerary'),
      import('../data/trips/switzerland/budget'),
      import('../data/trips/switzerland/stays'),
      import('../data/trips/switzerland/packing'),
      import('../data/trips/switzerland/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'usa') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/usa/itinerary'),
      import('../data/trips/usa/budget'),
      import('../data/trips/usa/stays'),
      import('../data/trips/usa/packing'),
      import('../data/trips/usa/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  if (tripId === 'portugal') {
    const [itin, bud, stays, pack, booking] = await Promise.all([
      import('../data/trips/portugal/itinerary'),
      import('../data/trips/portugal/budget'),
      import('../data/trips/portugal/stays'),
      import('../data/trips/portugal/packing'),
      import('../data/trips/portugal/bookingRoadmap'),
    ])
    return {
      days: itin.DAYS, totalPlaces: itin.TOTAL_PLACES,
      budgetItems: bud.BUDGET_ITEMS, budgetTotal: bud.BUDGET_TOTAL,
      budgetCategories: bud.BUDGET_CATEGORIES, plannedByCategory: bud.PLANNED_BY_CATEGORY,
      stays: stays.STAYS,
      packingCategories: pack.PACKING_CATEGORIES, totalItems: pack.TOTAL_ITEMS,
      bookingItems: booking.BOOKING_ITEMS,
    }
  }
  return EMPTY_TRIP_DATA
}

// eslint-disable-next-line react-refresh/only-export-components
export function loadTripData(tripId) {
  if (!pending[tripId]) {
    pending[tripId] = fetchTripData(tripId).then(data => {
      resolved[tripId] = data
      return data
    })
  }
  return pending[tripId]
}

// Synchronous accessor for a single trip's raw bundled data (pre-merge,
// pre-CMS-resolution). Used by useTripData() to apply CMS overrides per
// individual tripId before days/budgetItems are flattened across an arc's
// trips — resolving after the flatten would risk two trips' items colliding
// on the same day-number/id. Returns null until that trip's data has
// resolved (always true by the time TripDataCtx's value is non-empty).
// eslint-disable-next-line react-refresh/only-export-components
export function getRawTripData(tripId) {
  return resolved[tripId] || null
}

// ── Multi-trip merge ───────────────────────────────────────────────────────────
// Merges data from all trips in an arc. Packing categories with the same id
// are merged (items deduplicated by id); all other arrays are concatenated.

function mergeData(dataList) {
  const list = dataList.filter(Boolean)
  if (list.length === 0) return EMPTY_TRIP_DATA
  if (list.length === 1) return list[0]

  const packingMap = {}
  for (const d of list) {
    for (const cat of (d.packingCategories || [])) {
      if (!packingMap[cat.id]) {
        packingMap[cat.id] = { ...cat, items: [...cat.items] }
      } else {
        const seen = new Set(packingMap[cat.id].items.map(i => i.id))
        for (const item of cat.items) {
          if (!seen.has(item.id)) packingMap[cat.id].items.push(item)
        }
      }
    }
  }
  const mergedPacking = Object.values(packingMap)

  return {
    days:         list.flatMap(d => d.days || []),
    totalPlaces:  list.reduce((s, d) => s + (d.totalPlaces || 0), 0),
    budgetItems:  list.flatMap(d => d.budgetItems || []),
    budgetTotal: {
      min: list.reduce((s, d) => s + (d.budgetTotal?.min || 0), 0),
      max: list.reduce((s, d) => s + (d.budgetTotal?.max || 0), 0),
    },
    budgetCategories:  list.reduce((acc, d) => ({ ...acc, ...(d.budgetCategories  || {}) }), {}),
    plannedByCategory: list.reduce((acc, d) => ({ ...acc, ...(d.plannedByCategory || {}) }), {}),
    stays:        list.flatMap(d => d.stays || []),
    packingCategories: mergedPacking,
    totalItems:   mergedPacking.reduce((s, c) => s + c.items.length, 0),
    bookingItems: list.flatMap(d => d.bookingItems || []),
  }
}

// ── Pre-warm ───────────────────────────────────────────────────────────────────
// Start loading the persisted trip's arc before React renders.

if (typeof window !== 'undefined') {
  const savedTripId    = localStorage.getItem(STORAGE_KEY)
  const resolvedTripId = (savedTripId && TRIPS[savedTripId]) ? savedTripId : 'japan2027'
  const savedArc       = deriveArcForTrip(resolvedTripId)
  // Standalone trips (no arc, e.g. Thailand) have no tripIds to iterate —
  // just pre-warm the trip itself.
  for (const id of savedArc?.tripIds || [resolvedTripId]) loadTripData(id)
}

// ── Context ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const TripDataCtx = createContext(EMPTY_TRIP_DATA)

export function TripDataProvider({ children }) {
  const { activeArc: arc } = useTravel()
  const tripIds    = arc?.tripIds || ['japan2027']
  const tripIdsKey = tripIds.join(',')

  // Seed from cache synchronously so pre-warmed arcs show data immediately
  const [data, setData] = useState(() => {
    const cached = tripIds.map(id => resolved[id]).filter(Boolean)
    return cached.length === tripIds.length ? mergeData(cached) : EMPTY_TRIP_DATA
  })

  useEffect(() => {
    // If all trips already resolved (pre-warm hit), just merge synchronously
    const allCached = tripIds.every(id => resolved[id])
    if (allCached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(mergeData(tripIds.map(id => resolved[id])))
      return
    }

    let cancelled = false
    Promise.all(tripIds.map(id => loadTripData(id))).then(dataList => {
      if (!cancelled) setData(mergeData(dataList))
    })
    return () => { cancelled = true }
  }, [tripIdsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TripDataCtx.Provider value={data}>
      {children}
    </TripDataCtx.Provider>
  )
}
