/**
 * Single source of truth for league-wide facts pulled from the season flyer.
 * Edit this file to change anything that appears in the header, footer, hero,
 * payment page or waiver — nothing here is hard-coded into components.
 */
export const league = {
  name: 'Vegas Vendetta Volleyball League',
  shortName: 'V3',
  tagline: 'Play. Compete. Repeat.',
  instagram: 'v3_vollyleague',
  instagramUrl: 'https://instagram.com/v3_vollyleague',
  venue: {
    name: 'The Post Road Courts',
    street: '7638 W Post Rd',
    city: 'Las Vegas',
    state: 'NV',
    zip: '89113',
    mapsUrl: 'https://maps.google.com/?q=7638+W+Post+Rd+Las+Vegas+NV+89113',
  },
  /**
   * Real Venmo account league fees are collected through.
   */
  venmo: {
    handle: 'Jeveric-Medina',
    displayName: 'Jeveric Medina',
    verified: true,
  },
} as const

export const season = {
  name: 'V3',
  level: 'Competitive Co-Ed',
  startsOn: '2026-10-03',
  weeks: 8,
  playoffWeek: 8,
  teamCap: 8,
  matchFormat: '2 out of 3',
  ruleset: 'USAV',
  nightOfWeek: 'Saturday',
  // Per the Vegas Vendetta game-dates flyer: every match night starts at
  // 7:10 PM, players should arrive early to warm up.
  startTime: '7:10 PM',
  arrivalNote: 'Please arrive early to warm up.',
  // Official USA Volleyball rulebooks & interpretations hub — linked here
  // rather than a single season PDF, since USAV replaces those PDFs every
  // rules cycle and this hub always points at whatever is current.
  rulesUrl: 'https://usavolleyball.org/resources-for-officials/rulebooks-and-interpretations/',
  fees: {
    team: 475,
    note: 'Eight weeks of court time, refs and playoffs for the whole roster.',
  },
  perks: [
    {
      title: 'Playoff concessions',
      body: 'Concession stand runs all playoff night and every team eats one free meal on the league.',
    },
    {
      title: 'Half-price fuel',
      body: 'Energy drinks are 50% off for rostered players. Spectators pay full price.',
    },
    {
      title: 'Champions walk with hardware',
      body: 'First place takes home the trophy plus a custom V3 jersey for every player on the roster.',
    },
  ],
} as const

/** Season fee summary rendered on the payment tab. */
export const paymentOptions = [
  {
    id: 'full',
    label: 'Team Total Payment',
    amount: season.fees.team,
    blurb: season.fees.note,
  },
] as const

export type PaymentOption = (typeof paymentOptions)[number]

/** Saturday of each week, derived from the season start date. */
export function weekDate(week: number): Date {
  const start = new Date(`${season.startsOn}T00:00:00`)
  start.setDate(start.getDate() + (week - 1) * 7)
  return start
}

export function formatWeekDate(week: number): string {
  return weekDate(week).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
