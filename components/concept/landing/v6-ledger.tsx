import {
  ArrowUpRight,
  CalendarCheck,
  Coins,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UserRound,
  Zap,
} from 'lucide-react'
import { STEPS, TEAM } from './shared'

const SUPPLY = ['Research agents', 'Shopping assistants', 'MCP skills', 'Agent harnesses']

const FEATURES = [
  {
    icon: UserRound,
    title: 'Users stay in flow',
    body: 'No click-outs or retyping. The assistant already knows the company, team size and free slots.',
  },
  {
    icon: Coins,
    title: 'Builders earn real revenue',
    body: 'Down-funnel actions pay CPA rates, not display CPMs — enough to cover the model calls behind them.',
  },
  {
    icon: ShieldCheck,
    title: 'Advertisers get qualified leads',
    body: 'Every action carries the context of the conversation that produced it. Pay only when it converts.',
  },
]

const PLANS = [
  { name: 'CPC', price: 'Per engaged click', featured: false },
  { name: 'CPA', price: 'Per completed quote or signup', featured: false },
  { name: 'Booked meeting', price: 'Per call on the calendar', featured: true },
]

const EARNINGS = [8, 14, 22, 31, 44, 58, 70]

function Logo() {
  return (
    <span className="flex items-center gap-2 text-lg font-bold tracking-tight text-accent">
      <span className="flex size-6 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Zap className="size-3.5" aria-hidden="true" />
      </span>
      RevMaxx
    </span>
  )
}

function HeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm pb-10 pr-6 md:pr-10">
      <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-xl shadow-accent/10">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Research assistant</span>
            <span className="text-[11px] text-muted-foreground">Sponsored · Pipewise</span>
          </div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <span className="text-[11px] text-muted-foreground">Lead value</span>
          <p className="text-2xl font-semibold tabular-nums">$240.00</p>
          <span className="text-[11px] text-muted-foreground">Demo · Thu 3:30 PM</span>
        </div>
        {['Acme Inc. · 12 seats', 'alex@acme.com'].map((row, i) => (
          <span
            key={row}
            className={
              i === 0
                ? 'flex items-center justify-between rounded-lg border border-primary px-3 py-2 text-xs'
                : 'flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs'
            }
          >
            {row}
            <span className={i === 0 ? 'size-3 rounded-full border-4 border-primary' : 'size-3 rounded-full border border-border'} />
          </span>
        ))}
        <span className="rounded-lg bg-accent py-2.5 text-center text-xs font-semibold text-accent-foreground">
          Book the call
        </span>
      </div>
      <div className="absolute -right-0 top-6 flex w-40 flex-col justify-between gap-6 rounded-2xl bg-primary p-4 text-primary-foreground shadow-lg md:w-44">
        <span className="text-[11px] opacity-80">Your payout</span>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold tabular-nums">$42.00</span>
          <span className="text-[11px] opacity-80">CPA · 75% share</span>
        </div>
      </div>
    </div>
  )
}

function EarningsChart() {
  const max = Math.max(...EARNINGS)
  const points = EARNINGS.map((v, i) => `${(i / (EARNINGS.length - 1)) * 100},${100 - (v / max) * 90}`).join(' ')
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground">Monthly payouts · illustrative</span>
          <span className="text-xl font-semibold tabular-nums">$18,420</span>
        </div>
        <span className="rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">6 months</span>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full" aria-hidden="true">
        <polygon points={`0,100 ${points} 100,100`} className="fill-primary/10" />
        <polyline points={points} fill="none" className="stroke-primary" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  )
}

