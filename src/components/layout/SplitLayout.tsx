'use client'

import { useEffect, useState } from 'react'
import { profile, sections } from '@/data/profile'
import ScrollLink from '@/components/ui/ScrollLink'

export default function SplitLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>(sections[0].id)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    // a thin band through the middle of the viewport: the section crossing it is "active"
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="px-6 md:px-14 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <aside className="pt-16 lg:sticky lg:top-16 lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-between lg:py-12">
        <div>
          <p
            data-reveal="fade"
            className="font-display text-5xl font-bold leading-heading tracking-heading text-ink lg:text-6xl"
          >
            {profile.shortName}
          </p>
          <p data-reveal="fade" className="mt-4 font-display text-xl font-semibold text-grad">
            {profile.role}
          </p>
          <p data-reveal="fade" className="mt-3 max-w-xs text-sm leading-body text-ink/75">
            {profile.tagline}
          </p>
          <nav aria-label="Sections" className="mt-14 hidden lg:block">
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <ScrollLink
                    id={s.id}
                    aria-current={active === s.id ? 'true' : undefined}
                    className="nav-item flex items-center gap-4 text-[12.5px] font-bold uppercase tracking-[0.16em]"
                  >
                    {s.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 hidden space-y-1 text-sm text-ink/75 lg:block">
          <a href={`mailto:${profile.email}`} data-cursor className="transition-colors duration-150 hover:text-ink">
            {profile.email}
          </a>
          <p>
            {profile.city}, {profile.country}
          </p>
        </div>
      </aside>
      <div className="min-w-0 pb-24">{children}</div>
    </div>
  )
}
