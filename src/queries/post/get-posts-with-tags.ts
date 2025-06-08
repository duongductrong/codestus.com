import { db } from "@/db"
import { eq, not } from "drizzle-orm"

export const getPostsWithTags = async () => {
  const posts = await db.query.postTable.findMany({
    where: (post) => not(eq(post.status, "draft")),
    with: {
      tags: {
        with: {
          tag: true,
        },
      },
    },
  })

  return posts
}
