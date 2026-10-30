'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const FIELD =
  'w-full rounded-full border border-primary-foreground/30 bg-transparent px-5 py-3.5 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-pop focus:outline-none focus-visible:ring-2 focus-visible:ring-pop'

export function V10ApplyForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div role="status" className="flex items-center gap-3 rounded-3xl border border-primary-foreground/30 p-6">
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
        setSubmitted(true)
      }}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <label className="sr-only" htmlFor="v10-name">
        Name
      </label>
      <input id="v10-name" name="name" type="text" required autoComplete="name" placeholder="Name" className={FIELD} />
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
        className={FIELD}
      />
      <label className="sr-only" htmlFor="v10-app">
        Your AI app
      </label>
      <input id="v10-app" name="app" type="text" placeholder="Your AI app (optional)" className={FIELD} />
      <button type="submit" className="rounded-full bg-pop px-6 py-3.5 font-medium text-primary-foreground">
        Apply — it&apos;s free
      </button>
    </form>
  )
}
