import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {}

export function SearchBar(props: SearchBarProps) {
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

      <div className="flex gap-2 items-center shrink-0">
        <Button className="text-sm h-10 rounded-md">
          Add New...
          <span className="sr-only">Add new</span>
        </Button>
      </div>
    </div>
  )
}
