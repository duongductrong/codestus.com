import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import postService from "@/services/post-service"
import tagService from "@/services/tag-service"
import { ParamsProps } from "@/types/utilities"
import { notFound } from "next/navigation"

export interface PostsTagProps extends ParamsProps<"id"> {}

const PostsTag = async ({ params: { id } }: PostsTagProps) => {
  const tag = await tagService.detail(id)

  if (!tag) notFound()

  const posts = await postService.getPostsFromTag(tag.tagId)

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
