import { allTags } from "@/constants/tags"
import { db } from "@/db"
import { Post as LocalPost, allPosts } from "content-collections"
import { Post, postTable, postTagsTable } from "@/db/schema"
import dayjs from "dayjs"

export async function GET(request: Request, response: Response) {
  // const tags = await db.query.tagTable.findMany()
  // const collectTagsViaName = tags.reduce(
  //   (acc, cur) => ({
  //     ...acc,
  //     [cur.name]: cur.id,
  //   }),
  //   {} as Record<string, number>
  // )
  // const posts = await db.query.postTable.findMany()
  // const collectPostsViaSlug = posts.reduce(
  //   (acc, cur) => ({
  //     ...acc,
  //     [cur.slug]: cur.id,
  //   }),
  //   {} as Record<string, number>
  // )

  // const localPosts = allPosts.map((post) => ({
  //   postId: collectPostsViaSlug[post.slug],
  //   tagIds: post.tags?.split(",").map((tagName) => collectTagsViaName[tagName]) || [],
  // }))

  // const migratedPosts = localPosts.flatMap((post) =>
  //   post.tagIds.map((tagId) => ({
  //     postId: post.postId,
  //     tagId,
  //   }))
  // )

  // await db.insert(postTagsTable).values(migratedPosts)

  return Response.json({ ok: true })

  // TODO: Uncomment this when you want to insert tags
  // await db.insert(tagTable).values(
  //   tags.map<Omit<Tag, "id">>((tag) => ({
  //     name: tag.name,
  //     slug: tag.slug,
  //     description: tag.description,
  //     created_at: dayjs().toDate(),
  //     updated_at: dayjs().toDate(),
  //   }))
  // )

  // await db.insert(postTable).values(
  //   posts.map<Omit<Post, "id">>((post) => ({
  //     title: post.title,
  //     slug: post.slug,
  //     description: post.description,
  //     thumbnail: post.thumbnail || null,
  //     content: post.content,
  //     views: post.views || 0,
  //     status: "published",
  //     publish_at: post.publishAt ? dayjs(post.publishAt).toDate() : null,
  //     created_at: dayjs(post.createdAt).toDate() || dayjs().toDate(),
  //     updated_at: dayjs(post.updatedAt).toDate() || dayjs().toDate(),
  //     topicId: null,
  //   }))
  // )

  return Response.json({ ok: true })
}
