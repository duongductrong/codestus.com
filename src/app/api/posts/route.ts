import { db } from "@/db"
import { Post, postTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

// GET /api/posts
export async function GET() {
  try {
    const posts = await db.query.postTable.findMany({
      orderBy: [postTable.createdAt],
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
    const post = await db.insert(postTable).values(body).returning()
    return NextResponse.json(post[0])
  } catch (error) {
    console.error("Error creating post:", error)
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

    const post = await db
      .update(postTable)
      .set(body)
      .where(eq(postTable.id, id))
      .returning()

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