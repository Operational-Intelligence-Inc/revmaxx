import { MessageSquare, PanelLeft, Plus, FolderClosed, Search } from 'lucide-react'

const RECENTS = [
  'Is my car insurance rate fair?',
  'Weekend trip to Hill Country',
  'Refinance vs. pay down mortgage',
  'Meal prep plan for the week',
  'Rewrite cover letter intro',
  'Explain index funds simply',
]

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-serif text-lg font-medium tracking-tight">Assistant</span>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent"
        >
          <PanelLeft className="size-4" />
        </button>
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-1 px-2">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-primary hover:bg-sidebar-accent"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Plus className="size-3.5" />
          </span>
          New chat
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent"
        >
          <Search className="size-4 text-muted-foreground" />
          Search
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent"
        >
          <MessageSquare className="size-4 text-muted-foreground" />
          Chats
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent"
        >
          <FolderClosed className="size-4 text-muted-foreground" />
          Projects
        </button>
      </nav>

      <div className="mt-6 flex min-h-0 flex-1 flex-col px-2">
        <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">Recents</p>
        <ul className="flex flex-col gap-0.5 overflow-y-auto">
          {RECENTS.map((title, i) => (
            <li key={title}>
              <button
                type="button"
                aria-current={i === 0 ? 'page' : undefined}
                className="w-full truncate rounded-lg px-2 py-1.5 text-left text-sm hover:bg-sidebar-accent aria-[current=page]:bg-sidebar-accent"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
          JM
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">Jordan Miller</span>
          <span className="text-xs text-muted-foreground">Pro plan</span>
        </div>
      </div>
    </aside>
  )
}
