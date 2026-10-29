'use client'

import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, Landmark, Lock } from 'lucide-react'
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

const CITIZENSHIP = ['U.S. citizen', 'Permanent resident', 'Other / not sure']
const CREDIT = ['Excellent (720+)', 'Good (680–719)', 'Fair (640–679)', 'Below 640', 'Not sure / no credit history']
const INCOME = ['Under $50,000', '$50,000 – $99,999', '$100,000 – $149,999', '$150,000 – $249,999', '$250,000+']
const GRAD_YEARS = ['2030', '2031', '2032']

type Errors = Partial<Record<keyof LoanLead, string>>

function validate(data: LoanLead): Errors {
  const errors: Errors = {}
  const amount = Number(data.amount)
  if (!amount || amount < 1000 || amount > 100000) errors.amount = 'Enter an amount between $1,000 and $100,000.'
  if (!data.school.trim()) errors.school = 'Enter your school.'
  if (!data.citizenship) errors.citizenship = 'Select a status.'
  if (!data.credit) errors.credit = 'Select a range. An estimate is fine.'
  if (!data.income) errors.income = 'Select an income range.'
  if (!data.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!data.lastName.trim()) errors.lastName = 'Enter your last name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.'
  if (data.phone.replace(/\D/g, '').length !== 10) errors.phone = 'Enter a 10-digit mobile number.'
  if (!data.consent) errors.consent = 'Please agree to continue.'
  return errors
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const controlClass =
  'h-12 w-full rounded-lg border border-aiko-ink/25 bg-aiko-surface px-3 text-base text-aiko-ink outline-none placeholder:text-aiko-ink/40 focus-visible:border-aiko-brand focus-visible:ring-2 focus-visible:ring-aiko-brand/30 aria-[invalid=true]:border-red-700'

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

function Select({
  id,
  value,
  options,
  placeholder,
  invalid,
  onChange,
}: {
  id: string
  value: string
  options: string[]
  placeholder: string
  invalid: boolean
  onChange: (value: string) => void
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid}
      aria-describedby={invalid ? `${id}-error` : undefined}
      className={cn(controlClass, !value && 'text-aiko-ink/50')}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option} className="text-aiko-ink">
          {option}
        </option>
      ))}
    </select>
  )
}

