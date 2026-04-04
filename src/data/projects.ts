export type ProjectLink = {
  label: string
  href: string
}

export type ProjectMedia =
  | string
  | {
      src: string
      type?: 'image' | 'video'
      poster?: string
      label?: string
    }

export type Project = {
  slug: string
  title: string
  year: string
  category: string
  thumbnail: string
  summary: string
  description: string
  media: ProjectMedia[]
  stack: string[]
  links: ProjectLink[]
}

export const profile = {
  name: 'Beriz Dautović',
  role: 'ML Engineer',
  shortBio:
    'Data Science and AI student with extensive software development experience, focused on applying AI to solve meaningful problems.',
}

export type Education = {
  degree: string
  institution: string
  year: string
  note?: string
}

export const education: Education[] = [
    
  {
    degree: 'BSc, Data Science and AI',
    institution: 'ETF University of Sarajevo',
    year: '2025-2028',
  },
  {
    degree: 'Computer Science and Informatics',
    institution: 'High School of Electrical Engineering Sarajevo',
    year: '2021-2025',
  },
]

export const projects: Project[] = [
  {
    slug: 'dealsniper',
    title: 'Smartphone Deal Finder',
    year: '2026',
    category: 'Artificial Intelligence',
    thumbnail: '/thumbnails/workinprogress.jpg',
    summary:
      'An intelligent tool that leverages Computer Vision and NLP to evaluate second-hand smartphone listings and find the best deals.',
    description:
      'Currently working on an open source module for analyzing images of a listed smartphone. The module uses a combination of RF-DETR for object detection and ConvNeXtV2 for detecting cracks.',
      media: [
      
    ],
    stack: ['Python', 'PyTorch', 'RF-DETR', 'ConvNeXtV2', 'OpenCV'],
    links: [
      { label: 'Repository', href: 'https://github.com/dautovicb/phoneanalyze' },
    ],
  },
  {
    slug: 'desqly',
    title: 'Desk Reservation Platform',
    year: '2025',
    category: 'Web Application',
    thumbnail: '/thumbnails/desqly.png',
    summary:
      'Fullstack web application for managing desk reservations with interactive floor plans.',
    description:
      'Desqly is a fullstack reservation platform designed for hybrid offices that need a simple way to coordinate shared desks and team seating. The application combines role-based access, user management, an interactive floor plan experience, and real-time booking so teams can reserve spaces confidently without overlap. I built the end-to-end product from authentication and API design to UI.',
    media: [
      '/thumbnails/desqly.png',
    ],
    stack: ['ReactJS', '.NET', 'PostgreSQL', 'Docker', 'Keycloak'],
    links: [
      { label: 'Website', href: 'https://desqly.app/' },
    ],
  },
  {
    slug: 'nebulora',
    title: 'Nebulora CRM',
    year: '2025',
    category: 'Web Application',
    thumbnail: '/thumbnails/nebulora.png',
    summary:
      'Microfrontend-based CRM including user management, internal bloging, desk reservations and more.',
    description:
      'This project is modular CRM platform designed to break down monolithic complexities into scalable mini-apps by leveraging a Microfrontend architecture. The core of the platform is built using Angular Native and Module federation.',
    media: [
      '/thumbnails/nebulora.png',
    ],
    stack: ['Angular', 'Native Federation', '.NET', 'EF Core', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'Website', href: 'https://desqly.app/' },
    ],
  },
  {
    slug: 'vaktija',
    title: 'Prayer Times Table (Vaktija)',
    year: '2025',
    category: 'Android tvOS',
    thumbnail: '/thumbnails/vaktija.png',
    summary:
      'Offline prayer times table app for mosques built with React Native for Android TV.',
    description:
      'Built an offline prayer times table app for mosques using React Native, designed specifically for Android TV. The app features a clean and intuitive interface that displays accurate prayer times based on the mosque\'s location, along with customizable settings for notifications and display preferences.',
      media: [
      
    ],
    stack: [],
    links: [
    ],
  },
]

export const projectCount = projects.length
