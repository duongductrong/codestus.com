"use client"

import { useMe } from "@/api/auth/me"
import { useSignIn } from "@/api/auth/sign-in"
import { useSignUp } from "@/api/auth/sign-up"
import { User } from "@/db/schema"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useMemo } from "react"
import { toast } from "sonner"

interface AuthContextValue {
  user: Omit<User, "password"> | undefined | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { mutateAsync: signInMutation } = useSignIn()
  const { mutateAsync: signUpMutation } = useSignUp()

  // Fetch current user
  const { data: user, isLoading, refetch } = useMe({})

  const isAuthenticated = !!user

  // Handle authentication state changes
  useEffect(() => {
    const isAuthRoute = pathname?.startsWith("/auth/")
    const isAdminRoute = pathname?.startsWith("/admin/")

    if (isLoading) return

    if (!isAuthenticated && isAdminRoute) {
      router.push("/auth/sign-in")
    } else if (isAuthenticated && isAuthRoute) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const signIn = async (email: string, password: string) => {
    try {
      await signInMutation({ email, password })
      await refetch()
      toast.success("Signed in successfully")
      router.push("/")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to sign in")
      }
      throw error
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await signUpMutation({ name, email, password })
      toast.success("Signed up successfully")
      router.push("/auth/sign-in")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to sign up")
      }
      throw error
    }
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" })
      await refetch()
      toast.success("Signed out successfully")
      router.push("/auth/sign-in")
    } catch (error) {
      toast.error("Failed to sign out")
      throw error
    }
  }

  const values = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, isAuthenticated, signIn, signUp, signOut]
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
