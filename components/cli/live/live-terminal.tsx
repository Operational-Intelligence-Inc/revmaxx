'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BookingForm, type BookingResult } from '../booking-form'
import { Bullet, UserLine } from '../lines'
import { PromptInput } from '../prompt-input'
import { TerminalChrome } from '../terminal-chrome'
import { Welcome } from '../transcript'
import { useStepper } from './hooks'
import { LiveBookingOutcome } from './live-booking-outcome'
import { SCAN_DURATIONS, SCAN_STEPS, ScanLog } from './scan-log'
import { BusyStatus, DoneStatus } from './status-bar'
import { ToolChoice } from './tool-choice'
import { WORK_DURATIONS, WORK_STEPS, WorkLog } from './work-log'

const DEFAULT_PROMPT = "I would like to add analytics to my project. What's a good fit?"

const OFFER_OPTIONS = [
  {
    label: 'Yes, find a time',
    description:
      'Uses the Google Calendar already connected to this session to find times that work. Event details are never read.',
  },
  { label: 'Not now', description: 'Keep waiting for the PostHog setup' },
]

type Phase = 'idle' | 'scan' | 'work'

export function LiveTerminal() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [prompt, setPrompt] = useState('')
  const [booking, setBooking] = useState<BookingResult | null>(null)
  const [followUps, setFollowUps] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const scanStage = useStepper(phase === 'scan', SCAN_DURATIONS)
  const workDone = useStepper(phase === 'work', WORK_DURATIONS)

  const scanFinished = scanStage >= SCAN_STEPS.length
  const workFinished = workDone >= WORK_STEPS.length
  const showBooking = phase === 'work' && workDone >= 1

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }))
  }, [])

  useEffect(() => {
    if (phase !== 'idle') scrollToBottom()
  }, [phase, scanStage, showBooking, scrollToBottom])

  useEffect(() => {
    if (workFinished && booking) scrollToBottom()
  }, [workFinished, booking, scrollToBottom])

  let footer = null
  if (phase === 'idle') {
    footer = (
      <PromptInput
        autoFocus
        agentName="opencode"
        initialValue={DEFAULT_PROMPT}
        hint="Enter to send"
        onSubmit={(text) => {
          setPrompt(text)
          setPhase('scan')
        }}
      />
    )
  } else if (phase === 'scan' && !scanFinished) {
    footer = <BusyStatus label="Scanning codebase" />
  } else if (phase === 'work') {
    footer = workFinished ? (
      <DoneStatus label="PostHog setup complete" />
    ) : (
      <BusyStatus label="Setting up PostHog" progress={`${workDone}/${WORK_STEPS.length}`} />
    )
  }

  return (
    <TerminalChrome footer={footer} agentCommand="opencode">
      <Welcome productName="opencode" />

      {phase !== 'idle' && (
        <div className="flex flex-col gap-5">
          <UserLine>{prompt}</UserLine>
          <Bullet>
            <p className="text-pretty">{"I'll scan the project first to see what's already in place."}</p>
          </Bullet>
        </div>
      )}

      {phase !== 'idle' && <ScanLog stage={scanStage} />}

      {phase === 'scan' && scanFinished && (
        <ToolChoice
          onChoose={() => {
            setPhase('work')
          }}
        />
      )}

      {phase === 'work' && (
        <div className="flex flex-col gap-5">
          <UserLine>PostHog</UserLine>
          <Bullet>
            <p className="text-pretty">
              {
                "Good call. I'll install posthog-js, add a provider, and route events through a first-party /ingest path so ad blockers don't drop them."
              }
            </p>
          </Bullet>
          <WorkLog completed={workDone} />
        </div>
      )}

      {showBooking && (
        <div className="flex flex-col gap-5">
          <Bullet>
            <p className="text-pretty">
              {'This will take a minute or so. While I work, PostHog has an optional offer for you:'}
            </p>
          </Bullet>
          {booking ? (
            <LiveBookingOutcome result={booking} />
          ) : (
            <BookingForm
              offerOptions={OFFER_OPTIONS}
              shareContext
              agentName="opencode"
              poweredBy="RevMaxx"
              onAdvance={scrollToBottom}
              onResolve={(result) => {
                setBooking(result)
                scrollToBottom()
              }}
            />
          )}
        </div>
      )}

      {workFinished && (
        <Bullet>
          <p className="text-pretty">
            {'PostHog is installed. Add '}
            <span className="text-terminal-accent">NEXT_PUBLIC_POSTHOG_KEY</span>
            {' to your '}
            <span className="text-terminal-accent">.env.local</span>
            {' and pageviews, autocapture and session replay will start flowing. Signup and checkout events are already wired up.'}
          </p>
        </Bullet>
      )}

      {followUps.map((text, i) => (
        <div key={i} className="flex flex-col gap-5">
          <UserLine>{text}</UserLine>
          <Bullet>
            <p className="text-terminal-muted">(This is a static mockup, so live responses are disabled.)</p>
          </Bullet>
        </div>
      ))}

      {workFinished && booking && (
        <PromptInput
          agentName="opencode"
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
