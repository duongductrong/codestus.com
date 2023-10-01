"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { HTMLAttributes } from "react"
import { cn } from "@/utils/tailwind-utils"
import { Button } from "../ui/button"

export interface ToggleThemeButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const ToggleThemeButton = ({ className, ...props }: ToggleThemeButtonProps) => {
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const ThemeIcon = theme === "dark" ? Sun : Moon

  return (
    <Button
      {...props}
      variant="outline"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={handleChangeTheme}
    >
      <ThemeIcon className="w-4 h-4" />
    </Button>
  )
}
