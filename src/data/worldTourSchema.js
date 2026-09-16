/**
 * WORLD TOUR EXPANSION SCHEMA
 * Defines the shared data contract for all future trip modules.
 * Adding a new country = creating a new folder under src/data/trips/<slug>/
 * and exporting an object conforming to TRIP_SCHEMA shape.
 */

// ── SUPPORTED COUNTRIES (World Tour · 9 Arcs · 2027–2035) ─
export const COUNTRIES = {
  // Arc 01 + 04 — Japan
  JP: { code: 'JP', name: 'Japan',        flag: '🇯🇵', accentColor: '#B8321A' },
  // Arc 02 — Scotland · Norway
  SC: { code: 'SC', name: 'Scotland',     flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', accentColor: '#003078' },
  NO: { code: 'NO', name: 'Norway',       flag: '🇳🇴', accentColor: '#003087' },
  // Arc 03 — Italy · Greece · Monaco
  IT: { code: 'IT', name: 'Italy',        flag: '🇮🇹', accentColor: '#009246' },
  GR: { code: 'GR', name: 'Greece',       flag: '🇬🇷', accentColor: '#0D5EAF' },
  MC: { code: 'MC', name: 'Monaco',       flag: '🇲🇨', accentColor: '#CE1126' },
  // Arc 05 — Western Europe
  FR: { code: 'FR', name: 'France',       flag: '🇫🇷', accentColor: '#002395' },
  DE: { code: 'DE', name: 'Germany',      flag: '🇩🇪', accentColor: '#1A1A1A' },
  LU: { code: 'LU', name: 'Luxembourg',   flag: '🇱🇺', accentColor: '#EF3340' },
  NL: { code: 'NL', name: 'Netherlands',  flag: '🇳🇱', accentColor: '#AE1C28' },
  // Arc 06 — Switzerland · Sweden
  CH: { code: 'CH', name: 'Switzerland',  flag: '🇨🇭', accentColor: '#CC0000' },
  SE: { code: 'SE', name: 'Sweden',       flag: '🇸🇪', accentColor: '#006AA7' },
  // Arc 07 — East Asia
  CN: { code: 'CN', name: 'China',        flag: '🇨🇳', accentColor: '#DE2910' },
  KR: { code: 'KR', name: 'South Korea',  flag: '🇰🇷', accentColor: '#003478' },
  // Arc 08 — New Zealand
  NZ: { code: 'NZ', name: 'New Zealand',  flag: '🇳🇿', accentColor: '#00247D' },
  // Arc 09 — USA · Portugal
  US: { code: 'US', name: 'USA',          flag: '🇺🇸', accentColor: '#3C3B6E' },
  PT: { code: 'PT', name: 'Portugal',     flag: '🇵🇹', accentColor: '#006600' },
  // Standalone planned
  TH: { code: 'TH', name: 'Thailand',    flag: '🇹🇭', accentColor: '#A51931' },
}

/**
 * TRIP_SCHEMA — shape every trip module must export as `tripMeta`
 *
 * tripMeta: {
 *   id:            string          'japan2027'
 *   country:       CountryCode     'JP'
 *   title:         string          'Japan 2027'
 *   style:         string          'Solo' | 'Group'
 *   duration:      number          11   (days)
 *   departure:     ISO string      '2027-11-23T06:00:00'
 *   return_:       ISO string      '2027-12-05T14:00:00'
 *   budgetRange:   { min, max, currency }
 *   route:         string[]        ['Tokyo', 'Mt Fuji', 'Kyoto', 'Nara', 'Osaka']
 *   departureCity: string          'Bengaluru'
 *   arrivalCity:   string          'Tokyo'
 *   exitCity:      string          'Osaka'
 *   nights:        number          12
 *   accommodation: {
 *     types:   string[]
 *     rateMin: number
 *     rateMax: number
 *     currency:string
 *   }
 *   camera:        CameraSetup
 *   sports: {
 *     basketball: BasketballMeta | null
 *     cars:       CarCultureMeta | null
 *   }
 * }
 */

// ── SPORT / CULTURE SCHEMAS ────────────────────────────

/**
 * BasketballMeta — added to a trip when basketball data exists
 * {
 *   courts: [{ name, location, type: 'indoor'|'outdoor', notes }]
 *   pickupRuns: [{ venue, day, level }]
 * }
 */

/**
 * CarCultureMeta — added to a trip when car culture data exists
 * {
 *   spots: [{ name, location, description, type: 'meet'|'drive'|'museum' }]
 *   experiences: [{ name, provider, cost, notes }]
 * }
 */

// ── CAMERA SETUP SCHEMA ────────────────────────────────
/**
 * CameraSetup: {
 *   devices:  [{ name, type: 'action'|'pocket'|'mirrorless', notes }]
 *   strategy: 'rental' | 'owned'
 *   days:     number
 *   provider: string | null
 * }
 */

// ── BOOKING ITEM SCHEMA ────────────────────────────────
/**
 * BookingItem: {
 *   id:        string (unique)
 *   label:     string
 *   category:  'document' | 'transport' | 'experience' | 'accommodation' | 'gear' | 'setup'
 *   window:    { start: 'YYYY-MM', end: 'YYYY-MM' }
 *   priority:  'critical' | 'high' | 'normal'
 *   notes:     string
 *   links:     string[]
 * }
 */

// ── SAVINGS VEHICLE SCHEMA ─────────────────────────────
/**
 * SavingsEntry: {
 *   cash: number
 *   fd:   number   (Fixed Deposit — future)
 *   mf:   number   (Mutual Fund  — future)
 * }
 * Stored per month key: 'Apr2026', 'May2026', ...
 */

// ── PLACE SCHEMA ──────────────────────────────────────────
/**
 * Place — canonical identity + geo record for a single location.
 * Narrative content (description prose, images[], tip) stays in itinerary.js.
 * Domain detail (hoops, surface, highway, cars[]) stays in basketball.js / cars.js.
 *
 * {
 *   id:            string   — globally unique: 'tokyo-shibuya-sky'
 *   slug:          string   — URL segment: 'shibuya-sky'
 *   name:          string   — display name
 *   city:          string   — 'Tokyo' | 'Mt Fuji' | 'Kyoto' | 'Nara' | 'Osaka' | 'Kobe'
 *   region:        string   — neighbourhood / area within city
 *   category:      string   — see PLACE_CATEGORIES below
 *   coordinates:   { lat: number, lng: number }
 *   address:       string   — English-romanised street address
 *   tripDay:       string | null  — '01'–'13' matching itinerary.js day num, or null
 *   sourceId:      string | null  — id from basketball.js or cars.js for linked detail
 *   priority:      'must' | 'high' | 'optional'
 *   tags:          string[]
 *   description:   string   — 1-sentence summary (NOT copied from itinerary)
 *   estimatedCost: number | null  — entry cost in ¥ (0 = free, null = variable)
 *   bookingRequired: boolean
 *   openingHours:  string
 *   mapsUrl:       string
 *   website:       string
 *   image:         string   — single primary thumbnail URL
 * }
 */

export const PLACE_CATEGORIES = [
  'landmark',
  'shrine',
  'temple',
  'market',
  'park',
  'garden',
  'nature',
  'shopping',
  'food',
  'coffee',
  'cafe',           // dedicated specialty cafe (distinct from generic coffee)
  'nightlife',
  'entertainment',
  'sports',
  'car-culture',
  'street',
  'photography',    // viewpoints, golden-hour spots, instagrammable locations
  'accommodation',  // hotels, hostels, capsule, ryokan — for places/stays overlap
]

export const SAVINGS_VEHICLES = {
  cash: { label: 'Cash / Bank',     color: '#0C0C0C' },
  fd:   { label: 'Fixed Deposit',   color: '#3A3A3A' },
  mf:   { label: 'Mutual Fund',     color: '#777777' },
}
