import { Code2, Megaphone, UserRound, X, Check } from 'lucide-react'
import { InChatDemo } from './shared'

const AUDIENCES = [
  {
    icon: UserRound,
    title: 'Users stay in flow',
    body: 'No click-outs, no retyping. The assistant already knows the company, the team size and the free slots.',
  },
  {
    icon: Code2,
    title: 'Builders earn real revenue',
    body: 'Down-funnel actions pay CPA rates, not display CPMs — enough to cover the model calls behind them.',
  },
  {
    icon: Megaphone,
    title: 'Advertisers get qualified leads',
    body: 'Every action carries the context of the conversation that produced it. Pay only when it converts.',
  },
]

const COMPARE = [
  ['Links and a banner at the end', 'A booking or quote, inline'],
  ['User clicks out of your app', 'User never leaves the chat'],
  ['Retypes everything on a landing page', 'Fields prefilled from context'],
  ['Paid per impression', 'Paid per lead or meeting'],
]

export function V2Convo() {
  return (
    <div className="theme-convo min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <span className="font-serif text-xl font-semibold">RevMaxx</span>
        <a href="#cta" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Join the beta
        </a>
      </header>

      <main>
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 pb-12 pt-10 text-center md:pt-20">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-balance md:text-6xl">
            {"Your AI could've booked that call."}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            RevMaxx is the ad network for AI agents. We turn recommendations into actions users actually want — and pay
            the builders who make them possible.
          </p>
        </section>

        <section className="mx-auto max-w-2xl px-5 pb-20">
          <InChatDemo className="shadow-xl shadow-foreground/5" />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            What a sponsored result looks like inside your assistant.
          </p>
        </section>

        <section className="bg-card">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-20 md:grid-cols-3">
            {AUDIENCES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="font-serif text-xl font-semibold">{title}</h2>
                <p className="leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-20">
          <h2 className="text-center font-serif text-3xl font-semibold text-balance">Ads that do things</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-2 border-b border-border bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Display ads in AI</span>
              <span>RevMaxx</span>
            </div>
            {COMPARE.map(([before, after]) => (
              <div key={before} className="grid grid-cols-2 gap-4 border-b border-border px-4 py-4 text-sm last:border-0">
                <span className="flex items-start gap-2 text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {before}
                </span>
                <span className="flex items-start gap-2 font-medium">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {after}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-5xl px-5 pb-20">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground">
            <h2 className="font-serif text-3xl font-semibold text-balance">Monetize your agent without a subscription wall</h2>
            <p className="max-w-md leading-relaxed opacity-80">
              We&apos;re onboarding a small group of AI apps as design partners, with advertiser demand ready to spend.
            </p>
            <a href="#" className="rounded-full bg-card px-5 py-2.5 text-sm font-medium text-card-foreground">
              Apply as a design partner
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
