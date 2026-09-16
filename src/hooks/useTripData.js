import { useContext, useMemo } from 'react'
import { TripDataCtx, getRawTripData } from '../context/TripDataContext'
import { useTravel } from '../context/TravelContext'
import { resolveItineraryDays, resolveBudgetItems } from '../services/contentResolver/index'

// Applies CMS itinerary/budget overrides on top of the bundled data already
// merged by TripDataContext. This is a plain useMemo scoped to whichever
// page component calls useTripData() — since every live page fully
// unmounts when navigating to Admin Studio and remounts on the way back,
// this naturally re-reads the CMS on the next mount (see contentResolver
// module doc for why no cache-invalidation plumbing is needed).
export function useTripData() {
  const ctx = useContext(TripDataCtx)
  const { activeArc: arc } = useTravel()
  const tripIds    = arc?.tripIds || ['japan2027']
  const tripIdsKey = tripIds.join(',')

  return useMemo(() => {
    // Resolve CMS overrides per individual trip, before flattening across
    // an arc's trips — matching on the flattened array would risk two
    // trips' days/budget items colliding on the same day-number/id.
    const rawSlices = tripIds.map(id => getRawTripData(id))
    if (rawSlices.some(s => !s)) return ctx // not all loaded yet

    const days        = tripIds.flatMap((id, i) => resolveItineraryDays(id, rawSlices[i].days || []))
    const budgetItems  = tripIds.flatMap((id, i) => resolveBudgetItems(id, rawSlices[i].budgetItems || []))

    return { ...ctx, days, budgetItems }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, tripIdsKey])
}
