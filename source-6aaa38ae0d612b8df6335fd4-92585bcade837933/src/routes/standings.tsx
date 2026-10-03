import { Link, createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/PageHeader'
import { TeamCrest } from '@/components/TeamCrest'
import { teamById } from '@/data/teams'
import { buildStandings } from '@/data/standings'
import { useMatches } from '@/lib/score-store'

export const Route = createFileRoute('/standings')({
  component: StandingsPage,
})

function StandingsPage() {
  const matches = useMatches()
  const standings = buildStandings(matches)

  return (
    <>
      <PageHeader
        kicker="Every point counts"
        title="The"
        accent="Table"
        blurb="Ranked by match wins, then set differential, then point differential. The table recalculates the moment a score is entered on the schedule."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="plate overflow-hidden">
          {standings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="display text-2xl chrome">Everyone is 0-0</p>
              <p className="mx-auto mt-3 max-w-md text-ash">
                Standings fill in once week 1 results are posted.
              </p>
            </div>
          ) : (
            <table className="sheet">
              <thead>
                <tr>
                  <th className="w-10">#</th>
                  <th>Team</th>
                  <th className="text-right">W</th>
                  <th className="text-right">L</th>
                  <th className="text-right">Sets</th>
                  <th className="text-right">Streak</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, index) => {
                  const team = teamById(row.teamId)
                  if (!team) return null
                  return (
                    <tr key={row.teamId}>
                      <td className="num text-sm text-ash-dim">{index + 1}</td>
                      <td>
                        <Link
                          to="/teams/$teamId"
                          params={{ teamId: team.id }}
                          className="flex items-center gap-3 font-semibold transition-colors hover:text-blood"
                        >
                          <TeamCrest team={team} size={28} />
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </td>
                      <td className="num text-right font-bold">{row.wins}</td>
                      <td className="num text-right text-ash">{row.losses}</td>
                      <td className="num text-right text-ash">
                        {row.setsWon}-{row.setsLost}
                      </td>
                      <td className="num text-right text-blood">{row.streak}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 text-sm text-ash">
          Standings update as scores are entered on the schedule. Tiebreakers run in order: match
          wins, set differential, point differential.
        </p>
      </section>
    </>
  )
}
