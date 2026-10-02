import type { Transition, Variants } from 'motion/react'

export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1]
export const SPRING = { type: 'spring', bounce: 0, duration: 0.4 } as const

export const REVEAL_VIEWPORT = { once: true, margin: '0px 0px -15% 0px' } as const
const STAGGER = 0.05

// Initial/final states must NOT depend on the user's reduced-motion preference: the server cannot
// know it, and React does not patch attributes that differ after hydration. Reduced motion only
// changes the *transition* (see transitionFor), so the markup is identical for everyone.
export function revealStates() {
  return {
    hidden: { opacity: 0, transform: 'translateY(24px)' },
    shown: { opacity: 1, transform: 'translateY(0px)' },
  }
}

export function transitionFor(reduce: boolean): Transition {
  return reduce
    ? { default: { duration: 0 }, opacity: { duration: 0.2, ease: EASE_OUT } }
    : { duration: 0.6, ease: EASE_OUT }
}

export function groupVariants(reduce: boolean): Variants {
  return { hidden: {}, shown: { transition: { staggerChildren: reduce ? 0 : STAGGER } } }
}

export function itemVariants(reduce: boolean): Variants {
  const { hidden, shown } = revealStates()
  return { hidden, shown: { ...shown, transition: transitionFor(reduce) } }
}
