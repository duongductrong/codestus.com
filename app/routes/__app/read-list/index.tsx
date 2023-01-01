import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { AxiosError } from "axios";
import clsx from "clsx";
import dayjs from "dayjs";
import { Badge, Button } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MdLink } from "react-icons/md";
import Section from "~/components/Common/Section/Section";
import { HTTP_CODE } from "~/libs/constants/http-response-code";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import type { Item, RaindropData } from "~/libs/services/raindrop.service";
import raindropService from "~/libs/services/raindrop.service";

export type ReadListIndexProps = {};

export type ReadListLoaderData = RaindropData & { isOverPosts: boolean };

const POST_PER_PAGE = 12;

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;

    const { data } = await raindropService.readLists({ page, perPage: POST_PER_PAGE });
    const countItems = data.items.length * (page + 1);
    const maxCountPost = data.count;

    const isOverPosts = countItems >= maxCountPost;

    return json({ ...data, isOverPosts }, HTTP_CODE.SUCCESSFUL.OK);
  } catch (e) {
    const error = e as AxiosError<any, any>;

    return json(error.cause, HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER);
  }
};

const ReadListIndex: FC<ReadListIndexProps> = (props) => {
  const fetcher = useFetcher<ReadListLoaderData>();
  const loaderData = useLoaderData<ReadListLoaderData>();

  const [posts, setPosts] = useState<Item[]>([]);
  const [hasOverPosts, setHasOverPosts] = useState<boolean>(loaderData.isOverPosts);

  const onLoadMore = () => {
    const prefetchUrl = `${GENERAL_ROUTES.READ_LIST}?index&page=${1}`;
    fetcher.load(prefetchUrl);
  };

  // Listen fetcher loaded and set more posts
  useEffect(() => {
    const fetcherData = fetcher.data;
    const fetcherDataItems = fetcherData?.items as any as Item[];

    setPosts((prevPosts) => [...prevPosts].concat(fetcherDataItems ?? []));
    setHasOverPosts(fetcherData?.isOverPosts ?? false);
  }, [fetcher.data]);

  useEffect(() => {
    setPosts(loaderData.items as any as Item[]);
    setHasOverPosts(loaderData.isOverPosts);
  }, [loaderData]);

  return (
    <fetcher.Form>
      <Section className="mt-14" title="Collection" subtitle="My read list" direction="center">
        <div className="grid grid-cols-3 gap-4">
          {posts?.map((post) => (
            <div
              className={clsx(
                "flex flex-col rounded-md border dark:border-neutral-700 hover:border-neutral-300 p-4",
                "bg-white dark:bg-neutral-900",
              )}
              key={post._id}>
              <div className="flex gap-4 mb-2">
                {post.tags.map((tagName) => (
                  <Badge key={tagName}>{tagName}</Badge>
                ))}
              </div>

              <h3 className="font-bold text-lg mb-2 dark:text-white">{post.title}</h3>
              <span className="block mb-4 text-xs dark:text-gray-300">
                {dayjs(post.lastUpdate).format("MMMM DD, YYYY")}
              </span>
              <p className="text-sm mb-4 dark:text-gray-400">{post.excerpt}</p>

              <img className="w-full h-[100px] object-cover rounded-md mt-auto" src={post.cover} alt={post.title} />

              <a className="mt-4 w-full" href={post.link} target="_blank" rel="noreferrer">
                <Button size="sm" className="w-full">
                  Read article <MdLink className="ml-2" size={18} />
                </Button>
              </a>
            </div>
          ))}
        </div>

        {!hasOverPosts && (
          <div className="flex justify-center mt-12 sticky bottom-4">
            <Button type="button" onClick={onLoadMore}>
              Load more
            </Button>
          </div>
        )}
      </Section>
    </fetcher.Form>
  );
};

export default ReadListIndex;
