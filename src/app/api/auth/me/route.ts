import { db } from "@/db"
import { eq } from "drizzle-orm"
import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { AUTH_TOKEN_KEY } from "../../../../lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET!) as {
      userId: string
      email: string
      role: string
    }

    // Get user from database
    const user = await db.query.userTable.findFirst({
      where: (users) => eq(users.id, decoded.userId),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data (excluding password)
    const { password: _, ...userData } = user
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
