'use client'

import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'

export type TravelQuote = {
  destination: string
  departure: string
  returnDate: string
  tripCost: string
  travelers: string
  oldestAge: string
  email: string
}

const INITIAL: TravelQuote = {
  destination: 'Italy',
  departure: '2027-06-12',
  returnDate: '2027-06-24',
  tripCost: '',
  travelers: '',
  oldestAge: '',
  email: '',
}

const TRAVELER_OPTIONS = ['Just me', '2 travelers', '3 travelers', '4 or more']

type StepId = 'trip' | 'cost' | 'travelers' | 'age' | 'email'
const STEPS: StepId[] = ['trip', 'cost', 'travelers', 'age', 'email']

function isStepValid(step: StepId, data: TravelQuote) {
  switch (step) {
    case 'trip':
      return data.destination.trim() !== '' && data.departure !== '' && data.returnDate >= data.departure
    case 'cost':
      return Number(data.tripCost) > 0
    case 'travelers':
      return data.travelers !== ''
    case 'age': {
      const age = Number(data.oldestAge)
      return Number.isInteger(age) && age >= 1 && age <= 110
    }
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  }
}

const inputClass =
  'w-full border-0 border-b-2 border-palace/20 bg-transparent px-0 py-2 text-xl text-palace outline-none placeholder:text-palace/35 focus:border-palace'

