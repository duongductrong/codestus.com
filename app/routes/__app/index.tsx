import type { Post, PostTag, Tag } from "@prisma/client";
import type {
  ActionFunction,
  LoaderFunction,
  SerializeFrom,
} from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useTransition,
} from "@remix-run/react";
import { Button } from "flowbite-react";
import queryString from "querystring";
import { MdHome } from "react-icons/md";
import type { DynamicLinksFunction } from "remix-utils";
import SimpleCard from "~/components/Common/Card/SimpleCard";
import SimplePagination from "~/components/Common/Pagination/SimplePagination";
import SearchInput from "~/components/Common/SearchInput/SearchInput";
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

  queryParams: { [x: string]: string };
}

const dynamicLinks: DynamicLinksFunction<SerializeFrom<typeof loader>> = ({
  location,
}) => {
  return [];
};

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const perPageLatestPosts = 5;
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const searchParamsPage = url.searchParams.get("page") ?? 1;
  const page = Number.isNaN(Number(searchParamsPage))
    ? 1
    : Number(searchParamsPage);

  const [latestPosts, totalPosts] = await prisma.$transaction([
    postService.getLatestPostsPublished({
      pageSize: perPageLatestPosts,
      page: Number(page),
      searchQuery: q,
    }),
    postService.countAllPublishedPosts({
      OR: [
        {
          title: {
            contains: q,
          },
        },
        {
          description: {
            contains: q,
          },
        },
        {
          slug: {
            contains: q,
          },
        },
      ],
    }),
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

    queryParams: queryString.parse(url.search?.replace("?", "")),
  };
};

export const action: ActionFunction = () => {
  return {};
};

export const metaTags: MetaTagsFunction = (data: any) => {
  return {
    title: "Trang chủ",
  };
};

export const handle = {
  dynamicLinks,
  metaTags,
};

const Index = () => {
  const { latestPosts, pagination, queryParams } =
    useLoaderData<ILoaderDataResponse>();
  const transition = useTransition();
  const location = useLocation();

  const isLoadingLatestPosts =
    transition.state === TRANSITION_STATE.LOADING &&
    transition.type === TRANSITION_TYPE.NORMAL_LOAD &&
    transition.location?.pathname === GENERAL_ROUTES.HOME;
  const hasPosts = !!latestPosts.length;

  const clientSearchParams = queryString.parse(
    location.search?.replace("?", ""),
  ) as any;
  const currentPage = queryParams?.page ?? 1;

  const uiPagination = {
    next: {
      query: queryString.stringify({
        ...queryParams,
        page: pagination.nextPage,
      }),
      disabled: !pagination.nextPage,
    },
    previous: {
      query: queryString.stringify({
        ...queryParams,
        page: pagination.prevPage,
      }),
      disabled: !pagination.prevPage,
    },
  };

  console.log("clientSearchParams", clientSearchParams);

  return (
    <Form method="get">
      <Section
        className="mt-14"
        title="Latest blog."
        subtitle="The latest posts recently."
        direction="center">
        <SearchInput
          name="q"
          searchButtonType="submit"
          searchButtonText="Search"
          className="mb-24 max-w-[600px] mx-auto"
          placeholder="Searching a post you need..."
          searchButtonProps={{
            type: "submit",
          }}
          defaultValue={clientSearchParams.q}
        />

        {hasPosts ? (
          latestPosts.map((post, index) => (
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
          ))
        ) : (
          <div className="text-center font-medium text-gray-500">
            <Link to="/" className="mb-4">
              <Button className="mx-auto" size="xs">
                <MdHome size={24} />
              </Button>
            </Link>

            <span className="inline-block mt-4 text-xl">
              No matching posts found
            </span>
          </div>
        )}

        {hasPosts && (
          <div className="flex items-center justify-center sticky bottom-3">
            <SimplePagination
              className="mt-24"
              prevText="Latest"
              nextText="Oldest"
              currentPage={currentPage}
              nextTo={`.?${uiPagination.next.query}`}
              prevTo={`.?${uiPagination.previous.query}`}
              nextDisabled={uiPagination.next.disabled}
              prevDisabled={uiPagination.previous.disabled}
            />
          </div>
        )}
      </Section>
    </Form>
  );
};

export default Index;
