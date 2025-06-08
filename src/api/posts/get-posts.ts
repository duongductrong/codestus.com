import { createQuery } from "react-query-kit"
import { PostWithRelations } from "./types"

type Response = PostWithRelations[]
type Variables = {
  search?: string
}

async function fetchPosts({ search }: Variables): Promise<Response> {
  const queryString = new URLSearchParams()

  if (search) {
    queryString.set("search", search)
  }

  const response = await fetch(`/api/posts?${queryString.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }

  return response.json()
}

export const useGetPosts = createQuery<Response, Variables>({
  queryKey: ["posts"],
  fetcher: fetchPosts,
})
