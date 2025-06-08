import { db } from "@/db"
import { User, userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { verify } from "jsonwebtoken"
import { NextRequest } from "next/server"

export async function auth(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_TOKEN_KEY)

  if (!cookie) {
    throw new Error("Unauthorized")
  }

  const token = cookie.value

  const decoded = verify(token, process.env.JWT_SECRET!) as {
    userId: string
    email: string
    role: string
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, decoded.userId),
    columns: {
      id: true,
      email: true,
      role: true,
      avatar: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}

export const AUTH_TOKEN_KEY = "auth-token"

export const isAdmin = (user?: Partial<User>) => user?.role === "admin"
export const isUser = (user?: Partial<User>) => user?.role === "user"
