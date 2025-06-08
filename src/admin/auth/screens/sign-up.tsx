"use client"

import { useSignUp } from "@/api/auth/sign-up"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SignUpForm, SignUpValues } from "../components/sign-up-form"

export function SignUpScreen() {
  const router = useRouter()

  const { mutateAsync: signUp, isPending } = useSignUp()

  const onSubmit = async (data: SignUpValues) => {
    try {
      await signUp(data)
      toast.success("Signed up successfully")
      router.push("/auth/sign-in")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to sign up")
      }
    }
  }

  return (
    <main className="container flex items-center justify-center min-h-screen py-10">
      <SignUpForm onSubmit={onSubmit} loading={isPending} />
    </main>
  )
} 