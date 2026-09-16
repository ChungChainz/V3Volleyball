export interface Highlight {
  id: string
  title: string
  /** Week the clip came from; 0 for preseason or league-wide reels. */
  week: number
  url: string
  poster: string
  teamIds: string[]
  submittedBy: string
  length: string
  blurb: string
}

/**
 * Seed reel. New clips submitted through the highlights tab are appended to
 * this list in the browser for the current visit; persistence lands with the
 * clip queue milestone.
 */
export const highlights: Highlight[] = [
  {
    id: 'hl-1',
    title: 'Whitlock ends a 22-ball rally',
    week: 3,
    url: 'https://instagram.com/v3_volleyleague',
    poster: '/img/hero-court.png',
    teamIds: ['neon-reapers', 'desert-hammers'],
    submittedBy: 'Marisol Vaca',
    length: '0:24',
    blurb: 'Two overpasses, three shanked digs and a swing off one leg from zone 4 to close set two.',
  },
  {
    id: 'hl-2',
    title: 'Barnaby triple block, week 2',
    week: 2,
    url: 'https://instagram.com/v3_volleyleague',
    poster: '/img/texture-slash.png',
    teamIds: ['blackjack-block-party', 'neon-reapers'],
    submittedBy: 'Imani Fortescue',
    length: '0:11',
    blurb: 'Three stuffs in a five-point stretch. The bench loses it on the third one.',
  },
  {
    id: 'hl-3',
    title: 'Rainford serves six straight',
    week: 3,
    url: 'https://instagram.com/v3_volleyleague',
    poster: '/img/trophy-shelf.png',
    teamIds: ['post-road-pirates', 'double-down'],
    submittedBy: 'Silas Broadwater',
    length: '1:08',
    blurb: 'Came in as a serving sub down 18-12 and served the set out. Four of the six were aces.',
  },
  {
    id: 'hl-4',
    title: 'Sorrels digs the floor out',
    week: 2,
    url: 'https://instagram.com/v3_volleyleague',
    poster: '/img/hero-court.png',
    teamIds: ['red-rock-riot', 'chapel-of-pain'],
    submittedBy: 'Tasha Bellweather',
    length: '0:19',
    blurb: 'Full extension into the scorer table, gets up, and is back in position before the next contact.',
  },
  {
    id: 'hl-5',
    title: 'Week 1 opening night reel',
    week: 1,
    url: 'https://instagram.com/v3_volleyleague',
    poster: '/img/texture-slash.png',
    teamIds: [],
    submittedBy: 'V3 League',
    length: '2:41',
    blurb: 'Every match from opening Saturday cut down to the two minutes worth keeping.',
  },
]