export function InsuranceForm({ onComplete }: { onComplete: (data: TravelQuote) => void }) {
  const [data, setData] = useState<TravelQuote>(INITIAL)
  const [stepIndex, setStepIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const step = STEPS[stepIndex]
  const valid = isStepValid(step, data)
  const isLast = stepIndex === STEPS.length - 1

  const update = (patch: Partial<TravelQuote>) => setData((prev) => ({ ...prev, ...patch }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!valid || submitting) return
    if (!isLast) {
      setStepIndex((i) => i + 1)
      return
    }
    setSubmitting(true)
    setTimeout(() => onComplete(data), 900)
  }

  const chooseTravelers = (value: string) => {
    update({ travelers: value })
    setTimeout(() => setStepIndex((i) => Math.max(i, STEPS.indexOf('travelers') + 1)), 250)
  }

  const handleOptionKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = Number(event.key)
    if (key >= 1 && key <= TRAVELER_OPTIONS.length) chooseTravelers(TRAVELER_OPTIONS[key - 1])
  }

  return (
    <aside
      aria-label="Sponsored: Wayfarer travel insurance quote"
      className="w-full max-w-[36rem] overflow-hidden rounded-2xl bg-palace-foreground text-palace shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-500"
    >
      <div className="flex items-center justify-between gap-3 border-b border-palace/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-palace text-palace-gold">
            <ShieldCheck className="size-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold">Wayfarer Travel Protection</span>
        </div>
        <span className="rounded-full bg-palace-gold px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-palace">
          Sponsored
        </span>
      </div>

      <div className="h-1 bg-palace/10" aria-hidden>
        <div
          className="h-full bg-palace-gold transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-5 py-6" noValidate>
        <p className="text-xs font-medium uppercase tracking-wide text-palace/55">
          Question {stepIndex + 1} of {STEPS.length}
        </p>

        <div key={step} className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
          {step === 'trip' && (
            <>
              <h3 className="font-serif text-2xl font-semibold text-balance">Is this your trip?</h3>
              <p className="-mt-2 text-sm leading-relaxed text-palace/65">
                We filled this in from your conversation. Adjust anything that&apos;s off.
              </p>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-palace/65">Destination</span>
                <input
                  className={inputClass}
                  value={data.destination}
                  onChange={(e) => update({ destination: e.target.value })}
                  autoFocus
                />
              </label>
              <div className="flex gap-4">
                <label className="flex flex-1 flex-col gap-1">
                  <span className="text-sm text-palace/65">Departure</span>
                  <input
                    type="date"
                    className={inputClass}
                    value={data.departure}
                    onChange={(e) => update({ departure: e.target.value })}
                  />
                </label>
                <label className="flex flex-1 flex-col gap-1">
                  <span className="text-sm text-palace/65">Return</span>
                  <input
                    type="date"
                    className={inputClass}
                    value={data.returnDate}
                    min={data.departure}
                    onChange={(e) => update({ returnDate: e.target.value })}
                  />
                </label>
              </div>
            </>
          )}

          {step === 'cost' && (
            <label className="flex flex-col gap-3">
              <span className="font-serif text-2xl font-semibold text-balance">
                Roughly how much have you prepaid for the trip?
              </span>
              <span className="-mt-1 text-sm leading-relaxed text-palace/65">
                Flights, hotels, tours — anything non-refundable. This sets your cancellation coverage.
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl text-palace/55">$</span>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="4,800"
                  value={data.tripCost}
                  onChange={(e) => update({ tripCost: e.target.value.replace(/[^\d]/g, '') })}
                  autoFocus
                />
              </div>
            </label>
          )}

          {step === 'travelers' && (
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 font-serif text-2xl font-semibold text-balance">Who&apos;s going?</legend>
              <div className="flex flex-col gap-2" role="radiogroup" onKeyDown={handleOptionKey}>
                {TRAVELER_OPTIONS.map((option, i) => {
                  const selected = data.travelers === option
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      autoFocus={i === 0}
                      onClick={() => chooseTravelers(option)}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        selected
                          ? 'border-palace bg-palace text-palace-foreground'
                          : 'border-palace/20 hover:border-palace/50'
                      }`}
                    >
                      <span
                        className={`flex size-6 items-center justify-center rounded text-xs font-semibold ${
                          selected ? 'bg-palace-gold text-palace' : 'border border-palace/25 text-palace/60'
                        }`}
                      >
                        {selected ? <Check className="size-3.5" aria-hidden /> : i + 1}
                      </span>
                      {option}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {step === 'age' && (
            <label className="flex flex-col gap-3">
              <span className="font-serif text-2xl font-semibold text-balance">
                How old is the oldest traveler?
              </span>
              <span className="-mt-1 text-sm leading-relaxed text-palace/65">Premiums are based on age.</span>
              <input
                className={inputClass}
                inputMode="numeric"
                placeholder="34"
                value={data.oldestAge}
                onChange={(e) => update({ oldestAge: e.target.value.replace(/[^\d]/g, '').slice(0, 3) })}
                autoFocus
              />
            </label>
          )}

          {step === 'email' && (
            <label className="flex flex-col gap-3">
              <span className="font-serif text-2xl font-semibold text-balance">Where should we send your quotes?</span>
              <span className="-mt-1 text-sm leading-relaxed text-palace/65">
                You&apos;ll get up to 3 plan options. No spam, unsubscribe anytime.
              </span>
              <input
                type="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                autoFocus
              />
            </label>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={stepIndex === 0 || submitting}
            className="flex items-center gap-1.5 text-sm font-medium text-palace/60 hover:text-palace disabled:invisible"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </button>
          {step !== 'travelers' && (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-palace/45 sm:inline">
                press <kbd className="font-sans font-semibold">Enter</kbd>
              </span>
              <button
                type="submit"
                disabled={!valid || submitting}
                className="flex items-center gap-2 rounded-lg bg-palace px-4 py-2.5 text-sm font-semibold text-palace-foreground transition-opacity disabled:opacity-40"
              >
                {submitting ? 'Finding plans…' : isLast ? 'Get my quotes' : 'OK'}
                {!submitting && <ArrowRight className="size-4" aria-hidden />}
              </button>
            </div>
          )}
        </div>
      </form>

      <p className="border-t border-palace/10 px-5 py-3 text-xs leading-relaxed text-palace/50">
        Sponsored by Wayfarer. Princess Aurelia is an AI character and isn&apos;t a licensed insurance agent. Your
        answers are shared with Wayfarer only if you submit.
      </p>
    </aside>
  )
}

export function QuoteConfirmation({ data }: { data: TravelQuote }) {
  const cost = Number(data.tripCost)
  const plans = [
    { name: 'Essential', price: Math.round(cost * 0.045), note: 'Trip cancellation + medical' },
    { name: 'Explorer', price: Math.round(cost * 0.062), note: 'Adds lost baggage & delays', recommended: true },
    { name: 'Cancel for any reason', price: Math.round(cost * 0.089), note: '75% back, no questions asked' },
  ]

  return (
    <aside
      aria-label="Sponsored: Wayfarer quote request received"
      className="w-full max-w-[36rem] overflow-hidden rounded-2xl bg-palace-foreground text-palace shadow-lg animate-in fade-in zoom-in-95 duration-500"
    >
      <div className="flex items-center justify-between gap-3 border-b border-palace/10 px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-6 items-center justify-center rounded-full bg-palace text-palace-gold">
            <Check className="size-3.5" aria-hidden />
          </span>
          Quote request sent
        </span>
        <span className="rounded-full bg-palace-gold px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-palace">
          Sponsored
        </span>
      </div>
      <div className="flex flex-col gap-4 px-5 py-5">
        <p className="text-sm leading-relaxed text-palace/70">
          Estimated plans for {data.destination}, {data.travelers.toLowerCase()}. Final quotes are on their way to{' '}
          <span className="font-medium text-palace">{data.email}</span>.
        </p>
        <ul className="flex flex-col gap-2">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${
                plan.recommended ? 'border-palace' : 'border-palace/15'
              }`}
            >
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  {plan.name}
                  {plan.recommended && (
                    <span className="rounded bg-palace px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-palace-gold">
                      Popular
                    </span>
                  )}
                </span>
                <span className="text-xs text-palace/60">{plan.note}</span>
              </div>
              <span className="text-sm font-semibold tabular-nums">~${plan.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
