export const ADMIN_URLS = {
  OVERVIEW: "/admin",
  POSTS: {
    INDEX: "/admin/posts",
    CREATE: "/admin/posts/create",
    EDIT: "/admin/posts/:id/edit",
  },
  PROJECTS: "/admin/projects",
  USERS: "/admin/users",
} as const
