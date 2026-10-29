'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DesktopPreview, MobilePreview } from '@/components/concept/device-preview'

export type ConceptSummary = {
  slug: string
  name: string
  headline: string
  direction: string
  inspiration: string
  palette: string[]
}

type View = 'both' | 'desktop' | 'mobile'

const VIEWS: { value: View; label: string }[] = [
  { value: 'both', label: 'Both' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
]

export function ConceptBrowser({ concepts }: { concepts: ConceptSummary[] }) {
  const [view, setView] = useState<View>('both')

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {`${concepts.length} concepts · live iframes of each page`}
        </p>
        <div role="radiogroup" aria-label="Preview size" className="flex w-fit rounded-lg border border-border p-1">
          {VIEWS.map((v) => (
            <button
              key={v.value}
              type="button"
              role="radio"
              aria-checked={view === v.value}
              onClick={() => setView(v.value)}
              className={cn(
                'rounded-md px-3 py-1 text-sm transition-colors',
                view === v.value ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <ol
        className={cn(
          'grid gap-x-6 gap-y-12',
          view === 'mobile' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 lg:grid-cols-2',
        )}
      >
        {concepts.map((c, i) => (
          <li key={c.slug} id={c.slug} className="flex scroll-mt-28 flex-col gap-4">
            <ConceptPreviews concept={c} view={view} />
            <ConceptInfo concept={c} index={i} compact={view === 'mobile'} />
          </li>
        ))}
      </ol>
    </div>
  )
}

function ConceptPreviews({ concept, view }: { concept: ConceptSummary; view: View }) {
  const src = `/concept/landing/${concept.slug}`
  if (view === 'desktop') return <DesktopPreview src={src} title={concept.name} />
  if (view === 'mobile') return <MobilePreview src={src} title={concept.name} />
  return (
    <div className="grid grid-cols-[1fr_5.5rem] items-end gap-3 sm:grid-cols-[1fr_7rem]">
      <DesktopPreview src={src} title={concept.name} />
      <MobilePreview src={src} title={concept.name} compact />
    </div>
  )
}

function ConceptInfo({ concept, index, compact }: { concept: ConceptSummary; index: number; compact: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-mono text-xs text-muted-foreground">{`Concept ${index + 1}`}</p>
          <h2 className="font-semibold text-balance">{concept.name}</h2>
        </div>
        <a
          href={`/concept/landing/${concept.slug}`}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs hover:bg-muted"
        >
          Open
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only">{`${concept.name} in a new tab`}</span>
        </a>
      </div>
      {!compact && (
        <>
          <p className="text-sm italic text-pretty">{`“${concept.headline}”`}</p>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{concept.direction}</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
              <span className="text-foreground">Inspired by:</span> {concept.inspiration}
            </p>
            <div className="flex shrink-0" aria-hidden="true">
              {concept.palette.map((color) => (
                <span
                  key={color}
                  title={color}
                  className="-ml-1.5 size-5 rounded-full border-2 border-background first:ml-0"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
