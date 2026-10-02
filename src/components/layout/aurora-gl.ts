const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

// Flowing violet/coral aurora: domain-warped fbm noise steered by two soft colour poles.
// Output is premultiplied alpha so it composites over the page background.
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = vec2(uv.x * (uRes.x / uRes.y), uv.y);
  float t = uTime * 0.035;

  vec2 q = vec2(fbm(p * 1.2 + vec2(0.0, t)), fbm(p * 1.2 + vec2(5.2, -t * 0.8)));
  float n = fbm(p * 1.6 + 2.0 * q + vec2(t * 0.5, 0.0));

  float violetPole = smoothstep(1.25, 0.05, distance(uv, vec2(0.18, 0.88)));
  float coralPole = smoothstep(1.0, 0.05, distance(uv, vec2(0.88, 0.18)));
  vec3 violet = vec3(0.60, 0.48, 1.0);
  vec3 coral = vec3(1.0, 0.50, 0.36);

  float band = smoothstep(0.28, 0.80, n);
  float a = clamp(band * (violetPole * 0.78 + coralPole * 0.42) + n * 0.03, 0.0, 0.46);
  vec3 c = (violet * violetPole + coral * coralPole) / max(violetPole + coralPole, 0.001);
  gl_FragColor = vec4(c * a, a);
}
`

const RESOLUTION_SCALE = 0.35 // internal resolution relative to CSS size (x min(dpr, 1.5)); the browser upscales
const FRAME_MS = 33 // ~30 fps: the aurora drifts slowly, more frames would only cost battery

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

// Starts the shader on `canvas`. Returns a stop function, or null when WebGL (or the shader) is
// unavailable — the caller then simply keeps the CSS glows.
export function startAuroraGL(canvas: HTMLCanvasElement): (() => void) | null {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    powerPreference: 'low-power',
  }) as WebGLRenderingContext | null
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  const program = gl.createProgram()
  if (!vs || !fs || !program) {
    if (vs) gl.deleteShader(vs)
    if (fs) gl.deleteShader(fs)
    return null
  }
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW) // one big triangle
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
  const uRes = gl.getUniformLocation(program, 'uRes')
  const uTime = gl.getUniformLocation(program, 'uTime')
  gl.clearColor(0, 0, 0, 0)

  let w = 1
  let h = 1
  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * RESOLUTION_SCALE
    w = Math.max(1, Math.round(canvas.clientWidth * scale))
    h = Math.max(1, Math.round(canvas.clientHeight * scale))
    canvas.width = w
    canvas.height = h
    gl.viewport(0, 0, w, h)
  }
  resize()

  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const onResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(resize, 150)
  }
  window.addEventListener('resize', onResize)

  let raf = 0
  let last = -Infinity
  let running = true
  const frame = (t: number) => {
    if (!running) return
    raf = requestAnimationFrame(frame)
    if (document.hidden || t - last < FRAME_MS) return
    last = t
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform2f(uRes, w, h)
    gl.uniform1f(uTime, t * 0.001)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  raf = requestAnimationFrame(frame)

  const onLost = (e: Event) => e.preventDefault() // the CSS glows take over visually (see Aurora)
  canvas.addEventListener('webglcontextlost', onLost)

  return () => {
    running = false
    cancelAnimationFrame(raf)
    clearTimeout(resizeTimer)
    window.removeEventListener('resize', onResize)
    canvas.removeEventListener('webglcontextlost', onLost)
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    gl.deleteBuffer(buffer)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
