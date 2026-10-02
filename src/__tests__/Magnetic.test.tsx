import { render, screen } from '@testing-library/react'
import Magnetic from '@/components/ui/Magnetic'

describe('Magnetic', () => {
  it('wraps its child in an inline-block hook element with no inline style (identical markup for everyone)', () => {
    const { container } = render(<Magnetic><button>Go</button></Magnetic>)
    const wrap = container.firstChild as HTMLElement
    expect(wrap).toHaveAttribute('data-magnetic')
    expect(wrap).toHaveClass('inline-block')
    expect(wrap).not.toHaveAttribute('style')
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument()
  })

  it('accepts layout classes for the wrapper', () => {
    const { container } = render(<Magnetic className="hidden md:block"><a href="#x">x</a></Magnetic>)
    expect(container.firstChild).toHaveClass('hidden', 'md:block')
  })
})
