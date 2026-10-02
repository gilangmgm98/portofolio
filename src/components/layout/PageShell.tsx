'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import DotNav from '@/components/ui/DotNav'
import { scrollToSection } from '@/lib/scroll'

interface PageShellProps {
  children: React.ReactNode
  sectionCount: number
}

export default function PageShell({ children, sectionCount }: PageShellProps) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.portfolio-section'))
    // a zero-height line through the middle of the viewport: the section crossing it is "active"
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = sections.indexOf(entry.target)
          if (index !== -1) setActiveSection(index)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar activeSection={activeSection} />
      <DotNav total={sectionCount} active={activeSection} onNavigate={scrollToSection} />
      <main>{children}</main>
    </>
  )
}
