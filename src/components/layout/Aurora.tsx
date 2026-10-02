// Three soft glows drifting very slowly. CSS-only on purpose: they animate `transform` only, so the
// browser composites them on the GPU with no JavaScript and no per-frame repaint. (A full-screen
// <canvas> redrawn every frame cost ~100x more compositor commit time and made scrolling janky.)
// Static on small screens and under Reduce Motion — see globals.css.
export default function Aurora() {
  return (
    <div aria-hidden="true" className="aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div data-aurora-glow data-i="0" className="aurora-glow" />
      <div data-aurora-glow data-i="1" className="aurora-glow" />
      <div data-aurora-glow data-i="2" className="aurora-glow" />
    </div>
  )
}
