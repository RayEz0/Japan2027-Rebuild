/**
 * CMS Storage Service — World Tour Admin Studio
 *
 * Interface-first design: all methods are synchronous today.
 * To migrate to Supabase, replace each implementation with an
 * async call to the Supabase client and await the callers.
 *
 * localStorage key: 'wtcms_v1'
 *
 * Schema:
 *   places:         { [placeId]: PlaceOverride }
 *   itinerary:      { [tripId]:  ItineraryDoc  }   — per individual trip
 *   budget:         { [tripId]:  BudgetDoc     }   — per individual trip
 *   contentBookings:{ [arcYear]: { items: BookingItem[] } } — per arc (ARC_CONTENT shape)
 *   packingNotes:   { [arcYear]: { categories: PackingCategory[] } } — per arc
 *   giftIdeas:      { [arcYear]: { countries: GiftCountry[] } } — per arc
 *   media:          { [url]:     MediaMeta     }
 *   _meta:          { version, lastExport }
 *
 * `bookings` (legacy, japan2027-only BOOKING_ITEMS schema) is kept for
 * backwards compatibility but is no longer the write target for the live
 * Bookings.jsx page — see contentBookings.
 */

const KEY = 'wtcms_v1'

// Bumped on every write. Consumers read this once per component mount (via
// useMemo deps) rather than subscribing — this app's live pages fully
// unmount/remount on navigation away from and back from Admin Studio, so a
// version bump only needs to make the *next* mount re-read; nothing needs
// to force a re-render of an already-mounted page.
let _version = 0
export function getCmsVersion() { return _version }

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '{}')
    return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {}
  } catch { return {} }
}

function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db))
  _version++
}

function ts() { return new Date().toISOString() }

// ── Places ────────────────────────────────────────────────────────────────────

export function getPlaceOverride(id) {
  return load().places?.[id] || null
}

export function getAllPlaceOverrides() {
  return load().places || {}
}

export function setPlaceOverride(id, data) {
  const db = load()
  db.places = {
    ...db.places,
    [id]: { ...data, _id: id, _updatedAt: ts(), _version: ((db.places?.[id]?._version || 0) + 1) },
  }
  save(db)
}

export function deletePlaceOverride(id) {
  const db = load()
  if (db.places) delete db.places[id]
  save(db)
}

// ── Itinerary ─────────────────────────────────────────────────────────────────

export function getItinerary(tripId) {
  return load().itinerary?.[tripId] || null
}

export function setItinerary(tripId, data) {
  const db = load()
  db.itinerary = { ...db.itinerary, [tripId]: { ...data, _updatedAt: ts() } }
  save(db)
}

// ── Budget ────────────────────────────────────────────────────────────────────

export function getBudget(tripId) {
  return load().budget?.[tripId] || null
}

export function setBudget(tripId, data) {
  const db = load()
  db.budget = { ...db.budget, [tripId]: { ...data, _updatedAt: ts() } }
  save(db)
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export function getBookings(tripId) {
  return load().bookings?.[tripId] || null
}

export function setBookings(tripId, data) {
  const db = load()
  db.bookings = { ...db.bookings, [tripId]: { ...data, _updatedAt: ts() } }
  save(db)
}

// ── Content Bookings (arc-scoped — overrides content.bookings from ARC_CONTENT) ─

export function getContentBookings(arcYear) {
  return load().contentBookings?.[arcYear] || null
}

export function setContentBookings(arcYear, data) {
  const db = load()
  db.contentBookings = { ...db.contentBookings, [arcYear]: { ...data, _updatedAt: ts() } }
  save(db)
}

// ── Packing Notes (arc-scoped — overrides content.packingNotes) ─────────────────

export function getPackingNotesOverride(arcYear) {
  return load().packingNotes?.[arcYear] || null
}

export function setPackingNotesOverride(arcYear, data) {
  const db = load()
  db.packingNotes = { ...db.packingNotes, [arcYear]: { ...data, _updatedAt: ts() } }
  save(db)
}

// ── Gift Ideas (arc-scoped — overrides content.giftIdeas) ───────────────────────

export function getGiftIdeasOverride(arcYear) {
  return load().giftIdeas?.[arcYear] || null
}

export function setGiftIdeasOverride(arcYear, data) {
  const db = load()
  db.giftIdeas = { ...db.giftIdeas, [arcYear]: { ...data, _updatedAt: ts() } }
  save(db)
}

// ── Media metadata ────────────────────────────────────────────────────────────

export function getMediaMeta(url) {
  return load().media?.[url] || null
}

export function setMediaMeta(url, data) {
  const db = load()
  db.media = { ...db.media, [url]: { ...data, _updatedAt: ts() } }
  save(db)
}

export function getAllMedia() {
  return load().media || {}
}

// ── Import / Export ───────────────────────────────────────────────────────────

export function exportAll() {
  const db = load()
  db._meta = { ...db._meta, lastExport: ts(), version: 1 }
  save(db)
  return db
}

export function importAll(data) {
  save({ ...data, _meta: { ...(data._meta || {}), importedAt: ts() } })
}

export function clearAll() {
  localStorage.removeItem(KEY)
}

export function getMeta() {
  return load()._meta || {}
}

// ── Validation helpers ────────────────────────────────────────────────────────

export function runValidation(allPlaces, itineraryDays, nameMap) {
  const overrides = getAllPlaceOverrides()
  const issues = []

  for (const p of allPlaces) {
    const o = overrides[p.id] || {}
    const image = o.heroImage || p.heroImage || p.image || ''
    const coords = o.coordinates || p.coordinates

    if (!image) issues.push({ type: 'missing-image',  severity: 'warn',  placeId: p.id, label: p.name, msg: 'No hero image' })
    if (!coords?.lat || !coords?.lng) issues.push({ type: 'missing-coords', severity: 'warn', placeId: p.id, label: p.name, msg: 'No coordinates' })
    if (!p.city)    issues.push({ type: 'missing-city',   severity: 'warn',  placeId: p.id, label: p.name, msg: 'No city set' })
    if (!p.category) issues.push({ type: 'missing-cat',  severity: 'info',  placeId: p.id, label: p.name, msg: 'No category set' })
  }

  // Check itinerary place references
  if (nameMap) {
    for (const day of (itineraryDays || [])) {
      for (const activity of (day.places || [])) {
        if (!nameMap[activity.name]) {
          issues.push({ type: 'unlinked-itinerary', severity: 'info', label: activity.name, msg: `"${activity.name}" not in place index` })
        }
      }
    }
  }

  return issues
}
