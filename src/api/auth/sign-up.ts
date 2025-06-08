import { createMutation } from "react-query-kit"
import { User } from "@/db/schema"

type Response = Omit<User, "password">
type Variables = {
  email: string
  password: string
  name: string
}

async function signUp(variables: Variables): Promise<Response> {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to sign up")
  }

  return response.json()
}

export const useSignUp = createMutation({
  mutationFn: signUp,
}) 