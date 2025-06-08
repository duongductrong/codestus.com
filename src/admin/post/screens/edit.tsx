"use client"

import { useGetPost, useGetPosts, useUpdatePost } from "@/api/posts"
import { useQueryClient } from "@tanstack/react-query"
import { notFound, useRouter } from "next/navigation"
import { toast } from "sonner"
import { PostForm } from "../components/post-form"
import { PostFormValues } from "../schema/post-form"

export interface EditPostScreenProps {
  id: number
}

const EditPostScreen = ({ id }: EditPostScreenProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: post, isLoading } = useGetPost({ variables: { id } })
  const { mutateAsync: updatePost, isPending } = useUpdatePost({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useGetPosts.getKey() })
    },
  })

  if (isLoading) {
    return (
      <main className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full">
        <div className="text-center">Loading post...</div>
      </main>
    )
  }

  if (!post) {
    notFound()
  }

  const handleSubmit = async (data: PostFormValues) => {
    try {
      await updatePost({ id, data })
      toast.success("Post updated successfully")
      router.push("/admin/posts")
    } catch (error) {
      toast.error("Failed to update post")
    }
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full">
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        onBack={() => router.back()}
      />
    </main>
  )
}

export default EditPostScreen
