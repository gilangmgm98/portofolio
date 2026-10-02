import fs from 'fs'
import path from 'path'
import { render } from '@testing-library/react'
import Aurora from '@/components/layout/Aurora'

const css = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8')

// Perf regression: a full-screen <canvas> redrawn every frame cost ~100x more compositor commit time
// than this (measured with a browser trace), making scrolling janky. The aurora is now three
// CSS-only glows animated with `transform` (composited on the GPU, no JS, no per-frame raster).
describe('Aurora', () => {
  it('renders three decorative CSS glows and no canvas', () => {
    const { container } = render(<Aurora />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root).toHaveClass('pointer-events-none', 'fixed')
    expect(root.querySelectorAll('[data-aurora-glow]')).toHaveLength(3)
    expect(root.querySelector('canvas')).toBeNull()
    expect(root.querySelector('[style]')).toBeNull()
  })
})

describe('aurora CSS', () => {
  it('animates only with transform keyframes', () => {
    expect(css).toMatch(/@keyframes aurora-drift-a\s*\{[^}]*transform:/)
    expect(css).toMatch(/\.aurora-glow\s*\{[^}]*will-change:\s*transform/)
    expect(css).not.toMatch(/aurora-canvas/)
  })
  it('is static on small screens and under Reduce Motion', () => {
    expect(css).toMatch(/@media \(max-width: 767px\), \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.aurora-glow\s*\{[^}]*animation:\s*none/)
  })
})
