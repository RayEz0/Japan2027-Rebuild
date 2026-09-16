// Arc 03 — Italy + Greece (2029)

export const ARC_03 = {
  tripOrder: ['italy', 'greece'],

  itinerary: [
    { days: '1–3',  city: 'Rome',         country: 'italy',  nights: 3, transport: 'Flight BLR → FCO (direct or via Dubai)',         highlights: ['Colosseum + Roman Forum', 'Vatican Museums + Sistine Chapel', 'Trevi Fountain', 'Pantheon', 'Piazza Navona', 'Trastevere evening walk'] },
    { days: '4–5',  city: 'Florence',     country: 'italy',  nights: 2, transport: 'Trenitalia Frecciarossa (1.5 hrs)',               highlights: ['Uffizi Gallery', 'Duomo + Brunelleschi\'s Dome', 'Ponte Vecchio', 'Piazzale Michelangelo sunset', 'Mercato Centrale'] },
    { days: '6',    city: 'Tuscany',      country: 'italy',  nights: 1, transport: 'Rental car from Florence',                       highlights: ['Chianti wine region drive', 'San Gimignano towers', 'Siena Piazza del Campo', 'Val d\'Orcia rolling hills'] },
    { days: '7',    city: 'Lake Como',    country: 'italy',  nights: 1, transport: 'Train Florence → Milan → Como (2.5 hrs)',         highlights: ['Como waterfront', 'Bellagio ferry', 'Villa del Balbianello', 'Varenna village'] },
    { days: '8–9',  city: 'Dolomites',    country: 'italy',  nights: 2, transport: 'Rental car from Milan or Verona (2 hrs)',         highlights: ['Tre Cime di Lavaredo', 'Cortina d\'Ampezzo', 'Misurina Lake', 'Passo Giau panorama', 'Cinque Torri'] },
    { days: '10–11',city: 'Amalfi Coast', country: 'italy',  nights: 2, transport: 'Train to Naples → local bus / ferry (3 hrs)',    highlights: ['Amalfi town + Cathedral', 'Positano cliffside streets', 'Ravello panoramic gardens', 'Path of the Gods hike', 'Limoncello tasting'], highlight: 'Amalfi Coast Scenic Drive' },
    { days: '12',   city: 'Monaco',       country: 'italy',  nights: 1, transport: 'Train Napoli → Roma → Monaco (5 hrs)',           highlights: ['Casino de Monte-Carlo', 'Prince\'s Palace', 'Port Hercule superyachts', 'Exotic Garden cliff walk'] },
    { days: '13–15',city: 'Athens',       country: 'greece', nights: 3, transport: 'Flight Monaco (NCE) → ATH (2 hrs)',             highlights: ['Acropolis + Parthenon', 'Acropolis Museum', 'Plaka neighbourhood', 'Monastiraki flea market', 'Cape Sounion sunset', 'Lycabettus Hill viewpoint'] },
    { days: '16–18',city: 'Santorini',    country: 'greece', nights: 3, transport: 'Ferry ATH (Piraeus) → Santorini (8 hrs) or flight (45 min)', highlights: ['Oia sunset caldera view', 'Fira walking path to Oia', 'Akrotiri archaeological site', 'Red Beach + White Beach', 'Caldera boat tour', 'Ammoudi Bay fish dinner'] },
    { days: '19–21',city: 'Meteora',      country: 'greece', nights: 3, transport: 'Ferry → Athens → train to Kalambaka (4.5 hrs)', highlights: ['Great Meteoron Monastery (oldest, 14th century)', 'Varlaam Monastery + frescoes', 'Rousanou Monastery at sunrise', 'Hiking trails between monasteries', 'Kalambaka old town'] },
  ],

  transport: [
    { type: 'Flight',     icon: '✈️', segment: 'BLR → Rome (FCO)',       detail: 'Direct or via Dubai/Abu Dhabi. ~8–12 hrs.' },
    { type: 'Train',      icon: '🚂', segment: 'Rome → Florence',         detail: 'Trenitalia Frecciarossa high-speed. 1.5 hrs. Book italotreno.it.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Tuscany Wine Country',   detail: 'Car required for Chianti and Val d\'Orcia. 1 day.', highlight: 'Tuscany Scenic Drive' },
    { type: 'Train',      icon: '🚂', segment: 'Florence → Lake Como',   detail: 'Via Milan. 2.5 hrs. Trenitalia.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Dolomites Mountain Loop', detail: 'Car essential — bus service is limited. Passes: Giau, Falzarego, Pordoi.', highlight: 'Dolomites Alpine Drive' },
    { type: 'Train',      icon: '🚂', segment: 'Dolomites → Amalfi',     detail: 'Train to Naples, then bus/taxi to Sorrento/Amalfi. 4 hrs.' },
    { type: 'Bus/Ferry',  icon: '⛴️', segment: 'Amalfi Coast Circuit',   detail: 'SITA bus (windy cliff roads) or ferry between towns.', highlight: 'Amalfi Coast Scenic Drive' },
    { type: 'Train',      icon: '🚂', segment: 'Amalfi → Monaco (NCE)',  detail: 'Train via Rome + French Riviera line. ~5 hrs.' },
    { type: 'Flight',     icon: '✈️', segment: 'Nice (NCE) → Athens',   detail: 'Ryanair / easyJet. ~2.5 hrs.' },
    { type: 'Ferry',      icon: '⛴️', segment: 'Athens (Piraeus) → Santorini', detail: 'Hellenic Seaways Blue Star. 8 hrs overnight or 5 hrs fast ferry.' },
    { type: 'Ferry',      icon: '⛴️', segment: 'Santorini → Athens',    detail: 'Return ferry + overnight in Athens before Meteora.' },
    { type: 'Train',      icon: '🚂', segment: 'Athens → Kalambaka (Meteora)', detail: 'TrainOSE. 4.5 hrs. Book hellenic-train.gr.' },
    { type: 'Flight',     icon: '✈️', segment: 'Athens (ATH) → BLR',    detail: 'Via Dubai or Doha. ~10 hrs.' },
  ],

  currencies: [
    { country: 'Italy',    code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'Cash useful at smaller towns, markets, and trattorias. ATMs widely available.' },
    { country: 'Monaco',   code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'Euro zone. Everything is expensive.' },
    { country: 'Greece',   code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'Santorini and tourist areas accept card. Carry some cash for Meteora area.' },
  ],

  highlights: [
    { tripId: 'italy',  city: 'Rome',         items: ['Colosseum', 'Vatican + Sistine Chapel', 'Trevi Fountain', 'Pantheon', 'Piazza Navona', 'Trastevere'] },
    { tripId: 'italy',  city: 'Florence',      items: ['Uffizi Gallery', 'Brunelleschi\'s Dome', 'Ponte Vecchio', 'Piazzale Michelangelo'] },
    { tripId: 'italy',  city: 'Tuscany',       items: ['Chianti wine roads', 'San Gimignano', 'Siena', 'Val d\'Orcia'] },
    { tripId: 'italy',  city: 'Lake Como',     items: ['Bellagio ferry', 'Villa del Balbianello', 'Varenna waterfront'] },
    { tripId: 'italy',  city: 'Dolomites',     items: ['Tre Cime di Lavaredo', 'Cinque Torri', 'Passo Giau', 'Cortina d\'Ampezzo'] },
    { tripId: 'italy',  city: 'Amalfi Coast',  items: ['Positano cliffs', 'Path of the Gods hike', 'Ravello gardens', 'Amalfi Cathedral'] },
    { tripId: 'italy',  city: 'Monaco',        items: ['Casino Monte-Carlo', 'Port Hercule yachts', 'Prince\'s Palace'] },
    { tripId: 'greece', city: 'Athens',        items: ['Acropolis + Parthenon', 'Acropolis Museum', 'Cape Sounion', 'Plaka district'] },
    { tripId: 'greece', city: 'Santorini',     items: ['Oia caldera sunset', 'Fira to Oia walk', 'Akrotiri ruins', 'Caldera boat tour'] },
    { tripId: 'greece', city: 'Meteora',       items: ['Great Meteoron Monastery', 'Varlaam Monastery', 'Rousanou sunrise', 'Inter-monastery hiking'] },
  ],

  packingNotes: [
    { category: 'Mediterranean Essentials', icon: '☀️', items: ['High-SPF sunscreen (50+) — Italian + Greek sun is intense', 'Lightweight linen or quick-dry clothing', 'Good walking shoes (cobblestone streets everywhere)', 'Reusable water bottle — tap water safe in Italy and Greece'] },
    { category: 'Mountain + Coastal Mix', icon: '🏔️', items: ['Light windbreaker for Dolomites evenings', 'Swimwear for Santorini beaches', 'Small daypack for hikes (Meteora, Dolomites trails)', 'Compact rain jacket (Amalfi/Tuscany can get afternoon rain)'] },
    { category: 'Documents', icon: '🪪', items: ['Indian e-Visa for Greece is Schengen (90 days/180 days)', 'Italy is also Schengen — same visa covers both', 'Colosseum + Vatican tickets must be booked weeks ahead'] },
  ],

  map: {
    center: [42.0, 15.0],
    zoom: 5,
    markers: [
      { id: 'rome',      name: 'Rome',         lat: 41.9028, lng: 12.4964, tripId: 'italy',  day: '1–3'   },
      { id: 'florence',  name: 'Florence',     lat: 43.7696, lng: 11.2558, tripId: 'italy',  day: '4–5'   },
      { id: 'tuscany',   name: 'Tuscany',      lat: 43.3188, lng: 11.3307, tripId: 'italy',  day: '6'     },
      { id: 'como',      name: 'Lake Como',    lat: 45.8101, lng:  9.0852, tripId: 'italy',  day: '7'     },
      { id: 'dolomites', name: 'Dolomites',    lat: 46.5404, lng: 12.1357, tripId: 'italy',  day: '8–9'   },
      { id: 'amalfi',    name: 'Amalfi Coast', lat: 40.6346, lng: 14.6025, tripId: 'italy',  day: '10–11' },
      { id: 'athens',    name: 'Athens',       lat: 37.9838, lng: 23.7275, tripId: 'greece', day: '13–15' },
      { id: 'santorini', name: 'Santorini',    lat: 36.3932, lng: 25.4615, tripId: 'greece', day: '16–18' },
      { id: 'meteora',   name: 'Meteora',      lat: 39.7217, lng: 21.6306, tripId: 'greece', day: '19–21' },
    ],
    segments: [
      // ── Italy ─────────────────────────────────────────────────────────────────
      {
        id: 'rome-florence-train', tripId: 'italy',
        from: 'Rome', to: 'Florence',
        transportType: 'train',
        label: 'Frecciarossa Alta Velocità', distance: '277 km', duration: '1h 25m', vehicle: 'Trenitalia Frecciarossa',
        waypoints: [
          [41.9009, 12.5003],  // Roma Termini
          [42.5800, 12.1500],  // Orte area (AV line passes east of Orvieto)
          [43.0600, 11.9100],  // Chiusi area
          [43.3500, 11.7000],  // Arezzo / Valdarno corridor
          [43.7696, 11.2558],  // Firenze Santa Maria Novella
        ],
      },
      {
        id: 'florence-tuscany-drive', tripId: 'italy',
        from: 'Florence', to: 'Siena (via Chianti)',
        transportType: 'rental_car', highlight: true,
        label: 'Chianti Wine Route', distance: '~120 km scenic', duration: '3h', vehicle: 'Rental Car (Chiantigiana Road)',
        // OSRM will give real road geometry through the Chianti hills
        waypoints: [
          [43.7696, 11.2558],  // Florence
          [43.5836, 11.3131],  // Greve in Chianti
          [43.4847, 11.3698],  // Radda in Chianti
          [43.3188, 11.3307],  // Siena
          [43.0566, 11.4892],  // Montalcino
          [43.0776, 11.6796],  // Pienza
          [43.1177, 11.7836],  // Montepulciano
        ],
      },
      {
        id: 'florence-como-train', tripId: 'italy',
        from: 'Florence', to: 'Lake Como',
        transportType: 'train',
        label: 'Frecciarossa + Intercity', distance: '310 km', duration: '2h 30m', vehicle: 'Trenitalia',
        waypoints: [
          [43.7696, 11.2558],  // Florence
          [44.4967, 11.3426],  // Bologna
          [45.4654,  9.1895],  // Milan Centrale
          [45.8101,  9.0852],  // Como San Giovanni
        ],
      },
      {
        id: 'como-dolomites-drive', tripId: 'italy',
        from: 'Lake Como', to: 'Dolomites',
        transportType: 'rental_car', highlight: true,
        label: 'Como → Dolomites Drive', distance: '~250 km', duration: '3h', vehicle: 'Rental Car (A4 + A22 Brenner)',
        // OSRM will route via A4 then A22 through Trento to Bolzano/Cortina
        waypoints: [
          [45.8101,  9.0852],  // Como
          [45.5477, 10.2115],  // Brescia
          [45.4299, 10.9876],  // Verona
          [46.0679, 11.1211],  // Trento (A22 Brenner autostrada north)
          [46.4983, 11.3548],  // Bolzano / Bozen
          [46.5404, 12.1357],  // Cortina d'Ampezzo
        ],
      },
      {
        id: 'dolomites-naples-train', tripId: 'italy',
        from: 'Dolomites', to: 'Naples',
        transportType: 'train',
        label: 'AV South — Bolzano → Napoli', distance: '~1,100 km', duration: '8h+', vehicle: 'Trenitalia AV',
        waypoints: [
          [46.4983, 11.3548],  // Bolzano
          [45.4654,  9.1895],  // Milan
          [44.4056,  8.9463],  // Genoa
          [41.9009, 12.5003],  // Rome Termini
          [40.8536, 14.2681],  // Naples Centrale
        ],
      },
      {
        id: 'amalfi-coast-drive', tripId: 'italy',
        from: 'Sorrento', to: 'Vietri sul Mare',
        transportType: 'rental_car', highlight: true,
        label: 'Amalfi Coast Drive — SS163', distance: '50 km', duration: '2h', vehicle: 'Rental Car / Bus (SS163)',
        // OSRM will follow the actual SS163 cliff road geometry
        waypoints: [
          [40.6264, 14.3757],  // Sorrento
          [40.6073, 14.4376],  // Meta
          [40.6174, 14.4640],  // Positano approach
          [40.6280, 14.4843],  // Positano
          [40.6292, 14.5120],  // Praiano
          [40.6348, 14.5580],  // Furore Gorge
          [40.6346, 14.6025],  // Amalfi
          [40.6531, 14.6162],  // Ravello junction
          [40.6765, 14.7295],  // Vietri sul Mare
        ],
      },
      // ── Greece ────────────────────────────────────────────────────────────────
      {
        id: 'flight-italy-greece', tripId: 'greece',
        from: 'Naples / Rome', to: 'Athens',
        transportType: 'flight', waypoints: [],
        label: 'FCO / NAP → ATH', distance: '~1,050 km', duration: '2h', vehicle: 'Aegean / Ryanair',
      },
      {
        id: 'athens-meteora-bus', tripId: 'greece',
        from: 'Athens', to: 'Meteora',
        transportType: 'bus',
        label: 'Athens → Meteora Coach', distance: '355 km', duration: '5h', vehicle: 'KTEL Coach',
        // OSRM will route via E75/A1 north then inland to Kalambaka
        waypoints: [
          [37.9838, 23.7275],  // Athens
          [38.3521, 23.6800],  // Thiva
          [38.9000, 22.4333],  // Lamia
          [39.4200, 22.2800],  // Larissa
          [39.7217, 21.6306],  // Kalambaka / Meteora
        ],
      },
      {
        id: 'athens-santorini-ferry', tripId: 'greece',
        from: 'Athens (Piraeus)', to: 'Santorini',
        transportType: 'ferry',
        label: 'Piraeus → Thira (Hellenic Seaways)', distance: '290 km', duration: '7–8h', vehicle: 'High-Speed Ferry',
        waypoints: [
          [37.9396, 23.6476],  // Piraeus port
          [37.6000, 24.3500],  // Open Aegean heading SSE
          [36.7000, 25.0000],  // Southern Cyclades
          [36.3932, 25.4615],  // Santorini (Thira port)
        ],
      },
    ],
  },

  stays: [
    {
      country: 'Italy', flag: '🇮🇹', tripId: 'italy',
      cities: [
        { city: 'Rome',         type: 'Boutique Hotel / B&B',     nights: 3, note: 'Trastevere or near Campo de\' Fiori — walkable to Colosseum, Trevi, Vatican' },
        { city: 'Florence',     type: 'Boutique Hotel',           nights: 2, note: 'Oltrarno district — less touristy, 5-min walk to Ponte Vecchio' },
        { city: 'Tuscany',      type: 'Agriturismo (farmhouse)',  nights: 1, note: 'Chianti wine estate — pool, vineyard views, authentic Tuscan dinner' },
        { city: 'Lake Como',    type: 'Lakeside Hotel',           nights: 1, note: 'Bellagio or Varenna for direct lake views' },
        { city: 'Dolomites',    type: 'Alpine Guesthouse',        nights: 2, note: 'Cortina d\'Ampezzo area — Tre Cime + Passo Giau access' },
        { city: 'Amalfi Coast', type: 'Cliffside Hotel',          nights: 2, note: 'Positano or Amalfi town — book 6 months ahead for September' },
        { city: 'Monaco',       type: 'Boutique Hotel',           nights: 1, note: 'Port Hercule area — or stay in nearby Beausoleil (French side) for better value; 5 min walk into Monaco' },
      ],
    },
    {
      country: 'Greece', flag: '🇬🇷', tripId: 'greece',
      cities: [
        { city: 'Athens',    type: 'Boutique Hotel',       nights: 3, note: 'Plaka or Monastiraki — walking distance to Acropolis and flea market' },
        { city: 'Santorini', type: 'Cave Hotel / Villa',   nights: 3, note: 'Oia caldera side — sunset views are the reason you came; price premium is worth it' },
        { city: 'Meteora',   type: 'Guesthouse (Kalambaka)', nights: 3, note: 'Kalambaka town — monastery cliffs visible from room at dawn' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'Italy', flag: '🇮🇹',
      items: [
        { name: 'Leather card holder or wallet', where: 'San Lorenzo Market or Oltrarno leather workshops, Florence' },
        { name: 'Limoncello bottle', where: 'Amalfi Coast lemon shops or Naples market' },
        { name: 'Estate-pressed olive oil (small bottle)', where: 'Tuscany agriturismo or Mercato Centrale, Florence' },
        { name: 'Vatican museum coin or stamp', where: 'Vatican Museums gift shop' },
      ],
    },
    {
      country: 'Greece', flag: '🇬🇷',
      items: [
        { name: 'Santorini volcanic stone jewellery', where: 'Oia artisan shops (avoid the souvenir strip)' },
        { name: 'Olive wood chopping board', where: 'Athens flea market (Monastiraki)' },
        { name: 'Thyme honey (dark, intense flavour)', where: 'Central Market Athens or Santorini farm shops' },
        { name: 'Evil eye (mati) keyring or wall piece', where: 'Any local gift shop — Monastiraki has the best variety' },
      ],
    },
  ],

  bookings: [
    { id: 'ig01', label: 'Flight BLR → Rome (FCO)',                   category: 'transport',     priority: 'critical', window: { start: '2029-02', end: '2029-06' } },
    { id: 'ig02', label: 'Flight Athens (ATH) → BLR',                 category: 'transport',     priority: 'critical', window: { start: '2029-02', end: '2029-06' } },
    { id: 'ig03', label: 'Schengen Visa (Italy + Greece — one visa)', category: 'document',      priority: 'critical', window: { start: '2029-05', end: '2029-07' } },
    { id: 'ig04', label: 'Colosseum skip-the-line ticket',            category: 'experience',    priority: 'critical', window: { start: '2029-06', end: '2029-09' } },
    { id: 'ig05', label: 'Vatican Museums timed entry',               category: 'experience',    priority: 'critical', window: { start: '2029-06', end: '2029-09' } },
    { id: 'ig06', label: 'Santorini hotel — Oia / Fira caldera side', category: 'accommodation', priority: 'high',     window: { start: '2029-04', end: '2029-07' } },
    { id: 'ig07', label: 'Piraeus → Santorini ferry (Blue Star)',     category: 'transport',     priority: 'high',     window: { start: '2029-06', end: '2029-09' } },
    { id: 'ig08', label: 'Amalfi Coast hotel (book far ahead)',       category: 'accommodation', priority: 'high',     window: { start: '2029-04', end: '2029-07' } },
    { id: 'ig09', label: 'Tuscany rental car (1 day)',                category: 'transport',     priority: 'medium',   window: { start: '2029-07', end: '2029-09' } },
    { id: 'ig10', label: 'Travel insurance (multi-country)',          category: 'document',      priority: 'critical', window: { start: '2029-08', end: '2029-09' } },
  ],

  notes: [
    'Book Colosseum and Vatican Museums weeks in advance — queues without tickets are 2+ hours.',
    'Schengen visa covers all countries in this arc (Italy, Monaco, Greece). One application.',
    'Amalfi Coast roads are extremely narrow — bus is safer than self-drive for the main stretch.',
    'Santorini Oia sunset is the most crowded spot in Greece — arrive 90 mins early for a good position.',
    'Meteora monastery dress code: no shorts, no bare shoulders. Sarongs available to borrow on site.',
    'Greece railway is improving but still slow — domestic flights Athens→Thessaloniki are faster.',
    'Best time: September–October (post-summer crowds, warm water, golden light).',
  ],

  practicalInfo: {
    weather: 'Italy Sep–Oct: Rome 22–28°C, Florence 18–24°C, Dolomites 5–14°C (pack layers for altitude). Amalfi Coast warm and sunny. Greece: Santorini 20–26°C and near-dry in September — peak summer crowds gone.',
    emergency: 'Italy + Monaco: 112 (unified EU emergency) · 113 (Police) · 118 (Medical). Greece: 112 or 100 (Police) · 166 (Ambulance)',
    driving: [
      'Italy drives on the RIGHT. ZTL zones (Zona Traffico Limitato) in historic centres — do NOT drive into them. Fixed cameras fine foreign plates automatically (€80–800).',
      'Autostrada tolls: Rome→Naples ~€10. Pay by credit card at unmanned lanes (fastest) or coin at manual booth.',
      'Dolomites mountain roads: Passo Giau and Stelvio are narrow with sheer drops — take your time. Fuel up before heading into the passes.',
      'Amalfi Coast (SS163): renting is possible but buses are safer. Road is 5m wide with 200m drops and blind corners.',
      'Greek roads: Athens urban driving is chaotic. Rental car on Santorini and Crete only — ferries don\'t need cars.',
    ],
    transit: [
      'Italy Trenitalia vs. Italo: both cover Rome–Florence–Venice/Milan. Italo is usually cheaper for advance booking.',
      'Roma Pass (48/72hr): metro + discounted museum entry. Worth it for Rome days 1–3.',
      'Athens metro: 3 lines cover all tourist sites. €1.20 per journey, day pass €4.50. Tap card everywhere.',
      'Greek ferries: book at ferryscanner.com or e-ferry.gr. Blue Star Ferries most reliable for Piraeus–Santorini.',
    ],
    payment: [
      'Card dominant in Italy and Greece. Contactless everywhere in cities.',
      'Carry €30–50 cash for smaller trattorias, market stalls, and Meteora village cafés.',
      'Monaco: everything is card — but everything is expensive. Budget ₹15,000+ per person per day.',
      'Santorini caldera hotels add 10–15% service charge — read the bill carefully.',
    ],
    sim: [
      'Schengen SIM roams freely across all countries. Buy a French or Italian SIM on arrival.',
      'Iliad Italy: €9.99/month, 120GB data. Best value for the Italy leg.',
      'Greek SIM: Cosmote or Vodafone. Buy at the airport or convenience stores in Athens.',
      'Coverage is excellent in all cities. Mountain areas (Dolomites, Meteora) have LTE but occasional dead zones.',
    ],
    etiquette: [
      'Italian meal pace: no rushing. Requesting the bill (il conto) is expected — it won\'t arrive uninvited.',
      'No cappuccino after noon in Italy — it marks you as a tourist. Espresso or macchiato are correct choices.',
      'Dress code at Vatican and major churches: covered shoulders and knees. Scarves are provided at entrance.',
      'Greece: never eat before 2 PM (locals eat lunch at 3–4 PM). Dinner starts at 9–10 PM.',
      'In Greece, €1–2 tip at cafés is generous. Restaurant tipping is optional — 5–10% appreciated.',
    ],
  },

  foodHighlights: [
    {
      city: 'Rome',
      must: [
        { dish: 'Cacio e Pepe', note: 'Rome\'s signature pasta — pecorino cheese and cracked black pepper only. Try at Tonnarello in Trastevere or Ristorante Roma Sparita.' },
        { dish: 'Supplì (fried rice balls)', note: 'Street food at Supplì Roma, Via di San Francesco a Ripa. Crispy outside, molten mozzarella inside.' },
        { dish: 'Artichoke alla Giudia', note: 'Jewish Quarter specialty — whole artichoke deep-fried until crispy. Nonna Betta or Piperno restaurants.' },
        { dish: 'Gelato at Giolitti', note: 'Rome\'s oldest gelateria (1900). Avoid tourist gelaterias with fluorescent mountains of cream — proper gelato is stored in covered tubs.' },
      ],
    },
    {
      city: 'Florence / Tuscany',
      must: [
        { dish: 'Bistecca alla Fiorentina', note: 'T-bone steak, 1kg minimum, served rare. Il Latini or Buca Mario. Order by weight (100g increments).' },
        { dish: 'Lampredotto panino', note: 'Florence street food — braised cow stomach in a bread roll with salsa verde. Nerbone at Mercato Centrale.' },
        { dish: 'Ribollita (Tuscan bread soup)', note: 'Thick bean and kale soup with stale bread. Any rural trattoria in the Chianti region serves this as Monday\'s lunch.' },
        { dish: 'Chianti Classico wine', note: 'Buy direct at a Greve in Chianti enoteca — vintage 2018 at cellar price (€8–15).' },
      ],
    },
    {
      city: 'Amalfi Coast',
      must: [
        { dish: 'Pizza Margherita at Da Michele, Naples', note: 'The original (1870). Two pizza types only — Margherita or Marinara. Queue and wait — it\'s always worth it.' },
        { dish: 'Scialatielli ai frutti di mare', note: 'Thick pasta with mixed seafood — Amalfi specialty. Ristorante La Caravella for a splurge.' },
        { dish: 'Sfogliatella pastry', note: 'Flaky shell-shaped pastry filled with ricotta and semolina. Buy warm from Pasticceria Pansa in Amalfi town.' },
        { dish: 'Limoncello shot', note: 'Made with Amalfi lemons (Protected Designation of Origin). Buy a bottle from a coastal farm shop — not the tourist kiosk version.' },
      ],
    },
    {
      city: 'Athens / Santorini',
      must: [
        { dish: 'Souvlaki pita at Thanasis', note: 'Monastiraki Square — grilled lamb skewers in pita with tomatoes and tzatziki. ₹300 equivalent and better than anywhere in the world.' },
        { dish: 'Spanakopita (spinach feta pie)', note: 'Grab from any bakery in Athens — the hand-held triangle version is breakfast, lunch, and midnight snack.' },
        { dish: 'Tomatokeftedes (Santorini tomato fritters)', note: 'Santorini-exclusive — local tomatoes are tiny, intense, grown in volcanic soil. Koukoumavlos restaurant or any taverna on Oia.' },
        { dish: 'Baklava from Karaköy Güllüoğlu', note: 'Greek baklava uses pistachios (not walnut). Try at Athens Central Market or any Monastiraki bakery.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Santorini, Oia caldera view', tip: 'Walk past the main viewpoint 200m north to the windmill terrace for a cleaner composition without crowds. Arrive 75 min before sunset.', timing: 'Sunset (west-facing)' },
    { location: 'Tre Cime di Lavaredo, Dolomites', tip: 'Hike the 9km loop clockwise (east start). Best morning light on the three summits 1 hr after sunrise. No cars — take the shuttle bus from Auronzo.', timing: 'Dawn–morning' },
    { location: 'Piazzale Michelangelo, Florence', tip: 'Classic Florence panorama. Shoot at blue hour from the terrace — the Arno bends perfectly under Ponte Vecchio and the Duomo from here.', timing: 'Blue hour / dawn' },
    { location: 'Meteora Monasteries', tip: 'The viewpoint above the Varlaam Monastery (south side) shows three monasteries in a single composition. Dawn mist fills the valley between the rock pillars.', timing: 'Dawn (mist season Sep–Oct)' },
    { location: 'Positano cliffs from the sea', tip: 'Hire a small boat from Positano harbor (€30/hr) for the postcard shot looking back at the coloured stacked houses on the cliff.', timing: 'Morning (light from east)' },
    { location: 'Colosseum, Rome', tip: 'Shoot from Via Sacra (approach road) — the arch of Constantine frames the Colosseum from the east. At 7 AM the road is empty.', timing: 'Golden hour after dawn' },
  ],
}
