'use client'

import { useRef } from 'react'
import type { ElementType } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap'

interface ScrubTextProps {
  as?: 'p' | 'div'
  className?: string
  children: React.ReactNode
}

// Words light up one by one as you scroll through the text. The markup is plain, fully visible text
// (nothing hidden in the HTML); JS only dims the words after hydration, and only when motion is allowed.
export default function ScrubText({ as = 'p', className, children }: ScrubTextProps) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const el = ref.current
      if (!el) return
      let split: ReturnType<typeof SplitText.create>
      try {
        split = SplitText.create(el, {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.22 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
              }
            ),
        })
      } catch {
        return // text stays fully visible
      }
      return () => split.revert()
    })
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
