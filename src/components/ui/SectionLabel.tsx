interface SectionLabelProps {
  id?: string
  children: React.ReactNode
}

export default function SectionLabel({ id, children }: SectionLabelProps) {
  return (
    <div data-reveal="fade" className="mb-10 flex items-center gap-4">
      <h2 id={id} className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-muted">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
    </div>
  )
}
