/**
 * Japan 2027 — JDM Car Culture
 * Daikoku PA, GTR Night Experience, Tokyo car spots.
 */

export const CAR_SPOTS = [
  {
    id:       'daikoku',
    name:     'Daikoku Parking Area',
    location: 'Kanagawa-ku, Yokohama',
    highway:  'Shuto Expressway Bay Shore Route (B) · Exit Daikoku PA',
    type:     'meet',
    bestTime: 'Friday–Saturday nights · After 11 PM',
    cars:     ['GT-R R34 / R35', 'Toyota Supra A80 / A90', 'Honda NSX NA1 / NA2', 'Honda S2000', 'Nissan Silvia S15', 'Subaru WRX STI', 'Civic Type R FK8'],
    fee:      'Free (parking fee applies inside PA)',
    access:   'Requires a car — highway PA, not accessible by train',
    description: "The most famous JDM meeting point on Earth. Daikoku PA is a highway rest stop that transforms into a rolling car show every weekend night. GT-Rs on every corner, exhaust echoing off concrete walls.",
    tip:      'Come after midnight for peak turnout. Stand near the observation area — do not block displayed cars. Photography is generally accepted.',
    mapsUrl:  'https://maps.google.com/?q=Daikoku+Parking+Area+Yokohama',
    images: [
      'https://i.pinimg.com/1200x/b9/4e/5e/b94e5e8b7e6f2c1d9f3a8e2b5c7d4f9a.jpg',
    ],
  },
  {
    id:       'umihotaru',
    name:     'Umihotaru PA — Tokyo Bay',
    location: 'Tokyo Bay Aqua-Line, Kisarazu',
    highway:  'Tokyo Bay Aqua-Line (E14) · ¥3,090 toll each way',
    type:     'meet',
    bestTime: 'Sunday mornings · 6–9 AM',
    cars:     ['Ferrari', 'Lamborghini', 'Porsche 911 GT3', 'JDM specials', 'R35 GT-R'],
    fee:      '¥3,090 toll each way (ETC or cash)',
    access:   'Via Tokyo Bay Aqua-Line by car. ~1 hour from central Tokyo.',
    description: 'Floating rest stop mid-bay on the Tokyo–Chiba expressway. Sunday morning meets here attract exotics and high-spec JDM builds. The view of Mt Fuji on a clear day is worth the toll alone.',
    tip:      "Pair with a Fuji Day — depart early Sunday, Umihotaru first, then continue to Kawaguchiko. Bring cash for the toll if you don't have an ETC card.",
    mapsUrl:  'https://maps.google.com/?q=Umihotaru+PA+Tokyo+Bay',
  },
  {
    id:       'shibuya-night',
    name:     'Shibuya / Daikanyama Strip',
    location: 'Shibuya-ku, Tokyo',
    highway:  'Street (no expressway required)',
    type:     'street',
    bestTime: 'Friday–Saturday nights · After 10 PM',
    cars:     ['Modified street cars', 'Stance builds', 'Classic JDM'],
    fee:      'Free',
    access:   'Walkable from Shibuya / Daikanyama station',
    description: 'The main Shibuya–Daikanyama strip sees modified street cars cruising on weekend nights. Nothing as concentrated as Daikoku, but easy to observe from the pavement while exploring the area.',
    tip:      'Stack with Golden Gai night out — cars come out after midnight.',
    mapsUrl:  'https://maps.google.com/?q=Shibuya+Daikanyama+Tokyo',
  },
]

export const GTR_NIGHT = {
  name:      'Full JDM / GTR Night Experience',
  provider:  'Tokyo GT',
  instagram: '@tokyogt_official',
  cost:      '¥15,000 – ¥25,000 per car',
  duration:  '3–4 hours',
  route:     'Shinjuku pickup → Shuto Expressway C1 → Rainbow Bridge → Bay Shore → Daikoku PA → Return',
  cars: [
    'Nissan GT-R R35 (current gen)',
    'Nissan GT-R R34 (Skyline historic)',
    'Toyota Supra A80 / A90',
  ],
  includes: [
    'Passenger ride OR self-drive option',
    'Daikoku PA meet entry',
    'Professional photography included',
    'English-speaking guide',
  ],
  bookWindow: 'September–October 2027 (2–3 months ahead)',
  note:       'Book via Instagram DM. Extremely popular with international visitors. Sells out months ahead.',
  mapsUrl:    'https://maps.google.com/?q=Shinjuku+Tokyo',
}

export const FUJI_DRIVE = {
  route:    'Shinjuku → Sagamihara → Yamanashi → Kawaguchiko → Oishi Park → Lawson Fuji → Hakone (optional) → Kyoto Station',
  duration: '7–8 hours with stops',
  car:      'Times Car Rental / Nippon Rent-a-Car — Shinjuku pickup, Kyoto Station drop',
  toll:     '~¥3,500–¥5,000 (expressway) + ¥1,500 (fuel)',
  note:     'The solo Fuji road trip is the centrepiece of the trip. Leave Shinjuku by 6 AM. Lawson Kawaguchiko convenience store with Mt Fuji backdrop is the hero shot.',
}

export const CAR_TIPS = [
  'IDP required for self-drive — apply via AAI or AAAI before leaving India',
  'Left-hand traffic — spend 20–30 min at the rental lot before going on a highway',
  'Get an ETC card at the rental counter (¥500 deposit) — most expressway lanes are ETC-only',
  'Japanese speed cameras are everywhere — strict 80 km/h limit on expressways',
  'Fuji Road Trip GPS: use Apple Maps or Google Maps (download offline for Yamanashi)',
  "Parking in Tokyo is expensive (¥300–600/30 min). Use PA rest stops on expressways — they're free.",
]
