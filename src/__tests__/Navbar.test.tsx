import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/ui/Navbar'

describe('Navbar', () => {
  it('renders MGM logo', () => {
    render(<Navbar activeSection={0} />)
    expect(screen.getByText('MGM')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar activeSection={0} />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Achievements')).toBeInTheDocument()
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

  it('marks the active link with aria-current', () => {
    render(<Navbar activeSection={3} />)
    expect(screen.getByRole('button', { name: 'Experience' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('button', { name: 'About' })).not.toHaveAttribute('aria-current')
  })

  it('scrolls to the section when a link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Navbar activeSection={1} />
        {Array.from({ length: 7 }).map((_, i) => <section key={i} className="portfolio-section" />)}
      </>
    )
    await user.click(screen.getByRole('button', { name: 'Projects' }))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
