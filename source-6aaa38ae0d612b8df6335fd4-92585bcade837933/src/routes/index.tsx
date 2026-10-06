import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Camera,
  Coins,
  Instagram,
  MapPin,
  ScrollText,
  Shirt,
  Swords,
  Trophy,
  Users,
  Utensils,
  Zap,
} from 'lucide-react'
import { formatWeekDate, league, season } from '@/data/league'
import { teamById } from '@/data/teams'
import { currentWeek, matchesForWeek, regularSeasonWeeks } from '@/data/schedule'
import { buildStandings } from '@/data/standings'
import { photos } from '@/data/highlights'
import { useMatches } from '@/lib/score-store'
import { cdnImage } from '@/lib/video'
import { TeamCrest } from '@/components/TeamCrest'

export const Route = createFileRoute('/')({
  component: LeagueHome,
})

const perkIcons = [Utensils, Zap, Shirt]

function LeagueHome() {
  const matches = useMatches()
  // currentWeek() returns the first week that still has an unplayed match, so
  // the board follows the season as results come in.
  const week = Math.min(currentWeek(matches), regularSeasonWeeks)
  const weekMatches = matchesForWeek(matches, week)
  const standings = buildStandings(matches)
  const booth = photos.slice(0, 3)

  const vitals = [
    { icon: CalendarDays, label: 'Season starts', value: formatWeekDate(1), sub: `${season.nightOfWeek} nights` },
    { icon: Coins, label: 'Team fee', value: `$${season.fees.team}`, sub: 'One payment, full season' },
    { icon: Swords, label: 'Match', value: season.matchFormat, sub: 'Sets to 25, third to 15' },
    { icon: Users, label: 'Field', value: `${season.teamCap} teams`, sub: 'Hard cap' },
    { icon: ScrollText, label: 'Rules', value: season.ruleset, sub: `${season.weeks} weeks, 8th is playoffs` },
  ]

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-[var(--edge)]">
        <div className="absolute inset-0" aria-hidden="true">
          {/* League crest as a centred, heavily-faded backdrop so the
              headline still reads over the detail. */}
          <div className="absolute inset-0 bg-ink" />
          <div
            className="drift absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${cdnImage('/img/logo.png', { w: 1600, q: 62 })}')`,
              backgroundSize: 'min(1150px, 88%)',
              opacity: 0.42,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,10,12,0.97)_0%,rgba(10,10,12,0.82)_40%,rgba(10,10,12,0.42)_72%,rgba(10,10,12,0.74)_100%)]" />
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
                Pay Season Fee <ArrowRight size={16} />
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
              <p className="kicker">Next up</p>
              <p className="display mt-2 text-5xl chrome">Week {week}</p>
              <p className="num mt-1 text-sm text-blood">{formatWeekDate(week)}</p>
              <div className="mt-4 border-t border-[var(--edge)] pt-4">
                <p className="num text-xs text-ash">
                  {season.startTime} start · {weekMatches.length} matches
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ash-dim">
                  {season.arrivalNote}
                </p>
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
              {standings.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <p className="display text-2xl chrome">Everyone is 0-0</p>
                  <p className="mx-auto mt-3 max-w-md text-ash">
                    Standings fill in once results are posted. First serve is {formatWeekDate(1)}.
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
              )}
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

      {/* ---------- Photo Booth strip ---------- */}
      <section className="relative overflow-hidden border-y border-[var(--edge)] bg-ink-2">
        <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">From the gym</p>
              <h2 className="display mt-2 text-5xl">
                <span className="chrome">Photo</span> <span className="bloodfill">Booth</span>
              </h2>
            </div>
            <Link to="/photos" className="btn btn-steel">
              <Camera size={15} /> All photos
            </Link>
          </div>
          <div className="slash-rule mt-4 w-32" />

          {booth.length === 0 ? (
            <div className="plate mt-9 px-6 py-14 text-center">
              <Camera size={26} className="mx-auto text-blood" />
              <p className="display mt-4 text-2xl chrome">Week 2 photos will drop next week!</p>
              <p className="mx-auto mt-3 max-w-md text-ash">
                Court shots, bench reactions and everything worth keeping land here after each game
                night.
              </p>
            </div>
          ) : (
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {booth.map((shot, index) => (
                <Link
                  key={shot.id}
                  to="/photos"
                  className={`plate plate-hover group relative block overflow-hidden ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={cdnImage(shot.src, { w: 900, h: 560, fit: 'cover', q: 62 })}
                      alt={shot.caption}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 bg-blood px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">
                      Week {shot.week}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="display-tight text-xl">{shot.caption}</p>
                    <p className="mt-1 text-sm text-ash">Shot by {shot.credit}</p>
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
              {season.teamCap} slots, first come. Register your team and pay the ${' '}
              {season.fees.team} team fee to lock in your spot. Every player will sign the waivers
              in-person before they touch the court.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pay" className="btn btn-blood">
                <Coins size={16} /> Pay by Venmo
              </Link>
              <Link to="/signup" className="btn btn-steel">
                <Users size={16} /> Register your team
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
