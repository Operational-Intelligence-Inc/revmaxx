import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const DEMOS = [
  {
    href: '/demo-chat',
    title: 'Insurance',
    description: 'A car insurance analysis that surfaces a sponsored quote request.',
  },
  {
    href: '/demo-edtech',
    title: 'Education',
    description: 'A FAFSA result with a funding gap, followed by a private loan lead form.',
  },
  {
    href: '/demo-roleplay',
    title: 'Roleplay',
    description: 'A character chat that introduces a sponsored travel insurance offer.',
  },
  {
    href: '/demo-cli',
    title: 'Developer CLI',
    description: 'A terminal session with a sponsored recommendation in context.',
  },
]

const STEPS = [
  {
    title: 'Understand intent',
    description: 'Spot the moments in a conversation where a user is ready to take the next step.',
  },
  {
    title: 'Match an offer',
    description: 'Present a relevant, clearly labeled offer from a partner at exactly that moment.',
  },
  {
    title: 'Capture the lead',
    description: 'Collect consented, qualified leads and share the revenue with the app.',
  },
]

export function HomeLanding() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          RevMaxx
        </Link>
        <nav aria-label="Primary">
          <a
            href="#demos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See the demos
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 pb-20 pt-16 md:pt-24">
          <p className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
            Revenue for conversational apps
          </p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-medium leading-tight md:text-6xl">
            Turn every conversation into revenue.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            RevMaxx connects high-intent moments inside AI chat to relevant partner offers, so apps earn more
            without breaking the experience.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#demos"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See it in action
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-11 items-center rounded-lg border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              How it works
            </a>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <h2 className="mb-10 text-balance font-serif text-2xl font-medium md:text-3xl">How it works</h2>
            <ol className="grid gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.title} className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="demos" className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="mb-2 text-balance font-serif text-2xl font-medium md:text-3xl">Live demos</h2>
          <p className="mb-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            The same idea across different kinds of conversations.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {DEMOS.map((demo) => (
              <li key={demo.href}>
                <Link
                  href={demo.href}
                  className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"
                >
                  <span className="flex items-center justify-between text-base font-semibold">
                    {demo.title}
                    <ArrowRight
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-pretty leading-relaxed text-muted-foreground">{demo.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RevMaxx
        </div>
      </footer>
    </div>
  )
}
