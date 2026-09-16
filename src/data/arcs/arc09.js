// Arc 09 — USA + Portugal (2035)
// West Coast USA road trip → Lisbon + Douro Valley

export const ARC_09 = {
  tripOrder: ['usa', 'portugal'],

  itinerary: [
    { days: '1–3',  city: 'Los Angeles',     country: 'usa',      nights: 3, transport: 'Flight BLR → LAX (Emirates / Qatar / United). ~18 hrs.',       highlights: ['Griffith Observatory + Hollywood sign viewpoint', 'Venice Beach boardwalk', 'Getty Center (free, stunning architecture)', 'Runyon Canyon sunrise hike', 'Grand Central Market DTLA', 'In-N-Out Burger Double Double (ritual)', 'Santa Monica Pier sunset'] },
    { days: '4–5',  city: 'Joshua Tree / Palm Springs', country: 'usa', nights: 2, transport: 'Rental car from LAX — 2 hrs east via I-10',             highlights: ['Joshua Tree National Park at dawn (alien landscape)', 'Hidden Valley Trail bouldering', 'Skull Rock formation', 'Cholla Cactus Garden', 'Palm Springs mid-century modern architecture tour', 'Aerial Tramway to San Jacinto summit (views to Salton Sea)'] },
    { days: '6–7',  city: 'San Diego',        country: 'usa',      nights: 2, transport: 'Rental car from Palm Springs (2.5 hrs south via I-10/I-15)', highlights: ['Balboa Park (15 world-class museums + Spanish baroque architecture)', 'Old Town San Diego — first settlement in CA', 'Gaslamp Quarter', 'Coronado Island bridge drive + Hotel del Coronado', 'Torrey Pines State Reserve cliff trails', 'Convoy District ramen + boba'] },
    { days: '8–10', city: 'San Francisco',    country: 'usa',      nights: 3, transport: 'Flight San Diego → SFO (1.5 hrs) — skip LA freeway crawl',   highlights: ['Golden Gate Bridge walk (from Vista Point to Sausalito end)', 'Alcatraz island night tour (book early)', 'Muir Woods old-growth redwoods (arrive before 9 AM)', 'Mission Dolores Park + burritos on Valencia St', 'Cable car on Powell-Hyde line', 'Ferry Building Farmer\'s Market (Saturday morning)', 'Bay Area sunset from Marin Headlands'] },
    { days: '11–12',city: 'Highway 1 Coast',  country: 'usa',      nights: 2, transport: 'Rental car — Big Sur coastal drive (4–5 hrs, no rushing)',   highlights: ['Bixby Creek Bridge (most photographed in CA)', 'McWay Falls (waterfall onto beach cove)', 'Pfeiffer Big Sur State Park redwoods + river', 'Elephant seal colony at Piedras Blancas', 'Hearst Castle viewpoint (optional)', 'Morro Rock at sunset'], highlight: 'Pacific Coast Highway — California\'s Greatest Drive' },
    { days: '13–14',city: 'Las Vegas',         country: 'usa',      nights: 2, transport: 'Flight SLO or SBA → LAS (or drive Bakersfield → Las Vegas)',  highlights: ['The Strip walk at midnight', 'Bellagio fountains show', 'Fremont Street Experience (old downtown)', 'High Roller observation wheel', 'Secret Pizza (11th floor Palazzo — no sign, cash only)', 'Day trip: Valley of Fire State Park (red Aztec sandstone formations)'] },
    { days: '15–16',city: 'Grand Canyon',      country: 'usa',      nights: 2, transport: 'Rental car from Las Vegas (4 hrs via US-93 and AZ-64)',      highlights: ['South Rim sunrise at Mather Point', 'Rim Trail walk (west to Hermits Rest)', 'Bright Angel Trail first 3 miles descent into canyon', 'Desert View Watchtower at eastern rim', 'Grand Canyon Village historic buildings'], highlight: 'Grand Canyon South Rim + Rim Trail' },
    { days: '17–19',city: 'Lisbon',            country: 'portugal', nights: 3, transport: 'Flight LAS → LIS via NYC/London (~14 hrs)',                   highlights: ['Alfama district — steep tram 28 ride', 'Belém Tower + Jerónimos Monastery (UNESCO)', 'Pastéis de Belém egg tart at the original café (1837)', 'LX Factory Sunday market', 'Miradouro da Graça sunrise viewpoint', 'Sintra palaces day trip (Pena Palace + Quinta da Regaleira)', 'Time Out Market Cais do Sodré — 40 chefs, 1 hall'] },
    { days: '20–21',city: 'Porto',             country: 'portugal', nights: 2, transport: 'AP train Lisbon → Porto (3 hrs)',                            highlights: ['Ribeira waterfront + Dom Luís I double-decker bridge', 'Port wine cellar tasting tour in Vila Nova de Gaia (Taylor\'s or Sandeman)', 'Livraria Lello bookshop (claimed inspiration for Harry Potter)', 'Clérigos Tower panorama', 'Francesinha sandwich at Café Santiago', 'Matosinhos seafood — best grilled fish in Portugal'] },
    { days: '22',   city: 'Douro Valley',      country: 'portugal', nights: 1, transport: 'Rental car from Porto (1.5 hrs via IP4)',                    highlights: ['Terraced quintas vineyard drives (Quinta do Crasto, Quinta de la Rosa)', 'Douro river valley panorama from São Salvador do Mundo viewpoint', 'Wine tasting at quinta with river view', 'Pinhão village — the heart of port wine country'], highlight: 'Douro Valley Wine Country Drive' },
  ],

  transport: [
    { type: 'Flight',     icon: '✈️', segment: 'BLR → Los Angeles (LAX)',         detail: 'Emirates via Dubai (~17 hrs) or Qatar via Doha (~18 hrs). One-way into LAX.' },
    { type: 'Rental Car', icon: '🚗', segment: 'LAX → Joshua Tree → San Diego',    detail: 'Pickup at LAX airport. Right-hand drive (same as India). Freeways are vast — avoid rush hour.', highlight: 'Southern California Desert Drive' },
    { type: 'Flight',     icon: '✈️', segment: 'San Diego → San Francisco',        detail: 'Alaska Airlines or Southwest. 1.5 hrs. Avoids 8-hr drive through LA.' },
    { type: 'Rental Car', icon: '🚗', segment: 'San Francisco → Big Sur → SLO',   detail: 'PCH / Highway 1. ~200 km, allow full day with stops.', highlight: 'Pacific Coast Highway — Big Sur' },
    { type: 'Flight',     icon: '✈️', segment: 'San Luis Obispo → Las Vegas (LAS)', detail: 'Southwest. 1 hr. Or Bakersfield Amtrak + bus (budget option).' },
    { type: 'Rental Car', icon: '🚗', segment: 'Las Vegas → Grand Canyon',         detail: '4 hrs via US-93 to I-40 to AZ-64. No trains — car essential.', highlight: 'Las Vegas → Grand Canyon Road Trip' },
    { type: 'Flight',     icon: '✈️', segment: 'Las Vegas (LAS) → Lisbon (LIS)',   detail: 'Via New York (JFK) or London (LHR). ~14–16 hrs total.' },
    { type: 'Train',      icon: '🚂', segment: 'Lisbon (Santa Apolónia) → Porto',  detail: 'CP Alfa Pendular. 3 hrs. Book at cp.pt.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Porto → Douro Valley → Porto',     detail: '1.5 hrs each way. Scenic IP4 highway transitions to mountain roads at Régua.', highlight: 'Douro Valley Wine Country Drive' },
    { type: 'Flight',     icon: '✈️', segment: 'Porto (OPO) → BLR',               detail: 'Via Lisbon + Dubai or Doha. ~16 hrs total.' },
  ],

  currencies: [
    { country: 'United States', code: 'USD', symbol: '$',  rateToINR: 84.20, notes: 'Card everywhere. Tipping culture: 18–20% at restaurants, $2–3/bag at hotels. ATMs abundant.' },
    { country: 'Portugal',      code: 'EUR', symbol: '€',  rateToINR: 93.50, notes: 'Card widely accepted. Carry €30 cash for small cafés, pastéis, and Douro Valley wineries.' },
  ],

  highlights: [
    { tripId: 'usa',      city: 'Los Angeles',  items: ['Griffith Observatory', 'Venice Beach', 'Getty Center', 'Grand Central Market', 'Santa Monica sunset'] },
    { tripId: 'usa',      city: 'Joshua Tree',  items: ['Joshua Tree NP at dawn', 'Hidden Valley Trail', 'Skull Rock', 'Palm Springs modern architecture'] },
    { tripId: 'usa',      city: 'San Francisco', items: ['Golden Gate Bridge walk', 'Alcatraz night tour', 'Muir Woods redwoods', 'Ferry Building Saturday market'] },
    { tripId: 'usa',      city: 'Big Sur',       items: ['Bixby Creek Bridge', 'McWay Falls cove', 'Pfeiffer Big Sur redwoods', 'Elephant seal colony'] },
    { tripId: 'usa',      city: 'Las Vegas',     items: ['Strip midnight walk', 'Bellagio fountains', 'Fremont Street', 'Valley of Fire day trip'] },
    { tripId: 'usa',      city: 'Grand Canyon',  items: ['Mather Point sunrise', 'Rim Trail walk', 'Bright Angel Trail descent', 'Desert View Watchtower'] },
    { tripId: 'portugal', city: 'Lisbon',        items: ['Alfama + Tram 28', 'Jerónimos Monastery', 'Pastéis de Belém (original 1837 café)', 'Sintra Pena Palace', 'LX Factory'] },
    { tripId: 'portugal', city: 'Porto',         items: ['Ribeira waterfront', 'Port wine cellars (Vila Nova de Gaia)', 'Livraria Lello bookshop', 'Francesinha sandwich'] },
    { tripId: 'portugal', city: 'Douro Valley',  items: ['Terraced quintas vine panoramas', 'São Salvador viewpoint', 'Wine tasting at riverside quinta', 'Pinhão village'] },
  ],

  packingNotes: [
    { category: 'USA Road Trip Kit', icon: '🚗', items: ['International Driving Permit (IDP) for US rental', 'Offline Google Maps downloaded before driving (mountain areas lose signal)', 'Credit card with no foreign transaction fees (US rental cars often charge via CC)', 'Dash cam (useful for PCH + Grand Canyon drives)', 'Portable charger — long drives with no outlets'] },
    { category: 'California + Desert', icon: '🌵', items: ['SPF 50+ sunscreen (California sun is unrelenting)', 'Sunglasses + sun hat for Grand Canyon / Joshua Tree', 'Light breathable layers (coastal SF is 14°C even in summer)', 'Desert hiking shoes with ankle support for Grand Canyon trail descent'] },
    { category: 'Portugal Essentials', icon: '🇵🇹', items: ['Comfortable walking shoes for Lisbon hills (steep cobblestones)', 'Scarf for Lisbon evenings (cooler than expected)', 'Passport for airport and some wine cellars', 'Sintra: book Pena Palace timed tickets online weeks ahead'] },
  ],

  map: {
    center: [36.0, -40.0],
    zoom: 3,
    markers: [
      { id: 'losangeles',  name: 'Los Angeles',  lat: 34.0522, lng: -118.2437, tripId: 'usa',      day: '1–3'   },
      { id: 'joshuatree',  name: 'Joshua Tree',  lat: 33.8734, lng: -115.9010, tripId: 'usa',      day: '4–5'   },
      { id: 'sandiego',    name: 'San Diego',    lat: 32.7157, lng: -117.1611, tripId: 'usa',      day: '6–7'   },
      { id: 'sanfrancisco',name: 'San Francisco',lat: 37.7749, lng: -122.4194, tripId: 'usa',      day: '8–10'  },
      { id: 'bigsur',      name: 'Big Sur',      lat: 36.2704, lng: -121.8081, tripId: 'usa',      day: '11–12' },
      { id: 'lasvegas',    name: 'Las Vegas',    lat: 36.1699, lng: -115.1398, tripId: 'usa',      day: '13–14' },
      { id: 'grandcanyon', name: 'Grand Canyon', lat: 36.0544, lng: -112.1401, tripId: 'usa',      day: '15–16' },
      { id: 'lisbon',      name: 'Lisbon',       lat: 38.7223, lng:   -9.1393, tripId: 'portugal', day: '17–19' },
      { id: 'porto',       name: 'Porto',        lat: 41.1579, lng:   -8.6291, tripId: 'portugal', day: '20–21' },
      { id: 'douro',       name: 'Douro Valley', lat: 41.1700, lng:   -7.7900, tripId: 'portugal', day: '22'    },
    ],
    route: [
      [ 34.0522, -118.2437], [ 33.8734, -115.9010], [ 32.7157, -117.1611],
      [ 37.7749, -122.4194], [ 36.2704, -121.8081], [ 36.1699, -115.1398],
      [ 36.0544, -112.1401], [ 38.7223,   -9.1393], [ 41.1579,   -8.6291],
      [ 41.1700,   -7.7900],
    ],
  },

  stays: [
    {
      country: 'United States', flag: '🇺🇸', tripId: 'usa',
      cities: [
        { city: 'Los Angeles',   type: 'Hotel',              nights: 3, note: 'Silver Lake, Los Feliz or Santa Monica — rent a car day 1, parking at hotel' },
        { city: 'Joshua Tree',   type: 'Desert Cabin',       nights: 2, note: 'Off-grid cabin near 29 Palms — dark sky stargazing from the porch' },
        { city: 'San Diego',     type: 'Hotel',              nights: 2, note: 'Gaslamp Quarter or Little Italy — walkable food district' },
        { city: 'San Francisco', type: 'Hotel / Hostel',     nights: 3, note: 'Mission District or Union Square — BART to Golden Gate, ferry to Sausalito' },
        { city: 'Big Sur',       type: 'Cabin / Glamping',   nights: 2, note: 'Pfeiffer Big Sur State Park area — book flexible (PCH closures possible)' },
        { city: 'Las Vegas',     type: 'Strip Hotel',        nights: 2, note: 'On The Strip — choose a mid-size hotel; casino noise is a real trade-off' },
        { city: 'Grand Canyon',  type: 'South Rim Lodge',    nights: 2, note: 'Bright Angel Lodge on the rim — book a year ahead; sells out immediately' },
      ],
    },
    {
      country: 'Portugal', flag: '🇵🇹', tripId: 'portugal',
      cities: [
        { city: 'Lisbon',       type: 'Boutique Hotel',   nights: 3, note: 'Alfama or LX Factory area — uphill tram rides and fado evenings' },
        { city: 'Porto',        type: 'Hotel',             nights: 2, note: 'Ribeira waterfront or Bonfim — wine cellars across the bridge in Vila Nova de Gaia' },
        { city: 'Douro Valley', type: 'Quinta (vineyard)', nights: 1, note: 'Stay at a quinta with its own wine cellar — sunset over the river terraces' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'United States', flag: '🇺🇸',
      items: [
        { name: 'National Park passport + stamps', where: 'Grand Canyon visitor centre — stamp + booklet' },
        { name: 'In-N-Out Burger merch (T-shirt / cap)', where: 'In-N-Out locations, California (not sold online)' },
        { name: 'Joshua Tree or Grand Canyon enamel pin set', where: 'National Park gift shops' },
        { name: 'Muir Woods redwood seedling kit', where: 'Muir Woods visitor shop' },
      ],
    },
    {
      country: 'Portugal', flag: '🇵🇹',
      items: [
        { name: 'Azulejo painted tile (hand-made)', where: 'Alfama tile workshops or LX Factory market, Lisbon' },
        { name: 'Port wine bottle (Taylor\'s or Sandeman)', where: 'Vila Nova de Gaia wine cellars, Porto' },
        { name: 'Pastéis de Nata pastry box (vacuum-sealed)', where: 'Pastéis de Belém original café (1837), Lisbon' },
        { name: 'Cork wallet or accessories', where: 'Cork design shops in Lisbon or Porto' },
      ],
    },
  ],

  bookings: [
    { id: 'up01', label: 'Flight BLR → Los Angeles (LAX)',                category: 'transport',     priority: 'critical', window: { start: '2035-02', end: '2035-06' } },
    { id: 'up02', label: 'Flight Porto (OPO) → BLR',                      category: 'transport',     priority: 'critical', window: { start: '2035-02', end: '2035-06' } },
    { id: 'up03', label: 'ESTA USA visa waiver',                           category: 'document',      priority: 'critical', window: { start: '2035-08', end: '2035-09' } },
    { id: 'up04', label: 'Schengen Visa (Portugal)',                       category: 'document',      priority: 'critical', window: { start: '2035-06', end: '2035-08' } },
    { id: 'up05', label: 'Grand Canyon South Rim Lodge (book 1 year out)', category: 'accommodation', priority: 'critical', window: { start: '2034-09', end: '2035-01' } },
    { id: 'up06', label: 'Alcatraz Night Tour — book far ahead',           category: 'experience',    priority: 'high',     window: { start: '2035-05', end: '2035-08' } },
    { id: 'up07', label: 'Muir Woods timed entry (weekend lottery)',       category: 'experience',    priority: 'high',     window: { start: '2035-07', end: '2035-09' } },
    { id: 'up08', label: 'Rental car — LAX pickup (California)',           category: 'transport',     priority: 'high',     window: { start: '2035-06', end: '2035-09' } },
    { id: 'up09', label: 'Rental car — Porto pickup (Douro Valley)',       category: 'transport',     priority: 'medium',   window: { start: '2035-07', end: '2035-09' } },
    { id: 'up10', label: 'Livraria Lello Porto timed entry ticket',        category: 'experience',    priority: 'medium',   window: { start: '2035-08', end: '2035-09' } },
    { id: 'up11', label: 'Travel insurance (USA + Portugal)',              category: 'document',      priority: 'critical', window: { start: '2035-09', end: '2035-09' } },
  ],

  notes: [
    'ESTA (Electronic System for Travel Authorization) required for Indian passport holders visiting USA — apply 72 hrs before travel at esta.cbp.dhs.gov.',
    'USA: tip 18–20% at all sit-down restaurants. Not optional — built into server wages.',
    'Grand Canyon South Rim: Bright Angel Trail descent is easier than it looks — the hard part is climbing out. Turn back at 1.5 Mile Resthouse if unsure.',
    'PCH / Big Sur closure risk: check Caltrans for road closures (rockslides are common). Book flexible accommodation.',
    'Muir Woods parking is lottery-based during weekends — take ferry from San Francisco (Sausalito) instead.',
    'Livraria Lello in Porto requires timed entry ticket purchased online (~€5, redeemable at book purchase).',
    'Douro Valley: most quintas are accessible only by car — book a guided full-day wine tour from Porto if not renting a car.',
    'Best time: March–May or September–October for mild weather across both USA and Portugal.',
  ],

  practicalInfo: {
    weather: 'September–October California: LA 22–28°C (near-perfect). Big Sur 18–24°C (fog burns off by 10 AM). Grand Canyon South Rim 15–22°C — ideal hiking. Portugal October: Lisbon 18–24°C, Porto 15–20°C with some rain. Douro Valley golden amber in late October harvest season.',
    emergency: 'USA: 911 · Grand Canyon Ranger: 928-638-7805. Portugal: 112 · INEM Medical: 112',
    driving: [
      'USA drives on the RIGHT. Bay Bridge: EZ Pass/Fastrak — use rental car\'s transponder. Golden Gate Bridge: $8.75 electronic (no cash).',
      'PCH (Highway 1) / Big Sur: check Caltrans (dot.ca.gov) for closures before each day — rockslides are common in autumn.',
      'Grand Canyon South Rim: free park shuttles run every 10–15 min. No need to drive inside the park in peak season.',
      'Portugal: A22 Via do Infante is free. All other motorways have electronic tolls — buy Via Verde at Lisbon airport or use rental GPS toll unit.',
      'Douro Valley roads: narrow and winding. Download offline maps — no mobile signal in remote valley sections.',
    ],
    transit: [
      'Los Angeles: Uber/Lyft essential. No practical public transit for tourist sites. Metro A Line: LAX to DTLA ($1.75, 40 min).',
      'San Francisco: BART from SFO ($8.95). Muni Day Pass ($24) covers all buses, trams, and cable cars.',
      'Lisbon metro: Viva Viagem card (€0.50 deposit) + 1-day pass (€6.45). Covers metro, bus, tram, and funiculars.',
      'Porto: Andante card works on all metro, bus, and regional trains. Airport blue line → Trindade (35 min, €1.85).',
      'Douro train (CP regional): Porto Campanhã → Pinhão (2h30m, €11). One of the most scenic rail routes in Europe.',
    ],
    payment: [
      'USA: tip 18–20% at restaurants — not optional. Carry $200 USD cash for national park fees, tolls backup, small vendors.',
      'America the Beautiful Annual Pass ($80): covers entry to all US National Parks (Grand Canyon + Muir Woods). Worth it.',
      'Portugal: card dominant. Carry €50 cash for rural Douro Valley cafés and market stops.',
      'ATM fees: use a Charles Schwab or Wise card to avoid foreign ATM fees — especially important in rural Portugal.',
    ],
    sim: [
      'USA: T-Mobile Tourist Plan (eSIM) — $30 for 10 days, unlimited data. Best coverage on PCH and Grand Canyon.',
      'Portugal: NOS or MEO SIM at Lisbon airport — €20 for 15 days, 30GB. Works in Douro Valley.',
    ],
    etiquette: [
      'USA: tipping non-negotiable — 18–20% at restaurants, $2–5 per bag at hotels, $1–2 per drink at bars.',
      'Grand Canyon: never feed wildlife. Ravens and squirrels will take food forcibly and carry disease.',
      'California beaches: no glass containers. Designated fire rings for bonfires only.',
      'Portugal: "Bom dia" / "Boa tarde" before any request. Locals appreciate it.',
      'Lisbon trams: do not block the doors. Tram 28 through Alfama is crowded — watch for pickpockets.',
    ],
  },

  foodHighlights: [
    {
      city: 'Los Angeles',
      must: [
        { dish: 'In-N-Out Burger (Animal Style)', note: 'Secret menu: mustard-cooked beef, extra sauce, pickles, grilled onions. Order "Double-Double Animal Style." Any LA location. Under $10.' },
        { dish: 'Tacos al pastor at Grand Central Market', note: 'DTLA landmark market — Tacos Tumbras a Tomas: corn tortilla, marinated pork, pineapple, cilantro. $3.50/taco. Eat standing.' },
        { dish: 'Korean BBQ in Koreatown', note: 'LA has the best Korean BBQ outside Seoul. Park\'s BBQ on Vermont Ave — beef galbi, banchan, and soju. Arrive before 7 PM or queue.' },
      ],
    },
    {
      city: 'San Francisco / Big Sur',
      must: [
        { dish: 'Dungeness crab at Fisherman\'s Wharf', note: 'October–November is crab season. Whole cracked crab from the outdoor stands at Pier 45 — $25–45. Eat on the dock.' },
        { dish: 'Sourdough clam chowder bread bowl', note: 'Boudin Bakery on Fisherman\'s Wharf — SF sourdough hollowed and filled with creamy clam chowder. The definitive version.' },
        { dish: 'Nepenthe Ambrosia burger, Big Sur', note: 'Restaurant 800ft above the Pacific (built 1949). The Ambrosia burger is legendary and the view justifies the price. Sunset seating.' },
      ],
    },
    {
      city: 'Lisbon',
      must: [
        { dish: 'Pastéis de Nata at Pastéis de Belém', note: 'The original (1837). Custard tart — hot from the oven, dusted with cinnamon. Eat at the marble counters inside. €1.30 each.' },
        { dish: 'Bacalhau à Brás (salt cod)', note: 'Shredded salt cod, scrambled eggs, thin fried potatoes. Any Alfama tasca — order the house vinho verde with it.' },
        { dish: 'Bifanas (pork sandwich)', note: 'Marinated pork in a floury roll with mustard. Cervejaria Portugália or any stand near Praça do Comércio. The correct Lisbon street snack.' },
      ],
    },
    {
      city: 'Porto / Douro Valley',
      must: [
        { dish: 'Francesinha at Café Santiago', note: 'Porto\'s nuclear sandwich — cured meats, linguiça, steak inside bread, covered in melted cheese and a spiced beer-tomato sauce. Intense.' },
        { dish: 'Port wine tasting at Taylor\'s or Ramos Pinto', note: 'Vila Nova de Gaia — cellar tour then tasting of Ruby, Tawny, and LBV Port. €15–25. Book morning slot.' },
        { dish: 'Douro Valley wine lunch at Quinta do Crasto', note: 'Riverside quinta — local lamb, seasonal vegetables, and estate wines. Douro whites are underrated. Reserve well in advance.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Bixby Creek Bridge, Big Sur', tip: 'Park at the north pullout on Highway 1. Shoot the 97m arch bridge framed by Pacific coast cliffs. Morning fog burns off by 10 AM — wait for it.', timing: 'Late morning (after fog lifts)' },
    { location: 'Grand Canyon South Rim, Mather Point', tip: 'Arrive 45 min before sunrise — the canyon turns flame-orange as the sun clears the eastern rim. No tripod restrictions at the rim.', timing: 'Sunrise' },
    { location: 'Golden Gate Bridge from Battery Spencer', tip: 'Marin Headlands viewpoint (north side) — full bridge span with SF skyline behind. Hike 10 min from parking. Fog or clear both work.', timing: 'Dawn or overcast morning' },
    { location: 'Alfama, Lisbon from Miradouro da Graça', tip: 'Highest miradouro in Alfama — terracotta rooftops, São Jorge Castle, and the Tagus. Blue hour. Less crowded than Portas do Sol.', timing: 'Blue hour / dusk' },
    { location: 'Douro Valley terraces near Pinhão (N322)', tip: 'Drive N322 between Pinhão and Foz Côa. Pull over at any ridge — schist terraces drop 300m to the river. October harvest adds orange and gold.', timing: 'Golden hour (3–5 PM)' },
  ],
}