export function V6Ledger() {
  return (
    <div className="theme-ledger min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <Logo />
        <nav aria-label="Main" className="hidden gap-8 text-sm md:flex">
          <a href="#how">How it works</a>
          <a href="#why">Builders</a>
          <a href="#pricing">Advertisers</a>
          <a href="#team">Team</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden rounded-lg border border-border bg-card px-4 py-2 text-sm md:inline-flex">
            Log in
          </a>
          <a href="#cta" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Apply
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-16">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-accent text-balance md:text-6xl">
              Monetization network for AI agents.
            </h1>
            <p className="max-w-md leading-relaxed text-muted-foreground text-pretty">
              Turn commercial intent into in-chat bookings, quotes and signups. Get paid on outcomes, not impressions —
              and keep 70–80% of every dollar.
            </p>
            <form className="flex w-full max-w-md gap-2 rounded-xl bg-card p-1.5 shadow-sm" action="#">
              <label htmlFor="v6-url" className="sr-only">
                Your app URL
              </label>
              <input
                id="v6-url"
                type="url"
                placeholder="yourapp.ai"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                Get started <ArrowUpRight className="size-4" aria-hidden="true" />
              </button>
            </form>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-accent/70">
              {SUPPLY.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <HeroCard />
        </section>

        <section className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-10 rounded-3xl bg-card p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Ads that do things</p>
                <h2 className="max-w-sm text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                  {"Your AI could've booked that call."}
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                Recommendations become native actions that users actually want — and pay the builders who make them
                possible.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-2">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-20">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Why builders switch</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Links are worth cents. Leads are worth hundreds.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-8 rounded-2xl bg-muted p-6">
              <p className="text-6xl font-semibold tracking-tight text-primary">70–80%</p>
              <p className="max-w-56 font-medium">Of every advertiser dollar goes to your app</p>
            </div>
            <div className="flex flex-col justify-between gap-8 rounded-2xl bg-muted p-6">
              <p className="max-w-64 font-medium">Intent in the chat, a meeting on the calendar</p>
              <div className="flex items-center gap-4" aria-hidden="true">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <MessageSquareText className="size-5" />
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <CalendarCheck className="size-5" />
                </span>
              </div>
            </div>
            <div className="grid gap-6 rounded-2xl bg-muted p-6 md:col-span-2 md:grid-cols-[1fr_1.6fr] md:items-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Revenue that covers your model bill</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Subscription walls stop free users from converting. Outcome-priced actions earn on every commercial
                  conversation instead.
                </p>
              </div>
              <EarningsChart />
            </div>
          </div>
        </section>

        <section id="how" className="bg-accent text-accent-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70">How it works</p>
              <h2 className="max-w-md text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                One API call between a question and a paid outcome.
              </h2>
            </div>
            <ol className="grid gap-4 md:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-3 rounded-2xl bg-accent-foreground/5 p-5">
                  <span className="text-4xl font-semibold opacity-40">{i + 1}</span>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="team" className="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-20">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">The team</p>
            <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              {"We've built all three sides of this market"}
            </h2>
          </div>
          <div className="grid gap-8 text-center md:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-1">
                <p className="text-3xl font-semibold">{m.name}</p>
                <p className="text-xs text-primary">{m.role}</p>
                <p className="max-w-60 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            ))}
          </div>

          <div id="pricing" className="flex flex-col gap-4">
            <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Advertisers choose a goal
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {PLANS.map((p) => (
                <a
                  key={p.name}
                  href="#cta"
                  className={
                    p.featured
                      ? 'flex min-h-36 flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground'
                      : 'flex min-h-36 flex-col justify-between rounded-2xl bg-muted p-6'
                  }
                >
                  <span className="text-2xl font-semibold">{p.name}</span>
                  <span className="flex items-center justify-between text-sm">
                    {p.price}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-6xl px-5 pb-16">
          <div className="flex flex-col gap-6 rounded-3xl bg-accent p-8 text-accent-foreground md:flex-row md:items-center md:justify-between md:p-12">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70">Design partners</p>
              <h2 className="max-w-sm text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                Ready to monetize your agent?
              </h2>
              <p className="max-w-sm text-sm leading-relaxed opacity-70">
                Advertiser demand is ready to spend. We&apos;re onboarding a small group of AI apps first.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                Apply now
              </a>
              <a href="#how" className="flex items-center gap-1 rounded-lg border border-accent-foreground/30 px-5 py-2.5 text-sm">
                Learn more <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-border px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <Logo />
        <p>© 2026 RevMaxx. Monetization for AI agents.</p>
      </footer>
    </div>
  )
}
