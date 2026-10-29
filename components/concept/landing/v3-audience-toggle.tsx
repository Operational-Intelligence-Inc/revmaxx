'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const AUDIENCES = {
  builders: {
    label: 'For AI builders',
    headline: 'Turn every commercial question into revenue.',
    body: 'Plug in one API. We bring the advertisers, run the auction and render native actions in your agent. You keep 70–80%.',
    cta: 'Monetize my app',
    points: ['Revenue share on every conversion', 'Native components, your styling', 'You control categories and frequency'],
  },
  advertisers: {
    label: 'For advertisers',
    headline: 'Buy leads at the exact moment of decision.',
    body: 'Reach users while an AI is recommending what to buy. Pay per click, per lead or per booked meeting — with full conversation context.',
    cta: 'Start a campaign',
    points: ['CPC, CPA and booked-meeting bidding', 'Prefilled, qualified leads', 'Attribution back to the conversation'],
  },
} as const

type Audience = keyof typeof AUDIENCES

export function AudienceToggle() {
  const [audience, setAudience] = useState<Audience>('builders')
  const current = AUDIENCES[audience]

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Audience" className="flex w-fit rounded-full border border-border bg-card p-1">
        {(Object.keys(AUDIENCES) as Audience[]).map((key) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={audience === key}
            onClick={() => setAudience(key)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              audience === key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
            )}
          >
            {AUDIENCES[key].label}
          </button>
        ))}
      </div>
      <div key={audience} role="tabpanel" className="flex flex-col gap-6 animate-in fade-in duration-300">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">{current.headline}</h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{current.body}</p>
        <ul className="flex flex-col gap-2">
          {current.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-sm font-medium">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <a
          href="#cta"
          className="flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          {current.cta} <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
