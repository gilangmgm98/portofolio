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
  // Side projects
  {
    type: 'side',
    title: 'Kasir Digital — SaaS POS for UMKM',
    description: 'Multi-tenant SaaS point-of-sale for Indonesian small businesses. Supports multi-outlet, inventory, QRIS/Midtrans payments, staff RBAC, PDF reports, and a hidden super-admin panel. Three subscription tiers with 14-day trial.',
    tags: ['NestJS', 'Next.js', 'Prisma', 'PostgreSQL', 'Redis', 'Midtrans'],
    liveUrl: 'https://kasirdigital.online/',
  },
  {
    type: 'side',
    title: 'Kedai SimpTeng — Restaurant Website',
    description: 'Branding and showcase website for a Padang restaurant chain with 3 branches in East Jakarta. Features menu browsing with category filters, GoFood/ShopeeFood/GrabFood order integration, and embedded Google Maps per branch.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://kedaisimpteng.com',
  },
  {
    type: 'side',
    title: 'Intekmas — Company Profile',
    description: 'Company profile website for Intekmas, built to establish their digital presence and showcase their business identity.',
    tags: ['Web', 'Company Profile'],
    liveUrl: 'https://intekmas.com',
  },
  {
    type: 'side',
    title: 'Private Life of Us',
    description: 'A personal love website gifted to my partner as a birthday surprise — a private digital keepsake built with care.',
    tags: ['Personal', 'Web'],
    githubUrl: 'https://github.com/gilangmgm98/privatelifeofus',
  },
  {
    type: 'side',
    title: 'Printbook — Digital Printing SaaS',
    description: 'Upcoming SaaS platform for digital printing businesses still running on manual workflows. Designed to digitize order management, production tracking, and customer communication in one system.',
    tags: ['SaaS', 'NestJS', 'Next.js', 'In Progress'],
  },
  {
    type: 'side',
    title: 'Portfolio Website',
    description: 'This portfolio — built with Next.js, GSAP, Three.js, and Tailwind CSS. Dark Cosmos theme with full-page snap scroll and immersive particle animations.',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Three.js', 'Tailwind'],
    githubUrl: 'https://github.com/gilangmgm98/portofolio',
    isCurrentSite: true,
  },
]
