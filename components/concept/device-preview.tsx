'use client'

import { useEffect, useRef, useState } from 'react'

export function ScaledFrame({
  src,
  title,
  width,
  height,
}: {
  src: string
  title: string
  width: number
  height: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: `${width} / ${height}` }}>
      {scale > 0 && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          width={width}
          height={height}
          className="absolute left-0 top-0 border-0"
          style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}
        />
      )}
    </div>
  )
}

export function DesktopPreview({ src, title }: { src: string; title: string }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-frame">
      <div className="flex items-center gap-3 px-3 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="size-2.5 rounded-full bg-muted" />
        </span>
        <span className="flex-1 truncate rounded-md bg-muted px-3 py-1 text-center font-mono text-xs text-muted-foreground">
          revmaxx.ai
        </span>
      </div>
      <ScaledFrame src={src} title={`${title} — desktop`} width={1440} height={900} />
    </div>
  )
}

export function MobilePreview({ src, title }: { src: string; title: string }) {
  return (
    <div className="mx-auto w-full max-w-72 rounded-[2.5rem] border border-border bg-frame p-2.5">
      <div className="overflow-hidden rounded-[2rem]">
        <ScaledFrame src={src} title={`${title} — mobile`} width={390} height={844} />
      </div>
    </div>
  )
}
