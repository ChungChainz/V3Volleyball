import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, ScrollText } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { season } from '@/data/league'

export const Route = createFileRoute('/rules')({
  component: RulesPage,
})

function RulesPage() {
  return (
    <>
      <PageHeader
        kicker="Compete hard / Respect the game / Have fun"
        title="League"
        accent="Rules"
        blurb="Everything you need to know for game night. USAV rules apply to every match unless a league rule below says otherwise."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="plate flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <ScrollText size={30} className="mt-0.5 shrink-0 text-blood" />
            <div>
              <p className="kicker">Official rulebook</p>
              <h2 className="display mt-2 text-3xl chrome">{season.ruleset} Rulebook</h2>
              <div className="slash-rule mt-3 w-24" />
              <p className="mt-4 max-w-lg text-ash">
                USA Volleyball rules and interpretations, straight from the source.
              </p>
            </div>
          </div>
          <a
            href={season.rulesUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-blood shrink-0"
          >
            Open the rulebook <ExternalLink size={15} />
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <a href="/img/rules.jpg" target="_blank" rel="noreferrer" className="plate block overflow-hidden">
            <img
              src="/img/rules.jpg"
              alt="Vegas Vendetta Volleyball League rules and regulations: match times and arrival, warm-ups, match format, officiating, net, female player requirements, all-time middle, playoff rules and USAV rules"
              className="block h-auto w-full"
              loading="lazy"
            />
          </a>
          <p className="mt-3 text-center text-sm text-ash">Tap the image to open it full size.</p>
        </div>
      </section>
    </>
  )
}
