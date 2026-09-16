/**
 * New Zealand 2034 — Booking Roadmap
 * Arc 08 · Nov 10–25, 2034 · 16 days
 * Status (done/active/upcoming) computed at runtime from today's date.
 */

export const BOOKING_ITEMS = [
  {
    id:       'nz-eta',
    label:    'Apply for NZeTA + International Visitor Levy',
    category: 'document',
    window:   { start: '2034-07', end: '2034-09' },
    priority: 'critical',
    notes:    'Indian passport holders MUST obtain NZeTA (NZ Electronic Travel Authorisation) before travel. Apply at immigration.govt.nz. Also pay the International Visitor Levy (NZ$35) at the same time. Processing usually 72 hours but allow 2 weeks.',
  },
  {
    id:       'nz-flights-international',
    label:    'Book Flights — BLR → Auckland (AKL) + Christchurch (CHC) → BLR',
    category: 'transport',
    window:   { start: '2033-11', end: '2034-03' },
    priority: 'critical',
    notes:    'Open-jaw ticket: fly into AKL, fly out of CHC. Best carriers: Singapore Airlines, Air New Zealand via Sydney, AirAsia X. BLR–AKL is 13–16h with at least one stop. Book 8–12 months ahead for Nov peak season pricing.',
  },
  {
    id:       'nz-domestic-flight',
    label:    'Book Domestic Flight — Wellington (WLG) → Queenstown (ZQN)',
    category: 'transport',
    window:   { start: '2034-04', end: '2034-06' },
    priority: 'critical',
    notes:    'Air New Zealand operates this route. 1h 20min flight. Book via airnewzealand.com early — seat sale fares can be NZ$59 but regular fare is NZ$150–250. Check baggage allowances for hire car transfer.',
  },
  {
    id:       'nz-hobbiton',
    label:    'Book Hobbiton Movie Set Tour',
    category: 'experience',
    window:   { start: '2034-06', end: '2034-07' },
    priority: 'critical',
    notes:    'Book at hobbitontours.com. Sells out completely, especially weekends and Nov (NZ spring). Morning tours (9 AM) have better light. Adult NZ$109. Only guided tours available — no self-guided entry. Book well ahead.',
  },
  {
    id:       'nz-car-hire',
    label:    'Book Car Hire — Auckland + Wellington (South Island)',
    category: 'transport',
    window:   { start: '2034-06', end: '2034-07' },
    priority: 'critical',
    notes:    'Two separate rentals: (1) Auckland 2 days (Nov 11–12 optional Waiheke trip logistics) (2) Wellington pickup Nov 14, return Christchurch Airport Nov 23 — South Island 9 days. Compare Apex, Omega Rental Cars (cheapest), Budget, Europcar. Compact SUV recommended for Milford and Mount Cook roads. Verify IDP requirement.',
  },
  {
    id:       'nz-accommodation',
    label:    'Book Accommodation — All 7 Cities (15 nights)',
    category: 'accommodation',
    window:   { start: '2034-06', end: '2034-07' },
    priority: 'high',
    notes:    'Auckland 2n · Rotorua 2n · Wellington 2n · Queenstown 5n · Christchurch 2n · Mount Cook 1n · Book via YHA.co.nz and Hostelworld. November is peak season — popular hostels sell out. Mount Cook is extremely limited; book the moment you confirm dates.',
  },
  {
    id:       'nz-milford-cruise',
    label:    'Book Milford Sound Cruise',
    category: 'experience',
    window:   { start: '2034-07', end: '2034-08' },
    priority: 'high',
    notes:    'Real Journeys or Jucy Cruize. Standard 1.5h cruise NZ$125–165. Book online at realjourneys.co.nz. November is their busiest month — book 2–3 months ahead to secure preferred departure time (11:30 AM or 12:30 PM recommended).',
  },
  {
    id:       'nz-bungy',
    label:    'Book Bungy Jump / Skydive — Queenstown',
    category: 'experience',
    window:   { start: '2034-08', end: '2034-09' },
    priority: 'high',
    notes:    'AJ Hackett: Kawarau Bridge NZ$250, Nevis NZ$350, Ledge NZ$170. Book at bungy.co.nz. Skydive Queenstown: NZ$299–499 depending on altitude. Both can be booked same-week in shoulder season but book in advance for preferred time in November peak.',
  },
  {
    id:       'nz-te-puia',
    label:    'Book Te Puia Cultural Show + Hāngī Dinner',
    category: 'experience',
    window:   { start: '2034-08', end: '2034-09' },
    priority: 'high',
    notes:    'Book the evening Kapa Haka cultural performance + Hāngī dinner combo at tepuia.com. Evening shows depart 5:30 PM. The combined package (NZ$160) includes entry, performance, and traditional earth-oven dinner. Book in advance for November.',
  },
  {
    id:       'nz-travel-insurance',
    label:    'Travel Insurance — Adventure Activities Cover',
    category: 'document',
    window:   { start: '2034-08', end: '2034-09' },
    priority: 'high',
    notes:    'MUST include cover for: bungy jumping, skydiving (if chosen), hiking above 3,000m (Mount Cook area), kayaking. World Nomads is commonly used by adventure travellers. Compare on Policybazaar for Indian policies. Medical coverage of minimum US$500,000 recommended for NZ healthcare costs.',
  },
  {
    id:       'nz-esim',
    label:    'Get New Zealand eSIM',
    category: 'setup',
    window:   { start: '2034-10', end: '2034-10' },
    priority: 'medium',
    notes:    'Airalo NZ eSIM — 10GB NZ$25. Spark NZ has best coverage in South Island and Fiordland (other carriers have gaps). Activate before landing. Download offline maps first — Fiordland and Mount Cook have zero signal.',
  },
  {
    id:       'nz-mount-cook-restaurant',
    label:    'Reserve Old Mountaineer\'s Café — Mount Cook Village',
    category: 'experience',
    window:   { start: '2034-09', end: '2034-10' },
    priority: 'medium',
    notes:    'The only good dinner option at Mount Cook Village — a heritage cottage with famous mountain views and excellent steak pies. Reservations recommended for dinner in November peak season. Call ahead once accommodation is confirmed.',
  },
]
