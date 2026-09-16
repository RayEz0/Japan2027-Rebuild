# World Tour Platform — v1.0.0 Release Notes

**Release date:** 25 June 2026  
**Codename:** World Tour v1

---

## What's new in v1.0.0

### Arc Content System — all 9 trips work

Previously, only Japan 2027 (and partially Scotland+Norway) had real data. All other arcs showed empty budgets, blank packing lists, and broken export pages.

v1.0.0 ships a complete content layer for every arc:

| Arc | Title | Year | Status |
|-----|-------|------|--------|
| 01  | Japan | 2027 | Planning |
| 02  | Scotland + Norway | 2028 | Planning |
| 03  | Italy + Greece | 2029 | Future |
| 04  | Snow Japan | 2030 | Future |
| 05  | Western Europe | 2031 | Future |
| 06  | Switzerland + Sweden | 2032 | Future |
| 07  | China + Korea | 2033 | Future |
| 08  | New Zealand | 2034 | Future |
| 09  | USA + Portugal | 2035 | Future |

Switch arcs via the TripSwitcher in the sidebar footer. The full cinematic transition plays on every switch.

---

### Budget — Min / Target / Max for every arc

Budget now reads from `arc.budgetRange` for every arc. You see:
- **Minimum** — budget travel estimate
- **Target** — comfortable spend (midpoint)
- **Maximum** — premium with splurge buffer

A 7-category proportional breakdown (Flights → Emergency) shows relative allocation as animated bars.

---

### Export — 10 print sections

The export page now prints a complete trip brief:
1. Trip Overview (arc meta, currencies, planning notes)
2. Budget Summary (min/target/max + category table)
3. Itinerary (day-by-day)
4. Stays
5. Bookings (with live status)
6. Packing (live checked state)
7. Gift Ideas
8. Expenses (logged entries)
9. Data Backup (JSON export)
10. Integrity Check

---

### Cinematic arc transitions

When you switch arcs, a fullscreen overlay plays:
- Hero image zooms in (Ken Burns)
- Accent-colored stripe sweeps across the top
- Arc number and year fade in
- Title slides up
- Tagline appears (e.g. "From neon streets to ancient temples.")
- Country codes appear as bordered pills
- Animated progress bar counts to completion

Each arc has its own accent color, hero image, and unique tagline.

---

### Design polish

- **Focus rings** — all interactive elements have visible keyboard focus indicators
- **Button system** — `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost` utility classes
- **Card hover** — currency cards and interactive cards have subtle border-color transitions
- **Savings progress bar** — appears in Dashboard Budget Summary when a savings goal is set
- **Sidebar monogram** — shows active arc accent color, transitions smoothly on arc switch
- **Budget + Export in sidebar** — added under a "Tools" section for direct navigation
- **Responsive padding** — `--page-pad` scales from 52px → 20px → 16px across breakpoints
- **Stagger animations** — `.anim-in-1` through `.anim-in-4` for card entry sequences

---

## Known limitations

- Detailed expense category data (item-level) is only available for Japan / Scotland / Norway. Other arcs use proportional estimates from `arc.budgetRange`.
- Booking status sync requires Supabase authentication. Local-only users see static booking states.
- Map page OSRM route geometry only covers Japan 2027 waypoints.

---

## Upgrading

This is a ground-up rebuild — no migration needed. All data lives in:
- `src/data/worldTour/arcs.js` — arc registry
- `src/data/arcs/arc01.js` – `arc09.js` — arc content
- `localStorage` — packing state, expenses, savings, active arc preference
