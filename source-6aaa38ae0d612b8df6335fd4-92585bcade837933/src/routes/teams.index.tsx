import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, UserPlus } from 'lucide-react'
import { teams } from '@/data/teams'
import { buildStandings } from '@/data/standings'
import { season } from '@/data/league'
import { useMatches } from '@/lib/score-store'
import { PageHeader } from '@/components/PageHeader'
import { TeamCrest } from '@/components/TeamCrest'

export const Route = createFileRoute('/teams/')({
  component: TeamsIndex,
})

function TeamsIndex() {
  const matches = useMatches()
  const standings = buildStandings(matches)
  const recordFor = (teamId: string) => standings.find((row) => row.teamId === teamId)
  const rostered = teams.reduce((total, team) => total + team.roster.length, 0)

  return (
    <>
      <PageHeader
        kicker={`${teams.length} of ${season.teamCap} teams registered`}
        title="Teams &"
        accent="Rosters"
        blurb={`${rostered} registered player${rostered === 1 ? '' : 's'} across ${teams.length} team${teams.length === 1 ? '' : 's'}. Rosters build straight from registration — tap a team for the full list.`}
        image="/img/texture-slash.png"
      />

      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
        {teams.length === 0 ? (
          <div className="plate p-10 text-center">
            <p className="kicker">No teams yet</p>
            <p className="display mt-3 text-3xl chrome">Be the first on the board</p>
            <p className="mx-auto mt-4 max-w-md text-ash">
              Teams appear here as soon as people register. Get your roster in and claim one of the{' '}
              {season.teamCap} slots.
            </p>
            <Link to="/signup" className="btn btn-blood mx-auto mt-7">
              <UserPlus size={16} /> Register a team
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {teams.map((team, index) => {
              const record = recordFor(team.id)
              return (
                <Link
                  key={team.id}
                  to="/teams/$teamId"
                  params={{ teamId: team.id }}
                  className="plate plate-hover rise group relative block overflow-hidden p-6"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div
                    className="absolute -right-8 -top-10 h-40 w-40 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.16]"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${team.colors[0]} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start gap-4">
                    <TeamCrest team={team} size={54} />
                    <div className="min-w-0 flex-1">
                      <p className="display-tight text-[1.6rem] leading-none">{team.name}</p>
                      <p className="mt-1.5 text-sm text-ash">
                        Captain {team.captain} · {team.roster.length} player
                        {team.roster.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-ash-dim transition-colors group-hover:text-blood"
                    />
                  </div>

                  <p className="mt-4 line-clamp-2 text-ash">{team.bio}</p>

                  <div className="mt-5 flex items-center gap-6 border-t border-[var(--edge)] pt-4">
                    <div>
                      <p className="kicker text-[0.58rem]">Record</p>
                      <p className="num mt-0.5 text-lg font-bold">
                        {record ? `${record.wins}-${record.losses}` : '0-0'}
                      </p>
                    </div>
                    <div>
                      <p className="kicker text-[0.58rem]">Sets</p>
                      <p className="num mt-0.5 text-lg text-ash">
                        {record ? `${record.setsWon}-${record.setsLost}` : '0-0'}
                      </p>
                    </div>
                    <div>
                      <p className="kicker text-[0.58rem]">Streak</p>
                      <p className="num mt-0.5 text-lg text-blood">{record?.streak ?? '—'}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
