'use client'

import { useCallback, useRef, useState } from 'react'
import { BookingForm, type BookingResult } from './booking-form'
import { BookingOutcome } from './booking-outcome'
import { Bullet, UserLine } from './lines'
import { PromptInput } from './prompt-input'
import { TerminalChrome } from './terminal-chrome'
import { Transcript, Welcome } from './transcript'

export function BookingTerminal() {
  const [result, setResult] = useState<BookingResult | null>(null)
  const [followUps, setFollowUps] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }))
  }, [])

  return (
    <TerminalChrome>
      <Welcome />
      <Transcript
        sponsorNote={
          <>
            PostHog offers a <span className="font-bold text-sponsor">free 1:1 intro call</span> with a
            solutions engineer to help you get set up.
          </>
        }
      />

      {result ? (
        <BookingOutcome result={result} />
      ) : (
        <BookingForm
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
