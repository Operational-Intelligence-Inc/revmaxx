import type { Metadata } from 'next'
import { BookingTerminal } from '@/components/cli/booking-terminal'

export const metadata: Metadata = {
  title: 'CLI Mockup — Sponsored PostHog Intro Call',
  description:
    'A mock Claude Code terminal session recommending analytics tools, with a sponsored PostHog intro-call booking flow that cross-references Google Calendar availability.',
}

export default function DemoCli2Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-terminal p-0 md:p-8">
      <h1 className="sr-only">Claude Code CLI mockup with sponsored PostHog intro call booking</h1>
      <BookingTerminal />
    </main>
  )
}
