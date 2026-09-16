/**
 * WORLD TOUR TRIP REGISTRY
 * 9 arcs · 17 countries · 2027–2035
 * Adding a new trip = create src/data/trips/<slug>/index.js
 * exporting TRIP_META, CITIES, QUICK_STATS, then register it here.
 */

// ── ACTIVE TRIPS (Arc 01–02) ────────────────────────────
import { TRIP_META as japan2027Meta,   CITIES as japan2027Cities,   QUICK_STATS as japan2027Stats   } from './japan2027/index'
import { TRIP_META as scotlandMeta,    CITIES as scotlandCities,    QUICK_STATS as scotlandStats    } from './scotland/index'
import { TRIP_META as norway2028Meta,  CITIES as norway2028Cities,  QUICK_STATS as norway2028Stats  } from './norway2028/index'

// ── ARC 03 — Italy · Greece (2029) ────────────────────
import { TRIP_META as italyMeta,       CITIES as italyCities,       QUICK_STATS as italyStats       } from './italy/index'
import { TRIP_META as greeceMeta,      CITIES as greeceCities,      QUICK_STATS as greeceStats      } from './greece/index'

// ── ARC 04 — Snow Japan (2030) ────────────────────────
import { TRIP_META as japan2030Meta,   CITIES as japan2030Cities,   QUICK_STATS as japan2030Stats   } from './japan2030/index'

// ── STANDALONE PLANNED — Thailand ─────────────────────
import { TRIP_META as thailandMeta,    CITIES as thailandCities,    QUICK_STATS as thailandStats    } from './thailand/index'

// ── ARC 05 — Western Europe (2031) ────────────────────
import { TRIP_META as franceMeta,      CITIES as franceCities,      QUICK_STATS as franceStats      } from './france/index'
import { TRIP_META as germanyMeta,     CITIES as germanyCities,     QUICK_STATS as germanyStats     } from './germany/index'
import { TRIP_META as luxembourgMeta,  CITIES as luxembourgCities,  QUICK_STATS as luxembourgStats  } from './luxembourg/index'
import { TRIP_META as netherlandsMeta, CITIES as netherlandsCities, QUICK_STATS as netherlandsStats } from './netherlands/index'

// ── ARC 06 — Switzerland · Sweden (2032) ──────────────
import { TRIP_META as switzerlandMeta, CITIES as switzerlandCities, QUICK_STATS as switzerlandStats } from './switzerland/index'
import { TRIP_META as swedenMeta,      CITIES as swedenCities,      QUICK_STATS as swedenStats      } from './sweden/index'

// ── ARC 07 — East Asia (2033) ─────────────────────────
import { TRIP_META as chinaMeta,       CITIES as chinaCities,       QUICK_STATS as chinaStats       } from './china/index'
import { TRIP_META as koreaMeta,       CITIES as koreaCities,       QUICK_STATS as koreaStats       } from './korea/index'

// ── ARC 08 — New Zealand (2034) ───────────────────────
import { TRIP_META as newzealandMeta,  CITIES as newzealandCities,  QUICK_STATS as newzealandStats  } from './newzealand/index'

// ── ARC 09 — USA · Portugal (2035) ───────────────────
import { TRIP_META as usaMeta,         CITIES as usaCities,         QUICK_STATS as usaStats         } from './usa/index'
import { TRIP_META as portugalMeta,    CITIES as portugalCities,    QUICK_STATS as portugalStats    } from './portugal/index'

import { COUNTRIES } from '../worldTourSchema'

function buildTrip(meta, cities, quickStats) {
  const country = COUNTRIES[meta.country] || {}
  return {
    ...meta,
    cities,
    quickStats,
    accentColor: country.accentColor || '#0C0C0C',
    flag:        country.flag        || '🌍',
  }
}

export const TRIPS = {
  // Arc 01
  japan2027:    buildTrip(japan2027Meta,   japan2027Cities,   japan2027Stats),
  // Arc 02
  scotland:     buildTrip(scotlandMeta,    scotlandCities,    scotlandStats),
  norway2028:   buildTrip(norway2028Meta,  norway2028Cities,  norway2028Stats),
  // Arc 03
  italy:        buildTrip(italyMeta,       italyCities,       italyStats),
  greece:       buildTrip(greeceMeta,      greeceCities,      greeceStats),
  // Arc 04
  japan2030:    buildTrip(japan2030Meta,   japan2030Cities,   japan2030Stats),
  // Standalone planned
  thailand:     buildTrip(thailandMeta,    thailandCities,    thailandStats),
  // Arc 05
  france:       buildTrip(franceMeta,      franceCities,      franceStats),
  germany:      buildTrip(germanyMeta,     germanyCities,     germanyStats),
  luxembourg:   buildTrip(luxembourgMeta,  luxembourgCities,  luxembourgStats),
  netherlands:  buildTrip(netherlandsMeta, netherlandsCities, netherlandsStats),
  // Arc 06
  switzerland:  buildTrip(switzerlandMeta, switzerlandCities, switzerlandStats),
  sweden:       buildTrip(swedenMeta,      swedenCities,      swedenStats),
  // Arc 07
  china:        buildTrip(chinaMeta,       chinaCities,       chinaStats),
  korea:        buildTrip(koreaMeta,       koreaCities,       koreaStats),
  // Arc 08
  newzealand:   buildTrip(newzealandMeta,  newzealandCities,  newzealandStats),
  // Arc 09
  usa:          buildTrip(usaMeta,         usaCities,         usaStats),
  portugal:     buildTrip(portugalMeta,    portugalCities,    portugalStats),
}

export const TRIP_LIST = Object.values(TRIPS)
