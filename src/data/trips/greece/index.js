export const TRIP_META = {
  id:            'greece',
  country:       'GR',
  title:         'Greece 2029',
  style:         'Solo',
  status:        'active',
  year:          2029,
  arcNo:         '03',
  heroImage:     'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=70&auto=format&fit=crop',
  theme:         'Ancient Light',
  countries:     ['GR'],
  pillars:       ['photography', 'history', 'architecture', 'coastal', 'cafes'],
  duration:      8,
  departure:     '2029-10-02',
  return_:       '2029-10-09',
  budgetRange:   { min: 180000, max: 280000, currency: '₹' },
  budgetDisplay: '₹1.8L – ₹2.8L',
  route:         ['Athens', 'Santorini', 'Mykonos'],
  routeFull:     'Monaco → Athens (ATH) → Santorini (JTR) → Mykonos (JMK) → Athens (ATH) → BLR',
  departureCity: 'Monaco',
  arrivalCity:   'Athens (ATH)',
  exitCity:      'Athens (ATH)',
  nights:        7,
  timezone:      'Europe/Athens',

  accommodation: { types: ['Boutique Hotel', 'Cave Suite', 'Hostel'], rateMin: 3500, rateMax: 9000, currency: '₹', notes: 'Budget hostel in Athens, mid-range Santorini (cave suite experience), hostel in Mykonos' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Caldera views and blue domes' }], strategy: 'rental', days: 8, provider: 'From Italy, carry forward' },
  sports:        { basketball: null, cars: null },

  savingsGoal:     0,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Athens',    nights: 3, color: '#E8E0C8', emoji: '🏛️' },
  { name: 'Santorini', nights: 2, color: '#D0E0F0', emoji: '💙' },
  { name: 'Mykonos',   nights: 1, color: '#F5F0E8', emoji: '🌊' },
]

export const QUICK_STATS = {
  cities:        3,
  nights:        7,
  daysInCountry: 8,
  plannedSpots:  24,
  mustDo: [
    'Acropolis at 8 AM before the heat and crowds',
    'Oia Santorini caldera sunset (stake your spot early)',
    'Cape Sounion — Temple of Poseidon at golden hour',
    'Akrotiri archaeological site, Santorini',
    'Perissa black volcanic beach swim',
    'Delos island ancient ruins day trip from Mykonos',
    'Monastiraki flea market and souvlaki at dawn',
  ],
}
