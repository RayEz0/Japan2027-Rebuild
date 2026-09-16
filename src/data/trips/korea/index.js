export const TRIP_META = {
  id:            'korea',
  country:       'KR',
  title:         'South Korea 2033',
  style:         'Solo',
  status:        'active',
  year:          2033,
  arcNo:         '07',
  heroImage:     'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1400&q=70&auto=format&fit=crop',
  theme:         'Ancient Capitals & Coastal Cities',
  countries:     ['KR'],
  pillars:       ['photography', 'food', 'architecture', 'culture', 'street', 'basketball'],
  duration:      10,
  departure:     '2033-10-24',
  return_:       '2033-11-02',
  budgetRange:   { min: 120000, max: 220000, currency: '₹' },
  budgetDisplay: '₹1.2L – ₹2.2L',
  route:         ['Seoul', 'Gyeongju', 'Busan'],
  routeFull:     'China → Seoul (ICN) → Gyeongju → Busan → Seoul (ICN) → BLR',
  departureCity: 'China',
  arrivalCity:   'Seoul (ICN)',
  exitCity:      'Seoul (ICN)',
  nights:        9,
  timezone:      'Asia/Seoul',

  accommodation: { types: ['Guesthouse', 'Capsule Hotel', 'Hanok Stay'], rateMin: 2000, rateMax: 5500, currency: '₹', notes: 'Korea offers excellent value — Hongdae area for nightlife access, Insadong for culture' },
  camera:        { devices: [{ name: 'Insta360 GO 3', type: 'action', notes: 'Street markets and palace architecture' }], strategy: 'rental', days: 10, provider: 'Korea camera rental (TBC)' },
  sports: {
    basketball: {
      courts:     ['KBL Arena, Seoul', 'Olympic Park basketball courts', 'Yongsan pickup court'],
      pickupRuns: ['Han River Park courts (evening games most days)'],
      note:       'Korea has a strong pickup basketball scene — NBA Store Gangnam is a must visit',
    },
    cars: null,
  },

  savingsGoal:     200000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Seoul',    nights: 6, color: '#E8EDF5', emoji: '🏙️' },
  { name: 'Gyeongju', nights: 1, color: '#F0EAD8', emoji: '⛩️', note: 'Thousand-year capital of Silla' },
  { name: 'Busan',    nights: 2, color: '#DCE8F0', emoji: '🌊' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        9,
  daysInCountry: 10,
  plannedSpots:  30,
  mustDo: [
    'NBA Store Korea, Gangnam (largest in Asia)',
    'Gyeongbokgung Palace at 9 AM guard changing ceremony',
    'Bukchon Hanok Village at 7 AM before crowds',
    'Gamcheon Culture Village, Busan (pastel hillside)',
    'Jagalchi Fish Market + raw seafood, Busan',
    'Insadong antiques and tea house morning',
    'Han River park cycling at sunset',
    'Dongdaemun Design Plaza (DDP) night architecture',
  ],
}
