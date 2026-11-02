'use client'

import { useState } from 'react'
import { OptionList } from '../option-list'
import { ANALYTICS_OPTIONS } from './scan-log'

export function ToolChoice({ onChoose }: { onChoose: (name: string) => void }) {
  const [note, setNote] = useState<string | null>(null)

  return (
    <section aria-label="Choose an analytics tool" className="flex flex-col gap-3">
      <p className="font-bold">Which one should I set up?</p>
      <OptionList
        label="Analytics tool"
        options={ANALYTICS_OPTIONS.map((o) => ({ label: o.name }))}
        onSelect={(i) => {
          if (i === 0) onChoose(ANALYTICS_OPTIONS[0].name)
          else setNote('This demo continues with PostHog. Press 1 or move back up and hit Enter.')
        }}
      />
      {note && <p className="text-terminal-muted">{note}</p>}
      <p className="text-terminal-muted">Enter to select · ↑/↓ to navigate</p>
    </section>
  )
}
