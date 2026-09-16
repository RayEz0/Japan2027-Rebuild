import { scopedArcKey, migrateArcToScopedKey } from '../../utils/storage'

/**
 * Packing notes are arc-level content (e.g. one combined checklist for the
 * Scotland+Norway arc), so this is intentionally scoped per arc, not per
 * individual trip. Only user-scoping is new here (Phase 2): stops the
 * checklist leaking between accounts on a shared browser.
 * Migration: legacy 'arc_packing_<year>' -> wt:guest:arc<year>:packing_notes
 */
export function createPackingNotesService(arcYear, userId) {
  migrateArcToScopedKey(`arc_packing_${arcYear}`, arcYear, 'packing_notes')
  const key = scopedArcKey(userId, arcYear, 'packing_notes')
  return {
    load()     { try { const p = JSON.parse(localStorage.getItem(key)); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {} } catch { return {}  } },
    save(data) { try { localStorage.setItem(key, JSON.stringify(data))     } catch { /* intentional */ } },
  }
}
