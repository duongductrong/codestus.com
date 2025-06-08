import { createMutation } from "react-query-kit"
import { PostWithRelations } from "./types"

type Response = PostWithRelations
type Variables = {
  title: string
  slug: string
  description?: string | null
  thumbnail?: string | null
  content?: string | null
  status?: "draft" | "published"
  topicId?: number | null
  tags?: number[]
}

async function createPost(variables: Variables): Promise<Response> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  })

  if (!response.ok) {
    throw new Error("Failed to create post")
  }

  return response.json()
}

export const useCreatePost = createMutation({
  mutationFn: createPost,
}) 