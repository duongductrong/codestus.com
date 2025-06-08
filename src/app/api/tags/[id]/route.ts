import { auth, isAdmin } from "@/app/api/auth"
import { db } from "@/db"
import { tagTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import slugify from "slugify"

const updateTagSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const tag = await db.query.tagTable.findFirst({
      where: eq(tagTable.id, id),
    })

    if (!tag) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(tag)
  } catch (error) {
    console.error("Error fetching tag:", error)
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate and check admin privileges
    const user = await auth(request)
    if (!isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 })
    }

    const id = Number(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid tag ID" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = updateTagSchema.parse(body)

    // Generate slug from name
    const slug = slugify(validatedData.name, { lower: true })

    // Check if slug already exists for other tags
    const existingTag = await db.query.tagTable.findFirst({
      where: eq(tagTable.slug, slug),
    })

    if (existingTag && existingTag.id !== id) {
      return NextResponse.json({ error: "A tag with this name already exists" }, { status: 400 })
    }

    // Update tag
    const [updatedTag] = await db
      .update(tagTable)
      .set({
        name: validatedData.name,
        slug,
        description: validatedData.description,
        updated_at: new Date(),
      })
      .where(eq(tagTable.id, id))
      .returning()

    if (!updatedTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTag)
  } catch (error) {
    console.error("Error updating tag:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    // Handle authentication errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate and check admin privileges
    const user = await auth(request)
    if (!isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 })
    }

    const id = Number(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid tag ID" }, { status: 400 })
    }

    // Delete tag
    const [deletedTag] = await db.delete(tagTable).where(eq(tagTable.id, id)).returning()

    if (!deletedTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json(deletedTag)
  } catch (error) {
    console.error("Error deleting tag:", error)
    // Handle authentication errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 })
  }
}
