'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

export type Option = { label: string; description?: string }

export function OptionList({
  label,
  options,
  initialIndex = 0,
  onSelect,
  onEscape,
}: {
  label: string
  options: Option[]
  initialIndex?: number
  onSelect: (index: number) => void
  onEscape?: () => void
}) {
  const [active, setActive] = useState(initialIndex)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault()
      setActive((i) => (i + 1) % options.length)
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault()
      setActive((i) => (i - 1 + options.length) % options.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      onSelect(active)
    } else if (e.key === 'Escape' && onEscape) {
      e.preventDefault()
      onEscape()
    } else {
      const n = Number.parseInt(e.key, 10)
      if (n >= 1 && n <= options.length) {
        e.preventDefault()
        onSelect(n - 1)
      }
    }
  }

  return (
    <div
      ref={ref}
      role="listbox"
      tabIndex={0}
      aria-label={label}
      aria-activedescendant={`${id}-${active}`}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-1 outline-none"
    >
      {options.map((option, i) => {
        const isActive = i === active
        return (
          <div
            key={option.label}
            id={`${id}-${i}`}
            role="option"
            aria-selected={isActive}
            onMouseEnter={() => setActive(i)}
            onClick={() => onSelect(i)}
            className="flex cursor-pointer"
          >
            <span
              aria-hidden="true"
              className={cn('w-[2ch] shrink-0', isActive ? 'text-terminal-accent' : 'opacity-0')}
            >
              {'›'}
            </span>
            <div className="flex min-w-0 flex-col">
              <p className={cn(isActive && 'text-terminal-accent')}>
                {`${i + 1}. ${option.label}`}
              </p>
              {option.description && (
                <p className="pl-[3ch] text-pretty text-terminal-muted">{option.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
