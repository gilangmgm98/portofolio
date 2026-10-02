'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { menuLinks, profile } from '@/data/profile'
import { getLenis } from '@/lib/scroll'
import ScrollLink from '@/components/ui/ScrollLink'
import Magnetic from '@/components/ui/Magnetic'
import StatusClock from './StatusClock'

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const root = ref.current
    if (!root) return
    const content = document.getElementById('site-content')
    const previous = document.activeElement as HTMLElement | null

    content?.setAttribute('inert', '')
    document.documentElement.setAttribute('data-menu-open', '')
    getLenis()?.stop()
    root.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      // focus escaped (e.g. a click on the backdrop moved it to <body>): pull it back in
      if (!root.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
        return
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      content?.removeAttribute('inert')
      document.documentElement.removeAttribute('data-menu-open')
      getLenis()?.start()
      previous?.focus()
    }
  }, [open, onClose])

  return (
    <div
      id="menu-overlay"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      data-open={open ? 'true' : 'false'}
      className="menu-overlay flex flex-col overflow-y-auto"
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-6 md:px-14">
        <span className="font-display text-xl font-bold tracking-heading">
          GM<sup className="text-xs">®</sup>
        </span>
        <StatusClock className="hidden items-center gap-6 text-sm text-ink/75 md:flex" />
        <Magnetic>
          <button type="button" onClick={onClose} className="flex items-center gap-3 text-sm font-semibold">
            Close
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>
        </Magnetic>
      </div>

      <nav aria-label="Sections" className="flex flex-1 items-center px-6 md:px-14">
        <ul className="w-full">
          {menuLinks.map((link, i) => (
            <li key={link.id} style={{ '--i': i } as CSSProperties} className="menu-link border-b border-hairline">
              <ScrollLink id={link.id} onNavigate={onClose} className="menu-item flex items-end gap-6 py-3 md:gap-10">
                <span
                  aria-hidden="true"
                  className="mb-3 w-8 shrink-0 font-sans text-sm font-medium tabular-nums tracking-normal text-muted md:mb-5"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  data-text={link.label}
                  className="grad-wipe font-display text-[clamp(2.5rem,min(9vw,11svh),6rem)] font-bold leading-[1.05] tracking-display"
                >
                  {link.label}
                </span>
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex shrink-0 flex-wrap gap-x-10 gap-y-2 px-6 py-6 text-sm text-muted md:px-14">
        <a href={`mailto:${profile.email}`} data-cursor className="transition-colors duration-150 hover:text-ink">
          {profile.email}
        </a>
        <span>
          {profile.city}, {profile.country}
        </span>
      </div>
    </div>
  )
}
