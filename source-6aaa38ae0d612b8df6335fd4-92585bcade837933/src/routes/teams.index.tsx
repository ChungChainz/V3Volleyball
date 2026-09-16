import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, UserPlus } from 'lucide-react'
import { freeAgents, positionLabels, teams } from '@/data/teams'
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
        kicker={`${teams.length} of ${season.teamCap} slots filled`}
        title="Teams &"
        accent="Rosters"
        blurb={`${rostered} rostered players across ${teams.length} teams. Captains run their own lineups — tap a team for the full roster, position by position.`}
        image="/img/texture-slash.png"
      />

      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
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
                      Captain {team.captain} · {team.roster.length} players
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
                  <div className="ml-auto flex flex-wrap justify-end gap-1">
                    {[...new Set(team.roster.map((player) => player.position))].map((position) => (
                      <span
                        key={position}
                        className="num border border-[var(--edge)] px-1.5 py-0.5 text-[0.62rem] text-ash"
                      >
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ---------- Free agent pool ---------- */}
      <section className="border-t border-[var(--edge)] bg-ink-2">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="kicker">Unrostered</p>
              <h2 className="display mt-2 text-5xl">
                <span className="chrome">Free</span> <span className="bloodfill">Agents</span>
              </h2>
              <div className="slash-rule mt-4 w-28" />
              <p className="mt-5 text-ash">
                Players looking for a roster. Captains short a body on a Saturday pull from this
                list first. Want on it? Pay the free agent buy-in and sign the waiver.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/pay" className="btn btn-blood">
                  <UserPlus size={16} /> Join the pool
                </Link>
                <Link to="/waiver" className="btn btn-steel">
                  Sign waiver
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="plate overflow-hidden">
                <table className="sheet">
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Position</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freeAgents.map((player) => (
                      <tr key={player.id}>
                        <td className="font-semibold">{player.name}</td>
                        <td className="text-sm text-ash">
                          <span className="num mr-2 text-blood">{player.position}</span>
                          {positionLabels[player.position]}
                        </td>
                        <td className="text-sm text-ash">{player.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
