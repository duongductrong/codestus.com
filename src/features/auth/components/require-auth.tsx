"use client"

import { Loader2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "../contexts/auth-context"

interface RequireAuthProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function RequireAuth({ children, requireAdmin = false }: RequireAuthProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    ;(() => {
      if (isLoading) return

      if (!user) {
        router.push(`/auth/sign-in?redirect=${pathname}`)
        return
      }

      if (requireAdmin && user.role !== "admin") {
        router.push("/")
      }
    })()
  }, [user, isLoading, router, pathname, requireAdmin])

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 h-dvh">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-4 animate-spin" />
          <span>Loading</span>
        </div>
      </section>
    )
  }

  if (!user || (requireAdmin && user.role !== "admin")) {
    return null
  }

  return children
}
