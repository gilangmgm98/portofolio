import { render } from '@testing-library/react'
import Experience from '@/components/sections/Experience'
import { mockMatchMedia } from '@/test-utils/matchMedia'

// Regression: swapping a scroll-linked MotionValue for a plain number after mount is ignored by
// Motion, so the timeline line stayed at scaleY(0) (invisible) for Reduce Motion users.
describe('Experience with prefers-reduced-motion', () => {
  beforeAll(() => mockMatchMedia(['prefers-reduced-motion']))

  it('shows the full timeline line as a plain element, not scroll-linked', () => {
    const { container } = render(<Experience />)
    const line = container.querySelector('[aria-hidden="true"]') as HTMLElement
    expect(line).toBeInTheDocument()
    expect(line.style.transform).toBe('')
    expect(line.style.transformOrigin).toBe('')
  })
})
