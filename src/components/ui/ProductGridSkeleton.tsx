export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/[0.06]"
        >
          <div className="aspect-[3/4] bg-cream" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded-lg bg-ink/[0.06]" />
            <div className="h-3 w-full rounded-lg bg-ink/[0.04]" />
            <div className="h-3 w-1/3 rounded-lg bg-ink/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  )
}
