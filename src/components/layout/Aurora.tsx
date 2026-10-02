'use client'

import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'
import { drawAurora } from './aurora-draw'

// A CSS gradient is always rendered (mobile, Reduce Motion, JS off). On md+ with motion allowed a
// canvas fades in on top and animates at ~30 fps; it pauses when the tab is hidden.
export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const resize = () => {
        canvas.width = Math.round(window.innerWidth * dpr)
        canvas.height = Math.round(window.innerHeight * dpr)
      }
      resize()
      window.addEventListener('resize', resize)
      let raf = 0
      let last = 0
      const frame = (t: number) => {
        raf = requestAnimationFrame(frame)
        if (document.hidden || t - last < 33) return
        last = t
        drawAurora(ctx, canvas.width, canvas.height, t)
      }
      raf = requestAnimationFrame(frame)
      canvas.dataset.on = 'true'
      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        delete canvas.dataset.on
      }
    })
  }, [])

  return (
    <div aria-hidden="true" className="aurora pointer-events-none fixed inset-0 -z-10">
      <div className="aurora-fallback absolute inset-0" />
      <canvas ref={canvasRef} className="aurora-canvas absolute inset-0 h-full w-full" />
    </div>
  )
}
