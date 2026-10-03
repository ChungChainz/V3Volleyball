/**
 * Sub requests for the current game week, pulled from the V3 Substitution
 * Form. Surfaced on the Sub tab so captains can see who has signed up to
 * cover a night.
 *
 * Source: "V3 Substitution From (Responses)"
 * https://docs.google.com/spreadsheets/d/1bE2LLY3xeykpVeWrt_e9tJByykgPDyxs2dHspylQgkk
 *
 * The sheet writes teams and dates freehand, so both are normalized here to
 * the league's own team names and a short date label. Re-sync as new
 * responses land.
 */

export interface SubRequest {
  id: string
  player: string
  /** Team they are covering for, normalized to the league's team name. */
  team: string
  /** Short label for the game night, e.g. "Oct 3rd". */
  date: string
}

/** The game week these requests belong to. */
export const subRequestWeek = 'Oct 3rd'

export const subRequests: SubRequest[] = [
  { id: 'sub-1', player: 'Tony Savea', team: 'Smash or Pass', date: 'Oct 3rd' },
  { id: 'sub-2', player: 'Conner Lear', team: 'Tips and Balls', date: 'Oct 3rd' },
  { id: 'sub-3', player: 'Carlos Tamayo', team: 'Tips and Balls', date: 'Oct 3rd' },
  { id: 'sub-4', player: 'Ethan Sena', team: 'Tips and Balls', date: 'Oct 3rd' },
]

/**
 * Where subs and free agents coordinate between games.
 */
export const subWhatsAppInvite =
  'https://chat.whatsapp.com/LFWpzix24HAA9cnmOXQ5VL?s=cl&p=a&mlu=0'
