import { render, screen } from '@testing-library/react'
import Experience from '@/components/sections/Experience'
import { experiences } from '@/data/experience'

describe('Experience', () => {
  it('is the Experience region', () => {
    render(<Experience />)
    expect(screen.getByRole('region', { name: 'Experience' })).toHaveAttribute('id', 'experience')
  })

  it('renders CODE.ID and eCentrix entries', () => {
    render(<Experience />)
    expect(screen.getByText('CODE.ID')).toBeInTheDocument()
    expect(screen.getAllByText('eCentrix Solutions').length).toBeGreaterThanOrEqual(1)
  })

  it('renders every experience entry (content never gated on scroll)', () => {
    render(<Experience />)
    expect(screen.getAllByRole('article')).toHaveLength(experiences.length)
  })
})
