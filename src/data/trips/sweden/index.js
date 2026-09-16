export const TRIP_META = {
  id:            'sweden',
  country:       'SE',
  title:         'Sweden 2032',
  style:         'Solo',
  status:        'active',
  year:          2032,
  arcNo:         '06',
  heroImage:     'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1400&q=70&auto=format&fit=crop',
  theme:         'Aurora & Arctic',
  countries:     ['SE'],
  pillars:       ['photography', 'nature', 'cafes', 'trains'],
  duration:      8,
  departure:     '2032-12-09',
  return_:       '2032-12-16',
  budgetRange:   { min: 280000, max: 480000, currency: '₹' },
  budgetDisplay: '₹2.8L – ₹4.8L',
  route:         ['Stockholm', 'Gothenburg', 'Kiruna', 'Abisko'],
  routeFull:     'Geneva → Stockholm (ARN) → Gothenburg → Kiruna → Abisko → Stockholm (ARN) → BLR',
  departureCity: 'Geneva',
  arrivalCity:   'Stockholm (ARN)',
  exitCity:      'Stockholm (ARN)',
  nights:        7,
  timezone:      'Europe/Stockholm',

  accommodation: { types: ['Icehotel', 'Arctic Cabin', 'City Hotel'], rateMin: 3500, rateMax: 12000, currency: '₹', notes: 'Icehotel Jukkasjärvi premium (₹25,000+) or standard warm cabin; Stockholm budget hotel ₹5,000–₹8,000' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Aurora and Stockholm architecture' }, { name: 'Insta360 GO 3', type: 'action', notes: 'Dog sled and outdoor activities' }], strategy: 'rental', days: 8, provider: 'Stockholm camera rental (TBC)' },
  sports:        { basketball: null, cars: null },

  savingsGoal:     0,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Stockholm',  nights: 3, color: '#D8E0EC', emoji: '👑' },
  { name: 'Gothenburg', nights: 1, color: '#DCE8DC', emoji: '🚢' },
  { name: 'Kiruna',     nights: 2, color: '#D0DCE8', emoji: '🌌' },
  { name: 'Abisko',     nights: 1, color: '#C8D8E8', emoji: '🌠', note: 'Northern Lights base' },
]

export const QUICK_STATS = {
  cities:        4,
  nights:        7,
  daysInCountry: 8,
  plannedSpots:  23,
  mustDo: [
    'Northern Lights from Aurora Sky Station, Abisko (one of best spots on Earth)',
    'Icehotel Jukkasjärvi — sleep in an ice room (unique)',
    'Vasa Museum Stockholm (400-year-old warship, free)',
    'Gamla Stan Christmas market + glögg',
    'Dog sled through Lapland forest at dusk',
    'Fotografiska photography museum, Södermalm',
    'Gothenburg Haga fika district at dawn',
  ],
}
