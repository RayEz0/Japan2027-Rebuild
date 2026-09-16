/**
 * Offline Data Service — Travel Mode
 *
 * Manages serialisation of key trip data to localStorage so it's
 * available when there is no network connection.
 * Key: 'wt_offline_v1'
 */

const KEY   = 'wt_offline_v1'
const META  = 'wt_offline_meta_v1'

// ── Storage ───────────────────────────────────────────────────────────────────

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}
function save(d) { localStorage.setItem(KEY, JSON.stringify(d)) }

function meta() {
  try { return JSON.parse(localStorage.getItem(META) || '{}') } catch { return {} }
}
function saveMeta(m) { localStorage.setItem(META, JSON.stringify(m)) }

// ── Online / offline detection ────────────────────────────────────────────────

export function isOnline() { return navigator.onLine }

export function onConnectivityChange(fn) {
  const onOnline  = () => fn(true)
  const onOffline = () => fn(false)
  window.addEventListener('online',  onOnline)
  window.addEventListener('offline', onOffline)
  return () => {
    window.removeEventListener('online',  onOnline)
    window.removeEventListener('offline', onOffline)
  }
}

// ── Cached sections ───────────────────────────────────────────────────────────

export function getCachedSection(key) {
  return load()[key] || null
}

export function setCachedSection(key, data) {
  const db = load()
  db[key] = data
  save(db)
  saveMeta({ ...meta(), [key]: new Date().toISOString() })
}

export function getSectionTimestamp(key) {
  return meta()[key] || null
}

// ── Offline snapshot steps ────────────────────────────────────────────────────
// Each step returns a string label describing what was saved.

export async function runOfflineSnapshot(tripMeta, days, bookings, journalEntries) {
  const steps = []

  steps.push(await step('itinerary', () => {
    setCachedSection('itinerary', { tripId: tripMeta.id, days })
    return `${days.length} itinerary days`
  }))

  steps.push(await step('bookings', () => {
    setCachedSection('bookings', bookings)
    return `${bookings.length} bookings`
  }))

  steps.push(await step('journal', () => {
    setCachedSection('journal', journalEntries)
    return `${journalEntries.length} journal entries`
  }))

  steps.push(await step('tripMeta', () => {
    setCachedSection('tripMeta', tripMeta)
    return 'Trip metadata'
  }))

  steps.push(await step('currency', () => {
    const existing = getCachedSection('currency')
    if (!existing) {
      setCachedSection('currency', { base: 'JPY', target: 'INR', rate: 0.55, updatedAt: new Date().toISOString() })
    }
    return 'Currency rates'
  }))

  steps.push(await step('emergency', () => {
    // Emergency contacts are hardcoded — just mark as saved
    setCachedSection('emergency', { cachedAt: new Date().toISOString() })
    return 'Emergency contacts'
  }))

  saveMeta({ ...meta(), lastSnapshot: new Date().toISOString() })
  return steps
}

async function step(name, fn) {
  await new Promise(r => setTimeout(r, 180)) // simulate work
  try {
    const label = fn()
    return { name, label, ok: true }
  } catch (e) {
    return { name, label: e.message, ok: false }
  }
}

// ── Currency (offline) ────────────────────────────────────────────────────────

export function getCurrencyRate() {
  const data = getCachedSection('currency')
  return data || { base: 'JPY', target: 'INR', rate: 0.55 }
}

export function setCurrencyRate(rate) {
  setCachedSection('currency', {
    base: 'JPY', target: 'INR', rate,
    updatedAt: new Date().toISOString(),
  })
}

// ── Checklist (per-day, keyed by date string) ─────────────────────────────────

const CL_KEY = 'wt_checklist_v1'

export function getChecklist(dateKey) {
  try {
    const store = JSON.parse(localStorage.getItem(CL_KEY) || '{}')
    return store[dateKey] || {}
  } catch { return {} }
}

export function setChecklist(dateKey, data) {
  try {
    const store = JSON.parse(localStorage.getItem(CL_KEY) || '{}')
    store[dateKey] = data
    localStorage.setItem(CL_KEY, JSON.stringify(store))
  } catch { /* intentional */ }
}

// ── Snapshot status ───────────────────────────────────────────────────────────

export function getSnapshotStatus() {
  const m = meta()
  return {
    hasSnapshot:   !!m.lastSnapshot,
    lastSnapshot:  m.lastSnapshot  || null,
    sections: {
      itinerary: !!m.itinerary,
      bookings:  !!m.bookings,
      journal:   !!m.journal,
      currency:  !!m.currency,
      emergency: !!m.emergency,
    },
  }
}
