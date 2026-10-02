'use client'

import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'
import type { Achievement } from '@/types'

export default function AchievementStat({ value, suffix, label, description }: Achievement) {
  const rootRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(rootRef, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  // The server-rendered markup holds the FINAL value (readable without JS / before hydration).
  // Once hydrated, and only when motion is allowed, we reset to 0 and count up when scrolled into view.
  useEffect(() => {
    const el = numRef.current
    if (!el) return
    if (reduce) {
      el.textContent = String(value)
      return
    }
    if (!inView) {
      el.textContent = '0'
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE_OUT,
      onUpdate: (v) => { el.textContent = String(Math.round(v)) },
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <div ref={rootRef} className="flex flex-col items-center text-center">
      <div className="mb-2 flex items-end gap-1" aria-label={`${value}${suffix}`}>
        <span ref={numRef} aria-hidden="true" className="text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-display text-cosmos-text tabular-nums">
          {value}
        </span>
        <span aria-hidden="true" className="pb-1 text-[clamp(2rem,5vw,4rem)] font-bold leading-none text-cosmos-primary">
          {suffix}
        </span>
      </div>
      <p className="text-sm font-semibold text-cosmos-text md:text-base">{label}</p>
      {description && <p className="mt-1 max-w-[160px] text-xs text-cosmos-muted">{description}</p>}
    </div>
  )
}
