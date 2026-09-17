import { season } from './league'
import { teams } from './teams'

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
 * Round-robin pairings via the circle method: eight teams, seven regular
 * weeks, every team faces every other team exactly once. Week 8 is playoffs.
 */
function roundRobin(ids: string[]): Array<Array<[string, string]>> {
  const rounds: Array<Array<[string, string]>> = []
  let rotation = ids.slice(1)
  for (let r = 0; r < ids.length - 1; r += 1) {
    const arr = [ids[0], ...rotation]
    const pairs: Array<[string, string]> = []
    for (let i = 0; i < arr.length / 2; i += 1) {
      pairs.push([arr[i], arr[arr.length - 1 - i]])
    }
    rounds.push(pairs)
    rotation = [...rotation.slice(1), rotation[0]]
  }
  return rounds
}

/**
 * Recorded results, keyed by match id. Starts empty — the season has not been
 * played yet. Scores are entered through the commissioner scoresheet on the
 * Schedule tab; until then every match reads as scheduled and every team sits
 * at 0-0.
 */
const results: Record<string, SetScore[]> = {}

function buildSchedule(): Match[] {
  const rounds = roundRobin(teams.map((team) => team.id))
  const matches: Match[] = []
  rounds.forEach((pairs, roundIndex) => {
    const week = roundIndex + 1
    pairs.forEach(([homeId, awayId], matchIndex) => {
      const id = `w${week}-m${matchIndex}`
      const sets = results[id] ?? []
      matches.push({
        id,
        week,
        court: SLOTS[matchIndex].court,
        time: SLOTS[matchIndex].time,
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
