import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { scopedStorageKey, scopedGlobalKey } from '../utils/storage'

function buildStores(tripId, userId) {
  return {
    expenses:    { key: scopedStorageKey(userId, tripId, 'expenses'),    label: 'Expenses',     type: 'array'  },
    bookings:    { key: scopedStorageKey(userId, tripId, 'bookings'),    label: 'Bookings',     type: 'object' },
    places:      { key: scopedStorageKey(userId, tripId, 'places'),     label: 'Place Status', type: 'object' },
    savings:     { key: scopedGlobalKey(userId, 'savings'),              label: 'Savings',      type: 'object' },
    gifts:       { key: scopedStorageKey(userId, tripId, 'gifts'),       label: 'Gifts',        type: 'array'  },
    packing:     { key: scopedStorageKey(userId, tripId, 'packing'),     label: 'Packing',      type: 'object' },
    photos:      { key: scopedStorageKey(userId, tripId, 'photos'),      label: 'Photo Log',    type: 'array'  },
    journal:     { key: scopedGlobalKey(userId, 'journal'),              label: 'Journal',      type: 'array'  },
  }
}

export function useBackup() {
  const { user } = useAuth()
  const { activeTrip: trip } = useTravel()
  const tripId   = trip?.id || 'japan2027'
  const STORES   = buildStores(tripId, user?.id)

  function readStore(storageKey) {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return null
      return JSON.parse(raw)
    } catch { return null }
  }

  function createSnapshot() {
    const snap = {
      schemaVersion: 5,
      trip: tripId,
      createdAt: new Date().toISOString(),
      stores: {},
    }
    for (const [id, meta] of Object.entries(STORES)) {
      snap.stores[id] = readStore(meta.key)
    }
    return snap
  }

  function downloadBackup() {
    const snap = createSnapshot()
    const blob = new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `${tripId}-backup-${snap.createdAt.slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Keys that are not trip-scoped and can be restored from any trip's backup
  const GLOBAL_STORE_IDS = new Set(['journal', 'savings'])

  function restoreBackup(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const snap = JSON.parse(e.target.result)
          if (snap.trip !== tripId && !GLOBAL_STORE_IDS.size) {
            reject(new Error(`Not a ${tripId} backup file.`))
            return
          }
          let restored = 0
          const stores = snap.stores || {}
          for (const [id, meta] of Object.entries(STORES)) {
            // Trip-scoped stores: only restore when trip matches
            if (!GLOBAL_STORE_IDS.has(id) && snap.trip !== tripId) continue
            if (stores[id] != null) {
              localStorage.setItem(meta.key, JSON.stringify(stores[id]))
              restored++
            }
          }
          if (restored === 0 && snap.trip !== tripId) {
            reject(new Error(`Not a ${tripId} backup file.`))
            return
          }
          resolve({ restored, createdAt: snap.createdAt })
        } catch {
          reject(new Error('Failed to parse backup file.'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file.'))
      reader.readAsText(file)
    })
  }

  function checkIntegrity() {
    return Object.entries(STORES).map(([id, meta]) => {
      try {
        const raw = localStorage.getItem(meta.key)
        if (!raw) return { id, label: meta.label, status: 'empty', count: 0, sizeKB: 0 }
        const parsed = JSON.parse(raw)
        const count  = Array.isArray(parsed)
          ? parsed.length
          : typeof parsed === 'object' && parsed !== null
            ? Object.keys(parsed).length
            : 1
        const sizeKB = Math.round(raw.length / 102.4) / 10
        return { id, label: meta.label, status: 'ok', count, sizeKB }
      } catch {
        return { id, label: meta.label, status: 'corrupt', count: 0, sizeKB: 0 }
      }
    })
  }

  function resetStore(id) {
    const meta = STORES[id]
    if (meta) localStorage.removeItem(meta.key)
  }

  function resetAll() {
    for (const meta of Object.values(STORES)) {
      localStorage.removeItem(meta.key)
    }
  }

  return { downloadBackup, restoreBackup, checkIntegrity, resetStore, resetAll, STORES }
}
