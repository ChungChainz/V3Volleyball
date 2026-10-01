/**
 * Snapshot of the V3 Substitution Form responses.
 *
 * Does not drive the Sub tab any more — subs are coordinated in WhatsApp, and
 * the on-site request board was retired. Kept as the sync target for that
 * sheet so a future board can be rebuilt from the same source if needed.
 */

export interface SubRequest {
  id: string
  firstName: string
  lastName: string
  teamName: string
  gameDay: string
  submittedAt: string
}

export const subRequests: SubRequest[] = []

/**
 * Where subs and free agents coordinate between games.
 */
export const subWhatsAppInvite =
  'https://chat.whatsapp.com/LFWpzix24HAA9cnmOXQ5VL?s=cl&p=a&mlu=0'
