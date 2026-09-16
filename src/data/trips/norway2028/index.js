export const TRIP_META = {
  id:            'norway2028',
  country:       'NO',
  title:         'Norway 2028',
  style:         'Solo',
  status:        'active',
  year:          2028,
  arcNo:         '02',
  duration:      10,
  departure:     '2028-06-01',
  return_:       '2028-06-10',
  budgetRange:   { min: 144500, max: 247500, currency: '₹' },
  budgetDisplay: '₹1.4L – ₹2.5L',
  route:         ['Oslo', 'Bergen', 'Fjords'],
  routeFull:     'BLR → Oslo → Bergen → Flåm → Geiranger → OSL',
  departureCity: 'Bengaluru',
  arrivalCity:   'Oslo (OSL)',
  exitCity:      'Oslo (OSL)',
  nights:        9,
  timezone:      'Europe/Oslo',
  region:        'Northern Europe',

  accommodation: {
    types:    ['Hostel', 'Budget Hotel'],
    rateMin:  2500,
    rateMax:  5000,
    currency: '₹',
    notes:    'Norway is expensive — hostels run NOK 300-400/night, book early for fjord villages',
  },

  camera: {
    devices: [
      { name: 'DJI Pocket 3',  type: 'pocket', notes: 'Gimbal stabilisation for fjord boat shots and road curves' },
      { name: 'Insta360 GO 3', type: 'action', notes: 'Magnetic mount for hiking and ferry rail mounting' },
    ],
    strategy: 'owned',
    days:     10,
    provider: null,
  },

  sports: { basketball: null, cars: null },

  savingsGoal:     200000,
  savingsCurrency: '₹',

  heroImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1400&q=70&auto=format&fit=crop',
}

export const CITIES = [
  { name: 'Oslo',   nights: 3, color: '#D8DCE4', emoji: '🏙️' },
  { name: 'Bergen', nights: 2, color: '#D4DCD8', emoji: '🌧️' },
  { name: 'Fjords', nights: 4, color: '#D0DCE0', emoji: '🏔️' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        9,
  daysInCountry: 10,
  plannedSpots:  25,
  mustDo: [
    'Nærøyfjord UNESCO Cruise',
    'Flåmsbana — Steepest Railway in the World',
    'Stegastein Viewpoint at Dawn',
    'Geirangerfjord — Seven Sisters Waterfall',
    'Trollstigen Serpentine Mountain Road',
    'Vigeland Sculpture Park at Sunrise',
    'Bryggen Wharf — Bergen Old Town',
    'Eagles Road (Ørnesvingen) Viewpoint',
  ],
}
