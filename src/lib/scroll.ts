export function scrollToSection(index: number) {
  const sections = document.querySelectorAll('.portfolio-section')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  sections[index]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
