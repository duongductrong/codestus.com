import { generateSitemap } from "@balavishnuvj/remix-seo";
import type { EntryContext } from "@remix-run/node";

type Handler = (
  request: Request,
  remixContext: EntryContext,
) => Promise<Response | null> | null;

export const otherRootRoutes: Record<string, Handler> = {
  "/sitemap.xml": async (request: Request, remixContext: EntryContext) => generateSitemap(request, remixContext, {
      siteUrl: process.env.APP_URL || "https://codestus.com",
    }),
};

export const otherRootRouteHandlers: Array<Handler> = [
  ...Object.entries(otherRootRoutes).map(([path, handler]) => (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null;
      return handler(request, remixContext);
    }),
];
