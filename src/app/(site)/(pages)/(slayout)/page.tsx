import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { getPostsWithTags } from "@/queries/post"
import dayjs from "dayjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trang chủ",
}

const Blog = async () => {
  const posts = await getPostsWithTags()

  return (
    <section className="w-full flex flex-col">
      {posts
        .sort((a, b) => dayjs(b.publishAt).diff(dayjs(a.publishAt)))
        .map((post) => (
          <BlogCard
            as={Link}
            key={post.slug}
            title={post.title}
            content={post.content || ""}
            description={post.description || ""}
            href={PAGE_URLS.POST_DETAIL.replace(":id", post.slug)}
            publishedAt={post.publishAt || undefined}
            tags={post.tags?.map((tag) => tag.tag.name)}
          />
        ))}
    </section>
  )
}

export default Blog
