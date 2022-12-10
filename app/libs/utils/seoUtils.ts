import type { MetaFunction } from "@remix-run/node";

export interface SeoUtilsArgs {
  url?: null | string;
  title?: null | string;
  description?: null | string;
  image?: null | string;
  keyword?: null | string;
}

export function seoUtils({
  url,
  title,
  description,
  image,
  keyword,
}: SeoUtilsArgs): ReturnType<MetaFunction> {
  const _url = url;
  const _title = title ? `${title} - Codestus.com` : "Codestus.com";
  const _description =
    description ||
    "Blog, Chia sẻ kinh nghiệm Frontend về React.js, Vue.js và những kinh nghiệm về lập trình. - Codestus.com";
  const _image = image;
  const _keyword =
    keyword ||
    "javascript tips, lập trình javascript, php tips, lập trình php, code javascript hay, lập trình php, fullstack, cộng đồng lập trình";

  return {
    // Browser schema
    "msapplication-TileColor": "#fff",
    "msapplication-TileImage": "/image.png",
    "theme-color": "#fff",

    // Website info
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",

    // Common meta define
    title: _title,
    description: _description,
    keywords: _keyword,
    robots: "index, follow",

    // Google / S.E.T
    name: _title,
    image: "https://codestus.com/uploads/images/seo/open-graph-image.png",

    // Open Graph / Facebook
    "og:type": "website",
    "og:url": _url,
    "og:title": _title,
    "og:description": _description,
    "og:image": _image,

    // Twitter
    "twitter:card": "summary_large_image",
    "twitter:url": _url,
    "twitter:title": _title,
    "twitter:description": _description,
    "twitter:image": _image,
  };
}
