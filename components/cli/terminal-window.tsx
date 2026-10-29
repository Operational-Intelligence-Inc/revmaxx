'use client'

import { useCallback, useRef, useState } from 'react'
import { Bullet, UserLine } from './lines'
import { Outcome } from './outcome'
import { PromptInput } from './prompt-input'
import { SponsoredForm, type FormResult } from './sponsored-form'
import { TerminalChrome } from './terminal-chrome'
import { Transcript, Welcome } from './transcript'

export function TerminalWindow() {
  const [result, setResult] = useState<FormResult | null>(null)
  const [followUps, setFollowUps] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }))
  }, [])

  return (
    <TerminalChrome>
      <Welcome />
      <Transcript />

      {result ? (
        <Outcome result={result} />
      ) : (
        <SponsoredForm
          onAdvance={scrollToBottom}
          onResolve={(r) => {
            setResult(r)
            scrollToBottom()
          }}
        />
      )}

      {followUps.map((text, i) => (
        <div key={i} className="flex flex-col gap-5">
          <UserLine>{text}</UserLine>
          <Bullet>
            <p className="text-terminal-muted">(This is a static mockup, so live responses are disabled.)</p>
          </Bullet>
        </div>
      ))}

      {result && (
        <PromptInput
          onSubmit={(text) => {
            setFollowUps((prev) => [...prev, text])
            scrollToBottom()
          }}
        />
      )}
      <div ref={bottomRef} />
    </TerminalChrome>
  )
}
