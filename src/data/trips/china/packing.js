export const PACKING_CATEGORIES = [
  {
    id:    'documents',
    label: 'Documents & ID',
    icon:  '📄',
    items: [
      { id: 'china_doc_passport',       label: 'Passport (valid > 6 months after Nov 2033)',                                  critical: true  },
      { id: 'china_doc_visa',           label: 'China L Tourist Visa — printed + digital copy',                              critical: true  },
      { id: 'china_doc_flight_print',   label: 'All flight tickets printed (BLR→PVG, internal flights, CAN→ICN)',            critical: true  },
      { id: 'china_doc_hotel_confirm',  label: 'Hotel confirmation printouts for each city (required for visa entry check)',  critical: true  },
      { id: 'china_doc_insurance',      label: 'Travel insurance policy with emergency contact number',                       critical: true  },
      { id: 'china_doc_emergency',      label: 'Emergency contacts card — Indian Embassy Beijing +86-10-65321908',           critical: false },
      { id: 'china_doc_itinerary',      label: 'Printed day-by-day itinerary + offline backup on phone',                     critical: false },
      { id: 'china_doc_currency',       label: 'Chinese Yuan ¥1,000–2,000 cash (small stalls, taxis, tip-based moments)',    critical: false },
      { id: 'china_doc_photos',         label: '4 passport-size photographs (China visa backup + entry forms)',               critical: false },
    ],
  },

  {
    id:    'money-payments',
    label: 'Money & Digital Payments',
    icon:  '💳',
    items: [
      { id: 'china_pay_wechat',         label: 'WeChat Pay set up before departure (link international Visa/Mastercard)',     critical: true  },
      { id: 'china_pay_alipay',         label: 'Alipay international version installed + linked to card',                    critical: true  },
      { id: 'china_pay_cash',           label: 'CNY cash ¥1,500 for markets, street food, rural areas (ATMs can be scarce)', critical: true  },
      { id: 'china_pay_forex_card',     label: 'Multi-currency travel card (Niyo or HDFC Forex) for ATM backup',             critical: false },
      { id: 'china_pay_upi_blocked',    label: 'Note: UPI, Google Pay, PhonePe all blocked in China — pre-setup WeChat Pay', critical: false },
      { id: 'china_pay_12306',          label: '12306 train booking app + ticket pickup confirmation',                        critical: false },
    ],
  },

  {
    id:    'electronics',
    label: 'Electronics & Connectivity',
    icon:  '🔌',
    items: [
      { id: 'china_elec_vpn',           label: 'VPN app installed and tested BEFORE landing in China (ExpressVPN / NordVPN)', critical: true  },
      { id: 'china_elec_esim',          label: 'China eSIM activated (Airalo or China Unicom Hong Kong SIM)',                 critical: true  },
      { id: 'china_elec_offline_maps',  label: 'MAPS.ME offline maps downloaded: Shanghai, Beijing, Xi\'an, Guilin regions', critical: true  },
      { id: 'china_elec_adapter',       label: 'Power adapter — China uses Type A, C, and I (two/three flat prongs)',         critical: true  },
      { id: 'china_elec_powerbank',     label: 'Power bank 20,000mAh (long days, maps, VPN drains battery fast)',             critical: false },
      { id: 'china_elec_laptop',        label: 'Laptop or tablet (optional — useful for editing photos)',                     critical: false },
      { id: 'china_elec_cables',        label: 'USB-C cables x2 + Lightning cable if applicable',                            critical: false },
    ],
  },

  {
    id:    'camera',
    label: 'Camera & Photography',
    icon:  '📷',
    items: [
      { id: 'china_cam_body',           label: 'Camera body (rental from Shanghai — book in advance)',                        critical: false },
      { id: 'china_cam_wide',           label: 'Wide-angle lens 16–35mm (Forbidden City, Great Wall, karst landscapes)',      critical: false },
      { id: 'china_cam_tele',           label: 'Telephoto 70–200mm (terracotta details, Great Wall towers at distance)',       critical: false },
      { id: 'china_cam_cards',          label: 'Memory cards: 2 × 128GB (shoot RAW — karst and palace detail is dense)',      critical: false },
      { id: 'china_cam_tripod',         label: 'Compact travel tripod (The Bund at dusk, low-light hutong lanes)',            critical: false },
      { id: 'china_cam_cleaning',       label: 'Lens cleaning kit — Xi\'an and Beijing can have dust and pollution haze',    critical: false },
    ],
  },

  {
    id:    'clothing-layered',
    label: 'Clothing — Layered for October',
    icon:  '👕',
    items: [
      { id: 'china_cloth_tshirts',      label: 'T-shirts × 4 (15–22°C daily, warm during sightseeing)',                     critical: false },
      { id: 'china_cloth_light_jacket', label: 'Light down jacket or fleece (evenings drop to 10–12°C in Beijing/Xi\'an)',   critical: true  },
      { id: 'china_cloth_rain',         label: 'Compact rain jacket (Guilin gets occasional October showers)',               critical: false },
      { id: 'china_cloth_trousers',     label: 'Convertible trousers × 2 (temple dress codes, versatile)',                  critical: false },
      { id: 'china_cloth_shorts',       label: 'Shorts × 2 (Guilin and Yangshuo days are warm)',                            critical: false },
      { id: 'china_cloth_walk_shoes',   label: 'Walking shoes with ankle support (Great Wall is steep, cobblestones throughout)', critical: true },
      { id: 'china_cloth_sandals',      label: 'Sandals or light shoes (Yangshuo, hostel use)',                              critical: false },
      { id: 'china_cloth_layers',       label: 'Thermal base layer (Beijing nights in October can reach 8°C)',               critical: false },
    ],
  },

  {
    id:    'health',
    label: 'Health & Comfort',
    icon:  '💊',
    items: [
      { id: 'china_health_mask',        label: 'N95 masks × 5 (Beijing/Shanghai air quality can be poor — AQI check daily)', critical: true  },
      { id: 'china_health_meds',        label: 'Standard meds: paracetamol, antidiarrhoeal, antihistamine, antacid',         critical: false },
      { id: 'china_health_mosquito',    label: 'Mosquito repellent DEET 30%+ (essential for Guilin and Yangshuo evenings)',  critical: true  },
      { id: 'china_health_sunscreen',   label: 'Sunscreen SPF 50 (Great Wall, Li River cruise, Yangshuo cycling)',           critical: false },
      { id: 'china_health_water',       label: 'Reusable water bottle (do NOT drink tap water in China — bottled or boiled)', critical: true  },
    ],
  },
]

export const TOTAL_ITEMS = PACKING_CATEGORIES.reduce((s, c) => s + c.items.length, 0)
