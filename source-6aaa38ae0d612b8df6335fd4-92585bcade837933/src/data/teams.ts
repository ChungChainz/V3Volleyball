export type Position = 'OH' | 'OPP' | 'MB' | 'S' | 'L' | 'DS'

export interface Player {
  id: string
  name: string
  number: number
  position: Position
  captain?: boolean
  /** Short scouting note the commissioner keeps on each player. */
  note?: string
}

export interface Team {
  id: string
  name: string
  abbr: string
  /** Two-tone crest colors, used for the generated jersey mark. */
  colors: [string, string]
  captain: string
  homeWeekNight: string
  founded: number
  bio: string
  roster: Player[]
}

export const teams: Team[] = [
  {
    id: 'neon-reapers',
    name: 'Neon Reapers',
    abbr: 'NRP',
    colors: ['#D01018', '#2A2A30'],
    captain: 'Marisol Vaca',
    homeWeekNight: 'Saturday 6:00',
    founded: 2023,
    bio: 'Back-to-back finalists who run a fast 6-2 and live for the slide. They serve tough from the first whistle and rarely give away a free ball.',
    roster: [
      { id: 'nrp-1', name: 'Marisol Vaca', number: 7, position: 'S', captain: true, note: 'Sets a flat, hittable ball. Calls the whole floor.' },
      { id: 'nrp-2', name: 'Deshaun Whitlock', number: 12, position: 'OH', note: 'Season-high 19 kills in week 2.' },
      { id: 'nrp-3', name: 'Priya Raghunathan', number: 4, position: 'L', note: 'Reads the seam better than anyone in the league.' },
      { id: 'nrp-4', name: 'Tobias Grieve', number: 21, position: 'MB', note: 'Blocks with his hands over the net, not at it.' },
      { id: 'nrp-5', name: 'Jenna Kirkbride', number: 9, position: 'OPP', note: 'Left-handed line shot is nearly unplayable.' },
      { id: 'nrp-6', name: 'Cal Nakashima', number: 33, position: 'MB', note: 'Jump serve, roughly 60% in.' },
      { id: 'nrp-7', name: 'Renata Oyelaran', number: 15, position: 'DS', note: 'Serve receive specialist, subs in the back row.' },
    ],
  },
  {
    id: 'blackjack-block-party',
    name: 'Blackjack Block Party',
    abbr: 'BJB',
    colors: ['#E8E8EC', '#1B1B20'],
    captain: 'Hollis Barnaby',
    homeWeekNight: 'Saturday 7:15',
    founded: 2024,
    bio: 'A wall at the net and nothing but chirp behind it. Six of the eight played together in the spring and they have the tightest block timing in the gym.',
    roster: [
      { id: 'bjb-1', name: 'Hollis Barnaby', number: 21, position: 'MB', captain: true, note: 'Leads the league in stuff blocks.' },
      { id: 'bjb-2', name: 'Imani Fortescue', number: 3, position: 'S', note: 'Dumps on two more than she should. It keeps working.' },
      { id: 'bjb-3', name: 'Gideon Prewitt', number: 11, position: 'OH', note: 'Goes high hands off the block on purpose.' },
      { id: 'bjb-4', name: 'Soledad Munteanu', number: 6, position: 'OH', note: 'Best roll shot in the league.' },
      { id: 'bjb-5', name: 'Wes Tanabe', number: 17, position: 'OPP', note: 'Swings hard on every touch, for better or worse.' },
      { id: 'bjb-6', name: 'Camille Ashworth', number: 1, position: 'L', note: 'Pancakes she has no business getting.' },
      { id: 'bjb-7', name: 'Brant Okonjo', number: 24, position: 'MB', note: 'Came up from the free agent pool in week 1.' },
    ],
  },
  {
    id: 'desert-hammers',
    name: 'Desert Hammers',
    abbr: 'DHM',
    colors: ['#C8862A', '#16161A'],
    captain: 'Ruben Estrella',
    homeWeekNight: 'Saturday 8:30',
    founded: 2022,
    bio: 'The oldest roster in V3 and the most patient. They will out-rally you for two hours and never look tired.',
    roster: [
      { id: 'dhm-1', name: 'Ruben Estrella', number: 8, position: 'OPP', captain: true, note: 'Ten-year captain. Never misses a serve.' },
      { id: 'dhm-2', name: 'Thandiwe Abara', number: 14, position: 'OH', note: 'Swings on a short set without complaining.' },
      { id: 'dhm-3', name: 'Milo Strand', number: 2, position: 'S', note: 'Runs a 5-1 and hates the dump.' },
      { id: 'dhm-4', name: 'Frankie Delacroix', number: 19, position: 'MB', note: 'Slide attack out of the middle.' },
      { id: 'dhm-5', name: 'Noor Haddadi', number: 5, position: 'DS', note: 'Best short serve in the league.' },
      { id: 'dhm-6', name: 'Arden Kovalchuk', number: 27, position: 'OH', note: 'Plays all six rotations.' },
    ],
  },
  {
    id: 'red-rock-riot',
    name: 'Red Rock Riot',
    abbr: 'RRR',
    colors: ['#A31219', '#241A1A'],
    captain: 'Tasha Bellweather',
    homeWeekNight: 'Saturday 6:00',
    founded: 2025,
    bio: 'New roster, loud bench. Built around two outsides who both jump out of the gym and a libero who refuses to let a ball hit the floor.',
    roster: [
      { id: 'rrr-1', name: 'Tasha Bellweather', number: 10, position: 'OH', captain: true, note: 'Leads the team in kills and in yelling.' },
      { id: 'rrr-2', name: 'Emeka Nwachukwu', number: 23, position: 'OH', note: 'Touches 11-4. Still learning the shot.' },
      { id: 'rrr-3', name: 'Lindy Sorrels', number: 0, position: 'L', note: 'Chases everything into the bleachers.' },
      { id: 'rrr-4', name: 'Otto Marchetti', number: 16, position: 'S', note: 'Quick hands, flat tempo.' },
      { id: 'rrr-5', name: 'Yasmin Fairclough', number: 13, position: 'MB', note: 'Closes the block on the outside.' },
      { id: 'rrr-6', name: 'Royce Padmore', number: 31, position: 'MB', note: 'Free agent pickup, week 2.' },
      { id: 'rrr-7', name: 'Delia Vantongeren', number: 22, position: 'OPP', note: 'Back row attack out of zone 1.' },
    ],
  },
  {
    id: 'post-road-pirates',
    name: 'Post Road Pirates',
    abbr: 'PRP',
    colors: ['#1F6F6B', '#131316'],
    captain: 'Silas Broadwater',
    homeWeekNight: 'Saturday 7:15',
    founded: 2023,
    bio: 'The house team. They practice on these courts twice a week and know every dead spot in the floor.',
    roster: [
      { id: 'prp-1', name: 'Silas Broadwater', number: 18, position: 'MB', captain: true, note: 'Runs the gym and the block.' },
      { id: 'prp-2', name: 'Anneke Vorster', number: 4, position: 'S', note: 'Best hands in V3.' },
      { id: 'prp-3', name: 'Jamar Threadgill', number: 9, position: 'OH', note: 'Cuts the ball back into zone 5.' },
      { id: 'prp-4', name: 'Coraline Pike', number: 7, position: 'OH', note: 'Team lead in digs.' },
      { id: 'prp-5', name: 'Benicio Alvarado', number: 25, position: 'OPP', note: 'Float serve that moves late.' },
      { id: 'prp-6', name: 'Odessa Rainford', number: 11, position: 'DS', note: 'Serving sub, six straight aces in week 3.' },
    ],
  },
  {
    id: 'dust-devils',
    name: 'Dust Devils',
    abbr: 'DST',
    colors: ['#8A6A3C', '#191915'],
    captain: 'Wendell Saito',
    homeWeekNight: 'Saturday 8:30',
    founded: 2024,
    bio: 'Scrappy, undersized and completely unbothered by it. They keep the ball off the floor and wait for you to make the mistake.',
    roster: [
      { id: 'dst-1', name: 'Wendell Saito', number: 6, position: 'S', captain: true, note: 'Sets everything with his hands above his head.' },
      { id: 'dst-2', name: 'Bernadette Oyola', number: 12, position: 'OH', note: 'Tips more than she swings. It works.' },
      { id: 'dst-3', name: 'Kwame Adjei-Boateng', number: 20, position: 'MB', note: 'Quick set specialist.' },
      { id: 'dst-4', name: 'Fiona Haverstock', number: 2, position: 'L', note: 'Never out of position.' },
      { id: 'dst-5', name: 'Alonzo Quiroga', number: 15, position: 'OPP', note: 'Two aces a set on average.' },
      { id: 'dst-6', name: 'Meike Lindqvist', number: 8, position: 'OH', note: 'Plays defense in the right back.' },
    ],
  },
  {
    id: 'chapel-of-pain',
    name: 'Chapel of Pain',
    abbr: 'CHP',
    colors: ['#6A2C8F', '#151218'],
    captain: 'Vivienne Thorsby',
    homeWeekNight: 'Saturday 6:00',
    founded: 2025,
    bio: 'Named after the wedding chapel three doors down from the gym. Their whole strategy is serving you off the court.',
    roster: [
      { id: 'chp-1', name: 'Vivienne Thorsby', number: 5, position: 'OPP', captain: true, note: 'Jump spin serve, hunts the seam.' },
      { id: 'chp-2', name: 'Dante Rockhold', number: 14, position: 'OH', note: 'Hits high line all night.' },
      { id: 'chp-3', name: 'Sabine Ferreiro', number: 3, position: 'S', note: 'First season setting. Improving weekly.' },
      { id: 'chp-4', name: 'Isaiah Bracewell', number: 28, position: 'MB', note: 'Big block, still figuring out timing.' },
      { id: 'chp-5', name: 'Noelle Ashgrove', number: 10, position: 'L', note: 'Loud, organized, keeps them in system.' },
      { id: 'chp-6', name: 'Grigor Panakis', number: 17, position: 'MB', note: 'Free agent pickup, week 1.' },
    ],
  },
  {
    id: 'double-down',
    name: 'Double Down',
    abbr: 'DDN',
    colors: ['#2B6CB0', '#121419'],
    captain: 'Lacey Quintanilla',
    homeWeekNight: 'Saturday 7:15',
    founded: 2026,
    bio: 'Assembled entirely from last season free agents. Nobody expected them to be competitive and they are already stealing sets.',
    roster: [
      { id: 'ddn-1', name: 'Lacey Quintanilla', number: 1, position: 'OH', captain: true, note: 'Organized the whole roster over a group chat.' },
      { id: 'ddn-2', name: 'Ezekiel Mbatha', number: 24, position: 'MB', note: 'Learning to close the block.' },
      { id: 'ddn-3', name: 'Harriet Solberg', number: 9, position: 'S', note: 'Runs a clean 6-2.' },
      { id: 'ddn-4', name: 'Roman Vasquez-Tey', number: 30, position: 'OPP', note: 'Swings from the back row.' },
      { id: 'ddn-5', name: 'Birdie Chalmers', number: 4, position: 'DS', note: 'Serve receive anchor.' },
      { id: 'ddn-6', name: 'Oskar Pflüger', number: 13, position: 'OH', note: 'Steady, rarely errs.' },
    ],
  },
]

export const teamsById: Record<string, Team> = Object.fromEntries(
  teams.map((team) => [team.id, team]),
)

export function teamById(id: string): Team | undefined {
  return teamsById[id]
}

export const positionLabels: Record<Position, string> = {
  OH: 'Outside hitter',
  OPP: 'Opposite',
  MB: 'Middle blocker',
  S: 'Setter',
  L: 'Libero',
  DS: 'Defensive specialist',
}

export const freeAgents: Player[] = [
  { id: 'fa-1', name: 'Kenji Ovalle-Reyes', number: 0, position: 'S', note: 'Available weeks 4 through 8.' },
  { id: 'fa-2', name: 'Talitha Brandeis', number: 0, position: 'OH', note: 'Played college club. Wants a competitive roster.' },
  { id: 'fa-3', name: 'Marcus Delahaye', number: 0, position: 'MB', note: 'Blocks well, needs reps in serve receive.' },
  { id: 'fa-4', name: 'Perpetua Nzeogwu', number: 0, position: 'L', note: 'Can fill in any Saturday with notice.' },
]
