'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { skills } from '@/data/skills'
import SkillBadge from '@/components/ui/SkillBadge'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const badges = gridRef.current?.querySelectorAll('.skill-badge-wrapper')
      if (badges) {
        gsap.from(badges, {
          opacity: 0, scale: 0.5, duration: 0.6, stagger: { amount: 1, from: 'center' },
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="portfolio-section w-full h-screen flex flex-col items-center justify-center bg-cosmos-bg px-6 md:px-16">
      <div className="max-w-5xl w-full">
        <div className="mb-10">
          <p className="text-cosmos-primary text-xs tracking-[0.4em] uppercase font-mono mb-2">03 / Skills</p>
          <h2 className="text-4xl md:text-5xl font-black text-cosmos-text">Tech Stack</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-badge-wrapper">
              <SkillBadge {...skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
