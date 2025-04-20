import { db } from "@/db"

export const getPostsWithTags = async () => {
  const posts = await db.query.postTable.findMany({
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
