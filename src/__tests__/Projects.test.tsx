import { render, screen } from '@testing-library/react'
import Projects from '@/components/sections/Projects'
import { projects } from '@/data/projects'

describe('Projects', () => {
  it('is the Projects region', () => {
    render(<Projects />)
    expect(screen.getByRole('region', { name: 'Projects' })).toHaveAttribute('id', 'projects')
  })

  it('renders the MyTelkomsel work project', () => {
    render(<Projects />)
    expect(screen.getByText('MyTelkomsel Backend Services')).toBeInTheDocument()
  })

  it('renders every project', () => {
    render(<Projects />)
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
  })
})
