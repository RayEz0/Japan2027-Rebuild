/**
 * Greece 2029 — Booking Roadmap
 * Route: BLR → Athens (ATH) → Santorini (Thira) → Mykonos → Athens → BLR
 * Dates: Oct 2–10, 2029
 * Status (done/active/upcoming) is computed at runtime based on today's date.
 */

export const BOOKING_ITEMS = [

  // ── Flights ────────────────────────────────────────────────────────────────

  {
    id:       'greece-flights-blr-ath',
    label:    'Book International Flights — BLR → Athens (ATH)',
    category: 'flights',
    window:   { start: '2029-01', end: '2029-03' },
    priority: 'critical',
    notes:    'Air India BLR→ATH via DEL or Aegean Airlines via London/Frankfurt. October is shoulder season — moderate demand but book 7–9 months ahead for best fares. Athens Eleftherios Venizelos (ATH) is the main hub. Check Air India, Lufthansa, and Qatar Airways. Set Google Flights fare alert from Aug 2028. Greece is Schengen — verify the Italy Schengen visa covers the full BLR→ATH→BLR round trip.',
  },
  {
    id:       'greece-flights-jmk-blr',
    label:    'Book Return Flights — Mykonos (JMK) → Athens (ATH) → BLR',
    category: 'flights',
    window:   { start: '2029-02', end: '2029-04' },
    priority: 'critical',
    notes:    'Sky Express or Aegean Airlines for JMK → ATH domestic leg (35 min). Then Aegean Air or Air India ATH → BLR with 3+ hours minimum connection time at Athens Airport. Book domestic and international separately; confirm checked baggage transfer is possible. Mykonos Airport (JMK) is small — arrive 90 minutes before departure. January–March booking window gives best October fares.',
  },

  // ── Accommodation ──────────────────────────────────────────────────────────

  {
    id:       'greece-accommodation-athens',
    label:    'Book Athens Accommodation — 3 Nights (Oct 2–5)',
    category: 'accommodation',
    window:   { start: '2029-05', end: '2029-07' },
    priority: 'high',
    notes:    'Athens Backpackers (Makri, Koukaki) or City Circus Athens (Monastiraki) — both within 15 min walk of the Acropolis. October is shoulder season so same-day availability is often possible, but confirm before booking Santorini. Rooftop bars at these hostels have direct Acropolis views. Flexible cancellation is important — ferry disruptions can extend the Athens stay unexpectedly.',
  },
  {
    id:       'greece-accommodation-santorini',
    label:    'Book Santorini Accommodation — 3 Nights (Oct 5–8) at Caveland',
    category: 'accommodation',
    window:   { start: '2029-05', end: '2029-06' },
    priority: 'critical',
    notes:    'Caveland Hostel (Karterados, 3 km from Fira) is the top-rated budget option on Santorini — underground cave dormitories, pool, and free bike hire. Books out even in October shoulder season. Book 4–6 months ahead. Bike hire is essential for getting around the caldera villages without overpriced taxis. Confirm shuttle transfer from Athinios Port (€12 taxi, or ask hostel about pickup options).',
  },
  {
    id:       'greece-accommodation-mykonos',
    label:    'Book Mykonos Accommodation — 2 Nights (Oct 8–10)',
    category: 'accommodation',
    window:   { start: '2029-05', end: '2029-07' },
    priority: 'critical',
    notes:    'Mykonos Porto Hostel or HOMYtel Mykonos Town — walking distance to Little Venice and the Windmills. October prices are significantly lower than summer peak but good value hostels still book out. Book alongside Santorini. Confirm check-in times before travelling — fast ferry arrivals in Mykonos can be late afternoon. The town is compact and walkable; accommodation central to the old port is best.',
  },

  // ── Ferries ────────────────────────────────────────────────────────────────

  {
    id:       'greece-ferry-piraeus-santorini',
    label:    'Book Blue Star Ferry — Athens Piraeus (E9) → Santorini (Thira)',
    category: 'ferries',
    window:   { start: '2029-06', end: '2029-07' },
    priority: 'critical',
    notes:    'Blue Star 2 or Blue Star Paros · Departs Piraeus Gate E9 · 7.5–8 hours · Book a cabin (A4 or B class, ~€65–80) rather than deck seats — deck is cold and windy in October. Book at ferries.gr or bluestarferries.com. Metro Line 1 (Green) to Piraeus Station, then 10 min walk to Gate E9 — allow 45 min from Monastiraki. October is shoulder season, cabins available but book 2–3 months ahead to guarantee one.',
  },
  {
    id:       'greece-ferry-santorini-mykonos',
    label:    'Book Fast Ferry — Santorini (Athinios) → Mykonos',
    category: 'ferries',
    window:   { start: '2029-06', end: '2029-07' },
    priority: 'critical',
    notes:    'Seajet or Golden Star Ferries · 2h 15min · Departs Athinios Port, Santorini · Multiple daily departures in peak season — October schedule is reduced; verify actual timetable at time of booking. High-speed catamarans are prone to cancellation in rough October Aegean conditions. Book refundable tickets and have the Blue Star slow-ferry schedule as a fallback. Check ferry status at seajet.gr the evening before departure.',
  },

  // ── Attractions ────────────────────────────────────────────────────────────

  {
    id:       'greece-attractions-acropolis',
    label:    'Book Acropolis Combined Ticket — Timed Entry',
    category: 'attractions',
    window:   { start: '2029-08', end: '2029-08' },
    priority: 'high',
    notes:    'Book at etickets.tap.gr — the combined ticket (€20) covers the Acropolis, Ancient Agora, Roman Agora, Kerameikos, Hadrian\'s Library, Temple of Olympian Zeus, and Lyceum for 5 days from first use. Book an 8:00 AM or 8:30 AM slot — the site has no shade and October afternoons are still warm. Online booking saves 30+ minutes of queue time even in October. Comfortable, closed walking shoes are essential on ancient marble.',
  },
  {
    id:       'greece-attractions-national-museum',
    label:    'Plan National Archaeological Museum Visit — Athens',
    category: 'attractions',
    window:   { start: '2029-08', end: '2029-09' },
    priority: 'medium',
    notes:    'Entrance €12 — no advance booking required for general entry. Verify October hours on the official website (namuseum.gr) before travel: typically 8:00 AM–8:00 PM, closed Mondays. Home to the Antikythera Mechanism, the Mask of Agamemnon, and one of the world\'s finest collections of Cycladic figurines. Allow 2.5–3 hours. Metro Line 1 (Omonia) or Line 2 (Victoria). Museum café on site.',
  },
  {
    id:       'greece-attractions-delos',
    label:    'Plan Delos Day Trip — Mykonos Old Port',
    category: 'attractions',
    window:   { start: '2029-08', end: '2029-09' },
    priority: 'medium',
    notes:    'Delos day-trip boats are purchased at the Old Port quay (Fabrika), Mykonos Town — no advance booking needed. Boats depart 9:00 AM and 10:00 AM; last return 3:00 PM. October schedule may reduce to 3–4 departures per week — verify with accommodation on arrival in Mykonos. Budget €20 round-trip + €12 archaeological site entry. Bring water, sun protection, and walking shoes — the site is large and shadeless.',
  },

  // ── Transport ──────────────────────────────────────────────────────────────

  {
    id:       'greece-transport-cape-sounion',
    label:    'Plan Cape Sounion Day Trip — KTEL Bus',
    category: 'transport',
    window:   { start: '2029-08', end: '2029-09' },
    priority: 'medium',
    notes:    'KTEL Attiki coastal route bus from Athens Pedion Areos terminal — €6.70 each way, ~1.5 hours, departs every 1–2 hours from 6:30 AM. Verify October timetable at ktelattikis.gr before departure day. Arrive before 10:00 AM to beat day-trip crowds. Sunset at Sounion is spectacular but the last bus back departs ~6:30 PM in October — check the return schedule on site. Alternatively, rent a car (€35–50) to add Marathon on the same day.',
  },
  {
    id:       'greece-transport-metro',
    label:    'Purchase Athens Metro Passes',
    category: 'transport',
    window:   { start: '2029-09', end: '2029-10' },
    priority: 'low',
    notes:    'Athens Metro 24-hour pass €4.10 or 5-day pass €8.20 — buy at any station ticket machine. Line 1 (Green) to Piraeus port for the Blue Star ferry. Line 2 (Red) Acropolis station for the Acropolis hill. Line 3 (Blue) connects to the airport (surcharge €10 single for the airport express — separate ticket required). Validate ticket at the blue validator before boarding; there are no turnstiles but inspectors fine without valid ticket.',
  },

  // ── Insurance ──────────────────────────────────────────────────────────────

  {
    id:       'greece-insurance-policy',
    label:    'Verify Travel Insurance Covers Greece (Schengen)',
    category: 'insurance',
    window:   { start: '2029-04', end: '2029-06' },
    priority: 'high',
    notes:    'If insurance was purchased for the Italy trip, verify it explicitly covers Greece — some Indian policies list individual Schengen countries and require declaration of all destinations at purchase. HDFC ERGO and Bajaj Allianz international travel plans typically cover all of Europe under a single "worldwide" or "Europe" policy. Confirm: minimum €30,000 medical cover (Schengen visa requirement), trip cancellation, and ferry/flight delay cover. Obtain a written policy confirmation document.',
  },
  {
    id:       'greece-insurance-visa-check',
    label:    'Confirm Schengen Visa Validity Covers Full Greece Stay',
    category: 'insurance',
    window:   { start: '2029-06', end: '2029-07' },
    priority: 'critical',
    notes:    'The Italy Schengen visa covers Greece — no separate Greek visa is required. Verify: (1) visa expiry date is after Oct 10, 2029; (2) it is a multiple-entry or single-entry visa and you have not already exited and re-entered Schengen in a way that would exhaust your entries; (3) total Schengen days used (Italy + Greece) do not exceed the 90/180-day limit. Print the visa page and carry a clear photocopy separately from your passport.',
  },

  // ── Packing ────────────────────────────────────────────────────────────────

  {
    id:       'greece-packing-documents',
    label:    'Compile and Print Travel Documents Folder — Greece',
    category: 'packing',
    window:   { start: '2029-09', end: '2029-10' },
    priority: 'high',
    notes:    'Print and pack: passport (valid beyond Apr 2030), Schengen visa page, travel insurance certificate, Blue Star Ferry confirmation (Piraeus → Santorini), fast ferry confirmation (Santorini → Mykonos), domestic flight booking (JMK → ATH), international flight booking (ATH → BLR), all 3 hotel/hostel confirmations. Save PDFs offline in Google Drive and email them to yourself. Photograph every document as backup on your phone.',
  },
  {
    id:       'greece-packing-clothing-gear',
    label:    'Pack Greece October Essentials — Layers, Sun, Footwear',
    category: 'packing',
    window:   { start: '2029-09', end: '2029-10' },
    priority: 'medium',
    notes:    'October Athens: 18–24°C days, 12–14°C evenings — lightweight layers essential. Ferry decks: wind-proof jacket mandatory (spray and 30 knot winds on open decks even in good weather). Ancient sites: comfortable, closed-toe shoes with grip on ancient marble (flip-flops are banned at some sites). Sun: SPF50 sunscreen and a hat — the Acropolis, Santorini caldera rim, and Delos have zero shade. EU Type C/F power adapters. Phone power bank for full-day island exploration.',
  },

  // ── Final Checks ───────────────────────────────────────────────────────────

  {
    id:       'greece-final-esim',
    label:    'Activate Greece/EU eSIM Data Plan',
    category: 'final checks',
    window:   { start: '2029-09', end: '2029-10' },
    priority: 'high',
    notes:    'Airalo or Holafly EU plan (covers Greece, Italy, and France on the same eSIM). 15–20 GB recommended for a 9-day trip with Maps, WhatsApp, and photos. Activate 24 hours before departure from BLR. Download Google Maps offline for Athens, Santorini, and Mykonos before leaving — cell coverage is patchy on Blue Star ferry crossings and in Santorini interior. Verify eSIM compatibility with your phone model (most flagships 2021+).',
  },
  {
    id:       'greece-final-ferry-weather',
    label:    'Reconfirm Ferry Schedule and Sea Conditions — 48h Before Each Sailing',
    category: 'final checks',
    window:   { start: '2029-10', end: '2029-10' },
    priority: 'high',
    notes:    'October Aegean weather can cancel fast ferries with 12–24 hours notice. 48 hours before each ferry: check bluestarferries.com (Piraeus→Santorini route) and seajet.gr (Santorini→Mykonos route) for operational status. Check Windy.com for sea height forecasts — anything above 2 m wave height typically triggers fast-ferry cancellation. If the Seajet route looks uncertain, pre-book a Blue Star slow-ferry from Santorini as a fallback (check bluestarferries.com for Santorini→Mykonos schedule).',
  },
  {
    id:       'greece-final-currency',
    label:    'Arrange Euro Cash and Notify Bank of Travel Dates',
    category: 'final checks',
    window:   { start: '2029-09', end: '2029-10' },
    priority: 'medium',
    notes:    'Greece uses Euro. Cards are accepted widely in Athens restaurants and shops, less so on smaller Santorini and Mykonos streets and at the Delos quay ticket booth. Carry €150–200 cash as backup. Island ATMs exist in Fira (Santorini) and Mykonos Town but can run low mid-October. Notify your Indian bank of BLR→ATH travel dates to prevent overseas card blocks. Best exchange rate: withdraw from ATH airport arrival ATM or an Alpha Bank ATM on arrival (lower foreign-transaction fees than tourist-area machines on the islands).',
  },
]

/** Compute status of a booking item against today's date */
export function getBookingStatus(item, completedIds = []) {
  if (completedIds.includes(item.id)) return 'done'

  const now   = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth() + 1 // 1-indexed

  const [sy, sm] = item.window.start.split('-').map(Number)
  const [ey, em] = item.window.end.split('-').map(Number)

  const afterStart = year > sy || (year === sy && month >= sm)
  const beforeEnd  = year < ey || (year === ey && month <= em)

  if (afterStart && beforeEnd) return 'active'
  if (year > ey || (year === ey && month > em)) return 'overdue'
  return 'upcoming'
}

export function formatWindow(item) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const [sy, sm] = item.window.start.split('-').map(Number)
  const [ey, em] = item.window.end.split('-').map(Number)
  const startLabel = `${months[sm - 1]} ${sy}`
  const endLabel   = `${months[em - 1]} ${ey}`
  return sm === em && sy === ey ? startLabel : `${startLabel} – ${endLabel}`
}
