import { db } from "@/db"

export const getPosts = async () => {
  const posts = await db.query.postTable.findMany()

  return posts
}
