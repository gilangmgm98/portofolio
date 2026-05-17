import { render } from '@testing-library/react'
import StarField from '@/components/three/StarField'

// Three.js is mocked via __mocks__/three.ts
describe('StarField', () => {
  it('renders a canvas element', () => {
    const { container } = render(<StarField particleCount={100} />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('accepts particleCount prop', () => {
    const { container } = render(<StarField particleCount={500} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
