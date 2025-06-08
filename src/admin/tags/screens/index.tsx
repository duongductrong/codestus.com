"use client"

import { TagHeader } from "@/admin/tags/components/tag-header"
import { TagTable } from "@/admin/tags/components/tag-table"

export default function TagsScreen() {
  return (
    <div className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full flex flex-col gap-4">
      <TagHeader />
      <TagTable />
    </div>
  )
}
