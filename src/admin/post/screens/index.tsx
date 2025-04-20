"use client"

import { ArticleSection } from "@/admin/post/components/article-section"
import { PreviewSection } from "@/admin/post/components/preview-section"
import { ProjectSection } from "@/admin/post/components/project-section"
import { SearchBar } from "@/admin/post/components/search-bar"
import { mainNavigation, mockArticles, mockPreviews, mockProjects } from "@/layouts/admin/data"
import { useState } from "react"

export interface AdminPostListProps {}

const AdminPostList = (props: AdminPostListProps) => {
  const [view, setView] = useState<"grid" | "list">("grid")
  const currentSection = mainNavigation.find((item) => item.active)?.name

  return (
    <main className="flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full">
      <div className="mb-6">
        <SearchBar onViewChange={setView} currentView={view} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {currentSection === "Overview" && <ProjectSection projects={mockProjects} view={view} />}
        {currentSection === "Articles" && <ArticleSection articles={mockArticles} />}
        <PreviewSection previews={mockPreviews} />
      </div>
    </main>
  )
}
export default AdminPostList
