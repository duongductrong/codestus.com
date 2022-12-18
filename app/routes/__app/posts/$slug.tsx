import type { SEOHandle } from "@balavishnuvj/remix-seo";
import type {
  HeadersFunction,
  LoaderFunction,
  SerializeFrom,
} from "@remix-run/node";
import { Response } from "@remix-run/node";
import { Link, ScrollRestoration, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import _compact from "lodash/compact";
import "prismjs";
import { MdRemove } from "react-icons/md";
import type { StructuredDataFunction } from "remix-utils";
import type { HandleConventionArguments } from "remix-utils/build/react/handle-conventions";
import type { BlogPosting } from "schema-dts";
import Markdown from "~/components/Common/Markdown/Markdown";
import Script from "~/components/Common/ExternalScript/Script";
import type { MetaTagsFunction } from "~/components/Common/SEO/MetaTags";
import Tag from "~/components/Common/Tag/Tag";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import { prisma } from "~/libs/services/db.server";
import postService from "~/libs/services/post.service";
import { markdown } from "~/libs/utils/markdown.server";

export interface NotionPageItemProps {}

export interface ILoaderDataPostItem {
  post: Awaited<ReturnType<typeof postService.detail>>;
  content: ReturnType<typeof markdown>;
}

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const isProduction = process.env?.APP_ENV === "production";
    const slug = params.slug ?? "";

    const [post] = await prisma.$transaction(
      _compact([
        postService.detail(slug),
        isProduction ? postService.incPageViews(slug) : null,
      ]),
    );

    if (!post) {
      throw new Response("Not found", {
        status: 404,
      });
    }

    const contentMarkdoc = markdown(post?.content ?? "");

    return { post, content: contentMarkdoc };
  } catch {
    throw new Response("Not found", {
      status: 404,
    });
  }
};

export const structuredData: StructuredDataFunction<
  SerializeFrom<typeof loader>,
  BlogPosting
> = ({ data, parentsData }: HandleConventionArguments<ILoaderDataPostItem>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: data.post?.title,
    headline: data.post?.title,
    about: data.post?.title,
    author: {
      "@type": "Person",
      "@id": data.post?.users.name,
      address: data.post?.users.email,
      alternateName: data.post?.users.name,
      email: data.post?.users.email,
      image: data.post?.users.avatar,
    },
    url: parentsData?.appHref,
    image: data.post?.thumbnail,
    articleBody: data.post?.description,
    wordCount: data.post?.content?.length ?? 0,
    dateCreated: data.post?.created_at,
    thumbnailUrl: data.post?.thumbnail,
    datePublished: data.post?.publish_at,
    dateModified: data.post?.updated_at,
    mainEntityOfPage: {
      "@type": "WebContent",
      "@id": parentsData?.appHref ?? `/posts/${data.post?.slug}`,
    },
  };
};

export const metaTags: MetaTagsFunction = ({ data, parentsData }) => {
  const { post }: ILoaderDataPostItem = data;
  return {
    title: post?.title,
  };
};

export const _seoHandle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const posts = await postService.getLatestPostsPublished({
      page: 1,
      pageSize: 99999,
    });
    return posts.map((post) => ({
      route: GENERAL_ROUTES.POST_DETAIL(post.slug),
      priority: 1,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
    }));
  },
};

export const handle = { metaTags, structuredData, ..._seoHandle };

const PostItem = (props: NotionPageItemProps) => {
  const { post, content } = useLoaderData<ILoaderDataPostItem>();

  return (
    <div className="mt-[60px] max-w-2xl mx-auto">
      <div className="mb-20">
        <div className="space-x-4 space-y-4 text-center mb-8">
          {post?.post_tags.map((postTag) => (
            <Link
              key={postTag.tag.slug}
              to={GENERAL_ROUTES.TAG_DETAIL(postTag.tag.slug)}>
              <Tag key={postTag.tag.slug} className="text-md">
                #{postTag.tag.name}
              </Tag>
            </Link>
          ))}
        </div>

        <h2 className="text-black dark:text-white text-3xl sm:text-4xl mb-8 font-bold max-w-2xl text-center mx-auto break-words">
          {post?.title}
        </h2>

        <div className="flex items-center justify-center space-x-4 space-y-2 sm:space-y-0 flex-wrap break-words">
          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400 text-md">
            bởi{" "}
            <a
              href={`//github.com/lucapaguroo`}
              className="hover:text-blue-600 font-bold underline underline-offset-2">
              {post?.users.name}
            </a>{" "}
            từ {dayjs(post?.updated_at).format("MMM DD YYYY")}
          </span>

          <MdRemove className="text-neutral-600 dark:text-neutral-400 m-0" />

          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400 text-md">
            {Intl.NumberFormat("vi-VN").format(post?.views ?? 0)} lượt xem
          </span>
        </div>
      </div>

      <div className="prose md:prose-lg dark:prose-invert mx-auto mb-12 max-w-2xl">
        <Markdown content={content} />
      </div>

      <div className="giscus max-w-2xl"></div>
      {/* preferred_color_scheme */}
      <Script
        src="https://giscus.app/client.js"
        data-repo="lucapaguroo/codestus.com"
        data-repo-id="R_kgDOIhp2kQ"
        data-category="Comments"
        data-category-id="DIC_kwDOIhp2kc4CTID8"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        data-loading="lazy"
        crossOrigin="anonymous"
        async
      />
      <ScrollRestoration />
    </div>
  );
};

export default PostItem;
