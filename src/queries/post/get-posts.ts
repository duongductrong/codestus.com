import { db } from "@/db"
import { postTable } from "@/db/schema"
import { desc } from "drizzle-orm"

export const getPosts = async () => {
  const posts = await db.query.postTable.findMany({
    orderBy: [desc(postTable.publishAt)],
  })

  return posts
}
