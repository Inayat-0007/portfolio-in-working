export const PERSONAL = {
  name: "Mohammad Inayat Hussain",
  displayName: "INAYAT HUSSAIN",
  firstName: "INAYAT",
  lastName: "HUSSAIN",
  monogram: "IH",
  title: "Software Engineer | Full Stack & GenAI Specialist",
  tagline: "Software Engineer — Full Stack & GenAI Specialist",
  subTagline: "Building Scalable Web Solutions & Intelligent AI Systems",
  bio: [
    "I'm Inayat — a Software Engineer who builds at the intersection of Full Stack Development and Generative AI.",
    "From AI-powered recommendation engines to production SaaS platforms, I ship products that solve real problems.",
    "Currently pursuing my MCA while actively building with LLMs, FastAPI, and the MERN stack.",
    "I believe in code that's clean, systems that scale, and AI that actually helps people.",
  ],
  email: "mohammadinayathussain5@gmail.com",
  location: "Hyderabad, Telangana, India",
  locationShort: "Hyderabad, India",
  availability: "Open to Opportunities — Freelance & Full-Time",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/Inayat-0007",
    linkedin: "https://linkedin.com/in/inayat-hussain-105a8834b",
    email: "mailto:mohammadinayathussain5@gmail.com",
  },
};

export const STATS = [
  { value: 4, suffix: "+", label: "Production Projects Shipped" },
  { value: 1, suffix: "", label: "Hackathon (AMD Slingshot)" },
  { value: 5, suffix: "+", label: "Certifications & Awards" },
  { value: 2, suffix: "+", label: "Years Building" },
];

export const IDENTITY_BLOCKS = [
  { icon: "brain" as const, label: "GenAI & LLMs", detail: "Gemini, RAG, AI Agents" },
  { icon: "code" as const, label: "Full Stack Dev", detail: "MERN, FastAPI, Python" },
  { icon: "shield" as const, label: "Security-First", detail: "Rate Limiting, XSS, Production-grade" },
  { icon: "rocket" as const, label: "Builder & Shipper", detail: "Hackathons to SaaS" },
];

export const SKILL_CATEGORIES = [
  {
    icon: "sparkles" as const,
    category: "AI & Automation",
    skills: ["Generative AI", "LLMs (Gemini 2.0 Flash)", "AI Agents", "RAG", "Query Expansion", "n8n Automation"],
  },
  {
    icon: "terminal" as const,
    category: "Languages",
    skills: ["Python", "JavaScript (ES6+)", "C/C++", "SQL"],
  },
  {
    icon: "layers" as const,
    category: "Frameworks & Runtime",
    skills: ["Node.js", "Express.js", "React", "Redux", "FastAPI"],
  },
  {
    icon: "wrench" as const,
    category: "Developer Tools",
    skills: ["GitHub", "VS Code", "Agile Methodology", "RESTful APIs", "Linux"],
  },
  {
    icon: "database" as const,
    category: "Data & Cloud",
    skills: ["MongoDB", "Pandas", "NumPy", "Hardware-Software Integration"],
  },
  {
    icon: "lock" as const,
    category: "Security",
    skills: ["Rate Limiting (Slowapi)", "XSS Sanitization (Bleach)", "Production-grade hardening"],
  },
];

export const ALL_SKILLS = [
  "Python", "JavaScript", "React", "Node.js", "Express.js", "FastAPI",
  "MongoDB", "Redux", "C/C++", "SQL", "Generative AI", "LLMs",
  "Gemini", "RAG", "AI Agents", "n8n", "Pandas", "NumPy",
  "GitHub", "Linux", "REST APIs", "Agile", "Slowapi", "Bleach",
  "Sentence-Transformers", "Hugging Face", "TypeScript", "Next.js",
];

export const TECH_TICKER = [
  "React", "Node.js", "Python", "GenAI", "FastAPI", "MongoDB",
  "GSAP", "Next.js", "LLMs", "C++", "Redux", "Agile",
];

export const SKILL_ICONS: Record<string, string> = {
  "Python": "devicon-python-plain",
  "JavaScript (ES6+)": "devicon-javascript-plain",
  "JavaScript": "devicon-javascript-plain",
  "React": "devicon-react-original",
  "Node.js": "devicon-nodejs-plain",
  "Express.js": "devicon-express-original",
  "C/C++": "devicon-cplusplus-plain",
  "C++": "devicon-cplusplus-plain",
  "MongoDB": "devicon-mongodb-plain",
  "Redux": "devicon-redux-original",
  "TypeScript": "devicon-typescript-plain",
  "Next.js": "devicon-nextjs-plain",
  "FastAPI": "devicon-fastapi-plain",
  "SQL": "devicon-azuresqldatabase-bg",
  "Pandas": "devicon-pandas-original",
  "NumPy": "devicon-numpy-original",
  "GitHub": "devicon-github-original",
  "VS Code": "devicon-vscode-plain",
  "Linux": "devicon-linux-plain",
  "Agile Methodology": "devicon-jira-plain",
};

