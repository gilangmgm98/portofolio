'use client'

import { useEffect, useRef, useState } from 'react'
import { registerGSAP, createMatchMedia } from '@/lib/gsap'
import Navbar from '@/components/ui/Navbar'
import DotNav from '@/components/ui/DotNav'

interface SnapContainerProps {
  children: React.ReactNode
  sectionCount: number
}

export default function SnapContainer({ children, sectionCount }: SnapContainerProps) {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
  }, [])

  useEffect(() => {
    const mm = createMatchMedia()

    mm.add('(min-width: 768px)', () => {
      const sections = document.querySelectorAll('.portfolio-section')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(sections).indexOf(entry.target as Element)
              if (index !== -1) setActiveSection(index)
            }
          })
        },
        { threshold: 0.5 }
      )
      sections.forEach((s) => observer.observe(s))
      return () => observer.disconnect()
    })

    return () => mm.revert()
  }, [])

  const navigateToSection = (index: number) => {
    const sections = document.querySelectorAll('.portfolio-section')
    sections[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar activeSection={activeSection} />
      <DotNav total={sectionCount} active={activeSection} onNavigate={navigateToSection} />
      <div
        ref={containerRef}
        className="snap-container md:overflow-y-scroll md:snap-y md:snap-mandatory h-screen"
      >
        {children}
      </div>
    </>
  )
}
