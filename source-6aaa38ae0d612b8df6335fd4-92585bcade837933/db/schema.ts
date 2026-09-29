import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export interface SetScoreRow {
  home: number
  away: number
}

/**
 * One row per match that has a recorded result. Matches without a row fall
 * back to the static fixture in src/data/schedule.ts.
 */
export const matchResults = pgTable('match_results', {
  matchId: text('match_id').primaryKey(),
  sets: jsonb('sets').$type<SetScoreRow[]>().notNull().default([]),
  status: text('status', { enum: ['final', 'scheduled'] }).notNull().default('scheduled'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
