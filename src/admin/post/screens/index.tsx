"use client"

import { SearchBar } from "@/admin/post/components/search-bar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PostTable } from "../components/post-table"

export interface PostListProps {}

const PostList = (props: PostListProps) => (
  <main className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full flex flex-col gap-4">
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

    <PostTable />
  </main>
)

export default PostList
