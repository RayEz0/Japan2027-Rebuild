import { scopedGlobalKey, migrateGlobalToScopedKey } from '../../utils/storage'

/**
 * Savings is intentionally trip-agnostic — one running pot across every trip,
 * matching the Supabase `savings` table (no trip_id column). Only user-scoped,
 * never trip-scoped, so switching the active trip never changes the numbers.
 *
 * Migration: the only trip that ever had real savings data pre-Phase-2 was
 * japan2027 (the feature gates SAVING_MONTHS to that trip), so the legacy
 * japan2027_savings_v1 key is the sole source folded into the new global key.
 */
export function createSavingsService(userId) {
  migrateGlobalToScopedKey('japan2027_savings_v1', 'savings')
  const key = scopedGlobalKey(userId, 'savings')
  return {
    load()     { try { const p = JSON.parse(localStorage.getItem(key)); return (p && typeof p === 'object' && !Array.isArray(p)) ? p : {} } catch { return {}  } },
    save(data) { try { localStorage.setItem(key, JSON.stringify(data))     } catch { /* intentional */ } },
  }
}
