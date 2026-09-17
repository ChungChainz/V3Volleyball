import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, Crown, MapPin } from 'lucide-react'
import { teamById } from '@/data/teams'
import { formatWeekDate, league } from '@/data/league'
import { season } from '@/data/league'
import { formatSets, matchWinner } from '@/data/schedule'
import { buildStandings } from '@/data/standings'
import { useMatches } from '@/lib/score-store'
import { TeamCrest } from '@/components/TeamCrest'
import { cdnImage } from '@/lib/video'

export const Route = createFileRoute('/teams/$teamId')({
  loader: ({ params }) => {
    const team = teamById(params.teamId)
    if (!team) throw notFound()
    return { teamId: team.id }
  },
  component: TeamDetail,
})

function TeamDetail() {
  const { teamId } = Route.useLoaderData()
  const matches = useMatches()
  const team = teamById(teamId)
  if (!team) return null

  const standings = buildStandings(matches)
  const record = standings.find((row) => row.teamId === team.id)
  const seed = standings.findIndex((row) => row.teamId === team.id) + 1
  const fixtures = matches
    .filter((match) => match.homeId === team.id || match.awayId === team.id)
    .sort((a, b) => a.week - b.week)

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--edge)] bg-ink-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${cdnImage('/img/texture-slash.png', { w: 1600, q: 58 })}')` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(70% 90% at 12% 0%, ${team.colors[0]}33 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-[rgba(10,10,12,0.7)] to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1240px] px-5 pt-10 pb-12 lg:px-8 lg:pt-14">
          <Link
            to="/teams"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ash transition-colors hover:text-bone"
          >
            <ArrowLeft size={14} /> All teams
          </Link>

          <div className="mt-7 flex flex-wrap items-end gap-6">
            <div className="rise">
              <TeamCrest team={team} size={104} />
            </div>
            <div className="rise min-w-0" style={{ animationDelay: '80ms' }}>
              <p className="kicker">
                Founded {team.founded}
              </p>
              <h1 className="display mt-2 text-[clamp(2.4rem,7vw,5rem)] chrome">{team.name}</h1>
              <div className="slash-in slash-rule mt-3 w-40" style={{ animationDelay: '200ms' }} />
            </div>
          </div>

          <p className="rise mt-6 max-w-2xl text-lg text-ash" style={{ animationDelay: '140ms' }}>
            {team.bio}
          </p>

          <div className="rise mt-9 grid grid-cols-2 gap-px border border-[var(--edge)] bg-[var(--edge)] sm:grid-cols-4" style={{ animationDelay: '220ms' }}>
            {[
              { label: 'Record', value: record ? `${record.wins}-${record.losses}` : '0-0' },
              { label: 'Sets', value: record ? `${record.setsWon}-${record.setsLost}` : '0-0' },
              { label: 'Point diff', value: record ? (record.pointDiff > 0 ? `+${record.pointDiff}` : `${record.pointDiff}`) : '0' },
              { label: 'Streak', value: record?.streak ?? '—' },
            ].map((stat) => (
              <div key={stat.label} className="bg-ink px-5 py-5">
                <p className="kicker text-[0.58rem]">{stat.label}</p>
                <p className="num mt-1 text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Roster */}
          <div className="lg:col-span-7">
            <p className="kicker">{team.roster.length} players</p>
            <h2 className="display mt-2 text-4xl">
              <span className="chrome">The</span> <span className="bloodfill">Roster</span>
            </h2>
            <div className="slash-rule mt-3 w-24" />

            <ul className="mt-7 divide-y divide-[var(--edge)] border-y border-[var(--edge)]">
              {team.roster.map((player) => (
                <li key={player.id} className="flex items-center gap-4 py-4">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: team.colors[0] }}
                    aria-hidden="true"
                  />
                  <p className="flex items-center gap-2 font-bold uppercase tracking-[0.06em]">
                    {player.name}
                    {player.captain && (
                      <Crown size={15} className="text-blood" aria-label="Captain" />
                    )}
                  </p>
                </li>
              ))}
            </ul>

            {team.roster.length === 0 && (
              <p className="mt-7 text-ash">No players have registered for this team yet.</p>
            )}
          </div>

          {/* Fixtures */}
          <div className="lg:col-span-5">
            <p className="kicker">Every week</p>
            <h2 className="display mt-2 text-4xl">
              <span className="chrome">Their</span> <span className="bloodfill">Slate</span>
            </h2>
            <div className="slash-rule mt-3 w-24" />

            <div className="mt-7 space-y-2">
              {fixtures.length === 0 && (
                <p className="text-ash">Fixtures will appear once the schedule is set.</p>
              )}
              {fixtures.map((match) => {
                const isHome = match.homeId === team.id
                const opponent = teamById(isHome ? match.awayId : match.homeId)
                const winner = matchWinner(match)
                const won = winner ? (winner === 'home') === isHome : null
                return (
                  <div
                    key={match.id}
                    className="plate flex items-center gap-4 px-4 py-3"
                    style={
                      won === null
                        ? undefined
                        : { borderLeft: `3px solid ${won ? '#d01018' : 'rgba(236,236,237,0.2)'}` }
                    }
                  >
                    <div className="w-14 shrink-0">
                      <p className="num text-xs text-ash-dim">Wk {match.week}</p>
                      <p className="num text-[0.68rem] text-ash-dim">{formatWeekDate(match.week)}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        <span className="text-ash-dim">{isHome ? 'v' : '@'}</span>{' '}
                        {opponent ? (
                          <Link
                            to="/teams/$teamId"
                            params={{ teamId: opponent.id }}
                            className="transition-colors hover:text-blood"
                          >
                            {opponent.name}
                          </Link>
                        ) : (
                          'TBD'
                        )}
                      </p>
                      <p className="num text-xs text-ash-dim">
                        {match.court} · {match.time}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {won === null ? (
                        <span className="text-xs uppercase tracking-[0.16em] text-ash-dim">
                          Upcoming
                        </span>
                      ) : (
                        <>
                          <span
                            className={`display-tight text-lg ${won ? 'text-blood' : 'text-ash'}`}
                          >
                            {won ? 'Win' : 'Loss'}
                          </span>
                          <p className="num text-[0.68rem] text-ash-dim">
                            {formatSets(match.sets)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="plate mt-6 p-5">
              <p className="kicker">Home court</p>
              <p className="display mt-1 text-2xl chrome">
                {league.venue.street}
              </p>
              <p className="num mt-1 text-sm text-ash">
                {season.nightOfWeek}s · {season.startTime}
              </p>
              <a
                href={league.venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
              >
                <MapPin size={15} className="text-blood" />
                {league.venue.name}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
