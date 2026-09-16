export const DAYS = [
  // ── Day 01 ──────────────────────────────────────────────────────────────────
  {
    num:       '01',
    date:      'Sep 8 — Monday',
    city:      'Los Angeles',
    title:     'Arrival — Venice Beach + Santa Monica Pier + Abbot Kinney',
    transport: 'BLR → LAX via Emirates / Qatar / Singapore Airlines · 18–22 hrs · Arrive morning or afternoon · Collect rental car at LAX (Hertz / Enterprise) · Drive to Venice / Santa Monica (30 min)',
    places: [
      {
        name:        'Venice Beach Basketball Courts',
        time:        '3:00 PM',
        description: 'The legendary outdoor courts on the Venice Boardwalk have been the Rucker Park of the West Coast since the 1970s. On any given afternoon, high-level pickup streetball runs on the main court — where legends from Kareem Abdul-Jabbar to Allen Iverson have appeared unannounced. The courts sit adjacent to Muscle Beach\'s outdoor gym, framed by an open-air mural gallery of graffiti art stretching the entire boardwalk. Watch from courtside or join a pickup run — the culture demands you earn your spot.',
        images: [
          'https://images.unsplash.com/photo-1564254025-90e94250c71f?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive from LAX, park near Venice Boardwalk (free street parking south of Rose Ave)',
        cost:      0,
        tip:       'Weekday afternoons are competitive but more welcoming to visitors than weekend full-court runs. Arrive in proper court shoes — flip flops mark you immediately. Photography from the east side of the court gives the best angle against the Pacific sky.',
      },
      {
        name:        'Santa Monica Pier',
        time:        '5:30 PM',
        description: 'The Santa Monica Pier marks the official end of Route 66 — a blue highway sign here reads "Santa Monica 66 End of the Trail," making it one of the most historically charged spots in American road mythology. The 1909 pier hosts a vintage Ferris wheel visible from the bay, bumper cars, and as the sun descends over the Pacific the entire sky turns the colour of a smoked orange. The horizontal scale of the LA basin stretching north and south from the pier creates a panorama unlike any other coastal city in the world.',
        images: [
          'https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive or walk north from Venice Beach (15 min on foot along the boardwalk)',
        cost:      0,
        tip:       'The Route 66 end-of-trail sign is on Ocean Avenue at the pier entrance. Arrive 30 min before official sunset — the Ferris wheel lit against the orange sky is a one-minute window. Pier parking is paid but street parking on Main Street is free evenings.',
      },
      {
        name:        'Abbot Kinney Boulevard',
        time:        '7:30 PM',
        description: 'GQ named it the coolest block in America — a 1.5km strip through Venice lined with independent coffee shops, design studios, vinyl record stores, fashion boutiques, and restaurants that collectively define the West Coast aesthetic more than any single address in LA. Fred Segal vintage, Salt & Straw artisan ice cream, Gjusta bakery (open at dawn for the best bread in California), and walls covered in street art make this the evening walk and dinner destination for Day 1.',
        images: [
          'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1564254025-90e94250c71f?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk south from Venice Beach courts (10 min)',
        cost:      0,
        tip:       'Gjusta opens at 7 AM — if you want the morning bread and pastry experience save this for Day 2 morning. Evening on Abbot Kinney is for the restaurants and record stores. Salt & Straw at the north end has a queue but it moves fast.',
      },
    ],
    food:    [
      'Gjusta Bakery, 320 Sunset Ave, Venice (vegetarian-friendly, outstanding quality — tartines, pastries, salads; arrive early or queue)',
      'Café Gratitude, 512 Rose Ave, Venice (fully plant-based restaurant — the Bowl of Gratitude and I Am Whole bowl are standout)',
      'Salt & Straw, 1357 Abbot Kinney Blvd (artisan ice cream — seasonal September flavours include fig and honey)',
    ],
    stay:    'The Kinney Hotel, 738 Washington Blvd, Venice, Los Angeles — boutique coastal hotel 2 blocks from Venice Beach',
    nextDay: 'Petersen Automotive Museum (the world-class car vault) + Griffith Observatory + Hollywood Walk of Fame',
  },

  // ── Day 02 ──────────────────────────────────────────────────────────────────
  {
    num:       '02',
    date:      'Sep 9 — Tuesday',
    city:      'Los Angeles',
    title:     'Car Culture Day — Petersen Museum + Griffith Observatory + Hollywood',
    transport: 'Drive (LA is a car city) — free parking at Petersen Museum weekdays. Uber for Hollywood evening.',
    places: [
      {
        name:        'Petersen Automotive Museum',
        time:        '10:00 AM',
        description: 'The world-class automotive museum on Wilshire Boulevard houses over 300 cars across three floors — the Vault (an underground supercar storage facility holding 200+ vehicles in raw museum-quality display), race car history spanning Le Mans to Formula 1, and Hollywood movie cars from the Batmobile to Herbie. The 2015 stainless steel ribbon façade designed by Kohn Pedersen Fox — a lattice of polished tubes wrapping the building — is one of the most distinctive pieces of contemporary architecture in Los Angeles. The Vault is the centrepiece: supercars, JDM legends, and prototypes stored in climate-controlled bays exactly as delivered.',
        images: [
          'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503736334956-4c8f8e4dc68c?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive from Venice hotel, park in museum garage (free weekdays) · 6200 Wilshire Blvd, Mid-Wilshire',
        cost:      2500,
        tip:       'Book the Vault tour add-on online — general admission does not include the underground Vault, which is the crown jewel. The Vault tour runs hourly, limited to 12 people. Arrive when the museum opens at 10 AM to get the first Vault slot.',
      },
      {
        name:        'Griffith Observatory',
        time:        '3:00 PM',
        description: 'Set on the south slope of Mount Hollywood, the 1935 Art Deco Griffith Observatory offers a 360° view of the entire LA basin — the Hollywood Sign close enough to read from the terrace, the Pacific glinting 25km west, and on clear September days, Catalina Island breaking the horizon. Entry to the observatory and grounds is free; the planetarium shows are extra. The building has appeared in Rebel Without a Cause and La La Land. The twin copper domes and the bronze Astronomers Monument on the south lawn are the strongest photography compositions.',
        images: [
          'https://images.unsplash.com/photo-1495571758719-6ec1e876b9c8?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive from Petersen Museum (20 min) — park at the observatory lot or Uber from Wilshire',
        cost:      0,
        tip:       'The September sunset from Griffith is exceptional — arrive by 3 PM to walk the grounds and position for the dusk photography. The Hollywood Sign is best photographed from the west terrace with a 50mm equivalent lens. Planetarium shows book out — reserve online same morning.',
      },
      {
        name:        'Hollywood Walk of Fame + TCL Chinese Theatre',
        time:        '6:30 PM',
        description: 'The 2.5km star-inlaid pavement from Hollywood & Highland to Vine Street contains 2,700+ terrazzo and brass stars. The surrounding architecture of the TCL Chinese Theatre (1927, with celebrity hand and footprints set in cement since the very first screening), the Dolby Theatre (Oscars venue annually), and the El Capitan Theatre make this a legitimate architectural and photography walk. The forecourt of the Chinese Theatre hosts one of the most tactile connections to Hollywood history anywhere in the city.',
        images: [
          'https://images.unsplash.com/photo-1543169765-ae0c5e35c1c4?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1495571758719-6ec1e876b9c8?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Uber from Griffith Observatory (10 min) or drive to Hollywood & Highland parking structure',
        cost:      0,
        tip:       'The Walk of Fame itself is free. Evening light on Hollywood Blvd bounces off the gold and terrazzo stars beautifully. The Chinese Theatre forecourt is open to the public — touch the handprints of Cary Grant and Elizabeth Taylor. Avoid peak tourist midday; evening reduces crowds significantly.',
      },
    ],
    food:    [
      'Gjelina, 1429 Abbot Kinney Blvd, Venice (vegetarian-friendly wood-fired restaurant — the roasted cauliflower and charred carrot dishes are landmark)',
      'In-N-Out Burger, 7009 Sunset Blvd, Hollywood (California institution — order the Grilled Cheese secret menu vegetarian burger with Animal Style fries)',
      'Republique, 624 S La Brea Ave (French café / restaurant — excellent vegetarian quiche and pastries; strong breakfast and lunch)',
    ],
    stay:    'The Kinney Hotel, 738 Washington Blvd, Venice, Los Angeles',
    nextDay: 'Pacific Coast Highway drive: Santa Monica → Malibu → Big Sur → San Francisco (all-day road trip)',
  },

  // ── Day 03 ──────────────────────────────────────────────────────────────────
  {
    num:       '03',
    date:      'Sep 10 — Wednesday',
    city:      'Pacific Coast Highway',
    title:     'PCH Drive — LA to San Francisco via Big Sur',
    transport: 'Rental car — PCH (Highway 1) from Santa Monica northbound · Full day drive LA → SF approx 9 hrs driving without stops · Start 7 AM · Drop car at SF airport or downtown SF garage',
    places: [
      {
        name:        'Malibu Surfrider Beach',
        time:        '8:00 AM',
        description: 'The first stop heading north out of LA on the PCH, Malibu Surfrider Beach in front of the Malibu Pier is California surfing\'s spiritual home — the same right-breaking point wave has drawn surfers since the 1950s and is one of the first UNESCO-recognised surfing heritage sites. The Santa Monica mountain range drops directly to the Pacific here; the hills above Malibu are brushed gold in September and the pier creates a natural framing device for the ocean. The best photograph: from the pier looking south with the Santa Monica mountains behind the breaking wave.',
        images: [
          'https://images.unsplash.com/photo-1558898479-d6b6e96bc475?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive north on PCH from Santa Monica — Surfrider Beach is at 23000 Pacific Coast Hwy, Malibu (45 min from Venice)',
        cost:      0,
        tip:       'Parking in the Malibu Pier lot is paid ($3/hr). September mornings are clear before haze builds — shoot here and move on by 9 AM. The pier itself is a 5-minute walk and worth the detour for the ocean-facing photography angle.',
      },
      {
        name:        'Bixby Creek Bridge, Big Sur',
        time:        '1:00 PM',
        description: 'The defining image of the Pacific Coast Highway — the 1932 open-spandrel concrete arch bridge spans Bixby Canyon 218 feet above the Pacific on a stretch of Highway 1 where the Santa Lucia Mountains drop vertically to the ocean. The Big Sur coast running 145km from San Simeon to Carmel is the longest undeveloped coastline in the contiguous United States: redwoods, sea otters, condors, and an almost complete absence of light pollution. Pull over at the north viewpoint for the classic composition.',
        images: [
          'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1447720000636-9b57bae29de1?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Continue north on PCH (Highway 1) from Malibu — approximately 3.5 hrs driving · Bixby Bridge is at Mile 60.4 on Hwy 1, Big Sur',
        cost:      0,
        tip:       'The north viewpoint pull-off is 200m north of the bridge on the left (east) side of the road — this is the classic shot location. September morning light from the south creates perfect front-lighting; afternoon the bridge is in shadow from the cliffs. Overcast light is actually superior for the greens and blues. Drone footage is spectacular but check NPS airspace rules before launching.',
      },
      {
        name:        '17-Mile Drive, Pebble Beach',
        time:        '3:30 PM',
        description: 'The private coastal toll road through the Pebble Beach Golf Links traces 17 miles of the most exclusive coastal landscape in California. The Lone Cypress — a 250-year-old Monterey cypress tree clinging to a granite rock above the Pacific — is one of the most photographed single trees in the world. The Ghost Tree viewpoint reveals a white gnarled forest of dead cypress against the deep blue Pacific in a composition that photographs like a painting. The road passes several viewpoints over the golf links and the Carmel Bay beyond.',
        images: [
          'https://images.unsplash.com/photo-1447720000636-9b57bae29de1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Enter 17-Mile Drive at the Carmel Gate (Highway 1 / North San Antonio Ave, Carmel-by-the-Sea) · Entry gate fee charged per vehicle',
        cost:      2100,
        tip:       'The Lone Cypress viewpoint is at 17-Mile Drive Stop 17 — arrive before 5 PM to get late afternoon west light on the granite. The Ghost Tree is Stop 18, just south. The drive takes 45–60 min if you stop at all viewpoints. Rejoin Highway 1 at Pacific Grove to continue north to San Francisco.',
      },
    ],
    food:    [
      'Neptune\'s Net, 42505 Pacific Coast Hwy, Malibu (casual seafood shack on PCH with ocean views — fish tacos, chowder, vegetarian options available)',
      'Nepenthe, Hwy 1, Big Sur (cliff-edge restaurant 800ft above the Pacific — the Ambrosia veggie burger has been on the menu since 1949; worth the stop for the view alone)',
      'Phil\'s Fish Market, 7600 Sandholdt Rd, Moss Landing (between Big Sur and SF — excellent cioppino and grilled fish; vegetarian pasta available)',
    ],
    stay:    'Hotel Zephyr, 250 Beach Street, Fisherman\'s Wharf, San Francisco — modern nautical-themed hotel at the waterfront',
    nextDay: 'Golden Gate Bridge bicycle crossing + Alcatraz Island tour + Fisherman\'s Wharf',
  },

  // ── Day 04 ──────────────────────────────────────────────────────────────────
  {
    num:       '04',
    date:      'Sep 11 — Thursday',
    city:      'San Francisco',
    title:     'Golden Gate + Alcatraz + Fisherman\'s Wharf',
    transport: 'Walk, Cable Car ($8 ≈ ₹665 per ride), Uber for longer distances. Blazing Saddles bike rental near Fisherman\'s Wharf for bridge crossing.',
    places: [
      {
        name:        'Golden Gate Bridge Bicycle Crossing',
        time:        '8:30 AM',
        description: 'Cycling across the 2.7km Golden Gate Bridge span — 67 metres above the San Francisco Bay — is one of the most iconic bike rides in the world. Rent from Blazing Saddles near Fisherman\'s Wharf and ride through the Presidio forest, emerging at Fort Point for the underside view of the south tower (a red brick 1861 fort dwarfed by the 227m orange steel cables above). The fog in September frequently rolls in through the gap at dawn, parting by late morning to reveal the full span. After crossing, continue to Sausalito for the ferry back — a 30-minute boat crossing past the bridge gives the best full-span photograph.',
        images: [
          'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Blazing Saddles rental shop at 2715 Hyde St, Fisherman\'s Wharf — 8 AM opening · Return bike at Sausalito or back in SF',
        cost:      3300,
        tip:       'Start early (8–8:30 AM) to hit the bridge before wind picks up and tourist cyclists clog the pedestrian-side lane. The Battery Spencer viewpoint in the Marin Headlands (3km north of the bridge) gives the classic skyline-included shot — requires a short uphill climb but worth it. Ferry back from Sausalito departs Sausalito Ferry Terminal hourly.',
      },
      {
        name:        'Alcatraz Island',
        time:        '12:30 PM',
        description: 'The federal maximum-security penitentiary that operated on a 22-acre island in San Francisco Bay from 1934 to 1963, housing Al Capone, Robert Stroud (the Birdman), and 36 men who attempted escape (none confirmed successful). The audio tour — narrated by former guards and inmates in their own voices — is one of the most atmospheric museum experiences in the United States. The abandoned cell blocks in their current state of decay, the bay visible through barred windows, the D-Block solitary confinement cells, and the 360° views of San Francisco from the island\'s exterior are all exceptional photography subjects.',
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1561964093-9fde6a6f8f22?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Alcatraz Cruises ferry from Pier 33, Embarcadero (10 min walk from Fisherman\'s Wharf) · BOOK WEEKS IN ADVANCE — sells out completely',
        cost:      4200,
        tip:       'Book the night tour if available in September — the island after dark is extraordinarily atmospheric. Day tour: book the earliest departure (9 AM) to have the island before afternoon crowds. No flash photography inside — available light in the cell blocks is correct. The exercise yard view through cell block windows is the strongest composition.',
      },
      {
        name:        'Fisherman\'s Wharf & Pier 39',
        time:        '4:30 PM',
        description: 'Pier 39\'s floating docks were colonised by California sea lions following the 1989 Loma Prieta earthquake and they never left — up to 1,700 animals in peak season bark and pile atop each other in a chaotic, magnificent spectacle 10 metres from the pier walkway. Ghirardelli Square (the former 1852 chocolate factory) for hot chocolate is a neighbourhood institution. The view from the wharf\'s end looking back toward Alcatraz with the bay\'s evening light is the cleanest San Francisco panorama available without climbing a hill.',
        images: [
          'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk east from Pier 33 along the Embarcadero (10 min)',
        cost:      0,
        tip:       'Sea lion viewing is free from the public dock — the west end of Pier 39 is where they congregate most densely. Evening is when the Embarcadero F-line historic streetcar runs most photogenically against the bay light. The Ghirardelli hot chocolate is a ₹400 experience worth having once.',
      },
    ],
    food:    [
      'Gracias Madre, 2211 Mission St, Mission District (fully plant-based upscale Mexican — the butternut squash enchiladas are the best vegetarian dish in SF)',
      'Nopalito, 1224 9th Ave, Inner Sunset (sustainable Mexican, multiple vegetarian options — outstanding horchata)',
      'Blue Bottle Coffee, 66 Mint Plaza, SoMa (SF\'s own specialty coffee origin — the single origin pour-over in the architecturally beautiful Mint Plaza courtyard)',
    ],
    stay:    'Hotel Zephyr, 250 Beach Street, Fisherman\'s Wharf, San Francisco',
    nextDay: 'Mission District murals + Twin Peaks viewpoint + Haight-Ashbury → evening flight to Las Vegas',
  },

  // ── Day 05 ──────────────────────────────────────────────────────────────────
  {
    num:       '05',
    date:      'Sep 12 — Friday',
    city:      'San Francisco → Las Vegas',
    title:     'Mission District + Twin Peaks + Haight-Ashbury → Las Vegas',
    transport: 'BART and walk for Mission District. Uber for Twin Peaks (no direct public transit to summit). Evening: Uber to SFO, fly Spirit / Southwest / United SF → Las Vegas LAS (1.5 hrs).',
    places: [
      {
        name:        'Mission Dolores + Balmy Alley Murals',
        time:        '9:00 AM',
        description: 'Mission Dolores (1776) is the oldest intact building in San Francisco — a whitewashed adobe Franciscan mission that survived every earthquake, fire, and 250 years of California history. The surrounding Mission District is the city\'s most vibrant Latino neighbourhood and home to two of the world\'s finest outdoor mural galleries: Balmy Alley (24th Street) and Clarion Alley (Mission Street), where dozens of full-scale political, cultural, and artistic murals cover every inch of building exteriors. The murals change regularly — the 2035 iteration will be 45+ years deep into the tradition started in the 1970s.',
        images: [
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1474218955657-2c9da42b78b8?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'BART from Embarcadero to 24th St Mission station (15 min) · Walk to Balmy Alley (3 min)',
        cost:      0,
        tip:       'Photograph the mural alleys on a weekday morning before 11 AM — on weekend afternoons they fill with people. The murals are on private property but photography is actively welcomed. Mission Dolores entry is free for self-guided walk of the grounds; small fee for the cemetery.',
      },
      {
        name:        'Twin Peaks Viewpoint',
        time:        '12:00 PM',
        description: 'Twin Peaks — two 280m hills at the geographic centre of San Francisco — offers the least-crowded and most complete 360° panorama of the city: the downtown skyline, both bay bridges (Bay Bridge and Golden Gate), the Pacific Ocean, and on clear September days, Mount Tamalpais across the bay. Less visited than Coit Tower or the Marin Headlands, the summit road loops around both peaks with multiple pull-offs. The view south toward the Peninsula and north toward the Bay Bridge from the saddle between the peaks captures the full width of the city in a single frame.',
        images: [
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Uber from Mission District (15 min) · Twin Peaks Blvd summit pull-off',
        cost:      0,
        tip:       'Wind at the summit can be strong — bring a light layer. September afternoons are clearest after the morning fog burns off. A wide-angle lens captures both peaks and the skyline in one frame from the saddle viewpoint. The Christmas Tree Point pull-off has the best unobstructed western view toward the ocean.',
      },
      {
        name:        'Haight-Ashbury Neighbourhood Walk',
        time:        '2:30 PM',
        description: 'The birthplace of the Summer of Love (1967) and psychedelic rock — the four-block intersection where Haight Street meets Ashbury Street was the epicentre of counterculture when Janis Joplin, Jefferson Airplane, and the Grateful Dead lived within walking distance. The Victorian house facades, Amoeba Music\'s vast independent record store, the Grateful Dead House at 710 Ashbury, and countless vintage clothing shops define the neighbourhood. Five minutes south on Steiner Street the Painted Ladies of Alamo Square provide the most photographed Victorian house row in America.',
        images: [
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Uber from Twin Peaks (10 min) or walk down (30 min downhill)',
        cost:      0,
        tip:       'Amoeba Music at 1855 Haight Street is a serious record store — allocate 45 min if vinyl or CDs are part of your travel collecting. The Grateful Dead House is a private residence — photograph the exterior only. Alamo Square\'s Painted Ladies are best photographed in early morning from the park facing northeast.',
      },
    ],
    food:    [
      'Tartine Bakery, 600 Guerrero St, Mission District (legendary — the country bread and morning bun are worth queueing for; arrive before 9 AM or after 5 PM)',
      'La Palma Mexicatessen, 2884 24th St, Mission (handmade tortillas since 1953 — vegetarian tamales and hand-pressed tortillas made in-house)',
      'Craftsman and Wolves, 746 Valencia St, Mission (modern patisserie — the Rebel Within, a soft egg baked inside a savoury muffin, is a SF-specific creation)',
    ],
    stay:    'LINQ Hotel + Experience, 3535 Las Vegas Blvd S, Las Vegas Strip — check in late evening',
    nextDay: 'Las Vegas Strip walk — Bellagio fountains + High Roller + Fremont Street',
  },

  // ── Day 06 ──────────────────────────────────────────────────────────────────
  {
    num:       '06',
    date:      'Sep 13 — Saturday',
    city:      'Las Vegas',
    title:     'Las Vegas Strip — Bellagio Fountains + High Roller + Fremont Street',
    transport: 'Walk the Strip (4km) or free trams between some properties. Uber for Fremont Street (4km north of Strip). Las Vegas is walk-heavy — wear comfortable shoes.',
    places: [
      {
        name:        'Bellagio Fountains',
        time:        '3:00 PM',
        description: 'The choreographed water show on the 3.2-hectare artificial Lake Bellagio is the most watched free spectacle in Las Vegas — 1,200 water nozzles choreographed to music (Sinatra to Celine Dion to Andrea Bocelli\'s "Time to Say Goodbye") shoot jets 140 metres into the desert air. The show runs every 30 minutes from 3 PM and every 15 minutes after dark. The surrounding Strip hotels — Caesars, Paris Las Vegas with its half-scale Eiffel Tower — create a canyon backdrop that makes the fountain geometry extraordinary. The footbridge on Las Vegas Boulevard over the lake is the best viewing and photography position.',
        images: [
          'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581351721010-8cf859cb14e4?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk to Bellagio from LINQ Hotel (15 min south on the Strip)',
        cost:      0,
        tip:       'The evening shows (after 8 PM) are significantly more spectacular than afternoon — the LED-lit jets against the dark desert sky reflect on the lake surface. Position on the footbridge 20 min before the show for a clear front rail spot. Long exposure (2–4 seconds) at night captures the full water arc.',
      },
      {
        name:        'High Roller Observation Wheel',
        time:        '6:30 PM',
        description: 'At 167 metres, the High Roller is the world\'s tallest observation wheel — 13 metres taller than the London Eye — and one complete revolution takes 30 minutes. The 28 spherical glass cabins each hold up to 40 people. At the apex, the entire Las Vegas Strip stretches in both directions below: the Stratosphere tower to the north, the Luxor pyramid\'s beam to the south, Caesars and Bellagio and Park MGM as a lit canyon. The best time is the 30-minute window after sunset when the sky gradient behind the mountains gives the most dramatic backdrop.',
        images: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk to LINQ Promenade (directly adjacent to LINQ Hotel)',
        cost:      3300,
        tip:       'Book the "Happy Half Hour" cabin — open bar cocktails for the 30-minute rotation. September sunset is around 7:15 PM local time — the 6:45 PM cabin boarding catches the sunset at the top. The promenade below has a good ground-level shot of the full wheel lit up.',
      },
      {
        name:        'Fremont Street Experience',
        time:        '9:30 PM',
        description: 'Five blocks of the original Las Vegas casino district (pre-Strip), now covered by a 90-metre-wide LED canopy dome running the full length of the pedestrian mall. The Viva Vision light show — the world\'s largest LED screen at 1,500 by 90 metres — runs hourly from dusk covering the entire ceiling with 50 million LEDs. The surrounding vintage neon signs of the Golden Gate Hotel, the Binion\'s horseshoe, and the 1906-era architecture create a completely different register from the corporate Strip. The SlotZilla zipline crosses the canopy at two heights. Photography: stand in the centre of the corridor during the ceiling show for the immersive LED overhead frame.',
        images: [
          'https://images.unsplash.com/photo-1581351721010-8cf859cb14e4?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Uber from Strip (10 min, $8) · Fremont Street Experience, Downtown Las Vegas',
        cost:      0,
        tip:       'The Viva Vision show runs at the top of every hour starting at dusk — the 9 PM and 10 PM shows are at peak LED effect. The Golden Gate Hotel (1906, Vegas\'s oldest casino) at the east end is worth a walk-through for the history. Get there 20 min before the show to position in the centre of the canopy.',
      },
    ],
    food:    [
      'Secret Pizza (no sign — take the elevator to the 3rd floor of The Cosmopolitan, walk the hidden corridor) — the best thin-crust pizza in Vegas; no sign, no reservation',
      'Wynn Buffet, Wynn Las Vegas, 3131 Las Vegas Blvd S (the best upscale buffet in the city — multiple dedicated vegetarian stations)',
      'In-N-Out Burger, 3545 Las Vegas Blvd S (open 24 hours on the Strip — Grilled Cheese secret menu, Animal Style fries)',
    ],
    stay:    'LINQ Hotel + Experience, 3535 Las Vegas Blvd S, Las Vegas',
    nextDay: 'Red Rock Canyon dawn hike + Mob Museum → afternoon drive to Grand Canyon South Rim',
  },

  // ── Day 07 ──────────────────────────────────────────────────────────────────
  {
    num:       '07',
    date:      'Sep 14 — Sunday',
    city:      'Las Vegas → Grand Canyon',
    title:     'Red Rock Canyon + Mob Museum → Grand Canyon',
    transport: 'Rental car for Red Rock Canyon (30 min west of Strip) · Return car downtown Las Vegas · Shuttle or guided tour bus Las Vegas → Grand Canyon South Rim (4.5 hrs, departs midday)',
    places: [
      {
        name:        'Red Rock Canyon National Conservation Area',
        time:        '6:30 AM',
        description: 'Just 30 kilometres west of the Las Vegas Strip, Red Rock Canyon is a landscape of 3,000-foot Aztec sandstone escarpments that turn a deep burnt-orange at sunrise — the visual antithesis of the casinos and one of Nevada\'s most striking desert landscapes. The 13-mile Scenic Loop Drive has 13 pull-off viewpoints; the Calico Hills section is the strongest photographic composition, where the layered rust-red and cream sandstone forms create horizontal geology striations across the cliff face. Joshua trees, desert tortoises, and September cactus flowers populate the foreground. The silence after the Strip is complete and remarkable.',
        images: [
          'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive west on W Charleston Blvd from Strip (30 min) · Red Rock Canyon Scenic Loop entrance fee',
        cost:      1300,
        tip:       'Arrive at the visitor centre at opening (6 AM in September) to drive the loop in golden hour before the sandstone colour washes out in flat midday light. The Calico Hills viewpoint pull-off 3 miles into the loop is the single best photography stop. The loop is one-way and takes 45–60 min without hiking.',
      },
      {
        name:        'The Mob Museum',
        time:        '10:30 AM',
        description: 'Housed inside the genuine 1933 Federal Courthouse where Senate hearings against organised crime took place — the same room where Bugsy Siegel\'s associates were interrogated now contains the original hearing tables with period-accurate reconstruction. The museum traces the Las Vegas mob era, Prohibition, Al Capone\'s network, and the FBI\'s counter-intelligence operations through genuinely immersive exhibits: period weapons displays, phone tap recordings, 1940s casino cashier reconstruction, and in the basement, an operational speakeasy bar serving Prohibition-era craft cocktails. One of the most intelligently curated history museums in the US.',
        images: [
          'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Drive from Red Rock Canyon back to downtown Las Vegas · 300 Stewart Ave, Las Vegas (5 min from Fremont Street)',
        cost:      2100,
        tip:       'Allocate 2 hours minimum — the museum is three floors and content-dense. The basement speakeasy serves authentic 1920s cocktails even at 11 AM. The restored courtroom on the second floor is the most photographed interior. No photography in the speakeasy bar — respect the house rule.',
      },
    ],
    food:    [
      'Lotus of Siam, 620 E Flamingo Rd, Las Vegas (legendary Northern Thai restaurant — the vegetarian menu section is exceptional; one of the most celebrated Thai restaurants in the US)',
      'Hash House A Go Go, 3535 Las Vegas Blvd (American brunch institution — vegetarian twist options available)',
      'Pack food for the Grand Canyon bus journey — buy at Whole Foods on the Strip before departure',
    ],
    stay:    'El Tovar Hotel, South Rim, Grand Canyon Village, AZ — the canyon\'s landmark 1905 lodge (BOOK 13 MONTHS AHEAD)',
    nextDay: 'Grand Canyon sunrise at Mather Point + Bright Angel Trail hike + Desert View Watchtower',
  },

  // ── Day 08 ──────────────────────────────────────────────────────────────────
  {
    num:       '08',
    date:      'Sep 15 — Monday',
    city:      'Grand Canyon',
    title:     'Grand Canyon South Rim — Sunrise + Bright Angel Trail + Desert View',
    transport: 'Free shuttle buses within South Rim (Orange, Red, Blue routes). Evening: shuttle or flight Grand Canyon → Phoenix → Chicago (ORD).',
    places: [
      {
        name:        'Mather Point Sunrise',
        time:        '5:30 AM',
        description: 'Mather Point is the most accessible South Rim viewpoint and one of the most photographed natural sites on Earth — the canyon is 1.6 kilometres deep and 16 kilometres wide at this point. September sunrise is at approximately 6:15 AM; reach the viewpoint by 5:30 AM in complete darkness to position for the first light. When the sun clears the Kaibab Plateau to the east, it hits the inner canyon walls in a progression from orange to gold to white over 20 minutes — the geological depth becomes readable in the angled light in a way that flat midday illumination destroys completely.',
        images: [
          'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from El Tovar Hotel (5 min) or free Orange Route shuttle from Grand Canyon Visitor Centre',
        cost:      0,
        tip:       'The canyon requires either a 14mm ultra-wide or a panorama stitch of 3–5 frames — a standard 24mm will not capture the full vertical depth plus horizontal width simultaneously. Position on the east-facing rail at Mather Point for the sunrise direction. Bring a headlamp for the pre-dawn walk. The NPS Grand Canyon app has the exact sunrise time for your date.',
      },
      {
        name:        'Bright Angel Trail Hike',
        time:        '7:30 AM',
        description: 'The main South Rim descent trail into the canyon, starting at the Bright Angel Trailhead behind El Tovar Hotel. Hike 2.4km (1.5 miles) down to the 1.5-Mile Resthouse — the trail passes through multiple geological eras (Kaibab limestone at the rim, Coconino sandstone, Hermit shale, and Bright Angel shale) and arrives at a water station and shade rest area. The canyon walls rise 460 metres above the resthouse for a perspective completely unavailable from the rim. The switchbacks on the upper section, photographed looking back up toward the rim, show the scale of the descent and the geological layering in a single composition.',
        images: [
          'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from El Tovar Hotel (3 min) to Bright Angel Trailhead',
        cost:      0,
        tip:       'The NPS rule: hike down no further than you\'re willing to hike back up. September heat at canyon floor (which you won\'t reach) is 38°C+. Carry 2L of water minimum, electrolytes, sunscreen, and a hat. Start before 8 AM — the trail is partially shaded in early morning.',
      },
      {
        name:        'Desert View Watchtower',
        time:        '12:30 PM',
        description: 'The 1932 stone watchtower designed by architect Mary Colter at the easternmost point of the South Rim Drive — 40km east of the Grand Canyon Visitor Centre. At 2,358 metres, it is the highest viewpoint on the South Rim and the only point from which the Colorado River is visible from the rim without descending the trail. The interior contains Hopi murals painted by Fred Kabotie; the circular design mimics ancient Ancestral Puebloan watchtowers with archaeological authenticity. The view east down the canyon toward the Navajo Nation is the widest panorama available from any accessible South Rim point.',
        images: [
          'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Free Blue Route shuttle from Grand Canyon Visitor Centre (East Rim Drive, 40 min) or drive if car hired locally',
        cost:      0,
        tip:       'Pack trail mix, lunch, and 2L water for the day — Desert View has a seasonal snack bar but no full restaurant. Buy the Grand Canyon Annual Pass ($80 ≈ ₹6,600) at the entrance gate on Day 7 arrival to cover today\'s visit.',
      },
    ],
    food:    [
      'El Tovar Dining Room (the only fine dining at the canyon rim — vegetarian entrées available; reserve in advance at check-in)',
      'Bright Angel Lodge Deli (casual — breakfast burritos, vegetarian sandwich options, coffee)',
      'Pack trail snacks: trail mix, protein bars, and electrolyte tablets for the Bright Angel hike',
    ],
    stay:    'Loews Chicago Hotel, 455 N Park Dr, Streeterville, Chicago — check in late evening (travel day)',
    nextDay: 'Chicago: Millennium Park + Cloud Gate + Chicago River Architecture Cruise + deep-dish pizza',
  },

  // ── Day 09 ──────────────────────────────────────────────────────────────────
  {
    num:       '09',
    date:      'Sep 16 — Tuesday',
    city:      'Chicago',
    title:     'Chicago: Millennium Park + Architecture Cruise + Lou Malnati\'s',
    transport: 'Chicago L train (El) — efficient elevated rail network covering the Loop and beyond. Buy a Ventra transit card ($5 card + loads) at any L station.',
    places: [
      {
        name:        'Millennium Park + Cloud Gate (The Bean)',
        time:        '7:00 AM',
        description: 'Anish Kapoor\'s Cloud Gate — 110 tonnes of polished mirror-finish stainless steel in an elliptical form 10 metres high — reflects the Chicago skyline in a convex distortion that bends the city\'s skyscrapers into a curved lens. The 24-acre Millennium Park surrounding it contains the Frank Gehry-designed Jay Pritzker Music Pavilion (a stainless steel bandshell) and the Crown Fountain. In September the park is in full green with the Loop skyline rising directly to the south — the Bean\'s reflection creates a panorama of the city\'s greatest architecture without moving from one spot.',
        images: [
          'https://images.unsplash.com/photo-1484778954284-ff00a5a29f9c?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from Loews Chicago Hotel (10 min) · Millennium Park, 201 E Randolph St — free entry',
        cost:      0,
        tip:       'Arrive at 6:30–7 AM for the Bean at dawn — the park may have 20 people present versus 2,000 at midday. The classic composition is pressed flat against the Bean\'s surface looking up — the sky curves from above and the city curves from below. At dawn the Loop towers reflect in the upper arc with pink sky above.',
      },
      {
        name:        'Chicago River Architecture Cruise',
        time:        '10:00 AM',
        description: 'The 90-minute boat tour through the Chicago River\'s downtown canyon is the best single architecture experience in America — passing 53 buildings of significant architectural merit including Bertrand Goldberg\'s Marina City corn cobs (1964), Mies van der Rohe\'s IBM Building (1971), the Tribune Tower with fragments of world monuments (the Colosseum, the Parthenon, a fragment of the Berlin Wall) embedded in its Gothic limestone base, and the 2009 Aqua Tower by Jeanne Gang. The Chicago Architecture Foundation River Cruise departs from the Michigan Ave bridge and provides the most comprehensive architectural interpretation available.',
        images: [
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1520962922320-2b4680cd4f80?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from Millennium Park to Chicago Architecture Center, 111 E Wacker Dr (10 min)',
        cost:      5000,
        tip:       'Book the 10 AM tour online (Chicago Architecture Foundation) 4–6 weeks ahead in September. Sit on the port (left) side heading west — most key buildings are on the south bank. A 24–70mm zoom covers full building height and riverbank compositions. The 90-min tour is the best value architecture experience in the city.',
      },
      {
        name:        'Lou Malnati\'s Pizzeria',
        time:        '12:30 PM',
        description: 'Lou Malnati\'s has been making Chicago-style deep-dish pizza at the same State Street location since 1971 — it is not metaphorically a cultural monument, it is literally the restaurant that defined the genre. The pizza takes 45 minutes to bake from order: a buttery, flaky cornmeal pastry crust filled 5 centimetres deep with cheese on the bottom, toppings in the middle, and chunky crushed-tomato sauce on top. The vegetarian deep dish — spinach, mushroom, and green pepper — ordered at 12:30 PM for a 1:15 PM lunch constitutes the most important meal of the trip.',
        images: [
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1484778954284-ff00a5a29f9c?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from Chicago Architecture Center (5 min) · Lou Malnati\'s, 1 S Wacker Dr, Loop',
        cost:      1800,
        tip:       'Place the pizza order immediately on sitting down — the 45-minute bake time is not an estimate. The vegetarian spinach and mushroom deep dish is the correct order. Do not request thin-crust at Lou Malnati\'s. Order a Peroni while the pizza bakes.',
      },
    ],
    food:    [
      'Café Intelligentsia, 53 E Randolph St, Millennium Park (Chicago\'s own specialty coffee roaster — the Millennium Park location has direct Bean views)',
      'Native Foods Café, 218 S Clark St, Loop (fully vegan Chicago chain — good quality, convenient Loop location)',
      'Lou Malnati\'s Pizzeria (above — the lunch anchor of Day 9)',
    ],
    stay:    'Loews Chicago Hotel, 455 N Park Dr, Streeterville, Chicago',
    nextDay: 'Art Institute of Chicago + Wicker Park neighbourhood + United Center (Michael Jordan statue)',
  },

  // ── Day 10 ──────────────────────────────────────────────────────────────────
  {
    num:       '10',
    date:      'Sep 17 — Wednesday',
    city:      'Chicago',
    title:     'Art Institute + Wicker Park + United Center → New York',
    transport: 'Walk + Chicago L train (Blue Line for Wicker Park — Damen or Western stop). Uber for United Center. Evening flight Chicago ORD → JFK (2.5 hrs).',
    places: [
      {
        name:        'Art Institute of Chicago',
        time:        '9:30 AM',
        description: 'One of the finest art museums in the United States and the second-largest in the country — home to Georges Seurat\'s A Sunday on La Grande Jatte (the painting that launched Pointillism), Grant Wood\'s American Gothic, and Edward Hopper\'s Nighthawks. The 2009 Modern Wing by Renzo Piano doubled the gallery space and added a natural light rail suspended above the galleries. The Griffin Court interior — a glass walkway above Columbus Drive connecting the old and new buildings — is itself a significant architectural intervention photographed as a building within a city within a museum.',
        images: [
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from Loews Chicago Hotel (15 min south along the lakefront) · 111 S Michigan Ave',
        cost:      2100,
        tip:       'Nighthawks is in Gallery 262. Seurat\'s Grande Jatte is in Gallery 240. American Gothic is in Gallery 263. All three are on the second floor of the original building. Buy timed entry tickets online to skip the queue. Allocate 2 hours minimum.',
      },
      {
        name:        'Wicker Park Neighbourhood',
        time:        '1:30 PM',
        description: 'Chicago\'s most culturally interesting neighbourhood for independent culture: the Milwaukee Avenue main strip has vintage record shops, independent bookstores, galleries, Ukrainian Village church spires rising above flat rooftops, and the historic Six Corners intersection. The neighbourhood became the centre of Chicago alternative music in the 1990s and retains a creative density unusual in a city of Chicago\'s scale. The independent coffee shops and vegetarian restaurants on Damen Avenue make this the most pleasant afternoon neighbourhood walk in the city.',
        images: [
          'https://images.unsplash.com/photo-1520962922320-2b4680cd4f80?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1484778954284-ff00a5a29f9c?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Chicago L Blue Line from Clark/Lake (Loop) to Damen station (25 min)',
        cost:      0,
        tip:       'Reckless Records on Milwaukee Ave (1532 N Milwaukee) is Chicago\'s finest independent record shop. Handlebar Bar & Grill at 2311 W North Ave is a solid vegetarian lunch stop. Walk south on Damen past Chicago Ave for the St. Nicholas Ukrainian Cathedral.',
      },
      {
        name:        'United Center — Michael Jordan Statue',
        time:        '4:30 PM',
        description: 'The United Center at 1901 W Madison Street is the home arena of the Chicago Bulls — "The House That Jordan Built." The bronze Michael Jordan statue at the main entrance, titled "The Spirit," shows Jordan at full extension in his iconic free-throw line dunk pose that became the Air Jordan logo. At 5 metres tall and weighing over a tonne, the statue is the most visited sports monument in Chicago. Even with no game in September pre-season, the exterior of the arena and the statue are legitimate pilgrimage stops for any basketball traveller.',
        images: [
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505839996-7b4f3a2d7f41?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Uber from Wicker Park (10 min) · 1901 W Madison St, Near West Side',
        cost:      0,
        tip:       'The statue is on a raised plaza on the east side of the arena — shoot from ground level looking up for the most dramatic perspective. If there is a pre-season game (check schedule), tickets can be purchased same-day at the box office for $30–50. Allow time to get to ORD for the evening flight.',
      },
    ],
    food:    [
      'The Publican, 837 W Fulton Market, West Loop (strong vegetarian menu — grain salads, roasted vegetables; excellent craft beer list)',
      'Handlebar Bar & Grill, 2311 W North Ave, Wicker Park (fully vegetarian / vegan menu — the Grilled Cheese and Veggie Burger are excellent)',
      'Bow Truss Coffee Roasters, 1641 N Damen Ave, Wicker Park (Wicker Park\'s best specialty coffee)',
    ],
    stay:    'The Jane Hotel, 113 Jane St, West Village, New York City — check in late evening',
    nextDay: 'New York City: High Line elevated park + Chelsea Market + MoMA',
  },

  // ── Day 11 ──────────────────────────────────────────────────────────────────
  {
    num:       '11',
    date:      'Sep 18 — Thursday',
    city:      'New York',
    title:     'High Line + Chelsea Market + MoMA',
    transport: 'Subway (MetroCard / OMNY contactless) — best and fastest way to navigate NYC. Flew ORD → JFK prior evening, checked in late. L and A/C/E trains for West Side destinations.',
    places: [
      {
        name:        'High Line',
        time:        '9:00 AM',
        description: 'The world\'s most celebrated elevated park was built on a disused 1930s freight railway line running 2.3km above the West Side streets of Manhattan, 9 metres above the pavement. From Gansevoort Street in the Meatpacking District north to 34th Street at Hudson Yards, the High Line transforms an industrial artifact into a linear garden planted with prairie grasses and perennials that reach peak late-bloom in September. The Hudson Yards end terminates at the Vessel — Thomas Heatherwick\'s 46-metre honeycomb bronze structure — and the Edge observation deck cantilevers over Midtown at 335 metres. The High Line itself is free.',
        images: [
          'https://images.unsplash.com/photo-1516916759473-600c07bc12d4?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway A/C/E to 14th St / 8th Ave, walk to Gansevoort St entrance (southernmost) · The Jane Hotel is 10 min walk',
        cost:      0,
        tip:       'Walk south-to-north (Gansevoort → 34th) to end at Hudson Yards. The railway track centerline shot — looking north along the old steel rails with Manhattan towers rising on both sides — is the essential High Line photograph and least crowded at 9 AM. The 10th Ave Square viewpoint frames the city grid through a glass-walled overlook.',
      },
      {
        name:        'Chelsea Market',
        time:        '11:00 AM',
        description: 'The former Nabisco factory complex at 75 Ninth Avenue (where the Oreo cookie was invented in 1912) was converted in 1997 into the city\'s most architecturally interesting food hall — the raw industrial interior retains the original 1890s brick walls, old metal ductwork repurposed as decorative conduits, and water features built from salvaged factory equipment. The ground floor market has 35 vendors. The industrial corridor connecting 9th and 10th Avenue is a self-contained architectural experience even without purchasing anything.',
        images: [
          'https://images.unsplash.com/photo-1516916759473-600c07bc12d4?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk down from the High Line 10th Ave staircase directly into the 10th Ave Chelsea Market entrance',
        cost:      0,
        tip:       'Los Tacos No.1 inside Chelsea Market has fully vegetarian options — the mushroom taco and quesadilla are outstanding. Arrive at 11 AM before the lunch queue. The interior corridor architecture is best photographed with a wide-angle lens shooting the length of the hall toward the brick arches.',
      },
      {
        name:        'Museum of Modern Art (MoMA)',
        time:        '2:00 PM',
        description: 'The world\'s most important collection of modern and contemporary art — MoMA holds Van Gogh\'s The Starry Night, Picasso\'s Les Demoiselles d\'Avignon, Warhol\'s Campbell\'s Soup Cans, Matisse\'s Dance, and Frida Kahlo\'s Self-Portrait. The 2019 Glenn Lowry renovation by Diller Scofidio + Renfro doubled gallery space and opened the collection to more international and underrepresented artists. The Abby Aldrich Rockefeller Sculpture Garden — an open-air courtyard with works by Rodin and Brâncuși — is one of the most unexpectedly peaceful 30 minutes available in Midtown Manhattan.',
        images: [
          'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1516916759473-600c07bc12d4?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway E to 53rd St / 5th Ave (10 min from Chelsea) · MoMA, 11 W 53rd St, Midtown',
        cost:      2500,
        tip:       'The Starry Night is Gallery 505, fifth floor. Book timed entry online — walk-in is possible but may involve a 30-min queue. Photography is permitted throughout the galleries; no flash. Free Friday evenings 5:30–9 PM.',
      },
    ],
    food:    [
      'Eataly NYC, 200 5th Ave, Flatiron (Italian food hall — multiple vegetarian pasta, pizza, and antipasto stations; best quality/variety for vegetarian eating in NYC)',
      'The Halal Guys (W 53rd St & 6th Ave cart) — the falafel platter (fully vegetarian) with white sauce and hot sauce is one of the city\'s defining street food tastes',
      'Joe Coffee, 405 W 23rd St, Chelsea (NYC\'s beloved specialty coffee mini-chain — the best neighbourhood espresso in the West Village / Chelsea corridor)',
    ],
    stay:    'The Jane Hotel, 113 Jane St, West Village, New York City — historic 1908 building, solo cabin rooms',
    nextDay: 'Brooklyn Bridge walk + DUMBO + Central Park',
  },

  // ── Day 12 ──────────────────────────────────────────────────────────────────
  {
    num:       '12',
    date:      'Sep 19 — Friday',
    city:      'New York',
    title:     'Brooklyn Bridge + DUMBO + Central Park',
    transport: 'Subway to Brooklyn Bridge-City Hall (4/5/6 trains from West Village via Fulton). Walk across bridge (45 min). DUMBO by foot. Subway back to Central Park (A/C to 59th St or B/C to 72nd St).',
    places: [
      {
        name:        'Brooklyn Bridge Walk',
        time:        '8:00 AM',
        description: 'The 1883 Brooklyn Bridge — the first long-span suspension bridge in the world to use steel cables — has its 1.8km wooden pedestrian boardwalk running above the traffic deck between the two Gothic limestone towers. Walking from the Manhattan side heading east at 8 AM in September light, the DUMBO neighbourhood below on the Brooklyn side is framed between the bridge cables in a composition that has defined how the world pictures New York. The two towers rise 83 metres and their pointed Gothic arches are among the most recognisable silhouettes in architectural history.',
        images: [
          'https://images.unsplash.com/photo-1440374561038-95b49c39f875?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1499394931946-87fe24db53a9?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway 4/5/6 from Bleecker St to Brooklyn Bridge-City Hall station · Walk to bridge entrance on Centre St',
        cost:      0,
        tip:       'Walk from Manhattan to Brooklyn (east direction) for the best photographic angle — the DUMBO skyline below and the Williamsburg Bridge in the far background create a compressed layered shot. Arrive at 7:45 AM before the cycling commuters and tourists claim the centre. The bridge cables fanning from each tower, shot looking directly up against the sky, are the strongest abstract composition.',
      },
      {
        name:        'DUMBO Neighbourhood',
        time:        '9:30 AM',
        description: 'Down Under the Manhattan Bridge Overpass — the cobblestone blocks of DUMBO converge at Washington Street and Water Street where the Manhattan Bridge\'s steel arch perfectly frames the Empire State Building at the end of the street. This is the most photographed single spot in Brooklyn and one of the most technically perfect urban compositions in any city: rough cobblestones, the bridge arch, the distant skyscraper, and soft morning light all aligning within 20 metres of each other. The Brooklyn Bridge Park waterfront is 2 minutes south for the Manhattan skyline view from water level.',
        images: [
          'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1485871981521-5b1fd3805795?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk off the Brooklyn Bridge exit toward Main St, turn left to Washington St (3 min)',
        cost:      0,
        tip:       'The Washington St / Water St corner is busiest on weekend mornings — arrive early (9:30 AM Friday is manageable) and wait for a gap in pedestrian traffic for a clean street frame. Shoot from the centre of Washington Street looking toward the Manhattan Bridge arch — the Empire State Building appears in the arch opening. Best light: morning from the east.',
      },
      {
        name:        'Central Park',
        time:        '12:00 PM',
        description: 'Frederick Law Olmsted and Calvert Vaux\'s 843-acre park at the heart of Manhattan contains 58 km of footpaths, 36 decorative bridges, meadows, forests, and formal gardens pressed between the West Side and East Side residential towers. The Bow Bridge (1862, cast iron) reflected symmetrically in the Lake is the park\'s most photographed composition. Bethesda Fountain and Terrace (the architectural centrepiece at the lake\'s edge), the Ramble forest (a 15-hectare woodland with 200+ bird species), and the Mall\'s double elm canopy create completely distinct landscape experiences within walking distance. In September the oaks begin their first colour change.',
        images: [
          'https://images.unsplash.com/photo-1588979745674-8ccf7ef34e4e?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway A from High St Brooklyn to 59th St-Columbus Circle, or B/C to 72nd St (30 min)',
        cost:      0,
        tip:       'Enter at the W 72nd St entrance for the most direct route to Bethesda Fountain and Bow Bridge. The Bow Bridge reflection is best at dawn on a calm morning — on a September afternoon aim for the Mall\'s elm corridor in the afternoon light. Belvedere Castle on the rocky outcrop at 79th Street is free to enter and has the best elevated interior park view.',
      },
    ],
    food:    [
      'Russ & Daughters Café, 127 Orchard St, Lower East Side (smoked fish and Jewish deli institution since 1914 — the classic everything bagel with cream cheese and lox is unmissable)',
      'Taïm, 222 Waverly Place, West Village (fully vegetarian falafel and mezze — the finest falafel in NYC)',
      'Breads Bakery, 18 E 16th St, Union Square (Israeli bakery — the chocolate babka is a NYC institution; excellent vegetarian pastries all day)',
    ],
    stay:    'The Jane Hotel, 113 Jane St, West Village, New York City',
    nextDay: 'Rucker Park basketball + NBA Store 5th Ave + Times Square final night',
  },

  // ── Day 13 ──────────────────────────────────────────────────────────────────
  {
    num:       '13',
    date:      'Sep 20 — Saturday',
    city:      'New York',
    title:     'Rucker Park + NBA Store + Times Square',
    transport: 'Subway 4/5 Express to 125th St, walk north or take M10 bus to Rucker Park (155th St & 8th Ave). Subway back to Midtown for NBA Store.',
    places: [
      {
        name:        'Rucker Park (Frederick Johnson Playground)',
        time:        '1:00 PM',
        description: 'The most famous outdoor basketball court on Earth sits at 155th Street and Eighth Avenue in Harlem — a standard regulation court surrounded by chain-link fencing and bleachers that have witnessed Kareem Abdul-Jabbar, Julius Erving, Connie Hawkins, and LeBron James play pickup basketball on the same asphalt. The EBC (Entertainers Basketball Classic) summer league was founded here; the Saturday afternoon pickup culture that runs through September is deeply competitive, high-level, and operates on an informal street code older than the NBA itself. The NYC public housing towers of the Polo Grounds Houses rise directly behind the east backboard as a permanently dramatic backdrop.',
        images: [
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505839996-7b4f3a2d7f41?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway 4/5 Express from 14th St to 125th St (20 min), walk or bus north to 155th St & 8th Ave',
        cost:      0,
        tip:       'Saturday afternoon 1–4 PM is the highest-level pickup time. If you want to play: bring proper court shoes, show up early, call "next" on a team, and earn your spot — the Rucker operates on merit. If watching: the bleachers fill by 2 PM, so arrive early. Photography from the bleacher level is best — stay off the court during active runs.',
      },
      {
        name:        'NBA Store, 5th Avenue',
        time:        '4:30 PM',
        description: 'The NBA\'s global flagship retail location at 666 Fifth Avenue occupies four floors of current team merchandise, game-worn jersey museum displays, customisation stations for personalised jerseys, interactive basketball courts, and a comprehensive archive of historical NBA photography. The game-worn jersey collection includes documented postseason pieces from franchise-defining performances. The custom jersey printing station allows personalisation in 15 minutes. September is post-draft, pre-season: new kit lines and rookie gear are fresh in.',
        images: [
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505839996-7b4f3a2d7f41?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway 2/3 from 125th St to Times Square, walk east to 5th Ave (10 min)',
        cost:      0,
        tip:       'Budget 90 minutes here — the game-worn jersey displays are on the upper floors and rarely rushed through. The custom jersey printing station queue is shortest on weekday afternoons; Saturday may involve a 20-min wait. The interactive shooting game on the ground floor is free.',
      },
      {
        name:        'Times Square Evening',
        time:        '9:30 PM',
        description: 'The intersection of 7th Avenue and Broadway from 42nd to 47th Street — 330,000 people walk through daily making it the busiest pedestrian intersection on Earth. At 10 PM in September the full LED canyon effect is at maximum: the curved and angled billboard displays on buildings covering 17 city blocks from street level to the 40th floor create a complete immersive light environment. The compression telephoto shot from the north end of the bow-tie (looking south from 47th Street) captures the full depth of the LED canyon narrowing toward 42nd Street.',
        images: [
          'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1485871981521-5b1fd3805795?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from NBA Store (10 min)',
        cost:      0,
        tip:       'Stand at the south end of the TKTS Red Steps (45th Street and Broadway) for the elevated view over the square — this is the most comprehensive single viewpoint in Times Square and free to access. Shoot on a tripod or rest the camera on the stair rail for long exposures. The 10–10:30 PM window has the most vehicle density and the most active billboard cycling.',
      },
    ],
    food:    [
      'Sylvia\'s Restaurant, 328 Malcolm X Blvd, Harlem (soul food institution since 1962 — the mac and cheese, black-eyed peas, and candied yams are the vegetarian plate)',
      'Ess-a-Bagel, 831 3rd Ave, Midtown East (NYC\'s authentic Jewish deli bagel — the everything bagel with cream cheese at any hour is the correct order)',
      'Momofuku Noodle Bar, 171 1st Ave, East Village (David Chang\'s original 2004 restaurant — the vegetarian ramen with shiitake dashi broth is outstanding)',
    ],
    stay:    'The Jane Hotel, 113 Jane St, West Village, New York City',
    nextDay: 'Final NYC morning — Ess-a-Bagel breakfast + Brooklyn Heights Promenade → JFK departure to Lisbon',
  },

  // ── Day 14 ──────────────────────────────────────────────────────────────────
  {
    num:       '14',
    date:      'Sep 21 — Sunday',
    city:      'New York → Lisbon',
    title:     'Final Morning — Brooklyn Heights Promenade → JFK Departure',
    transport: 'Subway A to High St (Brooklyn Heights) for dawn. Return to Manhattan, check out, Uber or Subway to JFK (A train from Howard Beach, 60 min). Flight JFK → LIS overnight (~7 hrs). Portugal Arc 09 begins.',
    places: [
      {
        name:        'Ess-a-Bagel Final Breakfast',
        time:        '7:00 AM',
        description: 'Ess-a-Bagel on 3rd Avenue is New York\'s definitive Jewish deli bagel institution — a boiling-and-baking operation that has been producing kettle-boiled water bagels since 1976. The everything bagel (sesame, poppy, garlic, onion, salt, toasted) with a proper schmear of cream cheese and Nova lox (cold-smoked salmon) at 7 AM before a departure day is one of the quintessential NYC experiences. Order it "with a schmear" — the correct phrasing. The morning rush behind the counter, the wall of stacked bagels, and the fluorescent-lit chaos are a photography study in New York working culture.',
        images: [
          'https://images.unsplash.com/photo-1499394931946-87fe24db53a9?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1440374561038-95b49c39f875?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Walk from The Jane Hotel, West Village (20 min east along 14th St) or subway L to 3rd Ave',
        cost:      800,
        tip:       'Arrive at 7 AM on a Sunday — the bagels are freshest in the first hour of opening. The lox bagel with cream cheese is ₹700–900 all-in. Take a second bagel wrapped for the airport — it travels perfectly and beats any JFK terminal food by a significant margin.',
      },
      {
        name:        'Brooklyn Heights Promenade',
        time:        '8:30 AM',
        description: 'The 0.5km cantilevered promenade above the Brooklyn-Queens Expressway at the edge of the Brooklyn Heights bluff offers the definitive unobstructed Manhattan skyline view — the full lower Manhattan skyline from 1 WTC south to the Statue of Liberty in the harbour, with the Brooklyn Bridge in the middle ground connecting the two boroughs. September morning light at 8:30 AM hits the Manhattan skyscrapers from the southeast, creating long shadows between buildings and lighting the glass facades from the south. This is the final photograph of the USA leg.',
        images: [
          'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1485871981521-5b1fd3805795?w=900&q=70&auto=format&fit=crop',
        ],
        transport: 'Subway A from West 4th St to High St-Brooklyn Bridge (Clark St exit for Promenade, 20 min)',
        cost:      0,
        tip:       'Take the Clark Street station exit and walk one block west to the Promenade entrance at Remsen Street. The full skyline is visible from the entire promenade length — the south end (opposite Pier 17) frames the Statue of Liberty and 1 WTC together. Allow 45 minutes. Subway A from High St to Howard Beach, then AirTrain to JFK Terminal 4.',
      },
    ],
    food:    [
      'Ess-a-Bagel (above — the 7 AM departure breakfast)',
      'Dean & DeLuca or Hudson News, JFK Terminal 4 — gourmet market snacks for the flight',
      'Joe Coffee, JFK Terminal 4 (Joe Coffee has a JFK location — the best specialty coffee available in the airport)',
    ],
    stay:    null,
    nextDay: null,
  },
]

export const TOTAL_PLACES = DAYS.reduce((s, d) => s + d.places.length, 0)
