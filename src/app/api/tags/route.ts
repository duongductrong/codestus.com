import { auth, isAdmin } from "@/app/api/auth"
import { db } from "@/db"
import { tagTable } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import slugify from "slugify"

const createTagSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
})

export async function GET() {
  try {
    const tags = await db.query.tagTable.findMany({
      orderBy: [desc(tagTable.created_at)],
    })

    return NextResponse.json(tags)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate and check admin privileges
    const user = await auth(request)
    if (!isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createTagSchema.parse(body)

    // Generate slug from name
    const slug = slugify(validatedData.name, { lower: true })

    // Check if slug already exists
    const existingTag = await db.query.tagTable.findFirst({
      where: eq(tagTable.slug, slug),
    })

    if (existingTag) {
      return NextResponse.json({ error: "A tag with this name already exists" }, { status: 400 })
    }

    // Create tag
    const [tag] = await db
      .insert(tagTable)
      .values({
        name: validatedData.name,
        slug,
        description: validatedData.description,
      })
      .returning()

    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error("Error creating tag:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    // Handle authentication errors
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 })
  }
}
