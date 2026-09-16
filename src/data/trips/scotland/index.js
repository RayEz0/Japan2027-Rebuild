export const TRIP_META = {
  id:            'scotland',
  country:       'SC',
  title:         'Scotland',
  style:         'Solo',
  status:        'active',
  year:          2028,
  arcNo:         '02',
  duration:      8,
  departure:     '2028-10-15',
  return_:       '2028-10-22',
  budgetRange:   { min: 142500, max: 222500, currency: '₹' },
  budgetDisplay: '₹1.4L – ₹2.2L',
  route:         ['Edinburgh', 'Highlands', 'Isle of Skye'],
  routeFull:     'BLR → Edinburgh → Highlands → Isle of Skye → EDI',
  departureCity: 'Bengaluru',
  arrivalCity:   'Edinburgh (EDI)',
  exitCity:      'Edinburgh (EDI)',
  nights:        7,
  timezone:      'Europe/London',
  region:        'United Kingdom',

  accommodation: { types: ['TBD'], rateMin: 0, rateMax: 0, currency: '₹', notes: '' },

  camera: { devices: [], strategy: 'rental', days: 0, provider: null },

  sports: { basketball: null, cars: null },

  savingsGoal:     180000,
  savingsCurrency: '₹',

  heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=70&auto=format&fit=crop',
}

export const CITIES = [
  { name: 'Edinburgh',    nights: 3, color: '#E0E5DC', emoji: '🏰' },
  { name: 'Highlands',    nights: 3, color: '#DCE8DD', emoji: '🏔️' },
  { name: 'Isle of Skye', nights: 1, color: '#D8E4D8', emoji: '🌫️' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        7,
  daysInCountry: 8,
  plannedSpots:  20,
  mustDo: [
    'Edinburgh Castle',
    'Arthur\'s Seat Sunrise Hike',
    'Glencoe Valley Drive',
    'Ben Nevis Mountain Track',
    'Eilean Donan Castle',
    'Old Man of Storr',
    'Fairy Pools',
    'Talisker Distillery',
  ],
}
