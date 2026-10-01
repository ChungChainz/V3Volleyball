import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, MessageCircle, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { subWhatsAppInvite } from '@/data/sub-requests'

/**
 * Google Forms does not allow its own page to be framed, but the `/viewform`
 * endpoint returns the embeddable render. The `embedded=true` param strips the
 * Google chrome so the form sits inside the league shell cleanly.
 */
const SUB_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLScBEp6Abl3QAO55Y8d39-9-xFnGy0Jdri-WuxD92y5yCi2GCg/viewform?embedded=true'
const SUB_FORM_DIRECT =
  'https://docs.google.com/forms/d/e/1FAIpQLScBEp6Abl3QAO55Y8d39-9-xFnGy0Jdri-WuxD92y5yCi2GCg/viewform'

export const Route = createFileRoute('/subs')({
  component: SubPage,
})

function SubPage() {
  return (
    <>
      <PageHeader
        kicker="Short a body on game night"
        title="Sub"
        accent="Requests"
        blurb="Need someone to fill a spot for a night, or want to pick up a game? Join the group and get connected with the teams that need you."
      />

      {/* ---------- WhatsApp group ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="plate flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <MessageCircle size={30} className="mt-0.5 shrink-0 text-blood" />
            <div>
              <p className="kicker">Where subs get posted</p>
              <h2 className="display mt-2 text-3xl chrome">Join the WhatsApp</h2>
              <div className="slash-rule mt-3 w-24" />
              <p className="mt-4 max-w-lg text-ash">
                Join the WhatsApp group for subs and free agents.
              </p>
            </div>
          </div>
          <a
            href={subWhatsAppInvite}
            target="_blank"
            rel="noreferrer"
            className="btn btn-blood shrink-0"
          >
            <MessageCircle size={16} /> Join the group
          </a>
        </div>
      </section>

      {/* ---------- Submit form ---------- */}
      <section className="border-t border-[var(--edge)] bg-ink-2">
        <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Add your name</p>
              <h2 className="display mt-2 text-4xl">
                <span className="chrome">Request</span> <span className="bloodfill">a Sub</span>
              </h2>
              <div className="slash-rule mt-4 w-28" />
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

          <div className="plate mt-7 flex items-center gap-3 p-5">
            <UserPlus size={22} className="shrink-0 text-blood" />
            <div>
              <p className="font-bold uppercase tracking-[0.1em]">Sub sign-up</p>
              <p className="mt-1 text-sm text-ash">
                Tell us who you are, which team you are subbing for, and which game day.
              </p>
            </div>
          </div>

          <div className="plate mt-4 overflow-hidden">
            <iframe
              src={SUB_FORM}
              title="Vegas Vendetta Volleyball League sub request form"
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
              Open the sub form directly
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
