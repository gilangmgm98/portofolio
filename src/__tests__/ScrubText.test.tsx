import { render, screen } from '@testing-library/react'
import ScrubText from '@/components/ui/ScrubText'
import gsapMock, { SplitText as SplitTextMock, matchMediaCalls } from '../../__mocks__/gsap'

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

describe('ScrubText', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
  })

  it('renders plain, fully visible text: no reveal gating, no inline style (identical markup for everyone)', () => {
    const { container } = render(<ScrubText className="x">Hello <b>big</b> world</ScrubText>)
    const p = screen.getByText(/Hello/)
    expect(p.tagName).toBe('P')
    expect(p).not.toHaveAttribute('data-reveal')
    expect(container.querySelector('[style]')).toBeNull()
  })

  it('only dims and scrubs the words when motion is allowed', () => {
    render(<ScrubText>Hello world</ScrubText>)
    expect(SplitTextMock.create).not.toHaveBeenCalled()
    const entry = matchMediaCalls.find((c) => c.query === MOTION_OK)
    expect(entry).toBeDefined()
    const cleanup = entry!.fn() as () => void
    expect(SplitTextMock.create).toHaveBeenCalledWith(screen.getByText('Hello world'), expect.objectContaining({ type: 'words', autoSplit: true }))
    const vars = (SplitTextMock.create as jest.Mock).mock.calls[0][1]
    const words = [document.createElement('span'), document.createElement('span')]
    vars.onSplit({ words })
    const [target, from, to] = (gsapMock.fromTo as jest.Mock).mock.calls[0]
    expect(target).toBe(words)
    expect(from).toMatchObject({ opacity: 0.22 })
    expect(to).toMatchObject({ opacity: 1, ease: 'none' })
    expect(to.scrollTrigger).toMatchObject({ scrub: true, start: 'top 82%', end: 'bottom 48%' })
    cleanup()
    expect((SplitTextMock.create as jest.Mock).mock.results[0].value.revert).toHaveBeenCalled()
  })

  it('leaves the text untouched if SplitText throws', () => {
    render(<ScrubText>Hello world</ScrubText>)
    ;(SplitTextMock.create as jest.Mock).mockImplementationOnce(() => {
      throw new Error('boom')
    })
    expect(() => matchMediaCalls.find((c) => c.query === MOTION_OK)!.fn()).not.toThrow()
    expect(gsapMock.fromTo).not.toHaveBeenCalled()
  })
})
