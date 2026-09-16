export const TRIP_META = {
  id:            'usa',
  country:       'US',
  title:         'USA 2035',
  style:         'Solo',
  status:        'active',
  year:          2035,
  arcNo:         '09',
  heroImage:     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1400&q=70&auto=format&fit=crop',
  theme:         'Pacific Coast Highway',
  countries:     ['US'],
  pillars:       ['car-culture', 'photography', 'cafes', 'great-roads', 'basketball'],
  duration:      14,
  departure:     '2035-09-08',
  return_:       '2035-09-21',
  budgetRange:   { min: 520000, max: 850000, currency: '₹' },
  budgetDisplay: '₹5.2L – ₹8.5L',
  route:         ['Los Angeles', 'San Francisco', 'Las Vegas', 'Grand Canyon', 'Chicago', 'New York'],
  routeFull:     'BLR → Los Angeles (LAX) → San Francisco (SFO) → Las Vegas (LAS) → Grand Canyon → Chicago (ORD) → New York (JFK) → Lisbon',
  departureCity: 'Bengaluru',
  arrivalCity:   'Los Angeles (LAX)',
  exitCity:      'New York (JFK)',
  nights:        13,
  timezone:      'America/Los_Angeles',

  accommodation: { types: ['Hotel', 'Budget Hotel', 'Hostel'], rateMin: 3500, rateMax: 7000, currency: '₹', notes: 'USA mid-range hotels ₹4,500–₹7,000/night. NYC and SF most expensive. Las Vegas hotels can be surprisingly cheap if booked mid-week.' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'NYC skylines and Pacific Coast footage' }, { name: 'Insta360 GO 3', type: 'action', notes: 'Grand Canyon rim and Golden Gate crossing' }], strategy: 'rental', days: 14, provider: 'US rental TBC' },
  sports: {
    basketball: {
      courts:     ['Rucker Park, Harlem NYC', 'Venice Beach courts, LA', 'Grant Park courts, Chicago'],
      pickupRuns: ['Rucker Park Harlem — legendary outdoor pickup', 'Venice Beach — competitive street ball'],
      note:       'NBA Store NYC flagship (5th Ave) and NBA Store Chicago essential stops',
    },
    cars: {
      spots:       [{ name: 'Petersen Automotive Museum', location: 'Los Angeles, Wilshire Blvd', description: 'World-class automotive museum — 300+ cars including McLaren, Ferrari, Bugatti, JDM legends', type: 'museum' }],
      experiences: [{ name: 'Pacific Coast Highway Drive', provider: 'Self-drive (car hire LA→SF)', cost: 'Car hire cost', notes: 'LA → Santa Monica → Malibu → Big Sur → San Francisco. One of the world\'s greatest road trips.' }],
    },
  },

  savingsGoal:     900000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Los Angeles',   nights: 3, color: '#F0E8D0', emoji: '🎬' },
  { name: 'San Francisco', nights: 2, color: '#D8E0EC', emoji: '🌉' },
  { name: 'Las Vegas',     nights: 2, color: '#E8E0C8', emoji: '🎰' },
  { name: 'Grand Canyon',  nights: 1, color: '#E8D8C8', emoji: '🏜️' },
  { name: 'Chicago',       nights: 2, color: '#D8E8F0', emoji: '🌬️' },
  { name: 'New York',      nights: 3, color: '#D8D8E0', emoji: '🗽' },
]

export const QUICK_STATS = {
  cities:        6,
  nights:        13,
  daysInCountry: 14,
  plannedSpots:  40,
  mustDo: [
    'Petersen Automotive Museum — best car museum outside Japan',
    'Pacific Coast Highway drive LA → San Francisco (PCH via Big Sur)',
    'Golden Gate Bridge bicycle crossing + Sausalito ferry back',
    'Las Vegas Strip at midnight (Bellagio fountains show)',
    'Grand Canyon South Rim at sunrise — Mather Point',
    'Rucker Park pickup basketball, Harlem NYC',
    'High Line elevated park walk, New York City',
    'Chicago River architecture cruise',
  ],
}
