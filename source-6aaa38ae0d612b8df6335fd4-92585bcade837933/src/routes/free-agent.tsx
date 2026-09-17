import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'

const SUB_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLScBEp6Abl3QAO55Y8d39-9-xFnGy0Jdri-WuxD92y5yCi2GCg/viewform?embedded=true'
const SUB_FORM_DIRECT =
  'https://docs.google.com/forms/d/e/1FAIpQLScBEp6Abl3QAO55Y8d39-9-xFnGy0Jdri-WuxD92y5yCi2GCg/viewform'

export const Route = createFileRoute('/free-agent')({
  component: FreeAgentPage,
})

function FreeAgentPage() {
  return (
    <>
      <PageHeader
        kicker="No team required"
        title="Free"
        accent="Agent"
        blurb="Rolling in without a squad is fine. Sign up here and captains will call you up when a roster needs your position."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="plate mb-8 flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <UserPlus size={22} className="shrink-0 text-blood" />
            <div>
              <p className="font-bold uppercase tracking-[0.1em]">Free agent / sub sign-up</p>
              <p className="mt-1 text-sm text-ash">
                Put your name in the pool. Free agents get placed on a roster that needs their position.
              </p>
            </div>
          </div>
          <a
            href={SUB_FORM_DIRECT}
            target="_blank"
            rel="noreferrer"
            className="btn btn-steel shrink-0"
          >
            Open in a new tab <ExternalLink size={15} />
          </a>
        </div>

        <div className="plate overflow-hidden">
          <iframe
            src={SUB_FORM}
            title="Vegas Vendetta Volleyball League free agent sign-up form"
            className="block h-[1200px] w-full border-0 bg-white"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>

        <p className="mt-4 text-center text-sm text-ash">
          Form not loading?{' '}
          <a
            href={SUB_FORM_DIRECT}
            target="_blank"
            rel="noreferrer"
            className="text-blood underline hover:text-blood-hot"
          >
            Open the free agent form directly
          </a>
          .
        </p>
      </section>
    </>
  )
}
