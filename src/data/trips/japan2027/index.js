/**
 * Japan 2027 — Trip Metadata
 * Single source of truth for all trip-level constants.
 */

export const TRIP_META = {
  id:            'japan2027',
  country:       'JP',
  title:         'Japan 2027',
  style:         'Solo',
  status:        'active',
  year:          2027,
  arcNo:         '01',
  timezone:      'Asia/Tokyo',
  region:        'East Asia',
  duration:      11,
  departure:     '2027-11-23T06:00:00',
  return_:       '2027-12-05T14:00:00',
  budgetRange:   { min: 200000, max: 250000, currency: '₹' },
  budgetDisplay: '₹2L – ₹2.5L',
  route:         ['Tokyo', 'Mt Fuji', 'Kyoto', 'Nara', 'Osaka'],
  routeFull:     'BLR → Tokyo → Mt Fuji → Kyoto → Nara → Osaka → KIX',
  departureCity: 'Bengaluru',
  arrivalCity:   'Tokyo (NRT)',
  exitCity:      'Osaka (KIX)',
  nights:        12,

  accommodation: {
    types:    ['Capsule Hotel', 'Business Hotel'],
    rateMin:  4000,
    rateMax:  6000,
    currency: '₹',
    notes:    'Mixed stay approach — capsule for experience, business for comfort',
  },

  camera: {
    devices: [
      { name: 'Insta360 GO 3', type: 'action',  notes: 'Wearable, wide-angle, B-roll machine' },
      { name: 'DJI Pocket 3',  type: 'pocket',  notes: 'Cinematic gimbal footage, vlog-ready' },
    ],
    strategy: 'rental',
    days:     11,
    provider: 'Rentio.jp (TBC)',
  },

  sports: {
    basketball: {
      courts:     [],
      pickupRuns: [],
      scrims:     [],
      note:       'Tokyo pickup basketball included on Day 5 — Day 2 optional',
    },
    cars: {
      spots: [
        {
          name:        'Daikoku Parking Area',
          location:    'Kanagawa, near Yokohama',
          description: "Japan's most famous JDM meet spot. GTR, Supra, NSX, R34 sightings weekly.",
          type:        'meet',
        },
      ],
      experiences: [
        {
          name:     'Full JDM / GTR Night Experience',
          provider: 'Tokyo GT (Instagram)',
          cost:     '¥15,000–25,000 / car',
          notes:    'Shinjuku pickup → Shuto Expressway → Rainbow Bridge → Daikoku PA → Return',
        },
      ],
    },
  },

  savingsGoal:   225000,
  savingsCurrency: '₹',

  heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=70&auto=format&fit=crop',
}

export const CITIES = [
  { name: 'Tokyo',   nights: 6, color: '#D8E6F2', emoji: '🗼' },
  { name: 'Mt Fuji', nights: 0, color: '#DCE8DD', emoji: '🗻', note: 'Road trip day' },
  { name: 'Kyoto',   nights: 3, color: '#E8DCC7', emoji: '⛩️' },
  { name: 'Nara',    nights: 0, color: '#E8E4D0', emoji: '🦌', note: 'Day trip from Osaka' },
  { name: 'Osaka',   nights: 3, color: '#F4D6D6', emoji: '🏙️' },
]

export const QUICK_STATS = {
  cities:        5,
  nights:        12,
  daysInJapan:   13,
  plannedSpots:  45,
  mustDo: [
    'Tokyo Disneyland (Premier Access)',
    'Full JDM / GTR Night — Daikoku PA',
    'Fushimi Inari at Dawn',
    'teamLab Borderless Kyoto',
    'Fuji Road Trip — Lawson to Oishi Park',
    'Sensoji at 6 AM',
    'Dotonbori at Night',
    'Shibuya Sky (Sunset Slot)',
    'Nara Deer Park',
    'Suma Beach Sunset',
  ],
}
