import { render, screen } from '@testing-library/react'
import SkillBadge from '@/components/ui/SkillBadge'

describe('SkillBadge', () => {
  it('renders skill name', () => {
    render(<SkillBadge name="TypeScript" icon="typescript" category="language" />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
})
