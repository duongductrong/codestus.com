import { createMutation } from "react-query-kit"
import { User } from "@/db/schema"

type Response = Omit<User, "password">
type Variables = {
  email: string
  password: string
  name: string
  role?: "user" | "admin"
}

async function createUser(variables: Variables): Promise<Response> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to create user")
  }

  return response.json()
}

export const useCreateUser = createMutation({
  mutationFn: createUser,
}) 