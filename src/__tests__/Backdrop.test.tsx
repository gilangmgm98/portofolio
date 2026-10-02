import { render } from '@testing-library/react'
import Backdrop from '@/components/layout/Backdrop'
import { mockMatchMedia } from '@/test-utils/matchMedia'

describe('Backdrop', () => {
  it('uses the static CSS gradient below 768px', () => {
    mockMatchMedia([])
    const { container } = render(<Backdrop />)
    expect(container.querySelector('.backdrop-gradient')).toBeInTheDocument()
  })
  it('does not render the gradient on desktop (starfield instead)', () => {
    mockMatchMedia(['min-width: 768px'])
    const { container } = render(<Backdrop />)
    expect(container.querySelector('.backdrop-gradient')).not.toBeInTheDocument()
  })
  it('is hidden from assistive tech and never intercepts pointer events', () => {
    const { container } = render(<Backdrop />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
    expect(container.firstChild).toHaveClass('pointer-events-none')
  })
})
