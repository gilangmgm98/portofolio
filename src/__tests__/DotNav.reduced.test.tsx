import { render } from '@testing-library/react'
import DotNav from '@/components/ui/DotNav'
import { mockMatchMedia } from '@/test-utils/matchMedia'

describe('DotNav with prefers-reduced-motion', () => {
  beforeAll(() => mockMatchMedia(['prefers-reduced-motion']))

  it('renders the active dot with the same initial transform as the server', () => {
    const { container } = render(<DotNav total={3} active={1} onNavigate={jest.fn()} />)
    const dots = container.querySelectorAll('button')
    expect(dots[1].style.transform).toBe('scale(1.5)')
    expect(dots[0].style.transform).toBe('scale(1)')
  })
})
