import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'
import type { WorkProject, SideProject } from '@/types'

const workProject: WorkProject = {
  type: 'work',
  title: 'MyTelkomsel API',
  description: 'Backend services for MyTelkomsel.',
  tags: ['NestJS', 'TypeScript'],
}

const sideProject: SideProject = {
  type: 'side',
  title: 'My Side Project',
  description: 'A cool side project.',
  tags: ['Node.js'],
  githubUrl: 'https://github.com/gilangmgm98/side',
  liveUrl: 'https://side.vercel.app',
}

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={workProject} />)
    expect(screen.getByText('MyTelkomsel API')).toBeInTheDocument()
  })
  it('renders description', () => {
    render(<ProjectCard project={workProject} />)
    expect(screen.getByText('Backend services for MyTelkomsel.')).toBeInTheDocument()
  })
  it('renders tags', () => {
    render(<ProjectCard project={workProject} />)
    expect(screen.getByText('NestJS')).toBeInTheDocument()
  })
  it('does not render links for work projects', () => {
    render(<ProjectCard project={workProject} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
  it('renders GitHub link for side projects', () => {
    render(<ProjectCard project={sideProject} />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/gilangmgm98/side')
  })
  it('renders live URL link for side projects', () => {
    render(<ProjectCard project={sideProject} />)
    const link = screen.getByRole('link', { name: /live/i })
    expect(link).toHaveAttribute('href', 'https://side.vercel.app')
  })
})
