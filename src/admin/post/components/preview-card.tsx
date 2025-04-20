import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Preview } from "@/layouts/admin/data"
import { cn } from "@/utils/tailwind-utils"

interface PreviewCardProps {
  preview: Preview
}

export function PreviewCard({ preview }: PreviewCardProps) {
  return (
    <Card
      className={cn(
        "bg-card border-border overflow-hidden transition-all group",
        "hover:border-muted-foreground/20"
      )}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-center gap-1">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-[10px] bg-background">N</AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-sm line-clamp-1 max-w-full max-w-xs">
                {preview.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">
                <span className="mr-1">Preview</span>
                <span className="font-mono">{preview.commitId}</span>
                {preview.hasError && (
                  <span className="ml-2 text-[10px] py-0.5 px-1.5 rounded-full bg-red-900/30 text-red-400 font-medium">
                    Error
                  </span>
                )}
                {preview.author && (
                  <span className="ml-2 text-[10px] py-0.5 px-1.5 rounded-full bg-muted text-muted-foreground font-medium">
                    {preview.author}
                  </span>
                )}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 h-8 w-8 transition-opacity"
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Preview</DropdownMenuItem>
              <DropdownMenuItem>Preview Settings</DropdownMenuItem>
              <DropdownMenuItem>Delete Preview</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex items-center justify-center rounded-full", className)}>
      {children}
    </div>
  )
}

function AvatarFallback({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-full", className)}>
      {children}
    </div>
  )
}
