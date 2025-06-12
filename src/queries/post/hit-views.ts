import { db } from "@/db"
import { postTable } from "@/db/schema"
import { eq, or } from "drizzle-orm"

export const hitViews = async (slugOrId: string | number) => {
  const post = await db.query.postTable.findFirst({
    where: or(eq(postTable.slug, slugOrId.toString()), eq(postTable.id, Number(slugOrId))),
  })

  if (!post) return null

  const views = await db
    .update(postTable)
    .set({
      views: (post.views || 0) + 1,
    })
    .where(eq(postTable.id, post.id))

  return views
}
