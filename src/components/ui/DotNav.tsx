'use client'

import { m, useReducedMotion } from 'motion/react'
import { SPRING } from '@/lib/motion'

interface DotNavProps {
  total: number
  active: number
  onNavigate: (index: number) => void
}

export default function DotNav({ total, active, onNavigate }: DotNavProps) {
  const reduce = !!useReducedMotion()
  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = active === i
        return (
          <m.button
            key={i}
            initial={false}
            onClick={() => onNavigate(i)}
            aria-label={`Go to section ${i + 1}`}
            aria-current={isActive ? 'true' : undefined}
            animate={{ transform: isActive && !reduce ? 'scale(1.5)' : 'scale(1)' }}
            transition={reduce ? { duration: 0 } : SPRING}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              isActive ? 'bg-cosmos-primary' : 'bg-cosmos-text/25 hover:bg-cosmos-text/60'
            }`}
          />
        )
      })}
    </div>
  )
}
