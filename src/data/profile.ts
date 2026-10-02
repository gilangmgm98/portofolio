export const profile = {
  name: 'Muhammad Gilang Murdiyanto',
  shortName: 'Gilang Murdiyanto',
  role: 'Backend Developer',
  stack: 'TypeScript · NestJS · Node.js',
  status: 'Available for work',
  city: 'Jakarta',
  country: 'Indonesia',
  timeZone: 'Asia/Jakarta',
  email: 'gilangmgm98@gmail.com',
  tagline: 'REST APIs for products used by millions.',
  intro:
    '4+ years across IT support and software engineering. Currently owning the REST APIs behind MyTelkomsel at CODE.ID.',
} as const

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
] as const

export const menuLinks = [...sections, { id: 'contact', label: 'Contact' }] as const

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gilangmgm/' },
  { label: 'GitHub', href: 'https://github.com/gilangmgm98' },
  { label: 'Instagram', href: 'https://www.instagram.com/gilangmgm' },
] as const
