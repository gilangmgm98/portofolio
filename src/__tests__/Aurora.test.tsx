import fs from 'fs'
import path from 'path'
import { render } from '@testing-library/react'
import Aurora from '@/components/layout/Aurora'
import { startAuroraGL } from '@/components/layout/aurora-gl'
import { matchMediaCalls } from '../../__mocks__/gsap'

jest.mock('@/components/layout/aurora-gl', () => ({ startAuroraGL: jest.fn() }))

const css = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8')

// Perf regression: a full-screen <canvas> redrawn every frame cost ~100x more compositor commit time
// than this (measured with a browser trace), making scrolling janky. The aurora is now three
// CSS-only glows animated with `transform` (composited on the GPU, no JS, no per-frame raster).
describe('Aurora', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
  })

  it('always renders the three CSS glows (fallback) plus a WebGL canvas, decorative and without inline styles', () => {
    const { container } = render(<Aurora />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root).toHaveClass('pointer-events-none', 'fixed')
    expect(root.querySelectorAll('[data-aurora-glow]')).toHaveLength(3)
    expect(root.querySelectorAll('canvas[data-aurora-gl]')).toHaveLength(1)
    expect(root.querySelector('[style]')).toBeNull()
  })

  it('starts the shader only for no-preference motion at md+, and hands over from the CSS glows', () => {
    ;(startAuroraGL as jest.Mock).mockReturnValue(jest.fn())
    const { container } = render(<Aurora />)
    const entry = matchMediaCalls.find((c) => /no-preference/.test(c.query) && /min-width: 768px/.test(c.query))
    expect(entry).toBeDefined()
    const root = container.firstChild as HTMLElement
    const canvas = root.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).not.toHaveAttribute('data-on')
    const cleanup = entry!.fn() as () => void
    expect(startAuroraGL).toHaveBeenCalledWith(canvas)
    expect(canvas).toHaveAttribute('data-on', 'true')
    expect(root).toHaveAttribute('data-gl', 'true')
    cleanup()
    expect(canvas).not.toHaveAttribute('data-on')
    expect(root).not.toHaveAttribute('data-gl')
  })

  it('keeps the CSS glows when WebGL cannot start', () => {
    ;(startAuroraGL as jest.Mock).mockReturnValue(null)
    const { container } = render(<Aurora />)
    matchMediaCalls[0].fn()
    expect(container.firstChild).not.toHaveAttribute('data-gl')
  })
})

describe('aurora CSS', () => {
  it('fades the canvas in and the CSS glows out once the shader runs', () => {
    expect(css).toMatch(/\.aurora-gl\[data-on\]\s*\{[^}]*opacity:\s*1/)
    expect(css).toMatch(/\.aurora\[data-gl\] \.aurora-glow\s*\{[^}]*opacity:\s*0/)
  })
  it('animates only with transform keyframes', () => {
    expect(css).toMatch(/@keyframes aurora-drift-a\s*\{[^}]*transform:/)
    expect(css).toMatch(/\.aurora-glow\s*\{[^}]*will-change:\s*transform/)
    expect(css).not.toMatch(/aurora-canvas/)
  })
  it('is static on small screens and under Reduce Motion', () => {
    expect(css).toMatch(/@media \(max-width: 767px\), \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.aurora-glow\s*\{[^}]*animation:\s*none/)
  })
})
