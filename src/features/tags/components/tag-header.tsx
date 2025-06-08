import { useCreateTag, useTags } from "@/api/tags"
import { Button } from "@/components/ui/button"
import { getErrorMessage } from "@/lib/error"
import { useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { TagFormDialog } from "./tag-form-dialog"

export interface TagHeaderProps {}

export const TagHeader = (props: TagHeaderProps) => {
  const queryClient = useQueryClient()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { mutateAsync: createTag, isPending: isCreating } = useCreateTag({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useTags.getKey() })
    },
    onError(error) {
      toast.error(getErrorMessage(error))
    },
  })

  const handleCreate = async (data: { name: string; description?: string }) => {
    try {
      await createTag(data)
      toast.success("Tag created successfully")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to create tag")
      }
    }
  }

  const isLoading = isCreating

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tags</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)} disabled={isLoading}>
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </div>

      <TagFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        mode="create"
        loading={isLoading}
      />
    </>
  )
}
