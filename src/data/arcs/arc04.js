// Arc 04 — Snow Japan (2030)
// Hokkaido winter — powder snow, onsen, ice festival, seafood

export const ARC_04 = {
  tripOrder: ['japan2030'],

  itinerary: [
    { days: '1–2',  city: 'Sapporo',    country: 'japan2030', nights: 2, transport: 'Flight BLR → NRT → CTS (Chitose). ANA/JAL.', highlights: ['Sapporo Snow Festival site (February)', 'Odori Park ice sculptures', 'Sapporo Clock Tower', 'Tanukikoji covered shopping street', 'Soup curry at Lavi Minami', 'Sapporo Factory craft beer district'] },
    { days: '3',    city: 'Otaru',      country: 'japan2030', nights: 1, transport: 'JR local train from Sapporo (30 min)',           highlights: ['Otaru Canal snow lanterns (evening)', 'Sakaimachi glassware street', 'LeTAO patisserie double fromage', 'Otaru Music Box Museum', 'Fresh sea urchin (uni) sushi at Masazushi'] },
    { days: '4–5',  city: 'Niseko',     country: 'japan2030', nights: 2, transport: 'Bus or rental car from Otaru / Sapporo (90 min)', highlights: ['Niseko Grand Hirafu ski resort', 'Powder snow runs (world\'s driest powder)', 'Mt Yotei panorama from Hirafu', 'Onsen at night — Yukoro ryokan or Hilton Niseko'], highlight: 'Powder Snow Skiing / Snowboarding' },
    { days: '6',    city: 'Noboribetsu',country: 'japan2030', nights: 1, transport: 'Bus from Niseko via Tomakomai (~3 hrs)',          highlights: ['Jigokudani (Hell Valley) volcanic steam vents', 'Noboribetsu Onsen district — 11 different spring types', 'Oyunuma pon-pon Rock (foot bathing pond)'] },
    { days: '7–8',  city: 'Hakodate',   country: 'japan2030', nights: 2, transport: 'JR Super Hokuto express (2 hrs)',                 highlights: ['Mount Hakodate night view (top 3 night views in Japan)', 'Morning market (asaichi) — fresh crab and sea urchin', 'Motomachi Victorian-era Western district', 'Goryokaku Fort star shape viewed from tower', 'Fort Goryokaku Park winter illuminations'] },
    { days: '9',    city: 'Asahikawa',  country: 'japan2030', nights: 1, transport: 'JR Limited Express from Hakodate (3.5 hrs)',      highlights: ['Asahiyama Zoo — famous for polar bear + penguin underwater walks', 'Asahikawa Ramen Street (shoyu and shio ramen)', 'Ice festival venue (February)'] },
    { days: '10–12',city: 'Biei/Furano',country: 'japan2030', nights: 2, transport: 'Local train or rental car from Asahikawa (1 hr)', highlights: ['Biei Blue Pond (frozen blue in winter)', 'Shirogane hot spring area', 'Furano lavender fields (February: snow-covered), farm paths', 'Windswept patchwork hill panoramas under snow'] },
  ],

  transport: [
    { type: 'Flight',     icon: '✈️', segment: 'BLR → CTS (New Chitose Airport)',   detail: 'Via Tokyo Narita (NRT) — ANA or JAL. ~12 hrs total.' },
    { type: 'Train',      icon: '🚂', segment: 'Sapporo ↔ Otaru',                  detail: 'JR Hakodate Line. 30 min. JR Pass covers this segment.' },
    { type: 'Bus/Car',    icon: '🚌', segment: 'Sapporo → Niseko',                 detail: 'Highway bus or rental car. 90 min via Route 5.' },
    { type: 'Rental Car', icon: '🚗', segment: 'Niseko + Hokkaido Interior',        detail: 'Studded snow tyres mandatory. Book International License in India ahead.', highlight: 'Hokkaido Winter Road Drive' },
    { type: 'Train',      icon: '🚂', segment: 'Noboribetsu → Hakodate',            detail: 'JR Super Hokuto express. 2 hrs. Scenic coastal run.' },
    { type: 'Train',      icon: '🚂', segment: 'Hakodate → Asahikawa',              detail: 'JR Limited Express via Sapporo. 3.5 hrs.' },
    { type: 'Train',      icon: '🚂', segment: 'Asahikawa → Biei/Furano',           detail: 'JR Furano Line. 25–40 min. Run by Furano-Biei Norokko tourist train in summer; regular express in winter.' },
    { type: 'Flight',     icon: '✈️', segment: 'CTS → BLR via NRT',                detail: 'Return via Tokyo. ~12 hrs.' },
  ],

  currencies: [
    { country: 'Japan', code: 'JPY', symbol: '¥', rateToINR: 0.56, notes: 'Cash-dominant culture. Carry ¥50,000–¥100,000 for the trip. 7-Eleven ATMs accept foreign cards.' },
  ],

  highlights: [
    { tripId: 'japan2030', city: 'Sapporo',    items: ['Snow Festival (early Feb)', 'Odori Park ice sculptures', 'Clock Tower', 'Tanukikoji', 'Craft beer at Sapporo Factory'] },
    { tripId: 'japan2030', city: 'Otaru',       items: ['Otaru Canal snow lanterns', 'LeTAO patisserie', 'Sakaimachi glassware', 'Uni sushi at Masazushi'] },
    { tripId: 'japan2030', city: 'Niseko',      items: ['Hirafu Gondola powder runs', 'Mt Yotei panorama', 'Night onsen with mountain view'] },
    { tripId: 'japan2030', city: 'Noboribetsu', items: ['Jigokudani Hell Valley steam vents', '11 types of onsen', 'Foot bath at Oyunuma'] },
    { tripId: 'japan2030', city: 'Hakodate',    items: ['Night view from Mt Hakodate', 'Morning market crab + uni', 'Goryokaku Fort star from tower', 'Motomachi Victorian district'] },
    { tripId: 'japan2030', city: 'Biei / Furano', items: ['Blue Pond (frozen turquoise)', 'Patchwork Hill snow panoramas', 'Shirogane hot spring', 'Farm road drives'] },
  ],

  packingNotes: [
    { category: 'Snow Essentials', icon: '❄️', items: ['Thermal base layers (top + bottom × 3)', 'Down jacket rated to −20°C', 'Waterproof ski jacket (or rent in Niseko)', 'Snow boots with good grip (ice everywhere)', 'Hand warmers (kairo) — sold cheaply at konbini', 'Balaclava or neck gaiter + ski goggles if skiing'] },
    { category: 'Winter Skincare', icon: '🧴', items: ['Heavy moisturiser (Hokkaido winter air is extremely dry)', 'SPF lip balm (snow reflects UV strongly)', 'Scarf + thick gloves for temple visits'] },
    { category: 'Japan Specific', icon: '🇯🇵', items: ['Suica/IC card (load at airport)', 'Cash ¥50,000+ (many onsen towns are cash-only)', 'International Driving Permit (IDP) for rental car in Hokkaido'] },
  ],

  map: {
    center: [43.5, 142.0],
    zoom: 7,
    markers: [
      { id: 'sapporo',    name: 'Sapporo',     lat: 43.0618, lng: 141.3545, tripId: 'japan2030', day: '1–2'   },
      { id: 'otaru',      name: 'Otaru',       lat: 43.1907, lng: 140.9947, tripId: 'japan2030', day: '3'     },
      { id: 'niseko',     name: 'Niseko',      lat: 42.8004, lng: 140.6878, tripId: 'japan2030', day: '4–5'   },
      { id: 'noboribetsu',name: 'Noboribetsu', lat: 42.4139, lng: 141.1064, tripId: 'japan2030', day: '6'     },
      { id: 'hakodate',   name: 'Hakodate',    lat: 41.7686, lng: 140.7290, tripId: 'japan2030', day: '7–8'   },
      { id: 'asahikawa',  name: 'Asahikawa',   lat: 43.7706, lng: 142.3650, tripId: 'japan2030', day: '9'     },
      { id: 'biei',       name: 'Biei / Furano',lat:43.5870, lng: 142.4679, tripId: 'japan2030', day: '10–12' },
    ],
    route: [
      [43.0618, 141.3545], [43.1907, 140.9947], [42.8004, 140.6878],
      [42.4139, 141.1064], [41.7686, 140.7290], [43.7706, 142.3650],
      [43.5870, 142.4679],
    ],
  },

  stays: [
    {
      country: 'Japan (Hokkaido)', flag: '🇯🇵', tripId: 'japan2030',
      cities: [
        { city: 'Sapporo',     type: 'Business Hotel',         nights: 2, note: 'Susukino / Odori Park area — central for Snow Festival sites' },
        { city: 'Otaru',       type: 'Guesthouse / Inn',        nights: 1, note: 'Canal area — book the lantern-lit canal view room if available' },
        { city: 'Niseko',      type: 'Ski Lodge / Ryokan',      nights: 2, note: 'Hirafu village — ski-in / ski-out or 5-min walk to gondola, onsen in room ideal' },
        { city: 'Noboribetsu', type: 'Onsen Ryokan',            nights: 1, note: 'Full traditional onsen ryokan — kaiseki dinner + morning rotenburo' },
        { city: 'Hakodate',    type: 'Hotel',                   nights: 2, note: 'Motomachi area for easy access to morning market + night view tram' },
        { city: 'Asahikawa',   type: 'Business Hotel',          nights: 1, note: 'Central Asahikawa — Asahiyama Zoo day + ramen street in the evening' },
        { city: 'Biei/Furano', type: 'Pension / Farmhouse Inn', nights: 2, note: 'Rural farmhouse stay — waking up to snow-covered patchwork fields' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'Japan (Hokkaido)', flag: '🇯🇵',
      items: [
        { name: 'LeTAO double fromage cheesecake (boxed)', where: 'LeTAO main shop, Otaru Sakaimachi Street' },
        { name: 'Hokkaido dairy butter cookies tin', where: 'Any souvenir shop in Sapporo or Hakodate stations' },
        { name: 'Otaru glass music box', where: 'Otaru Music Box Museum, Sakaimachi Street' },
        { name: 'Niseko onsen bath salts', where: 'Hilton Niseko or Niseko village resort shops' },
        { name: 'Hokkaido uni (sea urchin) dried snack', where: 'Hakodate morning market or airport shops' },
      ],
    },
  ],

  bookings: [
    { id: 'sj01', label: 'Flight BLR → New Chitose (CTS) via Tokyo',     category: 'transport',     priority: 'critical', window: { start: '2029-09', end: '2029-12' } },
    { id: 'sj02', label: 'Flight CTS → BLR via Tokyo (return)',           category: 'transport',     priority: 'critical', window: { start: '2029-09', end: '2029-12' } },
    { id: 'sj03', label: 'JR Hokkaido Pass',                              category: 'transport',     priority: 'high',     window: { start: '2030-01', end: '2030-02' } },
    { id: 'sj04', label: 'Niseko ski lodge / ryokan (2 nights)',          category: 'accommodation', priority: 'critical', window: { start: '2029-08', end: '2029-11' } },
    { id: 'sj05', label: 'Noboribetsu onsen ryokan (1 night)',            category: 'accommodation', priority: 'high',     window: { start: '2029-09', end: '2029-11' } },
    { id: 'sj06', label: 'Sapporo Snow Festival dates confirmed (early Feb)', category: 'experience', priority: 'high',    window: { start: '2029-10', end: '2030-01' } },
    { id: 'sj07', label: 'Rental car Hokkaido (snow tyres standard)',     category: 'transport',     priority: 'high',     window: { start: '2029-11', end: '2030-01' } },
    { id: 'sj08', label: 'Travel insurance',                              category: 'document',      priority: 'critical', window: { start: '2030-01', end: '2030-02' } },
  ],

  notes: [
    'February is peak Sapporo Snow Festival — book accommodation 6+ months ahead.',
    'JR Hokkaido Pass covers most rail segments. Buy before arriving in Japan.',
    'Onsen etiquette: no tattoos policy in many traditional ryokan (research ahead).',
    'Driving in Hokkaido winter requires studded or spike tyres — rental cars come equipped.',
    'Ski rentals in Niseko are expensive but avoid packing gear. Many shops on Hirafu main street.',
    'Jigokudani in Noboribetsu is different from Jigokudani monkey park in Nagano — confirm location.',
    'February temperature: Sapporo −4°C daytime, Niseko −12°C at altitude. Dress accordingly.',
  ],

  practicalInfo: {
    weather: 'February Hokkaido: Sapporo −4 to −1°C daytime (cold but manageable with layers). Niseko −14 to −6°C at altitude — the coldest you\'ll experience on this World Tour. Biei/Furano −10 to −5°C. Heavy snowfall throughout — roads cleared quickly but pack accordingly.',
    emergency: '110 (Police) · 119 (Ambulance + Fire) · Niseko Ski Patrol: available on all major ski runs',
    driving: [
      'Hokkaido winter driving: studded tyres mandatory November–March. All rental cars supplied with proper snow tyres — don\'t request summer tyres.',
      'Black ice (blakk aisu) is the danger. Drive slowly on rural roads — no faster than 40 km/h on uncleared back roads.',
      'Biei farm roads are narrow and unlit at night — the patchwork hills shots require a daytime visit.',
      'Carry extra water and snacks in the car — Hokkaido rural roads have long stretches with no services.',
      'Fuel: fill up in every major town. Biei and Furano have petrol stations but close at 7 PM.',
    ],
    transit: [
      'JR Hokkaido Pass (5 or 7 days): covers Sapporo ↔ Otaru, Hakodate, Asahikawa, Furano.',
      'New Chitose Airport → Sapporo: JR Airport Express (38 min, ¥1,150). Runs every 15–30 min.',
      'Buses from Sapporo to Niseko: Chuo Bus highway express (~2 hrs). Book at Sapporo station.',
      'Furano-Biei Norokko tourist train: summer only. Winter: use regular JR Furano Line from Asahikawa (40 min).',
    ],
    payment: [
      'Cash essential in Hokkaido — smaller towns like Biei, Oshamambe, and Noboribetsu are largely cash-only.',
      'Carry ¥80,000–100,000 for the trip. 7-Eleven ATMs at Sapporo, Hakodate, and Niseko accept international cards.',
      'Niseko ski passes: ¥6,000–10,000/day. Buy at the Hirafu gondola base — Suica/IC card payment accepted.',
      'Onsen ryokan charges (dinner + breakfast included): ¥20,000–40,000/night per person. Worth the premium.',
    ],
    sim: [
      'Same as Arc 01 Japan — IIJmio or Rakuten Mobile eSIM recommended.',
      'Coverage surprisingly good even in Niseko village and Biei farmlands.',
    ],
    etiquette: [
      'Onsen rules: wash thoroughly before entering communal baths, no swimwear, no towels in the water.',
      'Many traditional ryokan prohibit tattoos in onsen — research ahead or book an en-suite private bath room.',
      'Ski resort etiquette: do not cut queues at gondola or chair lifts. Wait behind the yellow line.',
      'Noise in ryokan: corridors are quiet after 9 PM. Wear slippers (provided) on wooden floors.',
    ],
  },

  foodHighlights: [
    {
      city: 'Sapporo',
      must: [
        { dish: 'Sapporo Miso Ramen', note: 'Invented in Sapporo in 1960s. Lard-enriched miso broth, corn, butter, and thick wavy noodles. Meijiken or Sumire ramen restaurants on Ramen Alley (Susukino).' },
        { dish: 'Genghis Khan (Jingisukan) BBQ', note: 'Hokkaido lamb and vegetables grilled on a domed iron plate. Daruma restaurant in Susukino — long queue, short wait.' },
        { dish: 'Soft serve ice cream (soft cream)', note: 'Hokkaido dairy is the best in Japan. Meiji Milk vanilla soft serve at any shop in Sapporo or Otaru.' },
        { dish: 'Soup curry', note: 'Sapporo invention — thin spiced broth with whole vegetables and chicken. Suage restaurant, Minami 5 area.' },
      ],
    },
    {
      city: 'Otaru',
      must: [
        { dish: 'Uni (sea urchin) sushi at Masazushi', note: 'Hokkaido uni is the best in Japan — sweet, creamy, no bitterness. Masazushi on Sakaimachi Street. ¥1,500–3,000 per portion.' },
        { dish: 'LeTAO Double Fromage cheesecake', note: 'Two layers — raw cream cheese and baked cream cheese. Only at LeTAO main store on Sakaimachi. Buy fresh, eat same day.' },
      ],
    },
    {
      city: 'Niseko',
      must: [
        { dish: 'Genghis Khan after skiing', note: 'Every ski lodge in Niseko serves this. Best at Bang Bang restaurant, Hirafu. A Niseko tradition after the last run.' },
        { dish: 'Hokkaido crab (kani)', note: 'Hair crab or snow crab from Sapporo Nijo Market. Boiled whole, cracked at table — expensive but exceptional.' },
      ],
    },
    {
      city: 'Hakodate',
      must: [
        { dish: 'Ikameshi (squid rice)', note: 'Hakodate specialty — whole squid stuffed with sticky rice in soy broth. Available at the morning market.' },
        { dish: 'Shio ramen (salt ramen)', note: 'Hakodate-style ramen uses a clear salt broth — lightest style in Japan. Aji no Ichiban on Matsukazecho.' },
        { dish: 'Morning market crab and uni breakfast', note: 'Arrive at Hakodate Asaichi at 6 AM — chefs cook fresh sea urchin, crab, and scallop rice bowls for ¥1,500–2,500.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Biei Blue Pond (Shirogane)', tip: 'Frozen turquoise in February — photographed from the wooden deck area. Floodlit at night December–February (check Biei Tourism for light-up schedule).', timing: 'Dawn or lit evening' },
    { location: 'Patchwork Hill (Biei)', tip: 'Drive the farm road network north of Biei station. Stop at each hill crest for rolling snow-covered field compositions.', timing: 'Golden hour (3–4 PM in February)' },
    { location: 'Otaru Canal snow lanterns', tip: 'Canal winter illumination runs February evenings. Long exposure at the main canal bridge with lanterns and fresh snow.', timing: 'Evening (snow lantern season)' },
    { location: 'Hakodate Night View from Mt Hakodate', tip: 'Take the ropeway at 9 PM in clear weather. The peninsular city shape, lit up between two bays, is in Japan\'s top 3 night views. Dress extremely warmly.', timing: 'Night (clear skies essential)' },
    { location: 'Jigokudani Hell Valley, Noboribetsu', tip: 'Steam vents shoot into cold winter air — dramatic contrast against the snow. Early morning before the tour buses arrive.', timing: 'Early morning' },
  ],
}
