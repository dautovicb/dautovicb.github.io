const ulov = import.meta.glob('../../assets/ulov/*', { eager: true });
const desqly = import.meta.glob('../../assets/desqly/*', { eager: true });
const nebulora = import.meta.glob('../../assets/nebulora/*', { eager: true });
const vaktija = import.meta.glob('../../assets/vaktija/*', { eager: true });
const interdimensional = import.meta.glob('../../assets/interdimensional/*', { eager: true });
const intranet = import.meta.glob('../../assets/intranet/*', { eager: true });
const aicar = import.meta.glob('../../assets/aicar/*', { eager: true });
const phoneanalyzer = import.meta.glob('../../assets/phoneanalyzer/*', { eager: true });
const freelance = import.meta.glob('../../assets/freelance/*', { eager: true });
function globToMedia(globResult) {
  return Object.entries(globResult).map(([path, mod]) => {
    const ext = path.split('.').pop().toLowerCase();
    const type = 'mp4'.includes(ext) ? 'video' : 'image';
    return { type, src: mod.default };
  });
}

const projects = [
  {
    id: "ulov",
    year: 2026,
    role: "ai product",
    categories: ["fullstack", "mlai"],
    name: "Ulov.ba",
    tagline: "An AI deal-finder for the Bosnian secondhand market.",
    status: "active",
    tech: ["React", "FastAPI", "PostgreSQL", "XGBoost", "BERTić", "RF-DETR","ConvNeXt"],
    links: [
    ],
    description:
      "ulov.ba analyzes iPhone listings on OLX.ba then turns each messy listing into structured data and a fair-price estimate. The end goal is simple: surface the underpriced phones before anyone else does and find the best deal possible.",
    media: globToMedia(ulov),
    problems: [
      {
        q: "How do you train a pricing model when most listings never reveal what they sold for?",
        a: "I borrowed the intuition from survival analysis. Listings that sell fast are strong ground truth; listings that expire unsold are upper bounds - they tell you what the market refused, not what it paid. XGBoost weights the two differently, so the model learns from rejections as much as from sales.",
      },
      {
        q: "How do you extract structured data from chaotic free-text listings written in Bosnian?",
        a: "Just use an LLM. Right? No. Fine-tuned BERTić - a BERT pre-trained on South-Slavic text - with a custom nine-label NER schema (brand, model, memory, battery, condition, etc.) on hand-annotated listings. Free-form Bosnian goes in, queryable fields come out. This is a more preferable approach because it's both faster and more accurate while being cheaper to run.",
      },
    ],
  },
  {
    id: "nebulora",
    year: 2025,
    role: "microfrontend architecture",
    categories: ["fullstack"],
    name: "Nebulora",
    tagline: "Microfrontend-based CRM with a suite of integrated tools.",
    status: "shipped",
    tech: ["Angular", "Native Federation", ".NET", "EF Core", "PostgreSQL", "Docker"],
    links: [
    ],
    description:
      "A modular CRM platform that breaks monolithic complexity into independently-deployable mini-apps using Angular Native Federation. This design isolates complex domains like desk reservation systems and full-scale content management into completely independent, highly maintainable deployment units.",
    media: globToMedia(nebulora),
    problems: [
     
    ],
  },
  {
    id: "desqly",
    year: 2025,
    role: "full-stack development",
    categories: ["fullstack"],
    name: "Desqly",
    tagline: "Desk reservation platform with interactive floor plans.",
    status: "shipped",
    tech: ["React", ".NET", "PostgreSQL", "Docker", "Keycloak"],
    links: [

    ],
    description:
      "Desqly is a desk reservation platform for hybrid offices that need a simple way to coordinate shared desks and team seating. It combines role-based access, user management, an interactive floor plan, and real-time booking so teams can reserve spaces without overlap. \n\nAuthentication runs through Keycloak, handling role-based access without building an auth system from scratch.",
    media: globToMedia(desqly),
    problems: [
      
      
    ],
  },
  
  {
    id: "intranet",
    year: 2025,
    role: "full-stack development",
    categories: ["fullstack"],
    name: "Intranet",
    tagline: "An internal blogging app built as a service within NebuloraCRM.",
    status: "shipped",
    tech: ["Angular", "Native Federation", ".NET", "EF Core", "PostgreSQL", "Docker"],
    links: [
    ],
    description: "A company intranet built as a service within Nebulora CRM - employees post updates and internal articles, all secured through Nebulora's shared auth service. The interesting part wasn't the blogging feature itself, but making it play well inside a multi-service system: token validation across services, shared auth state, and gRPC communication between Core and the rest of the platform. \n\nI built the frontend using Angular and backend in .NET, with EF Core and PostgreSQL for data persistence. The service is deployed as a microfrontend within Nebulora's Native Federation architecture.",
    media: globToMedia(intranet),
    problems: [
    ],
  },
  {
    id: "vaktija",
    year: 2025,
    role: "full-stack development",
    categories: ["fullstack"],
    name: "Vaktija",
    tagline: "Offline prayer-times display for mosque TVs, built with React Native.",
    status: "shipped",
    tech: ["React Native tvOS"],
    links: [],
    description:
      "An offline prayer-times table app for mosques, designed specifically for Android TV. It displays accurate prayer times based on the mosque's location with a clean, legible interface readable from across the room.",
    media: globToMedia(vaktija),
    problems: [
      
    ],
  },
  {
    id: "interdimensional",
    year: 2020,
    role: "game development",
    categories: ["gamedev"],
    name: "Interdimensional",
    tagline: "A puzzle game where shifting between 2D and 3D is the mechanic. Loved by more than 10k players. Built at 14.",
    status: "shipped",
    tech: ["Unity", "C#", "Photoshop", "Audacity"],
    links: [],
    description:
      "A minimalist puzzle game built around one deceptively simple mechanic - shifting between 2D and 3D to reach the goal. What looks impossible in 3D might be trivially flat in 2D, and vice versa. I built everything solo: mechanics, level design, art, and sound. It reached over 10k players on the Play Store organically, with no marketing.",
    media: globToMedia(interdimensional),
    problems: [
      {
        q: "How do you move a game object between 2D and 3D without breaking physics or rendering?",
        a: "Each object is represented in 2 vectors: a 3D transform and a 2D transform. The 2D transform is projected into the 3D world space when the player switches dimensions, so the object appears to move seamlessly between the two spaces without any discontinuity in physics or rendering.",
      },
    ],
  },
  {
    id: "phoneanalyzer",
    year: 2026,
    role: "machine learning pipeline",
    categories: ["mlai"],
    name: "Smartphone Analyzer",
    tagline: "ML pipeline for extracting data from a used smartphone listing.",
    status: "shipped",
    tech: ["Python", "PyTorch", "Pandas", "NumPy", "Bertic", "RF-DETR", "ConvNeXtV2"],
    links: [
      { label: "github", href: "https://github.com/dautovicb/phoneanalyzer" },
    ],
    description:
      "Smartphone Analyzer takes a smartphone listing (its photos, title, and description) and extracts the features a buyer actually cares about - model, storage, battery health, packaging and red flags such as a cracked screen, iCloud lock, non-functioning parts and more. It combines Computer Vision and NLP into a single pipeline that turns a messy listing into one clean, structured record.",
    media: globToMedia(phoneanalyzer),
    problems: [
    ],
  },
  
  {
    id: "mlagents",
    year: 2025,
    role: "reinforcement learning",
    categories: ["mlai", "gamedev"],
    name: "AI Learns to Drive a Manual Car",
    tagline: "Reinforcement learning agent that drives a manual car with gears, clutch, and everything else.",
    status: "shipped",
    tech: ["Unity", "ML-Agents", "C#", "Reinforcement Learning"],
    links: [],
    description:
      "I used Unity ML-Agents to train an agent to drive a realistic manual car with a full gearbox and clutch. The project was an exploration of RL in a high-dimensional, continuous control environment - and the agent eventually learned to shift gears smoothly and stay on track.",
    media: globToMedia(aicar),
    problems: [
    ],
  },
  {
    id: "freelance-gamedev",
    year: 2024,
    role: "game development",
    categories: ["gamedev"],
    name: "Freelance Games",
    tagline: "A couple of games I made for clients.",
    status: "shipped",
    tech: ["Unity", "C#"],
    links: [],
    description:
      "A collection of games built for clients and independent release, showcasing a strong foundation in software engineering principles and performance optimization. This portfolio demonstrates an ability to take ambiguous concepts and ship production-ready, highly optimized code across the full development lifecycle. \n\nKey Engineering & Technical Achievements\n • Object-Oriented Design & Architecture: Engineered scalable, decoupled codebases using design patterns to manage complex game loops, UI states, and event systems.\n\n • Performance Optimization: Profiled and optimized memory management, object pooling, and rendering pipelines to maintain stable frame rates (60+ FPS) across target platforms.\n\n • Resourcefulness & Shipping: Managed full-lifecycle development - from initial logic prototyping to final deployment and bug tracking.",
    media: globToMedia(freelance),
    problems: [
    ],
  },
  /*
  {
    id: "seatreasuredefense",
    year: 2023,
    role: "game development",
    categories: ["gamedev"],
    name: "guardian of the treasure",
    tagline: "A sea-themed tower defense game, delivered for a client in hours.",
    status: "shipped",
    tech: ["Unity", "C#", "Blender"],
    links: [],
    description:
      "Built for a client on Upwork as a rapid prototype to anchor a larger project. A tower defense game where you place different tower types to defend a treasure from waves of sea enemies. Delivered as a functional, polished starting point under a tight deadline.",
    media: globToMedia(seatreasuredefense),
    problems: [
      {
        q: "How do you design a wave system that scales difficulty without feeling arbitrary?",
        a: "Parameterised each wave as a budget — total enemy health points — allocated across enemy types via a weighted distribution that shifts toward tougher variants as rounds increase. The designer tunes the budget curve, not individual waves, which makes scaling predictable and the difficulty feel earned.",
      },
      {
        q: "How do you deliver a complete, presentable game prototype in a matter of hours?",
        a: "Scoped ruthlessly to the one mechanic the client needed validated — tower placement and enemy pathing — and used Unity's asset store for everything visual. All code time went to the systems, not the scaffolding.",
      },
    ],
  },
  
  {
    id: "projectalpha",
    year: 2025,
    role: "game development",
    categories: ["gamedev"],
    name: "project alpha",
    tagline: "A desktop fitness companion with real-time body transformation via Blend Shapes.",
    status: "shipped",
    tech: ["Unity", "C#", "Blender", "Windows API"],
    links: [],
    description:
      "Project Alpha lives in the corner of your desktop while you work. It visualises weight-loss progress in real time, continuously morphing a 3D character as you log progress. The most technically interesting part was engineering a borderless, transparent, always-on-top window by dropping into native Windows APIs from within Unity.",
    media: globToMedia(projectalpha),
    problems: [
      {
        q: "How do you drive continuous body shape transformation in real time?",
        a: "Made two models with the same bone structure - one fit and the other fat. Used blend shapes to smoothly transition from one to the other over time.",
      },
    ],
  },
  {
    id: "endlessrunner",
    year: 2024,
    role: "game development",
    categories: ["gamedev"],
    name: "endless runners",
    tagline: "Multiple endless runner games for a client.",
    status: "shipped",
    tech: ["Unity", "C#"],
    thumbnail: null,
    links: [],
    description:
      "Developed a highly reusable core codebase to rapidly deploy mechanics, procedural obstacle generation, and state management across multiple titles. Focused heavily on memory optimization and garbage collection management in Unity to ensure a locked 60 FPS across low-end mobile devices.",
    media: globToMedia(endlessrunner),
    problems: [
    ],
  },
  
  {
    id: "bakery",
    year: 2024,
    role: "game development",
    categories: ["gamedev"],
    name: "bakery",
    tagline: "Multiple endless runner games for a client.",
    status: "shipped",
    tech: ["Unity", "C#"],
    thumbnail: null,
    links: [],
    description:
      "Developed a highly reusable core codebase to rapidly deploy mechanics, procedural obstacle generation, and state management across multiple titles. Focused heavily on memory optimization and garbage collection management in Unity to ensure a locked 60 FPS across low-end mobile devices.",
    media: globToMedia(bakery),
    problems: [
    ],
  },
  */
];

export default projects;
