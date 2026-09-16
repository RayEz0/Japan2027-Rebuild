// Arc 01 — Japan 2027
// Transport, currency, highlights, map, and planning notes.

export const ARC_01 = {
  tripOrder: ['japan2027'],

  transport: [
    { type: 'Flight',       icon: '✈️', segment: 'BLR → NRT',                   detail: 'Air India / JAL / Emirates via HUB. ~10–13 hrs. Book 3–6 months ahead for best fares.' },
    { type: 'Train',        icon: '🚂', segment: 'Narita → Tokyo',               detail: 'Narita Express (N\'EX) to Shinjuku / Ikebukuro. ~80 min. IC Card or JR Pass.', highlight: 'Narita Express' },
    { type: 'Highway Bus',  icon: '🚌', segment: 'Shinjuku Busta → Kawaguchiko', detail: 'Fuji Express highway bus. ~2 hrs from Shinjuku Bus Terminal. Book via keio-bus-east.co.jp.', highlight: 'Fuji Excursion Bus' },
    { type: 'Shinkansen',   icon: '🚄', segment: 'Tokyo → Kyoto',                detail: 'Tokaido Shinkansen Nozomi/Hikari. ~2 hrs 20 min. Covered by JR Pass. Book seat at a JR station.', highlight: 'Tokaido Shinkansen' },
    { type: 'Local Train',  icon: '🚇', segment: 'Kyoto → Nara',                 detail: 'JR Nara Line from Kyoto Station. ~45 min. IC Card.', highlight: 'JR Nara Line' },
    { type: 'Local Train',  icon: '🚇', segment: 'Nara → Osaka',                 detail: 'JR Yamatoji Rapid Line to Osaka. ~45 min. IC Card.' },
    { type: 'Flight',       icon: '✈️', segment: 'KIX → BLR',                   detail: 'Air India / IndiGo via DEL, or Emirates via DXB. Book return at same time as outbound.' },
  ],

  currencies: [
    {
      country:   'Japan',
      code:      'JPY',
      symbol:    '¥',
      rateToINR: 0.56,
      notes:     'Cash-heavy culture — carry ¥10,000–20,000 daily. ATMs at 7-Eleven, Japan Post, and international airports are most reliable.',
    },
  ],

  highlights: [
    {
      tripId: 'japan2027',
      city:   'Tokyo',
      items: [
        'Daikoku PA — midnight car meet on Metropolitan Expressway',
        'Akihabara — electronics, anime, and retro game culture',
        'Shibuya Crossing — peak rush hour crossing',
        'Shinjuku Golden Gai — narrow alley bar culture',
        'Yoyogi Park — Sunday rockabilly and street musicians',
        'Harajuku Takeshita Street — fashion subcultures',
        'TeamLab Borderless or Planets — digital art immersion',
        'Tokyo Skytree — 634 m views at night',
      ],
    },
    {
      tripId: 'japan2027',
      city:   'Mt Fuji',
      items: [
        'Kawaguchiko Lake — classic Fuji reflection shot at dawn',
        'Chureito Pagoda — five-storey pagoda with Fuji backdrop',
        'Fuji-Q Highland — adrenaline rides under the mountain',
        'Oshino Hakkai — eight clear spring ponds at Fuji base',
      ],
    },
    {
      tripId: 'japan2027',
      city:   'Kyoto',
      items: [
        'Fushimi Inari — 10,000 torii gates, hike at 5 AM to avoid crowds',
        'Arashiyama Bamboo Grove — best at first light',
        'Kinkaku-ji — Golden Pavilion',
        'Philosopher\'s Path — autumn canal walk',
        'Gion District — geisha district, Hanamikoji Street',
        'Nishiki Market — street food and pickles',
      ],
    },
    {
      tripId: 'japan2027',
      city:   'Nara',
      items: [
        'Nara Deer Park — 1,200 free-roaming sika deer',
        'Todai-ji Temple — largest wooden building in the world',
        'Kasuga Grand Shrine — 3,000 stone and bronze lanterns',
        'Yoshiki-en Garden — moss garden and tea house',
      ],
    },
    {
      tripId: 'japan2027',
      city:   'Osaka',
      items: [
        'Dotonbori — neon-lit canal strip, takoyaki, and ramen',
        'Kuromon Ichiba Market — "Osaka\'s Kitchen" street food',
        'Osaka Castle and Nishinomaru Garden',
        'Den Den Town — Osaka\'s Akihabara',
        'Shinsekai + Tsutenkaku Tower — retro 1950s neighbourhood',
        'Daikoku Pier Car Meet — if timing aligns (weekend nights)',
      ],
    },
  ],

  map: {
    center: [35.45, 137.80],
    zoom:   7,
    markers: [
      // Primary destinations (where user stays)
      { id: 'tokyo',            name: 'Tokyo',                  lat: 35.6812, lng: 139.7671, tripId: 'japan2027', day: '1–4',   type: 'primary' },
      { id: 'fuji-kawaguchiko', name: 'Mt Fuji (Kawaguchiko)', lat: 35.5170, lng: 138.7518, tripId: 'japan2027', day: '5–6',   type: 'primary' },
      { id: 'kyoto',            name: 'Kyoto',                  lat: 35.0116, lng: 135.7681, tripId: 'japan2027', day: '7–8',   type: 'primary' },
      { id: 'nara',             name: 'Nara',                   lat: 34.6851, lng: 135.8048, tripId: 'japan2027', day: '9',     type: 'primary' },
      { id: 'osaka',            name: 'Osaka',                  lat: 34.6937, lng: 135.5023, tripId: 'japan2027', day: '10–11', type: 'primary' },
    ],
    segments: [
      {
        id: 'tokyo-kawaguchiko-drive', tripId: 'japan2027',
        from: 'Tokyo', to: 'Mt Fuji (Kawaguchiko)',
        transportType: 'rental_car', highlight: true,
        label: 'Tokyo → Mt Fuji Road Trip', mapLabel: 'Tokyo → Mt Fuji Road Trip',
        distance: '~105 km', duration: '~1h 40m', vehicle: 'Rental Car (Chuo Expressway)',
        // Chuo Expressway west from Tokyo, through Hachioji and Sagamiko to Kawaguchiko
        waypoints: [
          [35.6812, 139.7671],  // Tokyo Station (rental car pickup)
          [35.6516, 139.3160],  // Hachioji IC
          [35.5907, 139.0847],  // Sagamiko IC
          [35.5462, 138.9134],  // Tsuru / Otsuki junction
          [35.5178, 138.7940],  // Kawaguchiko IC
          [35.5170, 138.7518],  // Kawaguchiko
        ],
      },
      {
        id: 'kawaguchiko-kyoto-drive', tripId: 'japan2027',
        from: 'Mt Fuji (Kawaguchiko)', to: 'Kyoto',
        transportType: 'rental_car', highlight: true,
        label: 'Mt Fuji → Kyoto Road Trip', mapLabel: 'Mt Fuji → Kyoto Road Trip',
        distance: '~440 km', duration: '~4h 40m', vehicle: 'Rental Car',
        // Route 138 to Gotemba IC → Shin-Tomei (E1A) → Tomei (E1) → Meishin (E1) into Kyoto
        // OSRM will trace actual expressway geometry
        waypoints: [
          [35.5170, 138.7518],  // Kawaguchiko
          [35.3092, 138.9330],  // Gotemba (Tomei IC approach)
          [34.9700, 138.3900],  // Shizuoka (Shin-Tomei / Tomei)
          [34.7034, 137.7351],  // Hamamatsu (Tomei)
          [35.1709, 136.8815],  // Nagoya (Meishin junction)
          [35.0116, 135.7681],  // Kyoto
        ],
      },
      {
        id: 'kyoto-nara-train', tripId: 'japan2027',
        from: 'Kyoto', to: 'Nara',
        transportType: 'train',
        label: 'JR Nara Line', distance: '41 km', duration: '45m', vehicle: 'IC Card',
        waypoints: [
          [35.0116, 135.7681],  // Kyoto
          [34.9733, 135.7744],  // Tofukuji
          [34.9431, 135.7860],  // Obaku
          [34.8836, 135.7844],  // Uji area
          [34.7641, 135.8234],  // Kizu
          [34.6851, 135.8048],  // Nara
        ],
      },
      {
        id: 'nara-osaka-train', tripId: 'japan2027',
        from: 'Nara', to: 'Osaka',
        transportType: 'train',
        label: 'JR Yamatoji Line', distance: '35 km', duration: '40m', vehicle: 'IC Card',
        // Runs west from Nara then north along the Yamatoji corridor to Osaka
        waypoints: [
          [34.6851, 135.8048],  // Nara
          [34.6523, 135.7868],  // Yamato-Koriyama
          [34.5998, 135.7101],  // Oji
          [34.5661, 135.6308],  // Kashiwara
          [34.6489, 135.5069],  // Tennoji (Osaka)
          [34.6937, 135.5023],  // Osaka (Namba / central)
        ],
      },
    ],
  },

  itinerary: [
    { days: '1–4',  city: 'Tokyo',      country: 'japan2027', nights: 4, transport: 'Narita Express → Shinjuku',                    highlights: ['Daikoku PA midnight car meet', 'Akihabara electronics + anime', 'Shibuya Crossing at rush hour', 'Shinjuku Golden Gai', 'Harajuku Takeshita Street', 'Yoyogi Park Sunday scene', 'TeamLab Borderless'] },
    { days: '5–6',  city: 'Mt Fuji',   country: 'japan2027', nights: 2, transport: 'Highway bus Shinjuku → Kawaguchiko (2 hrs)',    highlights: ['Kawaguchiko Lake reflection at dawn', 'Chureito Pagoda + Fuji backdrop', 'Fuji-Q Highland rides', 'Oshino Hakkai spring ponds'] },
    { days: '7–8',  city: 'Kyoto',     country: 'japan2027', nights: 2, transport: 'Road trip Kawaguchiko → Kyoto (~440 km)',       highlights: ['Fushimi Inari 10,000 torii gates at 5 AM', 'Arashiyama Bamboo Grove at first light', 'Kinkaku-ji Golden Pavilion', 'Gion District + Hanamikoji Street', 'Nishiki Market street food'] },
    { days: '9',    city: 'Nara',      country: 'japan2027', nights: 0, transport: 'JR Nara Line from Kyoto (45 min)',              highlights: ['Nara Deer Park — 1,200 free-roaming sika deer', 'Todai-ji Temple (largest wooden building)', 'Kasuga Grand Shrine 3,000 lanterns'] },
    { days: '10–11',city: 'Osaka',     country: 'japan2027', nights: 2, transport: 'JR Yamatoji Rapid Line from Nara (40 min)',     highlights: ['Dotonbori neon canal strip', 'Kuromon Ichiba Market "Osaka\'s Kitchen"', 'Osaka Castle + Nishinomaru Garden', 'Shinsekai + Tsutenkaku Tower', 'Daikoku Pier car meet (weekends)'] },
  ],

  packingNotes: [
    { category: 'Japan Essentials', icon: '🇯🇵', items: ['Suica IC card — load ¥5,000 at Narita airport machines on arrival', 'Cash ¥50,000 minimum before landing (many towns are cash-only)', 'International Driving Permit (IDP) if hiring a car for Fuji road trip', 'Japan power adapter Type A, 100V — India Type D plugs do not fit'] },
    { category: 'City + Urban', icon: '🏙️', items: ['Comfortable walking shoes — Tokyo averages 18,000+ steps per day', '20–25L daypack for daily use', 'Portable WiFi or eSIM for Japan (IIJmio / Rakuten / Ubigi)', 'Power bank 10,000+ mAh (Anker / Xiaomi)'] },
    { category: 'Culture + Temples', icon: '⛩️', items: ['Goshuin book (goshuincho) for stamp collection at shrines and temples', 'Small compact umbrella — November can bring rain in Kyoto + Osaka', 'Respectful layer for shrine visits (not strict, but long trousers preferred)'] },
  ],

  stays: [
    {
      country: 'Japan', flag: '🇯🇵', tripId: 'japan2027',
      cities: [
        { city: 'Tokyo',       type: 'Capsule Hostel / Business Hotel', nights: 4, note: 'Shinjuku base — 3 min from Golden Gai, 12 min JR to Akihabara' },
        { city: 'Kawaguchiko', type: 'Ryokan / Lakeside Guesthouse',    nights: 2, note: 'Lake Kawaguchiko view of Fuji — tatami + onsen essential' },
        { city: 'Kyoto',       type: 'Machiya Guesthouse',              nights: 2, note: 'Traditional wooden townhouse near Gion / Higashiyama' },
        { city: 'Nara',        type: 'Day trip — no overnight',         nights: 0, note: 'Depart Kyoto 9 AM, return by 4 PM' },
        { city: 'Osaka',       type: 'Business Hotel',                  nights: 2, note: 'Namba / Dotonbori for walkable access to food streets' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'Japan', flag: '🇯🇵',
      items: [
        { name: 'Goshuin stamp book (goshuincho)', where: 'Fushimi Inari / Kinkaku-ji temple gift shops' },
        { name: 'Fridge magnet — torii gate or Fuji', where: 'Souvenir shops, Asakusa, Kyoto station, Osaka' },
        { name: 'KitKat — Japanese flavours (matcha, sakura, sake)', where: 'Convenience stores / Narita airport' },
        { name: 'Tenugui hand towel', where: 'Textile shops in Kyoto Nishiki Market' },
        { name: 'Anime merchandise', where: 'Akihabara — Yodobashi Camera, Liberty Akiba' },
        { name: 'Wagashi traditional sweets box', where: 'Nishiki Market, Kyoto Station basement' },
      ],
    },
  ],

  bookings: [
    { id: 'j01', label: 'Flight BLR → NRT (Air India / JAL / Emirates)',  category: 'transport',     priority: 'critical', window: { start: '2027-05', end: '2027-08' } },
    { id: 'j02', label: 'Flight KIX → BLR (return)',                      category: 'transport',     priority: 'critical', window: { start: '2027-05', end: '2027-08' } },
    { id: 'j03', label: 'JR Pass purchase (14-day)',                      category: 'transport',     priority: 'critical', window: { start: '2027-08', end: '2027-10' } },
    { id: 'j04', label: 'Tokyo — Shinjuku hotel / hostel (4 nights)',     category: 'accommodation', priority: 'high',     window: { start: '2027-07', end: '2027-09' } },
    { id: 'j05', label: 'Kawaguchiko — ryokan or guesthouse (2 nights)',  category: 'accommodation', priority: 'high',     window: { start: '2027-08', end: '2027-10' } },
    { id: 'j06', label: 'Kyoto — machiya guesthouse (2 nights)',          category: 'accommodation', priority: 'high',     window: { start: '2027-08', end: '2027-10' } },
    { id: 'j07', label: 'Osaka — business hotel (2 nights)',              category: 'accommodation', priority: 'medium',   window: { start: '2027-09', end: '2027-11' } },
    { id: 'j08', label: 'Rental car — Tokyo pickup (Kawaguchiko + Kyoto)', category: 'transport',    priority: 'high',     window: { start: '2027-09', end: '2027-11' } },
    { id: 'j09', label: 'eSIM / Pocket WiFi Japan',                       category: 'setup',         priority: 'high',     window: { start: '2027-10', end: '2027-11' } },
    { id: 'j10', label: 'Travel insurance',                               category: 'document',      priority: 'critical', window: { start: '2027-09', end: '2027-11' } },
  ],

  notes: [
    'Get a Suica or ICOCA IC card on arrival — covers metro, buses, and convenience store payments across Japan.',
    'JR Pass: evaluate against point-to-point cost. Tokyo–Kyoto Shinkansen alone is ~¥13,800 each way.',
    'Konbini (7-Eleven, FamilyMart, Lawson) = ATM + hot food + SIM top-up. International 7-Eleven ATMs never fail.',
    'Japan is still largely cash-based outside Tokyo. Carry ¥10,000–20,000 daily in smaller towns.',
    'Daikoku PA requires driving or a taxi from Yokohama. Nighttime weekends are peak car-meet culture.',
    'Fushimi Inari gates are open 24 hrs — arrive before 6 AM for near-empty shots.',
    'Nara day-trip: depart Kyoto by 9 AM, back by 4 PM leaves evening free in Kyoto.',
    'KIX → City: Haruka Express (JR, ~75 min) or Airport Bus (cheaper but slower).',
  ],

  practicalInfo: {
    weather: 'November–December: Tokyo 8–16°C (cool, dry). Kyoto/Osaka slightly milder. Light rain in Kyoto November. Ideal sightseeing weather — no summer crowds, no rain season.',
    emergency: '110 (Police) · 119 (Ambulance + Fire) · Tourist helpline: 050-3816-2787 (English, 24hr)',
    driving: [
      'International Driving Permit (IDP) required — get at RTO before departure. Japan drives on the left.',
      'Tolls are expensive. Tokyo → Kawaguchiko via Chuo Expressway: ~¥3,500 each way. Get an ETC card from the rental company.',
      'Speed limits: 80 km/h expressway, 60 km/h national roads. Speed cameras are everywhere.',
      'Parking in Tokyo is scarce and expensive (¥500–1,000/hr). Use coin parking lots.',
      'Google Maps works perfectly in Japan. Offline mode recommended for tunnel dead zones.',
    ],
    transit: [
      'Suica (Tokyo) or ICOCA (Osaka/Kyoto) IC card: load ¥5,000 at airport, works on all metro, buses, and local trains.',
      'JR Pass (14-day ¥50,000): covers Shinkansen between Tokyo–Kyoto–Nara–Osaka. Worth it if doing the full route.',
      'Narita Express (N\'EX): ¥3,250 to central Tokyo. IC card users pay ¥1,700 (Suica price). 80 min.',
      'IC cards work at konbini, vending machines, and coin lockers — not just transport.',
    ],
    payment: [
      'Cash is king outside major cities. Carry ¥10,000–20,000 daily minimum.',
      'ICOCA/Suica IC cards work at most konbini (7-Eleven, Lawson, FamilyMart).',
      'International Visa/Mastercard accepted at chains, hotels, and department stores. Amex hit-or-miss.',
      '7-Eleven ATMs are the most reliable for foreign cards. Post Office ATMs also work.',
    ],
    sim: [
      'IIJmio or Rakuten Mobile eSIM: buy online before travel, activate on arrival. Best value.',
      'Pocket WiFi rentable at Narita airport on arrival — good if travelling with multiple devices.',
      'SIM from 7-Eleven airport: Docomo / SoftBank options. ¥3,000–5,000 for 7–30 days data.',
      'No voice SIM for tourists — data only. WhatsApp/Line calls work fine over data.',
    ],
    etiquette: [
      'Bowing is the greeting — a slight nod is enough for tourists.',
      'No eating while walking. Eat at the shop or find a bench.',
      'Remove shoes when entering a traditional room (indicated by a step-up at the entrance).',
      'Onsen etiquette: wash thoroughly before entering the communal bath. Tattoos often barred.',
      'Queue strictly at train doors — always let passengers off before boarding.',
      'Rubbish bins are rare. Carry a small bag for your trash.',
    ],
  },

  foodHighlights: [
    {
      city: 'Tokyo',
      must: [
        { dish: 'Ichiran Ramen', note: 'Solo booth tonkotsu ramen — Shibuya or Shinjuku. Order the extra noodles (kaedama).' },
        { dish: 'Sushi at Tsukiji Outer Market', note: 'Not the inner market (it moved to Toyosu) — the outer market stalls are still excellent for cheap fresh sushi.' },
        { dish: 'Yakitori at Yurakucho', note: 'Under the train tracks — smoke, skewers, cold Sapporo. Best after Ginza shopping.' },
        { dish: 'Convenience store onigiri', note: 'FamilyMart tuna mayo or 7-Eleven salmon. Best breakfast in Tokyo at ¥130.' },
        { dish: 'Harajuku Crepes', note: 'Takeshita Street — Momi & Toy\'s or Marion Crepes. Banana chocolate for ¥600.' },
      ],
    },
    {
      city: 'Kyoto',
      must: [
        { dish: 'Kaiseki at a mid-range restaurant', note: '8-course traditional Japanese tasting menu. Budget ¥6,000–10,000 at Gion-area restaurants.' },
        { dish: 'Matcha soft serve at Nishiki Market', note: 'Itohkyuemon — intense matcha flavour, queue moves fast.' },
        { dish: 'Yudofu (tofu hot pot)', note: 'Kyoto specialty — Okutan restaurant near Nanzenji Temple since 1635.' },
        { dish: 'Nishiki Market tsukemono (pickles)', note: 'Sample the flavoured pickles — yuzu daikon, plum, sesame.' },
      ],
    },
    {
      city: 'Osaka',
      must: [
        { dish: 'Takoyaki at Dotonbori', note: 'Takoyaki Wanaka — octopus balls with bonito flakes and mayo. ¥800 for 8 pieces.' },
        { dish: 'Okonomiyaki', note: 'Chibo on Dotonbori — Osaka-style pancake with pork belly, topped at the table.' },
        { dish: 'Kushikatsu at Shinsekai', note: 'Deep-fried skewers on sticks. Daruma chain. Rule: no double-dipping the shared sauce.' },
        { dish: 'Ramen at Kinryu', note: 'Dragon-branded 24-hour stall on Dotonbori. Noodles at 3 AM for ¥500.' },
      ],
    },
    {
      city: 'Nara',
      must: [
        { dish: 'Kakinoha-zushi', note: 'Persimmon leaf-wrapped mackerel and salmon sushi — Nara specialty since the Edo period.' },
        { dish: 'Nakatanidou mochi', note: 'Watch the mochi-pounding street performance, then eat the warm yomogi mochi immediately.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'Kawaguchiko Lake, Mt Fuji', tip: 'Arrive 30 min before sunrise at the north shore (Kawaguchi Asama Shrine). Zero wind = perfect reflection.', timing: 'Dawn' },
    { location: 'Chureito Pagoda', tip: 'Climb the 398 steps by first light. Mt Fuji and pagoda in same frame facing east.', timing: 'Dawn or late afternoon' },
    { location: 'Fushimi Inari Taisha gates', tip: 'Arrive before 6 AM. The upper tunnel sections (20 min hike up) are deserted even on busy days.', timing: 'Dawn' },
    { location: 'Shibuya Crossing', tip: 'Shoot from the Starbucks second-floor window or Mag\'s Park rooftop for overhead view.', timing: 'Evening rush hour 17:30–19:00' },
    { location: 'Dotonbori canal, Osaka', tip: 'Shoot from Ebisubashi bridge facing west. Neon reflections on water best 30 min after sunset.', timing: 'Blue hour' },
    { location: 'Arashiyama Bamboo Grove', tip: 'Enter from the north gate at dawn (opens naturally). Light filters through best 7–9 AM.', timing: 'Early morning' },
    { location: 'Daikoku PA, Metropolitan Expressway', tip: 'Weekend midnight — Makuhari area Wangan Route. Shoot cars on the expressway ramp from the upper deck.', timing: 'Midnight weekends' },
  ],
}
