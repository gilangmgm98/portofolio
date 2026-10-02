import { render, screen } from '@testing-library/react'
import About from '@/components/sections/About'

describe('About', () => {
  it('is the About region', () => {
    render(<About />)
    expect(screen.getByRole('region', { name: 'About' })).toHaveAttribute('id', 'about')
  })

  it('keeps the existing bio', () => {
    render(<About />)
    expect(screen.getByText(/backend developer/i)).toBeInTheDocument()
    expect(screen.getByText('4+ years')).toBeInTheDocument()
    expect(screen.getByText(/MyTelkomsel/)).toBeInTheDocument()
  })

  it('shows the portrait', () => {
    render(<About />)
    expect(screen.getByRole('img', { name: 'Muhammad Gilang Murdiyanto' })).toBeInTheDocument()
  })

  it('has the info grid: location, contact links and current role', () => {
    render(<About />)
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Jakarta, Indonesia')).toBeInTheDocument()
    expect(screen.getByText('Currently')).toBeInTheDocument()
    expect(screen.getByText('Back End Developer at CODE.ID')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'gilangmgm98@gmail.com' })).toHaveAttribute('href', 'mailto:gilangmgm98@gmail.com')
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/gilangmgm/')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/gilangmgm98')
  })

  it('never uses a fixed screen height (tall content must not clip)', () => {
    const { container } = render(<About />)
    expect((container.firstChild as HTMLElement).className).not.toMatch(/(^|\s)(md:)?h-screen/)
  })

  it('keeps the bio as plain visible text (the word-by-word highlight is added by JS only)', () => {
    const { container } = render(<About />)
    const bio = screen.getByText(/Backend developer with/).closest('p') as HTMLElement
    expect(bio).not.toHaveAttribute('data-reveal')
    expect(container.querySelector('p[style]')).toBeNull()
  })
})
