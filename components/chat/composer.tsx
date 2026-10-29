import { ArrowUp, ChevronDown, Plus, SlidersHorizontal } from 'lucide-react'

export function Composer() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm"
      >
        <label htmlFor="composer" className="sr-only">
          Reply
        </label>
        <textarea
          id="composer"
          rows={1}
          placeholder="Reply..."
          className="w-full resize-none bg-transparent px-1 text-[15px] leading-relaxed text-card-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Add attachment"
              className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary"
            >
              <Plus className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Tools"
              className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary"
            >
              Sonnet
              <ChevronDown className="size-3.5" />
            </button>
            <button
              type="submit"
              aria-label="Send message"
              className="rounded-lg bg-primary p-1.5 text-primary-foreground opacity-50"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </form>
      <p className="pt-2 text-center text-xs text-muted-foreground">
        Mockup for demonstration. AI can make mistakes. Sponsored content is labeled.
      </p>
    </div>
  )
}
