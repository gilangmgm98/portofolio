import { render, screen } from '@testing-library/react'
import TimelineItem from '@/components/ui/TimelineItem'
import type { Experience } from '@/types'

const mockExperience: Experience = {
  company: 'CODE.ID',
  companyUrl: 'https://code.id',
  role: 'Back End Developer',
  period: 'Oct 2025 – Present',
  location: 'Jakarta · Hybrid',
  current: true,
  highlights: ['Owned backend services for MyTelkomsel'],
  tags: ['TypeScript', 'NestJS'],
}

describe('TimelineItem', () => {
  it('renders company name', () => {
    render(<TimelineItem experience={mockExperience} position="right" />)
    expect(screen.getByText('CODE.ID')).toBeInTheDocument()
  })
  it('renders role', () => {
    render(<TimelineItem experience={mockExperience} position="right" />)
    expect(screen.getByText('Back End Developer')).toBeInTheDocument()
  })
  it('renders period', () => {
    render(<TimelineItem experience={mockExperience} position="right" />)
    expect(screen.getByText('Oct 2025 – Present')).toBeInTheDocument()
  })
  it('renders highlights', () => {
    render(<TimelineItem experience={mockExperience} position="right" />)
    expect(screen.getByText(/Owned backend services for MyTelkomsel/)).toBeInTheDocument()
  })
  it('shows Current badge when current is true', () => {
    render(<TimelineItem experience={mockExperience} position="right" />)
    expect(screen.getByText('Current')).toBeInTheDocument()
  })
})
