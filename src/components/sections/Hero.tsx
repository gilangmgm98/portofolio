'use client'

import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'
import { scrollToSection } from '@/lib/scroll'

const TAGS = { span: m.span, p: m.p, div: m.div } as const

function Line({ as = 'div', delay, reduce, className, children }: {
  as?: keyof typeof TAGS
  delay: number
  reduce: boolean
  className?: string
  children: React.ReactNode
}) {
  const Tag = TAGS[as]
  // "materialize": blur + rise, only when motion is allowed
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(16px)', filter: 'blur(8px)' }
  const shown = reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }
  return (
    <Tag
      className={`block ${className ?? ''}`}
      initial={hidden}
      animate={shown}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE_OUT, delay: reduce ? 0 : delay }}
    >
      {children}
    </Tag>
  )
}

export default function Hero() {
  const reduce = !!useReducedMotion()
  const { scrollY } = useScroll()
  const hintOpacity = useTransform(scrollY, [0, 120], [1, 0])

  return (
    <section className="portfolio-section relative flex min-h-screen w-full items-center justify-center px-6">
      <div className="relative z-10 text-center">
        <Line as="p" delay={0.1} reduce={reduce} className="mb-6 text-sm font-medium text-cosmos-muted">
          Backend Developer
        </Line>
        <h1 className="mb-2">
          <Line as="span" delay={0.2} reduce={reduce} className="mb-1 text-[clamp(1rem,4vw,2.5rem)] font-semibold tracking-heading text-cosmos-muted">
            Muhammad
          </Line>
          <Line as="span" delay={0.3} reduce={reduce} className="text-[clamp(3rem,12vw,10rem)] font-bold leading-display tracking-display text-cosmos-text">
            GILANG
          </Line>
          <Line as="span" delay={0.4} reduce={reduce} className="text-[clamp(2rem,8.5vw,10rem)] font-bold leading-display tracking-display text-cosmos-primary">
            MURDIYANTO
          </Line>
        </h1>
        <Line as="p" delay={0.55} reduce={reduce} className="mt-6 font-mono text-sm text-cosmos-muted">
          TypeScript · NestJS · Node.js
        </Line>
        <Line delay={0.65} reduce={reduce} className="mt-10">
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => scrollToSection(1)} className="btn-primary">View Work</button>
            <button onClick={() => scrollToSection(6)} className="btn-secondary">Contact</button>
          </div>
        </Line>
      </div>
      <m.div aria-hidden="true" style={{ opacity: hintOpacity }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-xs text-cosmos-muted">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-cosmos-primary to-transparent" />
      </m.div>
    </section>
  )
}
