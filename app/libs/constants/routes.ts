export const GENERAL_ROUTES = {
  HOME: "/",
  POST_DETAIL_STRING: "/posts/:slug",
  POST_DETAIL: (slug: string) => `/posts/${slug}`,
};
