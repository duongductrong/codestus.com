import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { prisma } from "@/lib/prisma"
import { MousePointerClick } from "lucide-react"

export interface RelatedPostsProps {}

const RelatedPosts = async (props: RelatedPostsProps) => {
  const posts = await prisma.post.findMany({
    take: 2,
  })

  return (
    <div className="grid md:grid-cols-2 gap-4 mx-auto">
      <h2 className="text-xl font-semibold col-span-2 flex items-center gap-2">
        <MousePointerClick className="w-5 h-5" /> Maybe you are interested
      </h2>
      {posts.map((post) => (
        <BlogCard
          as={Link}
          href={PAGE_URLS.POST_DETAIL.replace(":id", post.slug)}
          key={post.postId}
          title={post.title}
          description={post.description || ""}
          content={post.content || ""}
          className="!border border-border last:!border-border rounded-md col-span-2 md:col-span-1"
        />
      ))}
    </div>
  )
}

export default RelatedPosts
