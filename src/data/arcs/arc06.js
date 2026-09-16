// Arc 06 — Switzerland + Sweden (2032)
// Alps in December → Stockholm + Kiruna Northern Lights

export const ARC_06 = {
  tripOrder: ['switzerland', 'sweden'],

  itinerary: [
    { days: '1–2',  city: 'Zurich',           country: 'switzerland', nights: 2, transport: 'Flight BLR → ZRH (Swiss Air / Lufthansa / Emirates)',         highlights: ['Altstadt (Old Town) + Lake Zurich waterfront', 'Bahnhofstrasse luxury shopping district', 'Kunsthaus Zürich art museum', 'Uetliberg mountain viewpoint (winter panorama)', 'Zurich Christmas markets (Bellevue, Hauptbahnhof)'] },
    { days: '3',    city: 'Interlaken',        country: 'switzerland', nights: 1, transport: 'InterRegio train Zurich → Interlaken Ost (2 hrs)',            highlights: ['Interlaken as base for Jungfrau region', 'Harder Kulm viewpoint above town', 'Aare river walk', 'Paragliding launch site views'] },
    { days: '4',    city: 'Lauterbrunnen',     country: 'switzerland', nights: 1, transport: 'Train from Interlaken (20 min)',                             highlights: ['Valley of 72 waterfalls — Staubbachfall (300m free fall)', 'Trümmelbach Falls (inside the mountain)', 'Mürren car-free village above the valley', 'Gimmelwald hamlet below Schilthorn', 'Eiger North Face viewpoint'], highlight: 'Lauterbrunnen Valley + Schilthorn' },
    { days: '5',    city: 'Jungfraujoch',      country: 'switzerland', nights: 0, transport: 'Rack railway from Grindelwald or Lauterbrunnen (90 min up)',  highlights: ['Top of Europe (3,454m) — glacier views', 'Aletsch Glacier panorama', 'Ice Palace inside the glacier', 'Jungfrau summit restaurant'] },
    { days: '6',    city: 'Zermatt',           country: 'switzerland', nights: 2, transport: 'Train Interlaken → Visp → Zermatt (2.5 hrs — car-free zone)', highlights: ['Matterhorn viewpoint (Riffelberg / Stellisee)', 'Gornergrat Railway (3,089m)', 'Glacier Paradise cable car (Klein Matterhorn, 3,883m)', 'Car-free village with horse-drawn sledges', 'Zermatt skyline at blue hour'], highlight: 'Matterhorn + Gornergrat' },
    { days: '8',    city: 'Bern',              country: 'switzerland', nights: 1, transport: 'Train Zermatt → Visp → Bern (2.5 hrs)',                      highlights: ['Medieval arcaded Old Town (UNESCO)', 'Rosengarten rose garden viewpoint over river bend', 'Albert Einstein Museum (apartment on Kramgasse)', 'Bear Park + Federal Palace', 'Christmas market on Münsterplatz'] },
    { days: '9–11', city: 'Stockholm',         country: 'sweden',     nights: 3, transport: 'Flight Bern/Zurich (ZRH) → Stockholm (ARN). ~2.5 hrs.',      highlights: ['Gamla Stan (Old Town) — 13th-century maze', 'Vasa Museum (intact 17th-century warship)', 'ABBA The Museum (Djurgården)', 'Fotografiska photography museum', 'Djurgården island walk', 'Södermalm rooftop view', 'Östermalm food hall'] },
    { days: '12–13',city: 'Kiruna',            country: 'sweden',     nights: 2, transport: 'Flight Stockholm (ARN) → Kiruna (KRN). 1.5 hrs. SAS/BRA.',   highlights: ['Northern Lights hunt (December optimal)', 'Icehotel 365 (world\'s first permanent ice hotel)', 'Abisko National Park (clear skies aurora corridor)', 'Snowmobile or husky sled safari', 'Sami culture experience at Jukkasjärvi'] },
    { days: '14–15',city: 'Gothenburg',        country: 'sweden',     nights: 2, transport: 'Flight Kiruna → Stockholm → Gothenburg (1.5 hrs)',            highlights: ['Gothenburg Fish Market (Feskekôrka)', 'Liseberg amusement park winter market', 'Haga neighbourhood nineteenth-century wooden houses', 'Universeum science museum', 'Archipelago boat trip (Gothenburg Archipelago)'] },
  ],

  transport: [
    { type: 'Flight',     icon: '✈️', segment: 'BLR → Zurich (ZRH)',           detail: 'Swiss Air direct or Lufthansa/Emirates connecting.' },
    { type: 'Train',      icon: '🚂', segment: 'Zurich → Interlaken → Zermatt', detail: 'Swiss Federal Railways (SBB). Swiss Travel Pass covers all trains, buses, boats. Buy before arrival.', highlight: 'Swiss Rail Pass Routes' },
    { type: 'Rack Train', icon: '🚂', segment: 'Jungfraujoch Rack Railway',     detail: 'Jungfrau Railway — separate ticket, very expensive (~₹12,000 round trip). Book ahead.', highlight: 'Jungfraujoch (Top of Europe)' },
    { type: 'Train',      icon: '🚂', segment: 'Zermatt → Bern',               detail: 'Via Visp. 2.5 hrs. Car-free Zermatt — everything by train or E-taxi.' },
    { type: 'Flight',     icon: '✈️', segment: 'Zurich (ZRH) → Stockholm (ARN)',detail: 'SAS or Swiss. ~2.5 hrs.' },
    { type: 'Metro',      icon: '🚇', segment: 'Stockholm SL Tunnelbana',       detail: 'SL metro + tram. Buy SL Travel Card for multi-day use.' },
    { type: 'Flight',     icon: '✈️', segment: 'Stockholm → Kiruna',            detail: 'SAS or BRA. 1.5 hrs. Usually connecting. Book early for December.' },
    { type: 'Flight',     icon: '✈️', segment: 'Kiruna → Stockholm → Gothenburg', detail: 'SAS internal. Gothenburg (GOT) Landvetter airport.' },
    { type: 'Flight',     icon: '✈️', segment: 'Gothenburg (GOT) → BLR',       detail: 'Via Frankfurt or Dubai. ~14 hrs total.' },
  ],

  currencies: [
    { country: 'Switzerland', code: 'CHF', symbol: 'Fr.', rateToINR: 93.80, notes: 'Expensive — budget ₹8,000–12,000/day. Card everywhere but ATMs give better rates than airport exchange.' },
    { country: 'Sweden',      code: 'SEK', symbol: 'kr',  rateToINR:  8.10, notes: 'Cashless society — Swish mobile pay everywhere. Carry minimal cash.' },
  ],

  highlights: [
    { tripId: 'switzerland', city: 'Zurich',        items: ['Altstadt + Lake Zurich', 'Bahnhofstrasse', 'Kunsthaus', 'Christmas markets'] },
    { tripId: 'switzerland', city: 'Lauterbrunnen',  items: ['72 Waterfalls Valley', 'Staubbachfall', 'Mürren car-free village', 'Eiger viewpoint'] },
    { tripId: 'switzerland', city: 'Jungfraujoch',   items: ['3,454m Top of Europe', 'Aletsch Glacier', 'Ice Palace inside glacier'] },
    { tripId: 'switzerland', city: 'Zermatt',        items: ['Matterhorn viewpoint', 'Gornergrat Railway', 'Klein Matterhorn 3,883m', 'Car-free village'] },
    { tripId: 'switzerland', city: 'Bern',           items: ['Medieval arcaded Old Town (UNESCO)', 'Rosengarten viewpoint', 'Einstein Museum'] },
    { tripId: 'sweden',      city: 'Stockholm',      items: ['Gamla Stan', 'Vasa Museum', 'Fotografiska', 'Södermalm rooftop'] },
    { tripId: 'sweden',      city: 'Kiruna',         items: ['Northern Lights', 'Icehotel 365', 'Abisko aurora corridor', 'Husky safari'] },
    { tripId: 'sweden',      city: 'Gothenburg',     items: ['Fish Market', 'Haga district', 'Archipelago boat', 'Liseberg winter market'] },
  ],

  packingNotes: [
    { category: 'Alpine + Arctic Winter', icon: '🏔️', items: ['Thermal base layers (top + bottom × 2)', 'Mid-layer fleece or down sweater', 'Outer shell — waterproof + windproof', 'Insulated waterproof boots rated to −20°C (Kiruna)', 'Balaclava + thick gloves + wool hat', 'Hand/foot warmers for Northern Lights nights'] },
    { category: 'Ski Layers (Zermatt)', icon: '⛷️', items: ['Ski jacket or rent in Zermatt (expensive)', 'Ski trousers or waterproof salopettes', 'Ski goggles (UV + snow glare)', 'Ski helmet (rentable in Zermatt)'] },
    { category: 'Stockholm + Gothenburg', icon: '🏙️', items: ['Smart-casual for city dining', 'Warm scarf and coat for city walks', 'Stockholm: lightweight dress shoes for Gamla Stan'] },
  ],

  map: {
    center: [58.0, 12.0],
    zoom: 4,
    markers: [
      { id: 'zurich',       name: 'Zurich',         lat: 47.3769, lng:  8.5417, tripId: 'switzerland', day: '1–2'   },
      { id: 'lauterbrunnen',name: 'Lauterbrunnen',  lat: 46.5935, lng:  7.9091, tripId: 'switzerland', day: '3–5'   },
      { id: 'zermatt',      name: 'Zermatt',        lat: 46.0207, lng:  7.7491, tripId: 'switzerland', day: '6–7'   },
      { id: 'bern',         name: 'Bern',           lat: 46.9480, lng:  7.4474, tripId: 'switzerland', day: '8'     },
      { id: 'stockholm',    name: 'Stockholm',      lat: 59.3293, lng: 18.0686, tripId: 'sweden',      day: '9–11'  },
      { id: 'kiruna',       name: 'Kiruna',         lat: 67.8557, lng: 20.2253, tripId: 'sweden',      day: '12–13' },
      { id: 'gothenburg',   name: 'Gothenburg',     lat: 57.7089, lng: 11.9746, tripId: 'sweden',      day: '14–15' },
    ],
    route: [
      [47.3769,  8.5417], [46.5935,  7.9091], [46.0207,  7.7491],
      [46.9480,  7.4474], [59.3293, 18.0686], [67.8557, 20.2253],
      [57.7089, 11.9746],
    ],
  },

  stays: [
    {
      country: 'Switzerland', flag: '🇨🇭', tripId: 'switzerland',
      cities: [
        { city: 'Zurich',        type: 'Hotel',                   nights: 2, note: 'Langstrasse or Altstadt — Christmas markets within walking distance' },
        { city: 'Interlaken',    type: 'Hostel / Guesthouse',     nights: 1, note: 'Interlaken Ost — base for all Jungfrau region trains; Harder Kulm viewpoint above town' },
        { city: 'Lauterbrunnen', type: 'Guesthouse / Hostel',     nights: 1, note: 'In the valley of 72 waterfalls — dramatic cliffs outside the window' },
        { city: 'Zermatt',       type: 'Alpine Hotel',            nights: 2, note: 'Car-free village — book Matterhorn-view room on south side of hotel' },
        { city: 'Bern',          type: 'Hotel',                   nights: 1, note: 'Altstadt area — arcaded streets, UNESCO Old Town' },
      ],
    },
    {
      country: 'Sweden', flag: '🇸🇪', tripId: 'sweden',
      cities: [
        { city: 'Stockholm',   type: 'Hotel / Design Hotel',  nights: 3, note: 'Södermalm or Gamla Stan — walkable city, excellent design hotels' },
        { city: 'Kiruna',      type: 'Icehotel or Cabin',     nights: 2, note: 'Icehotel 365 (Jukkasjärvi) or aurora cabin — Northern Lights hunting base' },
        { city: 'Gothenburg',  type: 'Hotel',                 nights: 2, note: 'Haga district — nineteenth-century wooden houses, food market nearby' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'Switzerland', flag: '🇨🇭',
      items: [
        { name: 'Victorinox Swiss Army Knife (authentic)', where: 'Victorinox flagship stores in Zurich or Bern' },
        { name: 'Swiss chocolate box (Läderach or Lindt)', where: 'Läderach chocolate boutiques — Zurich or Zermatt' },
        { name: 'Edelweiss dried flower keyring', where: 'Alpine gift shops in Zermatt or Lauterbrunnen' },
        { name: 'Matterhorn fridge magnet', where: 'Zermatt village gift shops' },
      ],
    },
    {
      country: 'Sweden', flag: '🇸🇪',
      items: [
        { name: 'Dala horse (painted wooden folk art)', where: 'Skansen open-air museum shop or Gamla Stan, Stockholm' },
        { name: 'ABBA gold record print', where: 'ABBA The Museum gift shop, Djurgården, Stockholm' },
        { name: 'Swedish fish candy in local packaging', where: 'ICA supermarket or Stockholm airport' },
        { name: 'Sami reindeer leather bracelet', where: 'Kiruna or Jukkasjärvi Sami craft shops' },
      ],
    },
  ],

  bookings: [
    { id: 'ss01', label: 'Flight BLR → Zurich (ZRH)',                 category: 'transport',     priority: 'critical', window: { start: '2031-10', end: '2032-03' } },
    { id: 'ss02', label: 'Flight Gothenburg (GOT) → BLR',             category: 'transport',     priority: 'critical', window: { start: '2031-10', end: '2032-03' } },
    { id: 'ss03', label: 'Schengen Visa (Switzerland + Sweden)',       category: 'document',      priority: 'critical', window: { start: '2032-09', end: '2032-11' } },
    { id: 'ss04', label: 'Swiss Travel Pass (8 days)',                 category: 'transport',     priority: 'high',     window: { start: '2032-09', end: '2032-11' } },
    { id: 'ss05', label: 'Jungfraujoch rack railway ticket',           category: 'experience',    priority: 'high',     window: { start: '2032-10', end: '2032-12' } },
    { id: 'ss06', label: 'Icehotel 365 / Aurora Cabin Kiruna',        category: 'accommodation', priority: 'critical', window: { start: '2031-10', end: '2032-03' } },
    { id: 'ss07', label: 'Flight Stockholm → Kiruna (SAS/BRA)',        category: 'transport',     priority: 'high',     window: { start: '2032-09', end: '2032-11' } },
    { id: 'ss08', label: 'Zermatt hotel (Matterhorn-view side)',       category: 'accommodation', priority: 'high',     window: { start: '2032-06', end: '2032-10' } },
    { id: 'ss09', label: 'Travel insurance',                           category: 'document',      priority: 'critical', window: { start: '2032-11', end: '2032-12' } },
  ],

  notes: [
    'Swiss Travel Pass is worth buying for 8+ days in Switzerland — covers SBB trains, boats, PostBus, most mountain railways.',
    'Jungfraujoch requires a separate ticket (~CHF 145) not included in Swiss Pass.',
    'Zermatt is car-free. Take the Matterhorn Gotthard Bahn from Visp or Täsch.',
    'December in Kiruna: near polar night (3–4 hrs daylight). Northern Lights visible on clear nights 10 PM–2 AM.',
    'Icehotel 365 (Jukkasjärvi, 17 km from Kiruna) costs significantly more than standard hotels — worth a dinner visit at minimum.',
    'Stockholm Christmas markets (Skansen, Gamla Stan) are exceptional in December.',
    'Budget for Switzerland: CHF 150–200/day (₹14,000–18,000). One of Europe\'s most expensive destinations.',
  ],

  practicalInfo: {
    weather: 'Switzerland December: Zurich 0–5°C (possible snow), Zermatt −5 to −10°C on slopes, Lauterbrunnen valley 2–7°C. Jungfraujoch −15 to −25°C — dress Arctic-warm. Sweden December: Stockholm −3 to 2°C, Kiruna −15 to −25°C at night — full winter gear mandatory.',
    emergency: 'Switzerland: 117 (Police) · 144 (Ambulance) · 118 (Fire) · 1414 (Alpine Air Rescue / Rega). Sweden: 112 (unified)',
    driving: [
      'Switzerland: no car in Zermatt — park at Täsch and take the shuttle train (15 min). Matterhorn Gotthard Bahn from Visp or Täsch.',
      'Swiss roads are impeccably maintained even in winter. Snow chains available at petrol stations (recommended for mountain passes December).',
      'Swiss motorway Vignette: mandatory sticker for driving on Swiss motorways — CHF 40 at any border. Buy immediately on entry.',
      'Sweden: roads are extremely well-gritted in winter. Drive calmly — black ice possible even on cleared highways.',
      'Kiruna rental car: essential for visiting Abisko National Park and Icehotel. 4WD not mandatory but recommended for December.',
    ],
    transit: [
      'Swiss Travel Pass: covers all SBB trains, Lake Lucerne boats, PostBus, and most cable cars (Gornergrat, Fløibanen, Pilatus — not Jungfraujoch).',
      'Jungfraujoch: separate ticket (CHF 145 from Grindelwald Grund). Book 2–3 days ahead in December.',
      'Stockholm SL Travel Card: unlimited metro, tram, bus, and Djurgården ferry. Buy at Arlanda airport.',
      'Kiruna: no public bus to Abisko after dark. Rent a car or book a Northern Lights tour that includes transport.',
    ],
    payment: [
      'Switzerland is the most expensive country on this tour. Budget CHF 150–200/day (₹14,000–19,000).',
      'Card everywhere in Switzerland — Twint app (Swiss digital payment) not for tourists, but Visa/MC contactless works perfectly.',
      'Sweden is fully cashless — do not bring cash. Swish (Swedish app) used by locals; visitors use card.',
      'Icehotel experiences (dining, ice rooms, guided aurora) must be booked and paid online before arrival.',
    ],
    sim: [
      'EU SIM (if you have one) roams in Sweden but NOT Switzerland (not EU). Buy a Swiss SIM at the airport (Salt or Sunrise, CHF 20 for 7 days).',
      'Abisko National Park (Kiruna region): Tele2/Telia has coverage at the observatory but LTE can be weak during aurora hunting nights.',
      'Stockholm city: full 5G coverage. Reliable WiFi in hostels, cafés, and all public spaces.',
    ],
    etiquette: [
      'Switzerland: four national languages — German (Zurich/Bern), French (Geneva/Lausanne), Italian (Ticino), Romansh. English widely understood everywhere.',
      'Swiss punctuality: trains leave on the exact second. Platform 60 seconds early is standard.',
      'Zermatt environmental etiquette: village is car-free to preserve air quality. E-taxis and horse-drawn carriages only.',
      'Sweden: Swedes are quiet on public transport — keep voices low on the tunnelbana.',
      'Sami culture (Kiruna region): ask before photographing reindeer or Sami ceremonies. Their traditional lands and customs are protected.',
    ],
  },

  foodHighlights: [
    {
      city: 'Zurich / Bern',
      must: [
        { dish: 'Zürcher Geschnetzeltes', note: 'Zurich specialty — sliced veal in cream and white wine sauce, served with Rösti. Try at Zeughauskeller (1487) below the Kunsthaus.' },
        { dish: 'Rösti (Swiss potato cake)', note: 'Crispy grated potato pan-fried in butter. Every Swiss restaurant has a version. Order it as a side at lunch.' },
        { dish: 'Fondue at Chäs Zunft, Zurich', note: 'Classic Gruyère and Emmental fondue in a private wood-panelled room. CHF 35/person. Book ahead December.' },
        { dish: 'Sprungli Luxemburgerli macarons', note: 'Zurich\'s answer to Parisian macarons — lighter, more airy. Buy a box at Bahnhofstrasse — the most famous address in Swiss confectionery.' },
      ],
    },
    {
      city: 'Zermatt',
      must: [
        { dish: 'Käseschnitzel with Rösti (mountain style)', note: 'Every mountain restaurant on Rothorn or Gornergrat serves this with panoramic Matterhorn views. Best meal at altitude in Europe.' },
        { dish: 'Raclette', note: 'Half a wheel of Raclette cheese melted under a heater, scraped onto potatoes. Walliser Kanne restaurant in Zermatt village.' },
      ],
    },
    {
      city: 'Stockholm',
      must: [
        { dish: 'Meatballs (köttbullar) at Pelikan', note: 'Not IKEA — the real thing. Pelikan in Södermalm: beef and pork meatballs with cream sauce, lingonberry jam, and mashed potatoes.' },
        { dish: 'Gravad lax (cured salmon) open sandwich', note: 'On rye bread at Östermalm Food Hall (Östermalmshallen). Dill cream, capers, and sliced cucumber.' },
        { dish: 'Kanelbulle (cinnamon bun)', note: 'Swedish fika culture — coffee and a pastry, afternoon ritual. Fabrique bakery in Vasastan makes the best version.' },
      ],
    },
    {
      city: 'Kiruna',
      must: [
        { dish: 'Icehotel Restaurant dinner', note: 'Five-course Arctic tasting menu inside an ice room. Reindeer fillet, cloudberry, and whitefish roe. Book months ahead.' },
        { dish: 'Reindeer stew (renkött)', note: 'Traditional Sami staple — slow-cooked reindeer with root vegetables and flatbread. Kiruna Tourist Restaurant or Sami cultural centre café.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Matterhorn from Stellisee Lake', tip: 'A 20-min hike from Rotenboden (Gornergrat Railway stop). The lake perfectly reflects the Matterhorn peak. Arrive before 8 AM — completely mirror-still on calm mornings.', timing: 'Dawn to mid-morning' },
    { location: 'Lauterbrunnen Valley viewpoint', tip: 'Hike to Mürren (car-free village above valley) and shoot down the 300m Staubbachfall waterfall into the valley floor. Best in the morning when the falls catch the sun.', timing: 'Morning' },
    { location: 'Gamla Stan, Stockholm', tip: 'The narrowest alley in Stockholm (Mårten Trotzigs gränd, 90cm wide) — shoot looking up through the gap at dawn when it\'s empty.', timing: 'Dawn' },
    { location: 'Abisko, Northern Lights', tip: 'Abisko has the clearest skies for aurora in Scandinavia due to a natural weather corridor. Shoot at Björkliden lake for reflections in still water. 10 PM–2 AM peak.', timing: 'Midnight clear nights' },
    { location: 'Jungfraujoch Top of Europe', tip: 'Shoot the Aletsch Glacier from the outdoor terrace — longest glacier in the Alps disappearing into the horizon. Blue sky above 3,000m is almost always clear.', timing: 'Midday (above cloud level)' },
  ],
}
