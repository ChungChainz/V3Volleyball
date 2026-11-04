import { season } from './league'

export interface SetScore {
  home: number
  away: number
}

export type MatchStatus = 'final' | 'scheduled'

/**
 * A disqualification decides a match without a played score.
 *   'home' / 'away' — that side was disqualified; the other side wins 2-0 in
 *                      sets, with no points added to the point differential.
 *   'both'          — both teams were disqualified; each takes a loss and
 *                      nothing is added to sets or points.
 */
export type Forfeit = 'home' | 'away' | 'both'

export interface Match {
  id: string
  week: number
  court: string
  time: string
  homeId: string
  awayId: string
  sets: SetScore[]
  status: MatchStatus
  forfeit?: Forfeit
}

export interface PlayoffSlot {
  id: string
  round: string
  court: string
  time: string
  homeLabel: string
  awayLabel: string
}

/**
 * The full 8-team slate, transcribed from the league's season sheet.
 * Each entry carries its own court and time, since a given week runs four
 * slots per court rather than one shared start.
 *
 * homeId/awayId must match a team's `id` in src/data/teams.ts:
 *   smash-or-pass (jevy), one-spike-man (sisa), tips-and-balls (lei),
 *   pass-and-hitties (nicole), two-bump-chumps (noah),
 *   goal-diggers (adian), lfg (max), sanchovies (sancho)
 *
 * Within a week the entries are listed in time order;
 * buildSchedule() assigns the match id by position in that list.
 */
