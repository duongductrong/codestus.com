"use client"

import { PostWithRelations } from "@/api/posts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MinimalTable } from "@/components/ui/minimal-table"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import capitalize from "lodash/capitalize"
import { EllipsisVertical } from "lucide-react"
import Link from "next/link"

export interface PostTableProps {
  data: PostWithRelations[]
  onDeleteItem?: (id: number) => Promise<void>
  onSelectItem?: (post: PostWithRelations) => void
  loading?: boolean
}

export const PostTable = ({ data, loading, onDeleteItem, onSelectItem }: PostTableProps) => {
  const columns: ColumnDef<PostWithRelations>[] = [
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
          </div>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      cell: ({ row }) => <div className="line-clamp-1 whitespace-nowrap">{row.original.slug}</div>,
    },
    {
      accessorKey: "publishAt",
      cell: ({ row }) => dayjs(row.original.publishAt).format("DD/MM/YYYY"),
    },
    {
      accessorKey: "updatedAt",
      cell: ({ row }) => dayjs(row.original.updatedAt).format("DD/MM/YYYY"),
    },
    {
      id: "actions",
      cell: ({ row }) =>
        onDeleteItem && (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/posts/${row.original.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteItem?.(row.original.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
    },
  ]

  return <MinimalTable onRowClick={onSelectItem} data={data} columns={columns} loading={loading} />
}
