import { cn } from '@/lib/utils'
import { Bullet } from '../lines'

export const WORK_STEPS = [
  {
    label: 'Install posthog-js',
    call: 'Bash(pnpm add posthog-js)',
    result: '+ posthog-js 1.236.0 · done in 2.1s',
  },
  {
    label: 'Create the client provider',
    call: 'Write(app/providers.tsx)',
    result: 'Wrote 24 lines',
  },
  {
    label: 'Wrap the app in the provider',
    call: 'Update(app/layout.tsx)',
    result: '3 additions, 1 removal',
  },
  {
    label: 'Route events through your own domain',
    call: 'Update(next.config.mjs)',
    result: 'Added /ingest rewrites so ad blockers do not drop events',
  },
  {
    label: 'Add environment placeholders',
    call: 'Write(.env.example)',
    result: 'NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST',
  },
  {
    label: 'Capture signup and checkout events',
    call: 'Update(components/signup-form.tsx)',
    result: 'Added signup_completed, checkout_started',
  },
  {
    label: 'Verify the build',
    call: 'Bash(pnpm build)',
    result: 'Compiled successfully in 11.4s',
  },
] as const

export const WORK_DURATIONS = [4500, 4000, 4000, 5500, 3500, 5000, 8000] as const

export function WorkLog({ completed }: { completed: number }) {
  return (
    <div className="flex flex-col">
      <Bullet tone="accent">
        <p>
          <span className="font-bold">Update Todos</span>
          <span className="text-terminal-muted">{` (${completed}/${WORK_STEPS.length} done)`}</span>
        </p>
      </Bullet>
      <ul className="flex flex-col text-terminal-muted" aria-label="Setup progress">
        {WORK_STEPS.map((step, i) => {
          const done = i < completed
          const current = i === completed
          return (
            <li key={step.label} className="flex">
              <span aria-hidden="true" className="w-[2ch] shrink-0" />
              <span
                aria-hidden="true"
                className={cn('w-[5ch] shrink-0', current && 'text-terminal-accent')}
              >
                {done ? '[x]' : current ? '[~]' : '[ ]'}
              </span>
              <p className="min-w-0 text-pretty">
                <span className={cn(done && 'text-terminal-foreground', current && 'text-terminal-accent')}>
                  {step.label}
                </span>
                {(done || current) && (
                  <span className={cn('ml-3', current && 'animate-pulse')}>
                    {done ? `${step.call} → ${step.result}` : `${step.call}…`}
                  </span>
                )}
                <span className="sr-only">{done ? ' (done)' : current ? ' (in progress)' : ' (pending)'}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
