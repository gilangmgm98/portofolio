'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, MOTION_OK, FINE_POINTER } from '@/lib/gsap'
import { setLenis } from '@/lib/scroll'

// Smooth scroll for mouse/trackpad only. Touch devices and Reduce Motion keep native scrolling.
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const lenis = new Lenis({ autoRaf: false, smoothWheel: true, syncTouch: false, lerp: 0.1 })
      setLenis(lenis)
      const off = lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      return () => {
        off()
        gsap.ticker.remove(tick)
        lenis.destroy()
        setLenis(null)
      }
    })
    return () => mm.revert()
  }, [])

  return <>{children}</>
}
