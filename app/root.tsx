/* eslint-disable react/no-danger */

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { DynamicLinks, ExternalScripts, StructuredData } from "remix-utils";
import tailwindCss from "~/styles/tailwindcss.css";
import prismCss from "~/styles/prism.css";
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
    rel: "stylesheet",
    href: prismCss,
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
        <StructuredData />
        <Links />
        <DynamicLinks />

        <script
          dangerouslySetInnerHTML={{
            __html: `  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5GTSSXK');`,
          }}
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W5HXEXS0SF" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'G-W5HXEXS0SF');`,
          }}
        />

        {/* <!-- UA- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148416370-3" />
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-148416370-3');`,
          }}
        />
      </head>
      <body>
        <div id="fb-root" />

        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GTSSXK" height="0" width="0"
            style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* <!-- End Google Tag Manager (noscript) --> */}

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
    <html lang="vi">
      <head>
        {/* <Meta /> */}
        {/* <MetaTags rootMatch="root" />
        <Manifest rootMatch="root" /> */}
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
