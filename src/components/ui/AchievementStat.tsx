'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import type { Achievement } from '@/types'

interface AchievementStatProps extends Achievement {
  triggerRef: React.RefObject<HTMLElement | null>
}

export default function AchievementStat({ value, suffix, label, description, triggerRef }: AchievementStatProps) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString()
      },
      scrollTrigger: { trigger: triggerRef.current, start: 'top 80%' },
    })
  }, [value, triggerRef])

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-end gap-1 mb-2">
        <span ref={numRef} className="text-[clamp(3rem,8vw,6rem)] font-black text-gradient-cosmos leading-none">
          0
        </span>
        <span className="text-[clamp(2rem,5vw,4rem)] font-black text-cosmos-primary leading-none pb-1">
          {suffix}
        </span>
      </div>
      <p className="text-cosmos-text font-semibold text-sm md:text-base">{label}</p>
      {description && <p className="text-cosmos-muted text-xs mt-1 max-w-[160px]">{description}</p>}
    </div>
  )
}
