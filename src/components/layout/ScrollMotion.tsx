'use client'

import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap'

const MAX_SKEW = 2.5 // degrees
const SKEW_PER_VELOCITY = 1 / 400 // px/s -> degrees

const clampSkew = (v: number) => Math.max(-MAX_SKEW, Math.min(MAX_SKEW, v)) || 0

// Scroll-linked motion, registered only when motion is allowed:
//  - [data-parallax="n"]: drifts n * 100% of its own height across its section (negative = faster than the page)
//  - [data-skew]: leans with scroll velocity and settles back to 0 when scrolling stops
export default function ScrollMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.parallax)
        if (!Number.isFinite(speed)) return
        gsap.fromTo(
          el,
          { yPercent: 0 },
          {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: el.dataset.parallaxStart ?? 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      })

      document.querySelectorAll<HTMLElement>('[data-skew]').forEach((el) => {
        const skewTo = gsap.quickTo(el, 'skewY', { duration: 0.6, ease: 'power3' })
        ScrollTrigger.create({
          onUpdate: (self) => skewTo(clampSkew(self.getVelocity() * -SKEW_PER_VELOCITY)),
        })
      })
    })
  }, [])

  return null
}
