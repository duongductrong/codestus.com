import { db } from "@/db"
import { postTable, postTagsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

interface RouteParams {
  params: {
    id: string
  }
}

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).optional(),
  topicId: z.number().nullable().optional(),
  tags: z.array(z.number()).optional(),
})

// GET /api/posts/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id)

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 })
    }

    const post = await db.query.postTable.findFirst({
      where: eq(postTable.id, id),
      with: {
        tags: {
          with: {
            tag: true,
          },
        },
        topic: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

// PATCH /api/posts/[id]
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id)

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = updatePostSchema.parse(body)

    const post = await db.transaction(async (tx) => {
      // Update post
      const { tags, ...postData } = validatedData
      const [updatedPost] = await tx
        .update(postTable)
        .set(postData)
        .where(eq(postTable.id, id))
        .returning()

      if (!updatedPost) {
        throw new Error("Post not found")
      }

      // Update tags if provided
      if (tags) {
        // Remove existing tags
        await tx.delete(postTagsTable).where(eq(postTagsTable.postId, id))

        // Add new tags
        if (tags.length > 0) {
          await tx.insert(postTagsTable).values(
            tags.map((tagId) => ({
              postId: id,
              tagId,
            }))
          )
        }
      }

      return updatedPost
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    if (error instanceof Error && error.message === "Post not found") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}
