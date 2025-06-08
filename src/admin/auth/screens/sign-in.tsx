"use client"

import { useSignIn } from "@/api/auth/sign-in"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { SignInForm, SignInValues } from "../components/sign-in-form"

export function SignInScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { mutateAsync: signIn, isPending } = useSignIn()

  const onSubmit = async (data: SignInValues) => {
    try {
      await signIn(data)
      toast.success("Signed in successfully")

      // Redirect to the original URL or default to admin dashboard
      const redirectTo = searchParams.get("redirect") || "/admin"
      router.push(redirectTo)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to sign in")
      }
    }
  }

  return (
    <main className="container flex items-center justify-center min-h-screen py-10">
      <SignInForm onSubmit={onSubmit} loading={isPending} />
    </main>
  )
}
