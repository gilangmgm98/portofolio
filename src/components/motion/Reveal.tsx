'use client'

import { m, useReducedMotion } from 'motion/react'
import { REVEAL_VIEWPORT, groupVariants, itemVariants, revealStates, transitionFor } from '@/lib/motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = !!useReducedMotion()
  const { hidden, shown } = revealStates()
  return (
    <m.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={REVEAL_VIEWPORT}
      transition={{ ...transitionFor(reduce), delay: reduce ? 0 : delay }}
    >
      {children}
    </m.div>
  )
}

export function RevealGroup({ children, className }: Omit<RevealProps, 'delay'>) {
  const reduce = !!useReducedMotion()
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
      variants={groupVariants(reduce)}
    >
      {children}
    </m.div>
  )
}

export function RevealItem({ children, className }: Omit<RevealProps, 'delay'>) {
  const reduce = !!useReducedMotion()
  return (
    <m.div className={className} variants={itemVariants(reduce)}>
      {children}
    </m.div>
  )
}
