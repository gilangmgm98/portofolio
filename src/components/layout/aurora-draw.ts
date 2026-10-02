interface Blob {
  cx: number
  cy: number
  r: number
  rgb: string
  a: number
  fx: number
  fy: number
  p: number
}

// Positions are fractions of the canvas; fx/fy are angular speeds in rad/ms (periods of ~60–120 s).
const BLOBS: Blob[] = [
  { cx: 0.28, cy: 0.22, r: 0.55, rgb: '167,139,250', a: 0.22, fx: 0.00007, fy: 0.00005, p: 0 },
  { cx: 0.78, cy: 0.62, r: 0.5, rgb: '255,138,107', a: 0.14, fx: 0.00005, fy: 0.00008, p: 2.1 },
  { cx: 0.5, cy: 0.9, r: 0.6, rgb: '120,90,255', a: 0.16, fx: 0.00006, fy: 0.00004, p: 4.2 },
]

export function drawAurora(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'lighter'
  const size = Math.max(w, h)
  for (const b of BLOBS) {
    const x = (b.cx + Math.sin(t * b.fx + b.p) * 0.12) * w
    const y = (b.cy + Math.cos(t * b.fy + b.p) * 0.1) * h
    const g = ctx.createRadialGradient(x, y, 0, x, y, b.r * size)
    g.addColorStop(0, `rgba(${b.rgb},${b.a})`)
    g.addColorStop(1, `rgba(${b.rgb},0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  }
}
