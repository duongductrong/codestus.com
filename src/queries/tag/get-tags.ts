import { db } from "@/db"

export const getTags = async () => {
  const tags = await db.query.tagTable.findMany()

  return tags
}
