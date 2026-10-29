import Image from 'next/image'
import { CalendarCheck, Check, ChevronDown, Play, Quote } from 'lucide-react'

const SUPPLY = ['Research agents', 'Shopping assistants', 'MCP skills', 'Harnesses', 'Copilots']

export function V10Grow() {
  return (
    <div className="theme-grow min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 md:px-10">
        <span className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <span className="flex size-8 flex-col overflow-hidden rounded-full" aria-hidden="true">
            <span className="h-1/2 bg-foreground" />
            <span className="h-1/2 translate-x-1 rounded-b-full bg-foreground" />
          </span>
          RevMaxx
        </span>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {['Product', 'Builders', 'Advertisers', 'Developers'].map((n) => (
            <a key={n} href="#" className="flex items-center gap-1">
              {n} <ChevronDown className="size-4" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          <a href="#" className="hidden rounded-full border border-border px-5 py-2.5 md:inline-flex">
            Log in
          </a>
          <a href="#" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground md:text-base">
            Apply — it&apos;s free
          </a>
        </div>
      </header>

      <main className="px-3 md:px-6">
        <section className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-gradient-to-b from-muted via-muted/50 to-background px-5 pb-12 pt-10 md:grid-cols-2 md:px-14 md:pb-16 md:pt-16">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                %
              </span>
              <span className="flex flex-col">
                <span className="text-xl font-medium">70–80% to builders</span>
                <a href="#" className="text-sm font-semibold underline underline-offset-4">
                  See how pricing works
                </a>
              </span>
            </div>
            <h1 className="font-serif text-8xl font-black leading-none tracking-tight md:text-9xl">
              Earn<sup className="ml-1 align-super text-6xl font-light md:text-7xl">+</sup>
            </h1>
            <hr className="border-foreground/15" />
            <p className="text-2xl leading-snug text-muted-foreground text-pretty">
              Links are worth cents. Leads are worth hundreds. Turn commercial intent in your AI into booked meetings.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-card" aria-hidden="true">
                <Quote className="size-5" />
              </span>
              <p className="flex flex-col">
                <span className="text-lg font-medium">Built by lead-gen operators</span>
                <span className="text-sm text-muted-foreground">Ju runs a $50M/yr performance business</span>
              </p>
            </div>
            <hr className="border-foreground/15" />
            <div className="flex flex-wrap gap-3">
              <a href="#" className="rounded-full bg-primary px-6 py-3.5 text-primary-foreground">
                Become a design partner
              </a>
              <a href="#" className="rounded-full border border-border bg-card px-6 py-3.5">
                For advertisers
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[2rem]">
              <Image
                src="/concepts/v10-hero.png"
                alt="Founder checking a booked meeting on her phone"
                width={928}
                height={1152}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
              <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-lg">
                <Play className="size-5 fill-foreground" aria-hidden="true" />
                <span className="sr-only">Play product video</span>
              </span>
            </div>

            <div className="absolute -left-2 top-[22%] flex flex-col items-start gap-2 md:-left-16">
              <span className="flex items-center gap-2 rounded-full bg-card/90 px-3 py-2 text-xs shadow-sm backdrop-blur md:text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-pop text-primary-foreground">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                Best CRM for 12 reps?
              </span>
              <span className="flex items-center gap-2 rounded-full bg-card/90 px-3 py-2 text-xs shadow-sm backdrop-blur md:text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                Book a demo Thursday?
              </span>
            </div>

            <div className="absolute -right-2 top-6 flex w-32 flex-col gap-1 rounded-3xl border border-card/60 bg-card/40 p-4 backdrop-blur-md md:-right-10 md:w-40">
              <span className="text-xs md:text-sm">Your payout</span>
              <span className="text-3xl font-medium md:text-4xl">$42</span>
              <span className="text-xs text-foreground/80 md:text-sm">per booked demo</span>
            </div>

            <div className="absolute -bottom-6 -right-2 flex items-center gap-3 rounded-3xl border border-card/60 bg-card/60 p-3 backdrop-blur-md md:-right-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-pop text-primary-foreground">
                <CalendarCheck className="size-6" aria-hidden="true" />
              </span>
              <span className="flex flex-col pr-2">
                <span className="text-sm">Pipewise demo</span>
                <span className="text-xl font-medium">Thu 3:30 PM</span>
                <span className="w-fit rounded-full bg-card px-2 py-0.5 text-xs">Booked in-chat</span>
              </span>
            </div>
          </div>
        </section>

        <section aria-label="Where RevMaxx runs">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-4 px-5 py-14 font-serif text-2xl font-semibold">
            {SUPPLY.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
