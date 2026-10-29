'use client'

import { ChevronDown, Share } from 'lucide-react'
import { Sidebar } from './sidebar'
import { UserMessage } from './user-message'
import { AssistantMessage } from './assistant-message'
import { Composer } from './composer'

export function ChatShell() {
  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium hover:bg-secondary"
          >
            Is my car insurance rate fair?
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-secondary"
          >
            <Share className="size-3.5" />
            Share
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pb-8 pt-4">
            <UserMessage>
              {"I'm paying $214/month for full coverage on my 2019 Honda CR-V. I'm 34, clean driving record, and live in Austin, TX. Is that a reasonable price or am I getting ripped off?"}
            </UserMessage>
            <AssistantMessage />
          </div>
        </div>

        <Composer />
      </main>
    </div>
  )
}
