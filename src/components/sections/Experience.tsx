'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { experiences } from '@/data/experience'
import TimelineItem from '@/components/ui/TimelineItem'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0, transformOrigin: 'top center', duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      const cards = itemsRef.current?.querySelectorAll('.timeline-card')
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 40, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="portfolio-section w-full min-h-screen flex flex-col items-center justify-center bg-cosmos-bg px-6 md:px-16 py-16">
      <div className="max-w-5xl w-full">
        <div className="mb-10">
          <p className="text-cosmos-primary text-xs tracking-[0.4em] uppercase font-mono mb-2">04 / Experience</p>
          <h2 className="text-4xl md:text-5xl font-black text-cosmos-text">Work History</h2>
        </div>
        <div className="relative">
          <div ref={lineRef} className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-cosmos-primary via-cosmos-accent to-transparent" style={{ height: '100%', top: 0 }} />
          <div ref={itemsRef} className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <div key={`${exp.company}-${exp.period}`} className="timeline-card">
                <TimelineItem experience={exp} position={i % 2 === 0 ? 'right' : 'left'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
