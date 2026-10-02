import { render } from '@testing-library/react'
import PointerEffects from '@/components/layout/PointerEffects'
import gsapMock, { matchMediaCalls } from '../../__mocks__/gsap'

function rect(left: number, top: number, width: number, height: number) {
  return { left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) } as DOMRect
}

describe('PointerEffects', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('renders nothing and registers its work only for fine pointers without reduced motion', () => {
    const { container } = render(<PointerEffects />)
    expect(container).toBeEmptyDOMElement()
    expect(matchMediaCalls).toHaveLength(1)
    expect(matchMediaCalls[0].query).toMatch(/no-preference/)
    expect(matchMediaCalls[0].query).toMatch(/pointer: fine/)
  })

  it('pulls a magnetic element toward the pointer with an elastic spring, clamped, and releases it on leave', () => {
    document.body.innerHTML = '<span data-magnetic id="m"><button>go</button></span>'
    const el = document.getElementById('m') as HTMLElement
    el.getBoundingClientRect = () => rect(100, 100, 100, 40) // centre (150, 120)
    render(<PointerEffects />)
    const cleanup = matchMediaCalls[0].fn() as () => void

    expect(gsapMock.quickTo).toHaveBeenCalledWith(el, 'x', expect.objectContaining({ ease: 'elastic.out(1, 0.35)' }))
    expect(gsapMock.quickTo).toHaveBeenCalledWith(el, 'y', expect.objectContaining({ ease: 'elastic.out(1, 0.35)' }))
    const [xTo, yTo] = (gsapMock.quickTo as jest.Mock).mock.results.map((r) => r.value as jest.Mock)

    el.dispatchEvent(new MouseEvent('pointermove', { clientX: 190, clientY: 100, bubbles: true }))
    expect(xTo).toHaveBeenLastCalledWith(14) // (190-150)*0.35 = 14, at the clamp
    expect(yTo).toHaveBeenLastCalledWith(-7) // (100-120)*0.35

    el.dispatchEvent(new MouseEvent('pointermove', { clientX: 1000, clientY: 120, bubbles: true }))
    expect(xTo).toHaveBeenLastCalledWith(14) // clamped, never flies away

    el.dispatchEvent(new Event('pointerleave'))
    expect(xTo).toHaveBeenLastCalledWith(0)
    expect(yTo).toHaveBeenLastCalledWith(0)

    cleanup()
    xTo.mockClear()
    el.dispatchEvent(new MouseEvent('pointermove', { clientX: 190, clientY: 100, bubbles: true }))
    expect(xTo).not.toHaveBeenCalled()
  })

  it('tracks the pointer inside a glow element via CSS variables and cleans them up', () => {
    document.body.innerHTML = '<div data-glow id="g"></div>'
    const el = document.getElementById('g') as HTMLElement
    el.getBoundingClientRect = () => rect(50, 60, 300, 200)
    render(<PointerEffects />)
    const cleanup = matchMediaCalls[0].fn() as () => void
    el.dispatchEvent(new MouseEvent('pointermove', { clientX: 120, clientY: 100, bubbles: true }))
    expect(el.style.getPropertyValue('--mx')).toBe('70px')
    expect(el.style.getPropertyValue('--my')).toBe('40px')
    cleanup()
    expect(el.style.getPropertyValue('--mx')).toBe('')
  })
})