const manualPairings: Array<{
  week: number
  court: string
  time: string
  homeId: string
  awayId: string
}> = [
  // ---------- Week 1 ----------
  { week: 1, court: 'Court 1', time: '7:10 PM', homeId: 'lfg', awayId: 'one-spike-man' },
  { week: 1, court: 'Court 2', time: '7:10 PM', homeId: 'tips-and-balls', awayId: 'pass-and-hitties' },
  { week: 1, court: 'Court 1', time: '8:10 PM', homeId: 'lfg', awayId: 'pass-and-hitties' },
  { week: 1, court: 'Court 2', time: '8:10 PM', homeId: 'tips-and-balls', awayId: 'one-spike-man' },
  { week: 1, court: 'Court 1', time: '9:10 PM', homeId: 'goal-diggers', awayId: 'two-bump-chumps' },
  { week: 1, court: 'Court 2', time: '9:10 PM', homeId: 'smash-or-pass', awayId: 'sanchovies' },
  { week: 1, court: 'Court 1', time: '10:10 PM', homeId: 'goal-diggers', awayId: 'sanchovies' },
  { week: 1, court: 'Court 2', time: '10:10 PM', homeId: 'smash-or-pass', awayId: 'two-bump-chumps' },

  // ---------- Week 2 ----------
  { week: 2, court: 'Court 1', time: '7:10 PM', homeId: 'lfg', awayId: 'smash-or-pass' },
  { week: 2, court: 'Court 2', time: '7:10 PM', homeId: 'one-spike-man', awayId: 'two-bump-chumps' },
  { week: 2, court: 'Court 1', time: '8:10 PM', homeId: 'lfg', awayId: 'two-bump-chumps' },
  { week: 2, court: 'Court 2', time: '8:10 PM', homeId: 'one-spike-man', awayId: 'smash-or-pass' },
  { week: 2, court: 'Court 1', time: '9:10 PM', homeId: 'goal-diggers', awayId: 'pass-and-hitties' },
  { week: 2, court: 'Court 2', time: '9:10 PM', homeId: 'sanchovies', awayId: 'tips-and-balls' },
  { week: 2, court: 'Court 1', time: '10:10 PM', homeId: 'goal-diggers', awayId: 'tips-and-balls' },
  { week: 2, court: 'Court 2', time: '10:10 PM', homeId: 'sanchovies', awayId: 'pass-and-hitties' },

  // ---------- Week 3 ----------
  { week: 3, court: 'Court 1', time: '7:10 PM', homeId: 'lfg', awayId: 'tips-and-balls' },
  { week: 3, court: 'Court 2', time: '7:10 PM', homeId: 'two-bump-chumps', awayId: 'sanchovies' },
  { week: 3, court: 'Court 1', time: '8:10 PM', homeId: 'lfg', awayId: 'sanchovies' },
  { week: 3, court: 'Court 2', time: '8:10 PM', homeId: 'two-bump-chumps', awayId: 'tips-and-balls' },
  { week: 3, court: 'Court 1', time: '9:10 PM', homeId: 'goal-diggers', awayId: 'one-spike-man' },
  { week: 3, court: 'Court 2', time: '9:10 PM', homeId: 'pass-and-hitties', awayId: 'smash-or-pass' },
  { week: 3, court: 'Court 1', time: '10:10 PM', homeId: 'goal-diggers', awayId: 'smash-or-pass' },
  { week: 3, court: 'Court 2', time: '10:10 PM', homeId: 'pass-and-hitties', awayId: 'one-spike-man' },

  // ---------- Week 4 ----------
  { week: 4, court: 'Court 1', time: '7:10 PM', homeId: 'lfg', awayId: 'pass-and-hitties' },
  { week: 4, court: 'Court 2', time: '7:10 PM', homeId: 'sanchovies', awayId: 'one-spike-man' },
  { week: 4, court: 'Court 1', time: '8:10 PM', homeId: 'lfg', awayId: 'one-spike-man' },
  { week: 4, court: 'Court 2', time: '8:10 PM', homeId: 'sanchovies', awayId: 'pass-and-hitties' },
  { week: 4, court: 'Court 1', time: '9:10 PM', homeId: 'goal-diggers', awayId: 'tips-and-balls' },
  { week: 4, court: 'Court 2', time: '9:10 PM', homeId: 'smash-or-pass', awayId: 'two-bump-chumps' },
  { week: 4, court: 'Court 1', time: '10:10 PM', homeId: 'goal-diggers', awayId: 'two-bump-chumps' },
  { week: 4, court: 'Court 2', time: '10:10 PM', homeId: 'smash-or-pass', awayId: 'tips-and-balls' },

  // ---------- Week 5 ----------
  { week: 5, court: 'Court 1', time: '7:10 PM', homeId: 'lfg', awayId: 'smash-or-pass' },
  { week: 5, court: 'Court 2', time: '7:10 PM', homeId: 'tips-and-balls', awayId: 'two-bump-chumps' },
  { week: 5, court: 'Court 1', time: '8:10 PM', homeId: 'lfg', awayId: 'two-bump-chumps' },
  { week: 5, court: 'Court 2', time: '8:10 PM', homeId: 'tips-and-balls', awayId: 'smash-or-pass' },
  { week: 5, court: 'Court 1', time: '9:10 PM', homeId: 'goal-diggers', awayId: 'sanchovies' },
  { week: 5, court: 'Court 2', time: '9:10 PM', homeId: 'one-spike-man', awayId: 'pass-and-hitties' },
  { week: 5, court: 'Court 1', time: '10:10 PM', homeId: 'goal-diggers', awayId: 'pass-and-hitties' },
  { week: 5, court: 'Court 2', time: '10:10 PM', homeId: 'one-spike-man', awayId: 'sanchovies' },

  // ---------- Week 6 ----------
  { week: 6, court: 'Court 1', time: '7:10 PM', homeId: 'sanchovies', awayId: 'lfg' },
  { week: 6, court: 'Court 2', time: '7:10 PM', homeId: 'smash-or-pass', awayId: 'goal-diggers' },
  { week: 6, court: 'Court 1', time: '8:10 PM', homeId: 'smash-or-pass', awayId: 'one-spike-man' },
  { week: 6, court: 'Court 2', time: '8:10 PM', homeId: 'tips-and-balls', awayId: 'sanchovies' },
  { week: 6, court: 'Court 1', time: '9:10 PM', homeId: 'lfg', awayId: 'goal-diggers' },
  { week: 6, court: 'Court 2', time: '9:10 PM', homeId: 'pass-and-hitties', awayId: 'two-bump-chumps' },
  { week: 6, court: 'Court 1', time: '10:10 PM', homeId: 'two-bump-chumps', awayId: 'one-spike-man' },
  { week: 6, court: 'Court 2', time: '10:10 PM', homeId: 'pass-and-hitties', awayId: 'tips-and-balls' },

  // ---------- Week 7 ----------
  { week: 7, court: 'Court 2', time: '7:10 PM', homeId: 'smash-or-pass', awayId: 'pass-and-hitties' },
  { week: 7, court: 'Court 1', time: '7:10 PM', homeId: 'two-bump-chumps', awayId: 'sanchovies' },
  { week: 7, court: 'Court 1', time: '8:10 PM', homeId: 'tips-and-balls', awayId: 'one-spike-man' },
  { week: 7, court: 'Court 2', time: '8:10 PM', homeId: 'pass-and-hitties', awayId: 'two-bump-chumps' },
  { week: 7, court: 'Court 1', time: '9:10 PM', homeId: 'lfg', awayId: 'goal-diggers' },
  { week: 7, court: 'Court 2', time: '9:10 PM', homeId: 'sanchovies', awayId: 'smash-or-pass' },
  { week: 7, court: 'Court 1', time: '10:10 PM', homeId: 'tips-and-balls', awayId: 'lfg' },
  { week: 7, court: 'Court 2', time: '10:10 PM', homeId: 'one-spike-man', awayId: 'goal-diggers' },
]

