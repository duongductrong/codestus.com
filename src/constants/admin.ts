export const ADMIN_URLS = {
  OVERVIEW: "/admin",
  POSTS: {
    INDEX: "/admin/posts",
    CREATE: "/admin/posts/create",
    EDIT: "/admin/posts/:id/edit",
  },
  TAGS: {
    INDEX: "/admin/tags",
    CREATE: "/admin/tags/create",
    EDIT: "/admin/tags/:id/edit",
  },
  PROJECTS: "/admin/projects",
  USERS: "/admin/users",
} as const
