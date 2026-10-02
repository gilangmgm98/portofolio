import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PageShell from '@/components/layout/PageShell'

let callback: IntersectionObserverCallback
class ControllableIO {
  constructor(cb: IntersectionObserverCallback) { callback = cb }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}

function renderShell() {
  return render(
    <PageShell sectionCount={3}>
      <section className="portfolio-section" data-testid="s0">a</section>
      <section className="portfolio-section" data-testid="s1">b</section>
      <section className="portfolio-section" data-testid="s2">c</section>
    </PageShell>
  )
}

describe('PageShell', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', { writable: true, configurable: true, value: ControllableIO })
  })

  it('renders its children', () => {
    renderShell()
    expect(screen.getByText('b')).toBeInTheDocument()
  })

  it('hides the navbar on the first section and shows it after the observer reports another', () => {
    const { container } = renderShell()
    expect(container.querySelector('nav')).toHaveClass('opacity-0')
    act(() => {
      callback([{ isIntersecting: true, target: screen.getByTestId('s1') } as unknown as IntersectionObserverEntry], {} as IntersectionObserver)
    })
    expect(container.querySelector('nav')).toHaveClass('opacity-100')
  })

  it('scrolls to a section when a dot is clicked', async () => {
    const user = userEvent.setup()
    const { container } = renderShell()
    await user.click(container.querySelectorAll('button[aria-label^="Go to section"]')[2])
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
