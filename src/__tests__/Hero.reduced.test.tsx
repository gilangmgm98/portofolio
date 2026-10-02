import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'
import { mockMatchMedia } from '@/test-utils/matchMedia'

// Regression: on an iPhone with Reduce Motion, the hero stayed blurred (blur(8px)) forever
// because the server-rendered initial style was never replaced after hydration.
describe('Hero with prefers-reduced-motion', () => {
  beforeAll(() => mockMatchMedia(['prefers-reduced-motion']))

  it('renders the same initial inline styles as the server (blur + offset), not a reduced variant', () => {
    render(<Hero />)
    const name = screen.getByText('GILANG')
    expect(name.style.filter).toBe('blur(8px)')
    expect(name.style.transform).toContain('translateY(16px)')
  })
})
