import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import type { INotionOriginalPost, INotionPost } from "../@types/generalType";
import notionService from "./notion.server";

export interface IPSGetAllArgs {
  pageSize?: number;
  startCursor?: string;

  query: Pick<QueryDatabaseParameters, "sorts" | "filter">;
}

export interface IPSGetMostViewsPostsPublishedArgs
  extends Omit<IPSGetAllArgs, "query" | "startCursor"> {}

export interface IPSGetLatestPostsPublishedArgs
  extends Omit<IPSGetAllArgs, "query"> {}

class PostService {
  async getAll({ pageSize, startCursor, query }: IPSGetAllArgs) {
    const { sorts, filter } = query;
    const notionResponse = await notionService.client().databases.query({
      database_id: notionService.databaseId(),
      start_cursor: startCursor,
      filter: filter,
      sorts: sorts,
      page_size: pageSize ?? 10,
    });

    const rawPosts = notionResponse.results as INotionOriginalPost[];

    const posts = rawPosts.map((rawPost) => {
      return {
        createdAt: rawPost.properties.createdAt.created_time,
        createdBy: rawPost.properties.createdBy.created_by,
        lastUpdatedAt: rawPost.properties.lastUpdatedAt.last_edited_time,
        lastUpdatedBy: rawPost.properties.lastUpdatedBy.last_edited_by,
        publishAt: rawPost.properties.createdAt.created_time,
        status: rawPost.properties.createdAt.created_time,
        tags: rawPost.properties.tags,
        cover: rawPost.cover?.file?.url ?? rawPost.cover?.external?.url,
        title: rawPost?.properties?.Name.title[0].plain_text,
        slug: rawPost.properties.slug.rich_text[0]?.plain_text,
        description: rawPost.properties.description.rich_text[0]?.plain_text,
        views: rawPost.properties?.views?.number ?? 0,
        id: rawPost.id,
      };
    }) as INotionPost[];

    return {
      hasMore: notionResponse.has_more,
      nextCursor: notionResponse.next_cursor,
      data: posts,
    };
  }

  async getMostViewsPostsPublished(args: IPSGetMostViewsPostsPublishedArgs) {
    const { pageSize } = args;
    return this.getAll({
      pageSize: pageSize,
      query: {
        filter: {
          property: "status",
          status: {
            equals: "Published",
          },
        },
        sorts: [
          {
            property: "views",
            direction: "descending",
          },
        ],
      },
    });
  }

  async getLatestPostsPublished(args: IPSGetLatestPostsPublishedArgs) {
    const { pageSize, startCursor } = args;
    return this.getAll({
      pageSize: pageSize,
      query: {
        filter: {
          property: "status",
          status: {
            equals: "Published",
          },
        },
        sorts: [
          {
            property: "publishAt",
            direction: "descending",
          },
        ],
      },
      startCursor,
    });
  }

  async detail(slug: string) {
    const result = await this.getAll({
      pageSize: 1,
      query: {
        filter: {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      },
    });

    const post = result.data[0];
    const blocksToMarkdown = await notionService.n2mMarkdown(post.id);

    return {
      ...post,
      childrenMarkdown: blocksToMarkdown,
    };
  }

  async incPageViews(pageId: string) {
    const pageViews = ((
      (await notionService.client().pages.retrieve({
        page_id: pageId,
      })) as { [x: string]: any }
    ).properties?.views?.number ?? 0) as number;

    const result = await notionService.client().pages.update({
      page_id: pageId,
      properties: {
        views: {
          number: pageViews + 1,
        },
      },
    });

    return result;
  }
}

const postService = new PostService();

export default postService;
