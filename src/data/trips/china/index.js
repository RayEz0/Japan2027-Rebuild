export const TRIP_META = {
  id:            'china',
  country:       'CN',
  title:         'China 2033',
  style:         'Solo',
  status:        'active',
  year:          2033,
  arcNo:         '07',
  heroImage:     'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=1400&q=70&auto=format&fit=crop',
  theme:         'Ancient Cities & Floating Mountains',
  countries:     ['CN'],
  pillars:       ['photography', 'food', 'nature', 'architecture', 'street'],
  duration:      12,
  departure:     '2033-10-12',
  return_:       '2033-10-23',
  budgetRange:   { min: 220000, max: 380000, currency: '₹' },
  budgetDisplay: '₹2.2L – ₹3.8L',
  route:         ['Shanghai', 'Beijing', "Xi'an", 'Guilin', 'Yangshuo'],
  routeFull:     'BLR → Shanghai (PVG) → Beijing (PEK) → Xi\'an (XIY) → Guilin (KWL) → Guangzhou → Seoul',
  departureCity: 'Bengaluru',
  arrivalCity:   'Shanghai (PVG)',
  exitCity:      'Guangzhou (CAN)',
  nights:        11,
  timezone:      'Asia/Shanghai',

  accommodation: { types: ['Capsule Hotel', 'Budget Hotel', 'Guesthouse'], rateMin: 1200, rateMax: 3500, currency: '₹', notes: 'China is excellent value — clean budget hotels from ₹1,200/night. Book via Trip.com or Ctrip for best prices.' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Great Wall and Forbidden City shots' }, { name: 'Insta360 GO 3', type: 'action', notes: 'Li River bamboo raft wearable footage' }], strategy: 'rental', days: 12, provider: 'China rental TBC' },
  sports:        { basketball: null, cars: null },

  savingsGoal:     500000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Shanghai',    nights: 3, color: '#E0D8D0', emoji: '🏙️' },
  { name: 'Beijing',     nights: 4, color: '#E8DCC8', emoji: '🏮' },
  { name: "Xi'an",       nights: 2, color: '#E8E0D0', emoji: '⚔️' },
  { name: 'Guilin',      nights: 1, color: '#D0E0D8', emoji: '🏔️' },
  { name: 'Yangshuo',    nights: 1, color: '#D8EDD8', emoji: '🛶' },
]

export const QUICK_STATS = {
  cities:        5,
  nights:        11,
  daysInCountry: 12,
  plannedSpots:  36,
  mustDo: [
    'Great Wall at Mutianyu — toboggan ride down (less crowded than Badaling)',
    'Forbidden City at dawn (WeChat ticket essential)',
    "Xi'an Terracotta Army — all 3 pits",
    "Xi'an Muslim Quarter night food walk (lamb skewers, biangbiang noodles)",
    'Li River cruise Guilin → Yangshuo through karst mountains',
    'The Bund Shanghai skyline at midnight',
    'Summer Palace Beijing by the lake at golden hour',
  ],
}
