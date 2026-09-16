export const TRIP_META = {
  id:            'portugal',
  country:       'PT',
  title:         'Portugal 2035',
  style:         'Solo',
  status:        'active',
  year:          2035,
  arcNo:         '09',
  heroImage:     'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1400&q=70&auto=format&fit=crop',
  theme:         'Fado & Azulejos',
  countries:     ['PT'],
  pillars:       ['photography', 'cafes', 'food', 'architecture', 'coastal'],
  duration:      8,
  departure:     '2035-09-22',
  return_:       '2035-09-29',
  budgetRange:   { min: 140000, max: 240000, currency: '₹' },
  budgetDisplay: '₹1.4L – ₹2.4L',
  route:         ['Lisbon', 'Sintra', 'Setúbal', 'Porto', 'Douro Valley'],
  routeFull:     'New York → Lisbon (LIS) → Sintra → Setúbal → Porto → Douro Valley → Porto (OPO) → BLR',
  departureCity: 'New York',
  arrivalCity:   'Lisbon (LIS)',
  exitCity:      'Porto (OPO)',
  nights:        7,
  timezone:      'Europe/Lisbon',

  accommodation: { types: ['Boutique Hostel', 'Guesthouse', 'Quinta'], rateMin: 1800, rateMax: 4500, currency: '₹', notes: 'Portugal is excellent value. Lisbon boutique hostels have private rooms from ₹2,500. Porto guesthouses excellent.' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Azulejo tiles and Douro Valley terraces' }], strategy: 'rental', days: 8, provider: 'Carry from USA' },
  sports:        { basketball: null, cars: null },

  savingsGoal:     0,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Lisbon',       nights: 3, color: '#E8E0D0', emoji: '🏙️' },
  { name: 'Sintra',       nights: 0, color: '#D8ECD8', emoji: '🏰', note: 'Day trip from Lisbon' },
  { name: 'Setúbal',      nights: 0, color: '#D0DCF0', emoji: '🌊', note: 'Arrábida beach day trip' },
  { name: 'Porto',        nights: 3, color: '#E8D8D0', emoji: '🍷' },
  { name: 'Douro Valley', nights: 1, color: '#E8EAD8', emoji: '🌿' },
]

export const QUICK_STATS = {
  cities:        5,
  nights:        7,
  daysInCountry: 8,
  plannedSpots:  26,
  mustDo: [
    'Pena Palace Sintra — pastel fairy-tale castle on hilltop',
    "Quinta da Regaleira initiation well, Sintra",
    'Pastéis de Belém — the original 1837 pastel de nata recipe',
    'Alfama Fado music at a tiny tasca after dark',
    'Dom Luís I Bridge crossing at sunset, Porto',
    'Livraria Lello bookshop, Porto (Harry Potter inspiration)',
    'Douro Valley terraced wine estates at harvest',
    'Portinho da Arrábida — clearest water beach in mainland Europe',
  ],
}
