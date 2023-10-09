import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trang chủ",
}

const Blog = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
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

export default Blog
