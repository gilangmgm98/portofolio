'use client'

import { m } from 'motion/react'
import { SPRING } from '@/lib/motion'
import { scrollToSection } from '@/lib/scroll'

interface NavbarProps {
  activeSection: number
}

const NAV_LINKS = [
  { label: 'About', index: 1 },
  { label: 'Skills', index: 2 },
  { label: 'Experience', index: 3 },
  { label: 'Projects', index: 4 },
  { label: 'Achievements', index: 5 },
  { label: 'Contact', index: 6 },
]

export default function Navbar({ activeSection }: NavbarProps) {
  return (
    <nav
      aria-label="Primary"
      className={`fixed left-0 right-0 top-0 z-50 transition-opacity duration-300 ${
        activeSection === 0 ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div aria-hidden="true" className="nav-edge absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollToSection(0)}
          className="text-lg font-semibold tracking-heading text-cosmos-text"
        >
          MGM
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeSection === link.index
            return (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.index)}
                aria-current={active ? 'true' : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors duration-150 ${
                  active ? 'text-cosmos-text' : 'text-cosmos-muted hover:text-cosmos-text'
                }`}
              >
                {active && (
                  <m.span
                    layoutId="nav-pill"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-cosmos-text/10"
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
