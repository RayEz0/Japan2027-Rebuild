/**
 * Global Place Database Index
 *
 * Exports:
 *   allPlaces          — flat array of all places (active trips only)
 *   placesByCity       — object keyed by city name
 *   placeMapById       — object keyed by place id (O(1) lookup)
 *   ITINERARY_NAME_MAP — maps exact itinerary.js place names → place ids
 *
 * Trip filtering: Japan places have no tripId field (defaults to 'japan2027' at service layer).
 *                 Other trips use tripId matching the trip registry IDs.
 *                 Filter locally via: allPlaces.filter(p => (p.tripId ?? 'japan2027') === tripId)
 *
 * Archived: England 2028 (london/oxford/lakeDistrict) place files remain on disk but are not
 *           imported here. See src/data/trips/archive/ for archived trip data.
 */

// ── Japan 2027 ────────────────────────────────────────────────────────────────
import { TOKYO_PLACES }        from './tokyo'
import { FUJI_PLACES }         from './fuji'
import { KYOTO_PLACES }        from './kyoto'
import { NARA_PLACES }         from './nara'
import { OSAKA_PLACES }        from './osaka'

// ── Scotland 2028 ─────────────────────────────────────────────────────────────
import { EDINBURGH_PLACES }    from './edinburgh'
import { HIGHLANDS_PLACES }    from './highlands'
import { SKYE_PLACES }         from './skye'
import { GLASGOW_PLACES }      from './glasgow'
import { LOCH_LOMOND_PLACES }  from './loch_lomond'

// ── Norway 2028 ───────────────────────────────────────────────────────────────
import { OSLO_PLACES }         from './oslo'
import { BERGEN_PLACES }       from './bergen'
import { FJORDS_PLACES }       from './fjords'
import { LOFOTEN_PLACES }      from './lofoten'
import { STAVANGER_PLACES }    from './stavanger'

// ── Italy ─────────────────────────────────────────────────────────────────────
import { ROME_PLACES }         from './rome'
import { FLORENCE_PLACES }     from './florence'
import { VENICE_PLACES }       from './venice'
import { AMALFI_PLACES }       from './amalfi'
import { MILAN_PLACES }        from './milan'

// ── Greece ────────────────────────────────────────────────────────────────────
import { ATHENS_PLACES }       from './athens'
import { SANTORINI_PLACES }    from './santorini'
import { MYKONOS_PLACES }      from './mykonos'

// ── France ────────────────────────────────────────────────────────────────────
import { PARIS_PLACES }        from './paris'
import { NICE_PLACES }         from './nice'

// ── Germany ───────────────────────────────────────────────────────────────────
import { BERLIN_PLACES }       from './berlin'
import { MUNICH_PLACES }       from './munich'

// ── Luxembourg ────────────────────────────────────────────────────────────────
import { LUXEMBOURG_PLACES }   from './luxembourg'

// ── Netherlands ───────────────────────────────────────────────────────────────
import { AMSTERDAM_PLACES }    from './amsterdam'

// ── Switzerland ───────────────────────────────────────────────────────────────
import { ZURICH_PLACES }       from './zurich'
import { INTERLAKEN_PLACES }   from './interlaken'
import { LUZERN_PLACES }       from './luzern'
import { ZERMATT_PLACES }      from './zermatt'

// ── Sweden ────────────────────────────────────────────────────────────────────
import { STOCKHOLM_PLACES }    from './stockholm'
import { GOTHENBURG_PLACES }   from './gothenburg'
import { LAPLAND_PLACES }      from './lapland'

// ── China ─────────────────────────────────────────────────────────────────────
import { BEIJING_PLACES }      from './beijing'
import { SHANGHAI_PLACES }     from './shanghai'
import { XIAN_PLACES }         from './xian'
import { GUILIN_PLACES }       from './guilin'

// ── Korea ─────────────────────────────────────────────────────────────────────
import { KOREA_SEOUL_PLACES }  from './korea_seoul'
import { KOREA_BUSAN_PLACES }  from './korea_busan'
import { KOREA_JEJU_PLACES }   from './korea_jeju'
import { KOREA_GYEONGJU_PLACES } from './korea_gyeongju'

