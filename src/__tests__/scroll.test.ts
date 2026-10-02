import type Lenis from 'lenis'
import { scrollToId, scrollToTop, setLenis, getLenis } from '@/lib/scroll'
import { mockMatchMedia } from '@/test-utils/matchMedia'

function section(id: string) {
  const el = document.createElement('section')
  el.id = id
  document.body.appendChild(el)
  return el
}

describe('scroll helpers', () => {
  afterEach(() => {
    setLenis(null)
    document.body.innerHTML = ''
    jest.clearAllMocks()
  })

  it('stores and returns the Lenis instance', () => {
    const fake = { scrollTo: jest.fn() } as unknown as Lenis
    setLenis(fake)
    expect(getLenis()).toBe(fake)
  })

  it('scrolls through Lenis when it is active', () => {
    const el = section('about')
    const fake = { scrollTo: jest.fn() }
    setLenis(fake as unknown as Lenis)
    scrollToId('about', -80)
    expect(fake.scrollTo).toHaveBeenCalledWith(el, { offset: -80 })
  })

  it('falls back to native smooth scrolling without Lenis', () => {
    mockMatchMedia([])
    section('about')
    scrollToId('about')
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('falls back to instant scrolling under reduced motion', () => {
    mockMatchMedia(['prefers-reduced-motion'])
    section('about')
    scrollToId('about')
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' })
  })

  it('ignores unknown ids', () => {
    scrollToId('nope')
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('scrollToTop uses Lenis when present', () => {
    const fake = { scrollTo: jest.fn() }
    setLenis(fake as unknown as Lenis)
    scrollToTop()
    expect(fake.scrollTo).toHaveBeenCalledWith(0)
  })
})
