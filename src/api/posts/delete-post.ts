import { createMutation } from "react-query-kit"

async function deletePost(id: number): Promise<void> {
  const response = await fetch(`/api/posts?id=${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete post")
  }
}

export const useDeletePost = createMutation<void, number>({
  mutationKey: ["deletePost"],
  mutationFn: deletePost,
}) 