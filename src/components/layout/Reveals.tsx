'use client'

import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap'

// One global scroll reveal for every [data-reveal] element (mask titles are handled by MaskTitle).
export default function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="mask"])')
      // Take over everything now so the CSS failsafe can't un-hide below-the-fold items early.
      targets.forEach((el) => el.setAttribute('data-ready', ''))
      ScrollTrigger.batch(targets, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06, overwrite: true }),
      })
      const refresh = () => ScrollTrigger.refresh()
      document.fonts?.ready.then(refresh)
      window.addEventListener('load', refresh)
      return () => window.removeEventListener('load', refresh)
    })
  }, [])

  return null
}
