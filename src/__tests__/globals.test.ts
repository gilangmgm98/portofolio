import fs from 'fs'
import path from 'path'

const css = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8')

describe('globals.css', () => {
  it('has no scroll-snap and no fixed 100vh html height', () => {
    expect(css).not.toMatch(/scroll-snap/)
    expect(css).not.toMatch(/height:\s*100vh/)
  })
  it('hides reveal elements only under the .js class', () => {
    expect(css).toMatch(/\.js \[data-reveal\]\s*\{[^}]*opacity:\s*0/)
    expect(css).not.toMatch(/^\[data-reveal\]\s*\{/m)
  })
  it('has a CSS failsafe that un-hides reveal elements after 3 seconds unless JS took over', () => {
    expect(css).toMatch(/\.js \[data-reveal\]\s*\{[^}]*animation:\s*reveal-failsafe 0s linear 3s forwards/)
    expect(css).toMatch(/\.js \[data-reveal\]\[data-ready\]\s*\{[^}]*animation:\s*none/)
    expect(css).toMatch(/@keyframes reveal-failsafe/)
  })
  it('shows everything immediately under prefers-reduced-motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.js \[data-reveal\][\s\S]*opacity:\s*1/)
  })
  it('defines the editorial tokens', () => {
    expect(css).toMatch(/--coral-rgb:\s*255 138 107/)
    expect(css).toMatch(/--grad:\s*linear-gradient\(100deg, #a78bfa 0%, #ff8a6b 100%\)/)
    expect(css).toMatch(/--bg-rgb:\s*7 7 11/)
  })
  it('strengthens borders under prefers-contrast: more', () => {
    expect(css).toMatch(/@media \(prefers-contrast: more\)[\s\S]*--hairline:\s*rgba\(255, 255, 255, 0\.4\)/)
  })
  it('clips horizontal overflow of the page content without creating a scroll container', () => {
    expect(css).toMatch(/#site-content\s*\{[^}]*overflow-x:\s*clip/)
  })
  it('grows the cursor via the inner shape (inline GSAP transforms would override scale on the ring)', () => {
    expect(css).toMatch(/\.cursor-ring\[data-hover='true'\] \.cursor-ring-shape\s*\{[^}]*scale:\s*1\.8/)
    expect(css).not.toMatch(/\.cursor-ring\[data-hover='true'\]\s*\{[^}]*scale:/)
  })
  it('gives translucent impact-card gradients an opaque base so stacked cards never ghost through', () => {
    expect(css).toMatch(/\.impact-card\[data-tone='0'\]\s*\{[^}]*\),\s*rgb\(var\(--surface-rgb\)\);/)
    expect(css).toMatch(/\.impact-card\[data-tone='1'\]\s*\{[^}]*\),\s*rgb\(var\(--surface-rgb\)\);/)
  })
  it('keeps the top bar transparent over the hero and solid only once scrolled', () => {
    expect(css).toMatch(/\.topbar\s*\{[^}]*background:\s*transparent/)
    expect(css).toMatch(/\.topbar\[data-scrolled\]\s*\{[^}]*background:/)
  })
  it('wipes a gradient over hovered menu text with clip-path (not a colour swap), hover-gated', () => {
    expect(css).toMatch(/\.grad-wipe::after\s*\{[^}]*clip-path:\s*inset\(0 100% 0 0\)/)
    expect(css).toMatch(/@media \(hover: hover\)\s*\{[^}]*\.menu-item:hover \.grad-wipe::after\s*\{[^}]*clip-path:\s*inset\(0\)/)
  })
  it('breathes the green availability dot: 2s opacity pulse with a glow, off under Reduce Motion', () => {
    expect(css).toMatch(/\.status-dot\s*\{[^}]*box-shadow:[^;]*#3ee08f[^;]*;[^}]*animation:\s*breathe 2s ease-in-out infinite/)
    expect(css).toMatch(/@keyframes breathe\s*\{[^}]*50%\s*\{[^}]*opacity:\s*0\.35/)
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.status-dot\s*\{[^}]*animation:\s*none/)
  })
  it('has an opaque scrim layer for the stacked impact cards', () => {
    expect(css).toMatch(/\.impact-scrim\s*\{[^}]*background:\s*rgb\(var\(--bg-rgb\)\)[^}]*opacity:\s*0/)
  })
  it('has a bleeding glow variant: pseudo extends past the box, soft multi-stop falloff, no clipping radius', () => {
    const block = css.match(/\.glow-card\.glow-bleed::before\s*\{([^}]*)\}/)
    expect(block).not.toBeNull()
    expect(block![1]).toMatch(/inset:\s*-\d+px/)
    expect(block![1]).toMatch(/radial-gradient/)
    expect((block![1].match(/rgb\(var\(--primary-rgb\)/g) ?? []).length).toBeGreaterThanOrEqual(4)
  })
})
