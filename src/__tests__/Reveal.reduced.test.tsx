import { render } from '@testing-library/react'
import Reveal from '@/components/motion/Reveal'
import { mockMatchMedia } from '@/test-utils/matchMedia'

// Regression: with Reduce Motion on, the client used a different `initial` than the server
// HTML. React does not patch mismatched attributes, so the server's offset stayed forever.
describe('Reveal with prefers-reduced-motion', () => {
  beforeAll(() => mockMatchMedia(['prefers-reduced-motion']))

  it('renders the same initial markup as for everyone else (hydration-safe)', () => {
    const { container } = render(<Reveal><p>hi</p></Reveal>)
    const el = container.firstChild as HTMLElement
    expect(el.style.opacity).toBe('0')
    expect(el.style.transform).toContain('translateY(24px)')
  })
})
