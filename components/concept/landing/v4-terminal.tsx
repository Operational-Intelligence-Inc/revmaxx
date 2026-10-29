import { TEAM } from './shared'

const SESSION = [
  { kind: 'cmd', text: 'npx m10n init' },
  { kind: 'out', text: '✓ Detected Next.js app with AI SDK' },
  { kind: 'out', text: '✓ Added m10n middleware to /api/chat' },
  { kind: 'out', text: '✓ Registered tool: m10n.sponsored_action' },
  { kind: 'cmd', text: 'm10n simulate "best payroll tool for 20 people"' },
  { kind: 'out', text: '  intent      b2b_software.payroll  (0.94)' },
  { kind: 'out', text: '  auction     3 bids · winner Ledgerly' },
  { kind: 'out', text: '  action      book_meeting · prefilled 4/5 fields' },
  { kind: 'hi', text: '  est. payout $42.00 CPA' },
] as const

const SURFACES = [
  { name: 'chat apps', body: 'Consumer and B2B assistants with a UI.' },
  { name: 'agent harnesses', body: 'Middleware that routes intent before the model answers.' },
  { name: 'skills & MCP', body: 'Expose sponsored actions as tools any agent can call.' },
]

export function V4Terminal() {
  return (
    <div className="theme-terminal min-h-screen bg-background font-mono text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-border px-5 py-4 text-sm">
        <span className="font-semibold">
          m10n<span className="text-muted-foreground">.io</span>
        </span>
        <nav aria-label="Main" className="flex gap-5 text-muted-foreground">
          <a href="#surfaces" className="hidden sm:inline">
            surfaces
          </a>
          <a href="#team" className="hidden sm:inline">
            team
          </a>
          <a href="#cta" className="text-primary">
            get access →
          </a>
        </nav>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-5 py-14 md:py-20">
        <section className="flex flex-col gap-8">
          <p className="text-sm text-accent">{'// monetization for AI agents'}</p>
          <h1 className="font-sans text-4xl font-semibold leading-tight tracking-tight text-balance md:text-6xl">
            Ship monetization like you ship a feature.
          </h1>
          <p className="max-w-2xl font-sans text-lg leading-relaxed text-muted-foreground text-pretty">
            m10n plugs into your agent stack and turns buying intent into sponsored actions your model can take —
            booking, quoting, signing up — with attribution and payouts handled for you.
          </p>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-muted-foreground/40" />
              <span className="size-2.5 rounded-full bg-muted-foreground/40" />
              <span className="size-2.5 rounded-full bg-muted-foreground/40" />
              <span className="ml-3 text-xs text-muted-foreground">~/my-agent</span>
            </div>
            <div className="flex flex-col gap-1.5 overflow-x-auto p-5 text-xs leading-relaxed md:text-sm">
              {SESSION.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.kind === 'cmd'
                      ? 'mt-2 text-foreground first:mt-0'
                      : line.kind === 'hi'
                        ? 'text-accent'
                        : 'text-muted-foreground'
                  }
                >
                  {line.kind === 'cmd' && <span className="text-primary">$ </span>}
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="surfaces" className="flex flex-col gap-6">
          <h2 className="text-sm text-accent">{'## works wherever intent shows up'}</h2>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {SURFACES.map((s) => (
              <div key={s.name} className="flex flex-col gap-2 bg-background p-5">
                <h3 className="text-primary">{s.name}</h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm text-accent">{'## why'}</h2>
            <p className="font-sans text-2xl font-semibold leading-snug text-balance">
              Model calls are expensive. Subscriptions cap growth. Building an ads team from scratch is harder.
            </p>
          </div>
          <p className="self-end font-sans leading-relaxed text-muted-foreground">
            Current AI ads cram links and banners into a chat. We think the money is further down the funnel: a few
            pieces of context the agent already has can turn a recommendation into a lead worth hundreds of dollars.
          </p>
        </section>

        <section id="team" className="flex flex-col gap-6">
          <h2 className="text-sm text-accent">{'## maintainers'}</h2>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {TEAM.map((m) => (
              <li key={m.name} className="flex flex-col gap-1 py-4 md:flex-row md:gap-6">
                <span className="w-32 shrink-0 text-primary">@{m.name.toLowerCase()}</span>
                <span className="font-sans text-sm leading-relaxed text-muted-foreground">{m.bio}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="cta" className="flex flex-col gap-4 rounded-xl border border-primary/40 bg-card p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            <span className="text-primary">$</span> m10n request-access --design-partner
          </p>
          <a href="#" className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Request access
          </a>
        </section>
      </main>
    </div>
  )
}
