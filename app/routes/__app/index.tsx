import type { Post } from "@prisma/client";
import type {
  ActionFunction,
  LoaderFunction,
  SerializeFrom,
} from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import clsx from "clsx";
import queryString from "querystring";
import type { DynamicLinksFunction } from "remix-utils";
import Button from "~/components/Common/Button/Button";
import Card from "~/components/Common/Card/Card";
import SimpleCard from "~/components/Common/Card/SimpleCard";
import SimplePagination from "~/components/Common/Pagination/SimplePagination";
import Section from "~/components/Common/Section/Section";
import type { MetaTagsFunction } from "~/components/Common/SEO/MetaTags";
import { TRANSITION_STATE, TRANSITION_TYPE } from "~/libs/constants/remixHook";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import { prisma } from "~/libs/services/db.server";
import postService from "~/libs/services/post.service";

export interface ILoaderDataResponse {
  recentPosts: Post[];
  latestPosts: Post[];
  pagination: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}

const dynamicLinks: DynamicLinksFunction<SerializeFrom<typeof loader>> = ({
  location,
}) => {
  return [
    {
      rel: "canonical",
      href: `${location.hash}`,
    },
  ];
};

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const perPageLatestPosts = 5;
  const url = new URL(request.url);
  const searchParamsPage = url.searchParams.get("page") ?? 1;
  const page = Number.isNaN(Number(searchParamsPage))
    ? 1
    : Number(searchParamsPage);

  const [latestPosts, recentPosts, totalPosts] = await prisma.$transaction([
    postService.getLatestPostsPublished({
      pageSize: perPageLatestPosts,
      page: Number(page),
    }),
    postService.getMostViewsPostsPublished({
      pageSize: 7,
    }),
    postService.countAllPublishedPosts(),
  ]);

  const totalPages = Math.ceil(totalPosts / perPageLatestPosts);
  const nextPage = page + 1 <= totalPages ? page + 1 : null;
  const prevPage = page - 1 > 0 ? page - 1 : null;

  return {
    recentPosts,
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
  const { recentPosts, latestPosts, pagination } =
    useLoaderData<ILoaderDataResponse>();
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
      <div className="py-[100px] mb-12">
        <h2 className="text-gray-500 dark:text-gray-400 font-semibold mb-4">
          Hi the software engineers,
        </h2>
        <h3 className="text-black dark:text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-snug mb-12">
          Help people store and <br />
          quality knowledge into software products
        </h3>

        <div className="space-x-4">
          <Button>Let's go</Button>
        </div>
      </div>

      <Section
        title="Most views."
        subtitle="Many engineers care about some posts."
        className="mb-12">
        <div className="grid md:grid-cols-12 gap-4">
          {recentPosts.map((post, index) => (
            <Card
              key={post.postId}
              title={post.title}
              desc={post.description ?? ""}
              source={index < 3 ? post?.thumbnail ?? "" : undefined}
              url={GENERAL_ROUTES.POST_DETAIL(post.slug)}
              pageViews={post.views}
              className={clsx({
                "col-span-4": index < 3,
                "col-span-4 md:col-span-3": index >= 3,
              })}></Card>
          ))}
        </div>
      </Section>

      <Section title="Latest blog." subtitle="The latest posts recently.">
        {latestPosts.map((post, index) => (
          <SimpleCard
            key={post.postId}
            title={post.title}
            desc={post.description ?? ""}
            url={GENERAL_ROUTES.POST_DETAIL(post.slug)}
            className={clsx("mb-4")}
            views={post.views}
            loadingSkeleton={isLoadingLatestPosts}
          />
        ))}

        <SimplePagination
          prevText="Latest"
          nextText="Oldest"
          nextTo={`.?${uiPagination.next.query}`}
          prevTo={`.?${uiPagination.previous.query}`}
          nextDisabled={uiPagination.next.disabled}
          prevDisabled={uiPagination.previous.disabled}
        />
      </Section>
    </fetcher.Form>
  );
};

export default Index;
