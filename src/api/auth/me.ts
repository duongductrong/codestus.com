import { User } from "@/db/schema"
import { createQuery } from "react-query-kit"

type Response = Omit<User, "password">

async function getMe(): Promise<Response> {
  const response = await fetch("/api/auth/me")

  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }

  return response.json()
}

export const useMe = createQuery({
  queryKey: ["me"],
  fetcher: getMe,
})
