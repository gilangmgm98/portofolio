import { render } from '@testing-library/react'
import * as THREE from 'three'
import StarField from '@/components/three/StarField'

// Three.js is mocked via __mocks__/three.ts
describe('StarField', () => {
  afterEach(() => jest.restoreAllMocks())

  it('renders a canvas element', () => {
    const { container } = render(<StarField particleCount={100} />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('does not start an animation loop when animated is false', () => {
    const raf = jest.spyOn(window, 'requestAnimationFrame')
    render(<StarField particleCount={100} animated={false} />)
    expect(raf).not.toHaveBeenCalled()
  })

  it('disposes the WebGL renderer on unmount (no leak when the viewport crosses 768px)', () => {
    const { unmount } = render(<StarField particleCount={100} />)
    const renderer = (THREE.WebGLRenderer as unknown as jest.Mock).mock.results.at(-1)!.value
    unmount()
    expect(renderer.dispose).toHaveBeenCalled()
  })
})
