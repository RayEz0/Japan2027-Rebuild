export const TRIP_META = {
  id:            'japan2030',
  country:       'JP',
  title:         'Snow Japan 2030',
  style:         'Solo',
  status:        'active',
  year:          2030,
  arcNo:         '04',
  heroImage:     'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1400&q=70&auto=format&fit=crop',
  theme:         'Powder & Onsen',
  countries:     ['JP'],
  pillars:       ['photography', 'nature', 'food', 'cafes', 'transport'],
  duration:      0,
  departure:     null,
  return_:       null,
  budgetRange:   { min: 350000, max: 500000, currency: '₹' },
  budgetDisplay: '₹3.5L – ₹5L',
  route:         ['Sapporo', 'Otaru', 'Lake Toya', 'Hakodate', 'Jozankei'],
  routeFull:     'BLR → Sapporo (CTS) → Otaru → Lake Toya → Hakodate → Jozankei → CTS',
  departureCity: 'Bengaluru',
  arrivalCity:   'Sapporo (CTS)',
  exitCity:      'Sapporo (CTS)',
  nights:        0,
  timezone:      'Asia/Tokyo',

  accommodation: { types: ['Ryokan', 'Ski Lodge'], rateMin: 0, rateMax: 0, currency: '₹', notes: '' },
  camera:        { devices: [], strategy: 'rental', days: 0, provider: null },
  sports:        { basketball: null, cars: null },

  savingsGoal:     300000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Sapporo',   nights: 0, color: '#D8E8F0', emoji: '❄️' },
  { name: 'Otaru',     nights: 0, color: '#E8EEF5', emoji: '🏔️' },
  { name: 'Lake Toya', nights: 0, color: '#D0DCE8', emoji: '🌋' },
  { name: 'Hakodate',  nights: 0, color: '#D8E0EC', emoji: '⭐' },
  { name: 'Jozankei',  nights: 0, color: '#D0E8E0', emoji: '♨️' },
]

export const QUICK_STATS = {
  cities:        5,
  nights:        0,
  daysInCountry: 0,
  plannedSpots:  0,
  mustDo:        [],
}
