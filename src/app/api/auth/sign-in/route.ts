import { db } from "@/db"
import { userTable } from "@/db/schema"
import { verifyPassword } from "@/utils/auth"
import { eq } from "drizzle-orm"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { AUTH_TOKEN_KEY } from "../../../../lib/auth"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signInSchema.parse(body)

    // Find user by email
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, validatedData.email),
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password using Edge-compatible method
    const isValidPassword = await verifyPassword(validatedData.password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    // Set cookie
    cookies().set(AUTH_TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Return user data (excluding password)
    const { password: _, ...userData } = user
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error signing in:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
