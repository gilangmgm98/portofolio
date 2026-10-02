import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from '@/components/sections/Hero'

describe('Hero', () => {
  it('renders Muhammad', () => {
    render(<Hero />)
    expect(screen.getByText('Muhammad')).toBeInTheDocument()
  })
  it('renders GILANG', () => {
    render(<Hero />)
    expect(screen.getByText('GILANG')).toBeInTheDocument()
  })
  it('renders MURDIYANTO', () => {
    render(<Hero />)
    expect(screen.getByText('MURDIYANTO')).toBeInTheDocument()
  })
  it('renders Backend Developer label', () => {
    render(<Hero />)
    expect(screen.getByText('Backend Developer')).toBeInTheDocument()
  })
  it('renders View Work CTA', () => {
    render(<Hero />)
    expect(screen.getByText('View Work')).toBeInTheDocument()
  })
  it('renders Contact CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
  it('CTAs scroll to a section', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Hero />
        {Array.from({ length: 6 }).map((_, i) => <section key={i} className="portfolio-section" />)}
      </>
    )
    await user.click(screen.getByText('Contact'))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
