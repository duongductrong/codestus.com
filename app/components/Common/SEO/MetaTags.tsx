import type { MetaFunction } from "@remix-run/node";
import { useLocation, useMatches } from "@remix-run/react";
import type { ILoaderDataRoot } from "~/root";

export interface MetaTagsProps {
  rootMatch?: string;
}

export interface MetaTagsFunction extends MetaFunction {}

const MetaTags = ({ rootMatch }: MetaTagsProps) => {
  const matches = useMatches();
  const location = useLocation();
  const rootMatcher = matches.find((matcher) => matcher.id === rootMatch);
  const rootLoader = rootMatcher?.data as ILoaderDataRoot;

  const defaultMetaTags: { [x: string]: any } = {
    url: `${rootLoader?.appUrl}${location?.pathname}`,
    image: "https://codestus.com/uploads/images/seo/open-graph-image.png",
    title: "Codestus",
    description:
      "Blog, Chia sẻ kinh nghiệm Frontend về React.js, Vue.js và những kinh nghiệm về lập trình",
    keywords:
      "javascript tips, lập trình javascript, php tips, lập trình php, code javascript hay, lập trình php, fullstack, cộng đồng lập trình",
    robots: "index, follow",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };

  try {
    const matcherDataOfRoute = matches[matches.length - 1];
    const handleMetaTagsFn = matcherDataOfRoute?.handle?.metaTags;

    if (handleMetaTagsFn && typeof handleMetaTagsFn === "function") {
      const customMetaTags = handleMetaTagsFn({
        location,
        data: matcherDataOfRoute.data,
        params: matcherDataOfRoute.params,
        parentsData: matches,
      });

      Object.entries(customMetaTags).forEach(([key, value]) => {
        defaultMetaTags[key] = value;
      });
    }
  } catch (e) {
    console.log('error', e);
  }

  const {
    charset,
    description,
    image,
    keywords,
    robots,
    title,
    url,
    viewport,
  } = defaultMetaTags;

  return (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="charset" content={charset} />
      <meta name="viewport" content={viewport} />
      <meta name="google-site-verification" content="eXhMtN2gkr5bkyhvyTamHYNwGBBEQRkdPu5t7cgXqss" />
      <title>{`${title} - Codestus.com`}</title>

      <meta name="title" content={`${title} - Codestus.com`} />
      <meta name="description" content={`${description} - Codestus.com`} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={`${title} - Codestus.com`} />
      <meta itemProp="description" content={`${description} - Codestus.com`} />
      <meta itemProp="image" content={image} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${title} - Codestus.com`} />
      <meta
        property="og:description"
        content={`${description} - Codestus.com`}
      />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={`${title} - Codestus.com`} />
      <meta
        property="twitter:description"
        content={`${description} - Codestus.com`}
      />
      <meta property="twitter:image" content={image} />
    </>
  );
};

export default MetaTags;
