'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { menuLinks, profile } from '@/data/profile'
import { getLenis } from '@/lib/scroll'
import ScrollLink from '@/components/ui/ScrollLink'

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
      <div className="flex items-center justify-between px-6 py-5 md:px-14">
        <span className="font-display text-xl font-bold tracking-heading">
          GM<sup className="text-xs">®</sup>
        </span>
        <button type="button" onClick={onClose} className="btn-ghost !px-4 !py-2 text-sm">
          Close
        </button>
      </div>
      <nav aria-label="Sections" className="flex flex-1 items-center px-6 md:px-14">
        <ul className="w-full">
          {menuLinks.map((link, i) => (
            <li key={link.id} style={{ '--i': i } as CSSProperties} className="menu-link border-b border-hairline">
              <ScrollLink
                id={link.id}
                onNavigate={onClose}
                className="flex items-baseline gap-5 py-4 font-display text-[clamp(2.5rem,min(9vw,11svh),6rem)] font-bold leading-none tracking-display"
              >
                <span aria-hidden="true" className="text-sm font-medium text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>
      <p className="px-6 py-5 text-sm text-muted md:px-14">{profile.email}</p>
    </div>
  )
}
