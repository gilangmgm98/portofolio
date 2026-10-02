'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollLink from '@/components/ui/ScrollLink'
import Magnetic from '@/components/ui/Magnetic'
import StatusClock from './StatusClock'
import MenuOverlay from './MenuOverlay'

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  const close = useCallback(() => setOpen(false), [])

  // Transparent over the hero, solid once the page has scrolled. A data attribute (not React state)
  // so the markup is identical for everyone and nothing re-renders on scroll.
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const update = () => bar.toggleAttribute('data-scrolled', window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <header ref={barRef} className="topbar fixed inset-x-0 top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6 md:px-14">
          <ScrollLink id="top" aria-label="Back to top" className="font-display text-xl font-bold tracking-heading">
            GM<sup className="text-xs">®</sup>
          </ScrollLink>
          <StatusClock data-reveal="fade" className="hidden items-center gap-6 text-sm text-ink/75 md:flex" />
          <Magnetic>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-overlay"
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 text-sm font-semibold"
            >
              Menu
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span className="h-px w-6 bg-ink" />
                <span className="h-px w-6 bg-ink" />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>
      <MenuOverlay open={open} onClose={close} />
    </>
  )
}
