'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'
import { startAuroraGL } from './aurora-gl'

// Two layers, same markup for everyone:
//  - three CSS glows that animate `transform` only (GPU-composited, no JS): the fallback for phones,
//    Reduce Motion, no-WebGL and no-JS
//  - a low-resolution WebGL shader that fades in over them on md+ when motion is allowed
// (A full-resolution 2D canvas redrawn every frame cost ~100x more compositor time; this one renders
// at ~0.6x CSS size, capped at 30 fps, and is upscaled by the browser.)
export default function Aurora() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
      const root = rootRef.current
      const canvas = canvasRef.current
      if (!root || !canvas) return
      const stop = startAuroraGL(canvas)
      if (!stop) return // keep the CSS glows
      canvas.dataset.on = 'true'
      root.dataset.gl = 'true'
      return () => {
        stop()
        delete canvas.dataset.on
        delete root.dataset.gl
      }
    })
  }, [])

  return (
    <div ref={rootRef} aria-hidden="true" className="aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div data-aurora-glow data-i="0" className="aurora-glow" />
      <div data-aurora-glow data-i="1" className="aurora-glow" />
      <div data-aurora-glow data-i="2" className="aurora-glow" />
      <canvas ref={canvasRef} data-aurora-gl className="aurora-gl" />
    </div>
  )
}
