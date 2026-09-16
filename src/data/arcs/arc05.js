// Arc 05 — Western Europe (2031)
// France → Germany → Luxembourg → Netherlands

export const ARC_05 = {
  tripOrder: ['france', 'germany', 'luxembourg', 'netherlands'],

  itinerary: [
    { days: '1–4',  city: 'Paris',           country: 'france',      nights: 4, transport: 'Flight BLR → CDG (Air France / IndiGo via various hubs)',    highlights: ['Eiffel Tower (timed ticket)', 'Louvre + Musée d\'Orsay', 'Le Marais district', 'Montmartre + Sacré-Cœur', 'Seine river walk at dusk', 'Père Lachaise cemetery', 'Canal Saint-Martin'] },
    { days: '5',    city: 'Champagne',        country: 'france',      nights: 1, transport: 'TGV or rental car from Paris (~1.5 hrs)',                     highlights: ['Reims Cathedral', 'Champagne cellar tour (Moët, Veuve Clicquot)', 'Route du Champagne vineyard drive'], highlight: 'Champagne Wine Route' },
    { days: '6–7',  city: 'Alsace',           country: 'france',      nights: 2, transport: 'TGV Paris → Strasbourg (1.75 hrs)',                          highlights: ['Strasbourg Cathedral', 'Petite France half-timbered quarter', 'Colmar Christmas market town (also great off-season)', 'Alsatian wine route (Riquewihr, Ribeauvillé)'] },
    { days: '8',    city: 'Stuttgart',        country: 'germany',     nights: 1, transport: 'ICE train Strasbourg → Stuttgart (1 hr)',                     highlights: ['Porsche Museum (120 cars across 70 years)', 'Mercedes-Benz Museum', 'Killesberg Park lookout tower', 'Cannstatter Wasen (Stuttgart beer festival grounds)'] },
    { days: '9–10', city: 'Munich',           country: 'germany',     nights: 2, transport: 'ICE train Stuttgart → Munich (2.5 hrs)',                     highlights: ['English Garden (world\'s largest urban park)', 'BMW Welt + BMW Museum', 'Nymphenburg Palace + gardens', 'Dachau memorial (day trip)', 'Hofbräuhaus', 'Marienplatz + Glockenspiel'] },
    { days: '11',   city: 'Neuschwanstein',   country: 'germany',     nights: 0, transport: 'Day trip from Munich by train (2 hrs) + bus',                highlights: ['Neuschwanstein Castle (inspiration for Disney castle)', 'Hohenschwangau Castle', 'Alpsee lake walk', 'Marienbrücke viewpoint bridge'] },
    { days: '12',   city: 'Nuremberg',        country: 'germany',     nights: 1, transport: 'ICE train Munich → Nuremberg (1 hr)',                        highlights: ['Nuremberg Old Town + Imperial Castle', 'Nazi Documentation Centre (essential historical visit)', 'Nuremberg Christmas Market site', 'Handwerkerhof artisan market alley'] },
    { days: '13',   city: 'Luxembourg City',  country: 'luxembourg',  nights: 1, transport: 'ICE Nuremberg → Frankfurt → Luxembourg (4 hrs)',             highlights: ['Grund valley and viaduct panorama', 'Bock Casemates underground fortifications', 'Place d\'Armes cobblestones', 'Chemin de la Corniche — Europe\'s most beautiful balcony'] },
    { days: '14–15',city: 'Brussels',         country: 'netherlands', nights: 2, transport: 'Train Luxembourg → Brussels (3 hrs) — stopover city',       highlights: ['Grand Place (UNESCO)', 'Manneken Pis', 'Magritte Museum', 'Chocolate and waffle district', 'Atomium sculpture'], highlight: 'Brussels stopover' },
    { days: '16–17',city: 'Amsterdam',        country: 'netherlands', nights: 2, transport: 'Thalys Brussels → Amsterdam (1.75 hrs)',                    highlights: ['Anne Frank House (book months ahead)', 'Rijksmuseum + Van Gogh Museum', 'Canal boat tour', 'Jordaan neighbourhood', 'Albert Cuyp Market', 'Vondelpark'] },
    { days: '18',   city: 'The Hague / Delft',country: 'netherlands', nights: 1, transport: 'Intercity train from Amsterdam (1 hr)',                     highlights: ['Mauritshuis Museum (Girl with a Pearl Earring)', 'International Court of Justice', 'Delft historic canal town + Royal Delft factory'] },
    { days: '19–20',city: 'Rotterdam',        country: 'netherlands', nights: 2, transport: 'Train The Hague → Rotterdam (30 min)',                      highlights: ['Markthal food hall + architecture', 'Cube Houses (Blaak)', 'Erasmusbrug bridge at night', 'Museum Boijmans Van Beuningen', 'Kinderdijk windmills (20 min from Rotterdam)'] },
  ],

  transport: [
    { type: 'Flight',  icon: '✈️', segment: 'BLR → Paris (CDG)',             detail: 'Air France, Emirates, or IndiGo via various hubs.' },
    { type: 'Train',   icon: '🚂', segment: 'Paris → Strasbourg (TGV)',       detail: '1.75 hrs. SNCF — book at sncf-connect.com.' },
    { type: 'Train',   icon: '🚂', segment: 'Strasbourg → Stuttgart (ICE)',   detail: '1 hr. Deutsche Bahn cross-border service.' },
    { type: 'Train',   icon: '🚂', segment: 'Stuttgart → Munich (ICE)',       detail: '2.5 hrs. Hourly departures.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Alsace Wine Route',           detail: 'Car recommended for vineyard village hopping. 1 day.', highlight: 'Alsace Wine Route Scenic Drive' },
    { type: 'Train',   icon: '🚂', segment: 'Munich → Nuremberg → Luxembourg', detail: 'ICE + regional. ~4 hrs total. Eurail pass useful here.' },
    { type: 'Train',   icon: '🚂', segment: 'Luxembourg → Brussels (Thalys)', detail: '3 hrs.' },
    { type: 'Train',   icon: '🚂', segment: 'Brussels → Amsterdam (Thalys)', detail: '1.75 hrs. Book at b-europe.com.' },
    { type: 'Train',   icon: '🚂', segment: 'Amsterdam ↔ The Hague ↔ Rotterdam', detail: 'NS intercity. 30–60 min per leg. OV-chipkaart or day ticket.' },
    { type: 'Flight',  icon: '✈️', segment: 'Amsterdam (AMS) → BLR',         detail: 'KLM direct ~9 hrs, or connecting.' },
  ],

  currencies: [
    { country: 'France',      code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'Card dominant in cities. Carry €50 cash for smaller towns and markets.' },
    { country: 'Germany',     code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'Germany still uses significant cash. Bring €100 for the Germany segment.' },
    { country: 'Luxembourg',  code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'High cost of living. Budget 20% more than France for meals.' },
    { country: 'Netherlands', code: 'EUR', symbol: '€', rateToINR: 93.50, notes: 'Very card-friendly. iDEAL mobile payment everywhere.' },
  ],

  highlights: [
    { tripId: 'france',      city: 'Paris',         items: ['Eiffel Tower', 'Louvre', 'Musée d\'Orsay', 'Le Marais', 'Montmartre'] },
    { tripId: 'france',      city: 'Alsace',        items: ['Strasbourg Cathedral', 'Petite France', 'Alsace Wine Route', 'Colmar'] },
    { tripId: 'germany',     city: 'Stuttgart',     items: ['Porsche Museum', 'Mercedes-Benz Museum', 'Killesberg tower view'] },
    { tripId: 'germany',     city: 'Munich',        items: ['English Garden', 'BMW Welt', 'Nymphenburg Palace', 'Marienplatz'] },
    { tripId: 'germany',     city: 'Neuschwanstein',items: ['Disney castle', 'Marienbrücke viewpoint', 'Alpsee lake walk'] },
    { tripId: 'luxembourg',  city: 'Luxembourg',   items: ['Grund viaduct panorama', 'Bock Casemates', 'Corniche balcony'] },
    { tripId: 'netherlands', city: 'Amsterdam',    items: ['Anne Frank House', 'Rijksmuseum', 'Canal tour', 'Jordaan'] },
    { tripId: 'netherlands', city: 'Rotterdam',    items: ['Markthal', 'Cube Houses', 'Erasmusbrug', 'Kinderdijk windmills'] },
  ],

  packingNotes: [
    { category: 'European Spring', icon: '🌸', items: ['Light layers (May–June: 15–22°C in most cities)', 'One smart-casual outfit for nicer restaurants', 'Compact umbrella (Paris showers are frequent)', 'Walking shoes with good soles (major cobblestone cities)'] },
    { category: 'Car Day', icon: '🚗', items: ['International Driving Permit for car rental days (Alsace, Champagne)', 'European road trip kit: vignette sticker not needed for this route'] },
    { category: 'Museum Days', icon: '🎨', items: ['Book Anne Frank House, Louvre, Porsche Museum well ahead — all require timed tickets', 'Museum pass options: Paris Museum Pass, Holland Pass'] },
  ],

  map: {
    center: [50.0, 6.0],
    zoom: 5,
    markers: [
      { id: 'paris',       name: 'Paris',         lat: 48.8566, lng:  2.3522, tripId: 'france',      day: '1–4'   },
      { id: 'strasbourg',  name: 'Strasbourg',    lat: 48.5734, lng:  7.7521, tripId: 'france',      day: '6–7'   },
      { id: 'stuttgart',   name: 'Stuttgart',     lat: 48.7758, lng:  9.1829, tripId: 'germany',     day: '8'     },
      { id: 'munich',      name: 'Munich',        lat: 48.1351, lng: 11.5820, tripId: 'germany',     day: '9–11'  },
      { id: 'nuremberg',   name: 'Nuremberg',     lat: 49.4521, lng: 11.0767, tripId: 'germany',     day: '12'    },
      { id: 'luxembourg',  name: 'Luxembourg',    lat: 49.6116, lng:  6.1319, tripId: 'luxembourg',  day: '13'    },
      { id: 'brussels',    name: 'Brussels',      lat: 50.8503, lng:  4.3517, tripId: 'netherlands', day: '14–15' },
      { id: 'amsterdam',   name: 'Amsterdam',     lat: 52.3676, lng:  4.9041, tripId: 'netherlands', day: '16–17' },
      { id: 'rotterdam',   name: 'Rotterdam',     lat: 51.9244, lng:  4.4777, tripId: 'netherlands', day: '18–20' },
    ],
    route: [
      [48.8566,  2.3522], [48.5734,  7.7521], [48.7758,  9.1829],
      [48.1351, 11.5820], [49.4521, 11.0767], [49.6116,  6.1319],
      [50.8503,  4.3517], [52.3676,  4.9041], [51.9244,  4.4777],
    ],
  },

  stays: [
    {
      country: 'France', flag: '🇫🇷', tripId: 'france',
      cities: [
        { city: 'Paris',      type: 'Boutique Hotel / Hostel', nights: 4, note: 'Le Marais or République — metro access everywhere, walkable evenings' },
        { city: 'Champagne',  type: 'B&B / Chambres d\'hôtes', nights: 1, note: 'Reims or Épernay — stay near the vine-covered hills' },
        { city: 'Strasbourg', type: 'Hotel',                   nights: 2, note: 'Petite France quarter — half-timbered houses outside the window' },
      ],
    },
    {
      country: 'Germany', flag: '🇩🇪', tripId: 'germany',
      cities: [
        { city: 'Stuttgart',     type: 'Hotel',           nights: 1, note: 'City centre — 15-min drive to Porsche Museum (Zuffenhausen)' },
        { city: 'Munich',        type: 'Hotel / Hostel',  nights: 3, note: 'Schwabing or near Hauptbahnhof — day trips to Neuschwanstein included' },
        { city: 'Nuremberg',     type: 'Hotel',           nights: 1, note: 'Old Town (Altstadt) for walking distance to castle + market site' },
      ],
    },
    {
      country: 'Luxembourg', flag: '🇱🇺', tripId: 'luxembourg',
      cities: [
        { city: 'Luxembourg City', type: 'Hotel',         nights: 1, note: 'Ville Haute — above the Grund valley for easy sightseeing' },
      ],
    },
    {
      country: 'Netherlands', flag: '🇳🇱', tripId: 'netherlands',
      cities: [
        { city: 'Brussels',    type: 'Hotel',            nights: 2, note: 'Ixelles or near Grand Place — stopover en route to Amsterdam' },
        { city: 'Amsterdam',   type: 'Hotel / Hostel',   nights: 2, note: 'Jordaan or Leidseplein — canal views and easy museum access' },
        { city: 'Rotterdam',   type: 'Hotel',            nights: 2, note: 'Kop van Zuid / Erasmusbrug area — architectural hotel fits the city\'s vibe' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'France', flag: '🇫🇷',
      items: [
        { name: 'Champagne miniature (Moët & Chandon / Veuve Clicquot)', where: 'Champagne cellar gift shop, Épernay' },
        { name: 'Alsatian gingerbread (Lebkuchen)', where: 'Colmar or Strasbourg market shops' },
        { name: 'Eiffel Tower keyring (quality brass, not tourist plastic)', where: 'Museum shops, not street stalls' },
      ],
    },
    {
      country: 'Germany', flag: '🇩🇪',
      items: [
        { name: 'Porsche Museum scale model diecast', where: 'Porsche Museum gift shop, Stuttgart-Zuffenhausen' },
        { name: 'Nuremberg wooden Christmas ornament', where: 'Handwerkerhof artisan market alley, Nuremberg' },
        { name: 'German craft beer gift box', where: 'Supermarkets or specialist beer shops in Munich' },
      ],
    },
    {
      country: 'Netherlands', flag: '🇳🇱',
      items: [
        { name: 'Delft blue tile or miniature house', where: 'Royal Delft factory shop, Delft' },
        { name: 'Stroopwafel tin', where: 'Albert Cuyp Market or any supermarket' },
        { name: 'Van Gogh print (small, museum quality)', where: 'Van Gogh Museum gift shop, Amsterdam' },
      ],
    },
  ],

  bookings: [
    { id: 'we01', label: 'Flight BLR → Paris (CDG)',                category: 'transport',     priority: 'critical', window: { start: '2031-01', end: '2031-04' } },
    { id: 'we02', label: 'Flight Amsterdam (AMS) → BLR',            category: 'transport',     priority: 'critical', window: { start: '2031-01', end: '2031-04' } },
    { id: 'we03', label: 'Schengen Visa (France as entry country)', category: 'document',      priority: 'critical', window: { start: '2031-03', end: '2031-04' } },
    { id: 'we04', label: 'Anne Frank House — book months ahead',    category: 'experience',    priority: 'critical', window: { start: '2031-01', end: '2031-04' } },
    { id: 'we05', label: 'Porsche Museum Stuttgart — timed entry', category: 'experience',    priority: 'high',     window: { start: '2031-03', end: '2031-05' } },
    { id: 'we06', label: 'Neuschwanstein Castle timed ticket',      category: 'experience',    priority: 'high',     window: { start: '2031-03', end: '2031-05' } },
    { id: 'we07', label: 'Louvre or Musée d\'Orsay Paris ticket',  category: 'experience',    priority: 'high',     window: { start: '2031-03', end: '2031-05' } },
    { id: 'we08', label: 'Eurail Pass or point-to-point rail',      category: 'transport',     priority: 'high',     window: { start: '2031-03', end: '2031-05' } },
    { id: 'we09', label: 'Travel insurance (multi-country)',         category: 'document',      priority: 'critical', window: { start: '2031-05', end: '2031-05' } },
  ],

  notes: [
    'Eurail Pass covers France, Germany, Luxembourg, Belgium, Netherlands — calculate if worth it vs. point-to-point tickets.',
    'Porsche Museum and Mercedes-Benz Museum are both in Stuttgart — full day required for both.',
    'Anne Frank House requires booking weeks or months in advance. No walk-in tickets available.',
    'Neuschwanstein Castle is extremely crowded in summer — arrive before 9 AM.',
    'Germany is more cash-reliant than the rest of Western Europe. Budget €150 in cash for Germany days.',
    'Paris–Champagne–Alsace makes a logical first leg if arriving CDG.',
    'Best time: May or September (off-peak, good weather, fewer crowds).',
  ],

  practicalInfo: {
    weather: 'May–June across Western Europe: Paris 15–22°C (pleasant, occasional showers), Germany 12–20°C, Netherlands 14–18°C. Bring a light rain jacket everywhere — Amsterdam especially. No heatwave risk in May.',
    emergency: 'EU-wide: 112 · France: 15 (SAMU Medical) · Germany: 110 (Police) · Netherlands: 112',
    driving: [
      'France: motorway tolls frequent — A6 from Paris south ~€40. Pay by card at unmanned booths.',
      'France ZCR zones in Paris: no driving in central Paris. Park outside (P+R) and take Metro.',
      'Germany Autobahn: NO speed limit on unrestricted sections — some stretches allow 200+ km/h. Stay right unless overtaking.',
      'Germany requires a green Umweltplakette (environmental sticker) to enter city centres. Rental cars come with one.',
      'Alsace wine route: narrow village roads, no tolls. Drive slowly — pedestrians and cyclists everywhere.',
      'Netherlands: cyclists always have right of way. Separate cycle lanes everywhere — do not park or stop in them.',
    ],
    transit: [
      'Eurail Global Pass (5 days in 2 months): covers SNCF (France), Deutsche Bahn (Germany), NS (Netherlands). Calculate vs. point-to-point — advance tickets often cheaper.',
      'Paris: Navigo weekly pass (€30) covers all metro, RER, bus within zones 1–5. Buy at any metro station.',
      'Germany Rail (DB): book early on bahn.de — Sparpreis fares (€17.90–39) fill fast.',
      'Amsterdam: GVB day pass (€9) for tram + bus. OV-chipkaart (€7.50 deposit) for metro.',
      'Thalys train: Brussels–Amsterdam (1h45m) is the fastest and most comfortable connection. Book at b-europe.com.',
    ],
    payment: [
      'France, Luxembourg, Netherlands: card everywhere. Contactless works on buses, metros, markets.',
      'Germany: cash is surprisingly common. Many Munich and Stuttgart restaurants and smaller shops are cash-only.',
      'Budget €100 cash for Germany days; €20–30 for France/Netherlands.',
      'Paris museum passes: Paris Museum Pass (2-day €52, 4-day €67) covers Louvre, Musée d\'Orsay, Versailles — skip the queues.',
    ],
    sim: [
      'EU SIM roams across all 4 countries without extra charge. Buy a French SIM (Orange, Bouygues) on arrival at CDG.',
      'Free5 (French carrier): €19.99/month unlimited data. Works across all EU countries.',
      'Free WiFi common in Paris cafés, train stations, and Amsterdam public spaces.',
    ],
    etiquette: [
      'France: greeting with "Bonjour" before asking for anything — skipping this is considered rude.',
      'French tipping: not obligatory. Round up for cafés, leave 5–10% for restaurants.',
      'Germany: punctuality is taken seriously — arriving late to any scheduled booking is genuinely disrespectful.',
      'Netherlands: cycling culture is sacred. Never rent a Boris Bike without practicing first — traffic is unforgiving.',
      'Luxembourg: city is small and walkable. Locals mix French and German freely — English is widely understood.',
    ],
  },

  foodHighlights: [
    {
      city: 'Paris',
      must: [
        { dish: 'Croissant at Du Pain et des Idées', note: 'Best in Paris (Canal Saint-Martin area). The escargot pastry with praline and chocolate is worth the detour.' },
        { dish: 'Steak frites at Le Relais de l\'Entrecôte', note: 'No menu — just one dish (entrecôte steak with secret walnut sauce + frites). Queue from 7 PM. Worth every minute.' },
        { dish: 'French onion soup at Au Pied de Cochon', note: 'Open 24hrs in Les Halles. Dark, gelatinous onion broth with crouton and melted Gruyère — the definitive version.' },
        { dish: 'Macarons at Ladurée on Champs-Élysées', note: 'The original Paris macaron (not the Italian version). Buy the seasonal flavour box (12pc) — each is perfect.' },
      ],
    },
    {
      city: 'Stuttgart / Munich',
      must: [
        { dish: 'Weisswurst breakfast at Hofbräuhaus, Munich', note: 'White veal sausage eaten before noon only (unwritten rule). With sweet mustard and a pretzel. ₹600 equivalent.' },
        { dish: 'Currywurst at Curry 61, Berlin (or any Berlin-style stall)', note: 'Grilled sausage sliced and covered in curried ketchup. Munich doesn\'t do this well — eat it in Stuttgart instead.' },
        { dish: 'Käsespätzle (Swabian noodles and cheese)', note: 'Stuttgart specialty — egg noodles baked with Emmental and topped with caramelised onions. Any Gasthaus in Stuttgart.' },
        { dish: 'Radler (beer + lemon soda)', note: 'Bavarian cyclist\'s drink — half wheat beer, half Sprite. Perfect for cycling the English Garden in Munich.' },
      ],
    },
    {
      city: 'Amsterdam',
      must: [
        { dish: 'Herring (Hollandse Nieuwe) at Stubbe\'s Haring', note: 'Raw herring with onion and pickle, eaten by dangling it above your head. Stubbe\'s at the Haarlemmerdijk bridge — since 1922.' },
        { dish: 'Stroopwafel from Albert Cuyp Market', note: 'Buy fresh from the market stall — warm caramel inside the waffle sandwich. Completely different from the packaged version.' },
        { dish: 'Jenever (Dutch gin) at a proeflokaal', note: 'Traditional tasting room (brown café). Order a kopstoot (jenever + beer). Wynand Fockink near Nieuwendijk is the oldest (1679).' },
        { dish: 'Bitterballen at any Dutch café', note: 'Deep-fried beef ragù croquettes. The national pub snack. Order with a cold Heineken — it\'s a ritual.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Eiffel Tower from Trocadéro', tip: 'Shoot at blue hour from the central Trocadéro terrace. The symmetrical reflection pools frame the tower. Arrive 45 min before sunset.', timing: 'Blue hour / dusk' },
    { location: 'Neuschwanstein Castle from Marienbrücke', tip: 'The suspension bridge 90m above the gorge gives the Disney postcard view. Arrive before 8 AM — bridge closes in bad weather.', timing: 'Morning golden hour' },
    { location: 'Amsterdam canal from Brouwersgracht', tip: 'The narrowest, prettiest canal in Jordaan — houseboats, bridges, and cobblestones. Best at 7 AM before cyclists fill the bridges.', timing: 'Early morning' },
    { location: 'Rotterdam Erasmusbrug at night', tip: 'Shoot from the south bank across to the bridge. The asymmetric pylon reflects in the water. 30 min after sunset best.', timing: 'Blue hour to night' },
    { location: 'Alsace wine villages (Riquewihr)', tip: 'Golden medieval half-timbered streets. Shoot the main street from the gate tower entrance — no cars until 11 AM.', timing: 'Early morning, golden light' },
    { location: 'Kinderdijk windmills at dawn', tip: 'Take the 6:40 AM bus from Rotterdam. All 19 windmills in misty morning light with the canal reflection. No crowds until 9 AM.', timing: 'Dawn' },
  ],
}
