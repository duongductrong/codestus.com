import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { AUTH_TOKEN_KEY } from "./lib/auth"

export const runtime = "nodejs"

export async function middleware(request: NextRequest) {
  // Only check admin routes
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

  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value

  if (!token) {
    // Store the original URL to redirect back after login
    const searchParams = new URLSearchParams({
      redirect: request.nextUrl.pathname + request.nextUrl.search,
    })
    const redirectUrl = `/auth/sign-in?${searchParams.toString()}`
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/admin/:path*",
  ],
}
