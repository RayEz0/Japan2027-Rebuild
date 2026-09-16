#!/usr/bin/env node
/* global process */
/**
 * Trip data validator
 * Scans every registered trip folder and verifies schema completeness.
 * Usage: node scripts/validateTripData.js
 * Exit code 0 = pass, 1 = failures found.
 */

import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = resolve(__dirname, '..')
const TRIPS_DIR = resolve(ROOT, 'src/data/trips')

// Trips registered in TripDataContext — must match fetchTripData() exactly
const REGISTERED_TRIPS = [
  'japan2027', 'scotland', 'norway2028', 'korea', 'italy',
  'greece', 'france', 'china', 'newzealand', 'sweden', 'germany',
  'japan2030', 'thailand', 'switzerland', 'usa', 'portugal',
]
// NOTE: 'luxembourg' and 'netherlands' are intentionally excluded — they have
// no itinerary/budget/stays/packing/bookingRoadmap files or fetchTripData()
// branch yet (see Phase 5 audit). Add them here once that content exists.

const REQUIRED_FILES = [
  'itinerary.js', 'budget.js', 'stays.js', 'packing.js', 'bookingRoadmap.js',
]

// Required exports per file
const REQUIRED_EXPORTS = {
  'itinerary.js':      ['DAYS', 'TOTAL_PLACES'],
  'budget.js':         ['BUDGET_ITEMS', 'BUDGET_TOTAL', 'BUDGET_CATEGORIES', 'PLANNED_BY_CATEGORY'],
  'stays.js':          ['STAYS'],
  'packing.js':        ['PACKING_CATEGORIES', 'TOTAL_ITEMS'],
  'bookingRoadmap.js': ['BOOKING_ITEMS'],
}

// Trip-specific booking ID prefixes (must be applied to ALL items)
const BOOKING_ID_PREFIXES = {
  greece: 'greece-',
}

// Allowed booking categories per trip (null = any category accepted)
const BOOKING_CATEGORIES = {
  greece: ['flights', 'accommodation', 'ferries', 'attractions', 'transport', 'insurance', 'packing', 'final checks'],
}

const errors   = []
const warnings = []

function fail(msg)  { errors.push(`  ✗ ${msg}`) }
function warn(msg)  { warnings.push(`  ⚠ ${msg}`) }
function pass(msg)  { console.log(`  ✓ ${msg}`) }

// ── Per-trip validation ────────────────────────────────────────────────────

