/* eslint-disable react/no-array-index-key */
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
  tags?: string[]
}

export const BlogCard = forwardRef(
  (
    { title, description, content, publishedAt, className, as: Comp = "div", tags = [], ...props },
    ref
  ) => (
    <Comp {...props} ref={ref} className={cn("p-6 ", className)}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-md font-normal text-muted-foreground mb-4 line-clamp-3">{description}</p>
      )}

      <div className="flex items-center gap-2">
        {tags.length ? (
          <div className="flex items-center gap-2 mr-2">
            {tags.map((tag, idx) => (
              <span
                key={idx.toString()}
                className="inline-block text-foreground border px-2 py-1 border-secondary rounded-md text-xs font-normal"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <p className="text-sm font-normal text-muted-foreground">
          {getSpeedReading(content)} mins read
        </p>
        <Icon name="dot" className="w-4 h-4 text-muted-foreground" />
        <p className="text-sm font-normal text-muted-foreground">
          {dayjs(publishedAt).format("DD MMM YYYY")}
        </p>
      </div>
    </Comp>
  )
) as ForwardRefComponent<"div", BlogCardProps>
