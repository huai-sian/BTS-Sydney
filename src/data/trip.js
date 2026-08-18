export const trip = {
  name: 'BTS Sydney',
  destination: 'Sydney, Australia',
  startDate: '2027-02-19',
  endDate: '2027-02-25',
  weatherLocation: {
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: 'Australia/Sydney',
  },
}

export const itineraryDays = [
  {
    date: '2027-02-19',
    title: 'Arrival Day',
    sections: {
      flights: 'Add arrival flight details, airport transfer, and baggage notes.',
      stay: 'Add hotel check-in details and address.',
      dailyPlan: 'Add first-day plans and recovery time.',
      links: 'Add boarding passes, maps, and booking links.',
    },
  },
  {
    date: '2027-02-20',
    title: 'Sydney Day 1',
    sections: {
      flights: 'No flight details planned yet.',
      stay: 'Confirm accommodation notes.',
      dailyPlan: 'Add sightseeing, meals, and concert prep.',
      links: 'Add maps, tickets, or restaurant bookings.',
    },
  },
  {
    date: '2027-02-21',
    title: 'Sydney Day 2',
    sections: {
      flights: 'No flight details planned yet.',
      stay: 'Confirm accommodation notes.',
      dailyPlan: 'Add daily route and event timing.',
      links: 'Add venue, transport, and booking links.',
    },
  },
  {
    date: '2027-02-22',
    title: 'Sydney Day 3',
    sections: {
      flights: 'No flight details planned yet.',
      stay: 'Confirm accommodation notes.',
      dailyPlan: 'Add flexible plans, rest windows, and reservations.',
      links: 'Add maps and confirmations.',
    },
  },
  {
    date: '2027-02-23',
    title: 'Sydney Day 4',
    sections: {
      flights: 'No flight details planned yet.',
      stay: 'Confirm accommodation notes.',
      dailyPlan: 'Add key stops and transport notes.',
      links: 'Add saved places and ticket links.',
    },
  },
  {
    date: '2027-02-24',
    title: 'Sydney Day 5',
    sections: {
      flights: 'No flight details planned yet.',
      stay: 'Confirm accommodation notes.',
      dailyPlan: 'Add final full-day plans and packing reminders.',
      links: 'Add bookings, maps, and shared docs.',
    },
  },
  {
    date: '2027-02-25',
    title: 'Departure Day',
    sections: {
      flights: 'Add departure flight details and airport timing.',
      stay: 'Add checkout time and luggage storage notes.',
      dailyPlan: 'Add breakfast, transit, and departure buffer.',
      links: 'Add boarding passes, airport map, and transport links.',
    },
  },
]

export const importantLinks = [
  { label: 'Flights', description: 'Boarding passes, airline app, and booking references.', url: '' },
  { label: 'Stay', description: 'Hotel address, check-in details, and confirmation.', url: '' },
  { label: 'Daily Plan', description: 'Shared itinerary, reservations, and maps.', url: '' },
  { label: 'Important Links', description: 'Tickets, travel insurance, and useful trip docs.', url: '' },
]

export const defaultChecklist = [
  { id: 'passport', label: 'Check passport validity', category: 'Travel' },
  { id: 'visa', label: 'Confirm Australia visa or ETA requirements', category: 'Travel' },
  { id: 'insurance', label: 'Buy or verify travel insurance', category: 'Travel' },
  { id: 'flights', label: 'Save flight bookings offline', category: 'Bookings' },
  { id: 'stay', label: 'Save accommodation confirmation and address', category: 'Bookings' },
  { id: 'tickets', label: 'Save event tickets and venue entry details', category: 'Concert' },
  { id: 'outfit', label: 'Plan concert outfit and comfortable shoes', category: 'Concert' },
  { id: 'power', label: 'Pack chargers, power bank, and AU adapter', category: 'Packing' },
  { id: 'maps', label: 'Download offline maps for Sydney', category: 'Prep' },
  { id: 'weather', label: 'Check forecast before packing', category: 'Prep' },
]
