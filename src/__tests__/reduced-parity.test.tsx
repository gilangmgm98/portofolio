import { render } from '@testing-library/react'
import Page from '@/app/page'
import { mockMatchMedia } from '@/test-utils/matchMedia'

function markup(reduce: boolean) {
  mockMatchMedia(reduce ? ['prefers-reduced-motion'] : [])
  const { container, unmount } = render(<Page />)
  const html = container.innerHTML
  unmount()
  return html
}

describe('markup parity', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-10-02T03:23:00Z'))
  })
  afterEach(() => {
    jest.useRealTimers()
    mockMatchMedia([])
  })

  it('renders identical HTML with and without Reduce Motion', () => {
    expect(markup(true)).toBe(markup(false))
  })

  it('never ships hidden, blurred or offset inline styles in the markup', () => {
    const html = markup(false)
    expect(html).not.toMatch(/opacity:\s*0/)
    expect(html).not.toMatch(/translateY/)
    expect(html).not.toMatch(/blur\(/)
  })

  it('leaves reveal gating to CSS: reveal attributes present, GSAP hand-over attribute absent', () => {
    const html = markup(false)
    expect(html).toContain('data-reveal')
    expect(html).not.toContain('data-ready')
  })
})
