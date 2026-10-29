'use client'

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Landmark, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FUNDING_GAP } from './aid-offer'

export type LoanLead = {
  amount: string
  school: string
  gradYear: string
  cosigner: 'yes' | 'no'
  citizenship: string
  credit: string
  income: string
  firstName: string
  lastName: string
  email: string
  phone: string
  consent: boolean
}

const INITIAL: LoanLead = {
  amount: String(FUNDING_GAP),
  school: 'Lakeview University',
  gradYear: '2031',
  cosigner: 'yes',
  citizenship: '',
  credit: '',
  income: '',
  firstName: 'Maya',
  lastName: 'Chen',
  email: '',
  phone: '',
  consent: false,
}

type Option = { value: string; label: string; note?: string }
type ChoiceField = 'cosigner' | 'citizenship' | 'credit' | 'income'

const fromList = (items: string[]): Option[] => items.map((item) => ({ value: item, label: item }))

const CHOICES: Record<ChoiceField, Option[]> = {
  cosigner: [
    { value: 'yes', label: 'Yes, with a cosigner', note: 'A parent or guardian. Usually lower rates.' },
    { value: 'no', label: 'No, on my own', note: 'Requires some credit history.' },
  ],
  citizenship: fromList(['U.S. citizen', 'Permanent resident', 'Other / not sure']),
  credit: fromList(['Excellent (720+)', 'Good (680–719)', 'Fair (640–679)', 'Below 640', 'Not sure / no credit history']),
  income: fromList(['Under $50,000', '$50,000 – $99,999', '$100,000 – $149,999', '$150,000 – $249,999', '$250,000+']),
}

const GRAD_YEARS = ['2030', '2031', '2032']

const STEPS = ['amount', 'school', 'cosigner', 'citizenship', 'credit', 'income', 'name', 'email', 'contact'] as const
type StepId = (typeof STEPS)[number]

const isChoiceStep = (id: StepId): id is ChoiceField => id in CHOICES

type Errors = Partial<Record<keyof LoanLead, string>>

function validateStep(id: StepId, data: LoanLead): Errors {
  const errors: Errors = {}
  switch (id) {
    case 'amount': {
      const amount = Number(data.amount)
      if (!amount || amount < 1000 || amount > 100000) errors.amount = 'Enter an amount between $1,000 and $100,000.'
      break
    }
    case 'school':
      if (!data.school.trim()) errors.school = 'Enter your school.'
      break
    case 'citizenship':
      if (!data.citizenship) errors.citizenship = 'Select a status.'
      break
    case 'credit':
      if (!data.credit) errors.credit = 'Select a range. An estimate is fine.'
      break
    case 'income':
      if (!data.income) errors.income = 'Select an income range.'
      break
    case 'name':
      if (!data.firstName.trim()) errors.firstName = 'Enter your first name.'
      if (!data.lastName.trim()) errors.lastName = 'Enter your last name.'
      break
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.'
      break
    case 'contact':
      if (data.phone.replace(/\D/g, '').length !== 10) errors.phone = 'Enter a 10-digit mobile number.'
      if (!data.consent) errors.consent = 'Please agree to continue.'
      break
  }
  return errors
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const underlineClass =
  'h-14 w-full border-0 border-b-2 border-aiko-ink/25 bg-transparent px-0 text-2xl text-aiko-ink outline-none placeholder:text-aiko-ink/35 focus-visible:border-aiko-brand aria-[invalid=true]:border-red-700'

const selectClass =
  'h-12 w-full rounded-lg border border-aiko-ink/25 bg-aiko-surface px-3 text-base text-aiko-ink outline-none focus-visible:border-aiko-brand focus-visible:ring-2 focus-visible:ring-aiko-brand/30'

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="text-sm text-red-700">
      {message}
    </p>
  )
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-aiko-ink/70">
      {children}
    </label>
  )
}

