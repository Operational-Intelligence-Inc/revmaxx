import Image from 'next/image'
import { ChevronLeft, MoreHorizontal, Phone } from 'lucide-react'
import { PRINCESS, PrincessAvatar } from './messages'

export function CharacterHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-palace-foreground/10 bg-palace/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Back to characters"
          className="flex size-9 items-center justify-center rounded-full text-palace-muted hover:bg-palace-surface hover:text-palace-foreground"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <PrincessAvatar size={36} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{PRINCESS.name}</span>
          <span className="text-xs text-palace-muted">by @storyweaver</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Voice call"
          className="flex size-9 items-center justify-center rounded-full text-palace-muted hover:bg-palace-surface hover:text-palace-foreground"
        >
          <Phone className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Chat options"
          className="flex size-9 items-center justify-center rounded-full text-palace-muted hover:bg-palace-surface hover:text-palace-foreground"
        >
          <MoreHorizontal className="size-5" aria-hidden />
        </button>
      </div>
    </header>
  )
}

export function CharacterIntro() {
  return (
    <section aria-label="About this character" className="flex flex-col items-center gap-3 pb-6 pt-8 text-center">
      <Image
        src={PRINCESS.avatar || '/placeholder.svg'}
        alt="Cartoon illustration of Princess Aurelia, with an auburn braid, gold tiara and teal embroidered gown"
        width={112}
        height={112}
        priority
        className="size-28 rounded-full object-cover object-top ring-2 ring-palace-gold/60"
      />
      <h2 className="font-serif text-2xl font-semibold text-balance">{PRINCESS.name}</h2>
      <p className="max-w-sm text-sm leading-relaxed text-pretty text-palace-muted">
        Crown princess of Valdoria. Collector of maps, teller of tall tales, and an incurable planner of other
        people&apos;s adventures.
      </p>
    </section>
  )
}
