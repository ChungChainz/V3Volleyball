/**
 * Sub sign-ups, pulled from the V3 Substitution Form.
 *
 * Source: "V3 Substitution From (Responses)"
 * https://docs.google.com/spreadsheets/d/1bE2LLY3xeykpVeWrt_e9tJByykgPDyxs2dHspylQgkk
 *
 * The sheet writes teams and dates freehand, so both are normalized here to
 * the league's own team names and one of the season's short date labels.
 * Every response is kept — the Sub tab filters them by the selected night.
 */

export interface SubRequest {
  id: string
  player: string
  /** Team they are covering for, normalized to the league's team name. */
  team: string
  /** Game night this sub is covering, as a short label from subWeeks. */
  date: string
}

/**
 * Every game night of the season, newest responses land against one of these.
 * Used as the filter options on the Sub tab.
 */
export const subWeeks: string[] = [
  'Oct 3rd',
  'Oct 10th',
  'Oct 17th',
  'Oct 24th',
  'Oct 31st',
  'Nov 7th',
  'Nov 14th',
  'Nov 21st',
]

/** Which game night the Sub tab opens on. */
export const currentSubWeek = 'Oct 10th'

export const subRequests: SubRequest[] = [
  // ---------- Week 1 — Oct 3rd ----------
  { id: 'sub-1', player: 'Tony Savea', team: 'Smash or Pass', date: 'Oct 3rd' },
  { id: 'sub-2', player: 'Conner Lear', team: 'Tips and Balls', date: 'Oct 3rd' },
  { id: 'sub-3', player: 'Carlos Tamayo', team: 'Tips and Balls', date: 'Oct 3rd' },
  { id: 'sub-4', player: 'Ethan Sena', team: 'Tips and Balls', date: 'Oct 3rd' },
  { id: 'sub-5', player: 'Jasmine Waugh', team: 'Two Bump Chumps', date: 'Oct 3rd' },
  { id: 'sub-6', player: 'Tara Sanchez', team: 'Pass and Hitties', date: 'Oct 3rd' },
  { id: 'sub-7', player: 'Loui Guevara', team: 'Pass and Hitties', date: 'Oct 3rd' },
  { id: 'sub-8', player: 'Tyler Divis', team: 'Two Bump Chumps', date: 'Oct 3rd' },
]

/**
 * Where subs and free agents coordinate between games.
 */
export const subWhatsAppInvite =
  'https://chat.whatsapp.com/LFWpzix24HAA9cnmOXQ5VL?s=cl&p=a&mlu=0'
