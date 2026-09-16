export const STAYS = [
  {
    city: 'Rome',
    dates: 'Sep 15 – Sep 18',
    nights: 3,
    accentColor: '#F5E0D0',
    options: [
      {
        name: 'Generator Rome',
        address: 'Via Palestro 88, near Roma Termini · Metro B 2 stops to Colosseo · Metro A 3 stops to Vatican',
        price: '₹2,500 – ₹4,500 / night (dorm 8-bed) · ₹7,000 – ₹11,000 / night (private ensuite)',
        why: 'Generator is the gold standard for solo traveller hostels in Europe — excellent common areas, rooftop bar with Termini views, well-maintained bathrooms, strong wifi. The central location means every major Roman sight is within Metro reach in under 20 minutes. Strong community atmosphere for meeting other solo travellers.',
        type: 'hostel',
      },
      {
        name: 'The RomeHello Hostel',
        address: 'Via Torino 45, Esquilino — 5 min walk from Roma Termini',
        price: '₹2,200 – ₹3,800 / night (dorm) · ₹6,000 – ₹9,500 / night (private)',
        why: 'Boutique-hostel feel with genuinely good design — exposed brick, natural light, courtyard garden. The staff-led free walking tours of Rome leave from here every morning and are worth attending on Day 1. Rooftop terrace has Pantheon and Colosseum line-of-sight in clear weather.',
        type: 'hostel',
      },
    ],
  },
  {
    city: 'Florence',
    dates: 'Sep 18 – Sep 21',
    nights: 3,
    accentColor: '#E8D5C0',
    options: [
      {
        name: 'Plus Florence',
        address: 'Via Santa Caterina d\'Alessandria 15, Santa Croce area · 15 min walk to Uffizi · 10 min walk to Duomo',
        price: '₹2,800 – ₹5,000 / night (dorm) · ₹7,500 – ₹12,000 / night (private)',
        why: 'The largest hostel in Florence with a rooftop swimming pool (open until October), bar, and a genuinely international social mix. The Oltrarno neighbourhood feel and proximity to Santa Croce means you\'re in the working Florentine city rather than the tourist zone. Breakfast included in most rates.',
        type: 'hostel',
      },
      {
        name: 'SoprArno Suites',
        address: 'Via Maggio 35, Oltrarno · Across Ponte Vecchio from the Uffizi · 10 min walk to Accademia',
        price: '₹8,500 – ₹14,000 / night (private suite)',
        why: 'A boutique guesthouse in an authentic Florentine palazzo on the artisan Via Maggio — 11 individually designed rooms each named after a Florentine historical figure. The location in Oltrarno puts you in the neighbourhood locals actually use, with genuine wine bars and osterie on the doorstep rather than tourist traps.',
        type: 'guesthouse',
      },
    ],
  },
  {
    city: 'Lake Como',
    dates: 'Sep 21 – Sep 22',
    nights: 1,
    accentColor: '#D0E0E8',
    options: [
      {
        name: 'Ostello di Bellagio',
        address: 'Loc. Appredio, Bellagio · Directly above the Bellagio ferry dock · Views over the lake to both shores',
        price: '₹3,500 – ₹5,500 / night (dorm) · ₹8,000 – ₹13,000 / night (private with lake view)',
        why: 'The only proper hostel on the lake and perfectly positioned — you wake up to a lake-and-Alps view that costs 5x as much in any hotel. Staff know the ferry schedules by heart and can arrange kayak hire and villa garden tours. Book early — it has only 40 beds and fills months ahead in shoulder season.',
        type: 'hostel',
      },
      {
        name: 'Albergo Milano, Varenna',
        address: 'Via XX Settembre 35, Varenna · On the lake shore · 3 min walk from Varenna-Esino train station',
        price: '₹10,000 – ₹18,000 / night (private lake-facing room)',
        why: 'A family-run three-star hotel built directly over the water on Varenna\'s lakeside promenade — several rooms have balconies literally above the lake surface. The restaurant serves excellent lake perch (lavarello) and risotto. Varenna is the better base than Bellagio for photography: the light on the Como mountains falls perfectly from the east shore in the afternoon.',
        type: 'hotel',
      },
    ],
  },
  {
    city: 'Amalfi Coast',
    dates: 'Sep 23 – Sep 26',
    nights: 3,
    accentColor: '#C8D8F0',
    options: [
      {
        name: 'Hostel Brikette Positano',
        address: 'Via G. Marconi 358, Positano · Upper Positano near the main bus stop · Sea views from common terrace',
        price: '₹3,500 – ₹6,000 / night (dorm) · ₹8,500 – ₹15,000 / night (private with terrace)',
        why: 'The best-positioned and most social hostel on the Amalfi Coast — the terrace overlooks Positano village and the sea, and the communal kitchen and breakfast area are where you\'ll meet fellow hikers attempting the Path of the Gods. Being near the upper bus stop means you avoid the punishing 200-step downhill climb every time you return from a day trip.',
        type: 'hostel',
      },
      {
        name: 'Villa Rosa Positano',
        address: 'Via C. Colombo 127, Positano · Mid-village · 10 min walk to Spiaggia Grande beach',
        price: '₹9,000 – ₹18,000 / night (private room with sea view)',
        why: 'A family-run pensione with six rooms, each with a private balcony or terrace overlooking the village and bay. The terrace breakfast (local pastries, fresh fruit, espresso looking at the sea) is genuinely one of the more memorable meals of any Italy trip. The family has lived in Positano for four generations and the recommendations they give are streets ahead of any guidebook.',
        type: 'guesthouse',
      },
    ],
  },
  {
    city: 'Monaco',
    dates: 'Sep 26 – Sep 27',
    nights: 1,
    accentColor: '#D8E8E0',
    options: [
      {
        name: 'Columbus Monte-Carlo',
        address: 'Avenue des Papalins, Fontvieille · Quieter residential district · 10 min walk to Port Hercule',
        price: '₹18,000 – ₹28,000 / night (standard room)',
        why: 'Monaco has no budget accommodation — Columbus is the most affordable of its actual hotels. The Fontvieille location is residential and quieter than Monte-Carlo itself, the design is clean and contemporary, and the restaurant and bar are priced for non-billionaires. The Formula 1 circuit passes 200 m from the hotel entrance.',
        type: 'hotel',
      },
      {
        name: 'Nice Budget Option + Day Trip to Monaco',
        address: 'Nice city centre · 22 km from Monaco · Train Monaco–Nice 22 min · €4 single',
        price: '₹3,500 – ₹7,000 / night (Nice hostel or budget hotel)',
        why: 'Monaco\'s hotels are brutally expensive for one night. Nice has excellent hostel options (Antares Hostel, Villa Saint-Exupéry Beach) and trains to Monaco run every 30 minutes from 5 AM to midnight. Stay in Nice, day-trip Monaco for the full day, return for accommodation. Saves ₹14,000–₹22,000 on the single night without missing anything.',
        type: 'hostel',
      },
    ],
  },
]
