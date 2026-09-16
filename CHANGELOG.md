# Changelog

All notable changes to World Tour Platform are documented here.

---

## [1.0.0] — 2026-06-25

### Added

**Arc Content System (Phase 23–24)**
- `ARC_CONTENT` data layer covering all 9 arcs (Arc 01 Japan 2027 → Arc 09 USA+Portugal 2035)
- Each arc ships with: `itinerary`, `stays`, `bookings`, `packingNotes`, `giftIdeas`, `currencies`, `highlights`, `transport`, `notes`, `map`
- `ActiveArcContext` — single source of truth for the active arc; persists to `localStorage`; sets `--accent` CSS variable per arc
- `ArcTransitionOverlay` — fullscreen cinematic overlay on arc switch with hero image, arc title, tagline, country pills, animated progress bar

**Budget Page (Arc-aware)**
- Uses `arc.budgetRange` (min/max) as primary source for all 9 arcs
- Min / Target / Max stat cards
- 7-category proportional breakdown: Flights 30 %, Accommodation 25 %, Food 20 %, Local Transport 12 %, Activities 7 %, Shopping 4 %, Emergency 2 %
- Legacy detailed line-items shown when available (Japan / Scotland / Norway)

**Expenses Page (Arc-aware)**
- `derivePlannedFromBudget()` — derives 7 expense-category limits from `arc.budgetRange.max` when legacy data is absent
- Day count is read from `arc.duration` string — works for all arc lengths
- Daily chart adapts to arc duration (e.g. 18 days for Japan, 24 days for Scotland+Norway)

**Export Page (Arc-aware, 10 sections)**
1. Trip Overview — arc meta, currencies table, planning notes
2. Budget Summary — min/target/max table, 7-category breakdown
3. Itinerary — day-by-day city/nights/highlights table
4. Stays — grouped by country
5. Bookings — with live booking status from `useBookings()`
6. Packing — live item-level state (legacy) or arc packing notes
7. Gift Ideas — per-country item / where-to-buy table
8. Expenses — logged entries + category breakdown
9. Data Backup — JSON export of all local data
10. Integrity Check — arc content completeness report

**World Tour Platform**
- `WorldTour` admin page — arc grid with status, budget, duration
- `WorldTourDestination` — per-arc detail page
- `ArcPage` — arc dashboard with full content sections
- `TripSwitcher` — switch active arc from sidebar footer

**Design System**
- CSS tokens: `--paper`, `--ink`, `--ink2`–`4`, `--surf`, `--accent`, `--border`, `--ease`, `--ease-out`, `--ease-in`
- Typography: Fraunces (headings), Outfit (body), JetBrains Mono (labels/metadata)
- No border-radius anywhere — all elements are sharp rectangles
- `--page-pad` responsive padding variable (`52px` → `20px` → `16px`)
- Button utility classes: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-danger`
- Card utilities: `.card`, `.card-strong`, `.card-hover`
- Stagger animation classes: `.anim-in`, `.anim-in-1` – `.anim-in-4`
- Focus rings via `:focus-visible` for accessibility
- Shimmer skeleton class: `.skeleton`
- Table scroll wrapper: `.tbl-scroll`

**Sidebar**
- Arc monogram badge shows active arc accent color
- "Tools" section with Budget and Export navigation items
- Desktop collapse toggle with localStorage persistence
- Mobile drawer with hardware-accelerated transform

**Dashboard**
- Status ribbon: date / days-to-depart / packing count / savings total / sync status
- Savings progress bar in Budget Summary section
- Currency cards with hover state
- `CurrencyCard` component extracted for hover interactivity

**ArcTransition Cinematic Upgrade**
- Per-arc taglines (e.g. Japan: "From neon streets to ancient temples.")
- Staggered text entry: arc number → title → separator → tagline → countries
- Ken Burns effect on hero image (subtle scale-down)
- Accent-colored top stripe with scale-in animation
- Extended to 2100ms total (1700ms visible + 400ms fade)

### Changed
- `Budget.jsx` — fully rewritten to use Arc Content System
- `Export.jsx` — fully rewritten with 10 arc-aware print sections
- `Expenses.jsx` — arc-aware `plannedByCategory` and dynamic day count
- `ArcTransitionOverlay.jsx` — cinematic upgrade with taglines and animated text entry
- `Sidebar.jsx` — added Budget/Export tools section, arc-colored monogram
- `Dashboard.jsx` — savings progress bar, currency card hover states, removed unused `remaining` destructure
- `index.css` — major expansion: focus rings, button utilities, card hover, stagger animations, responsive `--page-pad`, print rules

### Fixed
- Expenses page showed empty planned budget for arcs 03–09 (no legacy data)
- Budget page showed ₹0 for all arcs except Japan/Scotland/Norway
- Export page used `useTrip()` which returns empty data for non-Japan arcs
- Daily chart was hardcoded to 13 days regardless of arc duration

---

## [0.2.0] — Phase 8A (prior)

- Places identity layer with `usePlaceStatus` and per-place booking/packing states
- Booking timeline with drag-to-reorder
- Packing system with per-arc localStorage persistence
- Map page with OSRM route geometry

## [0.1.0] — Initial

- Vite + React 19 + Tailwind CSS foundation
- Supabase auth
- Japan 2027 trip data (days, places, budget, bookings)
