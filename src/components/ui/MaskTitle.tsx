'use client'

import { useRef } from 'react'
import type { ElementType } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap'

interface MaskTitleProps {
  as?: 'h1' | 'h2' | 'p' | 'div'
  trigger?: 'load' | 'scroll'
  /** extra delay (s) on top of the base one; useful to sequence a paragraph after its heading */
  delay?: number
  /** stagger (s) between lines; headings use the default, paragraphs read better with less */
  stagger?: number
  /** parallax speed (see ScrollMotion) and where it starts */
  parallax?: number
  parallaxStart?: string
  /** lean with scroll velocity (see ScrollMotion) */
  skew?: boolean
  className?: string
  children: React.ReactNode
}

// Text whose lines slide up from behind a mask. The markup never depends on the motion
// preference: CSS hides it only under `.js`, and JS takes over (data-ready) only when motion is allowed.
export default function MaskTitle({
  as = 'h2',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.08,
  parallax,
  parallaxStart,
  skew,
  className,
  children,
}: MaskTitleProps) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const el = ref.current
      if (!el) return
      el.setAttribute('data-ready', '')
      let split: ReturnType<typeof SplitText.create>
      try {
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { opacity: 1 })
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: 'expo.out',
              stagger,
              delay: (trigger === 'load' ? 0.15 : 0) + delay,
              scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
            })
          },
        })
      } catch {
        // could not take over: give the text back to the CSS failsafe instead of leaving it hidden
        el.removeAttribute('data-ready')
        return
      }
      return () => split.revert()
    })
  }, [trigger, delay, stagger])

  return (
    <Tag
      ref={ref}
      data-reveal="mask"
      data-parallax={parallax}
      data-parallax-start={parallaxStart}
      data-skew={skew ? '' : undefined}
      className={className}
    >
      {children}
    </Tag>
  )
}
