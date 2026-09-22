import { Link } from '@tanstack/react-router'
import { ExternalLink, Instagram, MapPin, ScrollText } from 'lucide-react'
import { league, season } from '@/data/league'
import { tabs } from './SiteHeader'

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-[var(--edge)] bg-ink-2">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="display text-4xl chrome">{league.name}</p>
          <div className="slash-rule mt-3 w-28" />
          <p className="mt-4 max-w-sm text-ash">
            {season.level} volleyball in southwest Las Vegas. {season.weeks} weeks, {season.teamCap}{' '}
            teams, {season.ruleset} rules, {season.matchFormat} every match.
          </p>
          <p className="display mt-6 text-2xl bloodfill">{league.tagline}</p>

          {/* Rulebook link sits directly under the tagline. */}
          <a
            href={season.rulesUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blood transition-colors hover:text-blood-hot"
          >
            <ScrollText size={16} className="shrink-0" />
            {season.ruleset} Rulebook
            <ExternalLink size={13} />
          </a>
        </div>

        <div>
          <p className="kicker">League</p>
          <ul className="mt-4 space-y-2">
            {tabs.map((tab) => (
              <li key={tab.to}>
                <Link to={tab.to} className="text-ash transition-colors hover:text-bone">
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker">Find us</p>
          <a
            href={league.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex gap-2 text-ash transition-colors hover:text-bone"
          >
            <MapPin size={18} className="mt-0.5 shrink-0 text-blood" />
            <span>
              {league.venue.street}
              <br />
              {league.venue.city}, {league.venue.state} {league.venue.zip}
            </span>
          </a>
          <a
            href={league.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-2 text-ash transition-colors hover:text-bone"
          >
            <Instagram size={18} className="shrink-0 text-blood" />@{league.instagram}
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--edge)] px-5 py-5 text-center text-xs uppercase tracking-[0.2em] text-ash-dim lg:px-8">
        {league.name} — {season.name} {new Date(`${season.startsOn}T00:00:00`).getFullYear()}
      </div>
    </footer>
  )
}
