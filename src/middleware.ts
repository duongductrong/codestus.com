import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Skip auth check for login and register pages
  if (
    request.nextUrl.pathname.startsWith("/auth/sign-in") ||
    request.nextUrl.pathname.startsWith("/auth/sign-up")
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    const { role } = decoded as { role: string }

    // Only allow admin users to access admin routes
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.log(error)
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }
}

export const config = {
  matcher: "/admin/:path*",
}