// ── New Zealand ───────────────────────────────────────────────────────────────
import { AUCKLAND_PLACES }     from './auckland'
import { QUEENSTOWN_PLACES }   from './queenstown'
import { ROTORUA_PLACES }      from './rotorua'
import { MILFORD_PLACES }      from './milford'
import { NZ_WELLINGTON_PLACES } from './nz_wellington'

// ── USA ───────────────────────────────────────────────────────────────────────
import { NEWYORK_PLACES }      from './newyork'
import { LOSANGELES_PLACES }   from './losangeles'
import { SANFRANCISCO_PLACES } from './sanfrancisco'
import { LASVEGAS_PLACES }     from './lasvegas'
import { GRANDCANYON_PLACES }  from './grandcanyon'
import { CHICAGO_PLACES }      from './chicago'
import { MIAMI_PLACES }        from './miami'

// ── Portugal ──────────────────────────────────────────────────────────────────
import { LISBON_PLACES }       from './lisbon'
import { PORTO_PLACES }        from './porto'
import { SINTRA_PLACES }       from './sintra'

// ── FLAT LIST ─────────────────────────────────────────────────────────────────

export const allPlaces = [
  // Japan 2027
  ...TOKYO_PLACES,
  ...FUJI_PLACES,
  ...KYOTO_PLACES,
  ...NARA_PLACES,
  ...OSAKA_PLACES,
  // Scotland 2028
  ...EDINBURGH_PLACES,
  ...HIGHLANDS_PLACES,
  ...SKYE_PLACES,
  ...GLASGOW_PLACES,
  ...LOCH_LOMOND_PLACES,
  // Norway 2028
  ...OSLO_PLACES,
  ...BERGEN_PLACES,
  ...FJORDS_PLACES,
  ...LOFOTEN_PLACES,
  ...STAVANGER_PLACES,
  // Italy
  ...ROME_PLACES,
  ...FLORENCE_PLACES,
  ...VENICE_PLACES,
  ...AMALFI_PLACES,
  ...MILAN_PLACES,
  // Greece
  ...ATHENS_PLACES,
  ...SANTORINI_PLACES,
  ...MYKONOS_PLACES,
  // France
  ...PARIS_PLACES,
  ...NICE_PLACES,
  // Germany
  ...BERLIN_PLACES,
  ...MUNICH_PLACES,
  // Luxembourg
  ...LUXEMBOURG_PLACES,
  // Netherlands
  ...AMSTERDAM_PLACES,
  // Switzerland
  ...ZURICH_PLACES,
  ...INTERLAKEN_PLACES,
  ...LUZERN_PLACES,
  ...ZERMATT_PLACES,
  // Sweden
  ...STOCKHOLM_PLACES,
  ...GOTHENBURG_PLACES,
  ...LAPLAND_PLACES,
  // China
  ...BEIJING_PLACES,
  ...SHANGHAI_PLACES,
  ...XIAN_PLACES,
  ...GUILIN_PLACES,
  // Korea
  ...KOREA_SEOUL_PLACES,
  ...KOREA_BUSAN_PLACES,
  ...KOREA_JEJU_PLACES,
  ...KOREA_GYEONGJU_PLACES,
  // New Zealand
  ...AUCKLAND_PLACES,
  ...QUEENSTOWN_PLACES,
  ...ROTORUA_PLACES,
  ...MILFORD_PLACES,
  ...NZ_WELLINGTON_PLACES,
  // USA
  ...NEWYORK_PLACES,
  ...LOSANGELES_PLACES,
  ...SANFRANCISCO_PLACES,
  ...LASVEGAS_PLACES,
  ...GRANDCANYON_PLACES,
  ...CHICAGO_PLACES,
  ...MIAMI_PLACES,
  // Portugal
  ...LISBON_PLACES,
  ...PORTO_PLACES,
  ...SINTRA_PLACES,
]

// ── BY CITY ───────────────────────────────────────────────────────────────────

export const placesByCity = allPlaces.reduce((acc, place) => {
  const city = place.city
  if (!acc[city]) acc[city] = []
  acc[city].push(place)
  return acc
}, {})

// ── BY ID — O(1) lookup ───────────────────────────────────────────────────────

export const placeMapById = allPlaces.reduce((acc, place) => {
  acc[place.id] = place
  return acc
}, {})

