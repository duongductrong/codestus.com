"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tag } from "@/db/schema"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { TagFormDialog } from "./tag-form-dialog"

interface TagListProps {
  tags: Tag[]
  onUpdate: (id: number, data: { name: string; description?: string }) => Promise<void>
  onDelete: (id: number) => Promise<void>
  loading?: boolean
}

export function TagList({ tags, onUpdate, onDelete, loading }: TagListProps) {
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  const handleUpdate = async (data: { name: string; description?: string }) => {
    if (!editingTag) return
    await onUpdate(editingTag.id, data)
    setEditingTag(null)
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-[70px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell>{tag.description || "-"}</TableCell>
                <TableCell>{tag.slug}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        disabled={loading}
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setEditingTag(tag)}
                        disabled={loading}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(tag.id)}
                        className="text-destructive"
                        disabled={loading}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {tags.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No tags found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TagFormDialog
        open={!!editingTag}
        onOpenChange={(open) => !open && setEditingTag(null)}
        onSubmit={handleUpdate}
        defaultValues={editingTag || undefined}
        mode="edit"
        loading={loading}
      />
    </div>
  )
} 