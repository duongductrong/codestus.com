import { db } from "@/db"
import { userTable } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(["user", "admin"]).default("user"),
})

export async function GET() {
  try {
    const users = await db.query.userTable.findMany({
      orderBy: [desc(userTable.createdAt)],
    })

    // Remove password from response
    const sanitizedUsers = users.map(({ password: _pass, ...user }) => user)
    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, validatedData.email),
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user
    const [user] = await db
      .insert(userTable)
      .values({
        ...validatedData,
        password: hashedPassword,
      })
      .returning()

    // Return user data (excluding password)
    const { password: _pass, ...userData } = user
    return NextResponse.json(userData, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
} 