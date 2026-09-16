import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { league, season } from '@/data/league'

import '../styles.css'

const title = `${league.name} — ${season.name}`
const description = `${season.level} volleyball in Las Vegas. ${season.weeks} weeks, ${season.teamCap} teams, ${season.ruleset} rules. Rosters, schedule, live standings, waivers and payment.`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      { name: 'theme-color', content: '#0a0a0c' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: '/img/hero-court.png' },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;1,600&family=Chivo+Mono:wght@400;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <a
          href="#main"
          className="btn btn-blood sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-28 lg:px-8">
      <p className="kicker">Out of bounds</p>
      <h1 className="display mt-3 text-[clamp(3rem,10vw,7rem)]">
        <span className="chrome">Side</span> <span className="bloodfill">Out</span>
      </h1>
      <div className="slash-rule mt-4 w-40" />
      <p className="mt-6 max-w-lg text-lg text-ash">
        That page is not on the schedule. Head back to the league and pick a tab.
      </p>
      <a href="/" className="btn btn-blood mt-8">
        Back to the league
      </a>
    </div>
  )
}
