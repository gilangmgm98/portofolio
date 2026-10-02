interface SectionHeadingProps {
  label: string
  title: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ label, title, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : undefined}>
      <p className="mb-2 text-sm font-medium text-cosmos-primary">{label}</p>
      <h2 className="text-4xl font-bold leading-heading tracking-display text-cosmos-text md:text-6xl">{title}</h2>
    </div>
  )
}
