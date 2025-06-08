import { User } from "@/db/schema"
import { createQuery } from "react-query-kit"

type Response = Omit<User, "password">[]

async function getUsers(): Promise<Response> {
  const response = await fetch("/api/users")

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch users")
  }

  return response.json()
}

export const useGetUsers = createQuery({
  queryKey: ["users"],
  fetcher: getUsers,
})
