import { cn } from '@/lib/utils'

const RAYS = Array.from({ length: 12 }, (_, i) => i * 30)

export function SparkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('size-6 text-primary', className)}
    >
      {RAYS.map((deg, i) => (
        <rect
          key={deg}
          x="11"
          y={i % 2 === 0 ? 1.5 : 3.5}
          width="2"
          height={i % 2 === 0 ? 10.5 : 8.5}
          rx="1"
          fill="currentColor"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  )
}
