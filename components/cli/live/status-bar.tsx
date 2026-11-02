'use client'

import { useElapsedSeconds, useSpinnerGlyph } from './hooks'

export function BusyStatus({ label, progress }: { label: string; progress?: string }) {
  const glyph = useSpinnerGlyph()
  const seconds = useElapsedSeconds()

  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span aria-hidden="true" className="w-[2ch] shrink-0 text-terminal-accent">
        {glyph}
      </span>
      <span role="status" className="text-terminal-accent">
        {`${label}…`}
      </span>
      <span aria-hidden="true" className="text-terminal-muted">
        {`(${progress ? `${progress} · ` : ''}${seconds}s · esc to interrupt)`}
      </span>
    </p>
  )
}

export function DoneStatus({ label }: { label: string }) {
  return (
    <p className="flex items-baseline gap-x-2">
      <span aria-hidden="true" className="w-[2ch] shrink-0 text-terminal-accent">
        {'●'}
      </span>
      <span role="status">{label}</span>
    </p>
  )
}
