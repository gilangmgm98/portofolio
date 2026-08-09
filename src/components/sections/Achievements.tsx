'use client'

import { useRef } from 'react'
import { achievements } from '@/data/achievements'
import AchievementStat from '@/components/ui/AchievementStat'

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="portfolio-section w-full min-h-screen md:h-screen flex flex-col items-center justify-center bg-cosmos-bg px-6 md:px-16 py-20 md:py-0">
      <div className="max-w-5xl w-full">
        <div className="mb-16 text-center">
          <p className="text-cosmos-primary text-xs tracking-[0.4em] uppercase font-mono mb-2">06 / Achievements</p>
          <h2 className="text-4xl md:text-5xl font-black text-cosmos-text">By The Numbers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {achievements.map((a) => (
            <AchievementStat key={a.label} {...a} triggerRef={sectionRef} />
          ))}
        </div>
      </div>
    </section>
  )
}
