import { createMutation } from "react-query-kit"
import { CreatePostPayload, PostWithRelations } from "./types"

async function createPost(variables: CreatePostPayload): Promise<PostWithRelations> {
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

export const useCreatePost = createMutation<PostWithRelations, CreatePostPayload>({
  mutationKey: ["createPost"],
  mutationFn: createPost,
}) 