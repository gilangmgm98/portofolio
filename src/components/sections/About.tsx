'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gilangmgm/' },
  { label: 'GitHub', href: 'https://github.com/gilangmgm98' },
  { label: 'Email', href: 'mailto:gilangmgm98@gmail.com' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -80, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(rightRef.current, {
        x: 80, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="portfolio-section w-full h-screen flex items-center justify-center bg-cosmos-bg px-6 md:px-16">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div ref={leftRef} className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-cosmos opacity-20 blur-2xl" />
            <div className="relative w-full h-full rounded-full border-2 border-cosmos-primary glow-primary overflow-hidden bg-cosmos-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/foto.png"
                alt="Muhammad Gilang Murdiyanto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div ref={rightRef} className="space-y-6">
          <div>
            <p className="text-cosmos-primary text-xs tracking-[0.4em] uppercase font-mono mb-2">02 / About</p>
            <h2 className="text-4xl md:text-5xl font-black text-cosmos-text">Who I Am</h2>
          </div>
          <p className="text-cosmos-muted leading-relaxed">
            Backend developer with <span className="text-cosmos-text font-semibold">3+ years</span> of experience
            building scalable REST APIs, high-performance backend systems, and AI/data-driven products.
            Passionate about clean architecture, performance tuning, and delivering reliable production services.
          </p>
          <p className="text-cosmos-muted leading-relaxed">
            Currently owning backend services for <span className="text-cosmos-text font-semibold">MyTelkomsel</span> at CODE.ID —
            focusing on API design, performance optimization, and maintainability.
          </p>
          <div className="flex gap-4 pt-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-cosmos-muted hover:text-cosmos-primary transition-colors duration-200 text-sm tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
