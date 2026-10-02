import { render, screen, within } from '@testing-library/react'
import Page from '@/app/page'

describe('Page', () => {
  it('renders every section in order inside the content wrapper', () => {
    const { container } = render(<Page />)
    const content = container.querySelector('#site-content') as HTMLElement
    expect(content).toBeInTheDocument()
    const ids = Array.from(content.querySelectorAll('section[id]')).map((s) => s.id)
    expect(ids).toEqual(['top', 'about', 'impact', 'experience', 'projects', 'stack', 'contact'])
    expect(content.querySelector('main')).toHaveAttribute('id', 'main')
    expect(content.querySelector('footer')).toBeInTheDocument()
  })

  it('keeps the top bar and menu overlay outside the content that the overlay makes inert', () => {
    const { container } = render(<Page />)
    const content = container.querySelector('#site-content') as HTMLElement
    expect(content.contains(container.querySelector('header'))).toBe(false)
    expect(content.contains(document.getElementById('menu-overlay'))).toBe(false)
  })

  it('offers a skip link to the main content', () => {
    render(<Page />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
  })

  it('contains the approved copy', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build backends millions of people rely on.')
    expect(within(screen.getByRole('banner')).getByText('Available for work')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: "Let's talk" })).toBeInTheDocument()
  })

  it('no longer renders the retired sections', () => {
    render(<Page />)
    expect(screen.queryByText('Tech Stack')).not.toBeInTheDocument()
    expect(screen.queryByText('By The Numbers')).not.toBeInTheDocument()
  })
})
