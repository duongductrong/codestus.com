"use client"

import { useCreateTag, useDeleteTag, useTags, useUpdateTag } from "@/api/tags"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { TagFormDialog } from "@/features/tags/components/tag-form-dialog"
import { TagList } from "@/features/tags/components/tag-list"

export default function TagsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data: tags = [], refetch } = useTags()
  const { mutateAsync: createTag, isPending: isCreating } = useCreateTag()
  const { mutateAsync: updateTag, isPending: isUpdating } = useUpdateTag()
  const { mutateAsync: deleteTag, isPending: isDeleting } = useDeleteTag()

  const handleCreate = async (data: { name: string; description?: string }) => {
    try {
      await createTag(data)
      toast.success("Tag created successfully")
      refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to create tag")
      }
    }
  }

  const handleUpdate = async (
    id: number,
    data: { name: string; description?: string }
  ) => {
    try {
      await updateTag({ id, ...data })
      toast.success("Tag updated successfully")
      refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to update tag")
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTag(id)
      toast.success("Tag deleted successfully")
      refetch()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to delete tag")
      }
    }
  }

  const isLoading = isCreating || isUpdating || isDeleting

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tags</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)} disabled={isLoading}>
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </div>

      <TagList
        tags={tags}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        loading={isLoading}
      />

      <TagFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        mode="create"
        loading={isLoading}
      />
    </div>
  )
} 