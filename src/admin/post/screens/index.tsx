"use client"

import { SearchBar } from "@/admin/post/components/search-bar"
import { useDeletePost, useGetPosts } from "@/api/posts"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { PostTable } from "../components/post-table"

export interface AdminPostListProps {}

const AdminPostList = (props: AdminPostListProps) => {
  const queryClient = useQueryClient()
  const { data: posts, isLoading } = useGetPosts()
  const { mutate: deletePost } = useDeletePost()

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast.success("Post deleted successfully")
    } catch (error) {
      toast.error("Failed to delete post")
    }
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full">
      <div className="mb-6">
        <SearchBar />
      </div>

      <PostTable loading={isLoading} data={posts || []} onDeleteItem={handleDeletePost} />
    </main>
  )
}

export default AdminPostList
