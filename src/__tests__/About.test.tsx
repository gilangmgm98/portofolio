import { render, screen } from '@testing-library/react'
import About from '@/components/sections/About'

describe('About', () => {
  it('renders section heading', () => {
    render(<About />)
    expect(screen.getByText('Who I Am')).toBeInTheDocument()
  })
  it('renders bio text mentioning backend developer', () => {
    render(<About />)
    expect(screen.getByText(/backend developer/i)).toBeInTheDocument()
  })
  it('renders LinkedIn link', () => {
    render(<About />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/gilangmgm/')
  })
  it('renders GitHub link', () => {
    render(<About />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/gilangmgm98')
  })
})
