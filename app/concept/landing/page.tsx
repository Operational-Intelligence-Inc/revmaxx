import type { Metadata } from 'next'
import { ConceptBrowser } from '@/components/concept/concept-browser'
import { LANDING_VERSIONS } from '@/components/concept/landing/versions'

export const metadata: Metadata = {
  title: 'Landing page concepts — RevMaxx',
  description: 'Five landing page directions for RevMaxx, the ad network for AI agents.',
}

export default function LandingConceptsPage() {
  const concepts = LANDING_VERSIONS.map(({ slug, name, headline, direction, inspiration, palette }) => ({
    slug,
    name,
    headline,
    direction,
    inspiration,
    palette,
  }))

  return (
    <div className="theme-gallery min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-lg font-semibold">RevMaxx landing concepts</h1>
          <nav aria-label="Concepts" className="flex gap-1 overflow-x-auto">
            {concepts.map((c, i) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {`${i + 1}. ${c.name}`}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <ConceptBrowser concepts={concepts} />
      </main>
    </div>
  )
}
