import Image from 'next/image'
import { ArrowUpRight, CalendarCheck, Check, Link2 } from 'lucide-react'
import { InChatDemo, TEAM } from './shared'
import { V10ApplyForm } from './v10-apply-form'

const SUPPLY = ['Research agents', 'Shopping assistants', 'MCP skills', 'Harnesses', 'Copilots']

const STEPS = [
  { title: 'Send intent', body: 'Your app calls our API when a conversation turns commercial.' },
  { title: 'We run the auction', body: 'Relevant advertisers bid in real time on CPC, CPA or booked-meeting goals.' },
  { title: 'Render a native action', body: 'A booking, quote or signup appears in-chat, prefilled from context.' },
  { title: 'Get paid', body: 'Attribution is built in. You keep 90% of every dollar spent.' },
]

const GOALS = [
  { name: 'CPC', body: 'Pay per engaged click from a high-intent conversation.' },
  { name: 'CPA', body: 'Pay per completed quote, trial or signup.' },
  { name: 'Booked meeting', body: 'Pay only when a qualified call lands on your calendar.', featured: true },
]

function Logo() {
  return (
    <span className="flex items-center gap-2 text-xl font-semibold tracking-tight">
      <span className="flex size-8 flex-col overflow-hidden rounded-full" aria-hidden="true">
        <span className="h-1/2 bg-foreground" />
        <span className="h-1/2 translate-x-1 rounded-b-full bg-foreground" />
      </span>
      RevMaxx
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-medium">
      <span className="size-2 rounded-full bg-pop" aria-hidden="true" />
      {children}
    </p>
  )
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-gradient-to-b from-muted via-muted/50 to-background px-5 pb-12 pt-10 md:grid-cols-2 md:px-14 md:pb-16 md:pt-16">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            %
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-medium">90% to builders</span>
            <a href="#goals" className="text-sm font-semibold underline underline-offset-4">
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
        <hr className="border-foreground/15" />
        <div className="flex flex-wrap gap-3">
          <a href="#cta" className="rounded-full bg-primary px-6 py-3.5 text-primary-foreground">
            Become a design partner
          </a>
          <a href="#goals" className="rounded-full border border-border bg-card px-6 py-3.5">
            For advertisers
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div className="relative overflow-hidden rounded-[2rem]">
          <Image
            src="/concepts/v10-hero.png"
            alt="AI app founder at his desk with a laptop showing code and a chat interface"
            width={928}
            height={1152}
            className="aspect-[4/5] w-full object-cover"
            priority
          />

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

        <div className="absolute -right-2 top-6 flex w-32 flex-col gap-1 rounded-3xl border border-card/60 bg-card/70 p-4 backdrop-blur-md md:-right-10 md:w-40">
          <span className="text-xs md:text-sm">Your payout</span>
          <span className="text-3xl font-medium md:text-4xl">$420</span>
          <span className="text-xs text-foreground/80 md:text-sm">per booked demo</span>
        </div>

        <div className="absolute -bottom-6 -right-2 flex items-center gap-3 rounded-3xl border border-card/60 bg-card/80 p-3 backdrop-blur-md md:-right-10">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-pop text-primary-foreground">
            <CalendarCheck className="size-6" aria-hidden="true" />
          </span>
          <span className="flex flex-col pr-2">
            <span className="text-sm">Pipewise demo</span>
            <span className="text-xl font-medium">Thu 3:30 PM</span>
            <span className="w-fit rounded-full bg-muted px-2 py-0.5 text-xs">Booked in-chat</span>
          </span>
        </div>
      </div>
    </section>
  )
}

