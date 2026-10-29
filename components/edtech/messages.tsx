import type { ReactNode } from 'react'
import { Asterisk } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AikoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full border border-aiko-accent/20 bg-aiko-surface text-aiko-accent',
        className,
      )}
    >
      <Asterisk className="size-3/5" strokeWidth={3} />
    </span>
  )
}

export function AikoMessage({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <AikoMark className="mt-0.5" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="max-w-[34rem] rounded-2xl rounded-tl-md border border-aiko-ink/10 bg-aiko-surface px-4 py-3 text-base leading-relaxed text-pretty shadow-sm">
          {children}
        </p>
        {action}
      </div>
    </div>
  )
}

export function StudentMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="max-w-[80%] rounded-2xl rounded-tr-md bg-aiko-brand px-4 py-3 text-base leading-relaxed text-aiko-surface">
        {children}
      </p>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" role="status" aria-label="Aiko is typing">
      <AikoMark />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-aiko-ink/10 bg-aiko-surface px-4 py-4 shadow-sm">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-2 animate-bounce rounded-full bg-aiko-ink/40 motion-reduce:animate-none"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export function QuickReplies({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300" role="group" aria-label="Quick replies">
      {children}
    </div>
  )
}

export function QuickReply({
  children,
  onClick,
  variant = 'secondary',
}: {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-5 py-2.5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aiko-brand',
        variant === 'primary'
          ? 'bg-aiko-brand text-aiko-surface hover:bg-aiko-brand/90'
          : 'border border-aiko-ink/25 bg-aiko-surface text-aiko-ink hover:border-aiko-ink/50',
      )}
    >
      {children}
    </button>
  )
}
