import { useMemo } from 'react'
import { useTravel } from '../context/TravelContext'
import {
  resolveContentBookings, resolvePackingNotes, resolveGiftIdeas,
} from '../services/contentResolver/index'

// Returns useTravel()'s `content` (ARC_CONTENT for the active arc) with CMS
// overrides applied to the three fields Admin Studio can edit at arc scope:
// bookings, packingNotes, giftIdeas. Every other field (stays, itinerary,
// map, transport, currencies, ...) passes through unchanged — there is no
// CMS domain for them yet (see Phase 3 technical-debt notes).
//
// Pages should call this instead of destructuring `content` from
// useTravel() directly, so CMS-override behavior lives in one place.
export function useResolvedContent() {
  const { content, activeYear } = useTravel()

  return useMemo(() => {
    if (!content) return content
    return {
      ...content,
      bookings:     resolveContentBookings(activeYear, content.bookings),
      packingNotes: resolvePackingNotes(activeYear, content.packingNotes),
      giftIdeas:    resolveGiftIdeas(activeYear, content.giftIdeas),
    }
  }, [content, activeYear])
}
