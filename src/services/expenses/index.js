import { migrateStorage, scopedStorageKey, migrateToScopedKey } from '../../utils/storage'

/**
 * Returns a user+trip-scoped expense service.
 * Migration chain: jp27_expenses_v1 -> japan2027_expenses_v1 -> wt:guest:japan2027:expenses
 */
export function createExpenseService(tripId, userId) {
  migrateStorage(tripId, 'expenses')
  migrateToScopedKey(tripId, 'expenses')
  const key = scopedStorageKey(userId, tripId, 'expenses')
  return {
    load()        { try { const p = JSON.parse(localStorage.getItem(key)); return Array.isArray(p) ? p : [] } catch { return []  } },
    save(entries) { try { localStorage.setItem(key, JSON.stringify(entries))  } catch { /* intentional */ } },
  }
}
