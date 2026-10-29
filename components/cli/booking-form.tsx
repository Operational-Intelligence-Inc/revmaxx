'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { DAYS, MUTUAL_OPEN_COUNT, MUTUAL_SLOTS } from './availability'
import { AvailabilityGrid } from './availability-grid'
import { Bullet, ToolCall } from './lines'
import { OptionList, type Option } from './option-list'
import { QuestionStep, type Answers, type Question } from './sponsored-form'

export type BookingResult =
  | { type: 'booked'; slot: string; answers: Answers }
  | { type: 'declined' }
  | { type: 'other' }

const QUESTIONS: Question[] = [
  {
    id: 'name',
    kind: 'text',
    tab: 'Name',
    question: 'What name should the invite go to?',
    inputType: 'text',
    defaultValue: 'Maya Chen',
    detectedFrom: 'git config user.name',
  },
  {
    id: 'email',
    kind: 'text',
    tab: 'Email',
    question: 'Which email should receive the calendar invite?',
    inputType: 'email',
    defaultValue: 'maya@acmelabs.dev',
    detectedFrom: 'your connected Google account',
  },
  {
    id: 'focus',
    kind: 'select',
    tab: 'Focus',
    question: 'What would you like to cover on the call?',
    options: [
      { label: 'Funnels and retention for our signup flow' },
      { label: 'Session replay and feature flags' },
      { label: 'Pricing and the startup plan' },
      { label: 'Migrating events from another tool' },
    ],
  },
  {
    id: 'team',
    kind: 'select',
    tab: 'Team',
    question: 'How many people will use PostHog?',
    options: [{ label: 'Just me' }, { label: '2–10' }, { label: '11–50' }, { label: '50+' }],
  },
]

const OFFER_OPTIONS: Option[] = [
  {
    label: 'Yes, find a time',
    description: 'Checks free/busy on your Google Calendar. Event details are never read.',
  },
  { label: 'Not now', description: 'Just install PostHog' },
  { label: 'Show me the other options instead' },
]

type Phase = 'offer' | 'lookup' | 'slot' | 'questions'

