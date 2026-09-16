/**
 * Japan 2027 — Booking Roadmap
 * Canonical list of booking tasks with their time windows.
 * Status (done/active/upcoming) is computed at runtime based on today's date.
 */

export const BOOKING_ITEMS = [
  {
    id:       'passport',
    label:    'Apply for Passport',
    category: 'document',
    window:   { start: '2026-06', end: '2026-07' },
    priority: 'critical',
    notes:    'Tatkal if needed. Required before visa application.',
  },
  {
    id:       'flights',
    label:    'Book Flights — BLR ↔ Japan',
    category: 'transport',
    window:   { start: '2027-01', end: '2027-02' },
    priority: 'critical',
    notes:    'Air India / JAL / IndiGo-codeshare. Book BLR→NRT, return KIX→BLR.',
  },
  {
    id:       'idp',
    label:    'International Driving Permit (IDP)',
    category: 'document',
    window:   { start: '2027-04', end: '2027-05' },
    priority: 'high',
    notes:    'AAI / AAAI issued. Required for Fuji car rental.',
  },
  {
    id:       'fuji-car',
    label:    'Fuji Car Rental',
    category: 'transport',
    window:   { start: '2027-05', end: '2027-05' },
    priority: 'high',
    notes:    'Times Car or Nippon Rent-a-Car. Shinjuku pickup, Kyoto Station drop.',
  },
  {
    id:       'usj',
    label:    'Universal Studios Japan (USJ)',
    category: 'experience',
    window:   { start: '2027-04', end: '2027-05' },
    priority: 'high',
    notes:    'Express Pass + Mario Kart ride booking. Opens 4 months ahead.',
  },
  {
    id:       'mario-kart',
    label:    'Mario Kart Booking (USJ)',
    category: 'experience',
    window:   { start: '2027-05', end: '2027-06' },
    priority: 'high',
    notes:    'In-app reservation via Universal Japan app. Sells out instantly.',
  },
  {
    id:       'visa',
    label:    'Japan Tourist Visa',
    category: 'document',
    window:   { start: '2027-06', end: '2027-07' },
    priority: 'critical',
    notes:    'Japanese consulate Mumbai/Bengaluru. Usually 5 working days. Single-entry 90 days.',
  },
  {
    id:       'hotels',
    label:    'Book Accommodation',
    category: 'accommodation',
    window:   { start: '2027-06', end: '2027-08' },
    priority: 'high',
    notes:    'Shinjuku 6n + Kyoto Machiya 3n + Namba 3n. Mix of capsule + business hotels.',
  },
  {
    id:       'teamlab',
    label:    'teamLab Borderless Kyoto Tickets',
    category: 'experience',
    window:   { start: '2027-07', end: '2027-08' },
    priority: 'high',
    notes:    'Book online 2+ months ahead. Last time slot preferred.',
  },
  {
    id:       'setup',
    label:    'Final Setup — eSIM, Suica, Maps, Apps',
    category: 'setup',
    window:   { start: '2027-10', end: '2027-10' },
    priority: 'normal',
    notes:    'Airalo eSIM (15GB) · Suica card setup · Google Maps offline · Google Translate download',
  },
  {
    id:       'camera-rental',
    label:    'Camera Rental — Insta360 GO 3 + DJI Pocket 3',
    category: 'gear',
    window:   { start: '2027-10', end: '2027-11' },
    priority: 'normal',
    notes:    'Rentio.jp — 11-day rental plan. Confirm availability and ship-to-hotel option.',
  },
]

/** Compute status of a booking item against today's date */
export function getBookingStatus(item, completedIds = []) {
  if (completedIds.includes(item.id)) return 'done'

  const now   = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth() + 1 // 1-indexed

  const [sy, sm] = item.window.start.split('-').map(Number)
  const [ey, em] = item.window.end.split('-').map(Number)

  const afterStart  = year > sy || (year === sy && month >= sm)
  const beforeEnd   = year < ey || (year === ey && month <= em)

  if (afterStart && beforeEnd) return 'active'
  if (year > ey || (year === ey && month > em)) return 'overdue'
  return 'upcoming'
}

export function formatWindow(item) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const [sy, sm] = item.window.start.split('-').map(Number)
  const [ey, em] = item.window.end.split('-').map(Number)
  const startLabel = `${months[sm - 1]} ${sy}`
  const endLabel   = `${months[em - 1]} ${ey}`
  return sm === em && sy === ey ? startLabel : `${startLabel} – ${endLabel}`
}
