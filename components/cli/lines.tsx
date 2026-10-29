import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function UserLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex text-terminal-muted">
      <span aria-hidden="true" className="w-[2ch] shrink-0">
        {'>'}
      </span>
      <p className="min-w-0 text-pretty">{children}</p>
    </div>
  )
}

export function Bullet({
  children,
  tone = 'default',
}: {
  children: ReactNode
  tone?: 'default' | 'accent' | 'sponsor'
}) {
  return (
    <div className="flex">
      <span
        aria-hidden="true"
        className={cn(
          'w-[2ch] shrink-0',
          tone === 'default' && 'text-terminal-foreground',
          tone === 'accent' && 'text-terminal-accent',
          tone === 'sponsor' && 'text-sponsor',
        )}
      >
        {'●'}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">{children}</div>
    </div>
  )
}

export function ToolCall({
  name,
  args,
  result,
}: {
  name: string
  args: string
  result: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <Bullet tone="accent">
        <p>
          <span className="font-bold">{name}</span>
          <span className="text-terminal-muted">({args})</span>
        </p>
      </Bullet>
      <div className="flex text-terminal-muted">
        <span aria-hidden="true" className="w-[2ch] shrink-0" />
        <span aria-hidden="true" className="w-[3ch] shrink-0">
          {'└'}
        </span>
        <div className="min-w-0">{result}</div>
      </div>
    </div>
  )
}
