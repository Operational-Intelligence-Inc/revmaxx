'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CornerDownLeft, Lock, MapPin, ShieldCheck } from 'lucide-react'

const DETECTED_ZIP = '78701'
const DETECTED_CITY = 'Austin, TX'

type Answers = {
  zip: string
  vehicle: string
  coverage: string
  incidents: string
  name: string
  email: string
  phone: string
}

type StepId = Exclude<keyof Answers, 'zip'> | 'consent'

const FOLLOW_UP_STEPS: StepId[] = ['vehicle', 'coverage', 'incidents', 'name', 'email', 'phone', 'consent']

const inputClass =
  'w-full border-0 border-b-2 border-input bg-transparent px-0 py-2 font-serif text-xl text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0'

const questionClass = 'font-serif text-xl font-medium text-balance'

function ChoiceList({
  name,
  options,
  value,
  onPick,
}: {
  name: string
  options: { value: string; label: string; hint?: string }[]
  value: string
  onPick: (v: string) => void
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-col gap-2">
      {options.map((opt, i) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onPick(opt.value)}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
              selected ? 'border-primary bg-secondary' : 'border-input bg-background hover:border-ring'
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-medium ${
                selected ? 'border-primary bg-primary text-primary-foreground' : 'border-input text-muted-foreground'
              }`}
            >
              {selected ? <Check className="size-3.5" /> : String.fromCharCode(65 + i)}
            </span>
            <span className="flex flex-col">
              <span className="font-medium text-card-foreground">{opt.label}</span>
              {opt.hint && <span className="text-xs text-muted-foreground">{opt.hint}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function OkButton({ label = 'OK', disabled }: { label?: string; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {label}
        <Check className="size-4" />
      </button>
      <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
        press <kbd className="font-sans font-medium">Enter</kbd>
        <CornerDownLeft className="size-3" />
      </span>
    </div>
  )
}

export function SponsoredCard() {
  const cardRef = useRef<HTMLElement>(null)
  const [stepIndex, setStepIndex] = useState(-1)
  const [done, setDone] = useState(false)
  const [consent, setConsent] = useState(false)
  const [answers, setAnswers] = useState<Answers>({
    zip: DETECTED_ZIP,
    vehicle: '2019 Honda CR-V',
    coverage: '',
    incidents: '',
    name: '',
    email: '',
    phone: '',
  })

  const started = stepIndex >= 0
  const step = started ? FOLLOW_UP_STEPS[stepIndex] : null
  const zipValid = /^\d{5}$/.test(answers.zip)
  const firstName = answers.name.trim().split(' ')[0]
  const totalSteps = FOLLOW_UP_STEPS.length + 1
  const progress = done ? 100 : ((stepIndex + 1) / totalSteps) * 100

  const set = (key: keyof Answers, value: string) => setAnswers((a) => ({ ...a, [key]: value }))

  const goTo = (index: number) => {
    setStepIndex(index)
    requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }
  const next = () => {
    if (stepIndex === FOLLOW_UP_STEPS.length - 1) {
      setDone(true)
      return
    }
    goTo(stepIndex + 1)
  }
  const back = () => goTo(stepIndex - 1)
  const pickAndAdvance = (key: keyof Answers, value: string) => {
    set(key, value)
    setTimeout(next, 250)
  }

  return (
    <aside
      ref={cardRef}
      aria-label="Sponsored: RateHarbor quote request"
      className="mt-2 flex flex-col overflow-hidden rounded-2xl border border-border bg-card font-sans"
    >
      <div className="flex items-start gap-3 p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <ShieldCheck className="size-5" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Sponsored · RateHarbor
          </span>
          <p className="text-sm font-medium text-card-foreground text-pretty">
            Compare full-coverage rates from 30+ insurers in your area
          </p>
          <p className="text-xs text-muted-foreground">Free, no-obligation quotes. Takes about 2 minutes.</p>
        </div>
        {started && !done && (
          <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
            {stepIndex + 2}/{totalSteps}
          </span>
        )}
      </div>

      {started && (
        <div
          className="h-1 bg-secondary"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Quote request progress"
        >
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="border-t border-border p-4" aria-live="polite">
        {!started && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (zipValid) goTo(0)
            }}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="quote-zip" className="text-xs font-medium text-muted-foreground">
                ZIP code
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 focus-within:border-primary">
                <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <input
                  id="quote-zip"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={answers.zip}
                  onChange={(e) => set('zip', e.target.value.replace(/\D/g, ''))}
                  aria-describedby="quote-zip-hint"
                  className="w-full bg-transparent py-2.5 text-sm font-medium tabular-nums text-foreground placeholder:text-muted-foreground focus:outline-none"
                  placeholder="5-digit ZIP"
                />
              </div>
              <p id="quote-zip-hint" className="text-xs text-muted-foreground">
                {answers.zip === DETECTED_ZIP
                  ? `Detected near ${DETECTED_CITY}`
                  : zipValid
                    ? 'Looks good'
                    : 'Enter a 5-digit ZIP'}
              </p>
            </div>
            <button
              type="submit"
              disabled={!zipValid}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 sm:mb-6"
            >
              Get quote request
              <ArrowRight className="size-4" />
            </button>
          </form>
        )}

        {done && (
          <div className="flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <p className={questionClass}>{`You're all set${firstName ? `, ${firstName}` : ''}.`}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {`Expect up to 5 quotes for your ${answers.vehicle} in ${answers.zip} within the next business day.`}
              </p>
            </div>
          </div>
        )}

        {started && !done && step && (
          <form
            key={step}
            onSubmit={(e) => {
              e.preventDefault()
              next()
            }}
            className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {step === 'vehicle' && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="quote-vehicle" className={questionClass}>
                    Which car are we insuring?
                  </label>
                  <p className="text-sm text-muted-foreground">Pulled from your conversation.</p>
                </div>
                <input
                  id="quote-vehicle"
                  autoFocus
                  required
                  value={answers.vehicle}
                  onChange={(e) => set('vehicle', e.target.value)}
                  className={inputClass}
                />
                <OkButton />
              </>
            )}

            {step === 'coverage' && (
              <>
                <p className={questionClass}>What coverage do you want?</p>
                <ChoiceList
                  name="Coverage level"
                  value={answers.coverage}
                  onPick={(v) => pickAndAdvance('coverage', v)}
                  options={[
                    { value: 'full', label: 'Full coverage', hint: 'Liability + collision + comprehensive' },
                    { value: 'liability', label: 'Liability only', hint: 'State minimum or higher' },
                    { value: 'match', label: 'Match my current policy' },
                  ]}
                />
              </>
            )}

            {step === 'incidents' && (
              <>
                <p className={questionClass}>Any accidents or tickets in the last 3 years?</p>
                <ChoiceList
                  name="Accidents or tickets"
                  value={answers.incidents}
                  onPick={(v) => pickAndAdvance('incidents', v)}
                  options={[
                    { value: 'no', label: 'No, clean record' },
                    { value: 'one', label: 'Yes, one' },
                    { value: 'multiple', label: 'Yes, more than one' },
                  ]}
                />
              </>
            )}

            {step === 'name' && (
              <>
                <label htmlFor="quote-name" className={questionClass}>
                  {"What's your name?"}
                </label>
                <input
                  id="quote-name"
                  autoComplete="name"
                  autoFocus
                  required
                  placeholder="Type your full name"
                  value={answers.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputClass}
                />
                <OkButton />
              </>
            )}

            {step === 'email' && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="quote-email" className={questionClass}>
                    {`Where should we send your quotes${firstName ? `, ${firstName}` : ''}?`}
                  </label>
                  <p className="text-sm text-muted-foreground">We never sell your email.</p>
                </div>
                <input
                  id="quote-email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  placeholder="name@example.com"
                  value={answers.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={inputClass}
                />
                <OkButton />
              </>
            )}

            {step === 'phone' && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="quote-phone" className={questionClass}>
                    Best number for an agent to reach you?
                  </label>
                  <p className="text-sm text-muted-foreground">Optional — skip if you prefer email.</p>
                </div>
                <input
                  id="quote-phone"
                  type="tel"
                  autoComplete="tel"
                  autoFocus
                  placeholder="(512) 555-0123"
                  value={answers.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className={inputClass}
                />
                <OkButton label={answers.phone ? 'OK' : 'Skip'} />
              </>
            )}

            {step === 'consent' && (
              <>
                <p className={questionClass}>One last thing.</p>
                <label className="flex items-start gap-3 rounded-xl border border-input bg-background p-3 text-sm leading-relaxed text-card-foreground has-[:checked]:border-primary">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-primary"
                  />
                  <span>
                    I agree to be contacted by RateHarbor and its insurance partners about my quote request. Consent is
                    not a condition of purchase.
                  </span>
                </label>
                <OkButton label="Submit quote request" disabled={!consent} />
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3" />
                  Your info is shared only with the sponsor, not the assistant.
                </p>
              </>
            )}

            <button
              type="button"
              onClick={back}
              className="flex w-fit items-center gap-1.5 rounded-md px-1 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back
            </button>
          </form>
        )}
      </div>
    </aside>
  )
}
