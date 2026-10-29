import Image from 'next/image'
import { CalendarCheck, Check, ChevronDown, Heart, Sparkles, Star } from 'lucide-react'

const ADVERTISERS = ['Pipewise', 'RATEHARBOR', 'ledgerly', 'Coursely', 'STAYLINE', 'Brightpath', 'northfold']
const WORDMARK_STYLES = [
  'font-sans font-bold',
  'font-display font-black tracking-tight',
  'font-serif italic',
  'font-serif font-semibold',
  'font-sans font-light tracking-[0.3em]',
  'font-display font-extrabold',
  'font-mono',
]

function Phone() {
  return (
    <div className="relative z-10 mx-auto w-64 rounded-t-[2.5rem] border-[6px] border-b-0 border-foreground bg-foreground md:w-72">
      <div className="flex flex-col gap-3 rounded-t-[2rem] bg-muted p-4 pb-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background">
              <Sparkles className="size-3" aria-hidden="true" />
            </span>
            Assistant
          </span>
          <span className="rounded-full bg-pop-2 px-2 py-0.5 text-[10px] font-semibold">Live</span>
        </div>
        <p className="self-end rounded-2xl rounded-br-sm bg-foreground px-3 py-2 text-xs leading-relaxed text-background">
          Best CRM for a 12-person sales team?
        </p>
        <p className="rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-xs leading-relaxed">
          Pipewise fits best. You&apos;re free Thursday — want me to book a demo?
        </p>
        <div className="flex flex-col gap-2 rounded-2xl bg-card p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sponsored · Pipewise</span>
          <span className="text-xs font-semibold">15-min demo, Thu 3:30 PM</span>
          <span className="rounded-full bg-foreground py-2 text-center text-xs font-medium text-background">Book it</span>
        </div>
      </div>
    </div>
  )
}

export function V8Reel() {
  return (
    <div className="theme-reel min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
        <span className="flex items-center gap-2 text-sm">
          <Sparkles className="size-6" aria-hidden="true" />
          <span className="hidden sm:inline">/ hello@revmaxx.ai</span>
        </span>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          <a href="#" className="flex items-center gap-1">
            Product <ChevronDown className="size-4" aria-hidden="true" />
          </a>
          <a href="#">Builders</a>
          <a href="#">Advertisers</a>
          <a href="#">Pricing</a>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hidden text-muted-foreground md:inline">
            Book a demo
          </a>
          <a href="#" className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground">
            Join the beta
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 pt-12 text-center md:pt-20">
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-balance md:text-7xl">
            {"Your AI could've booked that call."}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            RevMaxx is the ad network for AI agents — turning recommendations into bookings, quotes and signups users
            actually want.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              Monetize my agent
            </a>
            <a href="#" className="rounded-full border border-foreground px-6 py-3 text-sm font-medium">
              {"I'm an advertiser"}
            </a>
          </div>
        </section>

        <section className="relative mx-auto mt-12 max-w-5xl overflow-hidden px-5 md:pt-16" aria-label="Product preview">
          <div className="absolute inset-x-[10%] bottom-0 top-16 rounded-t-full bg-gradient-to-b from-pop/0 to-pop/60" aria-hidden="true" />

          <div className="absolute left-[8%] top-4 hidden w-44 overflow-hidden rounded-2xl bg-muted shadow-sm md:block">
            <Image src="/concepts/v8-rep.png" alt="Pipewise sales specialist on a call" width={400} height={400} className="aspect-square object-cover" />
            <span className="absolute left-2 top-2 rounded-full bg-card px-2 py-0.5 text-[10px] font-medium">Thu 3:30</span>
          </div>
          <span className="absolute left-[20%] top-56 hidden items-center gap-0.5 rounded-full bg-pop-3 px-3 py-1.5 md:flex" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-foreground" aria-hidden="true" />
            ))}
          </span>
          <div className="absolute bottom-10 left-0 hidden items-center gap-4 rounded-2xl bg-pop p-4 md:flex lg:left-[2%]">
            <span className="flex items-end gap-1" aria-hidden="true">
              {[14, 26, 18, 34].map((h) => (
                <span key={h} className="w-2.5 bg-foreground" style={{ height: h }} />
              ))}
            </span>
            <span className="flex flex-col">
              <span className="text-[11px]">Builder share</span>
              <span className="text-3xl font-medium">75%</span>
            </span>
          </div>

          <div className="absolute right-[6%] top-0 hidden w-52 flex-col gap-2 rounded-2xl bg-pop-2 p-4 md:flex">
            <span className="flex items-baseline gap-1">
              <span className="text-4xl font-medium">$240</span>
            </span>
            <span className="text-xs">Lead value, booked in-chat</span>
            <span className="flex w-fit items-center gap-1 rounded-full bg-card px-3 py-1 text-xs font-medium">
              <CalendarCheck className="size-3.5" aria-hidden="true" /> Booked
            </span>
          </div>
          <div className="absolute bottom-4 right-0 hidden w-52 flex-col gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm md:flex lg:right-[2%]">
            <span className="text-[11px] font-semibold text-muted-foreground">Prefilled from context</span>
            {['Acme Inc.', '12 seats', 'alex@acme.com'].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-xs">
                <Check className="size-3.5" aria-hidden="true" />
                {f}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="size-3.5 fill-pop-3 text-pop-3" aria-hidden="true" /> 0 fields retyped
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pb-4 md:hidden">
            <span className="rounded-full bg-pop-2 px-3 py-1.5 text-xs font-medium">$240 lead · booked</span>
            <span className="rounded-full bg-pop px-3 py-1.5 text-xs font-medium">75% to builders</span>
            <span className="rounded-full bg-pop-3 px-3 py-1.5 text-xs font-medium">0 fields retyped</span>
          </div>

          <Phone />
        </section>

        <section aria-label="Advertiser demand" className="border-t border-border">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-10 text-xl text-foreground/80">
            {ADVERTISERS.map((a, i) => (
              <li key={a} className={WORDMARK_STYLES[i]}>
                {a}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
