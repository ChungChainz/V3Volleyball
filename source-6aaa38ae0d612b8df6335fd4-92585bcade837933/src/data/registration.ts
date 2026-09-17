/**
 * Snapshot of the V3 Registration Form responses.
 *
 * Source: "V3 Registration Form (Responses)" — tab "Form Responses 1"
 * https://docs.google.com/spreadsheets/d/1NcwyUv1Gjg-9pITxTyhKLf48xbFS3W7gz7R1fdOV1SM
 *
 * Columns consumed: First Name, Last Name, Teams Name.
 * Re-sync this file when new registration rows land.
 */

export interface RegistrationRow {
  firstName: string
  lastName: string
  teamName: string
  registeredAt: string
}

export const registrationTeams: RegistrationRow[] = [
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
]