export function LoanForm({ onComplete }: { onComplete: (data: LoanLead) => void }) {
  const uid = useId()
  const [data, setData] = useState<LoanLead>(INITIAL)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)
  const pickTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const stepId = STEPS[step]
  const isLast = step === STEPS.length - 1
  const choiceField = isChoiceStep(stepId) ? stepId : null
  const id = (name: string) => `${uid}-${name}`
  const titleId = id('title')
  const update = (patch: Partial<LoanLead>) => setData((prev) => ({ ...prev, ...patch }))
  const errorId = (name: keyof LoanLead) => (errors[name] ? `${id(name)}-error` : undefined)

  useEffect(() => () => clearTimeout(pickTimer.current), [])

  useEffect(() => {
    const el = stepRef.current
    if (!el) return
    const target = el.querySelector<HTMLElement>('input:not([type=checkbox]), select')
    ;(target ?? el).focus({ preventScroll: true })
  }, [step])

  const advance = (current: LoanLead) => {
    const found = validateStep(stepId, current)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    if (isLast) {
      if (submitting) return
      setSubmitting(true)
      setTimeout(() => onComplete(current), 1200)
      return
    }
    setDirection('forward')
    setStep((s) => s + 1)
  }

  const goBack = () => {
    if (step === 0 || submitting) return
    clearTimeout(pickTimer.current)
    setErrors({})
    setDirection('back')
    setStep((s) => s - 1)
  }

  const pick = (field: ChoiceField, value: string) => {
    const next = { ...data, [field]: value } as LoanLead
    setData(next)
    setErrors({})
    clearTimeout(pickTimer.current)
    pickTimer.current = setTimeout(() => advance(next), 280)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    advance(data)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (!choiceField || event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return
    const option = CHOICES[choiceField][event.key.toUpperCase().charCodeAt(0) - 65]
    if (!option) return
    event.preventDefault()
    pick(choiceField, option.value)
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <aside
      aria-label="Sponsored: Bridgewell student loan comparison form"
      className="w-full max-w-[36rem] overflow-hidden rounded-2xl border border-aiko-ink/10 bg-aiko-surface shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500"
    >
      <div className="flex items-center justify-between gap-3 border-b border-aiko-ink/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-aiko-ink text-aiko-surface">
            <Landmark className="size-4" aria-hidden />
          </span>
          <span className="text-base font-semibold">Bridgewell Student Loans</span>
        </div>
        <span className="rounded-full border border-aiko-ink/30 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
          Sponsored
        </span>
      </div>

      <div className="flex flex-col gap-2 px-5 pt-4">
        <div className="flex items-center justify-between text-sm text-aiko-ink/65">
          <span>Compare private student loan offers</span>
          <span className="tabular-nums">
            {step + 1} of {STEPS.length}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Form progress"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          className="h-1.5 overflow-hidden rounded-full bg-aiko-ink/10"
        >
          <div
            className="h-full rounded-full bg-aiko-brand transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate className="flex flex-col gap-6 px-5 pt-6 pb-5">
        <div
          key={step}
          ref={stepRef}
          tabIndex={-1}
          className={cn(
            'flex min-h-96 flex-col gap-6 outline-none animate-in fade-in duration-300 motion-reduce:animate-none',
            direction === 'forward' ? 'slide-in-from-right-6' : 'slide-in-from-left-6',
          )}
        >
          {stepId === 'amount' && (
            <>
              <StepHeading id={titleId} subtitle="We pre-filled your gap from the aid offer. Change it if you need a different amount.">
                How much do you need to borrow?
              </StepHeading>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-2xl text-aiko-ink/50">$</span>
                  <input
                    id={id('amount')}
                    inputMode="numeric"
                    aria-labelledby={titleId}
                    value={data.amount ? Number(data.amount).toLocaleString('en-US') : ''}
                    onChange={(e) => update({ amount: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    aria-invalid={Boolean(errors.amount)}
                    aria-describedby={errorId('amount')}
                    className={cn(underlineClass, 'pl-6 tabular-nums')}
                  />
                </div>
                <ErrorText id={`${id('amount')}-error`} message={errors.amount} />
              </div>
            </>
          )}

          {stepId === 'school' && (
            <>
              <StepHeading id={titleId} subtitle="Aiko already knows this. Just confirm it looks right.">
                Where will you be studying?
              </StepHeading>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor={id('school')}>School</FieldLabel>
                  <input
                    id={id('school')}
                    value={data.school}
                    onChange={(e) => update({ school: e.target.value })}
                    aria-invalid={Boolean(errors.school)}
                    aria-describedby={errorId('school')}
                    className={underlineClass}
                  />
                  <ErrorText id={`${id('school')}-error`} message={errors.school} />
                </div>
                <div className="flex flex-col gap-1.5 sm:w-48">
                  <FieldLabel htmlFor={id('grad')}>Expected graduation</FieldLabel>
                  <select
                    id={id('grad')}
                    value={data.gradYear}
                    onChange={(e) => update({ gradYear: e.target.value })}
                    className={selectClass}
                  >
                    {GRAD_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {choiceField && (
            <>
              <StepHeading
                id={titleId}
                subtitle={
                  choiceField === 'cosigner'
                    ? 'A parent or guardian with good credit can lower your rate.'
                    : choiceField === 'credit'
                      ? "An estimate is fine. Checking rates uses a soft credit check and won't affect your score."
                      : choiceField === 'income'
                        ? 'Lenders use this to estimate what you can afford.'
                        : undefined
                }
              >
                {choiceField === 'cosigner' && 'Will you apply with a cosigner?'}
                {choiceField === 'citizenship' && "What's your citizenship status?"}
                {choiceField === 'credit' &&
                  `What's ${data.cosigner === 'yes' ? "your cosigner's" : 'your'} credit score range?`}
                {choiceField === 'income' && "What's your annual household income?"}
              </StepHeading>
              <div role="radiogroup" aria-labelledby={titleId} className="flex flex-col gap-2">
                {CHOICES[choiceField].map((option, index) => {
                  const selected = data[choiceField] === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => pick(choiceField, option.value)}
                      className={cn(
                        'flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aiko-brand',
                        selected
                          ? 'border-aiko-brand bg-aiko-brand/5 ring-1 ring-aiko-brand'
                          : 'border-aiko-ink/25 hover:border-aiko-brand/60 hover:bg-aiko-brand/5',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'flex size-7 shrink-0 items-center justify-center rounded border text-sm font-semibold',
                          selected
                            ? 'border-aiko-brand bg-aiko-brand text-aiko-surface'
                            : 'border-aiko-ink/30 text-aiko-ink/70',
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="text-base font-medium">{option.label}</span>
                        {option.note && <span className="text-sm text-aiko-ink/65">{option.note}</span>}
                      </span>
                      {selected && <Check className="size-5 shrink-0 text-aiko-brand" aria-hidden />}
                    </button>
                  )
                })}
              </div>
              <ErrorText id={`${id(choiceField)}-error`} message={errors[choiceField]} />
            </>
          )}

          {stepId === 'name' && (
            <>
              <StepHeading id={titleId} subtitle="So lenders know who they're making offers to.">
                What&apos;s your name?
              </StepHeading>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor={id('firstName')}>First name</FieldLabel>
                  <input
                    id={id('firstName')}
                    autoComplete="given-name"
                    value={data.firstName}
                    onChange={(e) => update({ firstName: e.target.value })}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errorId('firstName')}
                    className={underlineClass}
                  />
                  <ErrorText id={`${id('firstName')}-error`} message={errors.firstName} />
                </div>
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor={id('lastName')}>Last name</FieldLabel>
                  <input
                    id={id('lastName')}
                    autoComplete="family-name"
                    value={data.lastName}
                    onChange={(e) => update({ lastName: e.target.value })}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errorId('lastName')}
                    className={underlineClass}
                  />
                  <ErrorText id={`${id('lastName')}-error`} message={errors.lastName} />
                </div>
              </div>
            </>
          )}

          {stepId === 'email' && (
            <>
              <StepHeading id={titleId} subtitle="Your matched offers will be sent here.">
                What&apos;s your email address?
              </StepHeading>
              <div className="flex flex-col gap-2">
                <input
                  id={id('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-labelledby={titleId}
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errorId('email')}
                  className={underlineClass}
                />
                <ErrorText id={`${id('email')}-error`} message={errors.email} />
              </div>
            </>
          )}

          {stepId === 'contact' && (
            <>
              <StepHeading id={titleId} subtitle="Last question. A lender may text you to confirm your offer.">
                What&apos;s your mobile number?
              </StepHeading>
              <div className="flex flex-col gap-2">
                <input
                  id={id('phone')}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(555) 123-4567"
                  aria-labelledby={titleId}
                  value={data.phone}
                  onChange={(e) => update({ phone: formatPhone(e.target.value) })}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errorId('phone')}
                  className={underlineClass}
                />
                <ErrorText id={`${id('phone')}-error`} message={errors.phone} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    id={id('consent')}
                    type="checkbox"
                    checked={data.consent}
                    onChange={(e) => update({ consent: e.target.checked })}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errorId('consent')}
                    className="mt-1 size-5 shrink-0 accent-aiko-brand"
                  />
                  <span className="text-sm leading-relaxed text-aiko-ink/75">
                    I agree to Bridgewell&apos;s Terms and Privacy Policy and consent to be contacted by Bridgewell and up to
                    three partner lenders by phone, text, or email, including by autodialed or prerecorded messages, at the
                    number and email above. Consent is not required to receive offers. Msg &amp; data rates may apply.
                  </span>
                </label>
                <ErrorText id={`${id('consent')}-error`} message={errors.consent} />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={submitting}
              className="flex h-12 items-center gap-1.5 rounded-lg px-3 text-base font-medium text-aiko-ink/70 transition-colors hover:bg-aiko-ink/5 hover:text-aiko-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aiko-brand disabled:opacity-50"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}
          {!choiceField && (
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-aiko-brand px-6 text-base font-semibold text-aiko-surface transition-colors hover:bg-aiko-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aiko-brand disabled:opacity-60"
            >
              {submitting ? 'Matching you with lenders…' : isLast ? 'See my loan options' : 'Continue'}
              {!submitting && <ArrowRight className="size-5" aria-hidden />}
            </button>
          )}
        </div>

        {isLast && (
          <p className="flex items-center justify-center gap-1.5 text-sm text-aiko-ink/60">
            <Lock className="size-4" aria-hidden />
            Secured with 256-bit encryption
          </p>
        )}
      </form>

      <p className="border-t border-aiko-ink/10 px-5 py-3 text-xs leading-relaxed text-aiko-ink/60">
        Sponsored by Bridgewell. Aiko is an AI advisor, not a lender or financial advisor. Your information is shared with
        Bridgewell and its lending partners only if you submit this form.
      </p>
    </aside>
  )
}

function StepHeading({ id, subtitle, children }: { id: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h2 id={id} className="text-2xl font-semibold text-balance sm:text-3xl">
        {children}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-aiko-ink/70">{subtitle}</p>}
    </div>
  )
}
