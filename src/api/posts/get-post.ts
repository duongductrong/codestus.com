import { createQuery } from "react-query-kit"
import { PostWithRelations } from "./types"

type Response = PostWithRelations | null
type Variables = { id: number }

async function fetchPost({ id }: Variables): Promise<Response> {
  const response = await fetch(`/api/posts/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error("Failed to fetch post")
  }
  return response.json()
}

export const useGetPost = createQuery<Response, Variables>({
  queryKey: ["post"],
  fetcher: fetchPost,
}) 