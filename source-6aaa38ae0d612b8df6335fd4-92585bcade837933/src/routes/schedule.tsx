import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Lock } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { ScoreSheet } from '@/components/ScoreSheet'
import { formatWeekDate, season } from '@/data/league'
import { teamById } from '@/data/teams'
import {
  formatSets,
  matchesForWeek,
  matchWinner,
  regularSeasonWeeks,
} from '@/data/schedule'
import { useMatches } from '@/lib/score-store'

export const Route = createFileRoute('/schedule')({
  component: SchedulePage,
})

/**
 * Whether a week's scoresheet is open.
 *
 * The button only appears once that week's game date has arrived, so nobody
 * can pre-fill a result before the night is played. It stays open afterward
 * on purpose — a score entered late on Sunday is better than one never
 * entered at all.
 */
function weekHasArrived(week: number): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today.getTime() >= weekDate(week).getTime()
}

function weekDate(week: number): Date {
  const start = new Date(`${season.startsOn}T00:00:00`)
  start.setDate(start.getDate() + (week - 1) * 7)
  start.setHours(0, 0, 0, 0)
  return start
}

/**
 * Late slots only start on time if the earlier matches finish on schedule, so
 * 9:10 and 10:10 are labelled approximate. The 7:10 and 8:10 rows stay exact.
 */
function slotLabel(time: string): string {
  const hour = Number.parseInt(time, 10)
  return hour >= 9 ? `Approximately ${time}` : time
}

function SchedulePage() {
  const matches = useMatches()
  const [week, setWeek] = useState(1)
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null)

  const isPlayoffWeek = week === season.weeks
  const weekMatches = isPlayoffWeek ? [] : matchesForWeek(matches, week)
  const openForScoring = weekHasArrived(week)

  return (
    <>
      <PageHeader
        kicker="Eight weeks, one champion"
        title="Game"
        accent="Dates"
        blurb="Every Saturday night. Two courts, four matches, best-of-three sets. Week 8 is playoffs — the bracket is set once the regular season wraps."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        {/* Timing note */}
        <div className="plate flex items-start gap-4 p-5">
          <Clock size={22} className="mt-0.5 shrink-0 text-blood" />
          <div>
            <p className="font-bold uppercase tracking-[0.1em]">Arrive early</p>
            <p className="mt-1 text-ash">
              Teams who play at 9:10, arrive by 8:40pm to warm-up and play (in case 8:10pm
              games finish early).
            </p>
          </div>
        </div>

        {/* Week selector */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setWeek((w) => Math.max(1, w - 1))}
            disabled={week === 1}
            className="btn btn-steel !px-3 disabled:opacity-30"
            aria-label="Previous week"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="text-center">
            <p className="kicker">
              {isPlayoffWeek ? 'Playoffs' : `Week ${week} of ${regularSeasonWeeks}`}
            </p>
            <p className="display mt-1 text-3xl chrome">
              {isPlayoffWeek ? 'Nov 21st' : formatWeekDate(week)}
            </p>
            {!isPlayoffWeek && (
              <p className="num mt-1 text-sm text-blood">First serve at 7:10 PM</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setWeek((w) => Math.min(season.weeks, w + 1))}
            disabled={week === season.weeks}
            className="btn btn-steel !px-3 disabled:opacity-30"
            aria-label="Next week"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="slash-rule mx-auto mt-6 w-32" />

        {/* Matches, playoff placeholder, or empty week */}
        {isPlayoffWeek ? (
          <div className="plate mt-10 px-6 py-16 text-center">
            <p className="kicker">November 21</p>
            <p className="display mt-3 text-3xl chrome">Playoff bracket pending</p>
            <p className="mx-auto mt-4 max-w-lg text-ash">
              The playoff format will be added very soon!
            </p>
          </div>
        ) : weekMatches.length === 0 ? (
          <div className="plate mt-10 px-6 py-14 text-center">
            <p className="display text-2xl chrome">Matchups coming soon</p>
            <p className="mx-auto mt-3 max-w-md text-ash">
              This week's slate is still being set. Check back once the remaining teams are locked in.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {weekMatches.map((match) => {
              const home = teamById(match.homeId)
              const away = teamById(match.awayId)
              if (!home || !away) return null

              const winner = matchWinner(match)
              const isEditing = editingMatchId === match.id

              return (
                <div key={match.id} className="plate overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                    <div className="flex items-center gap-4">
                      <div className="min-w-[7rem] text-center">
                        <p className="num text-xs text-ash">{slotLabel(match.time)}</p>
                        <p className="kicker text-[0.58rem]">{match.court}</p>
                      </div>
                      <div className="h-10 w-px bg-[var(--edge)]" />
                      <div>
                        <div className="flex items-center gap-3">
                          <span className={`font-semibold ${winner === 'home' ? 'text-blood' : ''}`}>
                            {home.name}
                          </span>
                          <span className="text-ash-dim">vs</span>
                          <span className={`font-semibold ${winner === 'away' ? 'text-blood' : ''}`}>
                            {away.name}
                          </span>
                        </div>
                        {match.status === 'final' && (
                          <p className="num mt-1 text-sm text-ash">{formatSets(match.sets)}</p>
                        )}
                      </div>
                    </div>

                    {/* Only shown once the game date has arrived. */}
                    {openForScoring ? (
                      <button
                        type="button"
                        onClick={() => setEditingMatchId(isEditing ? null : match.id)}
                        className="btn btn-steel !px-4 !py-2 text-xs"
                      >
                        {match.status === 'final' ? 'Edit score' : 'Enter score'}
                      </button>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ash-dim">
                        <Lock size={13} /> Opens game day
                      </span>
                    )}
                  </div>

                  {isEditing && (
                    <ScoreSheet
                      match={match}
                      onClose={() => setEditingMatchId(null)}
                    />
                  )}
                </div>
              )
            })}

            {!openForScoring && (
              <p className="text-center text-sm text-ash">
                Score entry opens on {formatWeekDate(week)}. Nothing can be entered before the
                night is played.
              </p>
            )}
          </div>
        )}

        {/* Flyer-style date strip */}
        <div className="mt-16 border-t border-[var(--edge)] pt-10">
          <p className="kicker">Full season calendar</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {[
              { w: 1, d: 'Oct 3', note: '' },
              { w: 2, d: 'Oct 10', note: '' },
              { w: 3, d: 'Oct 17', note: '' },
              { w: 4, d: 'Oct 24', note: '' },
              { w: 5, d: 'Oct 31', note: '' },
              { w: 6, d: 'Nov 7', note: '' },
              { w: 7, d: 'Nov 14', note: '' },
              { w: 8, d: 'Nov 21', note: 'Playoffs' },
            ].map((item) => (
              <button
                key={item.w}
                type="button"
                onClick={() => setWeek(item.w)}
                className={`plate p-4 text-center transition-colors ${
                  week === item.w ? 'border-blood bg-[rgba(208,16,24,0.08)]' : ''
                }`}
              >
                <CalendarDays size={16} className="mx-auto text-blood" />
                <p className="display mt-2 text-lg">{item.d}</p>
                <p className="num mt-1 text-[0.65rem] text-ash">
                  {item.note || `Week ${item.w}`}
                </p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-ash">
            All regular-season games start at 7:10 PM. Teams playing the 9:10 slot should arrive
            by 8:40 PM to warm up. Please plan accordingly.
          </p>
        </div>
      </section>
    </>
  )
}
