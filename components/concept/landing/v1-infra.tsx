import { ArrowRight } from 'lucide-react'
import { STEPS, TEAM } from './shared'

const CODE = `import { RevMaxx } from '@revmaxx/sdk'

const rm = new RevMaxx({ apiKey: process.env.REVMAXX_KEY })

const offer = await rm.intent({
  conversationId,
  query: 'best CRM for a 12-person sales team',
  context: { company: 'Acme', seats: 12 },
})

if (offer) render(offer.action)
// → { type: 'book_meeting', advertiser: 'Pipewise',
//     slots: [...], payout: { model: 'CPA' } }`

export function V1Infra() {
  return (
    <div className="theme-infra min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-sm text-primary-foreground">
            R
          </span>
          RevMaxx
        </span>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#how">How it works</a>
          <a href="#docs">Docs</a>
          <a href="#team">Team</a>
        </nav>
        <a href="#cta" className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background">
          Get API key
        </a>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-2 md:pt-16">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Now onboarding design partners
            </span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
              Integrated monetization for AI applications.
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              One API call turns commercial intent in your agent into booked meetings, quotes and signups — rendered
              natively, attributed automatically, paid out to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#cta"
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Start integrating <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#docs" className="rounded-md border border-border px-4 py-2.5 text-sm font-medium">
                Read the docs
              </a>
            </div>
          </div>
          <pre
            id="docs"
            className="overflow-x-auto rounded-xl bg-code p-5 font-mono text-xs leading-relaxed text-code-foreground md:text-sm"
          >
            <code>{CODE}</code>
          </pre>
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto grid max-w-6xl gap-px px-5 py-10 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-2 py-4">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Today</p>
              <p className="text-xl font-medium text-pretty">
                A list of links and a display ad. The user leaves your app. You earn fractions of a cent.
              </p>
            </div>
            <div className="flex flex-col gap-2 py-4">
              <p className="font-mono text-xs uppercase tracking-wider text-primary">With RevMaxx</p>
              <p className="text-xl font-medium text-pretty">
                Your agent books the call in a free slot, prefilled. The user never leaves. That lead is worth hundreds.
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">From intent to payout in four calls</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-2 border-t-2 border-foreground pt-4">
                <span className="font-mono text-xs text-muted-foreground">{`Step ${i + 1}`}</span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="team" className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Built by people from every side of the ad market
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="flex flex-col gap-2 rounded-xl border border-border p-5">
                <p className="font-semibold">
                  {m.name} <span className="font-normal text-muted-foreground">· {m.role}</span>
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance">
              Stop subsidizing inference. Keep 70–80% of ad spend.
            </h2>
            <a href="#" className="rounded-md bg-background px-4 py-2.5 text-sm font-medium text-foreground">
              Become a design partner
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl justify-between px-5 py-8 text-sm text-muted-foreground">
        <span>RevMaxx.ai</span>
        <span>Ad network for AI agents</span>
      </footer>
    </div>
  )
}
