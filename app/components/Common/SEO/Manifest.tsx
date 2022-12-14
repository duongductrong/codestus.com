import { useLocation, useMatches } from "@remix-run/react";
import type { FC } from "react";
import type { ILoaderDataRoot } from "~/root";

export interface ManifestProps {
  rootMatch?: string;
}

const Manifest: FC<ManifestProps> = ({ rootMatch }) => {
  const matches = useMatches();
  const location = useLocation();
  const rootMatcher = matches.find((matcher) => matcher.id === rootMatch);
  const rootLoader = rootMatcher?.data as ILoaderDataRoot;
  const url = `${rootLoader.appUrl}${location.pathname}`;

  return (
    <>
      <link rel="canonical" href={url} />
      <link href="/icons/favicon.ico" rel="shortcut icon" />
      <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/icons/manifest.json" />
      <link rel="alternate" href={url} hrefLang="vi-vn" />
    </>
  );
};

Manifest.defaultProps = {
  rootMatch: "",
};

export default Manifest;
