/**
 * Seed script — upserts all local place data into the Supabase places table.
 *
 * Prerequisites:
 *   1. supabase/migrations/001_places_content.sql has been run
 *   2. supabase/migrations/003_trip_id_columns.sql has been run
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   node supabase/seed/seedPlaces.mjs
 *
 * Or add to package.json:
 *   "seed:places": "node supabase/seed/seedPlaces.mjs"
 *
 * Uses service_role key (bypasses RLS) — never expose this key client-side.
 * Safe to re-run: uses UPSERT (ON CONFLICT DO UPDATE) so existing rows are updated.
 *
 * Japan places: tripId defaults to 'japan2027' via the spread in placeService.
 * Scotland places: have explicit tripId: 'scotland' in their data files.
 * Norway places: have explicit tripId: 'norway2028' in their data files.
 */

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

// ── Resolve project root ──────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')

// ── Import place data from local files ────────────────────────────────────────
// Dynamic import so Node.js ESM resolves the paths correctly.
const { allPlaces } = await import(resolve(root, 'src/data/places/index.js'))

// ── Supabase client (service_role — bypasses RLS) ─────────────────────────────
const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('❌  SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.')
  console.error('    export SUPABASE_URL=https://your-project.supabase.co')
  console.error('    export SUPABASE_SERVICE_ROLE_KEY=eyJ...')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
})

// ── Transform JS place shape → DB row shape ───────────────────────────────────
// tripId defaults to 'japan2027' for legacy Japan places (no explicit tripId in data)
function toDbRow(place) {
  return {
    id:               place.id,
    slug:             place.slug             ?? place.id,
    name:             place.name,
    city:             place.city,
    region:           place.region           ?? null,
    country:          countryForTrip(place.tripId ?? 'japan2027'),
    category:         place.category,
    description:      place.description      ?? null,
    coordinates:      place.coordinates      ?? null,
    opening_hours:    place.openingHours      ?? null,
    estimated_cost:   place.estimatedCost    ?? 0,
    booking_required: place.bookingRequired  ?? false,
    maps_url:         place.mapsUrl          ?? null,
    website:          place.website          ?? null,
    image_url:        place.image            ?? null,
    priority:         place.priority         ?? 'optional',
    trip_day:         place.tripDay          ?? null,
    tags:             place.tags             ?? [],
    source_id:        place.sourceId         ?? null,
    trip_id:          place.tripId           ?? 'japan2027',
  }
}

function countryForTrip(tripId) {
  const map = {
    japan2027:  'Japan',
    scotland:   'Scotland',
    norway2028: 'Norway',
  }
  return map[tripId] ?? 'Unknown'
}

// ── Seed ──────────────────────────────────────────────────────────────────────
async function seed() {
  const rows = allPlaces.map(toDbRow)

  console.log(`\n🌍  Seeding ${rows.length} places to Supabase...`)
  console.log(`    Breakdown:`)

  const byTrip = rows.reduce((acc, r) => {
    acc[r.trip_id] = (acc[r.trip_id] ?? 0) + 1
    return acc
  }, {})
  for (const [tripId, count] of Object.entries(byTrip)) {
    console.log(`      ${tripId}: ${count} places`)
  }

  // Batch upsert in chunks of 50 to stay within Supabase limits
  const BATCH = 50
  let inserted = 0
  let errors   = 0

  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH)
    const { error } = await supabase
      .from('places')
      .upsert(chunk, { onConflict: 'id' })

    if (error) {
      console.error(`❌  Batch ${Math.floor(i / BATCH) + 1} failed:`, error.message)
      errors += chunk.length
    } else {
      inserted += chunk.length
      process.stdout.write(`    ✓ ${inserted}/${rows.length}\r`)
    }
  }

  console.log(`\n`)

  if (errors === 0) {
    console.log(`✅  All ${inserted} places seeded successfully.`)
    console.log(`\n    Next steps:`)
    console.log(`    1. Run migration 004 (place_status trip_id back-fill)`)
    console.log(`    2. Set VITE_PLACES_SOURCE=supabase in .env.local to test`)
    console.log(`    3. Verify Places page loads from Supabase in the app`)
    console.log(`    4. Restore VITE_PLACES_SOURCE=local before committing`)
  } else {
    console.error(`⚠️  ${errors} places failed. Check output above.`)
    process.exit(1)
  }
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
