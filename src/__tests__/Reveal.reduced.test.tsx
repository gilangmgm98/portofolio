import { render } from '@testing-library/react'
import Reveal from '@/components/motion/Reveal'
import { mockMatchMedia } from '@/test-utils/matchMedia'

describe('Reveal with prefers-reduced-motion', () => {
  beforeAll(() => mockMatchMedia(['prefers-reduced-motion']))

  it('only fades — no translate', () => {
    const { container } = render(<Reveal><p>hi</p></Reveal>)
    const el = container.firstChild as HTMLElement
    expect(el.style.opacity).toBe('0')
    expect(el.style.transform).toBe('')
  })
})