export const PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "SHL Assessment Recommender",
    tags: ["GenAI", "FastAPI", "Semantic Search", "LLM"],
    description:
      "A semantic recommendation engine powered by Gemini 2.0 Flash & Sentence-Transformers (all-MiniLM-L6-v2). Features query expansion, production-grade security with Slowapi rate limiting & Bleach XSS sanitization.",
    image: "/images/project-shl.webp",
    link: "https://github.com/Inayat-0007",
    period: "March 2026",
    color: "#00f0ff",
  },
  {
    id: 2,
    number: "02",
    title: "SerenitySphere",
    tags: ["AI Wellness", "Hugging Face", "3D Visuals", "Automation"],
    description:
      "An AI-powered mental wellness platform with mood detection using Hugging Face Inference API, personalized relaxation journeys through gentle automation, and immersive 3D animated visuals.",
    image: "/images/project-serenity.webp",
    link: "https://github.com/Inayat-0007",
    period: "May 2025 – Present",
    color: "#8b5cf6",
  },
  {
    id: 3,
    number: "03",
    title: "Shield Ryzen V2",
    tags: ["C++", "Hardware Optimization", "AMD Hackathon", "Systems"],
    description:
      "A low-level utility built for the AMD Slingshot Hackathon to maximize CPU throughput and system-level efficiency for Ryzen chipsets. Pure C++ hardware-software integration.",
    image: "/images/project-shield.webp",
    link: "https://github.com/Inayat-0007",
    period: "2025",
    color: "#f59e0b",
  },
  {
    id: 4,
    number: "04",
    title: "Jai K Bio Agritake",
    tags: ["MERN Stack", "SaaS", "Corporate Platform", "Mobile-Responsive"],
    description:
      "A mobile-responsive SaaS platform for a bio-fertilizer company to manage organic product inventories. Full MERN stack with production SaaS architecture.",
    image: "/images/project-agritake.webp",
    link: "https://github.com/Inayat-0007",
    period: "2025",
    color: "#22c55e",
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    period: "2024 — 2026",
    type: "education" as const,
    role: "Master of Computer Applications (MCA)",
    company: "LNCT, Bhopal",
    description:
      "Advanced studies in software engineering, AI, and system design. Led academic seminars on real-world AI agent implementations.",
    tech: ["AI/ML", "Software Engineering", "Seminar Leadership"],
  },
  {
    id: 2,
    period: "06/2022 — 12/2022",
    type: "work" as const,
    role: "Web Developer",
    company: "ATI Group of Technologies, Delhi",
    description:
      "Engineered backend services and RESTful APIs for an Account Management system using Node.js. Collaborated in Agile environment to optimize client data availability.",
    tech: ["Node.js", "REST APIs", "Agile"],
  },
  {
    id: 3,
    period: "2020 — 2023",
    type: "education" as const,
    role: "Bachelor of Computer Applications (BCA)",
    company: "SVIT, Balaghat",
    description:
      "GPA: 8.46 (79.21%). Strong foundation in programming, data structures, algorithms, and web technologies.",
    tech: ["GPA 8.46", "DSA", "Web Technologies"],
  },
  {
    id: 4,
    period: "Completed",
    type: "education" as const,
    role: "Intermediate — PCM",
    company: "MCS Public School",
    description:
      "Physics, Chemistry, Mathematics. Built analytical and problem-solving foundations.",
    tech: ["Physics", "Chemistry", "Mathematics"],
  },
];

export const CERTIFICATIONS = [
  {
    badge: "🏆",
    badgeColor: "#f59e0b",
    title: "1 Million Prompters",
    issuer: "Dubai Centre for Artificial Intelligence",
    date: "Oct 2025",
    featured: true,
    description: "Recognized among 1 Million global AI prompters by the Dubai Centre for Artificial Intelligence.",
    skills: ["Generative AI", "Prompt Engineering"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_1m_prompters.png",
  },
  {
    badge: "🤖",
    badgeColor: "#8b5cf6",
    title: "AI with Python (Internship)",
    issuer: "SkillForge",
    date: "May 2025",
    featured: false,
    description: "Completed comprehensive internship focusing on AI models using Python.",
    skills: ["Python", "AI", "Machine Learning"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_ai_internship.png",
  },
  {
    badge: "💻",
    badgeColor: "#00f0ff",
    title: "Python (Basic) & React JS (Basic)",
    issuer: "HackerRank",
    date: "March 2025",
    featured: false,
    description: "Verified skills in Python and React.js basics.",
    skills: ["Python", "React JS"],
    link: "https://www.hackerrank.com/profile/mohammadinayath1",
    image: "/images/cert_hackerrank.png",
  },
  {
    badge: "🌐",
    badgeColor: "#22c55e",
    title: "MERN Stack Development",
    issuer: "upGrad KnowledgeHut",
    date: "Jan 2023",
    featured: false,
    description: "Comprehensive training and certification in full stack MERN development.",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_mern_stack.png",
  },
  {
    badge: "🎤",
    badgeColor: "#f59e0b",
    title: "Seminar Leadership — AI Agents",
    issuer: "LNCT, Bhopal",
    date: "Academic",
    featured: false,
    description: "Led academic seminars on the implementation of real-world AI agents.",
    skills: ["Leadership", "AI Agents", "Public Speaking"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_seminar.png",
  },
];

export const CERT_MARQUEE = [
  "1 Million Prompters",
  "HackerRank Python",
  "MERN Stack Certified",
  "AI with Python",
  "AMD Slingshot Hackathon",
  "React JS Certified",
  "Seminar Leadership",
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT_CTA = {
  heading: "Let's Build Something Together",
  subtext: "Got a project, idea, or opportunity? I'm always excited to talk tech and build.",
};

export const FOOTER = {
  copyright: "© 2026 Inayat Hussain. Built with passion & too much chai ☕",
};
