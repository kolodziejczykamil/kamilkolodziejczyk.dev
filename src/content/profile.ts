import type { SimpleIcon } from "simple-icons";
import { brandColors } from "@/content/brand";
import { notesPage } from "@/content/notes";
import {
  siAntdesign,
  siChartdotjs,
  siCss,
  siCypress,
  siDocker,
  siFigma,
  siGit,
  siGraphql,
  siHtml5,
  siJavascript,
  siJest,
  siMui,
  siNextdotjs,
  siReact,
  siReactquery,
  siRedux,
  siSass,
  siStorybook,
  siStyledcomponents,
  siTestinglibrary,
  siTypescript,
  siVite,
  siWebpack,
  siXstate,
  siZod,
} from "simple-icons";

export const SITE_URL = "https://kamilkolodziejczyk.dev";
export const EMAIL = "kontakt@kamilkolodziejczyk.dev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kamil-kolodziejczyk";
export const GITHUB_URL = "https://github.com/kolodziejczykamil";
export const SOURCE_URL = `${GITHUB_URL}/kamilkolodziejczyk.dev`;
export const TOP_ID = "top";

export type Period = {
  from: number;
  to: number | "now";
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  title: string;
  client: string;
  period: Period;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
  screenshots?: readonly ProjectScreenshot[];
};

export type SideProject = {
  title: string;
  screenshot: ProjectScreenshot;
  summary: string;
  stack: readonly string[];
  demoUrl: string;
  sourceUrl: string;
};

export type CareerEntry = {
  period: Period;
  role: string;
  focus: string;
};

export type Skill = {
  label: string;
  icon?: SimpleIcon;
};

export type SkillGroup = {
  name: string;
  items: readonly Skill[];
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Command =
  | { kind: "section"; label: string; href: string }
  | { kind: "link"; label: string; href: string }
  | { kind: "copy"; label: string; value: string; confirmation: string };

export type NavItem = {
  label: string;
  href: string;
  showOnMobile: boolean;
};

export const person = {
  name: "Kamil Kołodziejczyk",
  alternateName: "Kamil Kolodziejczyk",
  role: "Senior Frontend Developer",
  country: "PL",
};

export const siteMeta = {
  title: `${person.name} – ${person.role}, React and TypeScript`,
  shortTitle: person.name,
  description:
    "Senior Frontend Developer with 8+ years in fintech, banking and logistics. React, TypeScript and Next.js, from legacy rewrites to mobile-first apps.",
  themeColor: brandColors.ink,
  ogImagePath: "/opengraph-image",
  ogImageAlt: `${person.name}, ${person.role}. I rebuild legacy frontends as fast, mobile-first React apps.`,
};

export const hero = {
  eyebrow: `${person.name}, ${person.role}`,
  headline: "I rebuild legacy frontends as fast, mobile-first React apps.",
  intro:
    "Senior Frontend Developer with 8+ years in fintech, banking and logistics. Right now I'm rewriting a payment provider's merchant panel, used by several thousand merchants every day.",
  primaryAction: { label: "Get in touch", href: "#contact" },
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
    title: "Attendance app for an online fitness coach",
    client: "Fitness coach, pro bono",
    period: { from: 2026, to: "now" },
    summary:
      "A coach runs live workouts in a private Facebook group. Participants sent the workout password on Messenger and she ticked them off by hand, dozens of messages after every session, with no real statistics. I built an app that records attendance on its own. It went live in September 2026.",
    highlights: [
      "Checked what Meta's APIs allow before writing any code. Private Messenger has no API and the Groups API is gone, so I kept the familiar password ritual and moved it to a check-in link",
      "Made check-in a single field on a phone: the browser remembers returning participants, and workouts watched later from the recording can be made up within two months",
      "Built a mobile-first panel for the coach with a live attendance counter during the workout, one-tap manual check-in, monthly statistics, CSV export and a list of people who stopped coming",
      "Covered security and GDPR: rate limiting, CSRF protection, signed sessions and automatic deletion of data older than 24 months",
      "Wrote the API contract and design system first, then delivered with AI coding agents working in parallel on separate parts of the app, backed by automated tests",
    ],
    stack: ["React", "TypeScript", "Vite", "React Router", "Hono", "libSQL", "Vitest"],
    screenshots: [
      {
        src: "/work/attendance-check-in.webp",
        alt: "Phone screen confirming a participant's attendance at today's workout",
        width: 600,
        height: 1298,
      },
      {
        src: "/work/attendance-live.webp",
        alt: "Coach's live screen with today's workout password, a counter of six participants and the list of check-ins",
        width: 600,
        height: 1298,
      },
      {
        src: "/work/attendance-people.webp",
        alt: "List of participants with attendance rates and badges for people who missed several workouts in a row",
        width: 600,
        height: 1298,
      },
    ],
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
  screenshotsLabel: "Screenshots on demo data",
  caseStudies,
};

const sideProjects: readonly SideProject[] = [
  {
    title: "React re-render lab",
    screenshot: {
      src: "/projects/re-render-lab.webp",
      alt: "React re-render lab with a component editor, a scenario builder and a render timeline listing three renders",
      width: 1280,
      height: 800,
    },
    summary:
      "Paste a React component, build a scenario of prop, state and parent changes, and see which renders it triggers. Static analysis spots inline functions, inline objects and missing memoization, then suggests fixes.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest"],
    demoUrl: "https://re-render-lab.vercel.app",
    sourceUrl: `${GITHUB_URL}/re-render-lab`,
  },
  {
    title: "JSON to TypeScript",
    screenshot: {
      src: "/projects/json-to-typescript.webp",
      alt: "JSON to TypeScript with a user profile JSON on the left and the generated TypeScript interfaces on the right",
      width: 1280,
      height: 800,
    },
    summary: "Paste JSON and get TypeScript types for it instantly.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://json-to-typescript-sigma.vercel.app",
    sourceUrl: `${GITHUB_URL}/json-to-typescript`,
  },
  {
    title: "File tree explorer",
    screenshot: {
      src: "/projects/file-tree-explorer.webp",
      alt: "File tree explorer showing an expanded monorepo tree and search results for index",
      width: 1280,
      height: 800,
    },
    summary:
      "Load a directory structure as JSON and browse it as a tree, with search, file and folder details, nested routes, dark mode and a Polish and English UI.",
    stack: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS"],
    demoUrl: "https://file-tree-explorer-omega.vercel.app",
    sourceUrl: `${GITHUB_URL}/file-tree-explorer`,
  },
];

