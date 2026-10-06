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
 * Recorded results, keyed by match id. Match ids are assigned by
 * buildSchedule() from each pairing's position within its week, so 'w1-m0'
 * is the first-listed week 1 match (LFG vs One Spike Man).
 */
const results: Record<string, SetScore[]> = {
  // ---------- Week 1 ----------
  // LFG vs One Spike Man — 25-20, 19-25, 13-15 (One Spike Man wins)
  'w1-m0': [{ home: 25, away: 20 }, { home: 19, away: 25 }, { home: 13, away: 15 }],
  // Tips and Balls vs Pass and Hitties — 25-22, 25-22
  'w1-m1': [{ home: 25, away: 22 }, { home: 25, away: 22 }],
  // LFG vs Pass and Hitties — 25-21, 8-25, 12-15 (Pass and Hitties wins)
  'w1-m2': [{ home: 25, away: 21 }, { home: 8, away: 25 }, { home: 12, away: 15 }],
  // Tips and Balls vs One Spike Man — 22-25, 25-23, 9-15 (One Spike Man wins)
  'w1-m3': [{ home: 22, away: 25 }, { home: 25, away: 23 }, { home: 9, away: 15 }],
  // Goal Diggers vs Two Bump Chumps — 26-24, 25-22
  'w1-m4': [{ home: 26, away: 24 }, { home: 25, away: 22 }],
  // Smash or Pass vs Sanchovies — 25-21, 25-23
  'w1-m5': [{ home: 25, away: 21 }, { home: 25, away: 23 }],
  // Goal Diggers vs Sanchovies — 25-20, 26-28, 15-8 (Goal Diggers wins)
  'w1-m6': [{ home: 25, away: 20 }, { home: 26, away: 28 }, { home: 15, away: 8 }],
  // Smash or Pass vs Two Bump Chumps — 25-22, 22-25, 13-15 (Two Bump Chumps wins)
  'w1-m7': [{ home: 25, away: 22 }, { home: 22, away: 25 }, { home: 13, away: 15 }],
}

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

/** "25-18 · 25-21" */
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
