import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { TRIPS, TRIP_LIST } from '../data/trips/index'
import { ARCS } from '../data/worldTour/arcs'
import { ARC_CONTENT } from '../data/arcs/index'

// ── Single source of truth ──────────────────────────────────────────────────────
// activeTripId is the only piece of mutable navigation state in the app.
// Every other piece of "what's currently active" info (arc, year, country,
// theme, arc-level content, the active trip itself) is derived from it below,
// so it is structurally impossible for these to desync from one another.

export const STORAGE_KEY = 'worldtour_active_trip'

// Shared so TripDataContext's module-level pre-warm can derive the same arc
// without importing this file's React internals.
//
// Returns null for a trip that isn't part of any arc (e.g. a standalone trip
// like Thailand) rather than falling back to ARCS[0] — falling back to
// Japan's arc used to leak Japan's ARC_CONTENT (bookings/packing/currencies/
// map/theme/budgetRange) onto whichever standalone trip was actually active.
// Every consumer of activeArc already guards on `if (!arc) ...` (see
// useExpenses/TravelMap/MapPage), so null propagates safely.
// eslint-disable-next-line react-refresh/only-export-components
export function deriveArcForTrip(tripId) {
  return ARCS.find(a => a.tripIds?.includes(tripId)) || null
}

const TravelCtx = createContext({
  activeTripId: 'japan2027',
  activeTrip: null,
  activeArc: null,
  activeYear: null,
  activeCountry: null,
  theme: null,
  content: null,
  primaryTrip: null,
  pendingTransition: null,
  allTrips: [],
  setTrip: () => {},
  selectArc: () => {},
  commitTransition: () => {},
  // Back-compat aliases (previously two separate contexts)
  trip: null,
  arc: null,
})

export function TravelProvider({ children }) {
  const [activeTripId, setActiveTripIdState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return (saved && TRIPS[saved]) ? saved : 'japan2027'
  })
  const [pendingTransition, setPendingTransition] = useState(null)

  const activeTrip     = TRIPS[activeTripId] || TRIPS.japan2027
  const activeArc      = useMemo(() => deriveArcForTrip(activeTripId), [activeTripId])
  const activeYear     = activeArc?.year ?? null
  const activeCountry  = activeTrip?.country ?? null
  const theme          = activeArc?.theme ?? null
  const content        = ARC_CONTENT[activeYear] || null
  // `primaryTrip` means "the trip currently being displayed" — it must always
  // be the active trip itself, never the arc's first trip. (It used to be
  // derived from activeArc.tripIds[0], which silently showed e.g. Scotland's
  // hero/stats/status while Norway was the actual active trip in a multi-trip
  // arc — see Phase 5.5.)
  const primaryTrip    = activeTrip

  // Apply the active arc's theme to CSS variables.
  useEffect(() => {
    if (!theme) return
    const root = document.documentElement
    if (theme.accent)      root.style.setProperty('--accent',       theme.accent)
    if (theme.accentLight) root.style.setProperty('--accent-light', theme.accentLight)
    if (theme.accentBg)    root.style.setProperty('--accent-bg',    theme.accentBg)
  }, [activeYear]) // eslint-disable-line react-hooks/exhaustive-deps

  // Direct, immediate switch to a specific trip (no cinematic overlay).
  // Used by WorldTourDestination's "make this the active trip" action.
  const setTrip = useCallback((tripId) => {
    if (!TRIPS[tripId]) return
    localStorage.setItem(STORAGE_KEY, tripId)
    setActiveTripIdState(tripId)
  }, [])

  // Arc-level switch: queues the cinematic overlay. The overlay calls
  // commitTransition once its animation finishes — activeTripId does not
  // change until then, so mid-transition nothing can observe a torn state.
  const selectArc = useCallback((year) => {
    if (year === activeYear) return
    const target = ARCS.find(a => a.year === year)
    if (!target) return
    setPendingTransition(target)
  }, [activeYear])

  // Called by ArcTransitionOverlay after the animation finishes.
  const commitTransition = useCallback((year) => {
    const target = ARCS.find(a => a.year === year)
    const nextTripId = target?.tripIds?.[0]
    if (nextTripId) {
      localStorage.setItem(STORAGE_KEY, nextTripId)
      setActiveTripIdState(nextTripId)
    }
    setPendingTransition(null)
  }, [])

  const ctxValue = useMemo(() => ({
    activeTripId, activeTrip, activeArc, activeYear, activeCountry, theme,
    content, primaryTrip, pendingTransition, allTrips: TRIP_LIST,
    setTrip, selectArc, commitTransition,
    // Back-compat aliases so every existing call site keeps its established
    // local variable name (e.g. `const { activeTrip: trip } = useTravel()`).
    trip: activeTrip, arc: activeArc,
  }), [activeTripId, activeTrip, activeArc, activeYear, activeCountry, theme,
       content, primaryTrip, pendingTransition, setTrip, selectArc, commitTransition])

  return (
    <TravelCtx.Provider value={ctxValue}>
      {children}
    </TravelCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTravel() {
  return useContext(TravelCtx)
}
