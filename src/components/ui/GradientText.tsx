export default function GradientText({ children }: { children: React.ReactNode }) {
  return <em className="font-accent text-[1.1em] italic tracking-[-0.02em] text-grad -mx-[0.14em] px-[0.14em] [box-decoration-break:clone] sm:whitespace-nowrap">{children}</em>
}
