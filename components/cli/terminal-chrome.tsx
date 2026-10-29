import type { ReactNode } from 'react'

export function TerminalChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full max-w-5xl flex-col overflow-hidden bg-terminal font-mono text-sm leading-relaxed text-terminal-foreground md:h-[calc(100dvh-4rem)] md:rounded-lg md:border md:border-terminal-muted/30">
      <div className="flex shrink-0 items-center gap-3 border-b border-terminal-muted/30 px-4 py-2">
        <div aria-hidden="true" className="flex gap-2">
          <span className="size-3 rounded-full bg-terminal-muted/40" />
          <span className="size-3 rounded-full bg-terminal-muted/40" />
          <span className="size-3 rounded-full bg-terminal-muted/40" />
        </div>
        <p className="flex-1 truncate text-center text-xs text-terminal-muted">
          {'acme-web — claude — 120×40'}
        </p>
        <span aria-hidden="true" className="w-14" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6">
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  )
}