function Economics() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-2 py-16 md:px-8 md:py-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <SectionLabel>The math</SectionLabel>
          <h2 className="max-w-2xl font-serif text-5xl font-black leading-none tracking-tight text-balance md:text-7xl">
            Cents<span className="font-light">, or</span> hundreds.
          </h2>
        </div>
        <p className="max-w-sm text-lg leading-relaxed text-muted-foreground text-pretty">
          The same commercial question can pay you for a link — or for the meeting it leads to.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between gap-16 rounded-[2rem] bg-muted p-8 md:p-10">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Affiliate link</span>
            <span className="flex size-12 items-center justify-center rounded-full bg-card" aria-hidden="true">
              <Link2 className="size-5" />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-serif text-7xl font-black tracking-tight text-muted-foreground md:text-8xl">$0.04</span>
            <span className="text-muted-foreground">per click, if the user ever leaves the chat</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-16 rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-10">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Booked demo with RevMaxx</span>
            <span className="flex size-12 items-center justify-center rounded-full bg-pop" aria-hidden="true">
              <CalendarCheck className="size-5" />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-serif text-7xl font-black tracking-tight md:text-8xl">$420</span>
            <span className="text-primary-foreground/70">your 90% of a $467 qualified-meeting bid</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Demo() {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="grid items-center gap-10 rounded-[2rem] bg-muted px-5 py-12 md:grid-cols-[1fr_1.1fr] md:px-14 md:py-16">
        <div className="flex flex-col gap-6">
          <SectionLabel>Ads that do things</SectionLabel>
          <h2 className="font-serif text-4xl font-black leading-tight tracking-tight text-balance md:text-6xl">
            {"Your AI could've booked that call."}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Recommendations become native actions — prefilled with what the assistant already knows. No click-outs, no
            retyping, no banner.
          </p>
          <ul className="flex flex-col gap-3">
            {['Users stay in flow', 'Advertisers get conversation context', 'You get paid on the outcome'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <InChatDemo className="rounded-[1.5rem] border-0 shadow-xl shadow-foreground/5" />
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="mx-auto flex max-w-7xl flex-col gap-10 px-2 py-16 md:px-8 md:py-24">
      <div className="flex flex-col gap-4">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="max-w-2xl font-serif text-4xl font-black leading-tight tracking-tight text-balance md:text-6xl">
          One API call between a question and a paid outcome.
        </h2>
      </div>
      <ol className="grid border-t border-foreground/15 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="flex flex-col gap-3 border-b border-foreground/15 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
          >
            <span className="font-serif text-5xl font-light">{i + 1}</span>
            <h3 className="text-xl font-medium">{s.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Goals() {
  return (
    <section id="goals" className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-10 rounded-[2rem] bg-gradient-to-b from-muted to-background px-5 py-12 md:px-14 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <SectionLabel>For advertisers</SectionLabel>
            <h2 className="max-w-xl font-serif text-4xl font-black leading-tight tracking-tight text-balance md:text-6xl">
              Pay for outcomes, not impressions.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            Every lead carries the conversation that produced it, so your sales team knows exactly why they&apos;re
            calling.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {GOALS.map((g) => (
            <a
              key={g.name}
              href="#cta"
              className={
                g.featured
                  ? 'flex min-h-56 flex-col justify-between gap-8 rounded-[1.5rem] bg-primary p-6 text-primary-foreground'
                  : 'flex min-h-56 flex-col justify-between gap-8 rounded-[1.5rem] bg-card p-6'
              }
            >
              <span className="flex items-start justify-between gap-4">
                <span className="font-serif text-3xl font-black">{g.name}</span>
                <span
                  className={
                    g.featured
                      ? 'flex size-10 items-center justify-center rounded-full bg-pop'
                      : 'flex size-10 items-center justify-center rounded-full bg-muted'
                  }
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </span>
              <span className={g.featured ? 'leading-relaxed text-primary-foreground/70' : 'leading-relaxed text-muted-foreground'}>
                {g.body}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="mx-auto flex max-w-7xl flex-col gap-10 px-2 py-16 md:px-8 md:py-24">
      <div className="flex flex-col gap-4">
        <SectionLabel>The team</SectionLabel>
        <h2 className="max-w-2xl font-serif text-4xl font-black leading-tight tracking-tight text-balance md:text-6xl">
          {"We've built all three sides of this market."}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {TEAM.map((m) => (
          <div key={m.name} className="flex flex-col gap-6 rounded-[1.5rem] border border-border p-6">
            <span className="flex size-14 items-center justify-center rounded-full bg-muted font-serif text-2xl font-black">
              {m.name[0]}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-medium">{m.name}</h3>
              <p className="text-sm font-medium text-pop">{m.role}</p>
            </div>
            <p className="leading-relaxed text-muted-foreground">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section id="cta" className="mx-auto max-w-7xl pb-6">
      <div className="flex flex-col gap-10 rounded-[2rem] bg-primary px-5 py-14 text-primary-foreground md:flex-row md:items-end md:justify-between md:px-14 md:py-20">
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="size-2 rounded-full bg-pop" aria-hidden="true" />
            Design partners
          </p>
          <h2 className="font-serif text-7xl font-black leading-none tracking-tight md:text-9xl">
            Earn<sup className="ml-1 align-super text-5xl font-light md:text-6xl">+</sup>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-primary-foreground/70">
            Advertiser demand is ready to spend. We&apos;re onboarding a small group of AI apps first — and they keep 90%.
          </p>
        </div>
        <V10ApplyForm />
      </div>
    </section>
  )
}

export function V10Grow() {
  return (
    <div className="theme-grow min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 md:px-10">
        <Logo />
        <a href="#cta" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground md:text-base">
          Apply — it&apos;s free
        </a>
      </header>

      <main className="px-3 md:px-6">
        <Hero />

        <section aria-label="Where RevMaxx runs">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-4 px-5 py-14 font-serif text-2xl font-semibold">
            {SUPPLY.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <Demo />
        <Economics />
        <Goals />
        <HowItWorks />
        <Team />
        <Cta />
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <Logo />
        <p>© 2026 RevMaxx. Monetization for AI agents.</p>
      </footer>
    </div>
  )
}
