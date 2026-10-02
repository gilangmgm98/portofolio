'use client'

import { useRef } from 'react'
import { achievements } from '@/data/achievements'
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, DESKTOP } from '@/lib/gsap'
import Section from '@/components/ui/Section'
import ImpactCard from './ImpactCard'

export default function Impact() {
  const deck = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Count-up: server markup holds the final value; with motion allowed we reset to 0 and count once.
    mm.add(MOTION_OK, () => {
      const root = deck.current
      if (!root) return
      root.querySelectorAll<HTMLElement>('[data-count]').forEach((num) => {
        const value = Number(num.dataset.count)
        const card = num.closest<HTMLElement>('[data-impact-card]') ?? num
        const proxy = { v: 0 }
        num.textContent = '0'
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              v: value,
              duration: 1.2,
              ease: 'power3.out',
              onUpdate: () => {
                num.textContent = String(Math.round(proxy.v))
              },
            })
          },
        })
      })
    })

    // Deck: the previous card shrinks and darkens (via its opaque scrim) while the next one slides over it (lg+ only).
    mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
      const root = deck.current
      if (!root) return
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-impact-card]'))
      cards.slice(0, -1).forEach((card, i) => {
        const scrollTrigger = { trigger: cards[i + 1], start: 'top 75%', end: 'top 25%', scrub: true }
        gsap.to(card, { scale: 0.94, transformOrigin: 'top center', ease: 'none', scrollTrigger })
        const scrim = card.querySelector('[data-impact-scrim]')
        if (scrim) gsap.to(scrim, { opacity: 0.55, ease: 'none', scrollTrigger })
      })
    })
  }, [])

  return (
    <Section id="impact" label="Impact">
      <div ref={deck}>
        {achievements.map((stat, i) => (
          <ImpactCard key={stat.label} stat={stat} index={i} total={achievements.length} />
        ))}
      </div>
    </Section>
  )
}
