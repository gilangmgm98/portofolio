import { render } from '@testing-library/react'
import ScrollMotion from '@/components/layout/ScrollMotion'
import gsapMock, { ScrollTrigger as ScrollTriggerMock, matchMediaCalls } from '../../__mocks__/gsap'

const MOTION_OK = '(prefers-reduced-motion: no-preference)'

describe('ScrollMotion', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('renders nothing and registers only for no-preference motion', () => {
    const { container } = render(<ScrollMotion />)
    expect(container).toBeEmptyDOMElement()
    expect(matchMediaCalls.map((c) => c.query)).toEqual([MOTION_OK])
  })

  it('scrubs a parallax element against its section, scaled by its speed', () => {
    document.body.innerHTML =
      '<section id="s"><div id="a" data-parallax="0.18" data-parallax-start="top top"></div><div id="b" data-parallax="-0.4"></div></section>'
    render(<ScrollMotion />)
    matchMediaCalls[0].fn()
    expect(gsapMock.fromTo).toHaveBeenCalledTimes(2)
    const [a, aFrom, aTo] = (gsapMock.fromTo as jest.Mock).mock.calls[0]
    expect(a).toBe(document.getElementById('a'))
    expect(aFrom).toEqual({ yPercent: 0 })
    expect(aTo).toMatchObject({ yPercent: 18, ease: 'none' })
    expect(aTo.scrollTrigger).toMatchObject({ trigger: document.getElementById('s'), start: 'top top', end: 'bottom top', scrub: 0.6 })
    const [, , bTo] = (gsapMock.fromTo as jest.Mock).mock.calls[1]
    expect(bTo.yPercent).toBe(-40)
    expect(bTo.scrollTrigger.start).toBe('top bottom') // default
  })

  it('skews a marked element with scroll velocity, clamped, and settles back to 0', () => {
    document.body.innerHTML = '<h2 id="t" data-skew></h2>'
    render(<ScrollMotion />)
    matchMediaCalls[0].fn()
    expect(gsapMock.quickTo).toHaveBeenCalledWith(document.getElementById('t'), 'skewY', expect.objectContaining({ ease: 'power3' }))
    const skewTo = (gsapMock.quickTo as jest.Mock).mock.results[0].value as jest.Mock
    const { onUpdate } = (ScrollTriggerMock.create as jest.Mock).mock.calls[0][0]
    onUpdate({ getVelocity: () => -1200 }) // scrolling down fast
    expect(skewTo).toHaveBeenLastCalledWith(2.5) // clamped (-1200 / -400 = 3)
    onUpdate({ getVelocity: () => 200 })
    expect(skewTo).toHaveBeenLastCalledWith(-0.5)
    onUpdate({ getVelocity: () => 0 })
    expect(skewTo).toHaveBeenLastCalledWith(0)
  })
})
