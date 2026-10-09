// All site copy and data lives here, so updating the portfolio never means touching components.

const SHIPLOG = "https://rakshithraj14.github.io/shiplog"

export const PROFILE = {
  name: "Rakshith Raj M",
  alias: "Asura",
  role: "MLOps & AI Engineer",
  location: "Bengaluru, India",
  timeZone: "Asia/Kolkata",
  email: "rakshithraj14112001@gmail.com",
  resume: "/Rakshith_Raj_M_Resume.pdf",
  blog: `${SHIPLOG}/`,
  now: { title: "Software Developer (SDE)", company: "GPUNET", href: "https://gpu.net" },
}

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Rakshithraj14" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rakshith-raj-m-48344b2aa" },
  { label: "Hugging Face", href: "https://huggingface.co/Asura-14" },
  { label: "Docker Hub", href: "https://hub.docker.com/u/rakshithraj" },
  { label: "Hashnode", href: "https://hashnode.com/@rakshithraj" },
  { label: "npm", href: "https://www.npmjs.com/~rakshithraj" },
]

export type Category = "ai" | "web" | "tool" | "web3"

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "web", label: "Web apps" },
  { id: "tool", label: "Tools" },
  { id: "web3", label: "Web3" },
]

export type Project = {
  id: string
  title: string
  year: string
  status: "Live" | "Completed"
  categories: Category[]
  skills: string[]
  description: string
  link: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: "supportforge",
    title: "SupportForge",
    year: "2026",
    status: "Completed",
    categories: ["ai", "tool"],
    skills: ["Python", "FastAPI", "LangGraph", "Ollama", "Qdrant", "PostgreSQL"],
    description:
      "RAG-powered Telegram support bot. LangGraph orchestrates locally hosted LLMs over Qdrant vector search, with full observability through Prometheus, Grafana and Langfuse.",
    link: `${SHIPLOG}/blog/supportforge/`,
    featured: true,
  },
  {
    id: "credit-card-fraud",
    title: "Fraud Detection MLOps",
    year: "2026",
    status: "Completed",
    categories: ["ai"],
    skills: ["Python", "Scikit-learn", "MLflow", "DVC", "FastAPI"],
    description:
      "End-to-end pipeline for a severely imbalanced fraud dataset. Experiments tracked in MLflow and DVC, served from a Dockerized FastAPI inference API.",
    link: `${SHIPLOG}/blog/credit-card-fraud-mlops/`,
    featured: true,
  },
  {
    id: "neural-ids",
    title: "Neural IDS",
    year: "2025",
    status: "Completed",
    categories: ["ai"],
    skills: ["Python", "TensorFlow", "CNN-LSTM", "Prometheus", "Grafana"],
    description:
      "Hybrid CNN-LSTM intrusion detection that flags DDoS traffic in real time, monitored with Prometheus and Grafana.",
    link: `${SHIPLOG}/blog/neural-ids/`,
    featured: true,
  },
  {
    id: "container-lab",
    title: "container-lab",
    year: "2026",
    status: "Completed",
    categories: ["tool"],
    skills: ["Python", "FastAPI", "SQLAlchemy", "Docker", "Alpine"],
    description:
      "Two-stage Docker build for a FastAPI and SQLAlchemy service. Production image cut to about 121MB, non-root, with a built-in health check.",
    link: `${SHIPLOG}/blog/container-lab/`,
    featured: true,
  },
  {
    id: "previewforge",
    title: "PreviewForge",
    year: "2026",
    status: "Live",
    categories: ["web", "tool"],
    skills: ["React", "TypeScript"],
    description:
      "Paste a URL, see exactly how it renders as a Twitter, LinkedIn, Facebook or Telegram card, then fix the meta tags.",
    link: `${SHIPLOG}/blog/previewforge/`,
  },
  {
    id: "expense-bot",
    title: "Telegram Expense Bot",
    year: "2026",
    status: "Live",
    categories: ["tool"],
    skills: ["TypeScript", "Bun", "PostgreSQL", "Supabase", "Docker"],
    description:
      "Track spending in plain language from Telegram, with categories, payment modes and month-over-month summaries.",
    link: `${SHIPLOG}/blog/expense-bot/`,
  },
  {
    id: "betteroauth",
    title: "BetterOAuth",
    year: "2026",
    status: "Completed",
    categories: ["tool", "web"],
    skills: ["React", "OAuth", "Drizzle ORM"],
    description: "Google OAuth login flows with Drizzle ORM persistence and a clean React front end.",
    link: `${SHIPLOG}/blog/betteroauth-ui/`,
  },
  {
    id: "bangalorerenthub",
    title: "BangaloreRentHub",
    year: "2025",
    status: "Completed",
    categories: ["web"],
    skills: ["React", "TypeScript"],
    description: "Rental property search built around Bengaluru listings.",
    link: `${SHIPLOG}/blog/bangalorerenthub-ui/`,
  },
  {
    id: "twilightsouls",
    title: "TwilightSouls",
    year: "2025",
    status: "Completed",
    categories: ["web"],
    skills: ["React", "TypeScript"],
    description: "A small romance experience that works out the moon phase on two birth dates.",
    link: `${SHIPLOG}/blog/twilightsouls/`,
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    year: "2025",
    status: "Completed",
    categories: ["tool", "web"],
    skills: ["React", "Data Visualization"],
    description: "Upload a dataset and explore it through interactive charts.",
    link: `${SHIPLOG}/blog/data-analysis-dashboard/`,
  },
  {
    id: "todo-dapp",
    title: "Decentralized Todo DApp",
    year: "2025",
    status: "Completed",
    categories: ["web3"],
    skills: ["Ethereum", "Solidity", "MetaMask"],
    description: "A todo app on Ethereum with Sign-In with Ethereum authentication.",
    link: `${SHIPLOG}/blog/blockchain-todo-app/`,
  },
]

