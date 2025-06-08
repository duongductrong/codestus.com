import { createMutation } from "react-query-kit"
import { User } from "@/db/schema"

type Response = Omit<User, "password">
type Variables = {
  id: string
  name: string
  email: string
  password?: string
  role?: "user" | "admin"
}

async function updateUser(variables: Variables): Promise<Response> {
  const { id, ...data } = variables
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to update user")
  }

  return response.json()
}

export const useUpdateUser = createMutation({
  mutationFn: updateUser,
}) 