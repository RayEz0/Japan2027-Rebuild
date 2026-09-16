/**
 * England 2028 — Booking Roadmap
 * Canonical list of booking tasks with their time windows.
 * Status (done/active/upcoming) is computed at runtime based on today's date.
 */

export const BOOKING_ITEMS = [
  {
    id:       'uk-visa',
    label:    'UK Standard Visitor Visa (Indian Passport)',
    category: 'document',
    window:   { start: '2028-05', end: '2028-06' },
    priority: 'critical',
    notes:    'Indian passport holders require a UK Standard Visitor Visa — NOT the same as Schengen. Apply via VFS Global (UK Visas & Immigration). Fee ~£115. Apply 3 months before Sep 10 (so by June 2028). Biometric appointment required at VFS Global India. Decision takes 3–8 weeks.',
  },
  {
    id:       'flights',
    label:    'Book Flights — BLR → London (LHR)',
    category: 'transport',
    window:   { start: '2027-10', end: '2028-01' },
    priority: 'critical',
    notes:    'Emirates via DXB or British Airways direct BLR→LHR. Outbound Sep 10 2028, return Sep 18 2028. September is UK shoulder season — fares lower than July/August peak. Book 8–11 months out for best advance fares. Check Google Flights for BA direct (saves transit time).',
  },
  {
    id:       'london-accommodation',
    label:    'Book London Accommodation — 4 Nights (Sep 10–14)',
    category: 'accommodation',
    window:   { start: '2028-03', end: '2028-05' },
    priority: 'critical',
    notes:    'Generator London (Bloomsbury) or YHA St Pancras. Book direct via generator-hostels.com or yha.org.uk for best rates. September London sees school holiday crossover (UK schools return first week Sep) — book 4–5 months out. Dorm beds fill before private rooms.',
  },
  {
    id:       'rail-advance',
    label:    'Book Advance Rail — Euston → Oxenholme + Oxford return',
    category: 'transport',
    window:   { start: '2028-06', end: '2028-07' },
    priority: 'critical',
    notes:    'UK rail advance tickets open 12 weeks before travel. Book via Trainline or National Rail. Euston→Oxenholme (Sep 15) and Oxenholme→Euston (Sep 18 morning) are priority — Advance fares (£40–60) vs walk-up Anytime (£150+). London–Oxford GWR fares also significantly cheaper booked ahead.',
  },
  {
    id:       'lake-district-accommodation',
    label:    'Book YHA Ambleside — 3 Nights (Sep 15–18)',
    category: 'accommodation',
    window:   { start: '2028-03', end: '2028-05' },
    priority: 'critical',
    notes:    'YHA Ambleside (Waterhead) — the best Lake District hostel, directly on Windermere. Book via yha.org.uk — dorm beds and private rooms. September is a busy walking month; Ambleside fills weeks ahead. Alternative: YHA Keswick if Ambleside is full.',
  },
  {
    id:       'oxford-accommodation',
    label:    'Book Oxford Accommodation — 1 Night (Sep 14–15)',
    category: 'accommodation',
    window:   { start: '2028-04', end: '2028-06' },
    priority: 'high',
    notes:    'YHA Oxford (Botley Road) or Oxford Backpackers Hostel (Hythe Bridge Street). Single night — budget and location are both fine. Oxford is popular in September with university term beginning; book 3–4 months out.',
  },
  {
    id:       'westminster-abbey',
    label:    'Book Westminster Abbey Tickets',
    category: 'experience',
    window:   { start: '2028-08', end: '2028-08' },
    priority: 'high',
    notes:    'Tickets at westminster-abbey.org — £29 adult. Same-day entry possible but queue can add 45 min. Book for the Sep 10 afternoon slot (Day 1 arrival plan). Print or have QR ready offline in case of poor mobile signal.',
  },
  {
    id:       'sky-garden',
    label:    'Book Sky Garden (Free Entry Slot)',
    category: 'experience',
    window:   { start: '2028-08', end: '2028-09' },
    priority: 'high',
    notes:    'Free entry to Sky Garden (20 Fenchurch Street) via skygarden.london — slots open 3 weeks in advance and go fast. Book for Sep 12 (Day 3), afternoon slot 3–5 PM. The website opens new slots every Thursday at 08:00 UK time. Walk-in is not possible without a ticket.',
  },
  {
    id:       'travel-insurance',
    label:    'Travel Insurance — UK + Outdoor Activities',
    category: 'document',
    window:   { start: '2028-06', end: '2028-08' },
    priority: 'high',
    notes:    'UK has reciprocal NHS access for some countries but NOT for Indian passport holders without EHIC — full medical cover required. Include fell walking (Catbells, Ullswater path) in activities covered. Policybazaar or Cover-More for India-based policies. Minimum £1M medical coverage.',
  },
  {
    id:       'setup',
    label:    'Final Setup — eSIM, Apps, Maps Offline',
    category: 'setup',
    window:   { start: '2028-08', end: '2028-09' },
    priority: 'normal',
    notes:    'Airalo UK eSIM (EE network — best UK coverage for rural areas including Lake District) · Google Maps offline for London, Oxford, Lake District · Trainline app with tickets loaded offline · National Rail app for real-time disruption · BBC Weather app (better than Met Office for fell-specific forecasts) · OS Maps app (Harvey\'s map purchase unlocks offline)',
  },
]
