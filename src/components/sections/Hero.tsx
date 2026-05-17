'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap, SplitText } from '@/lib/gsap'

const StarField = dynamic(() => import('@/components/three/StarField'), { ssr: false })

export default function Hero() {
  const labelRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.from(labelRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      if (line1Ref.current && line2Ref.current && line3Ref.current) {
        const split1 = new SplitText(line1Ref.current, { type: 'chars' })
        const split2 = new SplitText(line2Ref.current, { type: 'chars' })
        const split3 = new SplitText(line3Ref.current, { type: 'chars' })
        tl.from(split1.chars, { opacity: 0, y: 40, duration: 0.6, stagger: 0.03, ease: 'power3.out' }, '-=0.3')
        tl.from(split2.chars, { opacity: 0, y: 60, duration: 0.8, stagger: 0.04, ease: 'power3.out' }, '-=0.4')
        tl.from(split3.chars, { opacity: 0, y: 60, duration: 0.8, stagger: 0.04, ease: 'power3.out' }, '-=0.6')
      }
      tl.from(taglineRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      tl.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      tl.from(scrollRef.current, { opacity: 0, duration: 0.8 }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.portfolio-section')
    sections[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="portfolio-section relative w-full h-screen flex items-center justify-center overflow-hidden bg-cosmos-bg">
      <StarField particleCount={2000} />
      <div className="relative z-10 text-center px-6">
        <p ref={labelRef} className="text-cosmos-muted text-xs tracking-[0.4em] mb-6 uppercase font-mono">
          BACKEND DEVELOPER
        </p>
        <h1 className="leading-none mb-2">
          <span ref={line1Ref} className="block text-[clamp(1.5rem,5vw,4rem)] font-black text-cosmos-accent tracking-[0.15em] uppercase">
            Muhammad
          </span>
          <span ref={line2Ref} className="block text-[clamp(4rem,12vw,10rem)] font-black text-cosmos-text leading-[0.9]">
            GILANG
          </span>
          <span ref={line3Ref} className="block text-[clamp(4rem,12vw,10rem)] font-black text-cosmos-primary leading-[0.9]">
            MURDIYANTO
          </span>
        </h1>
        <p ref={taglineRef} className="text-cosmos-muted text-sm tracking-widest mt-6 font-mono">
          TypeScript · NestJS · Node.js
        </p>
        <div ref={ctaRef} className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollToSection(1)}
            className="px-8 py-3 bg-cosmos-primary text-white text-sm tracking-widest uppercase font-semibold rounded hover:bg-cosmos-primary/80 transition-colors duration-200 glow-primary"
          >
            View Work
          </button>
          <button
            onClick={() => scrollToSection(6)}
            className="px-8 py-3 border border-cosmos-border text-cosmos-muted text-sm tracking-widest uppercase font-semibold rounded hover:border-cosmos-primary hover:text-cosmos-primary transition-colors duration-200"
          >
            Contact
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-cosmos-muted text-xs tracking-widest font-mono">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-cosmos-primary to-transparent animate-bounce" />
      </div>
    </section>
  )
}
