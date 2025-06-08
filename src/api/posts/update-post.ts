import { createMutation } from "react-query-kit"
import { PostWithRelations, UpdatePostPayload } from "./types"

interface UpdatePostVariables {
  id: number
  data: UpdatePostPayload
}

async function updatePost({ id, data }: UpdatePostVariables): Promise<PostWithRelations> {
  const response = await fetch(`/api/posts?id=${id}`, {
    method: "PUT",
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

export const useUpdatePost = createMutation<PostWithRelations, UpdatePostVariables>({
  mutationKey: ["updatePost"],
  mutationFn: updatePost,
}) 