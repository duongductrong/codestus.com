import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import type { Post, PrismaPromise } from "@prisma/client";
import type { INotionOriginalPost, INotionPost } from "../@types/generalType";
import { POST_STATUS } from "../constants/model";
import { prisma } from "./db.server";
import notionService from "./notion.server";

export interface IPSGetAllArgs {
  pageSize?: number;
  startCursor?: string;

  query: Pick<QueryDatabaseParameters, "sorts" | "filter">;
}

export interface IPSGetMostViewsPostsPublishedArgs {
  pageSize?: number;
}

export interface IPSGetLatestPostsPublishedArgs {
  pageSize?: number;
  page?: number;
}

class PostService {
  getMostViewsPostsPublished(args: IPSGetMostViewsPostsPublishedArgs) {
    return prisma.post.findMany({
      take: args.pageSize,
      where: {
        status: {
          equals: POST_STATUS.PUBLISHED,
        },
      },
      orderBy: {
        views: "desc",
      },
    });
  }

  getLatestPostsPublished(args: IPSGetLatestPostsPublishedArgs) {
    const { pageSize = 12, page = 1 } = args;

    const _page = page <= 1 ? 1 : page;
    const skipRecords = (_page - 1) * pageSize;

    return prisma.post.findMany({
      orderBy: {
        publish_at: "desc",
      },
      take: pageSize,
      skip: skipRecords,
    }) as PrismaPromise<Post[]>;
  }

  countAllPublishedPosts() {
    return prisma.post.count({
      where: {
        status: {
          equals: POST_STATUS.PUBLISHED,
        },
      },
    });
  }

  detail(slug: string) {
    return prisma.post.findFirst({
      where: {
        AND: [
          {
            slug: {
              equals: slug,
            },
          },
        ],
      },
      include: {
        users: true,
        post_tags: {
          select: {
            tag: {
              select: {
                name: true,
                slug: true,
                tagId: true,
              },
            },
          },
        },
      },
    });
  }

  incPageViews(slug: string) {
    // const pageViews = ((
    //   (await notionService.client().pages.retrieve({
    //     page_id: pageId,
    //   })) as { [x: string]: any }
    // ).properties?.views?.number ?? 0) as number;
    // const result = await notionService.client().pages.update({
    //   page_id: pageId,
    //   properties: {
    //     views: {
    //       number: pageViews + 1,
    //     },
    //   },
    // });
    // return result;

    return prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
}

const postService = new PostService();

export default postService;
