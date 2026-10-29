import Image from 'next/image'
import { Flame } from 'lucide-react'

const NAV = ['Builders', 'Advertisers', 'Pricing', 'Contact']

const FUNNELS = [
  { label: 'Ads in AI today', steps: ['Asks AI', 'Gets links', 'Clicks out', 'Bounces'], worth: 'Cents' },
  { label: 'With RevMaxx', steps: ['Asks AI', 'Sees a prefilled offer', 'Books the call', 'Lead delivered'], worth: 'Hundreds' },
]

export function V7Collage() {
  return (
    <div className="theme-collage grain min-h-screen overflow-hidden bg-background font-sans text-foreground">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-12">
        <span className="flex items-center gap-1 text-sm font-bold tracking-tight">
          REVMAXX
          <span className="flex flex-col gap-0.5" aria-hidden="true">
            <span className="h-1 w-12 bg-foreground" />
            <span className="h-px w-16 bg-foreground" />
          </span>
        </span>
        <nav aria-label="Main" className="hidden gap-12 font-display text-xs font-extrabold uppercase tracking-wide md:flex">
          {NAV.map((n) => (
            <a key={n} href="#more">
              {n}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-10 md:grid-cols-2 md:px-12 md:pb-24 md:pt-20">
          <div className="relative z-10 flex flex-col gap-8">
            <h1 className="flex flex-col">
              <span className="text-4xl font-bold leading-none tracking-tight md:text-7xl">Leads are worth</span>
              <span className="font-display text-5xl font-black leading-none tracking-tight text-pop sm:text-6xl md:text-8xl">
                hundreds
              </span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-pretty">
              Links are worth cents. RevMaxx brings the conversion funnel inside your AI — so the app that earned the
              user&apos;s trust also earns the revenue.
            </p>
            <a
              href="#more"
              className="w-fit rounded-full bg-primary px-10 py-5 font-display text-sm font-extrabold uppercase tracking-wide text-primary-foreground"
            >
              Monetize my AI
            </a>
            <p className="flex w-fit items-center gap-3 rounded-full bg-muted px-6 py-4 font-display text-[11px] font-extrabold uppercase tracking-wide">
              <Flame className="size-5 text-pop-2" aria-hidden="true" />
              Keep 70–80% of every dollar
            </p>
          </div>

          <div className="relative min-h-80 md:min-h-0" aria-hidden="true">
            <div
              className="absolute -right-10 -top-6 h-[120%] w-[85%] bg-pop-3 md:-right-20"
              style={{ clipPath: 'polygon(0 0, 100% 45%, 55% 100%)' }}
            />
            <div className="absolute left-[8%] top-[18%] aspect-square w-[60%] rounded-full bg-pop-2 md:left-0 md:top-[12%]" />
            <Image
              src="/concepts/v7-bell.png"
              alt=""
              width={1408}
              height={768}
              className="relative top-[22%] w-[120%] max-w-none -translate-x-[8%] mix-blend-lighten md:top-[20%]"
            />
          </div>
        </section>

        <section id="more" className="relative z-10 mx-auto grid max-w-7xl gap-4 px-5 pb-20 md:grid-cols-2 md:px-12">
          {FUNNELS.map((f, i) => (
            <div
              key={f.label}
              className={
                i === 1
                  ? 'flex flex-col gap-6 rounded-[2rem] bg-pop p-8 text-primary-foreground'
                  : 'flex flex-col gap-6 rounded-[2rem] bg-muted p-8'
              }
            >
              <p className="font-display text-[11px] font-extrabold uppercase tracking-wide">{f.label}</p>
              <ol className="flex flex-wrap gap-2">
                {f.steps.map((s) => (
                  <li
                    key={s}
                    className={
                      i === 1
                        ? 'rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-pop'
                        : 'rounded-full border border-border px-4 py-2 text-sm text-muted-foreground'
                    }
                  >
                    {s}
                  </li>
                ))}
              </ol>
              <p className="font-display text-4xl font-black uppercase">{f.worth}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
