import { cn } from "@/utils/tailwind-utils"

export interface BlogRendererProps {
  content: string
  className?: string
}

const BlogRenderer = ({ content, className }: BlogRendererProps) => (
  <article
    className={cn("prose dark:prose-invert leading-8 max-w-full mx-auto", className)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

export default BlogRenderer
