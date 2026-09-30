export const SITE_URL = "https://kamilkolodziejczyk.dev";
export const EMAIL = "kontakt@kamilkolodziejczyk.dev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kamil-kolodziejczyk";

export type Period = {
  from: number;
  to: number | "now";
};

export type CaseStudy = {
  title: string;
  client: string;
  period: Period;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
};

export type CareerEntry = {
  period: Period;
  role: string;
  focus: string;
};

export type SkillGroup = {
  name: string;
  items: readonly string[];
};

export type NavItem = {
  label: string;
  href: string;
  showOnMobile: boolean;
};

export const person = {
  name: "Kamil Kołodziejczyk",
  role: "Senior Frontend Developer",
};

export const siteMeta = {
  title: `${person.name}, ${person.role}`,
  description:
    "Senior Frontend Developer with 8+ years in fintech, banking and logistics. React, TypeScript and Next.js, from legacy rewrites to mobile-first apps.",
  themeColor: "#0f2431",
};

export const hero = {
  eyebrow: person.role,
  headline: "I rebuild legacy frontends as fast, mobile-first React apps.",
  intro:
    "Senior Frontend Developer with 8+ years in fintech, banking and logistics. Right now I'm rewriting a payment provider's merchant panel, used by several thousand merchants every day.",
  primaryAction: { label: "Email me", href: `mailto:${EMAIL}` },
  secondaryAction: { label: "LinkedIn profile", href: LINKEDIN_URL },
  diagram: {
    title: "One merchant panel on desktop and mobile",
    description:
      "A desktop browser window with a sidebar, a header bar and table rows, next to a phone. Both show the same form, connected by a curved line. A dimension line under both is labelled one React codebase.",
    label: "one React codebase",
    caption:
      "The merchant panel I'm building runs in the browser and inside the mobile app through WebView.",
  },
};

export const about = {
  id: "about",
  title: "How I work",
  paragraphs: [
    "Most of my work starts where an old system stops keeping up. I set up the new frontend from the first commit: architecture, folder structure and the standards the rest of the team builds on.",
    "I care about code that stays easy to change a year later, so I spend time on reviews, shared components and helping junior developers find their feet. I work B2B through my own company.",
  ],
};

const caseStudies: readonly CaseStudy[] = [
  {
    title: "Merchant panel rewrite",
    client: "Payment provider",
    period: { from: 2025, to: "now" },
    summary:
      "Replacing a legacy PHP merchant panel with a React and TypeScript frontend built from scratch. Merchants use it every day to manage payments, so it has to stay fast and predictable.",
    highlights: [
      "Designed the architecture, folder structure and coding standards for a team of about 10",
      "Built it mobile-first, so the company's mobile app embeds the same screens through WebView",
      "Added data visualization modules with maps and charts",
    ],
    stack: ["React", "TypeScript", "Redux", "React Query", "XState", "Zod"],
  },
  {
    title: "Onboarding and company verification",
    client: "Payment provider",
    period: { from: 2025, to: "now" },
    summary:
      "Multi-step onboarding where merchants verify their company (KYB) before they can accept payments. The fields and documents a merchant sees depend on the company's legal form.",
    highlights: [
      "Modelled the conditional logic so each legal form gets only the steps it needs",
      "Validated API responses at the boundary to catch contract changes early",
      "Built document upload with progress and error states",
    ],
    stack: ["React", "TypeScript", "XState", "Zod", "React Query"],
  },
  {
    title: "Business loan application",
    client: "Polish bank",
    period: { from: 2022, to: 2024 },
    summary:
      "The online application companies use to apply for a loan, inside an enterprise banking system. Delivered in a 15-person Scrum team in a regulated environment.",
    highlights: [
      "Created project skeletons and reusable component structures used across the application",
      "Refined requirements directly with bank stakeholders",
      "Ran internal knowledge-sharing sessions and technical trainings",
    ],
    stack: ["React", "Redux", "TypeScript", ".NET REST API"],
  },
  {
    title: "Logistics customer portal",
    client: "Transport and logistics client",
    period: { from: 2020, to: 2022 },
    summary:
      "A customer portal built from scratch where clients price shipments, place orders and track parcels.",
    highlights: [
      "Built the quote, ordering and tracking flows end to end on the frontend",
      "Contributed to frontend architecture decisions across three client projects",
    ],
    stack: ["React", "Redux", "Java Spring REST API"],
  },
];

export const work = {
  id: "work",
  title: "Selected work",
  intro:
    "Client names stay private. The problems, the scale and my part in them are below.",
  caseStudies,
};

const careerEntries: readonly CareerEntry[] = [
  {
    period: { from: 2025, to: "now" },
    role: "Senior Frontend Developer",
    focus: "Fintech, payment provider",
  },
  {
    period: { from: 2022, to: 2024 },
    role: "Senior Frontend Developer",
    focus: "Banking, senior from 2023",
  },
  {
    period: { from: 2020, to: 2022 },
    role: "Frontend Developer",
    focus: "Software house, logistics and enterprise clients",
  },
  {
    period: { from: 2019, to: 2020 },
    role: "Fullstack Developer",
    focus: "React frontend and Java Spring backend",
  },
  {
    period: { from: 2018, to: 2019 },
    role: "Junior Frontend Developer",
    focus: "Business apps for international clients",
  },
];

export const career = {
  id: "career",
  title: "Career",
  entries: careerEntries,
};

const skillGroups: readonly SkillGroup[] = [
  {
    name: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Next.js", "HTML", "CSS", "SCSS"],
  },
  {
    name: "State and data",
    items: ["Redux Toolkit", "React Query", "XState", "Zod", "REST", "GraphQL", "WebSockets"],
  },
  {
    name: "UI",
    items: ["Material UI", "Ant Design", "Styled Components", "Storybook", "Chart.js"],
  },
  {
    name: "Testing",
    items: ["Jest", "React Testing Library", "Cypress"],
  },
  {
    name: "Tooling",
    items: ["Vite", "Webpack", "Git", "Azure DevOps", "CI/CD", "Docker", "Figma"],
  },
  {
    name: "Domains",
    items: ["Fintech", "Banking", "Logistics", "E-commerce", "VoD", "IoT", "Public sector"],
  },
];

export const stack = {
  id: "stack",
  title: "Stack",
  groups: skillGroups,
};

export const contact = {
  id: "contact",
  title: "Contact",
  intro:
    "Have a frontend project or a senior role in mind? Write to me and I'll get back to you within a couple of days.",
  linkedInPrefix: "You can also find me on",
  linkedInLabel: "LinkedIn",
  cvNote: "My CV is available on request.",
};

export const navItems: readonly NavItem[] = [
  { label: "Work", href: `#${work.id}`, showOnMobile: false },
  { label: "Career", href: `#${career.id}`, showOnMobile: false },
  { label: "Stack", href: `#${stack.id}`, showOnMobile: false },
  { label: "Contact", href: `#${contact.id}`, showOnMobile: true },
];

export const footer = {
  builtWith: "Built with Next.js and TypeScript.",
};

export const skipLinkLabel = "Skip to content";
export const mainNavLabel = "Main";
export const MAIN_CONTENT_ID = "main";
