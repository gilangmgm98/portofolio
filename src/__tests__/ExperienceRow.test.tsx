import { render, screen } from '@testing-library/react'
import ExperienceRow from '@/components/ui/ExperienceRow'
import type { Experience } from '@/types'

const experience: Experience = {
  company: 'CODE.ID',
  companyUrl: 'https://code.id',
  role: 'Back End Developer',
  period: 'Oct 2025 – Present',
  location: 'Jakarta · Hybrid',
  current: true,
  highlights: ['Owned backend services for MyTelkomsel'],
  tags: ['TypeScript', 'NestJS'],
}

describe('ExperienceRow', () => {
  it('renders company (linked), role, period and location separately', () => {
    render(<ExperienceRow experience={experience} />)
    expect(screen.getByRole('link', { name: 'CODE.ID' })).toHaveAttribute('href', 'https://code.id')
    expect(screen.getByText('Back End Developer')).toBeInTheDocument()
    expect(screen.getByText('Oct 2025 – Present')).toBeInTheDocument()
    expect(screen.getByText('Jakarta · Hybrid')).toBeInTheDocument()
  })

  it('renders highlights and tags', () => {
    render(<ExperienceRow experience={experience} />)
    expect(screen.getByText('Owned backend services for MyTelkomsel')).toBeInTheDocument()
    expect(screen.getByText('NestJS')).toBeInTheDocument()
  })

  it('shows the Current badge only for the current role', () => {
    const { rerender } = render(<ExperienceRow experience={experience} />)
    expect(screen.getByText('Current')).toBeInTheDocument()
    rerender(<ExperienceRow experience={{ ...experience, current: false }} />)
    expect(screen.queryByText('Current')).not.toBeInTheDocument()
  })

  it('renders the company as plain text when there is no URL', () => {
    render(<ExperienceRow experience={{ ...experience, companyUrl: undefined }} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('CODE.ID')).toBeInTheDocument()
  })

  it('is a revealable article with no inline style', () => {
    const { container } = render(<ExperienceRow experience={experience} />)
    expect(container.firstChild).toHaveAttribute('data-reveal')
    expect(container.querySelector('[style]')).toBeNull()
  })

  it('highlights under the cursor on hover (glow)', () => {
    const { container } = render(<ExperienceRow experience={experience} />)
    expect(container.firstChild).toHaveAttribute('data-glow')
  })

  it('lets the glow bleed past the row box so it blends into the page instead of ending at a hard edge', () => {
    const { container } = render(<ExperienceRow experience={experience} />)
    expect(container.firstChild).toHaveClass('glow-bleed')
  })
})
