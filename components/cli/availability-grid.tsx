import { cn } from '@/lib/utils'
import { DAYS, HOUR_LABELS, MUTUAL_SLOTS, SLOTS_PER_DAY, cellState } from './availability'

const GLYPH = { you: '██', rep: '▓▓', open: '░░' } as const

export function AvailabilityGrid() {
  const offered = new Set(MUTUAL_SLOTS.map((s) => `${s.dayIndex}-${s.slot}`))

  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="sr-only">
        Week availability grid comparing your Google Calendar with the PostHog rep&apos;s calendar.
        Offered times are listed below.
      </figcaption>
      <div aria-hidden="true" className="flex flex-col overflow-x-auto whitespace-pre">
        <p className="text-terminal-muted">
          {'           '}
          {HOUR_LABELS.join('')}
        </p>
        {DAYS.map((day, d) => (
          <p key={day.label}>
            <span className="text-terminal-muted">{day.label.padEnd(11, ' ')}</span>
            {Array.from({ length: SLOTS_PER_DAY }, (_, s) => {
              const state = cellState(day, s)
              const isOffered = offered.has(`${d}-${s}`)
              return (
                <span
                  key={s}
                  className={cn(
                    state === 'you' && 'text-terminal-muted/70',
                    state === 'rep' && 'text-terminal-muted/30',
                    state === 'open' && 'text-sponsor/40',
                    isOffered && 'text-sponsor',
                  )}
                >
                  {isOffered ? '██' : GLYPH[state]}
                </span>
              )
            })}
            {day.you.length + day.rep.length >= SLOTS_PER_DAY && (
              <span className="text-terminal-muted">{'  no overlap'}</span>
            )}
          </p>
        ))}
      </div>
      <p aria-hidden="true" className="flex flex-wrap gap-x-4 text-terminal-muted">
        <span>
          <span className="text-terminal-muted/70">{'██'}</span>
          {' you busy'}
        </span>
        <span>
          <span className="text-terminal-muted/30">{'▓▓'}</span>
          {' rep busy'}
        </span>
        <span>
          <span className="text-sponsor/40">{'░░'}</span>
          {' both free'}
        </span>
        <span>
          <span className="text-sponsor">{'██'}</span>
          {' suggested'}
        </span>
      </p>
    </figure>
  )
}