/**
 * Week 8 playoff night — standard bracket seeding.
 * All eight teams qualify; seeds come from the final regular-season standings.
 * Round 1 is 1v8, 2v7, 3v6 and 4v5; the winners meet in the semifinals, and
 * the two semifinal winners play the championship.
 */
export const playoffBracket: PlayoffSlot[] = [
  { id: 'po-r1-1', round: 'Round 1', court: 'Court 1', time: '7:10 PM', homeLabel: 'Seed 1', awayLabel: 'Seed 8' },
  { id: 'po-r1-2', round: 'Round 1', court: 'Court 2', time: '7:10 PM', homeLabel: 'Seed 4', awayLabel: 'Seed 5' },
  { id: 'po-r1-3', round: 'Round 1', court: 'Court 1', time: '8:10 PM', homeLabel: 'Seed 2', awayLabel: 'Seed 7' },
  { id: 'po-r1-4', round: 'Round 1', court: 'Court 2', time: '8:10 PM', homeLabel: 'Seed 3', awayLabel: 'Seed 6' },
  { id: 'po-sf-1', round: 'Semifinal', court: 'Court 1', time: '9:10 PM', homeLabel: 'Winner of 1/8', awayLabel: 'Winner of 4/5' },
  { id: 'po-sf-2', round: 'Semifinal', court: 'Court 2', time: '9:10 PM', homeLabel: 'Winner of 3/6', awayLabel: 'Winner of 2/7' },
  { id: 'po-final', round: 'Championship', court: 'Court 1', time: '10:10 PM', homeLabel: 'Semifinal winner', awayLabel: 'Semifinal winner' },
]

/**
 * Recorded results, keyed by match id. Match ids come from buildSchedule(),
 * assigned by each pairing's position within its week — so 'w1-m0' is the
 * first-listed week 1 match (LFG vs One Spike Man).
 */
