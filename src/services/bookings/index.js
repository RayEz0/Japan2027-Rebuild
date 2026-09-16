import { migrateStorage, scopedStorageKey, migrateToScopedKey } from '../../utils/storage'

/**
 * Returns a user+trip-scoped booking service.
 * Migration chain: jp27_bookings_v1 -> japan2027_bookings_v1 -> wt:guest:japan2027:bookings
 */
export function createBookingService(tripId, userId) {
  migrateStorage(tripId, 'bookings')
  migrateToScopedKey(tripId, 'bookings')
  const key = scopedStorageKey(userId, tripId, 'bookings')
  return {
    load()     { try { const p = JSON.parse(localStorage.getItem(key)); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {} } catch { return {}  } },
    save(data) { try { localStorage.setItem(key, JSON.stringify(data))     } catch { /* intentional */ } },
  }
}
