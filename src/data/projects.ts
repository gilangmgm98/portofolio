import type { Project } from '@/types'

export const projects: Project[] = [
  // Work projects — no links, general description only
  {
    type: 'work',
    title: 'MyTelkomsel Backend Services',
    description: 'REST API services powering one of Indonesia\'s largest telco super apps. Focus on reliability, validation, and consistent API contracts.',
    tags: ['TypeScript', 'NestJS', 'MySQL', 'REST API'],
  },
  {
    type: 'work',
    title: 'Centralized Channel Integration Platform',
    description: 'Unified platform aggregating 4 communication channels — WhatsApp, voice (PBX), and more — into a single backend system.',
    tags: ['NestJS', 'Asterisk PBX', 'WhatsApp API', 'MySQL'],
  },
  {
    type: 'work',
    title: 'AI & Data Product Backend',
    description: 'High-performance backend for AI-driven data products. Achieved ~20% processing time improvement via ORM optimization and profiling.',
    tags: ['TypeScript', 'NestJS', 'Sequelize', 'MySQL'],
  },
  // Side projects — update with real data later
  {
    type: 'side',
    title: 'Portfolio Website',
    description: 'This portfolio — built with Next.js, GSAP, Three.js, and Tailwind CSS. Dark Cosmos theme with immersive animations.',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Three.js', 'Tailwind'],
    githubUrl: 'https://github.com/gilangmgm98/portofolio',
    liveUrl: 'https://gilangmgm.vercel.app',
  },
]
