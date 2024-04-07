import { ForwardRefComponent } from "@/types/react-polymorphic"
import { getSpeedReading } from "@/utils/speed-reading"
import { cn } from "@/utils/tailwind-utils"
import dayjs from "dayjs"
import { forwardRef } from "react"
import Icon from "../ui/icon"

export interface BlogCardProps {
  title: string
  description?: string
  content: string
  publishedAt?: string | Date
}

export const BlogCard = forwardRef(
  ({ title, description, content, publishedAt, className, as: Comp = "div", ...props }, ref) => (
    <Comp {...props} ref={ref} className={cn("p-6 ", className)}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-md font-normal text-muted-foreground mb-4 line-clamp-3">{description}</p>
      )}

      <div className="flex gap-2">
        <p className="text-sm font-normal text-muted-foreground">
          {dayjs(publishedAt).format("DD/MM/YYYY")}
        </p>
        <Icon name="dot" className="w-4 h-4 text-muted-foreground" />
        <p className="text-sm font-normal text-muted-foreground">
          {getSpeedReading(content)} mins read
        </p>
      </div>
    </Comp>
  )
) as ForwardRefComponent<"div", BlogCardProps>
