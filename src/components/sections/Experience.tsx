'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { experiences } from '@/data/experience'
import TimelineItem from '@/components/ui/TimelineItem'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/motion/Reveal'

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] })

  return (
    <section className="portfolio-section flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-16">
      <div className="w-full max-w-5xl">
        <div className="mb-12">
          <SectionHeading label="04 / Experience" title="Work History" />
        </div>
        <div ref={listRef} className="relative">
          {/* scroll-linked 1:1 (no time-based animation); full line when reduced motion */}
          <m.div
            aria-hidden="true"
            className="absolute left-[calc(50%-0.5px)] top-0 hidden h-full w-px bg-cosmos-primary/50 md:block"
            style={{ scaleY: reduce ? 1 : scrollYProgress, originY: 0 }}
          />
          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.period}`}>
                <TimelineItem experience={exp} position={i % 2 === 0 ? 'right' : 'left'} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
