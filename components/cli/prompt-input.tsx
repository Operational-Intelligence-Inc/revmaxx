'use client'

import { useState } from 'react'

export function PromptInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState('')

  return (
    <div className="flex flex-col gap-1">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const trimmed = text.trim()
          if (!trimmed) return
          onSubmit(trimmed)
          setText('')
        }}
        className="flex items-center rounded-md border border-terminal-muted/60 px-3 py-2"
      >
        <span aria-hidden="true" className="w-[2ch] shrink-0">
          {'>'}
        </span>
        <label htmlFor="cli-prompt" className="sr-only">
          Message Claude
        </label>
        <input
          id="cli-prompt"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
          }}
          placeholder='Try "track signups as a custom event"'
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent caret-terminal-accent outline-none placeholder:text-terminal-muted"
        />
      </form>
      <div className="flex justify-between px-3 text-terminal-muted">
        <span>? for shortcuts</span>
        <span className="hidden sm:inline">~/code/acme-web</span>
      </div>
    </div>
  )
}
