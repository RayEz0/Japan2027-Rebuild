export const TRIP_META = {
  id:            'germany',
  country:       'DE',
  title:         'Germany 2031',
  style:         'Solo',
  status:        'active',
  year:          2031,
  arcNo:         '05',
  heroImage:     'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=70&auto=format&fit=crop',
  theme:         'Autobahn & Porsche',
  countries:     ['DE'],
  pillars:       ['car-culture', 'photography', 'architecture', 'food'],
  duration:      5,
  departure:     '2031-06-03',
  return_:       '2031-06-07',
  budgetRange:   { min: 120000, max: 200000, currency: '₹' },
  budgetDisplay: '₹1.2L – ₹2L',
  route:         ['Stuttgart', 'Black Forest', 'Neuschwanstein', 'Munich'],
  routeFull:     'France → Stuttgart → Black Forest → Neuschwanstein → Munich → Luxembourg',
  departureCity: 'France (TGV)',
  arrivalCity:   'Stuttgart',
  exitCity:      'Munich (MUC)',
  nights:        4,
  timezone:      'Europe/Berlin',

  accommodation: { types: ['Hostel', 'Hotel', 'Guesthouse'], rateMin: 2500, rateMax: 5500, currency: '₹', notes: 'Stuttgart hostel ₹2,500–₹3,500/n; Baden-Baden guesthouse ₹3,000–₹5,000/n; Munich Generator or Motel One ₹3,500–₹6,000/n' },
  camera:        { devices: [{ name: 'Sony A7C II', type: 'mirrorless', notes: 'Wide + telephoto for Neuschwanstein, car museums' }], strategy: 'own', days: 5, provider: null },
  sports:        { basketball: null, cars: { highlight: 'Porsche Museum + Mercedes-Benz Museum, Stuttgart' } },

  savingsGoal:     0,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Stuttgart',      nights: 1, color: '#E0D8D0', emoji: '🏎️' },
  { name: 'Black Forest',   nights: 1, color: '#D0E0D0', emoji: '🌲' },
  { name: 'Neuschwanstein', nights: 1, color: '#D8E0EC', emoji: '🏰', note: 'Stay in Füssen' },
  { name: 'Munich',         nights: 2, color: '#F0E8D8', emoji: '🍺' },
]

export const QUICK_STATS = {
  cities:        4,
  nights:        4,
  daysInCountry: 5,
  plannedSpots:  15,
  mustDo: [
    'Porsche Museum, Zuffenhausen — engineering pilgrimage',
    'Mercedes-Benz Museum, Bad Cannstatt — 9 floors, 160 vehicles',
    'Neuschwanstein Castle — book timed entry months ahead',
    'Triberg Waterfalls — Germany\'s highest at 163 m total',
    'Marienplatz Glockenspiel — 11 AM show, Munich',
    'Englischer Garten surf wave (Eisbach river bore)',
    'Viktualienmarkt picnic — best open-air market in Germany',
  ],
}
