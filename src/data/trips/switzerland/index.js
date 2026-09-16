export const TRIP_META = {
  id:            'switzerland',
  country:       'CH',
  title:         'Switzerland 2032',
  style:         'Solo',
  status:        'active',
  year:          2032,
  arcNo:         '06',
  heroImage:     'https://images.unsplash.com/photo-1531174993-04f4db35e7c1?w=1400&q=70&auto=format&fit=crop',
  theme:         'Peaks & Precision',
  countries:     ['CH'],
  pillars:       ['photography', 'nature', 'cafes', 'trains', 'architecture'],
  duration:      8,
  departure:     '2032-12-01',
  return_:       '2032-12-08',
  budgetRange:   { min: 420000, max: 720000, currency: '₹' },
  budgetDisplay: '₹4.2L – ₹7.2L',
  route:         ['Zurich', 'Lucerne', 'Interlaken', 'Grindelwald', 'Zermatt', 'Geneva'],
  routeFull:     'BLR → Zurich (ZRH) → Lucerne → Interlaken → Grindelwald → Zermatt → Geneva (GVA)',
  departureCity: 'Bengaluru',
  arrivalCity:   'Zurich (ZRH)',
  exitCity:      'Geneva (GVA)',
  nights:        7,
  timezone:      'Europe/Zurich',

  accommodation: { types: ['Mountain Lodge', 'Hostel', 'Hotel'], rateMin: 6000, rateMax: 12000, currency: '₹', notes: 'Switzerland is expensive — even hostels are ₹6,000+/night. Budget accordingly.' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Alpine vistas and blue hour mountain shots' }, { name: 'Insta360 GO 3', type: 'action', notes: 'Snow and adventure activities' }], strategy: 'rental', days: 8, provider: 'EU rental (TBC)' },
  sports:        { basketball: null, cars: null },

  savingsGoal:     700000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Zurich',       nights: 1, color: '#E0E8F0', emoji: '🏦' },
  { name: 'Lucerne',      nights: 2, color: '#D8E0EC', emoji: '🌉' },
  { name: 'Interlaken',   nights: 2, color: '#D8ECE8', emoji: '🏔️' },
  { name: 'Zermatt',      nights: 2, color: '#E0ECF0', emoji: '⛰️' },
  { name: 'Geneva',       nights: 0, color: '#D8E8F0', emoji: '⌚', note: 'Transfer day, departure' },
]

export const QUICK_STATS = {
  cities:        5,
  nights:        7,
  daysInCountry: 8,
  plannedSpots:  24,
  mustDo: [
    'Jungfraujoch Top of Europe (highest railway station in Europe)',
    'Matterhorn sunrise from Sunnegga viewpoint, Zermatt',
    'Gornergrat panoramic railway at 3,089m',
    'Chapel Bridge (Kapellbrücke) at blue hour, Lucerne',
    'Mount Pilatus cogwheel railway from Lucerne',
    'Zurich Bahnhofstrasse Christmas market',
    'Swiss cheese fondue in a mountain hut',
  ],
}
