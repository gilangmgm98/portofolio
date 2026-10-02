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
})