const results: Record<string, SetScore[]> = {
  // ---------- Week 1 ----------
  // LFG vs One Spike Man — 25-20, 19-25, 13-15
  'w1-m0': [{ home: 25, away: 20 }, { home: 19, away: 25 }, { home: 13, away: 15 }],
  // Tips and Balls vs Pass and Hitties — 25-22, 25-22
  'w1-m1': [{ home: 25, away: 22 }, { home: 25, away: 22 }],
  // LFG vs Pass and Hitties — 25-21, 8-25, 12-15
  'w1-m2': [{ home: 25, away: 21 }, { home: 8, away: 25 }, { home: 12, away: 15 }],
  // Tips and Balls vs One Spike Man — 22-25, 25-23, 9-15
  'w1-m3': [{ home: 22, away: 25 }, { home: 25, away: 23 }, { home: 9, away: 15 }],
  // Goal Diggers vs Two Bump Chumps — 26-24, 25-22
  'w1-m4': [{ home: 26, away: 24 }, { home: 25, away: 22 }],
  // Smash or Pass vs Sanchovies — 25-21, 25-23
  'w1-m5': [{ home: 25, away: 21 }, { home: 25, away: 23 }],
  // Goal Diggers vs Sanchovies — 25-20, 26-28, 15-8
  'w1-m6': [{ home: 25, away: 20 }, { home: 26, away: 28 }, { home: 15, away: 8 }],
  // Smash or Pass vs Two Bump Chumps — 25-22, 22-25, 13-15
  'w1-m7': [{ home: 25, away: 22 }, { home: 22, away: 25 }, { home: 13, away: 15 }],

  // ---------- Week 2 ----------
  // LFG vs Smash or Pass — 25-20, 25-22
  'w2-m0': [{ home: 25, away: 20 }, { home: 25, away: 22 }],
  // One Spike Man vs Two Bump Chumps — 20-25, 25-22, 17-15
  'w2-m1': [{ home: 20, away: 25 }, { home: 25, away: 22 }, { home: 17, away: 15 }],
  // LFG vs Two Bump Chumps — 16-25, 19-25
  'w2-m2': [{ home: 16, away: 25 }, { home: 19, away: 25 }],
  // One Spike Man vs Smash or Pass — 25-16, 17-25, 15-11
  'w2-m3': [{ home: 25, away: 16 }, { home: 17, away: 25 }, { home: 15, away: 11 }],
  // Goal Diggers vs Pass and Hitties — 25-18, 23-25, 15-13
  'w2-m4': [{ home: 25, away: 18 }, { home: 23, away: 25 }, { home: 15, away: 13 }],
  // Sanchovies vs Tips and Balls — 25-19, 25-18
  'w2-m5': [{ home: 25, away: 19 }, { home: 25, away: 18 }],
  // Goal Diggers vs Tips and Balls — 22-25, 25-13, 14-16
  'w2-m6': [{ home: 22, away: 25 }, { home: 25, away: 13 }, { home: 14, away: 16 }],
  // Sanchovies vs Pass and Hitties — 25-23, 22-25, 15-11
  'w2-m7': [{ home: 25, away: 23 }, { home: 22, away: 25 }, { home: 15, away: 11 }],

  // ---------- Week 3 ----------
  // LFG vs Tips and Balls — 25-21, 25-20
  'w3-m0': [{ home: 25, away: 21 }, { home: 25, away: 20 }],
  // Two Bump Chumps vs Sanchovies — 25-16, 25-23
  'w3-m1': [{ home: 25, away: 16 }, { home: 25, away: 23 }],
  // LFG vs Sanchovies — Sanchovies won 26-24, 25-22 (shown home-first: LFG 24-26, 22-25)
  'w3-m2': [{ home: 24, away: 26 }, { home: 22, away: 25 }],
  // Two Bump Chumps vs Tips and Balls — Tips won 25-23, 25-18 (home-first: 23-25, 18-25)
  'w3-m3': [{ home: 23, away: 25 }, { home: 18, away: 25 }],
  // Goal Diggers vs One Spike Man — One Spike Man won 25-17, 29-27 (home-first: 17-25, 27-29)
  'w3-m4': [{ home: 17, away: 25 }, { home: 27, away: 29 }],
  // Pass and Hitties vs Smash or Pass — Smash or Pass won 25-18, 25-21 (home-first: 18-25, 21-25)
  'w3-m5': [{ home: 18, away: 25 }, { home: 21, away: 25 }],
  // Goal Diggers vs Smash or Pass — Smash or Pass won 25-23, 25-18 (home-first: 23-25, 18-25)
  'w3-m6': [{ home: 23, away: 25 }, { home: 18, away: 25 }],
  // Pass and Hitties vs One Spike Man — One Spike Man won 25-22, 25-16 (home-first: 22-25, 16-25)
  'w3-m7': [{ home: 22, away: 25 }, { home: 16, away: 25 }],

  // ---------- Week 4 ----------
  // LFG vs Pass and Hitties — P&H won 25-20, 25-19 (home-first: 20-25, 19-25)
  'w4-m0': [{ home: 20, away: 25 }, { home: 19, away: 25 }],
  // Sanchovies vs One Spike Man — OSM won 25-21, 18-25, 15-9 (home-first: 21-25, 25-18, 9-15)
  'w4-m1': [{ home: 21, away: 25 }, { home: 25, away: 18 }, { home: 9, away: 15 }],
  // LFG vs One Spike Man — reported OSM-first 25-16, 25-27, 11-15; LFG won 2-1 (home-first: 16-25, 27-25, 15-11)
  'w4-m2': [{ home: 16, away: 25 }, { home: 27, away: 25 }, { home: 15, away: 11 }],
  // Sanchovies vs Pass and Hitties — P&H won 25-14, 22-25, 15-9 (home-first: 14-25, 25-22, 9-15)
  'w4-m3': [{ home: 14, away: 25 }, { home: 25, away: 22 }, { home: 9, away: 15 }],
  // Goal Diggers vs Tips and Balls — 25-22, 27-25
  'w4-m4': [{ home: 25, away: 22 }, { home: 27, away: 25 }],
  // Smash or Pass vs Two Bump Chumps — Two Bump Chumps won 25-23, 25-22 (home-first: 23-25, 22-25)
  'w4-m5': [{ home: 23, away: 25 }, { home: 22, away: 25 }],
  // Goal Diggers vs Two Bump Chumps — 25-15, 25-20
  'w4-m6': [{ home: 25, away: 15 }, { home: 25, away: 20 }],
  // Smash or Pass vs Tips and Balls — Tips won 26-24, 25-22 (home-first: 24-26, 22-25)
  'w4-m7': [{ home: 24, away: 26 }, { home: 22, away: 25 }],

  // ---------- Week 5 ----------
  // LFG vs Smash or Pass — Smash or Pass won 25-21, 25-20 (home-first: 21-25, 20-25)
  'w5-m0': [{ home: 21, away: 25 }, { home: 20, away: 25 }],
  // Tips and Balls vs Two Bump Chumps — Two Bump Chumps won 25-20, 25-15 (home-first: 20-25, 15-25)
  'w5-m1': [{ home: 20, away: 25 }, { home: 15, away: 25 }],
  // LFG vs Two Bump Chumps — Two Bump Chumps won 25-16, 25-12 (home-first: 16-25, 12-25)
  'w5-m2': [{ home: 16, away: 25 }, { home: 12, away: 25 }],
  // Tips and Balls vs Smash or Pass — Smash or Pass won 25-16, 25-22 (home-first: 16-25, 22-25)
  'w5-m3': [{ home: 16, away: 25 }, { home: 22, away: 25 }],
  // w5-m4 Goal Diggers vs Sanchovies — double disqualification (see `forfeits`)
  // One Spike Man vs Pass and Hitties — Pass and Hitties won 25-23, 25-22 (home-first: 23-25, 22-25)
  'w5-m5': [{ home: 23, away: 25 }, { home: 22, away: 25 }],
  // w5-m6 Goal Diggers vs Pass and Hitties — Goal Diggers disqualified (see `forfeits`)
  // w5-m7 One Spike Man vs Sanchovies — Sanchovies disqualified (see `forfeits`)
}

