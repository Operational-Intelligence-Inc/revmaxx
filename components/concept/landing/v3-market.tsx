import { AudienceToggle } from './v3-audience-toggle'
import { TEAM } from './shared'

const ADVERTISERS = ['Pipewise CRM', 'RateHarbor Insurance', 'Ledgerly Payroll']
const PUBLISHERS = ['Research agents', 'Shopping assistants', 'MCP skills']

const MODELS = [
  { name: 'CPC', body: 'Pay when a user engages with a sponsored recommendation.' },
  { name: 'CPA', body: 'Pay when a quote, signup or purchase completes in-chat.' },
  { name: 'Booked meeting', body: 'Pay when your sales team gets a call on the calendar.' },
]

function FlowColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      {items.map((item) => (
        <span key={item} className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium">
          {item}
        </span>
      ))}
    </div>
  )
}

export function V3Market() {
  return (
    <div className="theme-market min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-lg font-bold tracking-tight">
          revmaxx<span className="text-muted-foreground">.ai</span>
        </span>
        <nav aria-label="Main" className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <a href="#exchange">Exchange</a>
          <a href="#pricing">Pricing</a>
          <a href="#team">Team</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-8 md:grid-cols-[1.2fr_1fr] md:items-center md:pt-16">
          <AudienceToggle />
          <div
            id="exchange"
            aria-label="How the exchange connects advertisers and AI apps"
            className="flex flex-col gap-4 rounded-2xl bg-muted p-5"
          >
            <FlowColumn title="Demand" items={ADVERTISERS} />
            <div className="flex flex-col items-center gap-1 rounded-xl bg-primary px-4 py-5 text-center text-primary-foreground">
              <span className="text-sm font-semibold">RevMaxx exchange</span>
              <span className="text-xs opacity-75">Intent matching · real-time auction · attribution</span>
            </div>
            <FlowColumn title="Supply" items={PUBLISHERS} />
          </div>
        </section>

        <section id="pricing" className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-balance">Priced on outcomes, not impressions</h2>
              <p className="max-w-xl leading-relaxed text-muted-foreground">
                We keep 20–30% of spend. The rest goes to the apps, harnesses and skills that generate the intent.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {MODELS.map((m) => (
                <div key={m.name} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-[1fr_2fr]">
            <h2 className="text-3xl font-bold tracking-tight text-balance">A team that spans all three sides</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {TEAM.map((m) => (
                <div key={m.name} className="flex flex-col gap-1 border-t border-accent pt-4">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs uppercase tracking-wider text-accent">{m.role}</p>
                  <p className="text-sm leading-relaxed opacity-80">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-16 md:flex-row md:items-center md:justify-between">
          <p className="text-2xl font-bold tracking-tight text-balance">Monetization network for AI agents.</p>
          <div className="flex gap-3">
            <a href="#" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              {"I'm a builder"}
            </a>
            <a href="#" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground">
              {"I'm an advertiser"}
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
