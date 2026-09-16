import { cdnImage } from '@/lib/video'

interface PageHeaderProps {
  kicker: string
  title: string
  accent?: string
  blurb?: string
  image?: string
  children?: React.ReactNode
}

/** Shared page masthead: raked art, slash rule, headline in chrome + blood. */
export function PageHeader({
  kicker,
  title,
  accent,
  blurb,
  image = '/img/texture-slash.png',
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--edge)] bg-ink-2">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${cdnImage(image, { w: 1600, q: 60 })}')` }}
        aria-hidden="true"
      />
      <div className="ember absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-[rgba(10,10,12,0.72)] to-[rgba(10,10,12,0.5)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-12 lg:px-8 lg:pt-20 lg:pb-16">
        <p className="kicker rise">{kicker}</p>
        <h1 className="display rise mt-3 text-[clamp(2.75rem,8vw,5.5rem)]">
          <span className="chrome">{title}</span>
          {accent && <span className="bloodfill"> {accent}</span>}
        </h1>
        <div className="slash-in slash-rule mt-4 w-44" style={{ animationDelay: '180ms' }} />
        {blurb && (
          <p
            className="rise mt-5 max-w-2xl text-lg text-ash"
            style={{ animationDelay: '120ms' }}
          >
            {blurb}
          </p>
        )}
        {children && <div className="rise mt-8" style={{ animationDelay: '200ms' }}>{children}</div>}
      </div>
    </section>
  )
}
