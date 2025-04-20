import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/tailwind-utils"
import { Search } from "lucide-react"

interface SearchBarProps {
  onViewChange: (view: "grid" | "list") => void
  currentView: "grid" | "list"
}

export function SearchBar({ onViewChange, currentView }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <Input
          placeholder="Search Repositories and Projects..."
          className="pl-10 h-10 bg-background rounded-md"
        />
        <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground gap-1">
          <kbd className="rounded px-1.5 bg-muted text-[10px] font-medium">⌘</kbd>
          <kbd className="rounded px-1.5 bg-muted text-[10px] font-medium">K</kbd>
        </div>
      </div>

      <div className="flex gap-2 items-center shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm h-10 bg-background rounded-md">
              Sort by activity
              <span className="sr-only">Sort options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Sort by name</DropdownMenuItem>
            <DropdownMenuItem>Sort by activity</DropdownMenuItem>
            <DropdownMenuItem>Sort by date created</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Show archived</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex border border-border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-10 w-10", currentView === "grid" && "bg-accent")}
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
          >
            <GridIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-10 w-10", currentView === "list" && "bg-accent")}
            onClick={() => onViewChange("list")}
            aria-label="List view"
          >
            <ListIcon />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-sm h-10 rounded-md">
              Add New...
              <span className="sr-only">Add new</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Project</DropdownMenuItem>
            <DropdownMenuItem>Import Project</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Team</DropdownMenuItem>
            <DropdownMenuItem>New Organization</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2H7V7H2V2ZM8 2H13V7H8V2ZM2 8H7V13H2V8ZM8 8H13V13H8V8Z" fill="currentColor" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H13V3H2V4ZM2 8H13V7H2V8ZM2 12H13V11H2V12Z" fill="currentColor" />
    </svg>
  )
}
