export const GENERAL_ROUTES = {
  HOME: "/",
  POST_DETAIL_STRING: "/posts/:slug",
  POST_DETAIL: (slug: string) => `/posts/${slug}`,

  TAG_DETAIL_STRING: "tags/:slug",
  TAG_DETAIL: (slug: string) => `/tags/${slug}`,
};
