import { Bell, ChevronDown, Triangle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { currentUser, topNavLinks } from "@/layouts/admin/data"

export function TopNavigation() {
  return (
    <header className="h-16 border-b border-border flex items-center px-4 md:px-6 bg-background">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 bg-accent"
          aria-label="Home"
        >
          <Triangle size={16} className="fill-primary-foreground stroke-none" />
        </Button>

        <Button variant="outline" className="text-sm font-medium flex items-center gap-2 h-8">
          <span className="flex items-center gap-2">
            {/* <Avatar className="h-5 w-5">
              <AvatarImage src="/user-avatar.png" />
              <AvatarFallback className="text-[10px]">DT</AvatarFallback>
            </Avatar> */}
            <span>Codestus</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">Hobby</span>
        </Button>
      </div>

      <nav className="hidden md:flex items-center gap-4">
        {topNavLinks.map((link) => (
          <Button key={link.name} variant="ghost" size="sm" className="text-sm font-medium">
            {link.name}
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>
                  {currentUser.name.charAt(0)}
                  {currentUser.name.split(" ").pop()?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
