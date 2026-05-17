import { render, screen } from '@testing-library/react'
import Navbar from '@/components/ui/Navbar'

describe('Navbar', () => {
  it('renders GM logo', () => {
    render(<Navbar activeSection={0} />)
    expect(screen.getByText('GM')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar activeSection={0} />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('is hidden when activeSection is 0 (hero)', () => {
    const { container } = render(<Navbar activeSection={0} />)
    expect(container.firstChild).toHaveClass('opacity-0')
  })

  it('is visible when activeSection > 0', () => {
    const { container } = render(<Navbar activeSection={1} />)
    expect(container.firstChild).toHaveClass('opacity-100')
  })
})
