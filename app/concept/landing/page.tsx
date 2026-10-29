import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { DesktopPreview, MobilePreview } from '@/components/concept/device-preview'
import { LANDING_VERSIONS } from '@/components/concept/landing/versions'

export const metadata: Metadata = {
  title: 'Landing page concepts — RevMaxx',
  description: 'Five landing page directions for RevMaxx, the ad network for AI agents.',
}

export default function LandingConceptsPage() {
  return (
    <div className="theme-gallery min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">RevMaxx landing concepts</h1>
            <p className="text-sm text-muted-foreground">Five directions · each shown at 1440px and 390px</p>
          </div>
          <nav aria-label="Concepts" className="flex gap-1 overflow-x-auto">
            {LANDING_VERSIONS.map((v, i) => (
              <a
                key={v.slug}
                href={`#${v.slug}`}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {`${i + 1}. ${v.name}`}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-24 px-5 py-12">
        {LANDING_VERSIONS.map((v, i) => (
          <section key={v.slug} id={v.slug} aria-labelledby={`${v.slug}-title`} className="flex scroll-mt-28 flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex max-w-2xl flex-col gap-2">
                <p className="font-mono text-xs text-muted-foreground">{`Version ${i + 1}`}</p>
                <h2 id={`${v.slug}-title`} className="text-2xl font-semibold text-balance">
                  {v.name}
                </h2>
                <p className="leading-relaxed text-muted-foreground">{v.direction}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="text-foreground">Inspired by:</span> {v.inspiration}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex" aria-label="Palette">
                  {v.palette.map((c) => (
                    <span
                      key={c}
                      title={c}
                      className="-ml-1.5 size-6 rounded-full border-2 border-background first:ml-0"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <a
                  href={`/concept/landing/${v.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
                >
                  Open full page <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_18rem]">
              <DesktopPreview src={`/concept/landing/${v.slug}`} title={v.name} />
              <MobilePreview src={`/concept/landing/${v.slug}`} title={v.name} />
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
