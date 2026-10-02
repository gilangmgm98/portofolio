import { render } from '@testing-library/react'
import Cursor from '@/components/layout/Cursor'
import gsapMock, { matchMediaCalls } from '../../__mocks__/gsap'

describe('Cursor', () => {
  beforeEach(() => {
    matchMediaCalls.length = 0
    jest.clearAllMocks()
    document.documentElement.classList.remove('has-cursor')
  })

  it('renders two decorative elements and leaves the native cursor alone by default', () => {
    const { container } = render(<Cursor />)
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
    expect(document.documentElement).not.toHaveClass('has-cursor')
  })

  it('hides the native cursor only for fine pointers without reduced motion, and restores it on cleanup', () => {
    render(<Cursor />)
    const entry = matchMediaCalls.find((c) => /pointer: fine/.test(c.query) && /no-preference/.test(c.query))
    expect(entry).toBeDefined()
    const cleanup = entry!.fn() as () => void
    expect(document.documentElement).toHaveClass('has-cursor')
    cleanup()
    expect(document.documentElement).not.toHaveClass('has-cursor')
  })

  it('follows the pointer and grows the ring over interactive elements', () => {
    const { container } = render(<Cursor />)
    matchMediaCalls[0].fn()
    const followers = (gsapMock.quickTo as jest.Mock).mock.results.map((r) => r.value as jest.Mock)
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 10, clientY: 20 }))
    expect(followers.some((f) => f.mock.calls.some((c) => c[0] === 10))).toBe(true)
    expect(followers.some((f) => f.mock.calls.some((c) => c[0] === 20))).toBe(true)

    const ring = container.querySelector('.cursor-ring') as HTMLElement
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.dispatchEvent(new Event('pointerover', { bubbles: true }))
    expect(ring).toHaveAttribute('data-hover', 'true')
    document.body.dispatchEvent(new Event('pointerover', { bubbles: true }))
    expect(ring).toHaveAttribute('data-hover', 'false')
    button.remove()
  })
})
