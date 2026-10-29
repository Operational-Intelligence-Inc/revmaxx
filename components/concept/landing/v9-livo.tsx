import Image from 'next/image'
import { ArrowRight, CircleUserRound, Gavel, LogIn, Sparkles } from 'lucide-react'

const BIDS = [
  { name: 'Pipewise', goal: 'Booked meeting', bid: '$240', win: true },
  { name: 'Northfold CRM', goal: 'CPA', bid: '$95', win: false },
  { name: 'Ledgerly', goal: 'CPC', bid: '$4.10', win: false },
]

const SUPPLY = ['Research agents', 'Shopping assistants', 'MCP skills', 'Agent harnesses', 'Vertical copilots']

const TILES = [
  { src: '/concepts/v9-user.png', label: 'User · asking', className: 'left-0 top-6' },
  { src: '/concepts/v9-rep.png', label: 'Pipewise AE · booked', className: 'right-0 top-6' },
  { src: '/concepts/v9-builder.png', label: 'Builder · +$42', className: 'bottom-6 left-0' },
]

function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-pop to-pop-2 bg-clip-text text-transparent">{children}</span>
}

function AuctionCard() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-72 flex-col overflow-hidden rounded-3xl bg-card shadow-xl shadow-pop/10">
      <div className="flex flex-col gap-4 bg-primary p-5 text-primary-foreground">
        <span className="text-lg font-medium leading-tight">Live auction</span>
        <div className="flex h-12 items-end gap-0.5" aria-hidden="true">
          {[6, 14, 9, 22, 16, 30, 12, 26, 38, 18, 10, 28, 20, 34, 14, 8, 24, 16].map((h, i) => (
            <span key={i} className="w-1.5 rounded-full bg-primary-foreground/70" style={{ height: h }} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-border px-5 py-3 text-xs">
        <span className="tabular-nums font-medium">00:00:84 ms</span>
        <span className="flex items-center gap-1 text-pop">
          <Sparkles className="size-3.5" aria-hidden="true" /> Matching intent…
        </span>
      </div>
      <ul className="flex flex-col gap-3 p-5">
        {BIDS.map((b) => (
          <li key={b.name} className={b.win ? 'flex items-center justify-between text-sm' : 'flex items-center justify-between text-sm opacity-50'}>
            <span className="flex flex-col">
              <span className="font-medium">{b.name}</span>
              <span className="text-[11px] text-muted-foreground">{b.goal}</span>
            </span>
            <span className={b.win ? 'rounded-full bg-gradient-to-r from-pop to-pop-2 px-2.5 py-1 text-xs font-semibold text-primary-foreground' : 'text-xs tabular-nums'}>
              {b.bid}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function V9Livo() {
  return (
    <div className="theme-livo min-h-screen bg-gradient-to-br from-pop to-pop-2 p-2 font-sans text-foreground md:p-6">
      <div className="overflow-hidden rounded-[2rem] bg-frame">
        <div className="bg-background">
          <header className="flex items-center justify-between px-5 py-5 md:px-10">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Gavel className="size-5" aria-hidden="true" />
              <span className="sr-only">RevMaxx</span>
            </span>
            <nav aria-label="Main" className="hidden gap-10 text-sm md:flex">
              <a href="#">How it works</a>
              <a href="#">Builders</a>
              <a href="#">Advertisers</a>
              <a href="#">Pricing</a>
            </nav>
            <div className="flex gap-2">
              <a href="#" className="flex size-10 items-center justify-center rounded-xl border border-border" aria-label="Log in">
                <LogIn className="size-4" aria-hidden="true" />
              </a>
              <a href="#" className="flex size-10 items-center justify-center rounded-xl bg-card" aria-label="Account">
                <CircleUserRound className="size-4" aria-hidden="true" />
              </a>
            </div>
          </header>

          <section className="grid items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[1.1fr_1fr] md:px-10 md:pb-20 md:pt-14">
            <div className="flex flex-col gap-8">
              <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-7xl">
                <GradientText>Monetization</GradientText> network for AI agents
              </h1>
              <p className="max-w-lg leading-relaxed text-muted-foreground text-pretty">
                RevMaxx reads commercial intent mid-conversation, runs a real-time auction and renders a native action —
                a booking, quote or signup — prefilled from context. You keep 70–80%.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-pop to-pop-2 px-6 py-4 font-medium text-primary-foreground shadow-lg shadow-pop/20"
                >
                  <span className="flex size-6 items-center justify-center rounded-full border border-primary-foreground/60">
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                  Start earning
                </a>
                <a href="#" className="rounded-2xl border border-border bg-card px-6 py-4 font-medium">
                  {"I'm an advertiser"}
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {['One API call', 'Paid per outcome', 'No subscription wall'].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full border border-foreground" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex min-h-[28rem] items-center justify-center">
              {TILES.map((t) => (
                <figure key={t.src} className={`absolute hidden w-36 overflow-hidden rounded-2xl ring-4 ring-card lg:block ${t.className}`}>
                  <Image src={t.src || '/placeholder.svg'} alt="" width={320} height={240} className="aspect-[4/3] object-cover" />
                  <figcaption className="absolute bottom-1.5 left-1.5 rounded-full bg-primary/70 px-2 py-0.5 text-[10px] text-primary-foreground">
                    {t.label}
                  </figcaption>
                </figure>
              ))}
              <AuctionCard />
            </div>
          </section>
        </div>

        <section className="flex flex-col gap-8 px-5 py-10 md:px-10">
          <p className="flex flex-col items-center justify-center gap-2 text-center text-sm md:flex-row">
            <span>
              <strong className="font-semibold">Design partners</strong> get advertiser demand on day one
            </span>
            <a href="#" className="flex items-center gap-1">
              <GradientText>Apply for early access</GradientText>
              <ArrowRight className="size-3.5 text-pop-2" aria-hidden="true" />
            </a>
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold">
            {SUPPLY.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
