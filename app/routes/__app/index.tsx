import type { Post, PostTag, Tag } from "@prisma/client";
import type {
  ActionFunction,
  LoaderFunction,
  SerializeFrom,
} from "@remix-run/node";
import { useFetcher, useLoaderData, useTransition } from "@remix-run/react";
import clsx from "clsx";
import queryString from "querystring";
import type { DynamicLinksFunction } from "remix-utils";
import SimpleCard from "~/components/Common/Card/SimpleCard";
import SimplePagination from "~/components/Common/Pagination/SimplePagination";
import Section from "~/components/Common/Section/Section";
import type { MetaTagsFunction } from "~/components/Common/SEO/MetaTags";
import { TRANSITION_STATE, TRANSITION_TYPE } from "~/libs/constants/remixHook";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import { prisma } from "~/libs/services/db.server";
import postService from "~/libs/services/post.service";

export interface ILoaderDataResponse {
  // recentPosts: Post[];
  latestPosts: (Post & {
    post_tags: PostTag &
      {
        tag: Tag;
      }[];
  })[];
  pagination: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

const dynamicLinks: DynamicLinksFunction<SerializeFrom<typeof loader>> = ({
  location,
}) => {
  return [];
};

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const perPageLatestPosts = 5;
  const url = new URL(request.url);
  const searchParamsPage = url.searchParams.get("page") ?? 1;
  const page = Number.isNaN(Number(searchParamsPage))
    ? 1
    : Number(searchParamsPage);

  const [latestPosts, totalPosts] = await prisma.$transaction([
    postService.getLatestPostsPublished({
      pageSize: perPageLatestPosts,
      page: Number(page),
    }),
    postService.countAllPublishedPosts(),
  ]);

  const totalPages = Math.ceil(totalPosts / perPageLatestPosts);
  const nextPage = page + 1 <= totalPages ? page + 1 : null;
  const prevPage = page - 1 > 0 ? page - 1 : null;

  return {
    latestPosts,
    pagination: {
      currentPage: page,
      nextPage,
      prevPage,
    },
  };
};

export const metaTags: MetaTagsFunction = (data: any) => {
  return {
    title: "Trang chủ",
  };
};

export const action: ActionFunction = () => {
  return {};
};

export const handle = {
  dynamicLinks,
  metaTags,
};

const Index = () => {
  const { latestPosts, pagination } = useLoaderData<ILoaderDataResponse>();
  const fetcher = useFetcher();
  const transition = useTransition();

  const isLoadingLatestPosts =
    transition.state === TRANSITION_STATE.LOADING &&
    transition.type === TRANSITION_TYPE.NORMAL_LOAD &&
    transition.location?.pathname === GENERAL_ROUTES.HOME;

  const uiPagination = {
    next: {
      query: queryString.stringify({
        page: pagination.nextPage,
      }),
      disabled: !pagination.nextPage,
    },
    previous: {
      query: queryString.stringify({
        page: pagination.prevPage,
      }),
      disabled: !pagination.prevPage,
    },
  };

  return (
    <fetcher.Form>
      <Section
        className="mt-14"
        title="Latest blog."
        subtitle="The latest posts recently."
        direction="center">
        {latestPosts.map((post, index) => (
          <SimpleCard
            key={post.postId}
            title={post.title}
            desc={post.description ?? ""}
            url={GENERAL_ROUTES.POST_DETAIL(post.slug)}
            views={post.views}
            loadingSkeleton={isLoadingLatestPosts}
            estimateReadTime={Math.ceil((post.content?.length ?? 1) / 1250)}
            lastUpdated={post.publish_at ?? ""}
            tags={post.post_tags.map((postTag) => postTag.tag) as Tag[]}
            tagUrl={(slug) => GENERAL_ROUTES.TAG_DETAIL(slug ?? "")}
          />
        ))}

        <div className="flex items-center justify-center">
          <SimplePagination
            className="mt-24"
            prevText="Latest"
            nextText="Oldest"
            nextTo={`.?${uiPagination.next.query}`}
            prevTo={`.?${uiPagination.previous.query}`}
            nextDisabled={uiPagination.next.disabled}
            prevDisabled={uiPagination.previous.disabled}
          />
        </div>
      </Section>
    </fetcher.Form>
  );
};

export default Index;
