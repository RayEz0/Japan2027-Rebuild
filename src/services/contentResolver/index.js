/**
 * Shared Content Resolver — World Tour CMS Override Layer
 *
 * Every content lookup in the app follows the same order:
 *   CMS override -> bundled src/data -> safe empty state
 *
 * This is the ONLY place that implements that merge logic. Pages and hooks
 * must call one of these functions rather than reading src/services/cms
 * directly — that keeps fallback/merge behavior identical everywhere and
 * means a CMS schema change only has to be handled in one file.
 *
 * All functions here are pure (no React, no caching): callers memoize with
 * useMemo at the call site. Because every consuming page fully unmounts on
 * navigation away from Admin Studio and remounts on the way back, a plain
 * useMemo naturally re-reads the CMS on the next mount — no event bus or
 * cache-invalidation plumbing is needed for "live refresh after save".
 */

import * as cms from '../cms/index'

// ── Generic merge ────────────────────────────────────────────────────────────
//
// Merges a bundled array with a CMS override array matched by `key`.
// - Items present in both: override fields shallow-merged onto the bundled item.
// - Items only in bundled: pass through unchanged.
// - Items only in override: appended (lets CMS add wholly new entries).
// Never mutates inputs; never throws on missing/malformed override data.

export function mergeByKey(bundled, overrides, key = 'id') {
  if (!Array.isArray(bundled)) bundled = []
  if (!Array.isArray(overrides) || overrides.length === 0) return bundled

  const overrideMap = new Map(overrides.filter(o => o && o[key] != null).map(o => [o[key], o]))
  const merged = bundled.map(item => {
    const o = overrideMap.get(item[key])
    return o ? { ...item, ...o } : item
  })
  const bundledKeys = new Set(bundled.map(item => item[key]))
  const extra = overrides.filter(o => o && o[key] != null && !bundledKeys.has(o[key]))
  return [...merged, ...extra]
}

// ── Places (global, keyed by place.id) ───────────────────────────────────────

// Applies Media overrides (broken-image -> replacement URL) to whichever
// image fields a place actually has, without inventing fields it didn't have.
function withResolvedMedia(place) {
  if (!place) return place
  const next = { ...place }
  if (next.heroImage) next.heroImage = resolveMediaUrl(next.heroImage)
  if (next.image)     next.image     = resolveMediaUrl(next.image)
  if (Array.isArray(next.images)) next.images = next.images.map(resolveMediaUrl)
  return next
}

export function resolvePlace(place) {
  if (!place) return place
  try {
    const override = cms.getPlaceOverride(place.id)
    return withResolvedMedia(override ? { ...place, ...override } : place)
  } catch {
    return place
  }
}

export function resolvePlaces(places) {
  if (!Array.isArray(places)) return []
  let overrides
  try { overrides = cms.getAllPlaceOverrides() } catch { return places }
  if (!overrides || Object.keys(overrides).length === 0) return places.map(withResolvedMedia)
  return places.map(p => withResolvedMedia(overrides[p.id] ? { ...p, ...overrides[p.id] } : p))
}

// ── Media (global, keyed by URL) ─────────────────────────────────────────────

export function resolveMediaUrl(url) {
  if (!url) return url
  try {
    const meta = cms.getMediaMeta(url)
    return meta?.replacedBy || url
  } catch {
    return url
  }
}

// ── Itinerary (per-trip, useTripData `days` shape) ───────────────────────────
//
// CMS stores itinerary in AdminItinerary's editor shape (dayNo/activities);
// bundled DAYS uses (num/places). Days are matched by day number; within a
// matched day, only the fields the CMS editor actually exposes are merged —
// bundled-only fields (per-place `images`, day `nextDay`) always survive.

function mergeDayPlaces(bundledPlaces, cmsActivities) {
  if (!Array.isArray(cmsActivities) || cmsActivities.length === 0) return bundledPlaces || []
  return cmsActivities.map((a, i) => {
    const base = (bundledPlaces && bundledPlaces[i]) || {}
    return {
      ...base,
      time:        a.time        || base.time,
      name:        a.name        || base.name,
      description: a.description || base.description,
      cost:        a.cost        || base.cost,
      tip:         a.tip         || base.tip,
      transport:   a.transport   || base.transport,
    }
  })
}

function mergeDay(bundledDay, cmsDay) {
  return {
    ...bundledDay,
    date:      cmsDay.date      || bundledDay.date,
    city:      cmsDay.city      || bundledDay.city,
    title:     cmsDay.title     || bundledDay.title,
    transport: cmsDay.transport || bundledDay.transport,
    food:      cmsDay.food      || bundledDay.food,
    stay:      cmsDay.stay      || bundledDay.stay,
    places:    mergeDayPlaces(bundledDay.places, cmsDay.activities),
  }
}

export function resolveItineraryDays(tripId, bundledDays) {
  if (!Array.isArray(bundledDays)) return []
  let override
  try { override = cms.getItinerary(tripId) } catch { return bundledDays }
  if (!override?.days?.length) return bundledDays

  const cmsByDayNo = new Map(
    override.days
      .filter(d => d && d.dayNo != null)
      .map(d => [String(d.dayNo).padStart(2, '0'), d])
  )
  if (cmsByDayNo.size === 0) return bundledDays

  return bundledDays.map(day => {
    const cmsDay = cmsByDayNo.get(day.num)
    return cmsDay ? mergeDay(day, cmsDay) : day
  })
}

// ── Budget (per-trip, useTripData `budgetItems` shape) ───────────────────────

export function resolveBudgetItems(tripId, bundledItems) {
  let override
  try { override = cms.getBudget(tripId) } catch { return bundledItems }
  if (!override?.items?.length) return bundledItems || []
  return mergeByKey(bundledItems, override.items, 'id')
}

// ── Bookings (per-arc, content.bookings shape from ARC_CONTENT) ─────────────

export function resolveContentBookings(arcYear, bundledBookings) {
  let override
  try { override = cms.getContentBookings(arcYear) } catch { return bundledBookings }
  if (!override?.items?.length) return bundledBookings || []
  return mergeByKey(bundledBookings, override.items, 'id')
}

// ── Packing notes (per-arc, content.packingNotes shape) ─────────────────────
// Section-level override: a category present in CMS replaces that whole
// category's icon/items; categories not touched by CMS stay bundled.

export function resolvePackingNotes(arcYear, bundledNotes) {
  let override
  try { override = cms.getPackingNotesOverride(arcYear) } catch { return bundledNotes }
  if (!override?.categories?.length) return bundledNotes || []
  return mergeByKey(bundledNotes, override.categories, 'category')
}

// ── Gift ideas (per-arc, content.giftIdeas shape) ────────────────────────────
// Section-level override: a country present in CMS replaces that whole
// country's items; countries not touched by CMS stay bundled.

export function resolveGiftIdeas(arcYear, bundledGiftIdeas) {
  let override
  try { override = cms.getGiftIdeasOverride(arcYear) } catch { return bundledGiftIdeas }
  if (!override?.countries?.length) return bundledGiftIdeas || []
  return mergeByKey(bundledGiftIdeas, override.countries, 'country')
}
