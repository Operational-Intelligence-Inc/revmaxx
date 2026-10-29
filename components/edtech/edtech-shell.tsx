'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AikoHeader } from './aiko-header'
import { AidOffer, COST_OF_ATTENDANCE, FUNDING_GAP } from './aid-offer'
import { LoanForm, type LoanLead } from './loan-form'
import { LoanMatches } from './loan-matches'
import { AikoMessage, QuickReplies, QuickReply, StudentMessage, TypingIndicator } from './messages'

type ThreadItem =
  | { kind: 'student'; text: string }
  | { kind: 'declined' }
  | { kind: 'form' }
  | { kind: 'matches'; data: LoanLead }
  | { kind: 'farewell'; data: LoanLead }

type Decision = 'yes' | 'no' | null

const money = (value: number) => `$${value.toLocaleString('en-US')}`

// Stage n means the n-th scripted beat has played. Even stages show the typing indicator.
const INTRO_TIMELINE_MS = [1100, 1700, 3000, 6500, 7800]
const INTRO_TYPING_STAGES = [0, 2, 4]

export function EdtechShell() {
  const [runId, setRunId] = useState(0)

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <AikoHeader onRestart={() => setRunId((id) => id + 1)} />
      <Conversation key={runId} />
    </div>
  )
}

function Conversation() {
  const [stage, setStage] = useState(0)
  const [thread, setThread] = useState<ThreadItem[]>([])
  const [typing, setTyping] = useState(false)
  const [decision, setDecision] = useState<Decision>(null)
  const [lead, setLead] = useState<LoanLead | null>(null)
  const lastItemRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers = INTRO_TIMELINE_MS.map((ms, index) => setTimeout(() => setStage(index + 1), ms))
    return () => timers.forEach(clearTimeout)
  }, [])

  const showTyping = typing || INTRO_TYPING_STAGES.includes(stage)

  useEffect(() => {
    if (showTyping) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      return
    }
    const el = lastItemRef.current
    if (!el) return
    const isTall = el.offsetHeight > window.innerHeight * 0.6
    el.scrollIntoView({ behavior: 'smooth', block: isTall ? 'start' : 'end' })
  }, [stage, thread.length, showTyping])

  const append = (item: ThreadItem) => setThread((prev) => [...prev, item])

  const aikoReplies = (item: ThreadItem, delay = 1300) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      append(item)
    }, delay)
  }

  const requestLoans = (text: string) => {
    setDecision('yes')
    append({ kind: 'student', text })
    aikoReplies({ kind: 'form' })
  }

  const declineLoans = () => {
    setDecision('no')
    append({ kind: 'student', text: 'No, not right now' })
    aikoReplies({ kind: 'declined' })
  }

  const handleLeadSubmitted = (data: LoanLead) => {
    setLead(data)
    append({ kind: 'matches', data })
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      append({ kind: 'farewell', data })
    }, 1600)
  }

  const entries: { key: string; node: ReactNode }[] = []

  if (stage >= 1) {
    entries.push({
      key: 'intro',
      node: (
        <AikoMessage>
          Hi Maya, I have good news. Your FAFSA was processed successfully, and Lakeview University has sent your
          financial aid offer.
        </AikoMessage>
      ),
    })
  }
  if (stage >= 3) {
    entries.push({
      key: 'offer',
      node: <AikoMessage action={<AidOffer />}>Here&apos;s what you&apos;ve been awarded for 2027–28:</AikoMessage>,
    })
  }
  if (stage >= 5) {
    entries.push({
      key: 'gap',
      node: (
        <AikoMessage
          action={
            decision === null ? (
              <QuickReplies>
                <QuickReply variant="primary" onClick={() => requestLoans('Yes, show me options')}>
                  Yes, show me options
                </QuickReply>
                <QuickReply onClick={declineLoans}>No, not right now</QuickReply>
              </QuickReplies>
            ) : null
          }
        >
          Your aid covers {money(COST_OF_ATTENDANCE - FUNDING_GAP)} of the {money(COST_OF_ATTENDANCE)} it costs to attend,
          which leaves about <strong>{money(FUNDING_GAP)}</strong> uncovered. Many families close a gap like this with a
          private student loan. Would you like me to look into options for you?
        </AikoMessage>
      ),
    })
  }

  thread.forEach((item, index) => {
    const key = `${item.kind}-${index}`
    switch (item.kind) {
      case 'student':
        entries.push({ key, node: <StudentMessage>{item.text}</StudentMessage> })
        break
      case 'declined':
        entries.push({
          key,
          node: (
            <AikoMessage
              action={
                decision === 'no' ? (
                  <QuickReplies>
                    <QuickReply variant="primary" onClick={() => requestLoans('Actually, show me loan options')}>
                      Actually, show me loan options
                    </QuickReply>
                  </QuickReplies>
                ) : null
              }
            >
              No problem. Before borrowing, we can also look for outside scholarships, ask Lakeview&apos;s aid office to
              review your offer, or compare payment plans. Just say the word if you change your mind about loans.
            </AikoMessage>
          ),
        })
        break
      case 'form':
        entries.push({
          key,
          node: (
            <AikoMessage action={lead ? null : <LoanForm onComplete={handleLeadSubmitted} />}>
              Great. This takes about two minutes. I&apos;ve already filled in what I know, so you only need to add a few
              details.
            </AikoMessage>
          ),
        })
        break
      case 'matches':
        entries.push({ key, node: <LoanMatches data={item.data} /> })
        break
      case 'farewell':
        entries.push({
          key,
          node: (
            <AikoMessage>
              You&apos;re all set, {item.data.firstName}. Keep an eye on {item.data.email} for your offers. While you
              wait, I found 14 scholarships you may qualify for that could shrink that {money(FUNDING_GAP)} gap even
              further. Want to take a look?
            </AikoMessage>
          ),
        })
        break
    }
  })

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pt-6 pb-8" aria-live="polite">
      {entries.map((entry, index) => (
        <div key={entry.key} ref={index === entries.length - 1 ? lastItemRef : undefined} className="scroll-mt-20">
          {entry.node}
        </div>
      ))}
      {showTyping && <TypingIndicator />}
      <div ref={bottomRef} className="scroll-mb-4" />
      <p className="mt-auto pt-6 text-center text-xs text-aiko-ink/55">
        Demo mockup. Aiko is an AI advisor. Names, schools, and rates are fictional.
      </p>
    </div>
  )
}
