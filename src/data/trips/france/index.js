export const TRIP_META = {
  id:            'france',
  country:       'FR',
  title:         'France 2031',
  style:         'Solo',
  status:        'active',
  year:          2031,
  arcNo:         '05',
  heroImage:     'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=70&auto=format&fit=crop',
  theme:         'Riviera & Railways',
  countries:     ['FR'],
  pillars:       ['cafes', 'photography', 'food', 'architecture', 'coastal'],
  duration:      8,
  departure:     '2031-05-15',
  return_:       '2031-05-22',
  budgetRange:   { min: 200000, max: 350000, currency: '₹' },
  budgetDisplay: '₹2L – ₹3.5L',
  route:         ['Paris', 'Versailles', 'Loire Valley', 'Normandy'],
  routeFull:     'BLR → Paris (CDG) → Versailles → Loire Valley → Normandy → Paris (CDG)',
  departureCity: 'Bengaluru',
  arrivalCity:   'Paris (CDG)',
  exitCity:      'Paris (CDG)',
  nights:        7,
  timezone:      'Europe/Paris',

  accommodation: { types: ['Hostel', 'Budget Hotel', "Chambre d'hôtes"], rateMin: 2500, rateMax: 5500, currency: '₹', notes: 'Paris hostel 6 nights, Loire Valley guesthouse 1 night' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Architecture and street photography' }], strategy: 'rental', days: 8, provider: 'EU rental (TBC)' },
  sports:        { basketball: null, cars: null },

  savingsGoal:     800000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Paris',        nights: 6, color: '#E8E0D0', emoji: '🗼' },
  { name: 'Loire Valley', nights: 1, color: '#E8E8D0', emoji: '🏰', note: 'Overnight château country' },
  { name: 'Versailles',   nights: 0, color: '#F0E8D8', emoji: '👑', note: 'Day trip from Paris' },
  { name: 'Normandy',     nights: 0, color: '#D8E4EC', emoji: '⚓', note: 'D-Day beaches day trip' },
]

export const QUICK_STATS = {
  cities:        4,
  nights:        7,
  daysInCountry: 8,
  plannedSpots:  26,
  mustDo: [
    'Eiffel Tower summit at dusk — book 2 months ahead',
    'Louvre at 9 AM (Mona Lisa, Venus de Milo)',
    'Versailles Hall of Mirrors at opening time',
    "Sacré-Cœur at 7 AM before tour groups",
    'Marais district — Pompidou + Place des Vosges',
    'Loire Valley — Château de Chambord + Chenonceau drive',
    'Omaha Beach D-Day memorial, Normandy',
    'Canal Saint-Martin afternoon walk + coffee',
  ],
}
