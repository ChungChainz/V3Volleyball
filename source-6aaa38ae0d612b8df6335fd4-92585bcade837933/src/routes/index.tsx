import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BarChart3, CalendarDays, Coins, Instagram, MapPin, Play, ScrollText, Shirt, Swords, Trophy, UserPlus, Users, Utensils, Zap } from 'lucide-react'
import { formatWeekDate, league, season } from '@/data/league'
import { teamById } from '@/data/teams'
import { currentWeek, formatSets, matchesForWeek } from '@/data/schedule'
import { buildStandings } from '@/data/standings'
import { highlights } from '@/data/highlights'
import { useMatches } from '@/lib/score-store'
import { cdnImage } from '@/lib/video'
import { TeamCrest } from '@/components/TeamCrest'

export const Route = createFileRoute('/')({
  component: LeagueHome,
})

const perkIcons = [Utensils, Zap, Shirt, UserPlus]

function LeagueHome() {
  const matches = useMatches()
  const week = Math.min(currentWeek(matches), season.weeks - 1)
  const weekMatches = matchesForWeek(matches, week)
  const standings = buildStandings(matches)
  const reel = highlights.slice(0, 3)

  const vitals = [
    { icon: CalendarDays, label: 'Season starts', value: formatWeekDate(1), sub: `${season.nightOfWeek} nights` },
    { icon: Coins, label: 'Team fee', value: `$${season.fees.team}`, sub: 'Deposit or pay in full' },
    { icon: Swords, label: 'Match', value: season.matchFormat, sub: 'Sets to 25, third to 15' },
    { icon: Users, label: 'Field', value: `${season.teamCap} teams`, sub: 'Hard cap' },
    { icon: ScrollText, label: 'Rules', value: season.ruleset, sub: `${season.weeks} weeks, 8th is playoffs` },
  ]

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-[var(--edge)]">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="drift absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${cdnImage('/img/hero-court.png', { w: 1920, q: 68 })}')` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,10,12,0.96)_0%,rgba(10,10,12,0.76)_42%,rgba(10,10,12,0.28)_72%,rgba(10,10,12,0.66)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 pt-16 pb-20 lg:grid-cols-12 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-8">
            <p className="kicker rise">
              {season.level} &nbsp;/&nbsp; {league.venue.city}, {league.venue.state}
            </p>

            <h1 className="mt-4">
              <span
                className="display rise mt-1 block text-[clamp(3.4rem,13vw,9.5rem)]"
                style={{ animationDelay: '140ms' }}
              >
                <span className="chrome">Vegas Vendetta</span>
              </span>
              <span
                className="display rise mt-1 block text-[clamp(3.4rem,13vw,9.5rem)]"
                style={{ animationDelay: '180ms' }}
              >
                <span className="bloodfill">Volleyball League</span>
              </span>
            </h1>

            <div
              className="slash-in slash-rule mt-5 w-64 max-w-full"
              style={{ animationDelay: '320ms' }}
            />

            <p
              className="rise mt-7 max-w-xl text-xl leading-snug text-bone/85"
              style={{ animationDelay: '260ms' }}
            >
              Eight teams. Eight Saturdays. {season.ruleset} rules, {season.matchFormat} every
              night, and a trophy plus custom jerseys for whoever is standing at the end of week{' '}
              {season.playoffWeek}.
            </p>

            <div
              className="rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '340ms' }}
            >
              <Link to="/pay" className="btn btn-blood">
                Claim a roster spot <ArrowRight size={16} />
              </Link>
              <Link to="/schedule" className="btn btn-steel">
                See the schedule
              </Link>
              <a
                href={league.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2 text-sm font-semibold uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone"
              >
                <Instagram size={16} /> @{league.instagram}
              </a>
            </div>
          </div>

          <aside
            className="rise self-end lg:col-span-4"
            style={{ animationDelay: '420ms' }}
          >
            <div className="plate p-6">
              <p className="kicker">Now playing</p>
              <p className="display mt-2 text-5xl chrome">Week {week}</p>
              <p className="num mt-1 text-sm text-blood">{formatWeekDate(week)}</p>
              <div className="mt-5 space-y-3 border-t border-[var(--edge)] pt-5">
                {weekMatches.map((match) => {
                  const home = teamById(match.homeId)
                  const away = teamById(match.awayId)
                  if (!home || !away) return null
                  return (
                    <div key={match.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-semibold">
                        {home.abbr} <span className="text-ash-dim">v</span> {away.abbr}
                      </span>
                      <span className="num shrink-0 text-xs text-ash">
                        {match.status === 'final'
                          ? formatSets(match.sets)
                          : `${match.time.replace(':00 ', '')} · ${match.court.replace('Court ', 'Ct ')}`}
                      </span>
                    </div>
                  )
                })}
              </div>
              <Link
                to="/schedule"
                className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blood transition-colors hover:text-blood-hot"
              >
                Full schedule <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- Season vitals, laid out like the flyer's fact strip ---------- */}
      <section className="border-b border-[var(--edge)] bg-ink-2">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-5 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {vitals.map((vital, index) => (
            <div
              key={vital.label}
              className={`border-[var(--edge)] px-4 py-7 ${
                index !== vitals.length - 1 ? 'sm:border-r' : ''
              } ${index % 2 === 0 ? 'border-r sm:border-r' : ''} border-b sm:border-b-0`}
            >
              <vital.icon size={22} className="text-blood" />
              <p className="kicker mt-3 text-[0.62rem]">{vital.label}</p>
              <p className="display mt-1.5 text-3xl chrome">{vital.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ash-dim">{vital.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Standings snapshot + perks, asymmetric ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="kicker">Through week {week - 1}</p>
                <h2 className="display mt-2 text-5xl">
                  <span className="chrome">The</span> <span className="bloodfill">Table</span>
                </h2>
              </div>
              <Link
                to="/standings"
                className="flex shrink-0 items-center gap-1.5 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-blood hover:text-blood-hot"
              >
                <BarChart3 size={14} /> Full standings
              </Link>
            </div>
            <div className="slash-rule mt-4 w-32" />

            <div className="plate mt-7 overflow-hidden">
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
                  {standings.slice(0, 4).map((row, index) => {
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
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="kicker">What the fee covers</p>
            <h2 className="display mt-2 text-5xl">
              <span className="chrome">Season</span> <span className="bloodfill">Terms</span>
            </h2>
            <div className="slash-rule mt-4 w-32" />
            <ul className="mt-7 space-y-5">
              {season.perks.map((perk, index) => {
                const Icon = perkIcons[index] ?? Trophy
                return (
                  <li key={perk.title} className="flex gap-4 border-b border-[var(--edge)] pb-5">
                    <Icon size={20} className="mt-1 shrink-0 text-blood" />
                    <div>
                      <p className="font-bold uppercase tracking-[0.1em]">{perk.title}</p>
                      <p className="mt-1 text-ash">{perk.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Highlights strip ---------- */}
      <section className="relative overflow-hidden border-y border-[var(--edge)] bg-ink-2">
        <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">From the gym</p>
              <h2 className="display mt-2 text-5xl">
                <span className="chrome">Tape</span> <span className="bloodfill">Room</span>
              </h2>
            </div>
            <Link to="/highlights" className="btn btn-steel">
              <Play size={15} /> All highlights
            </Link>
          </div>
          <div className="slash-rule mt-4 w-32" />

          {reel.length === 0 ? (
            <div className="plate mt-9 px-6 py-14 text-center">
              <p className="display text-2xl chrome">First whistle hasn't blown</p>
              <p className="mx-auto mt-3 max-w-md text-ash">
                Clips land here once the season starts. Week 1 opens {formatWeekDate(1)} — get
                something worth rewinding on camera.
              </p>
            </div>
          ) : (
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {reel.map((clip, index) => (
                <Link
                  key={clip.id}
                  to="/highlights"
                  className={`plate plate-hover group relative block overflow-hidden ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={cdnImage(clip.poster, { w: 900, h: 560, fit: 'cover', q: 62 })}
                      alt=""
                      className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 bg-blood px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">
                      {clip.week === 0 ? 'League' : `Week ${clip.week}`}
                    </span>
                    <span className="num absolute right-4 top-4 text-xs text-bone/80">
                      {clip.length}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="display-tight text-xl">{clip.title}</p>
                    <p className="mt-1 text-sm text-ash">Filed by {clip.submittedBy}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Register band ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <img
              src={cdnImage('/img/trophy-shelf.png', { w: 900, h: 700, fit: 'cover', q: 66 })}
              alt="Championship trophy and a folded V3 jersey on the gym floor"
              className="w-full object-cover"
            />
            <div className="absolute -bottom-5 -right-4 bg-blood px-5 py-3">
              <p className="display text-2xl text-white">1st takes hardware</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="kicker">Registration</p>
            <h2 className="display mt-2 text-[clamp(2.6rem,6vw,4.5rem)]">
              <span className="chrome">Get on</span> <span className="bloodfill">the list</span>
            </h2>
            <div className="slash-rule mt-4 w-40" />
            <p className="mt-6 max-w-xl text-lg text-ash">
              {season.teamCap} slots, first come. Put down the ${season.fees.deposit} deposit to
              hold your spot or pay the ${season.fees.team} team fee in full. Every player signs the
              waiver before they touch the court. Rolling in solo is fine — free agents get placed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pay" className="btn btn-blood">
                <Coins size={16} /> Pay by Venmo
              </Link>
              <Link to="/waiver" className="btn btn-steel">
                <ScrollText size={16} /> Sign the waiver
              </Link>
              <Link to="/teams" className="btn btn-steel">
                <Users size={16} /> Meet the teams
              </Link>
            </div>
            <a
              href={league.venue.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
            >
              <MapPin size={16} className="text-blood" />
              {league.venue.street}, {league.venue.city} {league.venue.state} {league.venue.zip}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
