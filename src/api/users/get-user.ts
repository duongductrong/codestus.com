import { User } from "@/db/schema"
import { createQuery } from "react-query-kit"

type Response = Omit<User, "password">
type Variables = {
  id: string
}

async function getUser({ id }: Variables): Promise<Response> {
  const response = await fetch(`/api/users/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch user")
  }

  return response.json()
}

export const useGetUser = createQuery({
  queryKey: ["user"],
  fetcher: getUser,
})
