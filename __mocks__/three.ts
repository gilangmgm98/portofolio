const THREE = {
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    setSize: jest.fn(),
    setPixelRatio: jest.fn(),
    render: jest.fn(),
    dispose: jest.fn(),
    domElement: document.createElement('canvas'),
  })),
  Scene: jest.fn().mockImplementation(() => ({ add: jest.fn(), remove: jest.fn() })),
  PerspectiveCamera: jest.fn().mockImplementation(() => ({
    position: { z: 0 },
    aspect: 1,
    updateProjectionMatrix: jest.fn(),
  })),
  BufferGeometry: jest.fn().mockImplementation(() => ({
    setAttribute: jest.fn(),
    dispose: jest.fn(),
  })),
  BufferAttribute: jest.fn(),
  PointsMaterial: jest.fn().mockImplementation(() => ({ dispose: jest.fn() })),
  Points: jest.fn().mockImplementation(() => ({ rotation: { x: 0, y: 0 } })),
  Float32Array: Float32Array,
}

export default THREE
export const {
  WebGLRenderer, Scene, PerspectiveCamera,
  BufferGeometry, BufferAttribute, PointsMaterial, Points,
} = THREE