export const EXPERIENCE = [
  {
    company: "GPUNET",
    href: "https://gpu.net",
    role: "Software Developer (SDE)",
    type: "Full-time",
    period: "Aug 2025 – Now",
    current: true,
    points: [
      "Architecting scalable SaaS applications with React and TypeScript.",
      "Cloud-native services on AWS, tuned for performance and reliability.",
      "MySQL schemas and RESTful APIs built for high-throughput data work.",
      "Set up the team's Git workflow, branching strategy and CI/CD pipelines.",
    ],
    skills: ["React", "TypeScript", "AWS", "MySQL", "CI/CD"],
  },
  {
    company: "IBM / Rooman Technologies",
    href: "https://www.ibm.com/in-en",
    role: "DevOps Engineer Intern",
    type: "Internship",
    period: "Aug 2024 – Feb 2025",
    points: [
      "Completed the VTU-certified AI-DevOps Engineer program.",
      "Containers with Docker, orchestration with Kubernetes, automated CI/CD for production.",
    ],
    skills: ["Docker", "Kubernetes", "CI/CD", "Linux"],
  },
  {
    company: "Pragyan AI",
    role: "Industry Intern, ML Project",
    type: "Internship",
    period: "Oct – Nov 2023",
    points: ["Built a bank term-deposit prediction model for the AIML department's industry program."],
    skills: ["Python", "Machine Learning"],
  },
]

