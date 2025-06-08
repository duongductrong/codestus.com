"use client"

import { useAuth } from "../contexts/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

interface RequireAuthProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function RequireAuth({ children, requireAdmin = false }: RequireAuthProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push(`/auth/sign-in?redirect=${pathname}`)
      return
    }

    if (requireAdmin && user.role !== "admin") {
      router.push("/")
      return
    }
  }, [user, isLoading, router, pathname, requireAdmin])

  if (isLoading) {
    return <div>Loading...</div> // You can replace this with a proper loading component
  }

  if (!user || (requireAdmin && user.role !== "admin")) {
    return null
  }

  return <>{children}</>
} 