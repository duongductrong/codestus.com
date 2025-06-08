"use client"

import { PostWithRelations, useDeletePost, useGetPosts } from "@/api/posts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MinimalTable } from "@/components/ui/minimal-table"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import capitalize from "lodash/capitalize"
import { EllipsisVertical } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { toast } from "sonner"
import { usePostsQueryStates } from "../hooks/use-posts-querystate"

export interface PostTableProps {}

export const PostTable = (props: PostTableProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [queryStates] = usePostsQueryStates()

  const debouncedSearch = useDebouncedValue(queryStates.search, 200)

  const { data: posts, isLoading } = useGetPosts({
    variables: {
      search: debouncedSearch,
    },
    select: (data) => data || [],
  })

  const { mutateAsync: deletePost } = useDeletePost({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useGetPosts.getKey() })
    },
  })

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      toast.success("Post deleted successfully")
    } catch (error) {
      toast.error("Failed to delete post")
    }
  }

  const columns: ColumnDef<PostWithRelations>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1 min-w-[400px] flex-shrink-0">
            <p>{row.original.title}</p>
            <div className="flex items-center gap-4">
              <span className="flex gap-2 text-xs text-muted-foreground">
                {capitalize(row.original.status)}
              </span>
              <span className="flex gap-2 text-xs text-muted-foreground">
                Visits: {row.original.views}
              </span>
              <span className="flex gap-2 text-xs text-muted-foreground">
                {dayjs(row.original.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
              <span className="flex gap-2 text-xs text-muted-foreground">
                {dayjs(row.original.updatedAt).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div role="presentation" className="text-right" onClick={(evt) => evt.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/posts/${row.original.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // eslint-disable-next-line no-alert
                    if (window.confirm("Are you sure you want to delete this post?")) {
                      handleDeletePost(row.original.id)
                    }
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  )

  const handleRowClick = (post: PostWithRelations) => {
    router.push(`/admin/posts/${post.id}`)
  }

  return (
    <MinimalTable
      onRowClick={handleRowClick}
      data={(posts || []) as PostWithRelations[]}
      columns={columns}
      loading={isLoading}
    />
  )
}
