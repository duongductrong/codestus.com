import { createMutation } from "react-query-kit"
import { PostWithRelations } from "./types"

type Response = PostWithRelations
type Variables = {
  id: number
  data: {
    title?: string
    slug?: string
    description?: string | null
    thumbnail?: string | null
    content?: string | null
    status?: "draft" | "published"
    topicId?: number | null
    tags?: number[]
  }
}

async function updatePost({ id, data }: Variables): Promise<Response> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update post")
  }

  return response.json()
}

export const useUpdatePost = createMutation({
  mutationFn: updatePost,
}) 