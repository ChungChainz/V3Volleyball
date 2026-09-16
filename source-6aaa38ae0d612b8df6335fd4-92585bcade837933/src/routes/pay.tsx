import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Check, Copy, ExternalLink, ScrollText, Smartphone } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { league, paymentOptions, season } from '@/data/league'
import { venmoAppLink, venmoHandleDisplay, venmoWebLink } from '@/lib/venmo'

export const Route = createFileRoute('/pay')({
  component: PayPage,
})

function PayPage() {
  const [copied, setCopied] = useState(false)

  function copyHandle() {
    navigator.clipboard.writeText(venmoHandleDisplay()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <PageHeader
        kicker="Get squared away"
        title="Pay"
        accent="the League"
        blurb={`Every fee runs through Venmo — ${league.venmo.displayName} (${venmoHandleDisplay()}). Put your name and team in the payment note so it can be matched to your roster.`}
      />

      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {paymentOptions.map((option) => {
            const note = `${league.shortName} ${season.name} — ${option.label}`
            return (
              <div key={option.id} className="plate flex flex-col p-6">
                <p className="kicker">{option.label}</p>
                <p className="display mt-2 text-5xl chrome">${option.amount}</p>
                <p className="mt-3 flex-1 text-sm text-ash">{option.blurb}</p>
                <div className="mt-6 space-y-2">
                  <a
                    href={venmoAppLink({ amount: option.amount, note })}
                    className="btn btn-blood w-full justify-center"
                  >
                    <Smartphone size={16} /> Pay with Venmo app
                  </a>
                  <a
                    href={venmoWebLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-steel w-full justify-center"
                  >
                    <ExternalLink size={16} /> Open on Venmo.com
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <div className="plate mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <p className="kicker">Prefer to search manually</p>
            <p className="display mt-1 text-3xl chrome">{venmoHandleDisplay()}</p>
            <p className="mt-1 text-sm text-ash">{league.venmo.displayName} on Venmo</p>
          </div>
          <button type="button" onClick={copyHandle} className="btn btn-steel">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy handle'}
          </button>
        </div>

        <div className="plate mt-6 flex items-start gap-4 p-6">
          <ScrollText size={22} className="mt-1 shrink-0 text-blood" />
          <div>
            <p className="font-bold uppercase tracking-[0.1em]">Playing under {season.ruleset} rules</p>
            <p className="mt-1 text-ash">
              Every match runs on the official USA Volleyball rulebook. Review the current rules
              and interpretations before week 1.
            </p>
            <a
              href={season.rulesUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.18em] text-blood transition-colors hover:text-blood-hot"
            >
              Read the {season.ruleset} rulebook <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
