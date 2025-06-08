import { createMutation } from "react-query-kit"
import { User } from "@/db/schema"

type Response = Omit<User, "password">
type Variables = {
  email: string
  password: string
}

async function signIn(variables: Variables): Promise<Response> {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to sign in")
  }

  return response.json()
}

export const useSignIn = createMutation({
  mutationFn: signIn,
}) 