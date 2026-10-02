import { render, screen } from '@testing-library/react'
import LenisProvider from '@/components/layout/LenisProvider'
import { getLenis, setLenis } from '@/lib/scroll'
import gsapMock, { ScrollTrigger as ScrollTriggerMock, matchMediaCalls } from '../../__mocks__/gsap'
import Lenis from '../../__mocks__/lenis'

describe('LenisProvider', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    Lenis.instances.length = 0
    setLenis(null)
    jest.clearAllMocks()
  })

  it('renders its children and creates nothing until the media query matches', () => {
    render(<LenisProvider><p>content</p></LenisProvider>)
    expect(screen.getByText('content')).toBeInTheDocument()
    expect(Lenis.instances).toHaveLength(0)
    expect(getLenis()).toBeNull()
  })

  it('creates Lenis only for fine pointers without reduced motion and wires it to GSAP', () => {
    render(<LenisProvider><p>content</p></LenisProvider>)
    const entry = matchMediaCalls.find((c) => /no-preference/.test(c.query) && /pointer: fine/.test(c.query))
    expect(entry).toBeDefined()
    const cleanup = entry!.fn() as () => void

    expect(Lenis.instances).toHaveLength(1)
    const lenis = Lenis.instances[0]
    expect(lenis.options).toMatchObject({ autoRaf: false, syncTouch: false, smoothWheel: true })
    expect(getLenis()).toBe(lenis)
    expect(lenis.on).toHaveBeenCalledWith('scroll', ScrollTriggerMock.update)
    expect(gsapMock.ticker.add).toHaveBeenCalledTimes(1)
    expect(gsapMock.ticker.lagSmoothing).toHaveBeenCalledWith(0)

    cleanup()
    expect(lenis.destroy).toHaveBeenCalled()
    expect(gsapMock.ticker.remove).toHaveBeenCalled()
    expect(getLenis()).toBeNull()
  })
})