// ── ITINERARY CROSS-REFERENCE ─────────────────────────────────────────────────
// Maps the exact `name` strings used in itinerary.js DAYS[].places[]
// to their place database id.

export const ITINERARY_NAME_MAP = {
  // ── Japan 2027 ────────────────────────────────────────────────────────────────

  // Day 01
  'Shinjuku Station Area':          'tokyo-shinjuku-area',
  'Omoide Yokocho':                 'tokyo-omoide-yokocho',
  'Golden Gai':                     'tokyo-golden-gai',

  // Day 02
  'Akihabara':                      'tokyo-akihabara',
  'Kanda Myojin Shrine':            'tokyo-kanda-myojin',
  'Adidas Shibuya + Daikanyama':    'tokyo-daikanyama',
  'Shimokitazawa':                  'tokyo-shimokitazawa',

  // Day 03
  'Sensoji Temple':                 'tokyo-sensoji',
  'Nakamise Street':                'tokyo-nakamise-street',
  'Tokyo Disneyland':               'tokyo-disneyland',

  // Day 04
  'Meiji Shrine':                   'tokyo-meiji-shrine',
  'Takeshita Street':               'tokyo-takeshita-street',
  'Shibuya Crossing':               'tokyo-shibuya-crossing',
  'Miyashita Park':                 'tokyo-miyashita-park',
  'Shibuya Sky':                    'tokyo-shibuya-sky',
  'Ochanomizu Bridge':              'tokyo-ochanomizu-bridge',

  // Day 05
  'Kiyosumi Teien Garden':          'tokyo-kiyosumi-teien',
  'Don Quijote Shinjuku':           'tokyo-don-quijote-shinjuku',
  'Omotesando Hills':               'tokyo-omotesando-hills',
  'Indoor Pickup Basketball':       'tokyo-bball-indoor',

  // Day 06
  'Shibuya Scramble Square':        'tokyo-shibuya-scramble-sq',
  'Full JDM / GTR Experience':      'tokyo-jdm-daikoku',

  // Day 07
  'Lawson Kawaguchiko':             'fuji-lawson-spot',
  'Lake Kawaguchi':                 'fuji-lake-kawaguchi',
  'Oishi Park':                     'fuji-oishi-park',
  'Starbucks Kawaguchiko':          'fuji-starbucks-kawaguchiko',
  'Lake Yamanaka':                  'fuji-lake-yamanaka',
  'Honcho Street — Fujiyoshida':    'fuji-honcho-street',

  // Day 08
  'Gion Walk':                      'kyoto-gion',
  'Starbucks Ninenzaka':            'kyoto-starbucks-ninenzaka',
  'Nishiki Market':                 'kyoto-nishiki-market',
  'teamLab Borderless Kyoto':       'kyoto-teamlab-borderless',

  // Day 09
  'Fushimi Inari Taisha':           'kyoto-fushimi-inari',
  'Tofuku-ji Temple':               'kyoto-tofukuji',

  // Day 10
  'Adashino Bamboo Grove':          'kyoto-adashino-bamboo',
  '% Arabica Arashiyama':          'kyoto-arabica',
  'Kimono Forest':                  'kyoto-kimono-forest',

  // Day 11
  'Mount Wakakusa':                 'nara-mount-wakakusa',
  'Nara Deer Park':                 'nara-deer-park',
  'Nakatanidou':                    'nara-nakatanidou',
  'Suma Beach':                     'kobe-suma-beach',
  'Kobe Harborland Sunset':         'kobe-harborland',

  // Day 12
  'Osaka Castle Park':              'osaka-castle',
  'Amerikamura':                    'osaka-amerikamura',
  'Dotonbori Canal':                'osaka-dotonbori',
  'Shinsekai':                      'osaka-shinsekai',
  'Umeda Sky Building':             'osaka-umeda-sky',

  // Day 13
  'Loft Osaka — Stationery':        'osaka-loft',

  // ── Scotland 2028 ─────────────────────────────────────────────────────────────

  // Day 01 — Edinburgh
  'Royal Mile':                       'edinburgh-royal-mile',
  'Grassmarket':                      'edinburgh-grassmarket',

  // Day 02 — Edinburgh
  'Edinburgh Castle':                 'edinburgh-castle',
  'Calton Hill':                      'edinburgh-calton-hill',

  // Day 03 — Edinburgh
  "Arthur's Seat":                    'edinburgh-arthur-seat',
  'Greyfriars Kirkyard':              'edinburgh-greyfriars-kirkyard',
  'Scotch Whisky Experience':         'edinburgh-scotch-whisky-experience',

  // Day 04 — Highlands
  'Rannoch Moor':                     'highlands-rannoch-moor',
  'Glencoe':                          'highlands-glencoe',

  // Day 05 — Highlands
  'Ben Nevis':                        'highlands-ben-nevis',
  "Neptune's Staircase":              'highlands-neptunes-staircase',

  // Day 06 — Highlands
  'Eilean Donan Castle':              'highlands-eilean-donan',
  'Loch Ness':                        'highlands-loch-ness',

  // Day 07 — Isle of Skye
  'Old Man of Storr':                 'skye-old-man-of-storr',
  'Kilt Rock':                        'skye-kilt-rock',
  'Portree':                          'skye-portree',

  // Day 08 — Isle of Skye
  'Fairy Pools':                      'skye-fairy-pools',
  'Dunvegan Castle':                  'skye-dunvegan-castle',
  'Talisker Distillery':              'skye-talisker-distillery',

  // ── Norway 2028 ───────────────────────────────────────────────────────────────

  // Day 01 — Oslo
  'Oslo Opera House':                 'oslo-opera-house',
  'Aker Brygge':                      'oslo-aker-brygge',

  // Day 02 — Oslo
  'Vigeland Sculpture Park':          'oslo-vigeland-park',
  'Akershus Fortress':                'oslo-akershus-fortress',
  'MUNCH Museum':                     'oslo-munch-museum',
  'Karl Johans Gate':                 'oslo-karl-johans-gate',

  // Day 03 — Bergen
  'Bryggen Wharf':                    'bergen-bryggen',
  'Fish Market (Fisketorget)':        'bergen-fish-market',

  // Day 04 — Bergen
  'Fløibanen Funicular + Mt Fløyen':  'bergen-floibanen',
  'Troldhaugen':                      'bergen-troldhaugen',
  'Fantoft Stave Church':             'bergen-fantoft-stave-church',
  'Bergenhus Fortress':               'bergen-bergenhus-fortress',

  // Day 05 — Fjords
  'Flåmsbana (Flåm Railway)':         'fjords-flamsbana',
  'Nærøyfjord Cruise':                'fjords-naeroyfjord',

  // Day 06 — Fjords
  'Stegastein Viewpoint':             'fjords-stegastein',
  'Borgund Stave Church':             'fjords-borgund-stave-church',
  'Vøringsfossen':                    'fjords-voringsfossen',

  // Day 07 — Fjords
  'Geirangerfjord':                   'fjords-geirangerfjord',
  'Seven Sisters Waterfall':          'fjords-seven-sisters',

  // Day 08 — Fjords
  'Eagles Road (Ørnesvingen)':        'fjords-ornesvingen',
  'Dalsnibba Viewpoint':              'fjords-dalsnibba',
  'Trollstigen':                      'fjords-trollstigen',

  // Day 09 — Oslo return
  'Grünerløkka':                      'oslo-grunerloekka',

  // Day 10 — Oslo departure
  'Astrup Fearnley Museum':           'oslo-astrup-fearnley',
}

// ── BASKETBALL sourceId CROSS-REFERENCE ──────────────────────────────────────
// Maps basketball.js BASKETBALL_COURTS[].id → place database id

export const BBALL_SOURCE_MAP = {
  yoyogi:     'tokyo-bball-yoyogi',
  odaiba:     'tokyo-bball-odaiba',
  sumida:     'tokyo-bball-sumida',
  daikanyama: 'tokyo-bball-daikanyama',
  meijijingu: 'tokyo-bball-gaien',
}

// ── CAR SPOT sourceId CROSS-REFERENCE ────────────────────────────────────────
// Maps cars.js CAR_SPOTS[].id → place database id

export const CAR_SOURCE_MAP = {
  daikoku:         'tokyo-jdm-daikoku',
  umihotaru:       'tokyo-jdm-umihotaru',
  'shibuya-night': 'tokyo-jdm-shibuya-strip',
}