export const projects = {
  id: "projects",
  title: "Side projects",
  intro: "Small tools I build to explore ideas outside client work. Each one has a live demo and public code.",
  demoLabel: "Live demo",
  sourceLabel: "Source",
  items: sideProjects,
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
    items: [
      { label: "React", icon: siReact },
      { label: "TypeScript", icon: siTypescript },
      { label: "JavaScript", icon: siJavascript },
      { label: "Next.js", icon: siNextdotjs },
      { label: "HTML", icon: siHtml5 },
      { label: "CSS", icon: siCss },
      { label: "SCSS", icon: siSass },
    ],
  },
  {
    name: "State and data",
    items: [
      { label: "Redux Toolkit", icon: siRedux },
      { label: "React Query", icon: siReactquery },
      { label: "XState", icon: siXstate },
      { label: "Zod", icon: siZod },
      { label: "GraphQL", icon: siGraphql },
      { label: "REST" },
      { label: "WebSockets" },
    ],
  },
  {
    name: "UI",
    items: [
      { label: "Material UI", icon: siMui },
      { label: "Ant Design", icon: siAntdesign },
      { label: "Styled Components", icon: siStyledcomponents },
      { label: "Storybook", icon: siStorybook },
      { label: "Chart.js", icon: siChartdotjs },
    ],
  },
  {
    name: "Testing",
    items: [
      { label: "Jest", icon: siJest },
      { label: "React Testing Library", icon: siTestinglibrary },
      { label: "Cypress", icon: siCypress },
    ],
  },
  {
    name: "Tooling",
    items: [
      { label: "Vite", icon: siVite },
      { label: "Webpack", icon: siWebpack },
      { label: "Git", icon: siGit },
      { label: "Docker", icon: siDocker },
      { label: "Figma", icon: siFigma },
      { label: "Azure DevOps" },
      { label: "CI/CD" },
    ],
  },
];

