/**
 * Scotland 2028 — Booking Roadmap
 * Canonical list of booking tasks with their time windows.
 * Status (done/active/upcoming) is computed at runtime based on today's date.
 */

export const BOOKING_ITEMS = [
  {
    id:       'uk-eta',
    label:    'Apply for UK ETA (Electronic Travel Authorisation)',
    category: 'document',
    window:   { start: '2028-01', end: '2028-02' },
    priority: 'critical',
    notes:    'Indian passport holders require UK ETA (£10). Apply via UK Visas & Immigration. Required before departure.',
  },
  {
    id:       'flights',
    label:    'Book Flights — BLR → Edinburgh (EDI)',
    category: 'transport',
    window:   { start: '2028-01', end: '2028-03' },
    priority: 'critical',
    notes:    'Aim for indirect via LHR or AMS. Outbound Oct 15, return Oct 22. Book early for Oct school holiday prices.',
  },
  {
    id:       'car-hire',
    label:    'Car Hire — Edinburgh Airport, 8 days',
    category: 'transport',
    window:   { start: '2028-04', end: '2028-05' },
    priority: 'critical',
    notes:    'Auto or manual. Enterprise / Arnold Clark. Pickup EDI Airport Oct 15, drop EDI Airport Oct 22. Verify IDP requirement.',
  },
  {
    id:       'accommodation',
    label:    'Book Accommodation — 3 Cities, 7 Nights',
    category: 'accommodation',
    window:   { start: '2028-03', end: '2028-05' },
    priority: 'high',
    notes:    'Edinburgh 3 nights (Oct 15-18), Fort William / Highlands 3 nights (Oct 18-21), Portree / Skye 1 night (Oct 21-22).',
  },
  {
    id:       'talisker',
    label:    'Talisker Distillery Tour (Isle of Skye)',
    category: 'experience',
    window:   { start: '2028-06', end: '2028-07' },
    priority: 'high',
    notes:    'Book via Talisker Distillery website. Tours fill up in peak season. Oct is shoulder season but still busy.',
  },
  {
    id:       'travel-insurance',
    label:    'Travel Insurance — Adventure / Outdoor Cover',
    category: 'document',
    window:   { start: '2028-06', end: '2028-08' },
    priority: 'high',
    notes:    'Ensure cover for hillwalking, car hire excess, trip cancellation. Compare Policybazaar / InsureMyTrip.',
  },
  {
    id:       'edinburgh-castle',
    label:    'Edinburgh Castle Skip-the-Queue Tickets',
    category: 'experience',
    window:   { start: '2028-07', end: '2028-08' },
    priority: 'normal',
    notes:    'Book online via Historic Environment Scotland. Timed entry. Adult £19.50 (2024 price — verify current).',
  },
  {
    id:       'setup',
    label:    'Final Setup — eSIM, MWIS, What3Words, Maps Offline',
    category: 'setup',
    window:   { start: '2028-09', end: '2028-09' },
    priority: 'normal',
    notes:    'Airalo UK eSIM · MWIS (Mountain Weather Info) app · What3Words (emergency location) · Google Maps offline download for Highlands + Skye.',
  },
]
