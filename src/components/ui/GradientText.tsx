export default function GradientText({ children }: { children: React.ReactNode }) {
  return <em className="font-accent text-[1.1em] italic tracking-[-0.02em] text-grad sm:whitespace-nowrap">{children}</em>
}
