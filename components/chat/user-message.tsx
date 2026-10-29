export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex max-w-[85%] items-start gap-3 rounded-2xl bg-secondary px-4 py-3 text-secondary-foreground">
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background"
        >
          JM
        </span>
        <p className="text-[15px] leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
