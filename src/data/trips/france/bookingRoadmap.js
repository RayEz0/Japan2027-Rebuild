/**
 * France 2031 — Booking Roadmap
 * Arc 05: France, Germany, Luxembourg, Netherlands
 * France portion: May 15–22, 2031 (Paris + Loire Valley + Normandy day trip)
 */

export const BOOKING_ITEMS = [
  {
    id:       'france-schengen-visa',
    label:    'Apply for Schengen Visa — France (Arc 05 entry country)',
    category: 'document',
    window:   { start: '2031-01', end: '2031-03' },
    priority: 'critical',
    notes:    'Indian passport holders need a Schengen visa to enter France. Apply via VFS Global (French Consulate) a minimum 15 days before travel, maximum 6 months ahead. As the first country entered in Arc 05, France issues the visa covering the entire Schengen area. Required documents: flight itinerary, hotel bookings, bank statements (₹2L+ recommended), travel insurance certificate.',
  },
  {
    id:       'france-flights',
    label:    'Book Flights — BLR → Paris CDG (outbound) + CDG → BLR (return)',
    category: 'transport',
    window:   { start: '2030-09', end: '2030-12' },
    priority: 'critical',
    notes:    'Best options: Air France direct BLR→CDG (limited, expensive), Qatar Airways via DOH, Emirates via DXB, IndiGo codeshare options. Book outbound May 15 2031, return May 22 2031. Book 9–12 months ahead — May is peak European season. Price alert on Google Flights from Sep 2030.',
  },
  {
    id:       'france-paris-accommodation',
    label:    'Book Paris Accommodation — 6 Nights (May 15–21)',
    category: 'accommodation',
    window:   { start: '2030-12', end: '2031-02' },
    priority: 'high',
    notes:    'Generator Paris fills up fast for May — book dorm or private room 4–6 months ahead. Cancellation policy matters as much as price for May travel. Alternative: St Christopher\'s Canal or any hostel in 10th/11th arrondissement.',
  },
  {
    id:       'france-eiffel-tower',
    label:    'Book Eiffel Tower Summit Tickets — May 17 (6 PM slot)',
    category: 'experience',
    window:   { start: '2031-03', end: '2031-03' },
    priority: 'critical',
    notes:    'Summit tickets at eiffel-tower.com sell out 2–3 months ahead for May. Book the specific 6:00 PM timed entry for golden hour light on Day 3. Ticket type: "Summit by lift" — ₹2,090 (€22). Print or download the PDF. No last-minute availability in high season.',
  },
  {
    id:       'france-versailles-entry',
    label:    'Book Versailles Timed Entry — May 19 (9 AM slot)',
    category: 'experience',
    window:   { start: '2031-03', end: '2031-04' },
    priority: 'high',
    notes:    'Versailles online booking at chateauversailles.fr — timed entry "Passport" covers Palace + Gardens. May is very busy; first slot (9 AM) is best for beating crowds in the Hall of Mirrors. Book 2–3 months ahead. Confirm Musical Fountains schedule for May 2031 (Saturdays + some weekdays, extra €9.50).',
  },
  {
    id:       'france-louvre-tickets',
    label:    'Book Louvre Skip-the-Line Tickets — May 16 (9 AM)',
    category: 'experience',
    window:   { start: '2031-04', end: '2031-04' },
    priority: 'high',
    notes:    'Timed entry at museum.louvre.fr — €16 (≈₹1,520) with specific time slot. Without pre-booking, queues at the pyramid can exceed 2 hours in May. Richelieu Passage entry (Rue de Rivoli) is faster than the pyramid even with tickets.',
  },
  {
    id:       'france-loire-car',
    label:    'Book Loire Valley Hire Car — May 20 (1 Day, Tours)',
    category: 'transport',
    window:   { start: '2031-03', end: '2031-03' },
    priority: 'medium',
    notes:    'Book automatic transmission small car from Tours Gare TGV station — SIXT, Europcar, or Hertz all have desks. 1-day hire (pickup ~9 AM, return 7 PM). International Driving Permit required alongside Indian driving licence. Auto is essential — French country roads with a manual while reading maps is too stressful.',
  },
  {
    id:       'france-dday-tour',
    label:    'Book D-Day Guided Tour from Paris — May 21',
    category: 'experience',
    window:   { start: '2031-03', end: '2031-03' },
    priority: 'medium',
    notes:    'Full-day coach tour from Paris Opéra area: Paris City Vision, Viator, or Normanby Tours. Covers Omaha Beach, American Cemetery, Pointe du Hoc, Bayeux. Departs ~7:30 AM, returns ~9:30 PM. All-inclusive with guide and entries. Book 2–3 months ahead — May slots fill up. Confirm pickup point is Metro-accessible from Generator Paris.',
  },
  {
    id:       'france-travel-insurance',
    label:    'Travel Insurance — Schengen Cover (Arc 05)',
    category: 'document',
    window:   { start: '2031-02', end: '2031-02' },
    priority: 'high',
    notes:    'Schengen visa requires minimum €30,000 medical evacuation cover. Get a policy covering the full Arc 05 trip (France + Germany + Luxembourg + Netherlands). Policybazaar, Bajaj Allianz, or HDFC ERGO. Confirm coverage includes emergency medical, trip cancellation, and lost baggage. Get certificate in English and French.',
  },
  {
    id:       'france-esim',
    label:    'Activate EU eSIM — before departure',
    category: 'setup',
    window:   { start: '2031-04', end: '2031-04' },
    priority: 'medium',
    notes:    'Airalo EU regional eSIM — covers France and all Schengen countries in Arc 05. Buy online, activate before boarding. 15GB is sufficient for 8 days with Maps and photography backup. France uses Orange/SFR networks. Keep Indian SIM active for banking OTPs on second SIM slot.',
  },
  {
    id:       'france-tgv-tours',
    label:    'Book TGV Paris Montparnasse → Tours — May 20',
    category: 'transport',
    window:   { start: '2031-04', end: '2031-04' },
    priority: 'medium',
    notes:    'SNCF TGV Montparnasse → Tours St-Pierre-des-Corps (1h exact). Book via SNCF Connect app — Prem\'s tickets (cheapest) available 3 months before travel. Aim for first departure ~7:30 AM to maximise château time. Return same day possible or overnight in Tours.',
  },
]
