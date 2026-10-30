import { ArrowDown, ArrowRight } from 'lucide-react'
import { InChatDemo, TEAM } from './shared'

const OLD_FUNNEL = ['Asks AI', 'Gets a list of links', 'Clicks out', 'Bounces']
const NEW_FUNNEL = ['Asks AI', 'Sees a prefilled offer', 'Books the call', 'Lead delivered']

function Funnel({ label, steps, strong }: { label: string; steps: string[]; strong?: boolean }) {
  return (
    <div
      className={
        strong
          ? 'flex flex-col gap-4 rounded-3xl bg-primary p-6 text-primary-foreground'
          : 'flex flex-col gap-4 rounded-3xl border-2 border-border p-6'
      }
    >
      <p className="font-mono text-xs uppercase tracking-widest">{label}</p>
      <ol className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col gap-2">
            <span className={strong ? 'text-2xl font-bold' : 'text-2xl font-bold opacity-60'}>{s}</span>
            {i < steps.length - 1 && <ArrowDown className="size-4 opacity-60" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function V5Poster() {
  return (
    <div className="theme-poster min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-xl font-black tracking-tighter">REVMAXX</span>
        <a href="#cta" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
          Get early access
        </a>
      </header>

      <main>
        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-16 pt-10 md:pt-16">
          <h1 className="text-5xl font-black leading-none tracking-tighter text-balance md:text-8xl">
            Links are worth cents. Leads are worth hundreds.
          </h1>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-lg text-lg font-medium leading-relaxed text-pretty">
              RevMaxx brings the conversion funnel inside your AI — so the app that earned the user&apos;s trust also
              earns the revenue.
            </p>
            <a
              href="#cta"
              className="flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
            >
              Monetize my AI <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:grid-cols-2">
          <Funnel label="Ads in AI today" steps={OLD_FUNNEL} />
          <Funnel label="With RevMaxx" steps={NEW_FUNNEL} strong />
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <blockquote className="flex flex-col gap-4">
              <p className="text-3xl font-bold leading-tight tracking-tight text-balance">
                {
                  '"I\'ve seen how collecting just a few key pieces of information can make a lead worth hundreds of dollars."'
                }
              </p>
              <footer className="font-mono text-sm opacity-80">Ju, co-founder · runs an 8-figure lead-gen business</footer>
            </blockquote>
            <div className="theme-poster rounded-2xl bg-transparent">
              <InChatDemo />
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20">
          <h2 className="text-4xl font-black tracking-tighter text-balance md:text-5xl">Three sides. One team.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="flex flex-col gap-2 rounded-3xl bg-card p-6 text-card-foreground">
                <p className="text-2xl font-black tracking-tight">{m.name}</p>
                <p className="font-mono text-xs uppercase tracking-widest">{m.role}</p>
                <p className="text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-6xl px-5 pb-16">
          <div className="flex flex-col gap-6 border-t-2 border-border pt-10 md:flex-row md:items-center md:justify-between">
            <p className="text-3xl font-black tracking-tighter text-balance">Keep 70–80% of every dollar.</p>
            <a href="#" className="w-fit rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">
              Become a design partner
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
