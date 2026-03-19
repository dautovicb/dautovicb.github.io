export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  title: string
  year: string
  category: string
  thumbnail: string
  summary: string
  challenge: string
  approach: string
  impact: string[]
  stack: string[]
  links: ProjectLink[]
}

export const profile = {
  name: 'Beriz Dautovic',
  role: 'ML Engineer',
  shortBio:
    'Data Science and AI student with extensive software development experience, focused on applying AI to solve meaningful problems.',
}

export type Education = {
  degree: string
  institution: string
  year: string
  note: string
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
    slug: 'multilingual-support-copilot',
    title: 'Multilingual Support Copilot',
    year: '2025',
    category: 'LLM Orchestration',
    thumbnail: '/thumbnails/llm-copilot.svg',
    summary:
      'AI assistant that triages, translates, and drafts support responses across 11 languages.',
    challenge:
      'Rising ticket volume and inconsistent quality in non-English responses caused slower SLAs.',
    approach:
      'Built retrieval-augmented routing with language detection, intent-aware prompts, and confidence gates for human handoff.',
    impact: [
      '34% reduction in first-response time',
      'CSAT improved from 4.1 to 4.6',
      '72% auto-draft acceptance by human agents',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Architecture', href: '#' },
    ],
  },
  {
    slug: 'predictive-maintenance-vision',
    title: 'Predictive Maintenance Vision System',
    year: '2024',
    category: 'Computer Vision',
    thumbnail: '/thumbnails/vision-maintenance.svg',
    summary:
      'Defect detection pipeline combining image embeddings and time-series telemetry for failure forecasting.',
    challenge:
      'Unplanned downtime was costly and rule-based alarms could not reliably detect early failure patterns.',
    approach:
      'Designed a two-stage model: visual anomaly scoring plus temporal risk forecasting, with drift monitoring and retraining.',
    impact: [
      '26% fewer unplanned maintenance events',
      '18-day average early warning horizon',
      'Reduced false alarms by 41%',
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
    challenge:
      'Batch models caught fraud too late, and analysts lacked transparent reasoning for high-risk decisions.',
    approach:
      'Implemented feature-store online inference, calibrated boosting models, SHAP reason codes, and active-learning feedback loops.',
    impact: [
      '17% increase in fraud capture rate',
      'Decision latency below 90ms at p95',
      'Review workload reduced by 23%',
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
    challenge:
      'Highly unstructured medical notes made reliable downstream analysis difficult.',
    approach:
      'Fine-tuned domain models with weak supervision and ontology constraints, plus human-in-the-loop correction tooling.',
    impact: [
      '91% F1 on key entity extraction',
      'Documentation abstraction time cut by 38%',
      'Enabled near real-time reporting pipelines',
    ],
    stack: ['Transformers', 'spaCy', 'Snorkel', 'Airflow', 'BigQuery'],
    links: [
      { label: 'Technical Writeup', href: '#' },
      { label: 'Dataset Notes', href: '#' },
    ],
  },
]

export const projectCount = projects.length
