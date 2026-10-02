'use client'

import dynamic from 'next/dynamic'
import { useReducedMotion } from 'motion/react'
import { useMediaQuery } from '@/lib/useMediaQuery'

const StarField = dynamic(() => import('@/components/three/StarField'), { ssr: false })

export default function Backdrop() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reduce = !!useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-cosmos-bg">
      {isDesktop ? (
        <StarField opacity={0.35} speed={0.5} animated={!reduce} />
      ) : (
        <div className="backdrop-gradient absolute inset-0" />
      )}
    </div>
  )
}
