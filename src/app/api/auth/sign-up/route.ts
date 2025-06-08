import { db } from "@/db"
import { userTable } from "@/db/schema"
import { hashPassword } from "@/utils/auth"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signUpSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.query.userTable.findFirst({
      where: (users) => eq(users.email, validatedData.email),
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const [user] = await db
      .insert(userTable)
      .values({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      })
      .returning()

    // Return user data (excluding password)
    const { password: _, ...userData } = user
    return NextResponse.json(userData, { status: 201 })
  } catch (error) {
    console.error("Error signing up:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 })
  }
}
