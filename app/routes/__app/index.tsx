import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  SerializeFrom,
} from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
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
import type { INotionPost } from "~/libs/@types/generalType";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import { TRANSITION_STATE, TRANSITION_TYPE } from "~/libs/constants/remixHook";
import postService from "~/libs/services/post.service";
import SimpleCardSkeleton from "~/components/Common/Skeleton/SimpleCardSkeleton";
import { seoUtils } from "~/libs/utils/seoUtils";
import type { MetaTagsFunction } from "~/components/Common/SEO/MetaTags";

export interface ILoaderDataResponse {
  recentPosts: INotionPost[];
  latestPosts: INotionPost[];
  latestHasMore: boolean;
  latestNextCursor: string;
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
  const url = new URL(request.url);
  const startCursor = url.searchParams.get("startCursor");

  const { data: recentPosts } = await postService.getMostViewsPostsPublished({
    pageSize: 7,
  });

  const {
    data: latestPosts,
    hasMore: latestHasMore,
    nextCursor: latestNextCursor,
  } = await postService.getLatestPostsPublished({
    startCursor: startCursor ?? undefined,
    pageSize: 5,
  });

  return {
    recentPosts,
    latestPosts,
    latestHasMore,
    latestNextCursor,
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
  const { recentPosts, latestPosts, latestNextCursor } =
    useLoaderData<ILoaderDataResponse>();
  const fetcher = useFetcher();
  const transition = useTransition();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const hasStartCursor = searchParams.get("startCursor");
  const isLoadingLatestPosts =
    transition.state === TRANSITION_STATE.LOADING &&
    transition.type === TRANSITION_TYPE.NORMAL_LOAD &&
    transition.location?.pathname === GENERAL_ROUTES.HOME;

  const paginationNextTo = queryString.stringify({
    startCursor: latestNextCursor,
  });

  const onPrevPagination = () => {
    if (hasStartCursor) {
      navigate(-1);
    }
  };

  return (
    <fetcher.Form>
      <div className="py-[100px] mb-12">
        <h2 className="text-gray-500 dark:text-gray-400 font-semibold mb-4">
          Hi the software engineers,
        </h2>
        <h3 className="text-black dark:text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-snug mb-12">
          Hey, I'm codestus. <br />
          Providing knowledge software development.
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
              key={post.id}
              title={post.title}
              desc={post.description}
              source={index < 3 ? post?.cover : undefined}
              url={GENERAL_ROUTES.POST_DETAIL(post.slug)}
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
            key={post.id}
            title={post.title}
            desc={post.description}
            url={GENERAL_ROUTES.POST_DETAIL(post.slug)}
            className={clsx("mb-4")}
            views={post.views}
            loadingSkeleton={isLoadingLatestPosts}
          />
        ))}

        <SimplePagination
          nextTo={`.?${paginationNextTo}`}
          onPrev={onPrevPagination}
          prevDisabled={!hasStartCursor}
          nextDisabled={!latestNextCursor}
        />
      </Section>
    </fetcher.Form>
  );
};

export default Index;
