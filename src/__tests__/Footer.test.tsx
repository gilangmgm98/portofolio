import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/Footer'

describe('Footer', () => {
  it('shows the copyright, role and city', () => {
    render(<Footer />)
    expect(screen.getByText('© 2026 Muhammad Gilang Murdiyanto')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer · Jakarta')).toBeInTheDocument()
  })

  it('has a back-to-top link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '#top')
  })
})
