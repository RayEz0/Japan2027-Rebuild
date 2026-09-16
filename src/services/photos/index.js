import { migrateStorage, scopedStorageKey, migrateToScopedKey } from '../../utils/storage'

export function createPhotoService(tripId, userId) {
  migrateStorage(tripId, 'photos')
  migrateToScopedKey(tripId, 'photos')
  const key = scopedStorageKey(userId, tripId, 'photos')
  return {
    load()        { try { const p = JSON.parse(localStorage.getItem(key)); return Array.isArray(p) ? p : [] } catch { return []  } },
    save(entries) { try { localStorage.setItem(key, JSON.stringify(entries))  } catch { /* intentional */ } },
  }
}
