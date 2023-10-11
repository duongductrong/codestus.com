import { BlogCard } from "@/components/custom-cards/blog-card"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import postService from "@/services/post-service"
import tagService from "@/services/tag-service"
import { ParamsProps } from "@/types/utilities"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import OpenGraphImage from "@/assets/images/open-graph-image.png"

export interface PostsTagProps extends ParamsProps<"id"> {}

export async function generateMetadata({ params: { id } }: PostsTagProps): Promise<Metadata> {
  const tag = await tagService.detail(id)

  if (!tag) return notFound()

  const canonical = PAGE_URLS.TAG_DETAIL.replace(":id", tag?.tagId.toString())

  return {
    title: tag?.name,
    description: tag?.description,
    alternates: {
      canonical,
    },
    openGraph: {
      url: canonical,
      type: "article",
      title: tag?.name || "",
      description: tag?.description || "",
      countryName: "Viet Nam",
      locale: "vi",
      siteName: "Codestus.com",
      publishedTime: tag?.created_at?.toDateString(),
      emails: ["duongductrong06@gmail.com"],
      modifiedTime: tag?.updated_at?.toDateString(),
      authors: ["Duong Duc Trong"],
      images: [OpenGraphImage.src],
    },
    twitter: {
      title: tag?.name || "",
      description: tag?.description || "",
      card: "summary_large_image",
      creatorId: "duongductrong_",
      creator: "Duong Duc Trong",
      images: [OpenGraphImage.src],
    },
  }
}

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
