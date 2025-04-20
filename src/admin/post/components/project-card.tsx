import { MoreVertical, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Project } from "@/layouts/admin/data"
import { cn } from "@/utils/tailwind-utils"

interface ProjectCardProps {
  project: Project
  view: "grid" | "list"
}

export function ProjectCard({ project, view }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "bg-card border-border h-full overflow-hidden group transition-all",
        "hover:border-muted-foreground/20"
      )}
    >
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
            <span className="text-base font-medium">{project.icon}</span>
          </div>
          <div>
            <h3 className="font-medium text-base">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.domain}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 h-8 w-8 transition-opacity"
              aria-label="Project options"
            >
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Project</DropdownMenuItem>
            <DropdownMenuItem>Project Settings</DropdownMenuItem>
            <DropdownMenuItem>Rename Project</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-4 py-3 border-t border-border">
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center gap-1">
            <GitHubIcon size={14} />
            <span>
              {project.repository.owner}/{project.repository.name}
            </span>
          </div>
          <p className="truncate text-muted-foreground">{project.lastActivity.message}</p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>{project.lastActivity.date} on</span>
            <GitBranch size={12} className="inline-block" />
            <span className="font-mono">{project.lastActivity.branch}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-muted-foreground"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
        fill="currentColor"
      />
    </svg>
  )
}
