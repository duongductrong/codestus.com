"use client"

import { useCreatePost, useGetPosts } from "@/api/posts"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PostForm } from "../components/post-form"
import { PostFormValues } from "../schema/post-form"

export interface CreatePostScreenProps {}

const CreatePostScreen = (props: CreatePostScreenProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutateAsync: createPost, isPending } = useCreatePost({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useGetPosts.getKey() })
    },
  })

  const handleSubmit = async (data: PostFormValues) => {
    try {
      await createPost(data)
      toast.success("Post created successfully")
      router.push("/admin/posts")
    } catch (error) {
      toast.error("Failed to create post")
    }
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full">
      <PostForm onSubmit={handleSubmit} isSubmitting={isPending} onBack={() => router.back()} />
    </main>
  )
}

export default CreatePostScreen