/**
 * Matches decided by disqualification instead of a played score, keyed by
 * match id. The value is who was disqualified. See the Forfeit type for how
 * each case counts in standings.
 */
const forfeits: Record<string, Forfeit> = {
  // Goal Diggers vs Sanchovies — both disqualified, a loss for each
  'w5-m4': 'both',
  // Goal Diggers vs Pass and Hitties — Goal Diggers disqualified (home), P&H win
  'w5-m6': 'home',
  // One Spike Man vs Sanchovies — Sanchovies disqualified (away), OSM win
  'w5-m7': 'away',
}

/** Weeks whose results are final and can no longer be edited. */
export const lockedWeeks: number[] = [1, 2, 3, 4]

function buildSchedule(): Match[] {
  const byWeek = new Map<number, Array<(typeof manualPairings)[number]>>()
  manualPairings.forEach((pairing) => {
    if (!byWeek.has(pairing.week)) byWeek.set(pairing.week, [])
    byWeek.get(pairing.week)!.push(pairing)
  })

  const matches: Match[] = []
  byWeek.forEach((pairs, week) => {
    pairs.forEach((pairing, matchIndex) => {
      const id = `w${week}-m${matchIndex}`
      const sets = results[id] ?? []
      const forfeit = forfeits[id]
      matches.push({
        id,
        week,
        court: pairing.court,
        time: pairing.time,
        homeId: pairing.homeId,
        awayId: pairing.awayId,
        sets,
        forfeit,
        status: sets.length > 0 || forfeit ? 'final' : 'scheduled',
      })
    })
  })
  return matches
}