async function validateTrip(tripId) {
  console.log(`\n┌── ${tripId}`)
  const dir = resolve(TRIPS_DIR, tripId)

  // 1. Required files
  const presentFiles = REQUIRED_FILES.filter(f => existsSync(resolve(dir, f)))
  const missingFiles = REQUIRED_FILES.filter(f => !existsSync(resolve(dir, f)))
  if (missingFiles.length === 0) {
    pass('all 5 required files present')
  } else {
    missingFiles.forEach(f => fail(`${tripId}: missing file → ${f}`))
  }

  // 2. Per-file checks
  for (const file of presentFiles) {
    const filePath = resolve(dir, file)
    let mod
    try {
      mod = await import(pathToFileURL(filePath).href)
    } catch (e) {
      fail(`${tripId}/${file}: import failed — ${e.message}`)
      continue
    }

    // Required exports
    const required = REQUIRED_EXPORTS[file] || []
    const missingExports = required.filter(exp => !(exp in mod))
    if (missingExports.length > 0) {
      missingExports.forEach(exp => fail(`${tripId}/${file}: missing export → ${exp}`))
    }

    // ── itinerary.js ──────────────────────────────────────────────────────
    // TOTAL_PLACES is computed inline per-file (may exclude optional places) —
    // we verify it exists and is a positive number rather than re-deriving it.
    if (file === 'itinerary.js' && mod.DAYS && 'TOTAL_PLACES' in mod) {
      if (typeof mod.TOTAL_PLACES !== 'number' || mod.TOTAL_PLACES < 0)
        fail(`${tripId}/itinerary.js: TOTAL_PLACES must be a non-negative number, got ${mod.TOTAL_PLACES}`)
      else
        pass(`itinerary: ${mod.DAYS.length} days, TOTAL_PLACES = ${mod.TOTAL_PLACES}`)
    }

    // ── budget.js ─────────────────────────────────────────────────────────
    if (file === 'budget.js' && mod.BUDGET_ITEMS && mod.BUDGET_TOTAL) {
      const sumMin = mod.BUDGET_ITEMS.reduce((s, i) => s + (i.min || 0), 0)
      const sumMax = mod.BUDGET_ITEMS.reduce((s, i) => s + (i.max || 0), 0)
      if (mod.BUDGET_TOTAL.min !== sumMin)
        warn(`${tripId}/budget.js: BUDGET_TOTAL.min ${mod.BUDGET_TOTAL.min} ≠ item sum ${sumMin}`)
      if (mod.BUDGET_TOTAL.max !== sumMax)
        warn(`${tripId}/budget.js: BUDGET_TOTAL.max ${mod.BUDGET_TOTAL.max} ≠ item sum ${sumMax}`)

      const budgetIds = mod.BUDGET_ITEMS.map(i => i.id)
      const budgetDupes = budgetIds.filter((id, i) => budgetIds.indexOf(id) !== i)
      if (budgetDupes.length > 0)
        fail(`${tripId}/budget.js: duplicate IDs → ${budgetDupes.join(', ')}`)
      else
        pass(`budget: ${mod.BUDGET_ITEMS.length} items, no duplicate IDs`)
    }

    // ── stays.js ──────────────────────────────────────────────────────────
    if (file === 'stays.js' && mod.STAYS) {
      pass(`stays: ${mod.STAYS.length} entries`)
    }

    // ── packing.js ────────────────────────────────────────────────────────
    if (file === 'packing.js' && mod.PACKING_CATEGORIES && 'TOTAL_ITEMS' in mod) {
      const computed = mod.PACKING_CATEGORIES.reduce((s, c) => s + (Array.isArray(c.items) ? c.items.length : 0), 0)
      if (mod.TOTAL_ITEMS !== computed) {
        fail(`${tripId}/packing.js: TOTAL_ITEMS ${mod.TOTAL_ITEMS} ≠ computed ${computed}`)
      } else {
        pass(`packing: ${mod.PACKING_CATEGORIES.length} categories, TOTAL_ITEMS = ${mod.TOTAL_ITEMS}`)
      }
    }

    // ── bookingRoadmap.js ─────────────────────────────────────────────────
    if (file === 'bookingRoadmap.js' && mod.BOOKING_ITEMS) {
      const items = mod.BOOKING_ITEMS
      pass(`bookingRoadmap: ${items.length} items`)

      // Duplicate IDs
      const ids   = items.map(i => i.id)
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
      if (dupes.length > 0)
        fail(`${tripId}/bookingRoadmap.js: duplicate booking IDs → ${dupes.join(', ')}`)
      else
        pass('no duplicate booking IDs')

      // ID prefix check
      const expectedPrefix = BOOKING_ID_PREFIXES[tripId]
      if (expectedPrefix) {
        const badIds = ids.filter(id => !id.startsWith(expectedPrefix))
        if (badIds.length > 0)
          fail(`${tripId}/bookingRoadmap.js: IDs must start with "${expectedPrefix}" → ${badIds.join(', ')}`)
        else
          pass(`all booking IDs prefixed with "${expectedPrefix}"`)
      }

      // Category validation
      const allowedCategories = BOOKING_CATEGORIES[tripId]
      if (allowedCategories) {
        const usedCategories = [...new Set(items.map(i => i.category))]

        const invalidCats = usedCategories.filter(c => !allowedCategories.includes(c))
        if (invalidCats.length > 0)
          fail(`${tripId}/bookingRoadmap.js: invalid categories → ${invalidCats.join(', ')}`)

        const missingCats = allowedCategories.filter(c => !usedCategories.includes(c))
        if (missingCats.length > 0)
          fail(`${tripId}/bookingRoadmap.js: missing required categories → ${missingCats.join(', ')}`)

        if (invalidCats.length === 0 && missingCats.length === 0)
          pass(`all ${allowedCategories.length} required categories present: ${usedCategories.sort().join(', ')}`)
      }

      // Priority value check
      const validPriorities = new Set(['critical', 'high', 'medium', 'low', 'normal'])
      const badPriority = items.filter(i => !validPriorities.has(i.priority))
      if (badPriority.length > 0)
        warn(`${tripId}/bookingRoadmap.js: unexpected priority values → ${badPriority.map(i => `${i.id}="${i.priority}"`).join(', ')}`)

      // Window format check
      const badWindow = items.filter(i => !i.window?.start || !i.window?.end || !/^\d{4}-\d{2}$/.test(i.window.start) || !/^\d{4}-\d{2}$/.test(i.window.end))
      if (badWindow.length > 0)
        fail(`${tripId}/bookingRoadmap.js: malformed window (expected YYYY-MM) → ${badWindow.map(i => i.id).join(', ')}`)
    }
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Trip Data Validator')
  console.log(`  Checking ${REGISTERED_TRIPS.length} trips in TripDataContext`)
  console.log('═══════════════════════════════════════════════════')

  for (const tripId of REGISTERED_TRIPS) {
    await validateTrip(tripId)
  }

  console.log('\n═══════════════════════════════════════════════════')

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`)
    warnings.forEach(w => console.log(w))
  }

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`)
    errors.forEach(e => console.log(e))
    console.log('\n✗ Validation FAILED\n')
    process.exit(1)
  } else {
    console.log('\n✓ All trips passed validation\n')
    process.exit(0)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
