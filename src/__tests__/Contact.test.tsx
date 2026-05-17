import { render, screen } from '@testing-library/react'
import Contact from '@/components/sections/Contact'

describe('Contact', () => {
  it("renders heading", () => {
    render(<Contact />)
    expect(screen.getByText("Let's Build Something Together")).toBeInTheDocument()
  })
  it('renders email link', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /gilangmgm98@gmail.com/i })
    expect(link).toHaveAttribute('href', 'mailto:gilangmgm98@gmail.com')
  })
  it('renders contact form fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument()
  })
  it('renders send button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })
})
