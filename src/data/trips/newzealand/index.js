export const TRIP_META = {
  id:            'newzealand',
  country:       'NZ',
  title:         'New Zealand 2034',
  style:         'Solo',
  status:        'active',
  year:          2034,
  arcNo:         '08',
  heroImage:     'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1400&q=70&auto=format&fit=crop',
  theme:         'End of the World Cinema',
  countries:     ['NZ'],
  pillars:       ['photography', 'nature', 'car-culture', 'great-roads', 'cafes'],
  duration:      16,
  departure:     '2034-11-10',
  return_:       '2034-11-25',
  budgetRange:   { min: 700000, max: 1200000, currency: '₹' },
  budgetDisplay: '₹7L – ₹12L',
  route:         ['Auckland', 'Rotorua', 'Wellington', 'Queenstown', 'Milford Sound', 'Christchurch'],
  routeFull:     'BLR → Auckland (AKL) → Rotorua → Wellington → Queenstown (ZQN) → Milford Sound → Mt Cook → Christchurch (CHC) → BLR',
  departureCity: 'Bengaluru',
  arrivalCity:   'Auckland (AKL)',
  exitCity:      'Christchurch (CHC)',
  nights:        15,
  timezone:      'Pacific/Auckland',

  accommodation: { types: ['Hostel', 'Budget Motel', 'Mountain Lodge'], rateMin: 2000, rateMax: 6000, currency: '₹', notes: 'NZ hostels excellent quality — YHA network recommended. South Island lodges pricier but worth it near Milford.' },
  camera:        { devices: [{ name: 'DJI Pocket 3', type: 'pocket', notes: 'Landscape and fjord footage' }, { name: 'Insta360 GO 3', type: 'action', notes: 'Bungee and adventure activities' }], strategy: 'rental', days: 16, provider: 'NZ camera hire (TBC)' },
  sports:        { basketball: null, cars: { spots: [{ name: 'Glenorchy Flats', location: 'Glenorchy, near Queenstown', description: 'Lord of the Rings filming location — sweeping mountain valley drives', type: 'scenic-drive' }], experiences: [] } },

  savingsGoal:     600000,
  savingsCurrency: '₹',
}

export const CITIES = [
  { name: 'Auckland',      nights: 2, color: '#D8E8D8', emoji: '🌆' },
  { name: 'Rotorua',       nights: 2, color: '#E0E8D8', emoji: '♨️' },
  { name: 'Wellington',    nights: 2, color: '#D8E0EC', emoji: '🌬️' },
  { name: 'Queenstown',    nights: 5, color: '#D0E0EC', emoji: '🏔️' },
  { name: 'Milford Sound', nights: 1, color: '#C8D8E8', emoji: '🛶' },
  { name: 'Mt Cook',       nights: 1, color: '#E0EEF0', emoji: '⛰️' },
  { name: 'Christchurch',  nights: 2, color: '#E8E4D8', emoji: '🌸' },
]

export const QUICK_STATS = {
  cities:        7,
  nights:        15,
  daysInCountry: 16,
  plannedSpots:  42,
  mustDo: [
    'Bungee jumping — Kawarau Bridge (world\'s first commercial bungee site)',
    'Milford Sound fjord cruise at dawn',
    'Hobbiton Movie Set, Matamata',
    'Te Puia geothermal geyser show, Rotorua',
    'Glenorchy Paradise — Lord of the Rings filming locations drive',
    'Hooker Valley Track, Mt Cook National Park',
    'Roy\'s Peak hike, Wanaka (4h round trip)',
    'Wellington Te Papa Museum — free, world-class',
  ],
}
