import Image from 'next/image'
import type { ReactNode } from 'react'

export const PRINCESS = {
  name: 'Princess Aurelia',
  avatar: '/images/princess-aurelia.png',
}

export function PrincessAvatar({ size = 36 }: { size?: number }) {
  return (
    <Image
      src={PRINCESS.avatar || '/placeholder.svg'}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover object-top ring-1 ring-palace-gold/40"
      style={{ width: size, height: size }}
    />
  )
}

export function PrincessMessage({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <PrincessAvatar />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-sm font-medium text-palace-muted">{PRINCESS.name}</span>
        <div className="max-w-[36rem] rounded-2xl rounded-tl-sm bg-palace-surface px-4 py-3 leading-relaxed text-palace-foreground">
          {children}
        </div>
        {action}
      </div>
    </div>
  )
}

export function UserMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-[30rem] rounded-2xl rounded-tr-sm bg-palace-foreground/10 px-4 py-3 leading-relaxed text-palace-foreground">
        {children}
      </div>
    </div>
  )
}

export function Narration({ children }: { children: ReactNode }) {
  return <em className="text-palace-muted not-italic before:content-['*'] after:content-['*']">{children}</em>
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3" role="status" aria-label={`${PRINCESS.name} is typing`}>
      <PrincessAvatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-palace-surface px-4 py-4">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-palace-muted"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
