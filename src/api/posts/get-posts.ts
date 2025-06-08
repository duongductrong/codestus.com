import { createQuery } from "react-query-kit"
import { PostWithRelations } from "./types"

type Response = PostWithRelations[]
type Variables = void

async function fetchPosts(): Promise<Response> {
  const response = await fetch("/api/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export const useGetPosts = createQuery<Response, Variables>({
  queryKey: ["posts"],
  fetcher: fetchPosts,
}) 