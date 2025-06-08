"use client"

import { useDeleteTag, useTags, useUpdateTag } from "@/api/tags"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MinimalTable } from "@/components/ui/minimal-table"
import { Tag } from "@/db/schema"
import { getErrorMessage } from "@/lib/error"
import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { TagFormDialog } from "./tag-form-dialog"

interface TagTableProps {}

export function TagTable(props: TagTableProps) {
  const queryClient = useQueryClient()
  const { data: tags = [] } = useTags()

  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  const { mutateAsync: updateTag, isPending: isUpdating } = useUpdateTag({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useTags.getKey() })

      toast.success("Tag updated successfully")
    },
    onError(error) {
      toast.error(getErrorMessage(error))
    },
  })
  const { mutateAsync: deleteTag, isPending: isDeleting } = useDeleteTag({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useTags.getKey() })
      toast.success("Tag deleted successfully")
    },
    onError(error) {
      toast.error(getErrorMessage(error))
    },
  })

  const handleUpdate = async (data: { name: string; description?: string }) => {
    if (!editingTag) return
    await updateTag({ id: editingTag.id, ...data })
    setEditingTag(null)
  }

  const columns = useMemo<ColumnDef<Tag>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <p>{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.slug}</p>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div className="line-clamp-2">{row.original.description || "No description"}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div role="presentation" className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem
                  onClick={() => {
                    // eslint-disable-next-line no-alert
                    if (window.confirm("Are you sure you want to delete this tag?")) {
                      deleteTag(row.original.id)
                    }
                  }}
                  disabled={isDeleting}
                >
                  <Trash />
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

  return (
    <div>
      <div className="rounded-md border">
        <MinimalTable
          columns={columns}
          data={tags}
          onRowClick={(data) => {
            setEditingTag(data)
          }}
          loading={isUpdating || isDeleting}
        />
      </div>

      <TagFormDialog
        open={!!editingTag}
        onOpenChange={(open) => !open && setEditingTag(null)}
        onSubmit={handleUpdate}
        defaultValues={editingTag || undefined}
        mode="edit"
        loading={isUpdating}
      />
    </div>
  )
}
