/**
 * Team captains, keyed by the team's slug id (see src/data/teams.ts).
 *
 * Captains are assigned by the league, not read from the registration form —
 * the form collects players, not roles. A team missing from this map falls
 * back to the first player listed on its roster.
 */
export const captains: Record<string, string> = {
  'smash-or-pass': 'Jeveric Medina',
  'one-spike-man': 'Sisa Hirano',
  'tips-and-balls': 'Lei Gacho',
  'pass-and-hitties': 'Nichole Kazimirovicz',
  'two-bump-chumps': 'Noah Ahina',
  'goal-diggers': 'Adian',
  'lfg': 'Max',
  'sanchovies': 'Sancho',
}
