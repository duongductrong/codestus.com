import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { AUTH_TOKEN_KEY } from "../../../../lib/auth"

export async function POST() {
  try {
    // Clear auth cookie
    cookies().delete(AUTH_TOKEN_KEY)
    return NextResponse.json({ message: "Signed out successfully" })
  } catch (error) {
    console.error("Error signing out:", error)
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 })
  }
}
