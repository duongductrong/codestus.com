import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { getPostsWithTags } from "@/queries/post"
import dayjs from "dayjs"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Trang chủ",
}

const Blog = async () => {
  const posts = await getPostsWithTags()

  return (
    <>
      <Image
        src="/assets/peeps-avatar-alpha-transparent.png"
        alt="Peeps Avatar"
        width={520}
        height={520}
        className="w-52 h-w-52 rounded-full mx-auto bg-amber-500 mb-8"
      />

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
    </>
  )
}

export default Blog
