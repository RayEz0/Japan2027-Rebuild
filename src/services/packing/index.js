import { migrateStorage, scopedStorageKey, migrateToScopedKey } from '../../utils/storage'

/**
 * Returns a user+trip-scoped packing service.
 * Migration chain: jp27_packing_v1 -> japan2027_packing_v1 -> wt:guest:japan2027:packing
 */
export function createPackingService(tripId, userId) {
  migrateStorage(tripId, 'packing')
  migrateToScopedKey(tripId, 'packing')
  const key = scopedStorageKey(userId, tripId, 'packing')
  return {
    load()     { try { const p = JSON.parse(localStorage.getItem(key)); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {} } catch { return {}  } },
    save(data) { try { localStorage.setItem(key, JSON.stringify(data))     } catch { /* intentional */ } },
  }
}
