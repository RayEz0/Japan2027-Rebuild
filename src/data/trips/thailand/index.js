export const TRIP_META = {
  id:            'thailand',
  country:       'TH',
  title:         'Thailand',
  style:         'Solo',
  status:        'planned',
  year:          2030,
  duration:      0,
  departure:     null,
  return_:       null,
  budgetRange:   { min: 50000, max: 117500, currency: '₹' },
  budgetDisplay: '₹50k – ₹1.18L',
  route:         ['Bangkok', 'Chiang Mai', 'Phuket'],
  routeFull:     'BLR → Bangkok → Chiang Mai → Phuket → BKK',
  departureCity: 'Bengaluru',
  arrivalCity:   'Bangkok (BKK)',
  exitCity:      'Bangkok (BKK)',
  nights:        0,
  timezone:      'Asia/Bangkok',

  accommodation: { types: ['TBD'], rateMin: 0, rateMax: 0, currency: '₹', notes: '' },

  camera: { devices: [], strategy: 'rental', days: 0, provider: null },

  sports: { basketball: null, cars: null },

  savingsGoal:     0,
  savingsCurrency: '₹',

  heroImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1400&q=70&auto=format&fit=crop',
}

export const CITIES = [
  { name: 'Bangkok',    nights: 0, color: '#F5E8D0', emoji: '🏯' },
  { name: 'Chiang Mai', nights: 0, color: '#DCE8DD', emoji: '🌿' },
  { name: 'Phuket',     nights: 0, color: '#D0E8F5', emoji: '🌴' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        0,
  daysInCountry: 0,
  plannedSpots:  0,
  mustDo:        [],
}
