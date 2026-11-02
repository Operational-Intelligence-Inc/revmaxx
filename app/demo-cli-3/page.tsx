import type { Metadata } from 'next'
import { LiveTerminal } from '@/components/cli/live/live-terminal'

export const metadata: Metadata = {
  title: 'CLI Mockup — Live Scan, Install and Sponsored Booking',
  description:
    'An interactive Claude Code terminal demo: Claude scans the codebase, recommends analytics tools, installs PostHog, and offers a sponsored intro call while the user waits.',
}

export default function DemoCli3Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-terminal p-0 md:p-8">
      <h1 className="sr-only">Interactive Claude Code CLI demo with a sponsored offer during install</h1>
      <LiveTerminal />
    </main>
  )
}