export const schedule: Match[] = buildSchedule()

export const regularSeasonWeeks = season.weeks - 1

export function matchesForWeek(all: Match[], week: number): Match[] {
  return all.filter((match) => match.week === week)
}

/** Sets won by each side, given the entered set scores. */
export function setTally(sets: SetScore[]): { home: number; away: number } {
  return sets.reduce(
    (acc, set) => {
      if (set.home > set.away) acc.home += 1
      else if (set.away > set.home) acc.away += 1
      return acc
    },
    { home: 0, away: 0 },
  )
}

/**
 * Sets credited to each side for a match. A win by disqualification counts
 * 2-0; a double disqualification credits no sets to anyone.
 */
export function matchSetTally(match: Match): { home: number; away: number } {
  if (match.forfeit === 'home') return { home: 0, away: 2 }
  if (match.forfeit === 'away') return { home: 2, away: 0 }
  if (match.forfeit === 'both') return { home: 0, away: 0 }
  return setTally(match.sets)
}

/** The winning side, or null when there is no winner (unplayed, tied, double DQ). */
export function matchWinner(match: Match): 'home' | 'away' | null {
  if (match.status !== 'final') return null
  if (match.forfeit === 'home') return 'away'
  if (match.forfeit === 'away') return 'home'
  if (match.forfeit === 'both') return null
  if (match.sets.length === 0) return null
  const tally = setTally(match.sets)
  if (tally.home === tally.away) return null
  return tally.home > tally.away ? 'home' : 'away'
}

/** "25-18 · 25-21" */
export function formatSets(sets: SetScore[]): string {
  return sets.map((set) => `${set.home}-${set.away}`).join(' · ')
}

/** What the schedule shows under a finished match: the sets, or the DQ note. */
export function formatResult(match: Match): string {
  if (match.forfeit === 'both') return 'Both teams disqualified · a loss for each'
  if (match.forfeit) return 'Win by disqualification · counts 2-0'
  return formatSets(match.sets)
}

/** The first week that still has no results, clamped to the season length. */
export function currentWeek(all: Match[]): number {
  for (let week = 1; week <= regularSeasonWeeks; week += 1) {
    if (matchesForWeek(all, week).some((match) => match.status !== 'final')) {
      return week
    }
  }
  return season.weeks
}
