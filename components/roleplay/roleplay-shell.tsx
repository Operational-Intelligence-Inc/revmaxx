'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { CharacterHeader, CharacterIntro } from './character-header'
import { Narration, PrincessMessage, TypingIndicator, UserMessage } from './messages'
import { InsuranceForm, QuoteConfirmation, type TravelQuote } from './insurance-form'

type Stage = 'askedInsurance' | 'askedSuggest' | 'showingForm' | 'submitted'

const SCRIPTED_REPLY: Partial<Record<Stage, string>> = {
  askedInsurance: "No, I haven't actually.",
  askedSuggest: 'Sure!',
}

const NEXT_STAGE: Partial<Record<Stage, Stage>> = {
  askedInsurance: 'askedSuggest',
  askedSuggest: 'showingForm',
}

type Entry = { id: string; node: ReactNode }

export function RoleplayShell() {
  const [stage, setStage] = useState<Stage>('askedInsurance')
  const [typing, setTyping] = useState(false)
  const [extra, setExtra] = useState<Entry[]>([])
  const [draft, setDraft] = useState(SCRIPTED_REPLY.askedInsurance ?? '')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [extra, typing])

  const push = (node: ReactNode) => setExtra((prev) => [...prev, { id: `${prev.length}`, node }])

  const princessReplyFor = (next: Stage): ReactNode => {
    if (next === 'askedSuggest') {
      return (
        <PrincessMessage>
          <Narration>gasps and nearly drops her teacup</Narration> None at all? Oh, my dear traveler! In Valdoria we
          never set sail without a charm against misfortune. Missed trains, lost trunks, a twisted ankle on the
          Spanish Steps… <Narration>leans in</Narration> May I suggest something that might help?
        </PrincessMessage>
      )
    }
    return (
      <PrincessMessage
        action={
          <InsuranceForm
            onComplete={(data) => {
              setStage('submitted')
              push(<QuoteConfirmation data={data} />)
              setTyping(true)
              setTimeout(() => {
                setTyping(false)
                push(<FarewellMessage data={data} />)
              }, 1400)
            }}
          />
        }
      >
        <Narration>unrolls a small scroll with a flourish</Narration> Wonderful! The royal cartographers swear by
        Wayfarer. Answer a few quick questions and they&apos;ll fetch you some quotes — I&apos;ve already filled in
        what you told me.
      </PrincessMessage>
    )
  }

  const handleSend = (event: FormEvent) => {
    event.preventDefault()
    const next = NEXT_STAGE[stage]
    const text = draft.trim()
    if (!next || !text || typing) return

    push(<UserMessage>{text}</UserMessage>)
    setDraft('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setStage(next)
      setDraft(SCRIPTED_REPLY[next] ?? '')
      push(princessReplyFor(next))
    }, 1300)
  }

  const canReply = Boolean(NEXT_STAGE[stage]) && !typing
  const suggestion = SCRIPTED_REPLY[stage]

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col">
      <CharacterHeader />

      <div className="flex flex-1 flex-col gap-6 px-4 pb-6" aria-live="polite">
        <CharacterIntro />

        <PrincessMessage>
          <Narration>curtsies from the balcony of a sunlit tower</Narration> Ah, a visitor! Welcome to Valdoria. Tell
          me — what adventure are you dreaming of?
        </PrincessMessage>

        <UserMessage>
          I&apos;m actually heading to Italy in June! Rome, then Florence, then a few days on the Amalfi Coast.
        </UserMessage>

        <PrincessMessage>
          <Narration>claps her hands, eyes sparkling</Narration> Italy! The land of lemon groves and painted ceilings! You
          simply must watch the sunset from Piazzale Michelangelo, and promise me you&apos;ll try a proper cacio e
          pepe in Trastevere.
          <br />
          <br />
          <Narration>pauses, tapping her chin</Narration> But tell me, brave traveler — have you bought travel
          insurance, just to be safe?
        </PrincessMessage>

        {extra.map((entry) => (
          <div key={entry.id}>{entry.node}</div>
        ))}

        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 flex flex-col gap-2 bg-palace px-4 pb-4 pt-2">
        {canReply && suggestion && (
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-palace-gold" aria-hidden />
            <button
              type="button"
              onClick={() => setDraft(suggestion)}
              className="rounded-full border border-palace-gold/40 px-3 py-1 text-sm text-palace-foreground hover:bg-palace-surface"
            >
              {suggestion}
            </button>
          </div>
        )}
        <form
          onSubmit={handleSend}
          className="flex items-end gap-2 rounded-2xl border border-palace-foreground/10 bg-palace-surface p-2 focus-within:border-palace-gold/50"
        >
          <label htmlFor="roleplay-input" className="sr-only">
            Message Princess Aurelia
          </label>
          <textarea
            id="roleplay-input"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
            disabled={!canReply}
            placeholder={canReply ? 'Message Princess Aurelia…' : 'Princess Aurelia is listening…'}
            className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 leading-relaxed text-palace-foreground outline-none placeholder:text-palace-muted disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!canReply || !draft.trim()}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-palace-gold text-palace transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="size-5" aria-hidden />
          </button>
        </form>
        <p className="text-center text-xs text-palace-muted">
          This is an AI character. Everything she says is made up — including her kingdom.
        </p>
      </div>
    </div>
  )
}

function FarewellMessage({ data }: { data: TravelQuote }) {
  return (
    <PrincessMessage>
      <Narration>tucks the scroll away, satisfied</Narration> There! Now your {data.destination} adventure is
      protected by more than my good wishes. Keep an eye on {data.email} — and send me a postcard from Amalfi!
    </PrincessMessage>
  )
}
