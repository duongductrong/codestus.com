import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import "prismjs";
import { MdRemove } from "react-icons/md";
import Markdown from "~/components/Common/Markdown/Markdown";
import type { MetaTagsFunction } from "~/components/Common/SEO/MetaTags";
import { markdown } from "~/libs/services/markdown.server";
import postService from "~/libs/services/post.service";

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
    const slug = params.slug ?? "";
    const postItem = await postService.detail(slug);

    const content = markdown(postItem.childrenMarkdown);

    // Auto inc every loader blog
    // Only run on production
    if (process.env?.APP_ENV === "production") {
      postService.incPageViews(postItem.id);
    }

    return { post: postItem, content };
  } catch {
    throw new Response("Not found", {
      status: 404,
    });
  }
};

export const metaTags: MetaTagsFunction = ({ data, parentsData }) => {
  const { post }: ILoaderDataPostItem = data;
  return {
    title: post?.title,
  };
};

export const handle = { metaTags };

const PostItem = (props: NotionPageItemProps) => {
  const { post, content } = useLoaderData<ILoaderDataPostItem>();

  return (
    <div className="mt-[60px]">
      <div className="mb-12">
        <h2 className="text-black dark:text-white text-4xl mb-6 text-center font-bold">
          {post.title}
        </h2>

        <div className="flex items-center justify-center space-x-4">
          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400">
            Last updated: {dayjs(post.lastUpdatedAt).format("DD/MM/YYYY")}
          </span>

          <MdRemove className="text-neutral-600 dark:text-neutral-400" />

          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400">
            {Intl.NumberFormat("vi-VN").format(post.views)} views
          </span>
          {/* 
          <MdRemove className="text-neutral-600 dark:text-neutral-400" />

          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400">
            Author: {post.createdBy.name}
          </span> */}
        </div>
      </div>

      <div className="prose dark:prose-invert mx-auto">
        <Markdown content={content} />
      </div>
    </div>
  );
};

export default PostItem;
