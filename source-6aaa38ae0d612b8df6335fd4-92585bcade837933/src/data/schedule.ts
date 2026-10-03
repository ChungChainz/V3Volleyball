import { season } from './league'

export interface SetScore {
  home: number
  away: number
}

export type MatchStatus = 'final' | 'scheduled'

export interface Match {
  id: string
  week: number
  court: string
  time: string
  homeId: string
  awayId: string
  sets: SetScore[]
  status: MatchStatus
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
 * Recorded results, keyed by match id. Starts empty — the season has not been
 * played yet. Scores are entered through the commissioner scoresheet on the
 * Schedule tab; until then every match reads as scheduled and every team sits
 * at 0-0.
 */
const results: Record<string, SetScore[]> = {}

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
      matches.push({
        id,
        week,
        court: pairing.court,
        time: pairing.time,
        homeId: pairing.homeId,
        awayId: pairing.awayId,
        sets,
        status: sets.length > 0 ? 'final' : 'scheduled',
      })
    })
  })
  return matches
}

export const schedule: Match[] = buildSchedule()

// Playoff night (week 8 / Nov 21) kicks off at the same 7:10 PM start time as
// the rest of the season, per the flyer.
export const playoffBracket: PlayoffSlot[] = [
  { id: 'po-sf1', round: 'Semifinal', court: 'Court A', time: '7:10 PM', homeLabel: 'Seed 1', awayLabel: 'Seed 4' },
  { id: 'po-sf2', round: 'Semifinal', court: 'Court B', time: '7:10 PM', homeLabel: 'Seed 2', awayLabel: 'Seed 3' },
  { id: 'po-3rd', round: 'Third place', court: 'Court B', time: '8:40 PM', homeLabel: 'SF1 loser', awayLabel: 'SF2 loser' },
  { id: 'po-final', round: 'Championship', court: 'Court A', time: '8:40 PM', homeLabel: 'SF1 winner', awayLabel: 'SF2 winner' },
]

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

export function matchWinner(match: Match): 'home' | 'away' | null {
  if (match.status !== 'final' || match.sets.length === 0) return null
  const tally = setTally(match.sets)
  if (tally.home === tally.away) return null
  return tally.home > tally.away ? 'home' : 'away'
}

/** "25-18, 25-21" */
export function formatSets(sets: SetScore[]): string {
  return sets.map((set) => `${set.home}-${set.away}`).join(' · ')
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
