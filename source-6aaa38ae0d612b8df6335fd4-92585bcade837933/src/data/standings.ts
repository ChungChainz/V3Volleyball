import type { Match } from './schedule'
import { matchSetTally, matchWinner } from './schedule'
import { teams } from './teams'

export interface StandingsRow {
  teamId: string
  played: number
  wins: number
  losses: number
  setsWon: number
  setsLost: number
  pointsFor: number
  pointsAgainst: number
  setDiff: number
  pointDiff: number
  /** Most recent results, newest first: 'W' or 'L'. */
  form: Array<'W' | 'L'>
  streak: string
}

/**
 * Standings are always derived from match results — never stored separately.
 * Enter a score on the schedule tab and the table below recalculates.
 * Order: match wins, then set differential, then point differential.
 *
 * Disqualifications: a win by DQ counts as a 2-0 set win with no points added
 * to the point differential; a double DQ gives each team a loss and adds
 * nothing to sets or points.
 */
export function buildStandings(matches: Match[]): StandingsRow[] {
  const rows = new Map<string, StandingsRow>(
    teams.map((team) => [
      team.id,
      {
        teamId: team.id,
        played: 0,
        wins: 0,
        losses: 0,
        setsWon: 0,
        setsLost: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        setDiff: 0,
        pointDiff: 0,
        form: [],
        streak: '—',
      },
    ]),
  )

  const ordered = [...matches].sort((a, b) => a.week - b.week)

  for (const match of ordered) {
    if (match.status !== 'final') continue
    const home = rows.get(match.homeId)
    const away = rows.get(match.awayId)
    if (!home || !away) continue

    // Double disqualification: a loss for both, nothing else.
    if (match.forfeit === 'both') {
      home.played += 1
      away.played += 1
      home.losses += 1
      away.losses += 1
      home.form.unshift('L')
      away.form.unshift('L')
      continue
    }

    const winner = matchWinner(match)
    if (!winner) continue

    const sets = matchSetTally(match)
    // A win by disqualification has no played sets, so no points.
    const points = match.sets.reduce(
      (acc, set) => ({ home: acc.home + set.home, away: acc.away + set.away }),
      { home: 0, away: 0 },
    )

    home.played += 1
    away.played += 1
    home.setsWon += sets.home
    home.setsLost += sets.away
    away.setsWon += sets.away
    away.setsLost += sets.home
    home.pointsFor += points.home
    home.pointsAgainst += points.away
    away.pointsFor += points.away
    away.pointsAgainst += points.home

    if (winner === 'home') {
      home.wins += 1
      away.losses += 1
      home.form.unshift('W')
      away.form.unshift('L')
    } else {
      away.wins += 1
      home.losses += 1
      away.form.unshift('W')
      home.form.unshift('L')
    }
  }

  return [...rows.values()]
    .map((row) => {
      const streakChar = row.form[0]
      let run = 0
      while (run < row.form.length && row.form[run] === streakChar) run += 1
      return {
        ...row,
        setDiff: row.setsWon - row.setsLost,
        pointDiff: row.pointsFor - row.pointsAgainst,
        form: row.form.slice(0, 5),
        streak: streakChar ? `${streakChar}${run}` : '—',
      }
    })
    .sort(
      (a, b) =>
        b.wins - a.wins ||
        b.setDiff - a.setDiff ||
        b.pointDiff - a.pointDiff ||
        a.teamId.localeCompare(b.teamId),
    )
}
