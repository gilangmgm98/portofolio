import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GradientText from '@/components/ui/GradientText'
import Section from '@/components/ui/Section'
import ScrollLink from '@/components/ui/ScrollLink'

describe('GradientText', () => {
  it('renders an italic accent-font gradient span', () => {
    render(<GradientText>millions</GradientText>)
    expect(screen.getByText('millions')).toHaveClass('font-accent', 'italic', 'text-grad')
  })
})

describe('Section', () => {
  it('is a named region carrying the scrollspy marker and a revealable label', () => {
    render(<Section id="about" label="About"><p>body</p></Section>)
    const region = screen.getByRole('region', { name: 'About' })
    expect(region).toHaveAttribute('id', 'about')
    expect(region).toHaveAttribute('data-section')
    expect(screen.getByText('body')).toBeInTheDocument()
    const label = screen.getByText('About').parentElement as HTMLElement
    expect(label).toHaveAttribute('data-reveal', 'fade')
    expect(label).not.toHaveAttribute('style')
  })
})

describe('ScrollLink', () => {
  it('renders an anchor to the section id that the custom cursor can grow over', () => {
    render(<ScrollLink id="stack">Go</ScrollLink>)
    const link = screen.getByRole('link', { name: 'Go' })
    expect(link).toHaveAttribute('href', '#stack')
    expect(link).toHaveAttribute('data-cursor')
  })

  it('prevents the hash jump, calls onNavigate, then scrolls to the target on the next frame', async () => {
    const user = userEvent.setup()
    const onNavigate = jest.fn()
    render(
      <>
        <ScrollLink id="stack" onNavigate={onNavigate}>Go</ScrollLink>
        <section id="stack" />
      </>
    )
    await user.click(screen.getByRole('link', { name: 'Go' }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled())
  })
})
