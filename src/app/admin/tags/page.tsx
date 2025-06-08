"use client"

import { TagHeader } from "@/features/tags/components/tag-header"
import { TagList } from "@/features/tags/components/tag-list"

export default function TagsPage() {
  return (
    <div className="container py-6 space-y-6">
      <TagHeader />
      <TagList />
    </div>
  )
}
