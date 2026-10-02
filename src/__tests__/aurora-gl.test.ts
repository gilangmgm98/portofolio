import { startAuroraGL } from '@/components/layout/aurora-gl'

function fakeGL(opts: { compileOk?: boolean; linkOk?: boolean } = {}) {
  const { compileOk = true, linkOk = true } = opts
  const lose = { loseContext: jest.fn() }
  const gl = {
    VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, COMPILE_STATUS: 3, LINK_STATUS: 4, ARRAY_BUFFER: 5, STATIC_DRAW: 6, FLOAT: 7, TRIANGLES: 8,
    createShader: jest.fn(() => ({})),
    shaderSource: jest.fn(),
    compileShader: jest.fn(),
    getShaderParameter: jest.fn(() => compileOk),
    getShaderInfoLog: jest.fn(() => 'boom'),
    createProgram: jest.fn(() => ({})),
    attachShader: jest.fn(),
    linkProgram: jest.fn(),
    getProgramParameter: jest.fn(() => linkOk),
    useProgram: jest.fn(),
    getUniformLocation: jest.fn((_p: unknown, name: string) => ({ name })),
    getAttribLocation: jest.fn(() => 0),
    createBuffer: jest.fn(() => ({})),
    bindBuffer: jest.fn(),
    bufferData: jest.fn(),
    enableVertexAttribArray: jest.fn(),
    vertexAttribPointer: jest.fn(),
    viewport: jest.fn(),
    clearColor: jest.fn(),
    clear: jest.fn(),
    uniform2f: jest.fn(),
    uniform1f: jest.fn(),
    drawArrays: jest.fn(),
    deleteProgram: jest.fn(),
    deleteShader: jest.fn(),
    deleteBuffer: jest.fn(),
    getExtension: jest.fn(() => lose),
    lose,
  }
  return gl
}

function canvasWith(gl: ReturnType<typeof fakeGL> | null) {
  const canvas = document.createElement('canvas')
  Object.defineProperty(canvas, 'clientWidth', { value: 1000 })
  Object.defineProperty(canvas, 'clientHeight', { value: 500 })
  canvas.getContext = jest.fn(() => gl) as unknown as typeof canvas.getContext
  return canvas
}

describe('startAuroraGL', () => {
  let frames: Array<(t: number) => void>
  beforeEach(() => {
    frames = []
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      frames.push(cb as (t: number) => void)
      return frames.length
    })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 2 })
  })
  afterEach(() => jest.restoreAllMocks())

  it('returns null when WebGL is unavailable (the CSS glows stay)', () => {
    expect(startAuroraGL(canvasWith(null))).toBeNull()
  })

  it('returns null and releases everything when the shader does not compile', () => {
    const gl = fakeGL({ compileOk: false })
    expect(startAuroraGL(canvasWith(gl))).toBeNull()
    expect(gl.deleteShader).toHaveBeenCalled()
  })

  it('renders at a reduced internal resolution (cheap to run, upscaled by the browser)', () => {
    const gl = fakeGL()
    const canvas = canvasWith(gl)
    startAuroraGL(canvas)
    // DPR 2 is capped at 1.5, then scaled by 0.35 -> 0.525 of the CSS size
    expect(canvas.width).toBe(525)
    expect(canvas.height).toBe(262) // 500 * 0.525 = 262.4999… in floating point
    expect(gl.viewport).toHaveBeenCalledWith(0, 0, 525, 262)
  })

  it('draws at most ~30 times per second and passes resolution and time to the shader', () => {
    const gl = fakeGL()
    startAuroraGL(canvasWith(gl))
    frames.shift()!(1000)
    expect(gl.drawArrays).toHaveBeenCalledTimes(1)
    frames.shift()!(1010) // only 10 ms later: skipped
    expect(gl.drawArrays).toHaveBeenCalledTimes(1)
    frames.shift()!(1040)
    expect(gl.drawArrays).toHaveBeenCalledTimes(2)
    expect(gl.uniform2f).toHaveBeenCalledWith({ name: 'uRes' }, 525, 262)
    expect(gl.uniform1f).toHaveBeenLastCalledWith({ name: 'uTime' }, 1.04)
  })

  it('does not draw while the tab is hidden', () => {
    const gl = fakeGL()
    startAuroraGL(canvasWith(gl))
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    frames.shift()!(1000)
    expect(gl.drawArrays).not.toHaveBeenCalled()
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
  })

  it('stops, frees the GPU resources and releases the context on cleanup', () => {
    const gl = fakeGL()
    const stop = startAuroraGL(canvasWith(gl))!
    stop()
    expect(window.cancelAnimationFrame).toHaveBeenCalled()
    expect(gl.deleteProgram).toHaveBeenCalled()
    expect(gl.deleteBuffer).toHaveBeenCalled()
    expect(gl.lose.loseContext).toHaveBeenCalled()
  })

  it('keeps the fragment shader cheap (3 noise octaves)', () => {
    const gl = fakeGL()
    startAuroraGL(canvasWith(gl))
    const sources = (gl.shaderSource as jest.Mock).mock.calls.map((c) => String(c[1]))
    const frag = sources.find((s) => s.includes('uTime')) ?? ''
    expect(frag).toMatch(/for \(int i = 0; i < 3; i\+\+\)/)
  })
})
