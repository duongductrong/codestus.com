import { Project } from "@/layouts/admin/data"
import { cn } from "@/utils/tailwind-utils"
import { ProjectCard } from "./project-card"

interface ProjectSectionProps {
  projects: Project[]
  view: "grid" | "list"
}

export function ProjectSection({ projects, view }: ProjectSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Projects</h2>
      </div>
      <div
        className={cn(
          "grid gap-4",
          view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} view={view} />
        ))}
      </div>
    </section>
  )
}
