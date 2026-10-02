interface MagneticProps {
  /** replaces the default `inline-block` (a transform needs a non-inline box) */
  className?: string
  children: React.ReactNode
}

// Hook element for the magnetic hover effect (see PointerEffects). The GSAP transform is applied to
// this wrapper, so the child keeps its own CSS transforms (e.g. the :active press scale).
export default function Magnetic({ className = 'inline-block', children }: MagneticProps) {
  return (
    <span data-magnetic className={className}>
      {children}
    </span>
  )
}
