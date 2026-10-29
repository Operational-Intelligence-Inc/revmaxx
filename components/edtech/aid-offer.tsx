'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

type AidKind = 'gift' | 'loan' | 'work'

type AidItem = { name: string; kind: AidKind; amount: number }

export const COST_OF_ATTENDANCE = 48000

const AID_ITEMS: AidItem[] = [
  { name: 'Federal Pell Grant', kind: 'gift', amount: 5500 },
  { name: 'State Opportunity Grant', kind: 'gift', amount: 4500 },
  { name: 'Lakeview Merit Scholarship', kind: 'gift', amount: 10000 },
  { name: 'Direct Subsidized Loan', kind: 'loan', amount: 5500 },
  { name: 'Federal Work-Study', kind: 'work', amount: 2500 },
]

const TOTAL_AID = AID_ITEMS.reduce((sum, item) => sum + item.amount, 0)
export const FUNDING_GAP = COST_OF_ATTENDANCE - TOTAL_AID

const KIND_STYLE: Record<AidKind, { label: string; swatch: string }> = {
  gift: { label: 'Free money', swatch: 'bg-aiko-brand' },
  loan: { label: 'Repay later', swatch: 'bg-aiko-brand/55' },
  work: { label: 'Earn on campus', swatch: 'bg-aiko-brand/25' },
}

const money = (value: number) => `$${value.toLocaleString('en-US')}`

export function AidOffer() {
  const [grown, setGrown] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setGrown(true), 250)
    return () => clearTimeout(id)
  }, [])

  const segments = (['gift', 'loan', 'work'] as AidKind[]).map((kind) => ({
    kind,
    amount: AID_ITEMS.filter((item) => item.kind === kind).reduce((sum, item) => sum + item.amount, 0),
  }))

  return (
    <section
      aria-label="Financial aid offer from Lakeview University"
      className="w-full max-w-[36rem] overflow-hidden rounded-2xl border border-aiko-ink/10 bg-aiko-surface shadow-sm animate-in fade-in zoom-in-95 duration-500"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-aiko-ink/10 px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-aiko-success">
          <BadgeCheck className="size-5" aria-hidden />
          FAFSA approved
        </span>
        <span className="text-sm text-aiko-ink/65">Lakeview University · 2027–28</span>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-aiko-ink/65">Aid offered</span>
            <span className="text-3xl font-semibold tabular-nums">{money(TOTAL_AID)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-aiko-ink/65">Still to cover</span>
            <span className="text-3xl font-semibold tabular-nums">{money(FUNDING_GAP)}</span>
          </div>
        </div>

        <div
          role="img"
          aria-label={`${money(TOTAL_AID)} of aid covers part of the ${money(COST_OF_ATTENDANCE)} cost of attendance, leaving ${money(FUNDING_GAP)} uncovered`}
          className="flex h-11 gap-0.5 overflow-hidden rounded-lg"
        >
          {segments.map((segment) => (
            <div
              key={segment.kind}
              className={cn(
                'min-w-0 basis-0 transition-[flex-grow] duration-1000 ease-out motion-reduce:transition-none',
                KIND_STYLE[segment.kind].swatch,
              )}
              style={{ flexGrow: grown ? segment.amount : 0 }}
            />
          ))}
          <div
            className="flex min-w-0 basis-0 items-center justify-center overflow-hidden border-2 border-dashed border-aiko-ink/45 text-sm font-semibold whitespace-nowrap transition-[flex-grow] delay-500 duration-1000 ease-out motion-reduce:transition-none"
            style={{
              flexGrow: grown ? FUNDING_GAP : 0,
              backgroundImage:
                'repeating-linear-gradient(135deg, transparent 0 7px, color-mix(in oklab, var(--aiko-ink) 10%, transparent) 7px 14px)',
            }}
          >
            {grown && <span className="px-2">{money(FUNDING_GAP)} gap</span>}
          </div>
        </div>

        <ul className="flex flex-col divide-y divide-aiko-ink/10">
          {AID_ITEMS.map((item) => (
            <li key={item.name} className="flex items-center gap-3 py-2.5">
              <span className={cn('size-3 shrink-0 rounded-sm', KIND_STYLE[item.kind].swatch)} aria-hidden />
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="text-base font-medium">{item.name}</span>
                <span className="text-sm text-aiko-ink/65">{KIND_STYLE[item.kind].label}</span>
              </div>
              <span className="text-base font-semibold tabular-nums">{money(item.amount)}</span>
            </li>
          ))}
        </ul>

        <dl className="flex flex-col gap-1.5 rounded-xl bg-aiko-bg px-4 py-3 text-base">
          <div className="flex justify-between gap-3">
            <dt className="text-aiko-ink/70">Cost of attendance</dt>
            <dd className="font-medium tabular-nums">{money(COST_OF_ATTENDANCE)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-aiko-ink/70">Total aid offered</dt>
            <dd className="font-medium tabular-nums">− {money(TOTAL_AID)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-aiko-ink/15 pt-1.5 font-semibold">
            <dt>Remaining balance</dt>
            <dd className="tabular-nums">{money(FUNDING_GAP)}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
