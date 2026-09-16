export const DAYS = [
  // ─── Day 1 — Stockholm Arrival ───────────────────────────────────────────────
  {
    num:       '01',
    date:      'Dec 9 — Wednesday',
    city:      'Stockholm',
    title:     'Arrival — Gamla Stan & Christmas Lights',
    transport: 'BLR → Stockholm ARN via Doha / Dubai / Frankfurt · Arlanda Express ARN → Stockholm Central · 20 min · SEK 320 (≈₹2,560)',
    places: [
      {
        name:        'Gamla Stan (Old Town)',
        time:        '3:00 PM',
        description: 'Stockholm\'s old town on its own island — a dense medieval grid of 13th-century lanes, coloured plaster facades in ochre, terracotta, and pale gold, and cobblestones that ring with cold in December. Stortorget, the great central square, is surrounded by 17th-century merchant townhouses and anchors the oldest continuously-operating Christmas market in Scandinavia. Arriving here straight from the warmth of Arlanda is an immediate and total immersion in Scandinavian winter.',
        images: [
          'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548925706-c82e6e24e5d2?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tunnelbana (Metro) T-Centralen → Gamla Stan · 2 stops · SL single ticket SEK 37 (≈₹296)',
        cost:        0,
        tip:         'Stortorget Christmas market (Julmarknad) runs late November through Dec 23 — buy a glögg mug (SEK 65, ≈₹520) and keep the clay mug as a souvenir. The market is free to enter and most atmospheric at dusk (4–6 PM) when all the lanterns and fairy lights illuminate the square.',
      },
      {
        name:        'Stortorget Christmas Market',
        time:        '4:00 PM',
        description: 'One of the oldest Christmas markets in Scandinavia, running since the 15th century in the very square where medieval merchants traded. The stalls sell steaming glögg (mulled wine with raisins and almonds), lussekatter (saffron buns), julpepparkakor (Christmas gingerbread), handwoven wool, hand-blown glass ornaments, Dala horses, and carved wooden Julbockar (Christmas goats). The smell of cinnamon, cardamom, and pine resin fills the cold air while snowflakes settle on the cobblestones.',
        images: [
          'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'In Stortorget square, Gamla Stan — already here',
        cost:        0,
        tip:         'The vegetarian Christmas food is excellent here: saffransbullar (saffron buns with raisins), pepparkakor, and roasted almonds are all plant-based. The glögg without alcohol (alkoholfri glögg) is equally warming — specify "utan alkohol" at the stall.',
      },
      {
        name:        'Nobel Museum',
        time:        '5:30 PM',
        description: 'A compact, intelligent museum dedicated to the Nobel Prize and its laureates since 1901 — housed in the old stock exchange building (Börsen) on the north side of Stortorget. The ceiling conveyors carry reproductions of every Nobel diploma rotating overhead; interactive stations let you explore each laureate\'s discovery in depth. The basement café serves Nobel Prize-winning recipes, as each laureate donates a dish from their home country when attending the banquet in December. Perfectly positioned for a late-afternoon visit after the Christmas market.',
        images: [
          'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'In Stortorget square, Gamla Stan — step inside from the Christmas market',
        cost:        960,
        tip:         'The café downstairs serves the famous Nobel ice cream — laureates sign the underside of their chair at the prize banquet, a tradition since 1991. Check nobelprizemuseum.se for December hours (closed Mondays). The museum takes 60–90 minutes; buy tickets online to skip the queue.',
      },
    ],
    food:    ['Stortorget Christmas market: glögg + saffransbullar + roasted almonds (vegetarian-perfect)', 'Hermans Vegetariska Restaurant, Fjällgatan 23B (Södermalm) — legendary all-vegetarian buffet with Gamla Stan views from the cliff terrace'],
    stay:    'Generator Stockholm, Torsgatan 10, Vasastan, Stockholm',
    nextDay: 'Djurgården island museums — Vasa Museum + Skansen Christmas market + Fotografiska photography museum',
  },

  // ─── Day 2 — Stockholm Museums ───────────────────────────────────────────────
  {
    num:       '02',
    date:      'Dec 10 — Thursday',
    city:      'Stockholm',
    title:     'Vasa Museum · Skansen · Fotografiska',
    transport: 'Tram 7 from Norrmalmstorg → Djurgårdslinjen stops · SEK 37 per single · SL day pass SEK 165 (≈₹1,320) worth buying today',
    places: [
      {
        name:        'Vasa Museum',
        time:        '10:00 AM',
        description: 'One of the most extraordinary museums in existence — a complete 17th-century Swedish warship that sank on its maiden voyage in 1628, lay preserved in Stockholm\'s cold harbour mud for 333 years, was raised intact in 1961, and now fills an entire purpose-built museum on Djurgården. The Vasa is 98% original timber: all 64 bronze cannons, the lion figurehead, 700 carved sculptures, the rigging hardware, and the personal possessions of her crew. When you first enter and see it rising seven decks toward the ceiling, the scale and the silence of it is genuinely staggering — the best museum in Stockholm by some margin.',
        images: [
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tram 7 from Norrmalmstorg → Nordiska museet/Vasamuseet stop · 15 min',
        cost:        1440,
        tip:         'Buy tickets online at vasamuseet.se to skip the queue. The English guided tour (included with entry) runs at 10:30 AM and 12:30 PM — the guide reveals the exact design flaw that caused the sinking and shows you details you\'d miss on a solo walk. Allow a full 2 hours. Bags must be checked; the lockers are free.',
      },
      {
        name:        'Skansen Open-Air Museum',
        time:        '1:00 PM',
        description: 'The world\'s oldest open-air museum (opened 1891) — 150 historic buildings relocated from across Sweden to 75 acres of Djurgården, staffed in December by costumed interpreters demonstrating traditional crafts: glassblowing, candle-dipping, weaving, and bread-baking in 18th-century ovens. Skansen\'s December Julmarknad (Christmas market) is considered the finest in Sweden: craftspeople in period buildings selling hand-blown glass, hand-knitted Lapland wool, and traditional Julbock straw goats. Reindeer, moose, bears, and wolves in the native wildlife section are all included in entry.',
        images: [
          'https://images.unsplash.com/photo-1548953814-c94b6c8cc82b?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Walk from Vasa Museum (5 min along Djurgårdsvägen) or Tram 7 → Skansen stop',
        cost:        960,
        tip:         'The Skansen Aquarium (inside the park) has an extra admission fee — skip it. The December Christmas market in the Bollnästorget area is the main draw; the craftspeople are genuine artisans, not import shops. The reindeer in the Lappgården (Lapland farmstead) section can be petted — they\'re calm and accustomed to visitors.',
      },
      {
        name:        'Fotografiska Photography Museum',
        time:        '4:00 PM',
        description: 'One of the finest photography museums in the world — a converted 1906 Art Nouveau customs building on the Stockholm waterfront with four major rotating exhibitions running simultaneously. The programme has featured Annie Leibovitz, Sebastião Salgado, Cindy Sherman, and every major documentary and fine art photographer of the last two decades. The building itself rewards attention: red-brick industrial architecture with soaring internal galleries and a rooftop restaurant with panoramic views over Djurgården, the water, and the lit Gamla Stan skyline at blue hour.',
        images: [
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Bus 53 or Tram 7 → Fotografiska stop on Stadsgårdskajen · 10 min from Skansen',
        cost:        1600,
        tip:         'Book tickets at fotografiska.com at least 24 hours ahead — December weekdays fill up. The rooftop restaurant serves excellent New Nordic cuisine (SEK 200+ starters) — the ground-floor café is far more affordable for a coffee and cardamom pastry. Fotografiska stays open until 11 PM; evening with the city lights visible from inside is the ideal time.',
      },
    ],
    food:    ['Vasa Museum café for a smörgås (Swedish open sandwich) with pickled herring and rye bread', 'Skansen Julmarknad for lussekatter (saffron buns) and hot chocolate from a period stall', 'Fotografiska ground-floor café for evening coffee and cardamom pastry'],
    stay:    'Generator Stockholm, Torsgatan 10, Vasastan, Stockholm',
    nextDay: 'Stockholm City Hall tower + Monteliusvägen panorama walk + ABBA Museum — a culture and views day in the city',
  },

  // ─── Day 3 — Stockholm Culture & Views ───────────────────────────────────────
  {
    num:       '03',
    date:      'Dec 11 — Friday',
    city:      'Stockholm',
    title:     'City Hall · Monteliusvägen · ABBA Museum',
    transport: 'Tunnelbana + walking · SL day pass SEK 165 · Tram 7 to Djurgården for ABBA Museum afternoon',
    places: [
      {
        name:        'Stockholm City Hall (Stadshuset)',
        time:        '10:00 AM',
        description: 'Stockholm\'s most iconic building — a monumental 1923 brick tower on the Riddarfjärden waterfront that hosts the Nobel Prize banquet in its Blue Hall every December 10th (just one day before your visit). The tower (106m) gives 360° views over the frozen lake system, the waterways connecting Stockholm\'s islands, Gamla Stan, and the winter skyline. Inside, the Golden Hall is lined with 18 million gold mosaic tiles depicting the history of Sweden in Byzantine-influenced imagery — one of the most opulent interior spaces in Scandinavia.',
        images: [
          'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548925706-c82e6e24e5d2?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tunnelbana T-Centralen → Rådhuset · 1 stop · 3-min walk to Stadshuset',
        cost:        800,
        tip:         'Tower access is separate from the interior tour (tower SEK 100 / ₹800, guided interior tour SEK 130 / ₹1,040). The tower is open only in summer; in December, book the guided tour of the Blue Hall and Golden Hall (included in entry). Book at stadshuset.stockholm in advance — December tours are busy with Nobel season visitors.',
      },
      {
        name:        'Monteliusvägen Viewpoint Walk',
        time:        '12:30 PM',
        description: 'A 500-metre pedestrian ridge path along the north cliff of Södermalm — at 30–40 metres above the water, it gives a completely unobstructed panorama of the Stockholm waterscape: Riddarholmen, Gamla Stan, City Hall, Lake Mälaren, and the western bridges. In December, the path is quiet (few tourists know it), and the low sun at noon grazes the architecture at a perfect angle. This is the finest free viewpoint in Stockholm — better than any paid attraction for sheer scope and silence, with the city spread below in winter haze.',
        images: [
          'https://images.unsplash.com/photo-1548953814-c94b6c8cc82b?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tunnelbana → Mariatorget (T13) · Walk north up Bellmansgatan to the ridge path · 10 min',
        cost:        0,
        tip:         'The path begins at Maria Magdalena church steps and ends near Ivar Los Park. Walk it eastward for the best views (sun is behind you in the south at midday in December). The path is narrow and gets icy — grip boots essential. Drop Kafé on Götgatan below serves the best fika in Södermalm afterward: kanelbulle + flat white, SEK 80 (₹640).',
      },
      {
        name:        'ABBA The Museum',
        time:        '3:00 PM',
        description: 'An interactive museum dedicated to the most commercially successful Swedish cultural export in history — using genuine artefacts (original stage costumes, handwritten lyric sheets, gold records, the actual piano from the "The Winner Takes It All" recording session) alongside high-technology interactive exhibits where you can record yourself singing with holographic ABBA in a private studio and share the result. Glossier and more entertainment-focused than the Vasa Museum, but thoroughly enjoyable for a solo afternoon regardless of your pre-existing relationship with ABBA.',
        images: [
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tram 7 from Slussen → Liljevalchs/Gröna Lund · Or Bus 67 to Djurgårdsvägen',
        cost:        2080,
        tip:         'Book at abbathemuseum.com — the Agnetha hologram studio visit is timed and allocated on arrival; go there first. The costume display is the highlight even for non-ABBA fans — the sheer craft of 1970s stage couture is genuinely impressive. The museum shop has tasteful branded merchandise: the ABBA Gold vinyl is a good souvenir.',
      },
      {
        name:        'Systembolaget + Afternoon Fika',
        time:        '5:30 PM',
        description: 'Sweden\'s state alcohol monopoly — the only place to buy wine and spirits in the country. The flagship Systembolaget on Regeringsgatan has an unusually good selection of Scandinavian aquavit, glögg concentrate (the real Christmas drink ingredient), and Swedish craft beer. Browse the shelves for small gifts (miniature aquavit makes an excellent carry-on souvenir). Finish the day at any of Södermalm\'s konditori (traditional Swedish pastry shops) for a final December fika: varm choklad and a lussekatt by a candlelit window.',
        images: [
          'https://images.unsplash.com/photo-1548925706-c82e6e24e5d2?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tunnelbana → T-Centralen · Systembolaget near Hötorget or Södermalm',
        cost:        0,
        tip:         'Systembolaget is closed on Sundays and public holidays. Hours in December are typically Mon–Fri 10 AM–7 PM, Sat 10 AM–3 PM. Glögg concentrate (Blossa or Åhus brands) travels well and makes excellent gifts. The Varm choklad at Vete-Katten konditori (Kungsgatan 55) is the most traditional fika experience in Stockholm.',
      },
    ],
    food:    ['Stadshuset café for post-tour coffee', 'Meatballs for the People (Nytorgsgatan 30, Södermalm) — creative Swedish meatball dinner with plant-based meatball option, excellent value at SEK 175 (₹1,400)'],
    stay:    'Generator Stockholm, Torsgatan 10, Vasastan, Stockholm',
    nextDay: 'Morning SJ train to Gothenburg (3h) — Haga District fika + Liseberg Christmas market + Götaplatsen',
  },

  // ─── Day 4 — Gothenburg ──────────────────────────────────────────────────────
  {
    num:       '04',
    date:      'Dec 12 — Saturday',
    city:      'Gothenburg',
    title:     'Haga District · Liseberg · Götaplatsen',
    transport: 'SJ High-Speed Train Stockholm C → Göteborg C · 3h · Book via sj.se · SEK 350–700 (≈₹2,800–₹5,600) book 3 months ahead for cheapest fare',
    places: [
      {
        name:        'Haga District',
        time:        '11:30 AM',
        description: 'Gothenburg\'s most beloved neighbourhood — wooden 19th-century working-class buildings in deep red, ochre, and forest green on a single sloping street (Haga Nygata) that became the heart of the city\'s design and café culture. Haga is where Gothenburg artists, architects, and independent booksellers live and work, and in December the street is strung with warm Edison bulbs and the old wooden windows glow amber with candlelight. The cafés here invented Sweden\'s most extreme version of fika: kanelbullar the size of a dinner plate.',
        images: [
          'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548953814-c94b6c8cc82b?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Walk from Göteborg C station (20 min via Vallgatan) · Or Tram 1/3/6 → Hagakyrkan stop',
        cost:        0,
        tip:         'Café Husaren on Haga Nygata is famous for the largest kanelbulle in Sweden — the size of a dinner plate, SEK 55 (₹440). Order one with a cappuccino and sit by the window watching December Haga. You will not finish it alone — the point is the beautiful absurdity of it. Husaren is fully vegetarian-friendly.',
      },
      {
        name:        'Liseberg Christmas Market',
        time:        '2:00 PM',
        description: 'One of the finest Christmas markets in Scandinavia — Liseberg amusement park transforms each November into a winter wonderland of 5 million lights, traditional craft stalls, glögg stations, ice rinks, and Scandinavian festive food that draws 2.5 million visitors every year. The market is spread across the park\'s grounds in sections: the traditional Julmarknad with handicraft stalls, the glögg bar by the giant Christmas tree (the tallest in Scandinavia), and the outdoor stage with Swedish folk and Christmas music. In December darkness by 3 PM, the light installations are extraordinary.',
        images: [
          'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tram 5/13 → Liseberg stop · 15 min from Haga',
        cost:        480,
        tip:         'Entry to the Liseberg Christmas market (Liseberg Jul) is SEK 60 (₹480) on weekdays; save by going on a weekday afternoon. The Christmas rides (big wheel, carousel) are separate charges. The glögg and pepparkakor stalls accept card. Go in the early afternoon and stay through 4–5 PM when the full light display activates — the park looks completely different in the dark.',
      },
      {
        name:        'Götaplatsen & Museum of Art',
        time:        '5:00 PM',
        description: 'Götaplatsen is Gothenburg\'s grand civic square — the Carl Milles Poseidon fountain at its centre (a 7-metre bronze sculpture of the sea god that caused a municipal scandal when unveiled in 1931 due to its anatomical candour), flanked by the Gothenburg Museum of Art (Göteborgs Konstmuseum), the Concert Hall, the City Theatre, and the City Library. The Museum of Art holds the best collection of Nordic painting outside Copenhagen: Edvard Munch, Anders Zorn, Carl Larsson, Bruno Liljefors, and a significant Impressionist collection acquired in the early 20th century. The square itself at evening, with the museum lit and Poseidon at the top of the avenue, is one of Sweden\'s most civic and confident spaces.',
        images: [
          'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tram 5/13 from Liseberg → Götaplatsen · 3 stops · 8 min',
        cost:        640,
        tip:         'The Museum of Art (Konstmuseum) charges SEK 80 (₹640) adult entry and closes at 6 PM on weekdays. In December the museum opens for extended winter hours on Thursdays. The Zorn room and the Scandinavian Modernism galleries are the highlights — an hour is sufficient if you have limited time. The square fountains are sometimes frozen in December; Poseidon encrusted with ice is a photographic subject in its own right.',
      },
    ],
    food:    ['Café Husaren kanelbulle in Haga (gigantic, unmissable, vegetarian)', 'Liseberg Christmas market glögg + roasted almonds + pepparkakor', 'Saluhallen (Kungstorget covered market) for an early dinner before tomorrow\'s Arctic flight — vegetarian options from the deli counters'],
    stay:    'STF Hostel Gothenburg, Mölndalsvägen 23, Gothenburg',
    nextDay: 'Gothenburg City Airport (GSE) → Kiruna (KRN) · Early morning flight · Arctic Lapland arrival · Icehotel Jukkasjärvi',
  },

  // ─── Day 5 — Kiruna Arrival ──────────────────────────────────────────────────
  {
    num:       '05',
    date:      'Dec 13 — Sunday',
    city:      'Kiruna',
    title:     'Arctic Arrival — Icehotel & Torne River',
    transport: 'Flight Gothenburg Landvetter (GOT) → Kiruna (KRN) via Stockholm ARN · Book with SAS or Amapola/BRA · Transfer Kiruna Airport → Icehotel Jukkasjärvi 15 min (bus SEK 150 ≈₹1,200 or arranged by hotel)',
    places: [
      {
        name:        'Icehotel Jukkasjärvi',
        time:        '1:00 PM',
        description: 'The world\'s original and most famous ice hotel — built every winter since 1989 on the banks of the Torne River in Jukkasjärvi, 17km from Kiruna, from 10,000 cubic metres of ice cut directly from the river. The main seasonal building (rebuilt each December from scratch) contains themed art suites sculpted by international artists selected through a competitive process — each suite a unique piece of ice architecture at -5°C inside. The adjacent ICEHOTEL 365 section uses refrigeration for year-round ice. Walking through the ice corridor with a lantern at midnight, passing from suite to suite, each one a different frozen world, is unlike anywhere else on Earth.',
        images: [
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518715303843-586e350061c1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Lulebo/airport bus from Kiruna Airport → Jukkasjärvi · 15 min · Book via icehotel.com',
        cost:        1200,
        tip:         'If not staying at the Icehotel, daytime art suite tours cost SEK 150 (₹1,200) and are available from 10 AM–6 PM. The Absolut Icebar inside serves vodka cocktails in ice glasses — booking a seat here in the evening is highly recommended. Photography inside the suites: ISO 800, f/4, 1/30s — the ice is luminescent. Keep phone batteries warm in an inside pocket.',
      },
      {
        name:        'Kiruna Church',
        time:        '3:30 PM',
        description: 'Consistently voted Sweden\'s most beautiful building — a large timber church built in 1912 in a style that fuses Sami architectural forms with Gothic church typology. Painted deep red with white trim and rising with unlikely elegance above the mining town, it was physically relocated 3km to its new site in 2021 to escape the expanding LKAB iron ore mine subsidence zone — an engineering operation that moved the entire wooden building across the tundra intact. The interior has an Art Nouveau altar painting, ironwork by Sami artisans, and a bell tower that chimes across the birch forest every hour.',
        images: [
          'https://images.unsplash.com/photo-1518715303843-586e350061c1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Taxi or local bus from Jukkasjärvi to new Kiruna town centre · 20 min',
        cost:        0,
        tip:         'The church is free to enter and is open for viewing outside of service times. The new Kiruna town centre (rebuilt due to the mine relocation) around the church is worth a short walk — the architecture is deliberate and interesting, designed by various Scandinavian practices. The adjacent Kiruna Gymnasium has a Sami cultural display visible from the entrance hall.',
      },
      {
        name:        'Torne River & First Aurora Watch',
        time:        '9:00 PM',
        description: 'The frozen Torne River beside the Icehotel is the source of all the building material — each winter the river freezes to 80–100cm depth and 10,000 cubic metres are cut in March, stored cold, and used the following November to build the hotel. In December the river is fully or partially frozen; the spruce forest on the opposite bank is white with heavy frost. At 9 PM, the sky above the treeline at 68°N is coal-black and full of stars. Check the Kp index on My Aurora Forecast app: if it reads 3 or above and the sky is clear, this is your first aurora of the trip — right beside the hotel, in minus fifteen.',
        images: [
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Walk from Icehotel (2 min to the riverbank)',
        cost:        0,
        tip:         'Download My Aurora Forecast and SpaceWeatherLive before leaving Stockholm. Kp 3+ with clear skies = visible aurora at 68°N. Set up your camera tripod on the river ice with the Icehotel lit in the background: ISO 1600, f/2.8, 6–8 seconds, manual focus at infinity. Keep spare batteries warm in your inner jacket — cold kills lithium batteries in minutes at -15°C.',
      },
    ],
    food:    ['Icehotel restaurant: reindeer stew (renskav) with lingonberries and arctic cloudberry jam — the quintessential Lapland arrival dinner', 'Hot lingonberry juice (lingondricka) from the Icehotel bar to warm up after the river walk'],
    stay:    'Icehotel Jukkasjärvi, Marknadsvägen 63, Jukkasjärvi — warm cabin or standard room · Or Camp Ripan, Campingvägen 5, Kiruna as budget alternative',
    nextDay: 'Dog sled at dawn through Lapland forest · Sámi Cultural Centre reindeer experience · Aurora guided tour from Icehotel at 9 PM',
  },

  // ─── Day 6 — Kiruna Arctic Day ───────────────────────────────────────────────
  {
    num:       '06',
    date:      'Dec 14 — Monday',
    city:      'Kiruna',
    title:     'Dog Sled · Sámi Culture · Aurora Hunt',
    transport: 'Tour operators provide transfers from Kiruna / Icehotel · Taxi for Sámi centre · 15–25 min each direction',
    places: [
      {
        name:        'Dog Sled Through Lapland Forest',
        time:        '9:00 AM',
        description: 'Husky sledding through the Lapland boreal forest in December — the dogs are Alaskan and Siberian Huskies maintained by mushers outside Kiruna, and the 2-hour run takes you along groomed forest tracks through spruce and birch at 15–20 km/h in near-total polar night darkness. The only sounds are the dogs\'s breath condensing in plumes and the steel runners on compressed snow. At latitudes this far north, the two hours of twilight around noon — cold blue light on white forest — is the backdrop for the run. A solo experience of almost complete silence and speed is rare in any form of travel; this is it.',
        images: [
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Transfer from Kiruna/Icehotel arranged by operator (typically 15–25 min) · Book via bearpaw.se or dog-sled-kiruna.com',
        cost:        9600,
        tip:         'Book 2–3 months ahead — December dog sled runs sell out well in advance. The "stand and drive" option is harder and more exhilarating (you balance at the back of the sled, steering with body weight). The "passenger in the sled basket" option is warmer and lets you focus on photography. Dress for -25°C with wind chill: balaclava + ski goggles are not optional.',
      },
      {
        name:        'Nutti Sámi Siida — Reindeer & Cultural Experience',
        time:        '1:00 PM',
        description: 'Nutti Sámi Siida is an authentic Sami-owned cultural centre outside Kiruna offering one of the most genuine indigenous cultural encounters available in Scandinavia. The programme includes meeting a reindeer herding family\'s animals in their natural winter setting (feeding reindeer from your hand), learning about traditional joik (Sami vocal music and its connection to the Arctic landscape), warming yourself over an open fire inside a lavvu (traditional Sami tent) while drinking boiled coffee and eating bannock bread, and hearing about the ongoing relationship between Sami herding families and the Swedish state. Nothing here feels like performance tourism.',
        images: [
          'https://images.unsplash.com/photo-1518715303843-586e350061c1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Taxi from Kiruna town centre · 15 min · Or operator transfer · Book at nuttisami.se',
        cost:        6400,
        tip:         'The Nutti Sámi Siida experience lasts 2–3 hours. Book directly at nuttisami.se rather than through third-party booking sites — the family-owned operation gets better margin and you can discuss the programme directly. The experience is fully vegetarian (no reindeer food involved — they are livestock animals, not food animals in this context). Reindeer are unexpectedly calm and can be fed from your palm.',
      },
      {
        name:        'Aurora Hunting — Guided Night Tour',
        time:        '9:00 PM',
        description: 'A guided aurora hunt from Icehotel or Kiruna — the guide monitors real-time Kp index and cloud cover maps and drives to the clearest location within 30–60km of Kiruna to maximise viewing. At 68°N in December with Kp 3+, the Northern Lights are not a maybe — they are a probability on any clear night. On exceptional nights (Kp 5+, which occurs several times each winter), the aurora fills the entire sky in shifting green curtains with violet and red fringing, dancing faster than unaided photography can freeze without a tripod and 6-second exposures. The guide teaches camera settings for aurora photography on-site.',
        images: [
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518715303843-586e350061c1?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Minibus transfer from Icehotel included in tour price · Book via icehotel.com or lights-over-lapland.com',
        cost:        7200,
        tip:         'Book the Icehotel\'s own aurora tour (available to non-guests) or Lights Over Lapland guide service. Both provide thermal suits if needed — but your own Arctic layers are better. Camera settings for aurora: ISO 1600–3200, f/2.8 wide open, 4–8 seconds, manual focus at infinity. A remote shutter release (or self-timer on 2s) eliminates camera shake. The guide will hot chocolate.',
      },
    ],
    food:    ['Hot chocolate and coffee at the dog sled base after the morning run', 'Lavvu coffee and bannock bread at Nutti Sámi Siida (included in experience)', 'Kiruna Stadshuskällaren for a warm dinner: Arctic char (röding) with dill cream sauce — local fish, vegetarian-adjacent option available'],
    stay:    'Icehotel Jukkasjärvi, Marknadsvägen 63, Jukkasjärvi · Or Camp Ripan, Campingvägen 5, Kiruna',
    nextDay: 'Transfer Kiruna → Abisko National Park (90 min bus) · Aurora Sky Station chairlift · Abisko birch forest walk',
  },

  // ─── Day 7 — Abisko ──────────────────────────────────────────────────────────
  {
    num:       '07',
    date:      'Dec 15 — Tuesday',
    city:      'Abisko',
    title:     'Aurora Sky Station · Abisko National Park',
    transport: 'Bus Kiruna → Abisko (SJ Norrtåg Bus 91) · 90 min · SEK 110 (≈₹880) · Or SJ train Kiruna C → Abisko Turiststation · 1h · SEK 130 (≈₹1,040)',
    places: [
      {
        name:        'Abisko National Park — Frozen Lake Walk',
        time:        '11:30 AM',
        description: 'Abisko National Park sits at the western end of Lake Torneträsk — a 70km-long Arctic lake that freezes solid in December. The national park encompasses birch forest, open tundra, and the valley carved by the Abiskojåkka river. The daylight window here in mid-December is approximately 10:30 AM–1:00 PM — two and a half hours of cold blue-gold light in which the snow surface on the frozen lake becomes a field of crushed diamonds. The Kungsleden (King\'s Trail) begins at Abisko Turiststation; even 2–3km on it in snowshoes through the birch forest is transformative, a walking silence unlike anywhere more temperate.',
        images: [
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518715303843-586e350061c1?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Walk from Abisko Turiststation (the SJ train/bus stop) into the park · 5 min to trailhead',
        cost:        0,
        tip:         'Snowshoe rental is available at Abisko Turiststation (SEK 150/₹1,200 for the day). The Kungsleden trail is marked and maintained even in winter; the first 2km to the canyon viewpoint is excellent on snowshoes. Animal tracks in the snow — reindeer, Arctic fox, ptarmigan — are everywhere once you leave the station. Dress for -25°C; the open lake creates wind exposure.',
      },
      {
        name:        'Aurora Sky Station',
        time:        '9:00 PM',
        description: 'The single best Northern Lights viewing location in the world that can be reached without mountaineering skills — the Aurora Sky Station at the top of Nuolja Mountain (900m) above Abisko is accessible by chairlift and exploits a unique microclimate: Lake Torneträsk creates a localised clearing effect that keeps the sky above Abisko statistically clearer than the surrounding mountains. On the platform at 900m, you stand above low cloud, with the full Arctic sky overhead and the Milky Way visible between aurora displays. On Kp 3+ nights — common in December — the lights are overhead and all-sky, shifting curtains of green and occasional violet, moving too fast to seem like natural phenomenon.',
        images: [
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518715303843-586e350061c1?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Chairlift from Abisko Turiststation · Included in Aurora Sky Station ticket · Runs 9 PM–midnight (weather dependent)',
        cost:        8000,
        tip:         'Book 3–4 months ahead at auroraskystation.se — December slots sell out. Hot drinks are included at the summit station. Dress for -30°C at altitude: the wind chill above the treeline is significant even on calm nights. Camera: ISO 1600–3200, f/2.8, 6 seconds, tripod mandatory. The guide explains aurora physics and gives real-time commentary on the Kp index and what the lights are doing.',
      },
    ],
    food:    ['Abisko Turiststation mountain restaurant for lunch: hearty Arctic soup and rye bread during the daylight window', 'Aurora Sky Station: hot chocolate and glögg included at the summit station during the tour'],
    stay:    'STF Abisko Turiststation, Abisko National Park, 981 07 Abisko',
    nextDay: 'Early departure — bus/train Abisko → Kiruna → fly to Stockholm ARN → onward to BLR',
  },

  // ─── Day 8 — Departure ───────────────────────────────────────────────────────
  {
    num:       '08',
    date:      'Dec 16 — Wednesday',
    city:      'Stockholm',
    title:     'Final Aurora Watch · Kiruna → Stockholm → Depart',
    transport: 'Bus/train Abisko → Kiruna C (90 min) · Flight Kiruna KRN → Stockholm ARN (1h 30 min) · ARN → BLR via Gulf hub (evening departure)',
    places: [
      {
        name:        'Pre-Dawn Aurora Watch — Abisko',
        time:        '4:00 AM',
        description: 'A final opportunity to see the Northern Lights before departure — 4 AM in Abisko on a December night is absolute darkness and, if the Kp index is 3+, often the peak of aurora activity. Step outside the Turiststation door and look up. The advantage of staying on-site at the national park mountain station is that the lights are directly overhead, with no light pollution, no minibus transfer required, and no one else around. This predawn watch — standing alone on Arctic snow at -20°C watching green light move across the Milky Way — is the experience that defines the whole trip.',
        images: [
          'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1508193638397-1cc4ff75af77?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Step outside Abisko Turiststation · No transfer needed',
        cost:        0,
        tip:         'Set two alarms: 3:45 AM and 4:15 AM. Check SpaceWeatherLive before sleeping — if Kp is 3+ and cloud cover is under 30%, get up without question. Dress fully before leaving the building: full Arctic kit in under 2 minutes. Camera is pre-set from last night: ISO 1600, f/2.8, 6s, tripod ready. This is worth the early morning with near-certainty in December.',
      },
      {
        name:        'Östermalm Saluhall — Final Stockholm Walk',
        time:        '2:30 PM',
        description: 'Stockholm\'s most elegant covered market hall (1888) on Östermalmstorg — a neo-Renaissance red-brick building with wrought iron galleries where the city\'s finest food vendors have operated continuously for over 130 years. Artisan cheese counters, smoked fish, hand-cured charcuterie, fresh lingonberries in December, and the most expensive gravlax in Sweden. On a final Stockholm afternoon with a few hours before the departure airport, a slow walk through the stalls and a coffee at Lisa Elmqvist or one of the market cafés is an appropriately Swedish farewell.',
        images: [
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900&q=70&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=900&q=70&auto=format&fit=crop',
        ],
        transport:   'Tunnelbana T14 (Blue Line) → Östermalmstorg · 5 min from T-Centralen',
        cost:        0,
        tip:         'Buy Swedish edibles for gifts here rather than the airport: knäckebröd (rye crispbread), lingonberry jam in small jars, and Ahlgrens bilar (the beloved Swedish fish-shaped candies). All travel well in checked luggage. Market closes at 6 PM — allow 1 hour minimum and plan airport transfer via Arlanda Express from T-Centralen (20 min to ARN).',
      },
    ],
    food:    ['Abisko Turiststation breakfast before the early bus', 'Östermalm Saluhall for final smörgås and coffee in Stockholm'],
    stay:    'Departure — Stockholm ARN → BLR via Doha / Dubai / Frankfurt · Long-haul evening departure',
    nextDay: null,
  },
]

export const TOTAL_PLACES = DAYS.reduce((s, d) => s + d.places.length, 0)
