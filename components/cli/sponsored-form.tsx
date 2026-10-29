'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { OptionList, type Option } from './option-list'

export type Answers = Record<string, string>

export type FormResult =
  | { type: 'applied'; answers: Answers }
  | { type: 'declined' }
  | { type: 'other' }

export type TextQuestion = {
  id: string
  kind: 'text'
  tab: string
  question: string
  inputType: 'text' | 'email'
  defaultValue: string
  detectedFrom: string
}

export type SelectQuestion = {
  id: string
  kind: 'select'
  tab: string
  question: string
  options: Option[]
}

export type Question = TextQuestion | SelectQuestion

const QUESTIONS: Question[] = [
  {
    id: 'company',
    kind: 'text',
    tab: 'Company',
    question: "What's your company name?",
    inputType: 'text',
    defaultValue: 'Acme Labs',
    detectedFrom: 'package.json "author"',
  },
  {
    id: 'email',
    kind: 'text',
    tab: 'Email',
    question: 'Which work email should PostHog contact?',
    inputType: 'email',
    defaultValue: 'maya@acmelabs.dev',
    detectedFrom: 'git config user.email',
  },
  {
    id: 'founded',
    kind: 'select',
    tab: 'Founded',
    question: 'When was the company founded?',
    options: [
      { label: 'Less than 2 years ago' },
      { label: '2 or more years ago', description: 'May not qualify for the full $30k' },
    ],
  },
  {
    id: 'funding',
    kind: 'select',
    tab: 'Funding',
    question: 'How much funding have you raised?',
    options: [
      { label: 'Bootstrapped / pre-seed' },
      { label: 'Under $5M' },
      { label: '$5M or more', description: 'Outside program eligibility' },
    ],
  },
]

const OFFER_OPTIONS: Option[] = [
  { label: 'Yes, apply now', description: 'A few quick questions, right here in the terminal' },
  { label: 'Not now', description: 'Just install PostHog on the free tier' },
  { label: 'Show me the other options instead' },
]

export function SponsoredForm({
  onResolve,
  onAdvance,
}: {
  onResolve: (result: FormResult) => void
  onAdvance: () => void
}) {
  const [phase, setPhase] = useState<'offer' | 'questions'>('offer')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const isReview = step === QUESTIONS.length
  const tabs = [...QUESTIONS.map((q) => q.tab), 'Submit']

  function answer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setStep((s) => s + 1)
    onAdvance()
  }

  function back() {
    if (step === 0) setPhase('offer')
    else setStep((s) => s - 1)
  }

  return (
    <section
      aria-label="Sponsored by PostHog: startup credits application"
      className="flex flex-col gap-4 border-t border-sponsor pt-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sponsor">
          <span className="font-bold">Sponsored</span>
          {' · PostHog for Startups'}
        </p>
        <p className="text-terminal-muted">Paid placement · not part of Claude&apos;s recommendation</p>
      </div>

      {phase === 'offer' ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-bold">Would you like to apply for $30,000 in PostHog credits?</p>
            <p className="text-pretty text-terminal-muted">
              For companies under 2 years old that have raised less than $5M. Credits apply to
              analytics, session replay, feature flags and more.
            </p>
          </div>
          <OptionList
            label="Apply for PostHog startup credits?"
            options={OFFER_OPTIONS}
            onSelect={(i) => {
              if (i === 0) {
                setPhase('questions')
                onAdvance()
              } else onResolve({ type: i === 1 ? 'declined' : 'other' })
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <nav aria-label="Application progress" className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <span aria-hidden="true" className="text-terminal-muted">
              {'←'}
            </span>
            {tabs.map((tab, i) => {
              const done = i < step
              const current = i === step
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
                  {tab === 'Submit' ? '→' : done ? '[x]' : '[ ]'} {tab}
                </span>
              )
            })}
            <span aria-hidden="true" className="text-terminal-muted">
              {'→'}
            </span>
          </nav>

          {isReview ? (
            <Review
              answers={answers}
              onSubmit={() => onResolve({ type: 'applied', answers })}
              onEdit={() => setStep(0)}
              onEscape={back}
            />
          ) : (
            <QuestionStep
              key={QUESTIONS[step].id}
              question={QUESTIONS[step]}
              value={answers[QUESTIONS[step].id]}
              onAnswer={(v) => answer(QUESTIONS[step].id, v)}
              onEscape={back}
            />
          )}
        </div>
      )}

      <p className="text-terminal-muted">
        {phase === 'questions' && !isReview && QUESTIONS[step].kind === 'text'
          ? 'Enter to confirm · Esc to go back'
          : 'Enter to select · ↑/↓ to navigate · Esc to go back'}
      </p>
    </section>
  )
}

