import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function createMatchMedia() {
  return gsap.matchMedia()
}

export { gsap, ScrollTrigger, SplitText }
