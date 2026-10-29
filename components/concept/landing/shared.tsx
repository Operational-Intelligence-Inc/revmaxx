import { CalendarCheck, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const TEAM = [
  {
    name: 'Patrick',
    role: 'Ads infrastructure',
    bio: 'Built ad serving, measurement and conversion systems at Google and Quora.',
  },
  {
    name: 'Julia',
    role: 'AI product',
    bio: 'Eight years at Quora, led the Poe core product team. Has lived the AI margin problem first-hand.',
  },
  {
    name: 'Ju',
    role: 'Advertiser demand',
    bio: 'Runs a performance-marketing and lead-gen business doing $50M a year.',
  },
] as const

export const STEPS = [
  { title: 'Send intent', body: 'Your app calls our API when a conversation turns commercial.' },
  { title: 'We run the auction', body: 'Relevant advertisers bid in real time on CPC, CPA or booked-meeting goals.' },
  { title: 'Render a native action', body: 'A booking, quote or signup appears in-chat, prefilled from context.' },
  { title: 'Get paid', body: 'Attribution is built in. You keep 70–80% of every dollar spent.' },
] as const

const SLOTS = ['Thu 2:00 PM', 'Thu 3:30 PM', 'Fri 10:00 AM']

export function InChatDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 text-left font-sans text-card-foreground md:p-6',
        className,
      )}
    >
      <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-sm leading-relaxed">
        {"What's the best CRM for a 12-person sales team? We're outgrowing spreadsheets."}
      </p>
      <div className="flex gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <p className="text-sm leading-relaxed">
            {
              "For a team your size, Pipewise is the strongest fit: native email sync and pricing built for teams under 50. You're free Thursday afternoon — want me to book a demo?"
            }
          </p>
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-3 text-foreground">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sponsored · Pipewise
              </span>
              <CalendarCheck className="size-4 text-primary" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold">15-min demo with a Pipewise specialist</p>
            <div className="flex flex-wrap gap-1.5">
              {['Acme Inc.', '12 seats', 'alex@acme.com'].map((chip) => (
                <span key={chip} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                  <Check className="size-3 text-primary" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {SLOTS.map((slot, i) => (
                <span
                  key={slot}
                  className={cn(
                    'rounded-md border px-1 py-1.5 text-center text-xs tabular-nums',
                    i === 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                  )}
                >
                  {slot}
                </span>
              ))}
            </div>
            <span className="flex items-center justify-center rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground">
              Book Thu 3:30 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
