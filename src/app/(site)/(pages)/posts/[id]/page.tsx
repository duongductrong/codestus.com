import BlogRenderer from "@/components/custom-markdowns/blog-renderer"
import Icon from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { PAGE_URLS } from "@/constants/urls"
import { generateHtmlFromMarkdownVFile, processMarkdown } from "@/lib/markdown"
import { prisma } from "@/lib/prisma"
import { ParamsProps, SearchParamsProps } from "@/types/utilities"
import { getSpeedReading } from "@/utils/speed-reading"
import dayjs from "dayjs"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

export interface PostDetailProps extends ParamsProps<"id">, SearchParamsProps {}

export async function generateMetadata(
  { params: { id } }: PostDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await prisma.post.findFirst({ where: { slug: id } })

  return {
    title: post?.title,
    description: post?.description,
    alternates: {
      canonical: `${PAGE_URLS.POST_DETAIL.replace(":id", post?.slug || "")}`,
    },
  }
}

const PostDetail = async ({ params: { id } }: PostDetailProps) => {
  const post = await prisma.post.findFirst({ where: { slug: id } })

  if (!post) notFound()

  const content = await generateHtmlFromMarkdownVFile(processMarkdown(post.content))

  return (
    <div className="mx-auto mb-20 max-w-[672px]">
      <Text variant="h1" as="h1" className="mt-20 mb-8 text-center ml-auto mr-auto">
        {post.title}
      </Text>

      <div className="flex gap-2 mb-20 justify-center">
        <p className="text-sm font-normal text-muted-foreground">
          Published at:{" "}
          {dayjs(post.publish_at).isValid()
            ? dayjs(post.publish_at).format("DD/MM/YYYY")
            : "Unknown Date."}
        </p>
        <Icon name="dot" className="w-4 h-4 text-muted-foreground" />
        <p className="text-sm font-normal text-muted-foreground">
          {getSpeedReading(post.content)} mins read
        </p>
      </div>

      <BlogRenderer content={content} />
    </div>
  )
}

export default PostDetail
