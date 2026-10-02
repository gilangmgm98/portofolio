import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SplitLayout from '@/components/layout/SplitLayout'
import { profile } from '@/data/profile'

let callback: IntersectionObserverCallback
class ControllableIO {
  constructor(cb: IntersectionObserverCallback) {
    callback = cb
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

function renderLayout() {
  return render(
    <SplitLayout>
      <section id="about" data-section>about body</section>
      <section id="impact" data-section>impact body</section>
      <section id="stack" data-section>stack body</section>
    </SplitLayout>
  )
}

describe('SplitLayout', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', { writable: true, configurable: true, value: ControllableIO })
  })

  it('renders the sidebar identity and all children', () => {
    renderLayout()
    expect(screen.getByText('Gilang Murdiyanto')).toBeInTheDocument()
    expect(screen.getByText(profile.role)).toBeInTheDocument()
    expect(screen.getByText(profile.tagline)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(screen.getByText('impact body')).toBeInTheDocument()
  })

  it('lists the five sections and marks About active at first', () => {
    renderLayout()
    const nav = screen.getByRole('navigation', { name: 'Sections' })
    const links = Array.from(nav.querySelectorAll('a'))
    expect(links.map((l) => l.textContent)).toEqual(['About', 'Impact', 'Experience', 'Projects', 'Stack'])
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: 'Impact' })).not.toHaveAttribute('aria-current')
  })

  it('follows the section crossing the middle of the viewport', () => {
    renderLayout()
    act(() => {
      callback(
        [{ isIntersecting: true, target: document.getElementById('impact') } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
  })

  it('scrolls to a section from the sidebar', async () => {
    const user = userEvent.setup()
    renderLayout()
    await user.click(screen.getByRole('link', { name: 'Stack' }))
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled())
  })
})
