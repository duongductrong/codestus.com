import { db } from "@/db"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["user", "admin"]).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, params.id),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password from response
    const { password: _, ...userData } = user
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    // Check if user exists
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.id, params.id),
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If email is being updated, check if it's already taken
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailTaken = await db.query.userTable.findFirst({
        where: eq(userTable.email, validatedData.email),
      })

      if (emailTaken) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
    }

    // Hash password if provided
    const updateData = { ...validatedData }
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10)
    }

    // Update user
    const [user] = await db
      .update(userTable)
      .set(updateData)
      .where(eq(userTable.id, params.id))
      .returning()

    // Return user data (excluding password)
    const { password: _, ...userData } = user
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error updating user:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user exists
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.id, params.id),
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete user
    await db.delete(userTable).where(eq(userTable.id, params.id))

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
} 