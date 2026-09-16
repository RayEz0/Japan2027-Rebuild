/**
 * Canonical content page order, used for Previous / Next navigation.
 * Group pages by section so the nav stays within a logical flow.
 */

export const TRIP_PAGES = [
  { path: '/',           label: 'Dashboard' },
  { path: '/itinerary',  label: 'Itinerary' },
  { path: '/budget',     label: 'Budget' },
  { path: '/savings',    label: 'Savings' },
  { path: '/expenses',   label: 'Expenses' },
  { path: '/stays',      label: 'Stays' },
  { path: '/packing',    label: 'Packing' },
  { path: '/gifts',      label: 'Gifts' },
  { path: '/map',        label: 'Map' },
  { path: '/export',     label: 'Export' },
]

/** Return { prev, next, indexPath, indexLabel } for a given pathname. */
export function getPageNav(pathname) {
  // Trip pages
  const idx = TRIP_PAGES.findIndex(p => p.path === pathname)
  if (idx >= 0) {
    return {
      prev:       idx > 0                   ? TRIP_PAGES[idx - 1] : null,
      next:       idx < TRIP_PAGES.length - 1 ? TRIP_PAGES[idx + 1] : null,
      indexPath:  '/',
      indexLabel: 'Dashboard',
    }
  }
  return null
}
