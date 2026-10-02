'use client'

import type { ComponentProps } from 'react'
import { scrollToId } from '@/lib/scroll'

interface ScrollLinkProps extends Omit<ComponentProps<'a'>, 'href' | 'onClick'> {
  id: string
  onNavigate?: () => void
}

export default function ScrollLink({ id, onNavigate, children, ...rest }: ScrollLinkProps) {
  return (
    <a
      href={`#${id}`}
      data-cursor
      {...rest}
      onClick={(e) => {
        e.preventDefault()
        onNavigate?.()
        // next frame: lets a closing overlay restart Lenis / unlock scrolling first
        requestAnimationFrame(() => scrollToId(id))
      }}
    >
      {children}
    </a>
  )
}
