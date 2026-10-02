'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface StarFieldProps {
  particleCount?: number
  opacity?: number
  speed?: number
  animated?: boolean
}

export default function StarField({ particleCount = 2000, opacity = 0.35, speed = 0.5, animated = true }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.02, transparent: true, opacity })

    const stars = new THREE.Points(geometry, material)
    scene.add(stars)

    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (!animated) renderer.render(scene, camera)
    }
    window.addEventListener('resize', handleResize)

    let animId = 0
    if (animated) {
      window.addEventListener('mousemove', handleMouseMove)
      const tick = () => {
        animId = requestAnimationFrame(tick)
        if (document.hidden) return
        stars.rotation.x += (0.0002 + mouseY * 0.001) * speed
        stars.rotation.y += (0.0003 + mouseX * 0.001) * speed
        renderer.render(scene, camera)
      }
      tick()
    } else {
      renderer.render(scene, camera)
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      scene.remove(stars)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [particleCount, opacity, speed, animated])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
