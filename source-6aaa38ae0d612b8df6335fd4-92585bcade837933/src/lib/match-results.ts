import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../../db/index'
import { matchResults } from '../../db/schema'
import type { MatchStatus, SetScore } from '@/data/schedule'
import { schedule } from '@/data/schedule'

export interface MatchResult {
  matchId: string
  sets: SetScore[]
  status: MatchStatus
}

const knownMatchIds = new Set(schedule.map((match) => match.id))

const matchIdSchema = z
  .string()
  .refine((id) => knownMatchIds.has(id), { message: 'Unknown match id' })

const setScoreSchema = z.object({
  home: z.number().int().min(0).max(99),
  away: z.number().int().min(0).max(99),
})

/** Every saved result. Matches with no row keep their static fixture. */
export const getMatchResults = createServerFn({ method: 'GET' }).handler(
  async (): Promise<MatchResult[]> => {
    const rows = await db
      .select({ matchId: matchResults.matchId, sets: matchResults.sets, status: matchResults.status })
      .from(matchResults)
    return rows.filter((row) => knownMatchIds.has(row.matchId))
  },
)

/** Only sets with a real, non-tied score count toward the result. */
export const saveMatchResult = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ matchId: matchIdSchema, sets: z.array(setScoreSchema).max(5) }))
  .handler(async ({ data }): Promise<MatchResult> => {
    const sets = data.sets.filter((set) => set.home !== set.away && (set.home > 0 || set.away > 0))
    const status: MatchStatus = sets.length > 0 ? 'final' : 'scheduled'
    const updatedAt = new Date()
    await db
      .insert(matchResults)
      .values({ matchId: data.matchId, sets, status, updatedAt })
      .onConflictDoUpdate({ target: matchResults.matchId, set: { sets, status, updatedAt } })
    return { matchId: data.matchId, sets, status }
  })

export const clearMatchResult = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ matchId: matchIdSchema }))
  .handler(async ({ data }): Promise<{ matchId: string }> => {
    await db.delete(matchResults).where(eq(matchResults.matchId, data.matchId))
    return { matchId: data.matchId }
  })