export function QuestionStep({
  question,
  value,
  onAnswer,
  onEscape,
}: {
  question: Question
  value?: string
  onAnswer: (value: string) => void
  onEscape: () => void
}) {
  if (question.kind === 'select') {
    const initial = Math.max(
      0,
      question.options.findIndex((o) => o.label === value),
    )
    return (
      <div className="flex flex-col gap-3">
        <p className="font-bold">{question.question}</p>
        <OptionList
          label={question.question}
          options={question.options}
          initialIndex={initial}
          onSelect={(i) => onAnswer(question.options[i].label)}
          onEscape={onEscape}
        />
      </div>
    )
  }
  return <TextStep question={question} value={value} onAnswer={onAnswer} onEscape={onEscape} />
}

function TextStep({
  question,
  value,
  onAnswer,
  onEscape,
}: {
  question: TextQuestion
  value?: string
  onAnswer: (value: string) => void
  onEscape: () => void
}) {
  const [text, setText] = useState(value ?? question.defaultValue)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = `cli-${question.id}`

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.focus({ preventScroll: true })
    if (el.type === 'text') el.setSelectionRange(el.value.length, el.value.length)
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onEscape()
      return
    }
    if (e.key !== 'Enter' || e.nativeEvent.isComposing || e.keyCode === 229) return
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return setError('This field is required')
    if (question.inputType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return setError('Enter a valid email address')
    }
    onAnswer(trimmed)
  }

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={inputId} className="font-bold">
        {question.question}
      </label>
      <div className="flex items-center">
        <span aria-hidden="true" className="w-[2ch] shrink-0 text-terminal-accent">
          {'›'}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type={question.inputType}
          value={text}
          autoComplete={question.inputType === 'email' ? 'email' : 'organization'}
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${inputId}-hint`}
          onChange={(e) => {
            setText(e.target.value)
            setError(null)
          }}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent text-terminal-foreground caret-terminal-accent outline-none"
        />
      </div>
      <p id={`${inputId}-hint`} className={cn('pl-[2ch]', error ? 'text-terminal-accent' : 'text-terminal-muted')}>
        {error ?? `Prefilled from ${question.detectedFrom}`}
      </p>
    </div>
  )
}

function Review({
  answers,
  onSubmit,
  onEdit,
  onEscape,
}: {
  answers: Answers
  onSubmit: () => void
  onEdit: () => void
  onEscape: () => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Review your application</p>
      <dl className="flex flex-col">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="flex">
            <dt className="w-[10ch] shrink-0 text-terminal-muted">{q.tab}</dt>
            <dd className="min-w-0 break-words">{answers[q.id]}</dd>
          </div>
        ))}
      </dl>
      <p className="text-pretty text-terminal-muted">
        Submitting shares only these answers with PostHog. Nothing from your codebase is sent.
      </p>
      <OptionList
        label="Submit application?"
        options={[{ label: 'Submit application' }, { label: 'Edit answers' }]}
        onSelect={(i) => (i === 0 ? onSubmit() : onEdit())}
        onEscape={onEscape}
      />
    </div>
  )
}
