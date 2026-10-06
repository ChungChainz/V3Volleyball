import { createFileRoute } from '@tanstack/react-router'
import { Camera } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { photos } from '@/data/highlights'

export const Route = createFileRoute('/photos')({
  component: PhotoBoothPage,
})

function PhotoBoothPage() {
  return (
    <>
      <PageHeader
        kicker="From the gym"
        title="Photo"
        accent="Booth"
        blurb="Court shots, bench reactions and everything worth keeping from each game night."
      />

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="plate overflow-hidden">
          {photos.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <Camera size={30} className="mx-auto text-blood" />
              <p className="display mt-5 text-3xl chrome">Photos are on the way</p>
              <p className="mx-auto mt-4 max-w-lg text-ash">
                Week 2 photos will drop next week! Check back after the next game night.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 p-5 md:grid-cols-3">
              {photos.map((shot) => (
                <div key={shot.id} className="plate overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={shot.src} alt={shot.caption} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 bg-blood px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">
                      Week {shot.week}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="display-tight text-lg">{shot.caption}</p>
                    <p className="mt-1 text-sm text-ash">Shot by {shot.credit}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )}
