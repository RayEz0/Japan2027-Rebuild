// Arc 08 — New Zealand (2034)
// South Island loop — Queenstown → Wanaka → Mt Cook → Tekapo → Milford Sound

export const ARC_08 = {
  tripOrder: ['newzealand'],

  itinerary: [
    { days: '1–3',  city: 'Queenstown',    country: 'newzealand', nights: 3, transport: 'Flight BLR → SIN → ZQN (Singapore Airlines / Air NZ). ~18 hrs.',  highlights: ['Skyline Gondola + luge track', 'Queenstown lakefront sunset', 'Fergburger (NZ institution — queues are worth it)', 'AJ Hackett Bungy (Kawarau Bridge — original bungy site)', 'Wakatipu lake cruise on TSS Earnslaw', 'Arrowtown gold rush village (15 min drive)'] },
    { days: '4–5',  city: 'Glenorchy',     country: 'newzealand', nights: 2, transport: 'Rental car from Queenstown (45 min on Lake Wakatipu road)',        highlights: ['Glenorchy Lagoon reflection shot (Lord of the Rings filming location)', 'Paradise valley 4WD road (private — guided tours)', 'Rob Roy Glacier Track (Matukituki Valley) — 3 hr return hike', 'Dart River wilderness jet boat', 'Rees-Dart Track starting point'] },
    { days: '6–7',  city: 'Wanaka',        country: 'newzealand', nights: 2, transport: 'Rental car via Crown Range Road (45 min, scenic)',                hints: ['That Wanaka Tree (lone willow in Lake Wanaka)', 'Roy\'s Peak sunrise hike (3 hrs — start 4 AM for sunrise)', 'Lake Wanaka lakeshore walk', 'Puzzle World (quirky roadside attraction)', 'Rippon Winery lakeside views', 'Treble Cone ski area views'], highlight: 'Crown Range Scenic Drive', highlights: ['That Wanaka Tree', 'Roy\'s Peak sunrise hike', 'Rippon Winery', 'Treble Cone views', 'Lake Wanaka shoreline', 'Puzzle World'] },
    { days: '8',    city: 'Mt Cook',       country: 'newzealand', nights: 1, transport: 'Drive via Lindis Pass + Lake Pukaki (3.5 hrs)',                    highlights: ['Aoraki / Mt Cook village (highest peak, 3,724m)', 'Hooker Valley Track (4.5 km return — glacier lake + suspension bridges)', 'Blue Glacier Lake at Hooker Valley end', 'Tasman Glacier viewpoint', 'Lake Pukaki turquoise stop en route'], highlight: 'Lindis Pass + Lake Pukaki Drive' },
    { days: '9',    city: 'Lake Tekapo',   country: 'newzealand', nights: 1, transport: 'Drive Lake Pukaki → Tekapo (30 min)',                             highlights: ['Church of the Good Shepherd at dusk', 'Stargazing at Lake Tekapo (Dark Sky Reserve — clearest skies in NZ)', 'Mt John Observatory night tour', 'Tekapo hot springs with lake view', 'Wild lupins along the lakeside (October–December)'] },
    { days: '10–12',city: 'Milford Sound', country: 'newzealand', nights: 1, transport: 'Drive via Homer Tunnel (3.5 hrs from Te Anau / 4 hrs from Queenstown)', highlights: ['Milford Sound cruise — Mitre Peak reflection', 'Stirling Falls + Bowen Falls on cruise', 'Kayak on the fiord at dawn', 'Milford Track Guided Walk (5 days — plan separately)', 'Fiordland National Park viewpoint stops on road', 'Mirror Lakes'], highlight: 'Milford Road Drive + Fiordland' },
    { days: '13–14',city: 'Te Anau',       country: 'newzealand', nights: 2, transport: 'Drive back from Milford Sound to Te Anau (1.5 hrs)',              highlights: ['Kepler Track day hike segment (Luxmore summit, 3 hrs up)', 'Te Anau Glowworm Caves evening boat tour', 'Lake Te Anau shoreline walk', 'Te Anau as base for Fiordland exploration'] },
    { days: '15–16',city: 'Queenstown',    country: 'newzealand', nights: 2, transport: 'Drive via Lumsden (2 hrs) or same route back',                   highlights: ['Final day: Cardrona distillery tasting', 'Queenstown night market (Thursdays)', 'Last Remarkables Range viewpoint drive'] },
  ],

  transport: [
    { type: 'Flight',     icon: '✈️', segment: 'BLR → Queenstown (ZQN) via Singapore', detail: 'Singapore Airlines BLR→SIN then Air NZ SIN→ZQN. ~18 hrs total.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Queenstown → South Island Self-Drive Loop', detail: 'Car rental essential — no trains in South Island. Right-hand drive (like India). Queenstown airport has all major providers.', highlight: 'New Zealand South Island Loop Drive' },
    { type: 'Scenic Drive', icon: '🛣️', segment: 'Crown Range Road (Queenstown → Wanaka)', detail: 'NZ\'s highest sealed road. 45 min, stunning views. Avoid in heavy snow/ice.', highlight: 'Crown Range — Highest Sealed Road in NZ' },
    { type: 'Scenic Drive', icon: '🛣️', segment: 'Lindis Pass + Lake Pukaki Road', detail: 'Turquoise glacial lake with Mt Cook backdrop. One of NZ\'s top viewpoints.', highlight: 'Lindis Pass + Lake Pukaki Scenic Drive' },
    { type: 'Scenic Drive', icon: '🛣️', segment: 'Milford Sound Road (Te Anau → Milford)', detail: 'Through Homer Tunnel + Fiordland. One of world\'s most dramatic road approaches. No petrol stations — fill up in Te Anau.', highlight: 'Milford Road Drive (World\'s End)' },
    { type: 'Ferry/Cruise', icon: '⛴️', segment: 'Milford Sound Cruise',           detail: 'Real Journeys or Mitre Peak Cruises. 2 hrs. Book ahead for peak season.' },
    { type: 'Flight',     icon: '✈️', segment: 'Queenstown (ZQN) → BLR',          detail: 'Via Singapore. ~18 hrs.' },
  ],

  currencies: [
    { country: 'New Zealand', code: 'NZD', symbol: 'NZ$', rateToINR: 51.20, notes: 'Card accepted almost everywhere. Carry NZ$200 cash for remote areas (Milford, Glenorchy).' },
  ],

  highlights: [
    { tripId: 'newzealand', city: 'Queenstown',  items: ['Skyline Gondola + luge', 'Kawarau Bridge Bungy (original)', 'Lake Wakatipu cruise', 'Arrowtown gold rush village', 'Remarkables Range viewpoint'] },
    { tripId: 'newzealand', city: 'Glenorchy',   items: ['Glenorchy Lagoon reflections (LOTR location)', 'Rob Roy Glacier Track', 'Dart River jet boat', 'Paradise Valley valley'] },
    { tripId: 'newzealand', city: 'Wanaka',      items: ['That Wanaka Tree', 'Roy\'s Peak sunrise hike', 'Crown Range Scenic Drive', 'Rippon Winery lakeside'] },
    { tripId: 'newzealand', city: 'Mt Cook',     items: ['Hooker Valley Track + glacier lake', 'Tasman Glacier viewpoint', 'Lake Pukaki turquoise stop'] },
    { tripId: 'newzealand', city: 'Lake Tekapo', items: ['Church of the Good Shepherd', 'Dark Sky Stargazing', 'Mt John Observatory', 'Wild lupins (Oct–Dec)'] },
    { tripId: 'newzealand', city: 'Milford Sound',items: ['Mitre Peak cruise', 'Kayak at dawn on fiord', 'Stirling + Bowen Falls', 'Homer Tunnel approach drive'] },
  ],

  packingNotes: [
    { category: 'South Island Drive Essentials', icon: '🚗', items: ['International Driving Permit (IDP) for car rental', 'NZ road rules: give way at roundabouts, 100 km/h highway limit', 'Paper road map as backup (cell coverage gaps in Fiordland)', 'Car emergency kit: tyre inflator + jumper cables (remote areas)'] },
    { category: 'Hiking + Outdoors', icon: '🥾', items: ['Waterproof hiking boots (muddy NZ trails)', '20L daypack for day hikes', 'Trekking poles for Roy\'s Peak (steep descent)', 'Rain jacket (NZ weather changes rapidly)', 'Insect repellent (sandflies in Fiordland are brutal)'] },
    { category: 'November Weather Mix', icon: '🌤️', items: ['Layers (10–20°C, variable day to day)', 'Swimwear for Tekapo hot springs', 'Warm fleece for Milford Sound mornings (cold even in summer)', 'Sunglasses + SPF 50+ (NZ UV is extremely high — ozone hole)'] },
  ],

  map: {
    center: [-44.5, 169.0],
    zoom: 7,
    markers: [
      { id: 'queenstown',  name: 'Queenstown',   lat: -45.0312, lng: 168.6626, tripId: 'newzealand', day: '1–3, 15–16' },
      { id: 'glenorchy',   name: 'Glenorchy',    lat: -44.8499, lng: 168.3803, tripId: 'newzealand', day: '4–5'        },
      { id: 'wanaka',      name: 'Wanaka',       lat: -44.7031, lng: 169.1318, tripId: 'newzealand', day: '6–7'        },
      { id: 'mtcook',      name: 'Mt Cook',      lat: -43.5949, lng: 170.1418, tripId: 'newzealand', day: '8'          },
      { id: 'tekapo',      name: 'Lake Tekapo',  lat: -43.8866, lng: 170.4756, tripId: 'newzealand', day: '9'          },
      { id: 'milford',     name: 'Milford Sound', lat: -44.6412, lng: 167.9317, tripId: 'newzealand', day: '10–12'     },
      { id: 'teanau',      name: 'Te Anau',      lat: -45.4147, lng: 167.7195, tripId: 'newzealand', day: '13–14'      },
    ],
    route: [
      [-45.0312, 168.6626], [-44.8499, 168.3803], [-44.7031, 169.1318],
      [-43.5949, 170.1418], [-43.8866, 170.4756],
      [-44.6412, 167.9317], [-45.4147, 167.7195],
      [-45.0312, 168.6626],
    ],
  },

  stays: [
    {
      country: 'New Zealand', flag: '🇳🇿', tripId: 'newzealand',
      cities: [
        { city: 'Queenstown',  type: 'Hotel / Hostel',          nights: 3, note: 'Queenstown lakefront — base for gondola, bungy, Arrowtown day trips' },
        { city: 'Glenorchy',   type: 'Lodge / Guesthouse',      nights: 2, note: 'Tiny LOTR village — absolute quiet, Dart River access' },
        { city: 'Wanaka',      type: 'Apartment / Pension',     nights: 2, note: 'Lakeside apartment — wake up to That Wanaka Tree view' },
        { city: 'Mt Cook',     type: 'Alpine Lodge',            nights: 1, note: 'Hermitage Hotel area — Hooker Valley Track starts from the village' },
        { city: 'Lake Tekapo', type: 'Lakeside Pension',        nights: 1, note: 'Dark sky reserve — book a room with clear north-facing window for stargazing' },
        { city: 'Milford Sound',type: 'Lodge (book early)',     nights: 1, note: 'The only accommodation at Milford — fills out immediately, book 6+ months out' },
        { city: 'Te Anau',     type: 'Hotel / B&B',             nights: 2, note: 'Gateway to Fiordland — glowworm cave tour departs from here' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'New Zealand', flag: '🇳🇿',
      items: [
        { name: 'Pounamu (greenstone jade) pendant', where: 'Queenstown or Hokitika artisan shops — buy direct from carver' },
        { name: 'Merino wool beanie or socks (Icebreaker)', where: 'Icebreaker flagship stores in Queenstown or Christchurch' },
        { name: 'Manuka honey (UMF 15+ or higher)', where: 'Any NZ supermarket or airport duty free' },
        { name: 'Milford Sound watercolour print', where: 'Queenstown or Te Anau artisan galleries' },
        { name: 'NZ All Blacks rugby jersey', where: 'Official All Blacks stores, Queenstown or Auckland' },
      ],
    },
  ],

  bookings: [
    { id: 'nz01', label: 'Flight BLR → Queenstown (ZQN) via Singapore',   category: 'transport',     priority: 'critical', window: { start: '2034-04', end: '2034-08' } },
    { id: 'nz02', label: 'Flight Queenstown (ZQN) → BLR via Singapore',   category: 'transport',     priority: 'critical', window: { start: '2034-04', end: '2034-08' } },
    { id: 'nz03', label: 'Rental car — South Island full loop',            category: 'transport',     priority: 'critical', window: { start: '2034-07', end: '2034-10' } },
    { id: 'nz04', label: 'Milford Sound Lodge (only option — book early)', category: 'accommodation', priority: 'critical', window: { start: '2034-03', end: '2034-07' } },
    { id: 'nz05', label: 'Milford Sound cruise (Real Journeys)',           category: 'experience',    priority: 'high',     window: { start: '2034-07', end: '2034-10' } },
    { id: 'nz06', label: 'AJ Hackett Bungy — Kawarau Bridge',             category: 'experience',    priority: 'medium',   window: { start: '2034-09', end: '2034-11' } },
    { id: 'nz07', label: 'Mt John Observatory stargazing (Tekapo)',        category: 'experience',    priority: 'medium',   window: { start: '2034-09', end: '2034-11' } },
    { id: 'nz08', label: 'Travel insurance (adventure activities)',         category: 'document',      priority: 'critical', window: { start: '2034-10', end: '2034-11' } },
  ],

  notes: [
    'Sandflies in Fiordland/Milford Sound are relentless — cover up and use repellent at all times outdoors.',
    'NZ UV index is extremely high (7–11+ in summer). SPF 50+ sunscreen every 2 hours.',
    'Book Milford Sound cruise early — popular morning cruises sell out weeks ahead.',
    'Roy\'s Peak hike: start before 4 AM for sunrise. Summit in 3 hrs. Very steep.',
    'No trains in South Island — car is the only practical way to do this route.',
    'Petrol stations are rare in Fiordland. Always fill up in Te Anau before Milford.',
    'LOTR location note: Glenorchy = Rivendell + Lothlórien area. Paradise Valley = Isengard approach.',
    'November (spring) has wildflowers + lupins around Lake Tekapo but can be unpredictable weather.',
  ],

  practicalInfo: {
    weather: 'November is NZ spring — South Island weather is volatile. Queenstown 12–18°C (can be 8°C on mountain mornings). Milford Sound receives 7,000mm of rain/year — pack full waterproof gear regardless of forecast. Tekapo 10–16°C with stable, clear nights (good for stargazing).',
    emergency: '111 (Police + Ambulance + Fire) · NZ Mountain Safety Council emergency PLB recommended for Fiordland hiking',
    driving: [
      'Drive on the LEFT in NZ. Roads are single-lane in Fiordland — take turns at passing bays.',
      'Milford Road (SH94) is subject to avalanche closure in bad weather — check NZTA before departure.',
      'Fill up in Te Anau before Milford Sound — no petrol stations within the national park.',
      'Wanaka to Haast Pass (SH6): stunning but narrow road with sharp switchbacks — allow 3 hrs for 145 km.',
      'NZ road rules: give way to vehicles on your right at uncontrolled intersections.',
    ],
    transit: [
      'No passenger trains in South Island — rental car is the only practical way to do this route.',
      'InterCity Coachlines runs Queenstown → Milford Sound → Te Anau bus day tours. Not ideal for independent travel.',
      'Milford Sound cruise: Real Journeys and Cruise Milford are the main operators. Morning cruise (7:30 AM) has the best light and fewer tour groups.',
      'Queenstown to Glenorchy: 45-min drive. No regular bus — rent a car or join a LOTR tour.',
    ],
    payment: [
      'NZ is almost entirely cashless. Paywave/contactless everywhere including petrol stations.',
      'National Park fees: Milford Sound entry is free. Some DOC huts require advance bookings (Great Walks system).',
      'Budget NZ: NZ$180–280/day (₹9,000–14,000) including accommodation, food, and petrol.',
      'Petrol is expensive by Asian standards — budget NZ$2.50/litre. Queenstown to Milford return = ~NZ$80 in fuel.',
    ],
    sim: [
      'Spark or One NZ (formerly Vodafone): buy a prepaid SIM at CHC/ZQN airport. NZ$49 for 3GB + 14 days.',
      'Coverage is excellent in Queenstown, Wanaka, and Tekapo. Milford Road and Fiordland interior have NO signal — download offline maps (maps.me or Google Maps).',
      'Starlink connectivity available at Milford Sound Lodge (the only accommodation in the park).',
    ],
    etiquette: [
      'Maori culture (Te Ao Māori): do not sit on tables, pillows, or any surface where food is prepared — these are tapu (sacred).',
      'Remove shoes before entering a Maori meeting house (wharenui).',
      'Hike the Tongariro Alpine Crossing only via authorised track — the surrounding peaks are sacred to Ngāti Tūwharetoa.',
      'NZ outdoor code: take all your rubbish out of national parks. Zero tolerance for littering in DOC-managed areas.',
    ],
  },

  foodHighlights: [
    {
      city: 'Queenstown',
      must: [
        { dish: 'Fergburger', note: 'Queenstown\'s legendary burger joint — open until 5 AM. The "Mr Big Stuff" (double beef, egg, bacon, beetroot) is the signature. Queue moves fast.' },
        { dish: 'Central Otago Pinot Noir', note: 'The Queenstown wine region produces world-class Pinot Noir. Amisfield Winery lunch (15 min from Queenstown) — NZ$55 for a 5-course shared table.' },
        { dish: 'Blue cod and chips', note: 'South Island only — blue cod is sweeter and firmer than regular cod. Fishbone Bar and Grill in central Queenstown for the best version.' },
      ],
    },
    {
      city: 'Tekapo / Aoraki region',
      must: [
        { dish: 'Tekapo Springs café breakfast', note: 'Enjoy a full NZ breakfast (eggs, avocado, local sourdough) before the Roy\'s Peak hike. Open 7 AM.' },
        { dish: 'Merino lamb rack', note: 'South Island merino sheep are grass-fed on high-country farms. Any Tekapo restaurant serves rack of lamb — order medium-rare.' },
      ],
    },
    {
      city: 'Wanaka',
      must: [
        { dish: 'Kika restaurant dinner', note: 'Wanaka\'s top restaurant — locally sourced lamb, salmon, and Central Otago vegetables. Tasting menu NZ$95. Book a week ahead.' },
        { dish: 'Wanaka Bakpaka cheese scone', note: 'The humble NZ scone — cheese and herb, served warm. Best eaten overlooking the lake at 7 AM before any hike.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Milford Sound, Mitre Peak reflection', tip: 'Shoot from the front deck of the morning cruise (Real Journeys). The peak reflects perfectly in calm water in the first hour. Rain adds moody waterfall effect.', timing: 'Morning (7:30 AM cruise)' },
    { location: 'Lake Tekapo, Church of the Good Shepherd', tip: 'Classic NZ shot — small stone church with the turquoise lake and Southern Alps. At night: Milky Way above the church (the area is a Dark Sky Reserve — no light pollution).', timing: 'Dawn or midnight (Milky Way)' },
    { location: 'Roy\'s Peak, Wanaka reflection shot', tip: 'At the peak, a small heart-shaped rock pool reflects the mountains — the most shared NZ Instagram shot. Queue is real — arrive at sunrise to get 3 mins of solitude.', timing: 'Dawn summit' },
    { location: 'Paradise Valley, Glenorchy (LOTR Isengard)', tip: 'Drive to Paradise Station (unsealed road, 17 km from Glenorchy). The beech forest and mountain backdrop is Isengard from Two Towers. Early morning mist.', timing: 'Dawn mist' },
    { location: 'Roys Bay, Wanaka "that tree"', tip: 'The lone willow tree in Lake Wanaka is NZ\'s most photographed tree. Shoot from shore with a wide lens at golden hour. Winter: tree is bare and more graphic.', timing: 'Golden hour' },
  ],
}