export const STACK = [
  { group: "AI / ML", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning", "LLM Integration", "RAG"] },
  { group: "MLOps & Observability", items: ["MLflow", "DVC", "Qdrant", "LangGraph", "Celery", "Redis", "Prometheus", "Grafana", "Langfuse"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Express", "Hono", "Bun"] },
  { group: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
]

export const AWARDS = [
  { prize: "Rank 3", title: "Academic Excellence", note: "Third in the B.E. batch, CGPA 8.51", date: "Apr 2025" },
  { prize: "Runner up", title: "KIMO Edge 2024", note: "Scored 94/120 at Vijaya Vittala Institute of Technology", date: "Jul 2024" },
  { prize: "Level 1", title: "Flipkart GRiD 6.0", note: "Software Development track", date: "Jan 2024" },
]

const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`

export const CERTIFICATIONS = [
  { title: "AI-DevOps Engineer", issuer: "VTU via IBM / Rooman", date: "2025", url: drive("1rZV7dDd2V9nHuHspFPcGUc4GYZllCe5a") },
  { title: "AWS ML Engineer Associate Curriculum", issuer: "AWS Training", date: "2026", url: drive("1l5Y4iAE0wi7mpdC1fZcAHDZSvybEDlP1") },
  { title: "Accelerating Deep Learning with GPUs", issuer: "IBM Cognitive Class", date: "2025", url: "https://courses.cognitiveclass.ai/certificates/d559ec9f7efc4064b186b1f355f5329b" },
  { title: "Career Essentials in Data Analysis", issuer: "Microsoft & LinkedIn", date: "2025", url: drive("1xxUYFZifPlF8wYnbzIb2qe92XaTaoaz7") },
  { title: "Data Analytics Part 2", issuer: "LinkedIn Learning", date: "2025", url: drive("1fbJ6ERdNQq63GcCEyQUyUYRWk8XpP7QZ") },
  { title: "Introduction to Data Science", issuer: "Cisco Networking Academy", date: "2025", url: drive("1y6PgczXIqJvKjtZR56iTm7ABkluLdXtM") },
  { title: "Python Essentials 1", issuer: "Cisco Networking Academy", date: "2025", url: drive("1gVq11hHperWvgNAVsvtn9Ud9m__Py3uo") },
  { title: "Data Science Job Simulation", issuer: "Forage", date: "2025", url: drive("17Xy2YUS2UEdFIX34Y909T01zUEmLIip3") },
  { title: "Data Visualisation", issuer: "Forage", date: "2025", url: drive("1nVEHpBsQKrR3XI17cfzb4B_end-GLkl9") },
  { title: "Cyber Job Simulation", issuer: "Deloitte via Forage", date: "2025", url: drive("1mOVcRWurpUmELMAt6hEayvXbFHbF68_o") },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte via Forage", date: "2025", url: drive("1qOSuyTpowx-5aGZNsrbgLLUShtwxCwDZ") },
  { title: "Introduction to Software Testing", issuer: "Great Learning", date: "2025", url: drive("1Aj0WEVeoKUYLbR2cHjISyl4KCPTRdrPD") },
  { title: "Automation Testing Basics", issuer: "Great Learning", date: "2025", url: drive("1ZGSVWvSwTA5j6ix9dRqPxgHockbJBW02") },
  { title: "Getting Started with Microsoft Excel", issuer: "Coursera", date: "2025", url: "https://coursera.org/verify/WTNL5S6CS3NX" },
  { title: "Life Skills (Jeevan Kaushal) 2.0", issuer: "Wadhwani Foundation", date: "2024", url: drive("12MtMBioteweFBF7M70utcFs0v7F00G1m") },
  { title: "Getting Started with Competitive Programming", issuer: "VTU", date: "2024", url: drive("1BWyDTCM7g2A8OoKgzDSsCFPp1m8iLoK7") },
  { title: "The Joy of Computing using Python", issuer: "VTU", date: "2024", url: drive("19-rNCfsO3aUPPg_PjlsSF5KJJO58QFGl") },
  { title: "Fundamentals of Full Stack Development", issuer: "ExcelR", date: "2024", url: drive("1VBEap_dytt_5d2on5N4EqoPyZRvdEOZ8") },
  { title: "Python", issuer: "GUVI", date: "2023", url: "https://www.guvi.in/certificate?id=D962i6P970170F9t54" },
  { title: "Data Science & Analytics", issuer: "HP LIFE", date: "2023", url: drive("1-L6lDZqu9A-6au1v5snSHlHydWTbDMFB") },
  { title: "Social Entrepreneurship", issuer: "HP LIFE", date: "2023", url: drive("1A9kZI6UMDq-oZez-44Sqwr8Zk46_B-Rr") },
]