export function BookingForm({
  onResolve,
  onAdvance,
}: {
  onResolve: (result: BookingResult) => void
  onAdvance: () => void
}) {
  const [phase, setPhase] = useState<Phase>('offer')
  const [lookupStep, setLookupStep] = useState(0)
  const [slotIndex, setSlotIndex] = useState<number | null>(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  useEffect(() => {
    if (phase !== 'lookup') return
    if (lookupStep >= 3) {
      setPhase('slot')
      onAdvance()
      return
    }
    const t = setTimeout(() => {
      setLookupStep((s) => s + 1)
      onAdvance()
    }, 700)
    return () => clearTimeout(t)
  }, [phase, lookupStep, onAdvance])

  const slot = slotIndex === null ? null : MUTUAL_SLOTS[slotIndex]
  const tabs = ['Time', ...QUESTIONS.map((q) => q.tab), 'Confirm']
  const currentTab = phase === 'slot' ? 0 : phase === 'questions' ? step + 1 : -1
  const isReview = phase === 'questions' && step === QUESTIONS.length

  function answer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setStep((s) => s + 1)
    onAdvance()
  }

  function back() {
    if (step === 0) setPhase('slot')
    else setStep((s) => s - 1)
  }

  const showLookup = phase !== 'offer'

  return (
    <section
      aria-label="Sponsored by PostHog: book an intro call"
      className="flex flex-col gap-4 border-t border-sponsor pt-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sponsor">
          <span className="font-bold">Sponsored</span>
          {' · PostHog'}
        </p>
        <p className="text-terminal-muted">Paid placement · not part of Claude&apos;s recommendation</p>
      </div>

      {phase === 'offer' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-pretty">
              Would you like to book an intro call with a rep to get you more value out of PostHog?
            </p>
            <p className="text-pretty text-terminal-muted">
              A free 30-minute session with a PostHog solutions engineer to set up dashboards, funnels and
              replays for your product.
            </p>
          </div>
          <OptionList
            label="Book an intro call with PostHog?"
            options={OFFER_OPTIONS}
            onSelect={(i) => {
              if (i === 0) {
                setPhase('lookup')
                onAdvance()
              } else onResolve({ type: i === 1 ? 'declined' : 'other' })
            }}
          />
        </div>
      )}

      {showLookup && (
        <div className="flex flex-col gap-4" aria-live="polite">
          <ToolCall
            name="google-calendar - get_free_busy (MCP)"
            args={`calendar: "primary", from: "${DAYS[0].label}", to: "${DAYS[DAYS.length - 1].label}"`}
            result={
              lookupStep >= 1 ? (
                <p>Found 29 busy blocks across 5 weekdays · maya@acmelabs.dev</p>
              ) : (
                <p className="animate-pulse">Running…</p>
              )
            }
          />
          {lookupStep >= 1 && (
            <ToolCall
              name="posthog - get_rep_availability (MCP)"
              args={'team: "onboarding", duration: 30, tz: "America/Los_Angeles"'}
              result={
                lookupStep >= 2 ? (
                  <p>Jordan Lee, Solutions Engineer · 38 open slots</p>
                ) : (
                  <p className="animate-pulse">Running…</p>
                )
              }
            />
          )}
          {lookupStep >= 3 && (
            <Bullet>
              <p className="text-pretty">
                {`Cross-referenced both calendars: ${MUTUAL_OPEN_COUNT} half-hour windows work for you and Jordan. Here are the best ones, skipping anything right before or after your existing meetings.`}
              </p>
              <AvailabilityGrid />
            </Bullet>
          )}
        </div>
      )}

      {(phase === 'slot' || phase === 'questions') && (
        <div className="flex flex-col gap-4">
          <nav aria-label="Booking progress" className="flex flex-wrap items-center gap-1">
            <span aria-hidden="true" className="text-terminal-muted">
              {'←'}
            </span>
            {tabs.map((tab, i) => {
              const done = i < currentTab
              const current = i === currentTab
              return (
                <span
                  key={tab}
                  aria-current={current ? 'step' : undefined}
                  className={cn(
                    'px-1',
                    current && 'bg-terminal-accent text-terminal',
                    !current && done && 'text-terminal-foreground',
                    !current && !done && 'text-terminal-muted',
                  )}
                >
                  {tab === 'Confirm' ? '→' : done ? '[x]' : '[ ]'} {tab}
                </span>
              )
            })}
            <span aria-hidden="true" className="text-terminal-muted">
              {'→'}
            </span>
          </nav>

          {phase === 'slot' && (
            <div className="flex flex-col gap-3">
              <p className="font-bold">When works for your intro call with Jordan?</p>
              <OptionList
                label="Pick a time"
                options={MUTUAL_SLOTS.map((s) => ({ label: s.label }))}
                initialIndex={slotIndex ?? 0}
                onSelect={(i) => {
                  setSlotIndex(i)
                  setStep(0)
                  setPhase('questions')
                  onAdvance()
                }}
                onEscape={() => setPhase('offer')}
              />
            </div>
          )}

          {phase === 'questions' && slot && !isReview && (
            <QuestionStep
              key={QUESTIONS[step].id}
              question={QUESTIONS[step]}
              value={answers[QUESTIONS[step].id]}
              onAnswer={(v) => answer(QUESTIONS[step].id, v)}
              onEscape={back}
            />
          )}

          {isReview && slot && (
            <div className="flex flex-col gap-3">
              <p className="font-bold">Confirm your booking</p>
              <dl className="flex flex-col">
                <div className="flex">
                  <dt className="w-[10ch] shrink-0 text-terminal-muted">When</dt>
                  <dd className="min-w-0 text-sponsor">{slot.label}</dd>
                </div>
                <div className="flex">
                  <dt className="w-[10ch] shrink-0 text-terminal-muted">With</dt>
                  <dd className="min-w-0">Jordan Lee, PostHog</dd>
                </div>
                {QUESTIONS.map((q) => (
                  <div key={q.id} className="flex">
                    <dt className="w-[10ch] shrink-0 text-terminal-muted">{q.tab}</dt>
                    <dd className="min-w-0 break-words">{answers[q.id]}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-pretty text-terminal-muted">
                Only these answers are shared with PostHog. Your calendar contents and codebase are not.
              </p>
              <OptionList
                label="Book the call?"
                options={[{ label: 'Book call' }, { label: 'Pick a different time' }, { label: 'Edit answers' }]}
                onSelect={(i) => {
                  if (i === 0) onResolve({ type: 'booked', slot: slot.label, answers })
                  else if (i === 1) setPhase('slot')
                  else setStep(0)
                }}
                onEscape={back}
              />
            </div>
          )}
        </div>
      )}

      {phase !== 'lookup' && (
        <p className="text-terminal-muted">
          {phase === 'questions' && !isReview && QUESTIONS[step].kind === 'text'
            ? 'Enter to confirm · Esc to go back'
            : 'Enter to select · ↑/↓ to navigate · Esc to go back'}
        </p>
      )}
    </section>
  )
}
