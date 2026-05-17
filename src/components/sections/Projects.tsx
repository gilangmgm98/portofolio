'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card-wrapper')
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="portfolio-section w-full min-h-screen flex flex-col items-center justify-center bg-cosmos-bg px-6 md:px-16 py-16">
      <div className="max-w-5xl w-full">
        <div className="mb-10">
          <p className="text-cosmos-primary text-xs tracking-[0.4em] uppercase font-mono mb-2">05 / Projects</p>
          <h2 className="text-4xl md:text-5xl font-black text-cosmos-text">Selected Work</h2>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project) => (
            <div key={project.title} className="project-card-wrapper h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
