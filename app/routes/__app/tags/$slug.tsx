import type { SEOHandle } from "@balavishnuvj/remix-seo";
import type { Post, Tag } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SimpleCard from "~/components/Common/Card/SimpleCard";
import SimplePagination from "~/components/Common/Pagination/SimplePagination";
import Section from "~/components/Common/Section/Section";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import postService from "~/libs/services/post.service";
import tagService from "~/libs/services/tag.service";

export interface TagPageProps {}

export interface ITagPageLoader {
  tag: Tag;
  posts: Post[];
  paginate: {
    post: {
      nextPage?: number;
      previousPage?: number;
    };
  };
}

export interface ITagPageLoaderParams {
  slug?: string;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = params as ITagPageLoaderParams;
  const url = new URL(request.url);

  if (!slug) throw new Response("Not found", { status: 404 });

  try {
    const pageQueryParsed = Number(url.searchParams.get("page")) || 1;
    const pageSize = 5;
    const currentPage = Number.isNaN(pageQueryParsed) ? 1 : pageQueryParsed;

    const tag = await tagService.getTagBySlug(slug);
    const posts = await postService.getPostsPublishedByTag(tag.tagId, {
      publishedAtSort: "desc",
      page: currentPage,
      pageSize,
    });

    const countAllPostsPublished = await postService.countAllPublishedPosts({
      post_tags: { some: { tagId: tag.tagId } },
    });

    const totalPage = Math.ceil(countAllPostsPublished / pageSize);

    const postPaginate = {
      nextPage: currentPage + 1 <= totalPage ? currentPage + 1 : undefined,
      previousPage: currentPage - 1 >= 1 ? currentPage - 1 : undefined,
    };

    return json<ITagPageLoader>({
      tag,
      posts,
      paginate: {
        post: postPaginate,
      },
    });
  } catch {
    throw new Response("Not found", { status: 404 });
  }
};

export const _seoHandle: SEOHandle = {
  getSitemapEntries: async () => {
    console.log("call me");
    return (await tagService.getTags()).map((tag) => ({
      route: GENERAL_ROUTES.TAG_DETAIL(tag.slug),
      priority: 0.8,
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    }));
  },
};

export const handle = { ..._seoHandle };

const TagPage = (props: TagPageProps) => {
  const { tag, posts, paginate } = useLoaderData<ITagPageLoader>();
  const { post: postPaginate } = paginate;

  return (
    <Section
      title={tag.name}
      subtitle={tag.description ?? ""}
      className="mt-14">
      {posts.map((post) => (
        <SimpleCard
          key={post.slug}
          title={post.title}
          desc={post.description ?? ""}
          views={post.views}
          estimateReadTime={Math.ceil((post.content?.length ?? 0) / 1500)}
          url={GENERAL_ROUTES.POST_DETAIL(post.slug)}
        />
      ))}

      <div className="flex items-center justify-center sticky bottom-3 mt-12">
        <SimplePagination
          nextDisabled={!postPaginate.nextPage}
          nextTo={`.?page=${postPaginate.nextPage?.toString()}`}
          prevDisabled={!postPaginate.previousPage}
          prevTo={`.?page=${postPaginate.previousPage?.toString()}`}
        />
      </div>
    </Section>
  );
};

export default TagPage;
