import { render, screen } from '@testing-library/react'
import MaskTitle from '@/components/ui/MaskTitle'
import gsapMock, { SplitText as SplitTextMock, matchMediaCalls } from '../../__mocks__/gsap'

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

describe('MaskTitle', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
  })

  it('renders a mask-gated heading with no inline style (identical markup for everyone)', () => {
    render(<MaskTitle as="h1" trigger="load">Hello</MaskTitle>)
    const h = screen.getByRole('heading', { level: 1 })
    expect(h).toHaveAttribute('data-reveal', 'mask')
    expect(h).not.toHaveAttribute('style')
    expect(h).not.toHaveAttribute('data-ready')
  })

  it('only takes over and splits into masked lines when motion is allowed', () => {
    render(<MaskTitle>Title</MaskTitle>)
    expect(SplitTextMock.create).not.toHaveBeenCalled()
    const entry = matchMediaCalls.find((c) => c.query === MOTION_OK)
    expect(entry).toBeDefined()
    const cleanup = entry!.fn() as () => void
    expect(screen.getByRole('heading')).toHaveAttribute('data-ready')
    expect(SplitTextMock.create).toHaveBeenCalledWith(
      screen.getByRole('heading'),
      expect.objectContaining({ type: 'lines', mask: 'lines', autoSplit: true })
    )
    cleanup()
    const split = (SplitTextMock.create as jest.Mock).mock.results[0].value
    expect(split.revert).toHaveBeenCalled()
  })

  function runOnSplit(trigger: 'load' | 'scroll') {
    render(<MaskTitle trigger={trigger}>Title</MaskTitle>)
    matchMediaCalls.find((c) => c.query === MOTION_OK)!.fn()
    const vars = (SplitTextMock.create as jest.Mock).mock.calls[0][1]
    const lines = [document.createElement('div')]
    vars.onSplit({ lines })
    return { lines, h: screen.getByRole('heading') }
  }

  it('reveals lines on load with a short delay and no scroll trigger', () => {
    const { lines, h } = runOnSplit('load')
    expect(gsapMock.set).toHaveBeenCalledWith(h, { opacity: 1 })
    const [target, vars] = (gsapMock.from as jest.Mock).mock.calls[0]
    expect(target).toBe(lines)
    expect(vars).toMatchObject({ yPercent: 110, ease: 'expo.out', delay: 0.15 })
    expect(vars.scrollTrigger).toBeUndefined()
  })

  it('reveals lines when scrolled into view (once)', () => {
    runOnSplit('scroll')
    const [, vars] = (gsapMock.from as jest.Mock).mock.calls[0]
    expect(vars.scrollTrigger).toMatchObject({ start: 'top 88%', once: true })
  })
})
