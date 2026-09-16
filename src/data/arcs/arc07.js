// Arc 07 — East Asia (2033)
// China → South Korea

export const ARC_07 = {
  tripOrder: ['china', 'korea'],

  itinerary: [
    { days: '1–3',  city: 'Shanghai',      country: 'china', nights: 3, transport: 'Flight BLR → PVG (Air China / China Eastern / Air India)',      highlights: ['The Bund + Pudong skyline at night', 'Yu Garden + Old City maze', 'Former French Concession cycling', 'M50 contemporary art district', 'Xintiandi historic shikumen blocks', 'Jing\'an Temple'] },
    { days: '4–6',  city: 'Chengdu',       country: 'china', nights: 3, transport: 'Flight Shanghai → Chengdu CTU (2 hrs)',                          highlights: ['Giant Panda Breeding Research Base (arrive 8 AM)', 'People\'s Park mahjong + blind date corner', 'Kuanzhai Alley (Broad and Narrow Lanes)', 'Sichuan Hot Pot experience (Haidilao or local)', 'Wu侯 Temple + Jinli Street evening', 'Du Fu Thatched Cottage'] },
    { days: '7–8',  city: 'Zhangjiajie',   country: 'china', nights: 2, transport: 'Flight Chengdu → Zhangjiajie DYG (1.5 hrs) or overnight train', highlights: ['Avatar Hallelujah Mountain (Qianlii Peak)', 'Zhangjiajie National Forest Park hanging cliff walks', 'Bailong Elevator (world\'s tallest outdoor elevator)', 'Tianmen Mountain glass walkway + skywalk', 'Tianmen Cave (Heaven\'s Gate)'] },
    { days: '9–11', city: 'Beijing',        country: 'china', nights: 3, transport: 'Flight Zhangjiajie → Beijing PEK (2.5 hrs)',                   highlights: ['Great Wall at Mutianyu (least crowded restored section)', 'Forbidden City + Tiananmen Square', 'Temple of Heaven', 'Summer Palace', '798 Art District (contemporary Chinese art)', 'Hutong alley rickshaw tour', 'Peking duck at Quanjude'] },
    { days: '12–14',city: 'Seoul',          country: 'korea', nights: 3, transport: 'Flight Beijing PEK → Seoul ICN (2 hrs)',                        highlights: ['Gyeongbokgung Palace + Changing of the Guard', 'Bukchon Hanok Village (sunrise walk)', 'Insadong antique + street food street', 'N Seoul Tower + Namsangol', 'Dongdaemun Design Plaza (Zaha Hadid)', 'Hongdae independent music street', 'Han River parks + night cycling'] },
    { days: '15–16',city: 'Gyeongju',       country: 'korea', nights: 2, transport: 'KTX high-speed from Seoul (2 hrs)',                            highlights: ['Cheomseongdae (world\'s oldest surviving observatory, 7th century)', 'Tumuli Park royal burial mounds', 'Bulguksa Temple (UNESCO)', 'Seokguram Grotto (UNESCO)', 'Anapji Pond evening lantern reflections', 'Hwangnam bread traditional bakery (since 1939)'] },
    { days: '17–19',city: 'Busan',          country: 'korea', nights: 3, transport: 'Train Gyeongju → Busan (30 min)',                              highlights: ['Haeundae Beach (Korea\'s most famous)', 'Gamcheon Culture Village (coloured hillside)', 'Haedong Yonggungsa Temple on the sea cliff', 'Jagalchi Fish Market (fresh seafood breakfast)', 'Gwangan Bridge night illumination', 'Beomeo-sa mountain temple hike'] },
    { days: '20–22',city: 'Jeju Island',    country: 'korea', nights: 3, transport: 'Flight Busan PUS → Jeju CJU (50 min)',                         highlights: ['Hallasan volcano crater hike (Korea\'s highest peak)', 'Manjanggul Lava Tube Cave', 'Seongsan Ilchulbong (sunrise peak — sunrise hike 5 AM)', 'Jeju haenyeo (diving women) demonstration', 'Olle Trail coastal walk (Trail 1 recommended)', 'Hallim Park subtropical gardens'] },
  ],

  transport: [
    { type: 'Flight',  icon: '✈️', segment: 'BLR → Shanghai (PVG)',        detail: 'Air China, China Eastern, or Air India. ~8 hrs.' },
    { type: 'Flight',  icon: '✈️', segment: 'Shanghai → Chengdu (CTU)',     detail: '2 hrs. Air China / Sichuan Air. Multiple daily.' },
    { type: 'Flight',  icon: '✈️', segment: 'Chengdu → Zhangjiajie (DYG)', detail: '1.5 hrs. Air China / China Southern.' },
    { type: 'Flight',  icon: '✈️', segment: 'Zhangjiajie → Beijing (PEK)', detail: '2.5 hrs.' },
    { type: 'Metro',   icon: '🚇', segment: 'Beijing Subway',               detail: 'Extensive network. Buy Yikatong card. Line 1 covers most tourist sites.' },
    { type: 'Flight',  icon: '✈️', segment: 'Beijing (PEK) → Seoul (ICN)',  detail: '2 hrs. Air China, Asiana, Korean Air.' },
    { type: 'Train',   icon: '🚂', segment: 'Seoul → Gyeongju → Busan (KTX)', detail: 'Korea Train Express. 2 hrs to Gyeongju, 30 min more to Busan. Book at letskorail.com.' },
    { type: 'Metro',   icon: '🚇', segment: 'Seoul Subway',                 detail: 'T-money card covers metro, bus, convenience stores. Load at airport.' },
    { type: 'Flight',  icon: '✈️', segment: 'Busan (PUS) → Jeju (CJU)',    detail: '50 min. T\'way, Jeju Air, Jin Air. Cheapest segment.' },
    { type: 'Flight',  icon: '✈️', segment: 'Jeju (CJU) → BLR via Seoul',  detail: 'Korean Air or Asiana via ICN. ~9 hrs total.' },
  ],

  currencies: [
    { country: 'China',       code: 'CNY', symbol: '¥', rateToINR: 11.50, notes: 'WeChat Pay / Alipay dominates — set up with foreign card before arrival. Cash still needed for street markets.' },
    { country: 'South Korea', code: 'KRW', symbol: '₩', rateToINR:  0.062, notes: 'T-money card for transport. Card accepted everywhere. ATMs in convenience stores (GS25, CU, 7-Eleven) reliable.' },
  ],

  highlights: [
    { tripId: 'china', city: 'Shanghai',    items: ['The Bund night skyline', 'Yu Garden + Old City', 'French Concession', 'M50 Art District'] },
    { tripId: 'china', city: 'Chengdu',     items: ['Giant Panda Base (8 AM arrival)', 'People\'s Park mahjong', 'Sichuan Hot Pot', 'Kuanzhai Alley'] },
    { tripId: 'china', city: 'Zhangjiajie', items: ['Avatar Hallelujah Mountain', 'Bailong Elevator', 'Tianmen Cave + glass walkway'] },
    { tripId: 'china', city: 'Beijing',     items: ['Great Wall (Mutianyu)', 'Forbidden City', 'Temple of Heaven', '798 Art District', 'Hutong rickshaw'] },
    { tripId: 'korea', city: 'Seoul',       items: ['Gyeongbokgung Palace', 'Bukchon Hanok Village', 'Dongdaemun Design Plaza', 'Hongdae street scene'] },
    { tripId: 'korea', city: 'Gyeongju',    items: ['Cheomseongdae observatory', 'Bulguksa + Seokguram (UNESCO)', 'Anapji Pond reflections', 'Tumuli Park mounds'] },
    { tripId: 'korea', city: 'Busan',       items: ['Gamcheon Culture Village', 'Haedong cliff temple', 'Haeundae Beach', 'Jagalchi Fish Market'] },
    { tripId: 'korea', city: 'Jeju',        items: ['Hallasan crater hike', 'Seongsan Ilchulbong sunrise', 'Manjanggul lava tube', 'Olle Trail coastal walk'] },
  ],

  packingNotes: [
    { category: 'China Requirements', icon: '🇨🇳', items: ['China Visa required for Indian passport holders (apply minimum 4 weeks ahead)', 'VPN app installed before entering China (Google, WhatsApp, Instagram blocked)', 'WeChat + Alipay set up with foreign bank card before arrival', 'Offline maps downloaded (Baidu or Apple Maps for China)'] },
    { category: 'October Layers', icon: '🍂', items: ['Light jacket for mornings (Seoul October: 14–20°C)', 'Walking shoes for extensive city walking', 'Comfortable layers for temperature variation (Zhangjiajie mountain to coastal Busan)'] },
    { category: 'Korea Specific', icon: '🇰🇷', items: ['T-money card for Seoul metro, bus, and convenience stores', 'K-pass for tourists (free metro rides benefit)', 'Portable WiFi or Korea SIM (KT/SKT reliable)'] },
  ],

  map: {
    center: [34.0, 118.0],
    zoom: 4,
    markers: [
      { id: 'shanghai',    name: 'Shanghai',    lat: 31.2304, lng: 121.4737, tripId: 'china', day: '1–3'   },
      { id: 'chengdu',     name: 'Chengdu',     lat: 30.5728, lng: 104.0668, tripId: 'china', day: '4–6'   },
      { id: 'zhangjiajie', name: 'Zhangjiajie', lat: 29.1295, lng: 110.4794, tripId: 'china', day: '7–8'   },
      { id: 'beijing',     name: 'Beijing',     lat: 39.9042, lng: 116.4074, tripId: 'china', day: '9–11'  },
      { id: 'seoul',       name: 'Seoul',       lat: 37.5665, lng: 126.9780, tripId: 'korea', day: '12–14' },
      { id: 'gyeongju',    name: 'Gyeongju',    lat: 35.8562, lng: 129.2247, tripId: 'korea', day: '15–16' },
      { id: 'busan',       name: 'Busan',       lat: 35.1796, lng: 129.0756, tripId: 'korea', day: '17–19' },
      { id: 'jeju',        name: 'Jeju',        lat: 33.4996, lng: 126.5312, tripId: 'korea', day: '20–22' },
    ],
    route: [
      [31.2304, 121.4737], [30.5728, 104.0668], [29.1295, 110.4794],
      [39.9042, 116.4074], [37.5665, 126.9780], [35.8562, 129.2247],
      [35.1796, 129.0756], [33.4996, 126.5312],
    ],
  },

  stays: [
    {
      country: 'China', flag: '🇨🇳', tripId: 'china',
      cities: [
        { city: 'Shanghai',    type: 'Business Hotel',       nights: 3, note: 'The Bund or Former French Concession — walkable evenings, riverside views' },
        { city: 'Chengdu',     type: 'Boutique Hotel',       nights: 3, note: 'Jinli / Kuanzhai area — hot pot street and panda base within 20 min' },
        { city: 'Zhangjiajie', type: 'Resort Hotel',         nights: 2, note: 'In or near the National Forest Park — pre-book, fills up fast in October' },
        { city: 'Beijing',     type: 'Hotel',                nights: 3, note: 'Dongcheng / Wangfujing — walking distance to Forbidden City and Hutong alleys' },
      ],
    },
    {
      country: 'South Korea', flag: '🇰🇷', tripId: 'korea',
      cities: [
        { city: 'Seoul',    type: 'Hotel / Guesthouse', nights: 3, note: 'Insadong or Hongdae — nightlife + culture split, good metro access everywhere' },
        { city: 'Gyeongju', type: 'Hanok Stay',         nights: 2, note: 'Traditional Korean wooden house — Anapji Pond walk at dusk' },
        { city: 'Busan',    type: 'Hotel',              nights: 3, note: 'Haeundae or Gwangan Bridge area — beach + sea-cliff temple on same day' },
        { city: 'Jeju',     type: 'Pension / Resort',   nights: 3, note: 'Seongsan side for sunrise hike access — Olle Trail start nearby' },
      ],
    },
  ],

  giftIdeas: [
    {
      country: 'China', flag: '🇨🇳',
      items: [
        { name: 'Hand-painted silk fan', where: 'Suzhou silk markets or Shanghai Old Street' },
        { name: 'Panda plush toy (official Chengdu Panda Base)', where: 'Chengdu Giant Panda Breeding Research Base gift shop' },
        { name: 'Zhangjiajie miniature landscape painting', where: 'Park entrance gift stalls' },
        { name: 'Pu-erh compressed tea cake', where: 'Tea specialist shops in Shanghai or Chengdu' },
      ],
    },
    {
      country: 'South Korea', flag: '🇰🇷',
      items: [
        { name: 'K-beauty skincare set (COSRX / Innisfree)', where: 'Myeongdong shopping street, Seoul' },
        { name: 'Hanji paper notebook or stationery', where: 'Insadong craft shops, Seoul' },
        { name: 'Korean ceramic tea cup (celadon)', where: 'Insadong antique street or Gyeongju museum shop' },
        { name: 'Hallasan Jeju souvenir stone figure (Dol hareubang)', where: 'Jeju souvenir shops' },
      ],
    },
  ],

  bookings: [
    { id: 'ck01', label: 'Flight BLR → Shanghai (PVG)',             category: 'transport',  priority: 'critical', window: { start: '2033-04', end: '2033-07' } },
    { id: 'ck02', label: 'Flight Jeju (CJU) → BLR via Seoul',       category: 'transport',  priority: 'critical', window: { start: '2033-04', end: '2033-07' } },
    { id: 'ck03', label: 'China Visa (apply 4–6 weeks ahead)',      category: 'document',   priority: 'critical', window: { start: '2033-08', end: '2033-09' } },
    { id: 'ck04', label: 'K-ETA for South Korea',                   category: 'document',   priority: 'critical', window: { start: '2033-09', end: '2033-10' } },
    { id: 'ck05', label: 'VPN subscription (install before China)', category: 'setup',      priority: 'critical', window: { start: '2033-09', end: '2033-10' } },
    { id: 'ck06', label: 'Great Wall Mutianyu timed ticket',        category: 'experience', priority: 'high',     window: { start: '2033-09', end: '2033-10' } },
    { id: 'ck07', label: 'Panda Base Chengdu early morning ticket', category: 'experience', priority: 'high',     window: { start: '2033-09', end: '2033-10' } },
    { id: 'ck08', label: 'Gyeongju Hanok guesthouse',               category: 'accommodation', priority: 'high',  window: { start: '2033-07', end: '2033-09' } },
    { id: 'ck09', label: 'Travel insurance (China + Korea)',         category: 'document',   priority: 'critical', window: { start: '2033-09', end: '2033-10' } },
  ],

  notes: [
    'China Visa for Indian passport holders: apply at Chinese Embassy/VFS. Process takes 4–15 business days.',
    'VPN is essential for China — install and test before departure. Windscribe or ExpressVPN recommended.',
    'Great Wall best early morning (Mutianyu opens 8 AM — avoid weekends).',
    'Panda Base in Chengdu: pandas are most active 8–10 AM. Feeding time.',
    'Zhangjiajie is prone to fog — build in 2 days for at least one clear day.',
    'Seoul to Gyeongju: take KTX to Singyeongju (not Gyeongju station) — closer to main sites.',
    'Jeju hike: Hallasan summit trail requires very early start — summit closes at 1 PM (descent required after).',
    'October is peak Korea autumn foliage season — Gyeongju temple grounds are exceptional.',
  ],

  practicalInfo: {
    weather: 'October in East Asia: Shanghai 16–22°C (pleasant autumn), Chengdu 14–20°C (often misty), Zhangjiajie 12–18°C with frequent fog. Beijing 10–18°C, excellent visibility. Seoul 12–20°C — peak foliage season, Jeju 18–22°C.',
    emergency: 'China: 110 (Police) · 120 (Ambulance) · 119 (Fire). Korea: 112 (Police) · 119 (Fire + Ambulance)',
    driving: [
      'China: foreign licences not valid in China. Do not rent a car — hire a private driver for day trips or book through hotel.',
      'Zhangjiajie: take official buses within Wulingyuan Scenic Area. Taxis outside the gate are fixed price.',
      'South Korea: international licence valid. Rental cars available in Seoul, Busan, and Jeju Island.',
      'Jeju Island: best explored by rental car. Circumference road around the island takes 3–4 hrs — all scenic.',
    ],
    transit: [
      'China: high-speed rail (CRH/Fuxing) connects all major cities. Shanghai → Beijing: 4h30m on G-class train. Book via Trip.com.',
      'Shanghai Metro: 20 lines, covers everything. No cash on buses — use T-money card or WeChat Pay.',
      'Seoul Metro: T-money card works on all metro, bus, and Jeju buses. Buy at ICN airport GS25 convenience store.',
      'KTX Seoul → Gyeongju: 2 hrs to Singyeongju (not Gyeongju station). KTX Seoul → Busan: 2h15m.',
    ],
    payment: [
      'China: WeChat Pay is mandatory for almost everything. Set up WeChat Pay with international card before arrival. Carry ¥500 cash as backup.',
      'China: many restaurants and apps are in Chinese only — hotel concierge help or Pleco translation app is essential.',
      'Korea: Kakao Pay and card accepted everywhere. T-money card doubles as payment in convenience stores.',
      'Budget China: ¥300–500/day (₹3,500–6,000). Korea: ₩100,000–180,000/day (₹6,000–11,000).',
    ],
    sim: [
      'China: foreign SIM cards do NOT work inside China. Buy a China Unicom Tourist SIM at PVG/PEK airport (¥150 for 30 days, 50GB).',
      'VPN: install Astrill or ExpressVPN BEFORE arriving in China — cannot be downloaded inside the country.',
      'Korea: SK Telecom or KT 10-day tourist SIM at ICN airport (₩33,000). Full LTE everywhere.',
    ],
    etiquette: [
      'China: accept business cards with two hands as a sign of respect. Pointing with one finger is mildly rude.',
      'Tipping in China: not a custom and sometimes refused. Leave it gracefully if declined.',
      'Panda Base (Chengdu): no flash photography, no touching. Keep voices low — the bears are easily startled.',
      'Korea: remove shoes before entering homes or traditional restaurants with floor seating.',
      'Korea: pour drinks for others before yourself. The youngest at the table pours for elders.',
    ],
  },

  foodHighlights: [
    {
      city: 'Shanghai',
      must: [
        { dish: 'Xiaolongbao (soup dumplings)', note: 'Din Tai Fung IFC Mall — delicate pork broth inside a thin wrapper. Dip in ginger + black vinegar. Bite a corner first, sip the soup.' },
        { dish: 'Sheng jian bao (pan-fried buns)', note: 'Thick-bottomed pork buns fried then steamed — Yang\'s Fry-Dumpling on Wujiang Road. Crispy base, juicy interior.' },
        { dish: 'Hairy crab (dazha xie)', note: 'October is hairy crab season — the most prized crustacean in China. Steamed with vinegar near Yu Garden.' },
      ],
    },
    {
      city: 'Chengdu',
      must: [
        { dish: 'Mapo tofu at Chen Mapo Doufu', note: 'The original since 1862. Silken tofu in chilli oil, Sichuan peppercorn (numbing sensation), doubanjiang paste. ¥28 for a portion.' },
        { dish: 'Hot pot (huoguo) at Haidilao', note: 'Two broths (spicy + clear), raw sliced meats, lotus root. Go at 1 PM or after 9 PM to avoid 2-hr queues.' },
        { dish: 'Dan dan noodles', note: 'Sesame paste, chilli oil, Sichuan peppercorn, minced pork. Any street stall near Jinli Ancient Street — ¥10 a bowl.' },
      ],
    },
    {
      city: 'Beijing',
      must: [
        { dish: 'Peking duck at Quanjude', note: 'The original (1864). Chef carves tableside — eat with hoisin sauce, spring onion, and a thin flour pancake. Reserve ahead.' },
        { dish: 'Jianbing (Beijing breakfast crepe)', note: 'Mung bean batter with egg, hoisin, crispy wonton. Any street cart in Hutong district at 7–9 AM. ¥8.' },
      ],
    },
    {
      city: 'Seoul',
      must: [
        { dish: 'Korean BBQ (samgyeopsal)', note: 'Thick-cut pork belly grilled tableside, wrapped in perilla leaf with garlic and gochujang. Maple Tree House, Itaewon.' },
        { dish: 'Bibimbap', note: 'Jeonju-style: 28 toppings over warm rice in a stone bowl (dolsot). The crispy rice at the bottom is the prize. Jeonju Jungang Hoegwan.' },
        { dish: 'Tteokbokki (spicy rice cakes)', note: 'Chewy rice cylinders in gochujang sauce. Gwangjang Market stalls in Jongno — eat standing at the stall.' },
      ],
    },
  ],

  photographySpots: [
    { location: 'The Bund, Shanghai at night', tip: 'Blue hour gives even exposure across the Pudong neon towers from the waterfront promenade. Wander toward Suzhou Creek for long-lens compression.', timing: 'Blue hour / night' },
    { location: 'Zhangjiajie Avatar mountains', tip: 'Hallelujah Mountain viewpoint on Tianzi Mountain ridge. Build in 2 mornings — fog is atmospheric but obscures summits. Aim for 7–9 AM after rain.', timing: 'Morning after rain' },
    { location: 'Great Wall Mutianyu at sunrise', tip: 'Cable car from Mutianyu at opening (8 AM). Walk east from the main tower cluster for a deserted watchtower in early light.', timing: 'Morning golden hour' },
    { location: 'Bukchon Hanok Village, Seoul', tip: 'Gahoe-dong 31 alley — stepped stone lane with hanok rooflines. Arrive at 7:30 AM before tour groups.', timing: 'Early morning' },
    { location: 'Gyeongju Tumuli Park (ancient tombs)', tip: 'October foliage around the round grass burial mounds. Long exposure at dusk when they are lit. Cheonmachong interior is open.', timing: 'Dusk golden light' },
  ],
}
