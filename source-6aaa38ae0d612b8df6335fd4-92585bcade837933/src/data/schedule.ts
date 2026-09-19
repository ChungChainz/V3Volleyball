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

// Game night per the Vegas Vendetta flyer: every match night starts at 7:10 PM.
// Two courts run in parallel, so the back half of the slate starts once the
// first matches clear the courts.
const SLOTS = [
  { court: 'Court A', time: '7:10 PM' },
  { court: 'Court B', time: '7:10 PM' },
  { court: 'Court A', time: '8:30 PM' },
  { court: 'Court B', time: '8:30 PM' },
]

/**
 * Matchups are entered by hand once every team has registered — the
 * commissioner matches teams up manually rather than an auto-generated
 * round robin, so a partial roster of teams never produces a premature
 * pairing. Empty for now: the Schedule tab renders its own empty state
 * until this list is filled in.
 *
 * Shape once filled in:
 *   { week: 1, homeId: 'team-a', awayId: 'team-b' }
 * homeId/awayId must match a team's `id` in src/data/teams.ts.
 */
const manualPairings: Array<{ week: number; homeId: string; awayId: string }> = []

/**
 * Recorded results, keyed by match id. Starts empty — the season has not been
 * played yet. Scores are entered through the commissioner scoresheet on the
 * Schedule tab; until then every match reads as scheduled and every team sits
 * at 0-0.
 */
const results: Record<string, SetScore[]> = {}

function buildSchedule(): Match[] {
  const byWeek = new Map<number, Array<{ homeId: string; awayId: string }>>()
  manualPairings.forEach(({ week, homeId, awayId }) => {
    if (!byWeek.has(week)) byWeek.set(week, [])
    byWeek.get(week)!.push({ homeId, awayId })
  })

  const matches: Match[] = []
  byWeek.forEach((pairs, week) => {
    pairs.forEach(({ homeId, awayId }, matchIndex) => {
      const id = `w${week}-m${matchIndex}`
      const sets = results[id] ?? []
      const slot = SLOTS[matchIndex % SLOTS.length]
      matches.push({
        id,
        week,
        court: slot.court,
        time: slot.time,
        homeId,
        awayId,
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
  return sets.map((set) => `${set.home}-${set.away}`).join(', ')
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
