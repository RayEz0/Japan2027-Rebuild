/**
 * Trip-scoped localStorage utilities.
 * All data keys follow the pattern: ${tripId}_${store}_v1
 *
 * Migration: on first access for 'japan2027', the legacy jp27_* key is
 * copied to the new japan2027_* key. No data is ever deleted from the
 * legacy key — old builds continue working if the user rolls back.
 */

/**
 * Returns the namespaced localStorage key for a given trip and store.
 * store: short name without prefix/suffix, e.g. 'expenses', 'places', 'packing'
 */
export function tripStorageKey(tripId, store) {
  return `${tripId}_${store}_v1`
}

/**
 * One-time migration from jp27_* legacy keys to japan2027_* scoped keys.
 * Safe to call repeatedly — no-ops if new key already has data.
 * No-op for any tripId other than 'japan2027'.
 */
export function migrateStorage(tripId, store) {
  if (tripId !== 'japan2027') return
  const newKey    = tripStorageKey(tripId, store)
  const legacyKey = `jp27_${store}_v1`
  try {
    if (localStorage.getItem(newKey) !== null) return
    const legacy = localStorage.getItem(legacyKey)
    if (legacy !== null) localStorage.setItem(newKey, legacy)
  } catch { /* intentional */ }
}

/**
 * User + trip scoped localStorage key: wt:<userId|guest>:<tripId>:<feature>
 * Legacy (pre-userId) data has no owner on record, so it is always treated
 * as belonging to the 'guest' namespace — logged-in users get a fresh,
 * isolated key and are repopulated from Supabase (the source of truth).
 */
export function scopedStorageKey(userId, tripId, store) {
  return `wt:${userId || 'guest'}:${tripId}:${store}`
}

/** User-scoped, trip-agnostic key: wt:<userId|guest>:global:<feature> */
export function scopedGlobalKey(userId, store) {
  return `wt:${userId || 'guest'}:global:${store}`
}

/** User-scoped, arc-level key: wt:<userId|guest>:arc<year>:<feature> */
export function scopedArcKey(userId, arcYear, store) {
  return `wt:${userId || 'guest'}:arc${arcYear}:${store}`
}

/**
 * Copies data from a legacy key into a new key and deletes the legacy key
 * on success. No-ops if the new key already has data (so this only ever
 * runs once per key, however many times it's called).
 */
function migrateLegacyToKey(legacyKey, newKey) {
  try {
    if (localStorage.getItem(newKey) !== null) return
    const legacy = localStorage.getItem(legacyKey)
    if (legacy !== null) {
      localStorage.setItem(newKey, legacy)
      localStorage.removeItem(legacyKey)
    }
  } catch { /* intentional */ }
}

/**
 * One-time migration from the pre-Phase-2 trip-scoped key (${tripId}_${store}_v1)
 * into the new user+trip scoped key, under the 'guest' namespace.
 */
export function migrateToScopedKey(tripId, store) {
  migrateLegacyToKey(tripStorageKey(tripId, store), scopedStorageKey('guest', tripId, store))
}

/**
 * Same as migrateToScopedKey, but for trip-agnostic global keys
 * (e.g. legacy 'wtjournal_v1' -> wt:guest:global:journal).
 */
export function migrateGlobalToScopedKey(legacyKey, store) {
  migrateLegacyToKey(legacyKey, scopedGlobalKey('guest', store))
}

/**
 * Same as migrateToScopedKey, but for arc-level keys
 * (e.g. legacy 'arc_packing_2028' -> wt:guest:arc2028:packing_notes).
 */
export function migrateArcToScopedKey(legacyKey, arcYear, store) {
  migrateLegacyToKey(legacyKey, scopedArcKey('guest', arcYear, store))
}
