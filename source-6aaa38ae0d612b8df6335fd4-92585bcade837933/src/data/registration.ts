/**
 * Snapshot of the V3 Registration Form responses.
 *
 * Source: "V3 Registration Form (Responses)" — tab "Form Responses 1"
 * https://docs.google.com/spreadsheets/d/1NcwyUv1Gjg-9pITxTyhKLf48xbFS3W7gz7R1fdOV1SM
 *
 * Columns consumed: First Name, Last Name, Teams Name.
 * Team names are normalized here (the sheet has inconsistent casing and
 * stray whitespace, and rows differing by a character would otherwise split
 * into separate teams on the site).
 */

export interface RegistrationRow {
  firstName: string
  lastName: string
  teamName: string
  registeredAt: string
}

export const registrationTeams: RegistrationRow[] = [
  // ---------- Smash or Pass ----------
  {
    firstName: 'Jeveric',
    lastName: 'Medina',
    teamName: 'Smash or Pass',
    registeredAt: '2026-09-16T16:32:10',
  },
  {
    firstName: 'Antoine',
    lastName: 'Boado',
    teamName: 'Smash or Pass',
    registeredAt: '2026-09-16T16:57:17',
  },
  {
    firstName: 'Andrea',
    lastName: 'Morris-Marshall',
    teamName: 'Smash or Pass',
    registeredAt: '2026-09-16T18:17:08',
  },
  {
    firstName: 'Victoria',
    lastName: 'Tremillo-Romero',
    teamName: 'Smash or Pass',
    registeredAt: '2026-09-16T18:35:54',
  },
  {
    firstName: 'Kody',
    lastName: 'Thompson',
    teamName: 'Smash or Pass',
    registeredAt: '2026-09-20T01:29:16',
  },

  // ---------- One Spike Man ----------
  {
    firstName: 'Senki',
    lastName: 'Yasui',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T11:05:23',
  },
  {
    firstName: 'Hong-Kook',
    lastName: 'Matsunaga',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T11:06:15',
  },
  {
    firstName: 'Sisa',
    lastName: 'Hirano',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T11:08:01',
  },
  {
    firstName: 'Tatsuyo',
    lastName: 'Lee',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T11:12:28',
  },
  {
    firstName: 'Takuya',
    lastName: 'Ogasawara',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T11:14:26',
  },
  {
    firstName: 'Yosuke',
    lastName: 'Mizuguchi',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T13:07:17',
  },
  {
    firstName: 'Lexi',
    lastName: 'Perry',
    teamName: 'One Spike Man',
    registeredAt: '2026-09-18T13:27:48',
  },

  // ---------- Tips and Balls ----------
  {
    firstName: 'Lei-Marie',
    lastName: 'Gacho',
    teamName: 'Tips and Balls',
    registeredAt: '2026-09-19T10:53:25',
  },

  // ---------- Free Agents ----------
  // "Free agent chat 4" is the same free-agent pool as "Free Agents" — the
  // sheet wording varies, so both normalize to one team here.
  {
    firstName: 'Daynaai',
    lastName: 'Spencer',
    teamName: 'Free Agents',
    registeredAt: '2026-09-19T17:57:59',
  },
  {
    firstName: 'Viktor',
    lastName: 'Kunder',
    teamName: 'Free Agents',
    registeredAt: '2026-09-19T21:17:38',
  },
  {
    firstName: 'Chris',
    lastName: 'Molis',
    teamName: 'Free Agents',
    registeredAt: '2026-09-22T00:16:08',
  },
]
