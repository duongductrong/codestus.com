import { ADMIN_URLS } from "@/constants/admin"

export type Project = {
  id: string
  name: string
  domain: string
  icon: string
  repository: {
    owner: string
    name: string
  }
  lastActivity: {
    message: string
    date: string
    branch: string
    user?: string
  }
}

export type Preview = {
  id: string
  name: string
  repository: {
    owner: string
    name: string
  }
  status: "success" | "error"
  commitId: string
  hasError?: boolean
  author?: string
}

export type User = {
  name: string
  avatar: string
}

export type NavigationItem = {
  name: string
  href: string
  hasNotification?: boolean
}

export type Article = {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  readingTime: string
  category: string
}

export const currentUser: User = {
  name: "Dng Dc Trng",
  avatar: "https://github.com/shadcn.png",
}

export const mainNavigation = [
  { name: "Overview", href: ADMIN_URLS.OVERVIEW, active: true },
  { name: "Projects", href: ADMIN_URLS.POSTS.INDEX },
  { name: "Activity", href: "#" },
  { name: "Domains", href: "#" },
  { name: "Usage", href: "#" },
  { name: "Monitoring", href: "#" },
  { name: "Observability", href: "#", hasNotification: true },
  { name: "Storage", href: "#" },
  { name: "Flags", href: "#" },
  { name: "AI", href: "#" },
  { name: "Support", href: "#" },
  { name: "Settings", href: "#" },
]

export const topNavLinks = [
  { name: "Feedback", href: "#" },
  { name: "Changelog", href: "#" },
  { name: "Help", href: "#" },
  { name: "Docs", href: "#" },
]

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with Next.js 14 and its new features.",
    author: "John Doe",
    publishedAt: "2024-03-30",
    readingTime: "5 min read",
    category: "Development",
  },
  {
    id: "2",
    title: "Understanding Server Components",
    excerpt: "Deep dive into React Server Components and how they improve application performance.",
    author: "Jane Smith",
    publishedAt: "2024-03-29",
    readingTime: "8 min read",
    category: "React",
  },
  {
    id: "3",
    title: "Building with TypeScript",
    excerpt: "Best practices for using TypeScript in your Next.js projects.",
    author: "Mike Johnson",
    publishedAt: "2024-03-28",
    readingTime: "6 min read",
    category: "TypeScript",
  },
]

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "codestus",
    domain: "codestus.com",
    icon: "C",
    repository: {
      owner: "duongductrong",
      name: "codestus.com",
    },
    lastActivity: {
      message: "fix(layout): remove console log from RootLayout and update ...",
      date: "4h ago",
      branch: "master",
    },
  },
  {
    id: "2",
    name: "shadcn-docs",
    domain: "shadcn-docs.vercel.app",
    icon: "N",
    repository: {
      owner: "duongductrong",
      name: "shadcn-docs",
    },
    lastActivity: {
      message: "refactor(registry): remove __registry__ cuz it unused",
      date: "Mar 30",
      branch: "master",
    },
  },
  {
    id: "3",
    name: "tiptap",
    domain: "tiptap-seven.vercel.app",
    icon: "△",
    repository: {
      owner: "duongductrong",
      name: "tiptap",
    },
    lastActivity: {
      message: "fix: resolve eslint errors",
      date: "Feb 24",
      branch: "master",
    },
  },
  {
    id: "4",
    name: "minimal",
    domain: "daniell.dev",
    icon: "❄",
    repository: {
      owner: "duongductrong",
      name: "daniell.dev",
    },
    lastActivity: {
      message: "feat: update project details for Shadcn/docs, including new ...",
      date: "Mar 23",
      branch: "camerye@minimal",
    },
  },
  {
    id: "5",
    name: "motion",
    domain: "v1.daniell.dev",
    icon: "❄",
    repository: {
      owner: "duongductrong",
      name: "daniell.dev",
    },
    lastActivity: {
      message: "chore: add flex-wrap to contact div",
      date: "12/1/24",
      branch: "canary",
    },
  },
  {
    id: "6",
    name: "soa-code-assignment",
    domain: "soa-code-assignment.vercel.app",
    icon: "▼",
    repository: {
      owner: "duongductrong",
      name: "soa-code-assignment",
    },
    lastActivity: {
      message: "refactor: remove unused i18n import in PageContext",
      date: "Mar 9",
      branch: "master",
    },
  },
  {
    id: "7",
    name: "edgeart",
    domain: "edgeart.vercel.app",
    icon: "N",
    repository: {
      owner: "duongductrong",
      name: "edgeart",
    },
    lastActivity: {
      message: "feat: enable reset formatting text style and adjusted span>strong style",
      date: "Mar 8",
      branch: "master",
    },
  },
  {
    id: "8",
    name: "craft",
    domain: "craft.daniell.dev",
    icon: "N",
    repository: {
      owner: "duongductrong",
      name: "craft",
    },
    lastActivity: {
      message: "chore(ui): lipstick: update docs and home page",
      date: "9/14/24",
      branch: "master",
    },
  },
]

export const mockPreviews: Preview[] = [
  {
    id: "1",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-1",
    },
    status: "error",
    commitId: "#12",
    hasError: true,
  },
  {
    id: "2",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-2",
    },
    status: "error",
    commitId: "#11",
    hasError: true,
  },
  {
    id: "3",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-3",
    },
    status: "success",
    commitId: "#20",
    author: "@ingvr1ja",
  },
  {
    id: "4",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-4",
    },
    status: "error",
    commitId: "#10",
    hasError: true,
  },
  {
    id: "5",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-5",
    },
    status: "error",
    commitId: "#9",
    hasError: true,
  },
  {
    id: "6",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-6",
    },
    status: "success",
    commitId: "#19",
    author: "@c8gmtzwqy",
  },
  {
    id: "7",
    name: "chore(deps): bump the minor-and-patch-versions group",
    repository: {
      owner: "duongductrong",
      name: "project-7",
    },
    status: "error",
    commitId: "#8",
    hasError: true,
  },
]
