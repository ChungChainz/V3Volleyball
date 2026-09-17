import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, ExternalLink, ShieldCheck, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { subRequests } from '@/data/sub-requests'

/**
 * Google Forms does not allow its own page to be framed, but the `/viewform`
 * endpoint returns the embeddable render. The `embedded=true` param strips the
 * Google chrome so the form sits inside the league shell cleanly.
 */
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
        title="Free Agent"
        accent="Subs"
        blurb="Missing a body on a Saturday, or want to play without a full roster? Free agent subs fill in for a single night. Submit a request below and it lands on the sub board."
      />

      {/* ---------- Sub board ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Currently on the board</p>
            <h2 className="display mt-2 text-4xl">
              <span className="chrome">Sub</span> <span className="bloodfill">Requests</span>
            </h2>
            <div className="slash-rule mt-4 w-28" />
          </div>
          <p className="num shrink-0 pb-1 text-sm text-ash">
            {subRequests.length} request{subRequests.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="plate mt-7 overflow-hidden">
          {subRequests.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <ShieldCheck size={26} className="mx-auto text-blood" />
              <p className="display mt-4 text-2xl chrome">Nobody needs a sub yet</p>
              <p className="mx-auto mt-3 max-w-md text-ash">
                Sub requests show up here the moment a captain or player submits one. Check back
                once the season gets rolling.
              </p>
            </div>
          ) : (
            <table className="sheet">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Team</th>
                  <th className="text-right">Game Day</th>
                </tr>
              </thead>
              <tbody>
                {subRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="font-semibold">
                      {request.firstName} {request.lastName}
                    </td>
                    <td className="text-ash">{request.teamName || '—'}</td>
                    <td className="num text-right text-blood">
                      {request.gameDay || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm text-ash">
          <CalendarDays size={15} className="shrink-0 text-blood" />
          Board refreshes automatically each night — new submissions appear within a day.
        </p>
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
              <p className="font-bold uppercase tracking-[0.1em]">Free agent / sub sign-up</p>
              <p className="mt-1 text-sm text-ash">
                Tell us who you are, which team you are subbing for, and which game day.
              </p>
            </div>
          </div>

          <div className="plate mt-4 overflow-hidden">
            <iframe
              src={SUB_FORM}
              title="Vegas Vendetta Volleyball League free agent sub request form"
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
        </div>
      </section>
    </>
  )
}
