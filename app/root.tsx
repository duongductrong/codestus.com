import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DynamicLinks, ExternalScripts } from "remix-utils";
import tailwindCss from "~/styles/tailwindcss.css";
import { RootError } from "./components/CatchError/RootError";
import Manifest from "./components/Common/SEO/Manifest";
import MetaTags from "./components/Common/SEO/MetaTags";
import ToastLoading from "./components/Common/Toast/ToastLoading";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export interface ILoaderDataRoot {
  appUrl: string;
  appHref: string;
}

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: tailwindCss,
  },
  {
    rel: "alternate",
    hrefLang: "vi-vn",
  },
];

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  return {
    appUrl: url.origin,
    appHref: url.href,
  };
};

export default function App() {
  return (
    <html lang="vi">
      <head>
        {/* <Meta /> */}
        <MetaTags rootMatch="root" />
        <Manifest rootMatch="root" />
        <Links />
        <DynamicLinks />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
        <ToastLoading />
        <ExternalScripts />
        {/* <ScrollRestoration /> */}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <html>
      <head>
        {/* <Meta /> */}
        {/* <MetaTags rootMatch="root" /> */}
        {/* <Manifest rootMatch="root" /> */}
        <Links />
        <DynamicLinks />
      </head>
      <body>
        <RootError />
        <Scripts />
        <LiveReload />
        <ToastLoading />
        <ExternalScripts />
        {/* <ScrollRestoration /> */}
      </body>
    </html>
  );
}
