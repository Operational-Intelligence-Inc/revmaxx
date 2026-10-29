import { RotateCcw } from 'lucide-react'
import { AikoMark } from './messages'

export function AikoHeader({ onRestart }: { onRestart: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-aiko-ink/10 bg-aiko-bg/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <AikoMark className="size-10 text-lg" />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold">Aiko</span>
          <span className="flex items-center gap-1.5 text-sm text-aiko-ink/65">
            <span className="size-1.5 rounded-full bg-aiko-success" aria-hidden />
            College advisor · helloaiko.co
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-aiko-ink/70 transition-colors hover:bg-aiko-ink/5 hover:text-aiko-ink focus-visible:outline-2 focus-visible:outline-aiko-brand"
      >
        <RotateCcw className="size-4" aria-hidden />
        Restart demo
      </button>
    </header>
  )
}
