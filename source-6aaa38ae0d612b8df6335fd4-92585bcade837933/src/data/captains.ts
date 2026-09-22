/**
 * Team captains, keyed by the team's slug id (see src/data/teams.ts).
 *
 * Captains are assigned by the league, not read from the registration form —
 * the form collects players, not roles. A team missing from this map falls
 * back to the first player listed on its roster.
 *
 * Only captains confirmed so far appear here; the rest are added as those
 * people register.
 */
export const captains: Record<string, string> = {
  'smash-or-pass': 'Jeveric Medina',
  'one-spike-man': 'Sisa Hirano',
  'tips-and-balls': 'Lei Gacho',
  'free-agents': 'Noah Ahina',
}
