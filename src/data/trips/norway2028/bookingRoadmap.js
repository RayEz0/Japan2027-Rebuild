/**
 * Norway 2028 — Booking Roadmap
 * Canonical list of booking tasks with their time windows.
 * Status (done/active/upcoming) is computed at runtime based on today's date.
 */

export const BOOKING_ITEMS = [
  {
    id:       'schengen',
    label:    'Confirm Schengen Visa Validity (Indian Passport)',
    category: 'document',
    window:   { start: '2027-09', end: '2027-10' },
    priority: 'critical',
    notes:    'Norway is Schengen — Indian passport holders need a valid Schengen visa. Check if existing multi-entry Schengen visa covers Jun 2028, or apply fresh via VFS Global (Norway).',
  },
  {
    id:       'flights',
    label:    'Book Flights — BLR → Oslo (OSL)',
    category: 'transport',
    window:   { start: '2027-09', end: '2027-12' },
    priority: 'critical',
    notes:    'Emirates via DXB or Air India via DEL. Outbound Jun 1 2028, return Jun 10 2028. Book 6–9 months ahead — June is peak season in Norway.',
  },
  {
    id:       'flamsbana',
    label:    'Book Flåmsbana (Flåm Railway) — Jun 5',
    category: 'transport',
    window:   { start: '2028-02', end: '2028-03' },
    priority: 'critical',
    notes:    'The Flåm Railway sells out weeks ahead in June. Book via Vy.no — Myrdal to Flåm, Jun 5 morning. One-way is enough; ferry back via Nærøyfjord.',
  },
  {
    id:       'bergen-line',
    label:    'Book Bergen Line — Oslo → Bergen, Jun 3',
    category: 'transport',
    window:   { start: '2028-02', end: '2028-04' },
    priority: 'critical',
    notes:    'NSB/Vy Bergen Line (Bergensbanen) — Oslo S to Bergen, Jun 3 morning. One of the great train journeys in Europe. Minipris tickets book out early.',
  },
  {
    id:       'accommodation',
    label:    'Book All Accommodation — 9 Nights',
    category: 'accommodation',
    window:   { start: '2028-01', end: '2028-03' },
    priority: 'critical',
    notes:    'Book early — fjord village accommodation (Flåm, Geiranger) is extremely limited and fills up by April for June. Oslo and Bergen have more availability.',
  },
  {
    id:       'naeroyfjord-cruise',
    label:    'Book Nærøyfjord Cruise — Flåm → Gudvangen',
    category: 'experience',
    window:   { start: '2028-03', end: '2028-04' },
    priority: 'high',
    notes:    'Fjord cruise via Fjord Tours or NorwayBuss. Departs Flåm afternoon Jun 5. Part of the Norway in a Nutshell route — book with the Flåmsbana for best combined ticket pricing.',
  },
  {
    id:       'geiranger-ferry',
    label:    'Book Geiranger Ferry — Hellesylt → Geiranger',
    category: 'transport',
    window:   { start: '2028-03', end: '2028-05' },
    priority: 'high',
    notes:    'Fjord1 ferry — 1 hour Hellesylt to Geiranger on Jun 7. Book via Fjord1.no. Car ferry if driving a rental; passenger if going by bus.',
  },
  {
    id:       'car-hire',
    label:    'Car Hire — Flåm Area, 3 Days (Jun 6–9)',
    category: 'transport',
    window:   { start: '2028-03', end: '2028-05' },
    priority: 'high',
    notes:    'Automatic required — Stegastein, Borgund, and Trollstigen mountain roads are not suitable for manual inexperienced drivers. Pickup Flåm/Aurland, drop Geiranger or Ålesund.',
  },
  {
    id:       'travel-insurance',
    label:    'Travel Insurance — Schengen + Adventure Cover',
    category: 'document',
    window:   { start: '2028-03', end: '2028-05' },
    priority: 'high',
    notes:    'Schengen visa requires minimum €30,000 medical coverage. Add adventure / outdoor sports cover for fjord hiking and kayaking. Policybazaar or InsureMyTrip.',
  },
  {
    id:       'setup',
    label:    'Final Setup — eSIM, Yr.no, Maps Offline, Vy App',
    category: 'setup',
    window:   { start: '2028-05', end: '2028-05' },
    priority: 'normal',
    notes:    'Airalo Schengen eSIM · Yr.no app (Norwegian weather, essential for mountain days) · Google Maps offline for Oslo, Bergen, Flåm valley, Geiranger · Vy app for rail confirmations.',
  },
]
