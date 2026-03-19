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
      '/thumbnails/llm-copilot.svg',
      '/thumbnails/vision-maintenance.svg',
    ],
    stack: ['ReactJS', '.NET', 'PostgreSQL', 'Docker', 'Keycloak'],
    links: [
      { label: 'Website', href: 'https://desqly.app/' },
    ],
  },
  {
    slug: 'predictive-maintenance-vision',
    title: 'Prayer Times Table (Vaktija)',
    year: '2025',
    category: 'Android tvOS',
    thumbnail: '/thumbnails/vision-maintenance.svg',
    summary:
      'Offline prayer times table app for mosques built with React Native for Android TV.',
    description:
      'This project focuses on reducing unplanned machine downtime by combining computer vision and temporal forecasting in a single monitoring workflow. The system ingests production-line imagery and telemetry streams, computes anomaly signals from visual features, and feeds them into a risk model that estimates short- and mid-term failure probability. I designed data preprocessing, model training, and deployment packaging for low-latency inference, then added drift checks and retraining triggers to keep quality stable as equipment behavior changed. The result is a practical maintenance assistant that surfaces early warnings with explainable indicators rather than opaque alarms.',
    media: [
      '/thumbnails/vision-maintenance.svg',
      '/thumbnails/desqly.png',
      '/thumbnails/fraud-ranking.svg',
    ],
    stack: ['PyTorch', 'OpenCV', 'ONNX Runtime', 'Kafka', 'Azure ML'],
    links: [
      { label: 'Demo Video', href: '#' },
      { label: 'Model Card', href: '#' },
    ],
  },
  {
    slug: 'real-time-fraud-ranking',
    title: 'Real-Time Fraud Risk Ranking',
    year: '2023',
    category: 'Applied ML',
    thumbnail: '/thumbnails/fraud-ranking.svg',
    summary:
      'Low-latency risk-scoring service for payment streams with explainability traces for analysts.',
    description:
      'The fraud ranking service was built to score transactions in real time and prioritize analyst review queues with clear decision evidence. I implemented a low-latency inference path backed by online features, calibrated risk outputs, and explanation payloads so investigators could quickly understand why a payment was flagged. The architecture supports continuous feedback collection from analyst actions, making it possible to retrain and improve the model without disrupting production throughput. The overall system balances detection performance and operational usability, which is critical in environments where false positives directly impact customer experience.',
    media: [
      '/thumbnails/fraud-ranking.svg',
      '/thumbnails/clinical-nlp.svg',
      '/thumbnails/llm-copilot.svg',
    ],
    stack: ['XGBoost', 'Redis', 'Feast', 'Kubernetes', 'Prometheus'],
    links: [
      { label: 'API Reference', href: '#' },
      { label: 'Evaluation Report', href: '#' },
    ],
  },
  {
    slug: 'clinical-text-structuring',
    title: 'Clinical Text Structuring Engine',
    year: '2022',
    category: 'NLP',
    thumbnail: '/thumbnails/clinical-nlp.svg',
    summary:
      'Transformer NLP pipeline extracting conditions, medications, and events from clinical notes.',
    description:
      'The clinical text structuring engine converts unstructured medical documentation into normalized, analysis-ready records for downstream reporting and decision support. I developed an NLP pipeline that combines transformer-based extraction with ontology-aware post-processing to capture entities such as conditions, medications, and clinically relevant events. To improve reliability in domain-specific language, the workflow includes weak supervision signals and a review interface that allows fast correction of uncertain outputs. This project demonstrates how machine learning can fit into healthcare data operations in a way that is measurable, maintainable, and sensitive to real-world documentation variability.',
    media: [
      '/thumbnails/clinical-nlp.svg',
      '/thumbnails/vision-maintenance.svg',
      '/thumbnails/fraud-ranking.svg',
    ],
    stack: ['Transformers', 'spaCy', 'Snorkel', 'Airflow', 'BigQuery'],
    links: [
      { label: 'Technical Writeup', href: '#' },
      { label: 'Dataset Notes', href: '#' },
    ],
  },
]

export const projectCount = projects.length
