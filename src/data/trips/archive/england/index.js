export const TRIP_META = {
  id:            'england',
  country:       'GB',
  title:         'England 2028',
  style:         'Solo',
  status:        'active',
  year:          2028,
  duration:      9,
  departure:     '2028-09-10',
  return_:       '2028-09-18',
  budgetRange:   { min: 122000, max: 220500, currency: '₹' },
  budgetDisplay: '₹1.2L – ₹2.2L',
  route:         ['London', 'Oxford', 'Lake District'],
  routeFull:     'BLR → London (LHR) → Oxford → Lake District → LHR',
  departureCity: 'Bengaluru',
  arrivalCity:   'London (LHR)',
  exitCity:      'London (LHR)',
  nights:        8,
  timezone:      'Europe/London',
  region:        'Western Europe',

  accommodation: {
    types:    ['Hostel', 'B&B', 'YHA'],
    rateMin:  2500,
    rateMax:  6500,
    currency: '₹',
    notes:    'London hostels £25–60/night · YHA Lake District excellent value · Book early for September school-holiday overlap',
  },

  camera: {
    devices: [
      { name: 'DJI Pocket 3',  type: 'pocket', notes: 'Keep in jacket pocket — Lake District weather is unpredictable, rain arrives fast' },
      { name: 'Insta360 GO 3', type: 'action', notes: 'Chest mount for Catbells hike, rowing on Derwentwater, Portobello Road walk' },
    ],
    strategy: 'owned',
    days:     9,
    provider: null,
  },

  sports: { basketball: null, cars: null },

  savingsGoal:     165000,
  savingsCurrency: '₹',

  heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1400&q=70&auto=format&fit=crop',
}

export const CITIES = [
  { name: 'London',        nights: 4, color: '#E2E5EC', emoji: '🎡' },
  { name: 'Oxford',        nights: 1, color: '#E8E8E0', emoji: '🎓' },
  { name: 'Lake District', nights: 3, color: '#D8E5D8', emoji: '⛰️' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        8,
  daysInCountry: 9,
  plannedSpots:  23,
  mustDo: [
    'Westminster Abbey at opening — beat the crowds by 30 minutes',
    'Sky Garden rooftop — free, but book 3 weeks ahead online',
    'Borough Market on a weekday — Saturdays are tourist chaos',
    'Catbells Fell — the Lake District distilled into 3 hours, no experience needed',
    'Castlerigg Stone Circle at dawn — older than Stonehenge, no fences, no crowds',
    'Christ Church Great Hall — the room that directly inspired Hogwarts',
    'Radcliffe Camera exterior — the most photogenic 15 minutes in Oxford',
    'Derwentwater by rowboat — rent from Keswick boat landings, go early',
  ],
}