export function LoanForm({ onComplete }: { onComplete: (data: LoanLead) => void }) {
  const uid = useId()
  const [data, setData] = useState<LoanLead>(INITIAL)
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const errors = attempted ? validate(data) : {}
  const update = (patch: Partial<LoanLead>) => setData((prev) => ({ ...prev, ...patch }))
  const id = (name: string) => `${uid}-${name}`
  const invalid = (name: keyof LoanLead) => Boolean(errors[name])
  const describedBy = (name: keyof LoanLead) => (errors[name] ? `${id(name)}-error` : undefined)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (submitting) return
    setAttempted(true)
    if (Object.keys(validate(data)).length > 0) return
    setSubmitting(true)
    setTimeout(() => onComplete(data), 1200)
  }

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

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 px-5 py-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-balance">Compare private student loan offers</h2>
          <p className="text-base leading-relaxed text-aiko-ink/70">
            We pre-filled what Aiko already knows. Checking rates uses a soft credit check and won&apos;t affect your score.
          </p>
        </div>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-3 text-xs font-semibold tracking-wide text-aiko-ink/60 uppercase">Your loan</legend>
          <Field label="How much do you need to borrow?" htmlFor={id('amount')} error={errors.amount}>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-base text-aiko-ink/60">$</span>
              <input
                id={id('amount')}
                inputMode="numeric"
                value={data.amount ? Number(data.amount).toLocaleString('en-US') : ''}
                onChange={(e) => update({ amount: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                aria-invalid={invalid('amount')}
                aria-describedby={describedBy('amount')}
                className={cn(controlClass, 'pl-7 tabular-nums')}
              />
            </div>
          </Field>
          <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
            <Field label="School" htmlFor={id('school')} error={errors.school}>
              <input
                id={id('school')}
                value={data.school}
                onChange={(e) => update({ school: e.target.value })}
                aria-invalid={invalid('school')}
                aria-describedby={describedBy('school')}
                className={controlClass}
              />
            </Field>
            <Field label="Graduation" htmlFor={id('grad')}>
              <Select
                id={id('grad')}
                value={data.gradYear}
                options={GRAD_YEARS}
                placeholder="Year"
                invalid={false}
                onChange={(gradYear) => update({ gradYear })}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-3 text-xs font-semibold tracking-wide text-aiko-ink/60 uppercase">Eligibility</legend>
          <div className="flex flex-col gap-2">
            <span id={id('cosigner-label')} className="text-sm font-medium">
              Applying with a cosigner?
            </span>
            <div role="radiogroup" aria-labelledby={id('cosigner-label')} className="grid gap-2 sm:grid-cols-2">
              {(
                [
                  { value: 'yes', title: 'Yes, with a cosigner', note: 'Parent or guardian. Lower rates.' },
                  { value: 'no', title: 'No, on my own', note: 'Requires credit history.' },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer flex-col gap-0.5 rounded-lg border border-aiko-ink/25 px-3 py-2.5 has-checked:border-aiko-brand has-checked:bg-aiko-brand/5 has-checked:ring-1 has-checked:ring-aiko-brand has-focus-visible:ring-2 has-focus-visible:ring-aiko-brand/40"
                >
                  <input
                    type="radio"
                    name={id('cosigner')}
                    value={option.value}
                    checked={data.cosigner === option.value}
                    onChange={() => update({ cosigner: option.value })}
                    className="sr-only"
                  />
                  <span className="text-base font-medium">{option.title}</span>
                  <span className="text-sm text-aiko-ink/65">{option.note}</span>
                </label>
              ))}
            </div>
          </div>
          <Field label="Citizenship status" htmlFor={id('citizenship')} error={errors.citizenship}>
            <Select
              id={id('citizenship')}
              value={data.citizenship}
              options={CITIZENSHIP}
              placeholder="Select one"
              invalid={invalid('citizenship')}
              onChange={(citizenship) => update({ citizenship })}
            />
          </Field>
          <Field
            label={`Credit score range (${data.cosigner === 'yes' ? "cosigner's" : 'yours'})`}
            htmlFor={id('credit')}
            error={errors.credit}
          >
            <Select
              id={id('credit')}
              value={data.credit}
              options={CREDIT}
              placeholder="Select one"
              invalid={invalid('credit')}
              onChange={(credit) => update({ credit })}
            />
          </Field>
          <Field label="Annual household income" htmlFor={id('income')} error={errors.income}>
            <Select
              id={id('income')}
              value={data.income}
              options={INCOME}
              placeholder="Select one"
              invalid={invalid('income')}
              onChange={(income) => update({ income })}
            />
          </Field>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-3 text-xs font-semibold tracking-wide text-aiko-ink/60 uppercase">Where should we send your offers?</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" htmlFor={id('firstName')} error={errors.firstName}>
              <input
                id={id('firstName')}
                autoComplete="given-name"
                value={data.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                aria-invalid={invalid('firstName')}
                aria-describedby={describedBy('firstName')}
                className={controlClass}
              />
            </Field>
            <Field label="Last name" htmlFor={id('lastName')} error={errors.lastName}>
              <input
                id={id('lastName')}
                autoComplete="family-name"
                value={data.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                aria-invalid={invalid('lastName')}
                aria-describedby={describedBy('lastName')}
                className={controlClass}
              />
            </Field>
          </div>
          <Field label="Email" htmlFor={id('email')} error={errors.email}>
            <input
              id={id('email')}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
              aria-invalid={invalid('email')}
              aria-describedby={describedBy('email')}
              className={controlClass}
            />
          </Field>
          <Field label="Mobile phone" htmlFor={id('phone')} error={errors.phone}>
            <input
              id={id('phone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(555) 123-4567"
              value={data.phone}
              onChange={(e) => update({ phone: formatPhone(e.target.value) })}
              aria-invalid={invalid('phone')}
              aria-describedby={describedBy('phone')}
              className={controlClass}
            />
          </Field>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id={id('consent')}
              type="checkbox"
              checked={data.consent}
              onChange={(e) => update({ consent: e.target.checked })}
              aria-invalid={invalid('consent')}
              aria-describedby={describedBy('consent')}
              className="mt-1 size-5 shrink-0 accent-aiko-brand"
            />
            <span className="text-sm leading-relaxed text-aiko-ink/75">
              I agree to Bridgewell&apos;s Terms and Privacy Policy and consent to be contacted by Bridgewell and up to
              three partner lenders by phone, text, or email, including by autodialed or prerecorded messages, at the number
              and email above. Consent is not required to receive offers. Msg &amp; data rates may apply.
            </span>
          </label>
          {errors.consent && (
            <p id={`${id('consent')}-error`} className="text-sm text-red-700">
              {errors.consent}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-aiko-brand px-5 text-base font-semibold text-aiko-surface transition-colors hover:bg-aiko-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aiko-brand disabled:opacity-60"
        >
          {submitting ? 'Matching you with lenders…' : 'See my loan options'}
          {!submitting && <ArrowRight className="size-5" aria-hidden />}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-sm text-aiko-ink/60">
          <Lock className="size-4" aria-hidden />
          Secured with 256-bit encryption
        </p>
      </form>

      <p className="border-t border-aiko-ink/10 px-5 py-3 text-xs leading-relaxed text-aiko-ink/60">
        Sponsored by Bridgewell. Aiko is an AI advisor, not a lender or financial advisor. Your information is shared with
        Bridgewell and its lending partners only if you submit this form.
      </p>
    </aside>
  )
}
