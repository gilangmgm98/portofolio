'use client'

interface DotNavProps {
  total: number
  active: number
  onNavigate: (index: number) => void
}

export default function DotNav({ total, active, onNavigate }: DotNavProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          aria-label={`Go to section ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            active === i
              ? 'bg-cosmos-primary scale-125 glow-primary'
              : 'bg-cosmos-border hover:bg-cosmos-muted'
          }`}
        />
      ))}
    </div>
  )
}
