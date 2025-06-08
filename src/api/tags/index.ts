import { Tag } from "@/db/schema"
import { createMutation, createQuery } from "react-query-kit"

type TagInput = {
  name: string
  description?: string
}

// Fetch all tags
export const useTags = createQuery<Tag[]>({
  queryKey: ["tags"],
  fetcher: async () => {
    const response = await fetch("/api/tags")
    if (!response.ok) {
      throw new Error("Failed to fetch tags")
    }
    return response.json()
  },
})

// Create tag
export const useCreateTag = createMutation<Tag, TagInput>({
  mutationFn: async (data) => {
    const response = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create tag")
    }

    return response.json()
  },
})

// Update tag
export const useUpdateTag = createMutation<Tag, { id: number } & TagInput>({
  mutationFn: async ({ id, ...data }) => {
    const response = await fetch(`/api/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update tag")
    }

    return response.json()
  },
})

// Delete tag
export const useDeleteTag = createMutation<Tag, number>({
  mutationFn: async (id) => {
    const response = await fetch(`/api/tags/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete tag")
    }

    return response.json()
  },
}) 