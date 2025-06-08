"use client"

import { SearchBar } from "@/admin/post/components/search-bar"
import { useDeletePost, useGetPosts } from "@/api/posts"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { PostTable } from "../components/post-table"

export interface AdminPostListProps {}

const AdminPostList = (props: AdminPostListProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
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
      <div className="flex items-center justify-between mb-6">
        <SearchBar
          actions={
            <Button asChild>
              <Link className="flex items-center" href="/admin/posts/create">
                <Plus className="w-4 h-4 mr-2" />
                Add new...
              </Link>
            </Button>
          }
        />
      </div>

      <PostTable
        onSelectItem={(post) => router.push(`/admin/posts/${post.id}`)}
        loading={isLoading}
        data={posts || []}
        onDeleteItem={handleDeletePost}
      />
    </main>
  )
}

export default AdminPostList
