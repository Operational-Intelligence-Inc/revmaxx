import type { Metadata } from 'next'
import { TerminalWindow } from '@/components/cli/terminal-window'

export const metadata: Metadata = {
  title: 'CLI Mockup — Sponsored PostHog Startup Credits',
  description:
    'A mock Claude Code terminal session recommending analytics tools, with a sponsored PostHog for Startups application form built into the TUI.',
}

export default function DemoCliPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-terminal p-0 md:p-8">
      <h1 className="sr-only">Claude Code CLI mockup with sponsored PostHog application</h1>
      <TerminalWindow />
    </main>
  )
}
