import { Copy, RotateCcw, ThumbsDown, ThumbsUp } from 'lucide-react'
import { SparkMark } from './spark-mark'
import { SponsoredCard } from './sponsored-card'

const BREAKDOWN = [
  { label: 'Your premium', value: '$214/mo', note: '$2,568/yr' },
  { label: 'Typical for your profile', value: '$150–$180/mo', note: 'Austin, clean record, age 34' },
  { label: 'Potential overpay', value: '$34–$64/mo', note: '~$400–$770/yr' },
]

export function AssistantMessage() {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both delay-150">
      <div className="flex flex-col gap-4 font-serif text-[16.5px] leading-relaxed text-foreground">
        <p>
          Short answer: <strong className="font-semibold">{"it's on the high side."}</strong> For a 34-year-old with a
          clean record driving a 2019 Honda CR-V in Austin, $214/month for full coverage is roughly 20–40% above
          what similar drivers typically pay.
        </p>

        <div className="overflow-hidden rounded-xl border border-border bg-card font-sans">
          <table className="w-full text-sm">
            <caption className="sr-only">Premium comparison</caption>
            <tbody>
              {BREAKDOWN.map((row, i) => (
                <tr key={row.label} className={i > 0 ? 'border-t border-border' : undefined}>
                  <th scope="row" className="px-4 py-3 text-left font-normal text-muted-foreground">
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-right">
                    <span className={i === 2 ? 'font-semibold text-primary' : 'font-semibold text-card-foreground'}>
                      {row.value}
                    </span>
                    <span className="block text-xs text-muted-foreground">{row.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>A few things likely pushing your rate up:</p>
        <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-muted-foreground">
          <li>
            <strong className="font-semibold">Deductible.</strong> A $500 deductible costs noticeably more than $1,000.
            Raising it often saves 10–15%.
          </li>
          <li>
            <strong className="font-semibold">Loyalty pricing.</strong> If you{"'"}ve been with the same insurer 3+
            years without shopping, renewal increases tend to compound quietly.
          </li>
          <li>
            <strong className="font-semibold">Missed discounts.</strong> Bundling with renters/home, paperless billing,
            paying in full, or a telematics program can each shave 5–20%.
          </li>
        </ul>

        <p>
          <strong className="font-semibold">My recommendation:</strong> pull 3–5 comparable quotes with identical
          coverage limits before your next renewal. Drivers with your profile who shop around commonly land in the
          $150–$170 range. If your current insurer won{"'"}t match, switching mid-term is usually penalty-free in Texas.
        </p>
      </div>

      <SponsoredCard />

      <div className="flex items-center gap-1 pt-1 text-muted-foreground">
        <SparkMark className="mr-2 size-5" />
        {[
          { icon: Copy, label: 'Copy' },
          { icon: ThumbsUp, label: 'Good response' },
          { icon: ThumbsDown, label: 'Bad response' },
          { icon: RotateCcw, label: 'Retry' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="rounded-md p-1.5 hover:bg-secondary hover:text-foreground"
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  )
}
