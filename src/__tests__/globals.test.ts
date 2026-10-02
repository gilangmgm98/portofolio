import fs from 'fs'
import path from 'path'

const css = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8')

describe('globals.css', () => {
  it('has no scroll-snap and no fixed 100vh html height', () => {
    expect(css).not.toMatch(/scroll-snap/)
    expect(css).not.toMatch(/height:\s*100vh/)
  })
  it('makes glass solid without blur under prefers-reduced-transparency', () => {
    expect(css).toMatch(/@media \(prefers-reduced-transparency: reduce\)[\s\S]*--glass:\s*#1c1c1e[\s\S]*--glass-blur:\s*none/)
  })
  it('strengthens borders under prefers-contrast: more', () => {
    expect(css).toMatch(/@media \(prefers-contrast: more\)[\s\S]*--border:\s*rgba\(255, 255, 255, 0\.4\)/)
  })
})
