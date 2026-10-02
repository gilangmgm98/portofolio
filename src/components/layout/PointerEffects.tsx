'use client'

import { gsap, useGSAP, MOTION_OK, FINE_POINTER } from '@/lib/gsap'

const STRENGTH = 0.35 // how far the element follows the pointer (fraction of the offset from its centre)
const MAX = 14 // px, hard clamp so it never flies away

const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v))

// Mouse-only micro-interactions: [data-magnetic] elements are pulled toward the pointer with an
// elastic spring; [data-glow] elements expose the pointer position as --mx/--my for a CSS glow.
export default function PointerEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const cleanups: Array<() => void> = []

      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.35)' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.35)' })
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          // remove the current pull so the centre is the element's rest position (no feedback loop)
          const cx = r.left + r.width / 2 - Number(gsap.getProperty(el, 'x'))
          const cy = r.top + r.height / 2 - Number(gsap.getProperty(el, 'y'))
          xTo(clamp((e.clientX - cx) * STRENGTH))
          yTo(clamp((e.clientY - cy) * STRENGTH))
        }
        const leave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
          gsap.set(el, { clearProps: 'x,y' })
        })
      })

      document.querySelectorAll<HTMLElement>('[data-glow]').forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          el.style.setProperty('--mx', `${e.clientX - r.left}px`)
          el.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
        el.addEventListener('pointermove', move)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.style.removeProperty('--mx')
          el.style.removeProperty('--my')
        })
      })

      return () => cleanups.forEach((c) => c())
    })
  }, [])

  return null
}
