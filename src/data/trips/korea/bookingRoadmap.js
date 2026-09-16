/**
 * South Korea 2029 — Booking Roadmap
 * Canonical list of booking tasks with their time windows.
 * Status (done/active/upcoming) is computed at runtime based on today's date.
 */

export const BOOKING_ITEMS = [
  {
    id:       'k-eta',
    label:    'K-ETA — Korea Electronic Travel Authorisation',
    category: 'document',
    window:   { start: '2029-01', end: '2029-03' },
    priority: 'critical',
    notes:    'Indian passport holders require K-ETA (Korea Electronic Travel Authorisation) — apply online at k-eta.go.kr. Fee ~₩10,000 (₹600). Valid 2 years, multiple entry. Apply at least 72 hours before departure but ideally 2–4 weeks out. Do NOT confuse with a visa — K-ETA is not a visa and the process is entirely online.',
  },
  {
    id:       'flights-international',
    label:    'Book International Flights — BLR ↔ Seoul (ICN)',
    category: 'transport',
    window:   { start: '2028-08', end: '2028-12' },
    priority: 'critical',
    notes:    'Korean Air direct BLR→ICN is the gold-standard option (~9.5h). Air India via DEL is cheaper. April is cherry-blossom peak demand in Korea — fares are higher than other spring months. Book 5–8 months out for best prices. Outbound Apr 15, return Apr 24 (Jeju Air CJU→ICN then connect BLR). Check Google Flights for fare trends.',
  },
  {
    id:       'flights-domestic',
    label:    'Book Domestic Flights — Busan (PUS) → Jeju (CJU)',
    category: 'transport',
    window:   { start: '2029-01', end: '2029-02' },
    priority: 'critical',
    notes:    'Jeju Air or Air Busan from Gimhae (PUS) to Jeju (CJU). Book via Jeju Air app or Naver flights. Morning departures fill first. Apr 21 departure from Busan → April peak demand — book 2–3 months out. The CJU→ICN return is included in the international return ticket booking or separate Jeju Air booking.',
  },
  {
    id:       'ktx-tickets',
    label:    'Book KTX — Seoul Station → Busan Station (Apr 19)',
    category: 'transport',
    window:   { start: '2029-02', end: '2029-03' },
    priority: 'critical',
    notes:    'Korail KTX tickets available at korail.com or the Korail Talk app (Korean app — use the English interface). KTX to Busan departs every 20 minutes; book the 08:00 or 08:30 departure to arrive Busan by 10:45. Window seat (A/D side) gives rice paddy and mountain views. Standard class ₩59,800 — no significant discount for advance booking but book anyway for seat choice.',
  },
  {
    id:       'seoul-accommodation',
    label:    'Book Seoul Accommodation — 4 Nights (Apr 15–19)',
    category: 'accommodation',
    window:   { start: '2028-12', end: '2029-02' },
    priority: 'critical',
    notes:    'Bunk Hostel Hongdae or similar Hongdae/Sinchon hostel. Book via Hostelworld or direct at hostel website. April is peak season in Seoul — cherry-blossom travellers from Japan, China, and Europe fill the city. Book 3–4 months out. Dorm beds sell before private rooms. Confirm cancellation policy.',
  },
  {
    id:       'busan-accommodation',
    label:    'Book Busan Accommodation — 2 Nights (Apr 19–21)',
    category: 'accommodation',
    window:   { start: '2029-01', end: '2029-02' },
    priority: 'high',
    notes:    'Haeundae area hostel (HiKorea, Kimchee, or similar) or Gwangalli guesthouse. Busan is also busy in April. Book 2–3 months out. Haeundae beach-side options book fastest.',
  },
  {
    id:       'jeju-accommodation',
    label:    'Book Jeju Accommodation — 3 Nights (Apr 21–24)',
    category: 'accommodation',
    window:   { start: '2029-01', end: '2029-02' },
    priority: 'high',
    notes:    'Jeju City guesthouse or YHA Hamdeok. April Jeju sees cherry blossom travellers. If choosing the Seongsan Pension option for the east coast proximity, book that first — pension accommodation is small (10–20 rooms) and fills quickly. Jeju rental car pickup is at the airport — accommodation location matters less than Seoul.',
  },
  {
    id:       'jeju-rental-car',
    label:    'Book Jeju Rental Car — 3 Days (Apr 21–24)',
    category: 'transport',
    window:   { start: '2029-01', end: '2029-03' },
    priority: 'high',
    notes:    'Book via Lotte Rent-a-Car, SK Rent-a-Car, or Klook/KKday packages. Economy automatic at Jeju Airport pickup. International Driving Permit (IDP) required — obtain from Drivers\' Association of India before departure (1-day process, ₹400). Book the car before the permit — confirm you\'ll have IDP in hand.',
  },
  {
    id:       'idp',
    label:    'International Driving Permit — India (for Jeju Rental Car)',
    category: 'document',
    window:   { start: '2029-02', end: '2029-03' },
    priority: 'high',
    notes:    'Required to drive a rental car in South Korea on an Indian driving licence. Apply at your nearest Drivers\' Association of India (AA of India) office. Same-day or 1-day processing. Fee ~₹400. Valid 1 year. Bring 2 passport photos, driving licence, and passport copy.',
  },
  {
    id:       'lotte-world-tower',
    label:    'Book Lotte World Tower Observatory (Seoul Sky)',
    category: 'experience',
    window:   { start: '2029-03', end: '2029-04' },
    priority: 'normal',
    notes:    'Book at lotteworld.com/tower or on-site. Walk-up queue can be 45 minutes on April weekends. Book the late afternoon timed slot (3–5 PM) for golden hour over the Han River. Adult ₩27,000. The tower is a specific highlight — online booking saves time on Day 4.',
  },
  {
    id:       'travel-insurance',
    label:    'Travel Insurance — Korea + Outdoor Activities',
    category: 'document',
    window:   { start: '2028-12', end: '2029-02' },
    priority: 'high',
    notes:    'Korea has excellent hospitals but no reciprocal healthcare for Indian passport holders. Full medical cover required. Include hiking activities (Hallasan, Seongsan) in the policy scope. Policybazaar, Cover-More, or HDFC Ergo are India-based options. Minimum ₹50L (approximately) medical coverage for a 10-day trip.',
  },
  {
    id:       'setup',
    label:    'Final Setup — eSIM, Apps, Naver Maps Offline',
    category: 'setup',
    window:   { start: '2029-03', end: '2029-04' },
    priority: 'normal',
    notes:    'Airalo Korea eSIM (SKT network) · Naver Maps offline for Seoul, Busan, Jeju (better than Google Maps in Korea — Korean address system) · Korail Talk app for KTX tickets · Kakao Taxi app (better than Uber in Korea, works with foreign cards) · Jeju Rental Car app for roadside assistance · K-ETA confirmation PDF offline',
  },
]
