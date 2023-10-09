import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { prisma } from "@/lib/prisma"
import { ParamsProps } from "@/types/utilities"
import { notFound } from "next/navigation"

export interface PostsTagProps extends ParamsProps<"id"> {}

const PostsTag = async ({ params: { id } }: PostsTagProps) => {
  const tag = await prisma.tag.findFirst({ where: { slug: id } })

  if (!tag) notFound()

  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      post_tags: { every: { tagId: tag.tagId } },
    },
  })

  return (
    <section className="w-full flex flex-col">
      {posts.map((post) => (
        <BlogCard
          as={Link}
          key={post.postId}
          title={post.title}
          content={post.content || ""}
          description={post.description || ""}
          href={PAGE_URLS.POST_DETAIL.replace(":id", post.slug)}
          publishedAt={post.publish_at?.toDateString()}
        />
      ))}
    </section>
  )
}

export default PostsTag
