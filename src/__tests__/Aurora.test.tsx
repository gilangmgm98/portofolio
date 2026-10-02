import { render } from '@testing-library/react'
import Aurora from '@/components/layout/Aurora'
import { drawAurora } from '@/components/layout/aurora-draw'
import { matchMediaCalls } from '../../__mocks__/gsap'

function fakeContext() {
  const gradient = { addColorStop: jest.fn() }
  return {
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    createRadialGradient: jest.fn(() => gradient),
    gradient,
    globalCompositeOperation: '',
    fillStyle: '' as unknown,
  }
}

describe('drawAurora', () => {
  it('clears the canvas and paints three additive radial glows', () => {
    const ctx = fakeContext()
    drawAurora(ctx as unknown as CanvasRenderingContext2D, 1000, 600, 1234)
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 1000, 600)
    expect(ctx.globalCompositeOperation).toBe('lighter')
    expect(ctx.createRadialGradient).toHaveBeenCalledTimes(3)
    expect(ctx.fillRect).toHaveBeenCalledTimes(3)
    expect(ctx.gradient.addColorStop).toHaveBeenCalledTimes(6)
  })

  it('moves the glows over time', () => {
    const a = fakeContext()
    const b = fakeContext()
    drawAurora(a as unknown as CanvasRenderingContext2D, 1000, 600, 0)
    drawAurora(b as unknown as CanvasRenderingContext2D, 1000, 600, 30000)
    expect((a.createRadialGradient as jest.Mock).mock.calls[0][0]).not.toBe(
      (b.createRadialGradient as jest.Mock).mock.calls[0][0]
    )
  })
})

describe('Aurora', () => {
  const ctx = fakeContext()

  beforeEach(() => {
    matchMediaCalls.length = 0
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ctx) as unknown as typeof HTMLCanvasElement.prototype.getContext
  })

  it('always renders the CSS fallback plus a canvas, decorative and without inline styles', () => {
    const { container } = render(<Aurora />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root).toHaveClass('pointer-events-none')
    expect(root.querySelector('.aurora-fallback')).toBeInTheDocument()
    expect(root.querySelector('canvas')).toBeInTheDocument()
    expect(root.querySelector('[style]')).toBeNull()
  })

  it('runs the animation only for no-preference motion at md+ and cleans up', () => {
    const { container } = render(<Aurora />)
    const entry = matchMediaCalls.find((c) => /no-preference/.test(c.query) && /min-width: 768px/.test(c.query))
    expect(entry).toBeDefined()
    const canvas = container.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).not.toHaveAttribute('data-on')
    const cleanup = entry!.fn() as () => void
    expect(canvas).toHaveAttribute('data-on', 'true')
    cleanup()
    expect(canvas).not.toHaveAttribute('data-on')
  })
})
