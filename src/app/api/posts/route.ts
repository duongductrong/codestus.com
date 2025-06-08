import { db } from "@/db"
import { postTable, postTagsTable } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  topicId: z.number().nullable().optional(),
  tags: z.array(z.number()).optional(),
})

// GET /api/posts
export async function GET() {
  try {
    const posts = await db.query.postTable.findMany({
      orderBy: [desc(postTable.createdAt)],
      with: {
        tags: {
          with: {
            tag: true,
          },
        },
        topic: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST /api/posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createPostSchema.parse(body)

    const post = await db.transaction(async (tx) => {
      const [newPost] = await tx
        .insert(postTable)
        .values({
          title: validatedData.title,
          slug: validatedData.slug,
          description: validatedData.description ?? null,
          thumbnail: validatedData.thumbnail ?? null,
          content: validatedData.content ?? null,
          status: validatedData.status,
          topicId: validatedData.topicId ?? null,
        })
        .returning()

      if (validatedData.tags?.length) {
        await tx.insert(postTagsTable).values(
          validatedData.tags.map((tagId) => ({
            postId: newPost.id,
            tagId,
          }))
        )
      }

      return newPost
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

// PUT /api/posts/:id
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(request.nextUrl.searchParams.get("id"))

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    const post = await db.update(postTable).set(body).where(eq(postTable.id, id)).returning()

    return NextResponse.json(post[0])
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

// DELETE /api/posts/:id
export async function DELETE(request: NextRequest) {
  try {
    const id = Number(request.nextUrl.searchParams.get("id"))

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    await db.delete(postTable).where(eq(postTable.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
