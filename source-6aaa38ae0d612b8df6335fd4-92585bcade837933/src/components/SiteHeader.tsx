import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { league, season } from '@/data/league'

export const tabs = [
  { to: '/teams', label: 'Teams' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/standings', label: 'Standings' },
  { to: '/highlights', label: 'Highlights' },
  { to: '/signup', label: 'Sign Up' },
  { to: '/free-agent', label: 'Sub' },
  { to: '/waiver', label: 'Waiver' },
  { to: '/pay', label: 'Pay' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--edge)] bg-[rgba(10,10,12,0.9)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-stretch gap-4 px-5 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 py-3.5"
          onClick={() => setOpen(false)}
        >
          <img
            src="/.netlify/images?url=/img/emblem.png&w=88&h=88&fit=cover&fm=webp&q=80"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11"
          />
          <span className="leading-none">
            <span className="display block text-[1.45rem] chrome">{league.shortName} League</span>
            <span className="mt-0.5 block text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ash">
              {season.name}
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-stretch xl:flex" aria-label="Main">
          {tabs.map((tab) => {
            const active = pathname === tab.to || pathname.startsWith(`${tab.to}/`)
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`relative flex items-center px-4 text-[0.75rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                  active ? 'text-bone' : 'text-ash hover:text-bone'
                }`}
              >
                {tab.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[3px] origin-left transition-transform duration-300 ${
                    active ? 'scale-x-100 bg-blood' : 'scale-x-0 bg-blood'
                  }`}
                  style={{ transform: `skewX(-32deg) scaleX(${active ? 1 : 0})` }}
                />
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="ml-auto flex items-center px-2 text-bone xl:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-[var(--edge)] bg-ink-2 xl:hidden"
          aria-label="Main, mobile"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              onClick={() => setOpen(false)}
              className="block border-b border-[var(--edge)] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-bone"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
