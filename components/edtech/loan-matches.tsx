import { Check } from 'lucide-react'
import type { LoanLead } from './loan-form'

const LENDERS = [
  { name: 'Northgate Student Lending', apr: '4.19% – 11.49% fixed', note: 'Cosigner release after 24 on-time payments', best: true },
  { name: 'Harbor Community Credit Union', apr: '4.59% – 9.95% fixed', note: 'No origination or late fees' },
  { name: 'Summit Education Finance', apr: '5.29% – 12.99% variable', note: 'Pay interest only while in school' },
]

export function LoanMatches({ data }: { data: LoanLead }) {
  const amount = Number(data.amount).toLocaleString('en-US')

  return (
    <aside
      aria-label="Sponsored: Bridgewell loan matches"
      className="w-full max-w-[36rem] overflow-hidden rounded-2xl border border-aiko-ink/10 bg-aiko-surface shadow-sm animate-in fade-in zoom-in-95 duration-500"
    >
      <div className="flex items-center justify-between gap-3 border-b border-aiko-ink/10 px-5 py-3">
        <span className="flex items-center gap-2 text-base font-semibold">
          <span className="flex size-6 items-center justify-center rounded-full bg-aiko-success text-aiko-surface">
            <Check className="size-3.5" aria-hidden />
          </span>
          3 lenders matched
        </span>
        <span className="rounded-full border border-aiko-ink/30 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
          Sponsored
        </span>
      </div>
      <div className="flex flex-col gap-4 px-5 py-5">
        <p className="text-base leading-relaxed text-aiko-ink/75">
          Estimated options for <span className="font-semibold text-aiko-ink">${amount}</span> at {data.school}. Final offers
          are on their way to <span className="font-semibold text-aiko-ink">{data.email}</span>.
        </p>
        <ul className="flex flex-col gap-2">
          {LENDERS.map((lender) => (
            <li
              key={lender.name}
              className={`flex flex-col gap-0.5 rounded-lg border px-3 py-2.5 ${
                lender.best ? 'border-aiko-brand ring-1 ring-aiko-brand' : 'border-aiko-ink/15'
              }`}
            >
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-base font-semibold">
                  {lender.name}
                  {lender.best && (
                    <span className="rounded bg-aiko-brand px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-aiko-surface uppercase">
                      Lowest rate
                    </span>
                  )}
                </span>
                <span className="text-base font-semibold tabular-nums">{lender.apr}</span>
              </span>
              <span className="text-sm text-aiko-ink/65">{lender.note}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-aiko-ink/55">
          Illustrative rates for demonstration only. Actual terms depend on credit, cosigner, and lender approval.
        </p>
      </div>
    </aside>
  )
}
