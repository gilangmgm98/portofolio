'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, FINE_POINTER } from '@/lib/gsap'

// Decorative custom cursor: mouse only, never with Reduce Motion. The native cursor is hidden
// (html.has-cursor) only after JS is running, so a JS failure never leaves the user cursor-less.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const dotEl = dot.current
      const ringEl = ring.current
      if (!dotEl || !ringEl) return
      document.documentElement.classList.add('has-cursor')
      gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 })
      const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.08, ease: 'power3' })
      const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.08, ease: 'power3' })
      const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.35, ease: 'power3' })
      const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.35, ease: 'power3' })
      const move = (e: MouseEvent) => {
        dotX(e.clientX)
        dotY(e.clientY)
        ringX(e.clientX)
        ringY(e.clientY)
      }
      const over = (e: Event) => {
        const interactive = (e.target as Element | null)?.closest?.('a, button, [data-cursor]')
        ringEl.dataset.hover = interactive ? 'true' : 'false'
      }
      window.addEventListener('pointermove', move)
      document.addEventListener('pointerover', over)
      return () => {
        window.removeEventListener('pointermove', move)
        document.removeEventListener('pointerover', over)
        document.documentElement.classList.remove('has-cursor')
      }
    })
  }, [])

  return (
    <>
      <div ref={ring} aria-hidden="true" className="cursor-ring">
        <span className="cursor-ring-shape" />
      </div>
      <div ref={dot} aria-hidden="true" className="cursor-dot" />
    </>
  )
}
