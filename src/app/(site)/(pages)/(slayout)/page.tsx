import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { allPosts } from "content-collections"
import dayjs from "dayjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trang chủ",
}

const Blog = async () => {
  const filteredAllPosts = allPosts.filter((post) => dayjs(post.publishAt).isBefore(dayjs()))

  return (
    <section className="w-full flex flex-col">
      {filteredAllPosts
        .sort((a, b) => dayjs(b.publishAt).diff(dayjs(a.publishAt)))
        .map((post) => (
          <BlogCard
            as={Link}
            key={post.slug}
            title={post.title}
            content={post.content || ""}
            description={post.description || ""}
            href={PAGE_URLS.POST_DETAIL.replace(":id", post.slug)}
            publishedAt={post.publishAt}
            tags={post.tags?.split(",")}
          />
        ))}
    </section>
  )
}

export default Blog
