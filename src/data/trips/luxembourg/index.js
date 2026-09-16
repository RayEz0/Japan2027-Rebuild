export const TRIP_META = {
  id:            'luxembourg',
  country:       'LU',
  title:         'Luxembourg 2031',
  style:         'Solo',
  status:        'planned',
  year:          2031,
  arcNo:         '05',
  heroImage:     'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=70&auto=format&fit=crop',
  theme:         'The Quiet Grand Duchy',
  countries:     ['LU'],
  pillars:       ['photography', 'architecture', 'cafes'],
  duration:      0,
  departure:     null,
  return_:       null,
  budgetRange:   { min: 50000, max: 80000, currency: '₹' },
  budgetDisplay: '₹0.5L – ₹0.8L',
  route:         ['Luxembourg City'],
  routeFull:     'Germany → Luxembourg City → Netherlands',
  departureCity: 'Germany',
  arrivalCity:   'Luxembourg City',
  exitCity:      'Luxembourg City',
  nights:        0,
  timezone:      'Europe/Luxembourg',

  accommodation: { types: ['Hotel'], rateMin: 0, rateMax: 0, currency: '₹', notes: '' },
  camera:        { devices: [], strategy: 'rental', days: 0, provider: null },
  sports:        { basketball: null, cars: null },

  savingsGoal:     0,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Luxembourg City', nights: 0, color: '#E8D8D0', emoji: '🏰' },
]

export const QUICK_STATS = {
  cities:        1,
  nights:        0,
  daysInCountry: 0,
  plannedSpots:  0,
  mustDo:        [],
}
