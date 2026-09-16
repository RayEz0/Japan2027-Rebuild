export const TRIP_META = {
  id:            'netherlands',
  country:       'NL',
  title:         'Netherlands 2031',
  style:         'Solo',
  status:        'planned',
  year:          2031,
  arcNo:         '05',
  heroImage:     'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=70&auto=format&fit=crop',
  theme:         'Amsterdam Canals',
  countries:     ['NL'],
  pillars:       ['photography', 'cafes', 'architecture', 'street'],
  duration:      0,
  departure:     null,
  return_:       null,
  budgetRange:   { min: 80000, max: 150000, currency: '₹' },
  budgetDisplay: '₹0.8L – ₹1.5L',
  route:         ['Amsterdam'],
  routeFull:     'Luxembourg → Amsterdam (AMS) → AMS',
  departureCity: 'Luxembourg',
  arrivalCity:   'Amsterdam (AMS)',
  exitCity:      'Amsterdam (AMS)',
  nights:        0,
  timezone:      'Europe/Amsterdam',

  accommodation: { types: ['Canal Hotel', 'Hostel'], rateMin: 0, rateMax: 0, currency: '₹', notes: '' },
  camera:        { devices: [], strategy: 'rental', days: 0, provider: null },
  sports:        { basketball: null, cars: null },

  savingsGoal:     0,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Amsterdam', nights: 0, color: '#D0E0EC', emoji: '🚲' },
]

export const QUICK_STATS = {
  cities:        1,
  nights:        0,
  daysInCountry: 0,
  plannedSpots:  0,
  mustDo:        [],
}
