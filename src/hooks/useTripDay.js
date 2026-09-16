import { useState, useEffect, useMemo } from 'react'
import { useTravel } from '../context/TravelContext'
import { getRawTripData, loadTripData } from '../context/TripDataContext'
import { resolveItineraryDays } from '../services/contentResolver/index'

/**
 * Shared "what day of the trip is it right now" resolver for Travel Mode.
 * Scoped to the single active trip (not the whole arc) — Travel Mode is
 * meant to answer "where am I today, on the trip I'm actually on."
 *
 * Returns one of:
 *   { phase: 'loading' }                                   — itinerary not resolved yet
 *   { phase: 'unknown', days }                              — trip has no departure/return dates
 *   { phase: 'pre',  daysUntilTrip, days }                  — before departure
 *   { phase: 'post', daysAfterTrip, days }                  — after return
 *   { phase: 'active', day, dayIndex, dayNumber, days }     — mid-trip
 */
export function useTripDay() {
  const { activeTrip } = useTravel()
  const tripId = activeTrip?.id || 'japan2027'

  const [rawDays, setRawDays] = useState(() => getRawTripData(tripId)?.days ?? null)

  useEffect(() => {
    const cached = getRawTripData(tripId)
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRawDays(cached.days || [])
      return
    }
    setRawDays(null)
    let cancelled = false
    loadTripData(tripId).then(data => {
      if (!cancelled) setRawDays(data.days || [])
    })
    return () => { cancelled = true }
  }, [tripId])

  return useMemo(() => {
    if (rawDays == null) return { phase: 'loading', days: [] }

    const days = resolveItineraryDays(tripId, rawDays)
    const departure  = activeTrip?.departure ? new Date(activeTrip.departure) : null
    const returnDate = activeTrip?.return_   ? new Date(activeTrip.return_)   : null

    if (!departure || !returnDate || isNaN(departure) || isNaN(returnDate) || days.length === 0) {
      return { phase: 'unknown', days, activeTrip }
    }

    const now = new Date()
    const msSinceDepart = now - departure
    const dayIndex      = Math.floor(msSinceDepart / 86400000)
    const daysUntilTrip = Math.ceil((departure - now) / 86400000)
    const daysAfterTrip = Math.ceil((now - returnDate) / 86400000)

    if (msSinceDepart < 0)        return { phase: 'pre',  daysUntilTrip, days, activeTrip }
    if (dayIndex >= days.length)  return { phase: 'post', daysAfterTrip, days, activeTrip }
    return { phase: 'active', dayIndex, day: days[dayIndex], dayNumber: dayIndex + 1, days, activeTrip }
  }, [tripId, rawDays, activeTrip])
}
