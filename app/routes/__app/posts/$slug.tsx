import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
    const content = markdown(postItem?.content ?? "");

    // Auto inc every loader blog
    // Only run on production
    if (process.env?.APP_ENV === "production") {
      // postService.incPageViews(postItem.postId);
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
      <div className="mb-20">
        <h2 className="text-black dark:text-white text-4xl mb-8 text-center font-bold">
          {post?.title}
        </h2>

        <div className="flex items-center justify-center space-x-4">
          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400">
            Last updated: {dayjs(post?.updated_at).format("DD/MM/YYYY")}
          </span>

          <MdRemove className="text-neutral-600 dark:text-neutral-400" />

          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400">
            {Intl.NumberFormat("vi-VN").format(post?.views ?? 0)} views
          </span>
        </div>
      </div>

      <div className="prose dark:prose-invert mx-auto mb-12 max-w-2xl">
        <Markdown content={content} />
      </div>

      <div className="max-w-2xl mx-auto flex justify-between flex-wrap">
        <Link
          to="#"
          className="inline-flex items-center font-normal text-neutral-600 dark:text-neutral-400">
          <img
            className="w-12 h-12 rounded-lg mr-4"
            src={post?.users?.avatar ?? ""}
            alt={post?.users.name}
          />
          <div>
            <p className="font-bold text-neutral-700 dark:text-neutral-400">
              {post?.users.name}
            </p>
            <p className="text-sm text-neutral-500">Frontend Developer</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
