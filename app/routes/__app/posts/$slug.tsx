import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { ScrollRestoration, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import _compact from "lodash/compact";
import "prismjs";
import { MdRemove } from "react-icons/md";
import Markdown from "~/components/Common/Markdown/Markdown";
import type { MetaTagsFunction } from "~/components/Common/SEO/MetaTags";
import Tag from "~/components/Common/Tag/Tag";
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
    <div className="mt-[60px] max-w-2xl mx-auto">
      <div className="mb-20">
        <div className="space-x-4 space-y-4 text-center mb-8">
          {post?.post_tags.map((tag) => (
            <Tag className="text-sm">#{tag.tag.name}</Tag>
          ))}
        </div>

        <h2 className="text-black dark:text-white text-4xl mb-8 font-bold max-w-2xl text-center mx-auto">
          {post?.title}
        </h2>

        <div className="flex items-center justify-center space-x-4 space-y-2 sm:space-y-0 flex-wrap break-words">
          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400 text-sm">
            bởi{" "}
            <a
              href={`//github.com/bearce`}
              className="hover:text-blue-600 font-bold underline underline-offset-2">
              {post?.users.name}
            </a>{" "}
            từ {dayjs(post?.updated_at).format("MMM DD YYYY")}
          </span>

          <MdRemove className="text-neutral-600 dark:text-neutral-400 m-0" />

          <span className="inline-block font-normal text-neutral-600 dark:text-neutral-400 text-sm">
            {Intl.NumberFormat("vi-VN").format(post?.views ?? 0)} lượt xem
          </span>
        </div>
      </div>

      <div className="prose md:prose-lg dark:prose-invert mx-auto mb-12 max-w-2xl">
        <Markdown content={content} />
      </div>

      {/* <div className="max-w-2xl mx-auto flex justify-between flex-wrap">
        <a
          rel="norefer noreferrer"
          target={"_blank"}
          href="https://github.com/bearce"
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
        </a>
      </div> */}
      <ScrollRestoration />
    </div>
  );
};

export default PostItem;
