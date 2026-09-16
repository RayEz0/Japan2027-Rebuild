export const PACKING_CATEGORIES = [
  {
    id:    'documents',
    label: 'Documents & Cards',
    icon:  '🪪',
    items: [
      { id: 'doc_passport',     label: 'Passport (min 6 months validity beyond Sep 18 2028)', critical: true  },
      { id: 'doc_visa',         label: 'UK Standard Visitor Visa (Indian passport — apply 3 months out via VFS Global)', critical: true  },
      { id: 'doc_insurance',    label: 'Travel insurance — medical + trip cancellation + outdoor activities cover', critical: true  },
      { id: 'doc_bookings',     label: 'Rail e-tickets offline (Trainline app), hostel confirmations PDFs', critical: true  },
      { id: 'doc_emergency',    label: 'UK emergency number: 999 · NHS 111 for non-emergency medical', critical: false },
      { id: 'doc_bank',         label: 'Notify bank of UK travel · Monzo/Revolut card for no-FX-fee spending (essential in UK)', critical: true  },
    ],
  },
  {
    id:    'tech',
    label: 'Tech & Electronics',
    icon:  '🔌',
    items: [
      { id: 'tec_phone',        label: 'Phone (charged)', critical: true  },
      { id: 'tec_charger',      label: 'Phone charger (USB-C)', critical: true  },
      { id: 'tec_adapter',      label: 'UK Type G adapter × 2 (3-pin square — NOT the same as EU 2-pin)', critical: true  },
      { id: 'tec_powerbank',    label: 'Power bank 20,000mAh (long fell-walking days away from charging)', critical: true  },
      { id: 'tec_camera',       label: 'DJI Pocket 3 — gimbal essential for Derwentwater boat + London street', critical: true  },
      { id: 'tec_action',       label: 'Insta360 GO 3 — chest mount for Catbells ridge walk and Ullswater Steamer', critical: false },
      { id: 'tec_sd',           label: 'Memory cards × 3 (misty fell + London overcast = large RAW files)', critical: false },
      { id: 'tec_cable',        label: 'USB-C cable × 2', critical: false },
      { id: 'tec_earphones',    label: 'Earphones (2h 20min London–Oxenholme train)', critical: false },
      { id: 'tec_headtorch',    label: 'Headtorch (Castlerigg Stone Circle pre-dawn start — sunrise 6:35 AM in Sep)', critical: true  },
    ],
  },
  {
    id:    'clothing',
    label: 'Clothing & Layers',
    icon:  '🧥',
    items: [
      { id: 'clo_waterproof',   label: 'Waterproof hardshell jacket (ESSENTIAL — Lake District weather changes in minutes)', critical: true  },
      { id: 'clo_waterproof_t', label: 'Waterproof over-trousers (lightweight, packable — for fell walking in rain)', critical: true  },
      { id: 'clo_fleece',       label: 'Fleece mid-layer (10–14°C typical in Lake District in September)', critical: true  },
      { id: 'clo_down',         label: 'Lightweight down or synthetic jacket (Catbells ridge, Castlerigg dawn — can be cold)', critical: true  },
      { id: 'clo_thermal_t',    label: 'Merino thermal base layer top × 2 (fell days)', critical: true  },
      { id: 'clo_tshirts',      label: 'T-shirts × 4 (London city days)', critical: false },
      { id: 'clo_jeans',        label: 'Jeans or casual trousers × 1 (London evenings, Oxford)', critical: false },
      { id: 'clo_softshell',    label: 'Softshell hiking trousers × 2 (fell walking days)', critical: true  },
      { id: 'clo_socks_wool',   label: 'Merino wool hiking socks × 4 pairs (Darn Tough or Smartwool)', critical: true  },
      { id: 'clo_socks_light',  label: 'Light cotton socks × 3 pairs (London city days)', critical: false },
      { id: 'clo_beanie',       label: 'Beanie hat (Castlerigg Stone Circle at dawn in September)', critical: true  },
      { id: 'clo_buff',         label: 'Neck buff (Catbells ridge wind)', critical: false },
      { id: 'clo_gloves',       label: 'Lightweight liner gloves (fell walking insurance)', critical: false },
      { id: 'clo_smart',        label: 'One smart casual outfit (Dishoom / pub dinners — no dress code in UK pubs)', critical: false },
    ],
  },
  {
    id:    'footwear',
    label: 'Footwear',
    icon:  '🥾',
    items: [
      { id: 'foo_boots',        label: 'Waterproof walking boots — Scarpa / Salomon GTX (ESSENTIAL for Catbells + Ullswater path)', critical: true  },
      { id: 'foo_trainers',     label: 'Lightweight trail runners or city shoes (London and Oxford city days)', critical: true  },
      { id: 'foo_flipflops',    label: 'Flip flops (hostel showers)', critical: false },
    ],
  },
  {
    id:    'health',
    label: 'Health & Toiletries',
    icon:  '💊',
    items: [
      { id: 'hea_paracetamol',  label: 'Paracetamol / ibuprofen (standard UK pharmacy names — not "Crocin")', critical: false },
      { id: 'hea_blister',      label: 'Blister plasters (Compeed) — new boots on Day 6 on Catbells is a bad plan', critical: true  },
      { id: 'hea_sunscreen',    label: 'SPF 30 (September UV in UK is real, especially on open fells)', critical: false },
      { id: 'hea_hand_cream',   label: 'Hand cream (UK autumn air is very dry)', critical: false },
      { id: 'hea_toiletries',   label: 'Standard toiletries (all available in UK Boots pharmacy if forgotten)', critical: true  },
    ],
  },
  {
    id:    'daypack',
    label: 'Day Pack & Accessories',
    icon:  '🎒',
    items: [
      { id: 'day_rucksack',     label: '25–30L daypack (fell walking + day trips from base hostels)', critical: true  },
      { id: 'day_packcover',    label: 'Waterproof pack cover (not optional in Lake District)', critical: true  },
      { id: 'day_map',          label: 'Harvey\'s Lake District map 1:40,000 (buy in Ambleside) — better than OS for fells', critical: true  },
      { id: 'day_compass',      label: 'Compass (fell walking insurance if mist descends — it does)', critical: false },
      { id: 'day_snacks',       label: 'Trek snacks for fell days — Kendal Mint Cake is local and correct', critical: false },
      { id: 'day_flask',        label: 'Insulated flask (coffee at Castlerigg Stone Circle at dawn)', critical: true  },
      { id: 'day_umbrella',     label: 'Compact umbrella (London + Oxford city days — folds flat)', critical: false },
      { id: 'day_laundry',      label: 'Small laundry bag + travel detergent (8 nights is long enough to need a wash)', critical: false },
    ],
  },
]

export const TOTAL_ITEMS = PACKING_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length, 0
)
