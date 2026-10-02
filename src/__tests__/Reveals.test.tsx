import { render } from '@testing-library/react'
import Reveals from '@/components/layout/Reveals'
import gsapMock, { ScrollTrigger as ScrollTriggerMock, matchMediaCalls } from '../../__mocks__/gsap'

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

describe('Reveals', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
    document.body.innerHTML =
      '<div id="a" data-reveal></div><p id="b" data-reveal="fade"></p><h2 id="m" data-reveal="mask"></h2>'
  })

  it('renders nothing', () => {
    const { container } = render(<Reveals />)
    expect(container).toBeEmptyDOMElement()
  })

  it('registers its GSAP work only for no-preference motion', () => {
    render(<Reveals />)
    expect(matchMediaCalls.map((c) => c.query)).toEqual([MOTION_OK])
  })

  it('takes over every reveal element at start-up (so the CSS failsafe cannot un-hide below-the-fold items early), except mask titles', () => {
    render(<Reveals />)
    matchMediaCalls[0].fn()
    expect(document.getElementById('a')).toHaveAttribute('data-ready')
    expect(document.getElementById('b')).toHaveAttribute('data-ready')
    expect(document.getElementById('m')).not.toHaveAttribute('data-ready')
    expect(ScrollTriggerMock.batch).toHaveBeenCalledWith(
      [document.getElementById('a'), document.getElementById('b')],
      expect.objectContaining({ once: true, start: 'top 88%' })
    )
  })

  it('animates a revealed batch to its rest state', () => {
    render(<Reveals />)
    matchMediaCalls[0].fn()
    const vars = (ScrollTriggerMock.batch as jest.Mock).mock.calls[0][1]
    const els = [document.getElementById('a')]
    vars.onEnter(els)
    expect(gsapMock.to).toHaveBeenCalledWith(els, expect.objectContaining({ opacity: 1, y: 0, stagger: 0.06 }))
  })
})
