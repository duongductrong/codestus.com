import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export interface SearchBarProps {
  actions?: React.ReactNode
}

export function SearchBar({ actions }: SearchBarProps) {
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
      </div>

      {actions ? <div className="flex gap-2 items-center shrink-0">{actions}</div> : null}
    </div>
  )
}