const domains: readonly string[] = [
  "Fintech",
  "Banking",
  "Logistics",
  "E-commerce",
  "VoD",
  "IoT",
  "Public sector",
];

export const stack = {
  id: "stack",
  title: "Stack",
  groups: skillGroups,
  domainsTitle: "Domains",
  domains,
};

const statItems: readonly Stat[] = [
  { value: 8, suffix: "+", label: "years of commercial frontend work" },
  { value: domains.length, label: "industries, from banking to IoT" },
  { value: 10, prefix: "~", label: "developers building on the architecture I set up" },
  { value: 1000, suffix: "s", label: "merchants using my current project every day" },
];

export const stats = {
  label: "At a glance",
  items: statItems,
};

export const contact = {
  id: "contact",
  title: "Contact",
  intro:
    "Have a frontend project or a senior role in mind? Write to me and I'll get back to you within a couple of days.",
  directPrefix: "Prefer email? Write to",
  linkedInPrefix: "You can also find me on",
  linkedInLabel: "LinkedIn",
  cvNote: "My CV is available on request.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "jane@company.com",
    messageLabel: "Message",
    messagePlaceholder: "A few words about the project or role",
    submitLabel: "Send message",
    submittingLabel: "Sending",
    successTitle: "Message sent",
    successBody: "Thanks for writing. I'll get back to you within a couple of days.",
    sendAnotherLabel: "Send another message",
    genericError: `Something went wrong. Please try again or email me at ${EMAIL}.`,
    verificationError: "Please complete the verification and try again.",
    rateLimitedError: `Too many messages right now. Please try again later or email me at ${EMAIL}.`,
    honeypotLabel: "Leave this field empty",
  },
};

export function homeSectionHref(id: string): string {
  return `/#${id}`;
}

export const navItems: readonly NavItem[] = [
  { label: "Work", href: homeSectionHref(work.id), showOnMobile: false },
  { label: "Projects", href: homeSectionHref(projects.id), showOnMobile: false },
  { label: "Career", href: homeSectionHref(career.id), showOnMobile: false },
  { label: "Stack", href: homeSectionHref(stack.id), showOnMobile: false },
  { label: notesPage.title, href: notesPage.path, showOnMobile: false },
  { label: "Contact", href: homeSectionHref(contact.id), showOnMobile: true },
];

export const footer = {
  builtWith: "Built with Next.js and TypeScript.",
  sourceLabel: "Source on GitHub",
};

export const commands: readonly Command[] = [
  { kind: "section", label: "Go to top", href: homeSectionHref(TOP_ID) },
  { kind: "section", label: `Go to ${about.title.toLowerCase()}`, href: homeSectionHref(about.id) },
  { kind: "section", label: `Go to ${work.title.toLowerCase()}`, href: homeSectionHref(work.id) },
  { kind: "section", label: `Go to ${projects.title.toLowerCase()}`, href: homeSectionHref(projects.id) },
  { kind: "section", label: `Go to ${career.title.toLowerCase()}`, href: homeSectionHref(career.id) },
  { kind: "section", label: `Go to ${stack.title.toLowerCase()}`, href: homeSectionHref(stack.id) },
  { kind: "section", label: `Go to ${contact.title.toLowerCase()}`, href: homeSectionHref(contact.id) },
  { kind: "section", label: "Read notes", href: notesPage.path },
  { kind: "copy", label: "Copy email address", value: EMAIL, confirmation: "Email copied" },
  { kind: "link", label: "Send an email", href: `mailto:${EMAIL}` },
  { kind: "link", label: "Open LinkedIn profile", href: LINKEDIN_URL },
];

export const commandPalette = {
  triggerLabel: "Open command menu",
  dialogLabel: "Command menu",
  searchLabel: "Search commands",
  searchPlaceholder: "Type a command or search",
  emptyLabel: "No matching commands",
  closeLabel: "Close",
};

export const skipLinkLabel = "Skip to content";
export const mainNavLabel = "Main";
export const MAIN_CONTENT_ID = "main";
