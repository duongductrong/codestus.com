import { db } from "@/db"
import { Post, postTable } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export interface GetPostBySlugOptions {
  status?: Post["status"]
}

export const getPostBySlug = async (slug: string, options?: GetPostBySlugOptions) => {
  const identifier = slug
  const post = await db.query.postTable.findFirst({
    where: and(
      eq(postTable.slug, identifier),
      eq(postTable.status, options?.status || "published")
    ),
    with: {
      tags: {
        with: {
          tag: true,
        },
      },
    },
  })

  return post
}
