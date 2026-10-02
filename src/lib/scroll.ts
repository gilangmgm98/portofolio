import type Lenis from 'lenis'

// Legacy (index-based) helper — removed in Task 14 together with the old components.
export function scrollToSection(index: number) {
  const sections = document.querySelectorAll('.portfolio-section')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  sections[index]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset })
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0)
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
