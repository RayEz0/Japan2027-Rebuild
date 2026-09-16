/**
 * Switzerland 2032 — Booking Roadmap
 * Arc 06: Switzerland (Dec 1–8) + Sweden (Dec 9–16)
 * Route: BLR → ZRH → Zurich → Lucerne → Interlaken → Zermatt → Geneva (GVA) → Stockholm
 */

export const BOOKING_ITEMS = [
  {
    id:       'swiss-schengen-arc06',
    label:    'Apply for Schengen Visa — Switzerland (Arc 06 first country)',
    category: 'document',
    window:   { start: '2032-06', end: '2032-08' },
    priority: 'critical',
    notes:    'Switzerland is Schengen despite not being EU. Indian passport requires Schengen visa via Swiss consulate / VFS Global. The single Schengen visa covers both Switzerland (Dec) and Sweden (Dec — Sweden is also Schengen). As the first entry country, Switzerland issues the visa. Apply 3–6 months before travel with hotel bookings, bank statements (₹3L+ recommended for Switzerland), and travel insurance certificate.',
  },
  {
    id:       'swiss-flights-arc06',
    label:    'Book Flights — BLR → Zurich ZRH + Stockholm ARN → BLR',
    category: 'transport',
    window:   { start: '2032-03', end: '2032-05' },
    priority: 'critical',
    notes:    'Open-jaw: BLR→ZRH Dec 1 (Arc 06 start) and ARN→BLR Dec 17 (Arc 06 end after Sweden). Geneva GVA→Stockholm ARN is the internal Arc 06 transit (book separately Dec 8). Carriers: Swiss Air, Lufthansa, Qatar Airways. Book 7–9 months ahead for December peak travel dates.',
  },
  {
    id:       'swiss-travel-pass',
    label:    'Buy Swiss Travel Pass — 8 Consecutive Days (Dec 1–8)',
    category: 'transport',
    window:   { start: '2032-07', end: '2032-09' },
    priority: 'critical',
    notes:    'Swiss Travel Pass must be purchased before arriving in Switzerland — it\'s significantly cheaper online via swisstravelsystem.com than buying in-country. Select "8 consecutive days" starting Dec 1. Covers all SBB trains, boats, urban transit, and discounts on mountain railways. Print a physical copy — ticket inspectors prefer it.',
  },
  {
    id:       'swiss-jungfraujoch-ticket',
    label:    'Book Jungfraujoch Summit Ticket — Dec 5 (Good Morning Ticket)',
    category: 'experience',
    window:   { start: '2032-08', end: '2032-08' },
    priority: 'critical',
    notes:    'THE most time-sensitive booking in Switzerland — Jungfraujoch sells out months ahead for December. Book via jungfrau.ch. Select "Good Morning" fare (first train of the day, return by 1 PM) for the best price discount. Confirm December operational status — the mountain occasionally closes for maintenance or extreme weather. Have alternate date flexibility.',
  },
  {
    id:       'swiss-accommodation-all',
    label:    'Book All Switzerland Accommodation — Zurich, Lucerne, Interlaken, Zermatt',
    category: 'accommodation',
    window:   { start: '2032-06', end: '2032-08' },
    priority: 'high',
    notes:    'Zermatt especially — the most expensive and limited accommodation in Switzerland. Matterhorn Hostel (Schluhmattstrasse) and Youth Hostel Zermatt both fill 3–4 months ahead for December ski season. Book Zermatt first, then Interlaken Balmers (also popular), then Lucerne and Zurich which have more supply.',
  },
  {
    id:       'swiss-gornergrat',
    label:    'Book Gornergrat Railway — Zermatt, Dec 7 (First Train)',
    category: 'experience',
    window:   { start: '2032-09', end: '2032-09' },
    priority: 'high',
    notes:    'Can buy at Zermatt station on the day, but reserve the first departure (≈7:08 AM in winter) for sunrise on Monte Rosa. Swiss Travel Pass gives 50% discount. Check gornergrat.ch for winter timetable. Verify Dec 7 is not a public holiday that might affect train frequency.',
  },
  {
    id:       'swiss-travel-insurance',
    label:    'Travel Insurance — Mountain Rescue + Alpine Cover',
    category: 'document',
    window:   { start: '2032-08', end: '2032-08' },
    priority: 'high',
    notes:    'Standard travel insurance is NOT sufficient for Alps. Must include: mountain rescue (Swiss Rega helicopters cost CHF 3,000–₹8,000+), altitude emergency evacuation, winter sports/hiking cover. Schengen minimum €30,000 medical. This insurance also covers the Sweden leg. Check if it covers Lapland dog sled and snowshoe activities.',
  },
  {
    id:       'swiss-winter-gear',
    label:    'Winter Gear — Buy or Rent Before Departure',
    category: 'setup',
    window:   { start: '2032-10', end: '2032-10' },
    priority: 'medium',
    notes:    'Do not plan to buy in Switzerland — gear is 3–4× Indian prices. Source in Bangalore: Decathlon (Nexon winter jacket, thermal layers), Amazon India (Salomon boots, microspikes). Key items: insulated boots rated -20°C, down jacket 600+ fill, microspikes, balaclava, chemical hand warmers × 20. Failing to prepare adequate gear is the #1 regret of Indian travellers in Alpine December.',
  },
  {
    id:       'swiss-esim',
    label:    'Switzerland eSIM — separate from EU plan',
    category: 'setup',
    window:   { start: '2032-11', end: '2032-11' },
    priority: 'medium',
    notes:    'Switzerland is NOT in the EU data roaming zone — your EU eSIM will charge roaming rates. Buy a dedicated Switzerland eSIM via Airalo or Holafly before departure. Swisscom network. 10GB sufficient for 8 days with offline maps cached. Activate before landing at ZRH.',
  },
  {
    id:       'swiss-gva-stockholm-flight',
    label:    'Book Geneva GVA → Stockholm ARN — Dec 8 (Arc 06 internal)',
    category: 'transport',
    window:   { start: '2032-05', end: '2032-06' },
    priority: 'critical',
    notes:    'The connecting flight from Geneva to Stockholm for the Arc 06 Sweden leg. Book early alongside main flights for best price. EasyJet or Swiss/SAS codeshare. Allow 3 hours at GVA for check-in — Geneva airport has long queues in December. Evening flight recommended to allow a Geneva afternoon (Jet d\'Eau, Old Town).',
  },
]
