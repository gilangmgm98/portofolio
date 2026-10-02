import { render, screen } from '@testing-library/react'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

describe('Reveal', () => {
  it('keeps children in the DOM even if the observer never fires', () => {
    render(<Reveal><p>hello</p></Reveal>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
  it('starts hidden and 24px down when motion is allowed', () => {
    const { container } = render(<Reveal><p>hi</p></Reveal>)
    const el = container.firstChild as HTMLElement
    expect(el.style.opacity).toBe('0')
    expect(el.style.transform).toContain('translateY(24px)')
  })
  it('renders group + items', () => {
    render(<RevealGroup><RevealItem><span>a</span></RevealItem><RevealItem><span>b</span></RevealItem></RevealGroup>)
    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.getByText('b')).toBeInTheDocument()
  })
})
