export const TRIP_META = {
  id:            'korea2029',
  country:       'KR',
  title:         'South Korea 2029',
  style:         'Solo',
  status:        'active',
  year:          2029,
  duration:      10,
  departure:     '2029-04-15',
  return_:       '2029-04-24',
  budgetRange:   { min: 89000, max: 168000, currency: '₹' },
  budgetDisplay: '₹0.9L – ₹1.7L',
  route:         ['Seoul', 'Busan', 'Jeju'],
  routeFull:     'BLR → Seoul (ICN) → KTX to Busan → Jeju Air to Jeju → ICN',
  departureCity: 'Bengaluru',
  arrivalCity:   'Seoul (ICN)',
  exitCity:      'Jeju (CJU) → Seoul (ICN)',
  nights:        9,
  timezone:      'Asia/Seoul',
  region:        'East Asia',

  accommodation: {
    types:    ['Guesthouse', 'Hostel', 'Pension'],
    rateMin:  1500,
    rateMax:  3800,
    currency: '₹',
    notes:    'Korea is budget-friendly · Hongdae guesthouses ₩30,000–60,000/night · Busan Haeundae hostels · Jeju pensions near Seongsan',
  },

  camera: {
    devices: [
      { name: 'DJI Pocket 3',  type: 'pocket', notes: 'Gyeongbokgung dawn, Jeju coastal roads, Gwangalli night skyline' },
      { name: 'Insta360 GO 3', type: 'action', notes: 'Chest mount for Hangang basketball courts, Hallasan hiking, Seongsan sunrise climb' },
    ],
    strategy: 'owned',
    days:     10,
    provider: null,
  },

  sports: {
    basketball: {
      courts:     ['Hangang Yeouido Courts', 'Hongdae Outdoor Court', 'Sinchon Courts'],
      pickupRuns: [{ venue: 'Yeouido Hangang', day: 'Any afternoon', level: 'open' }],
    },
    cars: null,
  },

  savingsGoal:     140000,
  savingsCurrency: '₹',

  heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1400&q=70&auto=format&fit=crop',
}

export const CITIES = [
  { name: 'Seoul', nights: 4, color: '#E8EDF5', emoji: '🏙️' },
  { name: 'Busan', nights: 2, color: '#E5EAF0', emoji: '🌊' },
  { name: 'Jeju',  nights: 3, color: '#DCE8DD', emoji: '🌿' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        9,
  daysInCountry: 10,
  plannedSpots:  26,
  mustDo: [
    'Gyeongbokgung at dawn — gate opens 9 AM, arrive early for empty courtyards',
    'Starfield Library COEX — three-storey book wall, free, Seoul\'s most dramatic interior',
    'Hangang basketball courts — pick up run at Yeouido, best April afternoons',
    'KTX Seoul → Busan — 2h 15min at 300 km/h, book a window seat',
    'Gamcheon Culture Village — pastel-painted hillside labyrinth above Busan port',
    'Haedong Yonggungsa — the only Korean temple built directly on the sea',
    'Seongsan Ilchulbong at dawn — 30-min climb to the crater rim for the sunrise',
    'Jusangjeolli Cliffs — hexagonal basalt columns meeting the Jeju sea',
  ],
}
