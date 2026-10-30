'use client'

import { useState, useTransition } from 'react'
import { Check } from 'lucide-react'
import { sendContactMessage } from '@/app/actions/contact'

const FIELD =
  'w-full border border-primary-foreground/30 bg-transparent px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-pop focus:outline-none focus-visible:ring-2 focus-visible:ring-pop'

export function V10ApplyForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (submitted) {
    return (
      <div role="status" className="flex w-full max-w-md items-center gap-3 rounded-3xl border border-primary-foreground/30 p-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pop text-primary-foreground">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <p className="text-lg">Thanks — we&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setError(null)
        startTransition(async () => {
          const result = await sendContactMessage(formData)
          if (result.ok) setSubmitted(true)
          else setError(result.error)
        })
      }}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <label className="sr-only" htmlFor="v10-name">
        Name
      </label>
      <input
        id="v10-name"
        name="name"
        type="text"
        required
        autoComplete="name"
        placeholder="Name"
        className={`${FIELD} rounded-full`}
      />
      <label className="sr-only" htmlFor="v10-email">
        Work email
      </label>
      <input
        id="v10-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Work email"
        className={`${FIELD} rounded-full`}
      />
      <label className="sr-only" htmlFor="v10-message">
        Message
      </label>
      <textarea
        id="v10-message"
        name="message"
        rows={4}
        placeholder="Message"
        className={`${FIELD} resize-none rounded-3xl`}
      />
      {error && (
        <p role="alert" className="text-sm text-primary-foreground">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-pop px-6 py-3.5 font-medium text-primary-foreground disabled:opacity-70"
      >
        {isPending ? 'Sending…' : 'Book a call'}
      </button>
    </form>
  )
}
