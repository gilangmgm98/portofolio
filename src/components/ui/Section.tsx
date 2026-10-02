import SectionLabel from './SectionLabel'

interface SectionProps {
  id: string
  label: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      data-section
      aria-labelledby={`${id}-label`}
      className={`scroll-mt-20 py-20 lg:py-28 ${className}`}
    >
      <SectionLabel id={`${id}-label`}>{label}</SectionLabel>
      {children}
    </section>
  )
}
