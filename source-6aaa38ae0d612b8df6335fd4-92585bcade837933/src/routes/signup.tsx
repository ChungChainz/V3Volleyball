import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'

/**
 * Google Forms does not allow its own page to be framed, but the `/viewform`
 * endpoint returns the embeddable render. The `embedded=true` param strips the
 * Google chrome so the form sits inside the league shell cleanly.
 */
const REGISTRATION_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSf5YSeDXsx7uaye5ZADJhKjrTjZy8iG-qrAlCEijUDHxWbfkQ/viewform?embedded=true'
const REGISTRATION_FORM_DIRECT =
  'https://docs.google.com/forms/d/e/1FAIpQLSf5YSeDXsx7uaye5ZADJhKjrTjZy8iG-qrAlCEijUDHxWbfkQ/viewform'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  return (
    <>
      <PageHeader
        kicker="Eight Teams, One Champion"
        title="Sign"
        accent="Up"
        blurb="Lock in your team for the season. Fill out the registration form below and we will confirm your spot — spots are only held once the deposit or full team fee lands."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="plate mb-8 flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <UserPlus size={22} className="shrink-0 text-blood" />
            <div>
              <p className="font-bold uppercase tracking-[0.1em]">Team registration</p>
              <p className="mt-1 text-sm text-ash">
                On a team? Register here to confirm your spot. Subbing in? Head to the free agent form instead.
              </p>
            </div>
          </div>
          <a
            href={REGISTRATION_FORM_DIRECT}
            target="_blank"
            rel="noreferrer"
            className="btn btn-steel shrink-0"
          >
            Open in a new tab <ExternalLink size={15} />
          </a>
        </div>

        <div className="plate overflow-hidden">
          <iframe
            src={REGISTRATION_FORM}
            title="Vegas Vendetta Volleyball League team registration form"
            className="block h-[1400px] w-full border-0 bg-white"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>

        <p className="mt-4 text-center text-sm text-ash">
          Form not loading?{' '}
          <a
            href={REGISTRATION_FORM_DIRECT}
            target="_blank"
            rel="noreferrer"
            className="text-blood underline hover:text-blood-hot"
          >
            Open the registration form directly
          </a>
          .
        </p>
      </section>
    </>
  )
}
