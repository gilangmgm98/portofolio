'use client'

import { useCallback, useState } from 'react'
import { profile } from '@/data/profile'
import { useJakartaTime } from '@/lib/useJakartaTime'
import ScrollLink from '@/components/ui/ScrollLink'
import Magnetic from '@/components/ui/Magnetic'
import MenuOverlay from './MenuOverlay'

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const time = useJakartaTime()
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-night/90">
        <div className="flex h-16 items-center justify-between px-6 md:px-14">
          <ScrollLink id="top" aria-label="Back to top" className="font-display text-xl font-bold tracking-heading">
            GM<sup className="text-xs">®</sup>
          </ScrollLink>
          <p data-reveal="fade" className="hidden items-center gap-6 text-sm text-ink/75 md:flex">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {profile.status}
            </span>
            <span>
              {profile.city} <time className="inline-block min-w-[3.2ch] tabular-nums">{time}</time>
            </span>
          </p>
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
