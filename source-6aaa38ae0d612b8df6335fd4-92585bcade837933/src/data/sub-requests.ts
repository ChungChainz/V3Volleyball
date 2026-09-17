/**
 * Snapshot of the V3 Substitution Form responses.
 *
 * Source: "V3 Substitution From (Responses)" — tab "Form Responses 1"
 * https://docs.google.com/spreadsheets/d/1bE2LLY3xeykpVeWrt_e9tJByykgPDyxs2dHspylQgkk
 *
 * Columns consumed: First Name, Last Name, Team your Subbing For,
 * "What game day your subbing on?".
 *
 * The sheet is currently empty — the Free Agent Subs table renders an empty
 * state until the first sub request lands. Re-sync this file when rows appear.
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
