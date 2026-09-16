// Arc 02 — Scotland + Norway (2028)
// Itinerary and packing sourced from trip files; this file adds transport,
// currency, highlights, map, and planning notes.

export const ARC_02 = {
  tripOrder: ['scotland', 'norway2028'],

  transport: [
    { type: 'Flight',     icon: '✈️', segment: 'BLR → EDI via FRA', detail: 'Lufthansa / Air India connecting Frankfurt. ~13 hrs total.' },
    { type: 'Walk / Bus', icon: '🚶', segment: 'Edinburgh City',      detail: 'Lothian bus network or on foot — Old Town is walkable.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Edinburgh → Glencoe → Fort William → Skye', detail: 'Hire car required for Highlands. Drive on the left. A82 then A87 to Skye Bridge.', highlight: 'Scottish Highlands Drive' },
    { type: 'Flight',     icon: '✈️', segment: 'EDI → OSL',           detail: 'Ryanair or Norwegian Air. ~2 hrs. Book 6+ months ahead.' },
    { type: 'Metro',      icon: '🚇', segment: 'Oslo City',           detail: 'T-bane metro + walk. Get a day pass (NOK 40/day).' },
    { type: 'Train',      icon: '🚂', segment: 'Oslo → Bergen',       detail: 'Bergen Railway — 7 hrs, one of Europe\'s most scenic train journeys. Book Vy.no ahead.', highlight: 'Bergen Railway (Bergensbanen)' },
    { type: 'Ferry',      icon: '⛴️', segment: 'Bergen → Flåm via Nærøyfjord', detail: 'Norway in a Nutshell ferry. Book Visitflam.com. 3–4 hrs.', highlight: 'Nærøyfjord UNESCO Cruise' },
    { type: 'Train',      icon: '🚂', segment: 'Flåm Railway',        detail: 'Flåmsbana — world\'s steepest standard-gauge railway. 20 km, 55 min. Book months ahead.', highlight: 'Flåmsbana Scenic Railway' },
    { type: 'Bus',        icon: '🚌', segment: 'Flåm → Geiranger',    detail: 'Regional bus via Hellesylt + ferry. ~3.5 hrs.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Geiranger → Trollstigen → Oslo', detail: 'Car hire for mountain roads. Eagle Road + Trollstigen serpentine road.', highlight: 'Norwegian Fjord Drive + Trollstigen' },
    { type: 'Flight',     icon: '✈️', segment: 'OSL → BLR',           detail: 'Emirates via Dubai or Air India. ~12 hrs.' },
  ],

  currencies: [
    { country: 'United Kingdom', code: 'GBP', symbol: '£', rateToINR: 107.50, notes: 'Contactless card everywhere. No cash needed for most of the trip.' },
    { country: 'Norway',         code: 'NOK', symbol: 'kr', rateToINR: 7.82,   notes: 'Norway is nearly cashless. Card accepted at all hostels, ferries, rail.' },
  ],

  highlights: [
    {
      tripId: 'scotland', city: 'Edinburgh',
      items: ['Edinburgh Castle', 'Arthur\'s Seat (Holyrood Park)', 'Calton Hill panorama', 'Greyfriars Kirkyard', 'Victoria Street', 'Scotch Whisky Experience', 'The Royal Mile', 'Grassmarket'],
    },
    {
      tripId: 'scotland', city: 'Scottish Highlands',
      items: ['Rannoch Moor', 'Glencoe Valley + Three Sisters', 'Ben Nevis (highest in UK)', 'Neptune\'s Staircase lock flight', 'Eilean Donan Castle', 'Loch Ness + Urquhart Castle'],
    },
    {
      tripId: 'scotland', city: 'Isle of Skye',
      items: ['Old Man of Storr', 'Kilt Rock + Mealt Falls', 'Portree Harbour', 'Fairy Pools (Black Cuillin)', 'Dunvegan Castle', 'Talisker Distillery'],
    },
    {
      tripId: 'norway2028', city: 'Oslo',
      items: ['Oslo Opera House (walk on the roof)', 'Vigeland Sculpture Park', 'Aker Brygge waterfront', 'Akershus Fortress', 'MUNCH Museum', 'Astrup Fearnley Museum', 'Barcode Waterfront'],
    },
    {
      tripId: 'norway2028', city: 'Bergen',
      items: ['Bryggen Wharf (UNESCO)', 'Fløibanen Funicular', 'Fish Market (Fisketorget)', 'KODE Art Museums', 'Bergen Old Town alleys', 'Gamlehaugen (Royal Residence)'],
    },
    {
      tripId: 'norway2028', city: 'Fjords',
      items: ['Nærøyfjord UNESCO cruise', 'Flåmsbana steepest railway', 'Stegastein viewpoint (650m)', 'Geirangerfjord + Seven Sisters waterfall', 'Eagle Road (Ørnesvingen)', 'Trollstigen serpentine road', 'Dalsnibba glacier viewpoint'],
    },
  ],

  packingNotes: [
    { category: 'Non-Negotiables', icon: '⚠️', items: ['Waterproof jacket with taped seams (Scotland is wet year-round)', 'Waterproof hiking boots (muddy everywhere)', 'Thermal base layers × 2 (fjords are cold even in June)', 'UK ETA (apply at gov.uk — ~₹1,000, Indian passport required)'] },
    { category: 'Outdoor Essentials', icon: '🎒', items: ['20–25L daypack for hike days', 'Dry bag 10L (rain + ferry spray)', 'Wool hiking socks × 5 pairs', 'Beanie + waterproof gloves (Highlands wind)'] },
    { category: 'Norway-Specific', icon: '🇳🇴', items: ['Sleep mask (June midnight sun in fjords)', 'Schengen documents in order (Norway is Schengen — no separate visa for 90-day Schengen holders)', 'Motion sickness tablets if prone (winding fjord roads)'] },
  ],

  map: {
    center: [60.5, -0.5],
    zoom: 5,
    markers: [
      // Scotland primary destinations
      { id: 'edinburgh', name: 'Edinburgh',               lat: 55.9533, lng: -3.1883, tripId: 'scotland',   day: '1–3',  type: 'primary' },
      { id: 'glencoe',   name: 'Glencoe Valley',          lat: 56.6818, lng: -5.1019, tripId: 'scotland',   day: '4–5',  type: 'primary' },
      { id: 'skye',      name: 'Isle of Skye (Portree)',  lat: 57.4123, lng: -6.1953, tripId: 'scotland',   day: '7–8',  type: 'primary' },
      // Edinburgh → Glencoe A82 intermediate stops
      { id: 'stirling',     name: 'Stirling',      lat: 56.1190, lng: -3.9370, tripId: 'scotland', type: 'secondary', segment: 'edinburgh-glencoe-drive' },
      { id: 'callander',    name: 'Callander',     lat: 56.2387, lng: -4.2170, tripId: 'scotland', type: 'secondary', segment: 'edinburgh-glencoe-drive' },
      { id: 'crianlarich',  name: 'Crianlarich',   lat: 56.3833, lng: -4.6333, tripId: 'scotland', type: 'secondary', segment: 'edinburgh-glencoe-drive' },
      { id: 'rannoch-moor', name: 'Rannoch Moor',  lat: 56.5833, lng: -4.8700, tripId: 'scotland', type: 'secondary', segment: 'edinburgh-glencoe-drive' },
      // Glencoe → Isle of Skye A87 intermediate stops
      { id: 'fort-william',  name: 'Fort William',        lat: 56.8198, lng: -5.1052, tripId: 'scotland', type: 'secondary', segment: 'glencoe-skye-drive' },
      { id: 'eilean-donan',  name: 'Eilean Donan Castle', lat: 57.2737, lng: -5.5154, tripId: 'scotland', type: 'secondary', segment: 'glencoe-skye-drive' },
      { id: 'kyle-lochalsh', name: 'Kyle of Lochalsh',    lat: 57.2750, lng: -5.7194, tripId: 'scotland', type: 'secondary', segment: 'glencoe-skye-drive' },
      // Norway primary destinations
      { id: 'oslo',      name: 'Oslo',      lat: 59.9139, lng: 10.7522, tripId: 'norway2028', day: '9–10',  type: 'primary' },
      { id: 'bergen',    name: 'Bergen',    lat: 60.3913, lng:  5.3221, tripId: 'norway2028', day: '11–12', type: 'primary' },
      { id: 'flam',      name: 'Flåm',     lat: 60.8634, lng:  7.1204, tripId: 'norway2028', day: '13',    type: 'primary' },
      { id: 'geiranger', name: 'Geiranger', lat: 62.1007, lng:  7.2063, tripId: 'norway2028', day: '14–15', type: 'primary' },
      // Bergen Railway stop
      { id: 'voss',       name: 'Voss',                      lat: 60.6274, lng:  6.4187, tripId: 'norway2028', type: 'secondary', segment: 'oslo-bergen-train' },
      // Nærøyfjord stop
      { id: 'gudvangen',  name: 'Gudvangen (Nærøyfjord)',    lat: 60.8782, lng:  6.8326, tripId: 'norway2028', type: 'secondary', segment: 'bergen-flam-ferry' },
      // Geiranger → Oslo drive stops
      { id: 'trollstigen', name: 'Trollstigen',              lat: 62.4569, lng:  7.6669, tripId: 'norway2028', type: 'secondary', segment: 'geiranger-oslo-drive' },
      { id: 'andalsnes',   name: 'Åndalsnes',                lat: 62.5683, lng:  7.6869, tripId: 'norway2028', type: 'secondary', segment: 'geiranger-oslo-drive' },
    ],
    segments: [
      // ── Scotland ──────────────────────────────────────────────────────────────
      {
        id: 'edinburgh-glencoe-drive', tripId: 'scotland',
        from: 'Edinburgh', to: 'Glencoe',
        transportType: 'rental_car', highlight: true,
        label: 'Scottish Highlands Drive', mapLabel: 'A82 Highland Route',
        distance: '175 km', duration: '3h 20m', vehicle: 'Rental Car (A82)',
        waypoints: [
          [55.9533, -3.1883],  // Edinburgh
          [56.0200, -3.7800],  // M9/A9 Stirling approach
          [56.1190, -3.9370],  // Stirling
          [56.2387, -4.2170],  // Callander
          [56.3833, -4.6333],  // Crianlarich
          [56.4367, -4.7167],  // Tyndrum
          [56.5197, -4.7692],  // Bridge of Orchy
          [56.5833, -4.8700],  // Rannoch Moor
          [56.6818, -5.1019],  // Glencoe
        ],
      },
      {
        id: 'glencoe-skye-drive', tripId: 'scotland',
        from: 'Glencoe', to: 'Isle of Skye',
        transportType: 'rental_car', highlight: true,
        label: 'Road to the Isles — A82/A87', mapLabel: 'A87 — Road to Skye',
        distance: '145 km', duration: '2h 50m', vehicle: 'Rental Car (A82 → A87)',
        waypoints: [
          [56.6818, -5.1019],  // Glencoe
          [56.8198, -5.1052],  // Fort William
          [56.9833, -5.1667],  // Loch Lochy
          [57.0667, -5.0667],  // Invergarry (A87 junction)
          [57.2123, -5.4000],  // Glen Shiel
          [57.2737, -5.5154],  // Eilean Donan Castle
          [57.2750, -5.7194],  // Kyle of Lochalsh
          [57.2961, -6.1633],  // Sligachan
          [57.4123, -6.1953],  // Portree, Isle of Skye
        ],
      },
      // ── Flight: Scotland → Norway (not drawn on map) ──────────────────────────
      {
        id: 'flight-edi-osl', tripId: null,
        from: 'Edinburgh', to: 'Oslo',
        transportType: 'flight',
        label: 'EDI → OSL', distance: '1,680 km', duration: '2h 15m', vehicle: 'Ryanair / Norwegian',
        waypoints: [],
      },
      // ── Norway ────────────────────────────────────────────────────────────────
      {
        id: 'oslo-bergen-train', tripId: 'norway2028',
        from: 'Oslo', to: 'Bergen',
        transportType: 'train',
        label: 'Bergen Railway (Bergensbanen)', distance: '480 km', duration: '7h', vehicle: 'Vy Train',
        waypoints: [
          [59.9139, 10.7522],  // Oslo S
          [60.3688, 10.4908],  // Hønefoss
          [60.5933,  8.7640],  // Geilo
          [60.6274,  6.4187],  // Voss
          [60.5264,  6.0000],  // Vaksdal
          [60.3913,  5.3221],  // Bergen
        ],
      },
      {
        id: 'bergen-flam-ferry', tripId: 'norway2028',
        from: 'Bergen', to: 'Flåm',
        transportType: 'ferry', highlight: true,
        label: 'Nærøyfjord UNESCO Cruise', distance: '~175 km by water', duration: '5h 30m', vehicle: 'Fjord Ferry',
        waypoints: [
          [60.3913,  5.3221],  // Bergen
          [60.5833,  6.1000],  // Osterfjord
          [60.7500,  6.6000],  // Sognefjord approach
          [60.8782,  6.8326],  // Gudvangen (Nærøyfjord head)
          [60.8634,  7.1204],  // Flåm
        ],
      },
      {
        id: 'flam-railway', tripId: 'norway2028',
        from: 'Flåm', to: 'Myrdal',
        transportType: 'train',
        label: 'Flåmsbana Scenic Railway', distance: '20 km', duration: '55m', vehicle: 'Flåmsbana',
        waypoints: [
          [60.8634,  7.1204],  // Flåm
          [60.8702,  7.1013],  // Myrdal (Bergen Railway junction)
        ],
      },
      {
        id: 'flam-geiranger-bus', tripId: 'norway2028',
        from: 'Flåm', to: 'Geiranger',
        transportType: 'bus',
        label: 'Flåm → Geiranger via Hellesylt', distance: '~170 km (road + ferry)', duration: '3h 30m', vehicle: 'Regional Bus + Ferry',
        waypoints: [
          [60.8634,  7.1204],  // Flåm
          [61.1000,  7.0500],  // Lærdal / E16
          [61.7500,  6.8500],  // Hellesylt
          [62.1007,  7.2063],  // Geiranger
        ],
      },
      {
        id: 'geiranger-oslo-drive', tripId: 'norway2028',
        from: 'Geiranger', to: 'Oslo',
        transportType: 'rental_car', highlight: true,
        label: 'Norwegian Fjord Drive + Trollstigen', mapLabel: 'Trollstigen + E136',
        distance: '580 km', duration: '8h 30m', vehicle: 'Rental Car (Eagle Road + E136 + E6)',
        waypoints: [
          [62.1007,  7.2063],  // Geiranger
          [62.2133,  7.1833],  // Eidsdal (Eagle Road top)
          [62.2117,  7.0667],  // Linge (after Eidsdal–Linge ferry)
          [62.4569,  7.6669],  // Trollstigen
          [62.5683,  7.6869],  // Åndalsnes
          [62.0736,  9.1304],  // Dombås (E136 → E6)
          [61.1153, 10.4664],  // Lillehammer
          [59.9139, 10.7522],  // Oslo
        ],
      },
    ],
  },

  itinerary: [
    { days: '1–3',  city: 'Edinburgh',    country: 'scotland',   nights: 3, transport: 'Flight BLR → EDI via FRA (Lufthansa / Air India)',   highlights: ['Edinburgh Castle + Royal Mile', 'Arthur\'s Seat (Holyrood Park)', 'Calton Hill panorama at dusk', 'Greyfriars Kirkyard', 'Victoria Street', 'Scotch Whisky Experience', 'Grassmarket'] },
    { days: '4–5',  city: 'Glencoe',      country: 'scotland',   nights: 2, transport: 'Rental car — A82 Scottish Highlands Drive',           highlights: ['Glencoe Valley + Three Sisters', 'Rannoch Moor desolation', 'Neptune\'s Staircase lock flight (Banavie)', 'Ben Nevis viewpoint near Fort William'] },
    { days: '6–7',  city: 'Isle of Skye', country: 'scotland',   nights: 2, transport: 'Rental car — A87 Road to the Isles via Eilean Donan', highlights: ['Old Man of Storr', 'Kilt Rock + Mealt Falls', 'Fairy Pools (Black Cuillin)', 'Portree Harbour coloured houses', 'Dunvegan Castle', 'Talisker Distillery'] },
    { days: '8–9',  city: 'Oslo',         country: 'norway2028', nights: 2, transport: 'Flight EDI → OSL (Ryanair / Norwegian, ~2 hrs)',      highlights: ['Oslo Opera House roof walk', 'Vigeland Sculpture Park', 'Akershus Fortress', 'Aker Brygge waterfront', 'MUNCH Museum', 'Barcode district at night'] },
    { days: '10–11',city: 'Bergen',        country: 'norway2028', nights: 2, transport: 'Bergen Railway (Bergensbanen) — 7 hrs, book months ahead', highlights: ['Bryggen Wharf (UNESCO)', 'Fløibanen Funicular panorama', 'Fish Market (Fisketorget)', 'KODE Art Museums', 'Bergen Old Town alleys'] },
    { days: '12',   city: 'Flåm',         country: 'norway2028', nights: 1, transport: 'Nærøyfjord UNESCO ferry from Bergen (5.5 hrs)',       highlights: ['Nærøyfjord UNESCO cruise', 'Flåmsbana steepest railway (55 min)', 'Stegastein viewpoint (650m above fjord)'] },
    { days: '13–15',city: 'Geiranger',     country: 'norway2028', nights: 2, transport: 'Bus Flåm → Geiranger via Hellesylt (~3.5 hrs)',       highlights: ['Geirangerfjord + Seven Sisters waterfall', 'Eagle Road (Ørnesvingen)', 'Trollstigen serpentine road', 'Dalsnibba glacier viewpoint', 'Return drive to Oslo'] },
  ],

  stays: [
    {
      country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', tripId: 'scotland',
      cities: [
        { city: 'Edinburgh',    type: 'Hostel / Budget Hotel',  nights: 3, note: 'Old Town walking distance — Royal Mile, Grassmarket, Greyfriars' },
        { city: 'Glencoe',      type: 'Cabin / Self-catering',  nights: 2, note: 'In the valley — dramatic Highland setting, no en-suite frills needed' },
        { city: 'Portree (Skye)', type: 'B&B',                  nights: 2, note: 'Portree Harbour — colourful waterfront, central for Storr + Fairy Pools' },
      ],
    },
    {
      country: 'Norway', flag: '🇳🇴', tripId: 'norway2028',
      cities: [
        { city: 'Oslo',      type: 'Hotel',              nights: 2, note: 'City centre — Aker Brygge / Vika area, walkable to Opera House' },
        { city: 'Bergen',    type: 'Hotel',              nights: 2, note: 'Near Bryggen Wharf — morning walk before crowds arrive' },
        { city: 'Flåm',      type: 'Guesthouse',         nights: 1, note: 'Small fjord village — book 6+ months ahead for summer season' },
        { city: 'Geiranger', type: 'Hotel / Guesthouse', nights: 2, note: 'Above fjord for panoramic Seven Sisters views at golden hour' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      items: [
        { name: 'Harris Tweed wallet or cap', where: 'Tweed shops on Royal Mile or Skye gift shops' },
        { name: 'Talisker whisky miniature', where: 'Talisker Distillery gift shop (Isle of Skye)' },
        { name: 'Thistle or bagpipe fridge magnet', where: 'Royal Mile souvenir shops, Edinburgh Castle shop' },
        { name: 'Shortbread tin (Walker\'s or Mrs Tilly\'s)', where: 'Any supermarket or Edinburgh Waverley station' },
      ],
    },
    {
      country: 'Norway', flag: '🇳🇴',
      items: [
        { name: 'Troll figurine', where: 'Bergen gift shops near Bryggen Wharf' },
        { name: 'Norwegian wool socks (Devold / Dale of Norway)', where: 'Outdoor shops in Bergen or Oslo' },
        { name: 'Nærøyfjord photo print', where: 'Flåm village artisan shops' },
        { name: 'Viking rune bracelet', where: 'Bergen Old Town craft stalls' },
      ],
    },
  ],

  bookings: [
    { id: 'sn01', label: 'Flight BLR → Edinburgh (EDI) via Frankfurt',     category: 'transport',     priority: 'critical', window: { start: '2028-02', end: '2028-06' } },
    { id: 'sn02', label: 'Flight Edinburgh (EDI) → Oslo (OSL)',             category: 'transport',     priority: 'critical', window: { start: '2028-03', end: '2028-07' } },
    { id: 'sn03', label: 'Flight Oslo (OSL) → BLR',                        category: 'transport',     priority: 'critical', window: { start: '2028-03', end: '2028-07' } },
    { id: 'sn04', label: 'UK ETA — gov.uk (Indian passport, ~₹1,000)',     category: 'document',      priority: 'critical', window: { start: '2028-08', end: '2028-10' } },
    { id: 'sn05', label: 'Schengen Visa (Norway, apply at Embassy)',        category: 'document',      priority: 'critical', window: { start: '2028-07', end: '2028-09' } },
    { id: 'sn06', label: 'Rental car Scotland (Edinburgh pickup, 4 days)',  category: 'transport',     priority: 'high',     window: { start: '2028-05', end: '2028-09' } },
    { id: 'sn07', label: 'Bergen Railway — Oslo → Bergen (Vy.no)',          category: 'transport',     priority: 'high',     window: { start: '2028-04', end: '2028-09' } },
    { id: 'sn08', label: 'Flåmsbana scenic railway ticket',                category: 'experience',    priority: 'high',     window: { start: '2028-05', end: '2028-10' } },
    { id: 'sn09', label: 'Nærøyfjord UNESCO cruise (Fjord Tours)',         category: 'experience',    priority: 'high',     window: { start: '2028-05', end: '2028-10' } },
    { id: 'sn10', label: 'Scotland accommodation (3 stops)',                category: 'accommodation', priority: 'high',     window: { start: '2028-05', end: '2028-09' } },
    { id: 'sn11', label: 'Norway accommodation (4 stops)',                  category: 'accommodation', priority: 'high',     window: { start: '2028-05', end: '2028-09' } },
    { id: 'sn12', label: 'Travel insurance (multi-country)',                category: 'document',      priority: 'critical', window: { start: '2028-09', end: '2028-10' } },
  ],

  notes: [
    'Scotland drives on the LEFT — first time for most Indian travellers. Practice in Edinburgh before the Highlands.',
    'UK ETA required for Indian passport holders. Apply at gov.uk minimum 2 weeks ahead. ~₹1,000.',
    'Book Bergen Railway (Oslo→Bergen) months in advance. Popular route, limited cheap seats.',
    'Book Flåmsbana separately — it fills fast and is not included in all rail passes.',
    'Norway in a Nutshell tours (Fjord Tours AS) bundle rail + ferry conveniently.',
    'Norway food is expensive. Budget ₹1,500–2,000 per meal in cities. Supermarkets (Rema 1000, Kiwi) are cheaper.',
    'June in Norway has near-midnight sun — bring a sleep mask for fjord guesthouses.',
    'NC500 (North Coast 500) road trip option: adds 3–4 days but covers Torridon, Ullapool, Durness.',
  ],

  practicalInfo: {
    weather: 'Scotland Oct–Nov: 6–13°C, frequent rain and wind on Skye. Pack waterproofs regardless. Norway Oct–Nov: Oslo 5–10°C, Bergen 8–12°C (wettest city in Europe), fjords colder. Northern Lights visible from October in Arctic Norway.',
    emergency: 'UK: 999 (Police/Ambulance/Fire) · Norway: 112 (Police) · 113 (Ambulance) · 110 (Fire)',
    driving: [
      'Scotland: drives on the LEFT — same as India, but single-track Highland roads with passing places are unlike anything else.',
      'Passing places are lay-bys on single-track roads — pull in to let oncoming traffic pass. Never block a passing place.',
      'A82 through Glencoe has no fuel for long stretches — fill up in Tyndrum or Bridge of Orchy.',
      'Speed cameras throughout Scotland. 60 mph on single carriageway, 70 mph on dual carriageway.',
      'Norway: drives on the RIGHT. Toll roads (E18, E6) charged electronically via AutoPASS — rental car includes transponder.',
      'Many Norwegian mountain roads (Eagle Road, Trollstigen) are seasonal — confirm open October dates before booking.',
      'Norway tunnel tolls: Geiranger area has multiple short tunnels, all tolled. Expect ~NOK 200–300 in tolls.',
    ],
    transit: [
      'Edinburgh: Lothian buses cover the city. Day ticket £4.50. Tram from airport to city centre (30 min, £7).',
      'Scotland rail: ScotRail covers Edinburgh–Glasgow–Stirling. Car essential for Highlands and Skye.',
      'Bergen Railway: buy tickets at Vy.no — first class adds panoramic viewing but standard is fine. Book 4+ months ahead.',
      'Norway in a Nutshell (Fjord Tours AS): bundles Bergen Rail + Nærøyfjord ferry + Flåmsbana into one convenient ticket.',
      'Oslo: T-bane (metro) + tram + ferry. Ruter app for tickets. Day pass NOK 105.',
    ],
    payment: [
      'Scotland: card everywhere. Contactless works in every shop, bus, and cafe. No cash needed.',
      'Norway: almost entirely cashless. Visa/Mastercard contactless accepted at fjord ferries, ski lifts, supermarkets.',
      'Budget for Norway: meals ₹1,500–2,500/person, hostel dorms ₹4,000–6,000/night, beer ₹800–1,000 at a pub.',
      'Rema 1000 and Kiwi supermarkets for budget meals — ready-made pasta, sushi, and sandwiches cheaply.',
    ],
    sim: [
      'UK SIM: Giffgaff or Three UK — buy online, deliver to India before travel. Excellent coverage across Scotland.',
      'Norway SIM: Telenor or Telia at Oslo airport. One of Europe\'s most expensive — budget NOK 300 (~₹2,500) for 30 days data.',
      'Norwegian fjords have surprisingly good LTE coverage. Dead zones only deep in valleys like Aurland.',
      'Roaming on a UK SIM works in Norway for short periods — check your UK carrier\'s European roaming policy.',
    ],
    etiquette: [
      'Scotland: extremely friendly — strike up conversations in pubs. Whisky dram customs: accept one if offered at a distillery.',
      'Dram culture: it\'s rude to refuse a dram (small measure) of whisky offered as hospitality.',
      'Norway: quieter culture — don\'t expect small talk from strangers. Respect the Allemannsretten (freedom to roam) on nature.',
      'Queuing in Norway is more relaxed than the UK — just take a ticket number at delis and fish markets.',
      'Fjord noise: keep voices down on early morning ferry crossings — wildlife disturbance is taken seriously.',
    ],
  },

  foodHighlights: [
    {
      city: 'Edinburgh',
      must: [
        { dish: 'Haggis, neeps and tatties', note: 'Traditional Scottish dish — sheep offal with turnip and potato. Try at The Scotsman or Deacon Brodie\'s Tavern on Royal Mile.' },
        { dish: 'Scotch pie at Greggs', note: 'Humble but essential — pastry filled with minced mutton. ₹80 equivalent from any Scottish bakery.' },
        { dish: 'Whisky flight at Scotch Whisky Experience', note: '4 drams from different regions. Islay (smoky), Speyside (fruity), Highlands (floral), Lowlands (light).' },
        { dish: 'Cranachan dessert', note: 'Cream, oats, raspberries, and whisky — Scotland\'s national dessert. Available at most Edinburgh restaurants.' },
      ],
    },
    {
      city: 'Isle of Skye',
      must: [
        { dish: 'Fresh crab sandwich', note: 'The Seafood Shack at Portree or The Old Inn at Carbost — local caught crab, brown bread, salted butter.' },
        { dish: 'Talisker whisky neat', note: 'Buy at the distillery shop after the tour. Peaty, coastal — drink without ice to appreciate the terroir.' },
      ],
    },
    {
      city: 'Bergen',
      must: [
        { dish: 'Fisketorget (Fish Market)', note: 'Outdoor market by Bryggen Wharf. Try smoked salmon, king crab claws, and fish soup (fiskesuppe) for ~NOK 150.' },
        { dish: 'Raspeballer (potato dumplings)', note: 'Bergen Thursday special — heavy, filling, served with bacon and swede. Local workers\' dish.' },
        { dish: 'Waffle with brown cheese (brunost)', note: 'Fløyen café at the top of the funicular. Brunost (caramelised whey cheese) tastes like butterscotch.' },
      ],
    },
    {
      city: 'Oslo',
      must: [
        { dish: 'Smørbrød (open sandwich) at Aker Brygge', note: 'Rye bread topped with shrimp, smoked salmon, or roast beef. Oslo\'s working lunch staple.' },
        { dish: 'Kjøttkaker (Norwegian meatballs)', note: 'Café Skansen or Theatercaféen. Lighter than Swedish meatballs, served with gravy and lingonberry.' },
      ],
    },
    {
      city: 'Flåm / Geiranger',
      must: [
        { dish: 'Fjord shrimp fresh off the boat', note: 'Ask at the Flåm harbour — small vessels sell daily catch directly. Peel and eat with bread.' },
        { dish: 'Kvæfjordkake (world\'s best cake)', note: 'Almond meringue and custard cream cake. Available at most Norwegian cafés and bakeries.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Old Man of Storr, Isle of Skye', tip: 'Hike from the car park at dawn (1 hr up). The pinnacles emerge from cloud at first light — misty and dramatic.', timing: 'Dawn' },
    { location: 'Glencoe Valley (Three Sisters viewpoint)', tip: 'Pull off the A82 at the main Three Sisters lay-by. Evening light hits the valley walls 2 hrs before sunset.', timing: 'Late afternoon' },
    { location: 'Eilean Donan Castle', tip: 'Shoot from the stone bridge approach. Calm mornings reflect the castle in the loch. Arrive before 9 AM.', timing: 'Morning' },
    { location: 'Stegastein Viewpoint (Aurlandsvangen)', tip: '650m above Aurlandsfjord — the wooden cantilevered platform is the frame. Shoot down the fjord at midday.', timing: 'Midday (fjord in full sun)' },
    { location: 'Geirangerfjord from Eagle Road (Ørnesvingen)', tip: 'The hairpin bends above the fjord give 11 different vantage points. Shoot downward into the cruise ships.', timing: 'Any clear day' },
    { location: 'Bryggen Wharf, Bergen', tip: 'Shoot the coloured wooden buildings from the wharf side. Best light is west-facing late afternoon.', timing: 'Late afternoon' },
    { location: 'Nærøyfjord from the ferry', tip: 'Stand at the bow and shoot ahead into the narrowing fjord walls. The narrowest point (250m wide) is the hero shot.', timing: 'Any time on the cruise' },
  ],
}
