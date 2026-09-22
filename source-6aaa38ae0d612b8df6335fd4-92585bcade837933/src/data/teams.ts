/**
 * League teams, sourced from the V3 registration form (Google Sheets).
 *
 * Teams are built from registration rows; captains come from the separate
 * captains map so a name can be assigned without editing the form. Roster
 * entries carry a name only — positions and numbers are assigned on the
 * court, not at registration.
 *
 * Sheet: "V3 Registration Form (Responses)" — tab "Form Responses 1"
 * Columns used: First Name, Last Name, Teams Name
 */
import { registrationTeams } from './registration'
import { captains } from './captains'

export type Position = 'OH' | 'OPP' | 'MB' | 'S' | 'L' | 'DS'

export interface Player {
  id: string
  name: string
  number?: number
  position?: Position
  captain?: boolean
  note?: string
}

export interface Team {
  id: string
  name: string
  abbr: string
  /** Two-tone crest colors, used for the generated jersey mark. */
  colors: [string, string]
  captain: string
  founded: number
  bio: string
  roster: Player[]
}

function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function abbrFor(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function titleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      word
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('-'),
    )
    .join(' ')
}

// Crest accents cycle through the flyer palette so real teams still read as
// part of the V3 look.
const CREST_COLORS: Array<[string, string]> = [
  ['#D01018', '#2A2A30'],
  ['#E8E8EC', '#1B1B20'],
  ['#C8862A', '#16161A'],
  ['#1F6F6B', '#131316'],
  ['#6A2C8F', '#151218'],
  ['#2B6CB0', '#121419'],
]

/**
 * Groups registration rows by team name. Players who registered for the same
 * team collapse into one roster. The captain is taken from the captains map
 * when one is assigned; otherwise the first registered player is shown.
 */
function buildTeams(): Team[] {
  const grouped = new Map<string, Array<{ first: string; last: string }>>()

  registrationTeams.forEach((row) => {
    const key = row.teamName.trim()
    if (!key) return
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push({ first: row.firstName, last: row.lastName })
  })

  const built: Team[] = []
  let colorIndex = 0

  grouped.forEach((players, teamName) => {
    const id = slug(teamName)
    const assignedCaptain = captains[id]
    const roster: Player[] = players.map((player, index) => {
      const name = titleCase(`${player.first} ${player.last}`)
      return {
        id: `${id}-${index + 1}`,
        name,
        // Captains are league-assigned, not positional in registration order.
        captain: assignedCaptain ? name === assignedCaptain : index === 0,
      }
    })

    const displayName = titleCase(teamName)

    built.push({
      id,
      name: displayName,
      abbr: abbrFor(teamName),
      colors: CREST_COLORS[colorIndex % CREST_COLORS.length],
      captain: assignedCaptain ?? roster[0]?.name ?? 'TBD',
      founded: 2026,
      bio: `${roster.length} player${roster.length === 1 ? '' : 's'} registered for ${displayName}.`,
      roster,
    })
    colorIndex += 1
  })

  return built.sort((a, b) => a.name.localeCompare(b.name))
}

export const teams: Team[] = buildTeams()

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
