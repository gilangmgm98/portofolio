'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap'

interface MaskTitleProps {
  as?: 'h1' | 'h2'
  trigger?: 'load' | 'scroll'
  className?: string
  children: React.ReactNode
}

// Heading whose lines slide up from behind a mask. The markup never depends on the motion
// preference: CSS hides it only under `.js`, and JS takes over (data-ready) only when motion is allowed.
export default function MaskTitle({ as: Tag = 'h2', trigger = 'scroll', className, children }: MaskTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const el = ref.current
      if (!el) return
      el.setAttribute('data-ready', '')
      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(el, { opacity: 1 })
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            delay: trigger === 'load' ? 0.15 : 0,
            scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
          })
        },
      })
      return () => split.revert()
    })
  }, [trigger])

  return (
    <Tag ref={ref} data-reveal="mask" className={className}>
      {children}
    </Tag>
  )
}
