export const PACKING_CATEGORIES = [
  {
    id:    'documents',
    label: 'Documents & Cards',
    icon:  '🪪',
    items: [
      { id: 'doc_passport',     label: 'Passport (min 6 months validity beyond Apr 24 2029)', critical: true  },
      { id: 'doc_k_eta',        label: 'K-ETA (Korea Electronic Travel Authorisation) — Indian passport holders require this, apply online 72h before departure at k-eta.go.kr', critical: true  },
      { id: 'doc_insurance',    label: 'Travel insurance — medical + trip cancellation + outdoor activities (Hallasan hiking)', critical: true  },
      { id: 'doc_bookings',     label: 'Korail KTX e-ticket offline (Korail app) · hostel/guesthouse confirmations · Jeju rental car voucher', critical: true  },
      { id: 'doc_emergency',    label: 'Korea emergency: 119 (fire/ambulance), 112 (police), 1339 (medical advice in English)', critical: false },
      { id: 'doc_bank',         label: 'Notify bank of Korea travel · Wise or Revolut for KRW cash withdrawals at Korean ATMs (Shinhan/IBK ATMs accept foreign cards)', critical: true  },
      { id: 'doc_t_money',      label: 'T-Money card (₩50,000 loaded) — Seoul metro, Busan metro, intercity buses all accept it', critical: true  },
    ],
  },
  {
    id:    'tech',
    label: 'Tech & Electronics',
    icon:  '🔌',
    items: [
      { id: 'tec_phone',        label: 'Phone (charged)', critical: true  },
      { id: 'tec_charger',      label: 'Phone charger (USB-C)', critical: true  },
      { id: 'tec_adapter',      label: 'Korea Type C/F adapter (2-pin round — same as most of Europe, NOT UK Type G)', critical: true  },
      { id: 'tec_powerbank',    label: 'Power bank 20,000mAh (Hallasan full-day hike, Seongsan dawn — long days away from charging)', critical: true  },
      { id: 'tec_camera',       label: 'DJI Pocket 3 — gimbal essential for Gwangalli bridge night, Seongsan crater rim, Jeju coastal road', critical: true  },
      { id: 'tec_action',       label: 'Insta360 GO 3 — chest mount for Hangang basketball courts, Hallasan ridge, KTX window seat', critical: false },
      { id: 'tec_sd',           label: 'Memory cards × 3 (Seongsan sunrise + Jeju landscape = large file days)', critical: false },
      { id: 'tec_cable',        label: 'USB-C cable × 2', critical: false },
      { id: 'tec_earphones',    label: 'Earphones (KTX 2h 15min + Jeju Air flights)', critical: false },
      { id: 'tec_headtorch',    label: 'Headtorch (Seongsan Ilchulbong pre-dawn 4:40 AM car departure — mandatory)', critical: true  },
    ],
  },
  {
    id:    'clothing',
    label: 'Clothing & Layers',
    icon:  '🧥',
    items: [
      { id: 'clo_waterproof',   label: 'Waterproof jacket (Jeju is subtropical-adjacent — spring showers arrive fast, especially on Hallasan)', critical: true  },
      { id: 'clo_fleece',       label: 'Fleece or light down (Hallasan 1,100m in April is 5–10°C; Seongsan pre-dawn is cold)', critical: true  },
      { id: 'clo_tshirts',      label: 'T-shirts × 4 (Seoul is 14–20°C in April — pleasant city weather)', critical: true  },
      { id: 'clo_long_sleeve',  label: 'Light long-sleeve × 2 (shoulder-season evenings, Hangang riverside)', critical: true  },
      { id: 'clo_jeans',        label: 'Jeans or casual trousers × 1 (Seoul streetwear scene — appearance matters)', critical: false },
      { id: 'clo_hiking',       label: 'Lightweight hiking trousers × 2 (Hallasan, Seongsan, Jeju coastal walks)', critical: true  },
      { id: 'clo_socks_walk',   label: 'Merino wool hiking socks × 3 pairs (Hallasan and Seongsan days)', critical: true  },
      { id: 'clo_socks_city',   label: 'Light socks × 3 pairs (Seoul city days)', critical: false },
      { id: 'clo_beanie',       label: 'Lightweight beanie (Seongsan summit at dawn, Hallasan above 1,100m)', critical: true  },
      { id: 'clo_cap',          label: 'Cap or bucket hat (UV on Jeju open landscape is strong in April)', critical: false },
      { id: 'clo_smart',        label: 'One clean outfit (galbi BBQ dinner, Starfield Library — Seoul is style-conscious)', critical: false },
    ],
  },
  {
    id:    'footwear',
    label: 'Footwear',
    icon:  '🥾',
    items: [
      { id: 'foo_hiking',       label: 'Waterproof hiking boots (ESSENTIAL for Hallasan — trail gets muddy in spring, ankle support on Seongsan stone steps)', critical: true  },
      { id: 'foo_trainers',     label: 'Clean sneakers / trainers (Seoul streetwear culture — your footwear is noticed; wear your best pair)', critical: true  },
      { id: 'foo_sandals',      label: 'Sandals or slip-ons (hostel corridor, beach days at Haeundae/Hamdeok)', critical: false },
    ],
  },
  {
    id:    'basketball',
    label: 'Basketball Kit',
    icon:  '🏀',
    items: [
      { id: 'bball_shoes',      label: 'Basketball shoes (bring them — Hangang courts are asphalt; Korean players arrive in proper kicks)', critical: true  },
      { id: 'bball_shorts',     label: 'Basketball shorts × 2', critical: true  },
      { id: 'bball_jersey',     label: 'Reversible jersey or a clean NBA jersey for court credibility', critical: false },
      { id: 'bball_ball',       label: 'Ball is optional — courts may have one, but bringing your own ball in a net bag signals readiness', critical: false },
      { id: 'bball_grip',       label: 'Court shoes bag (keep basketball shoes separate from muddy hiking boots)', critical: false },
    ],
  },
  {
    id:    'health',
    label: 'Health & Toiletries',
    icon:  '💊',
    items: [
      { id: 'hea_sunscreen',    label: 'SPF 50+ sunscreen (April UV in Korea is significant, especially on open Jeju fells and Seongsan crater)', critical: true  },
      { id: 'hea_painkillers',  label: 'Paracetamol / ibuprofen', critical: false },
      { id: 'hea_blister',      label: 'Blister plasters (Seongsan stone steps are steep, Hallasan trail is long)', critical: true  },
      { id: 'hea_hand_cream',   label: 'Hand cream (Korean spring air is dry)', critical: false },
      { id: 'hea_toiletries',   label: 'Standard toiletries (everything available in Olive Young or convenience stores)', critical: true  },
    ],
  },
  {
    id:    'daypack',
    label: 'Day Pack & Accessories',
    icon:  '🎒',
    items: [
      { id: 'day_rucksack',     label: '20–25L daypack (Hallasan + Seongsan days; Seoul city pack)', critical: true  },
      { id: 'day_rain_cover',   label: 'Pack rain cover (Jeju spring showers on Hallasan trail)', critical: true  },
      { id: 'day_water',        label: 'Reusable water bottle 1L (Korean tap water is drinkable; refill at hostel)', critical: true  },
      { id: 'day_snacks',       label: 'Hiking snacks for Hallasan day (trail mix, energy bars — buy at CU/GS25 night before)', critical: true  },
      { id: 'day_laundry',      label: 'Travel laundry detergent (9 nights — all hostels and guesthouses have laundry facilities in Korea)', critical: false },
      { id: 'day_umbrella',     label: 'Compact umbrella (Seoul spring showers, Busan harbour wind)', critical: false },
    ],
  },
]

export const TOTAL_ITEMS = PACKING_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length, 0
)
