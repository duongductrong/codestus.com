import BlogRenderer from "@/components/custom-markdowns/blog-renderer"
import Icon from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { PAGE_URLS } from "@/constants/urls"
import { generateHtmlFromMarkdownVFile, processMarkdown } from "@/lib/markdown"
import postService from "@/services/post-service"
import { ParamsProps, SearchParamsProps } from "@/types/utilities"
import { getSpeedReading } from "@/utils/speed-reading"
import dayjs from "dayjs"
import compact from "lodash/compact"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import OpenGraphImage from "@/assets/images/open-graph-image.png"

export const revalidate = 3600

export interface PostDetailProps extends ParamsProps<"id">, SearchParamsProps {}

const generateUrlFormSlug = (slug?: string) => `${PAGE_URLS.POST_DETAIL.replace(":id", slug || "")}`

export async function generateMetadata(
  { params: { id } }: PostDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await postService.detail(id)

  const url = generateUrlFormSlug(post?.slug)

  return {
    title: post?.title,
    description: post?.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      type: "article",
      title: post?.title || "",
      description: post?.description || "",
      countryName: "Viet Nam",
      locale: "vi",
      siteName: "Codestus.com",
      images: compact([post?.thumbnail, OpenGraphImage.src]),
      publishedTime: post?.publish_at?.toDateString(),
      emails: ["duongductrong06@gmail.com"],
      modifiedTime: post?.updated_at?.toDateString(),
      authors: ["Duong Duc Trong"],
    },
    twitter: {
      title: post?.title || "",
      description: post?.description || "",
      images: compact([post?.thumbnail]),
      card: "summary_large_image",
      creatorId: "duongductrong_",
      creator: "Duong Duc Trong",
    },
  }
}

const PostDetail = async ({ params: { id } }: PostDetailProps) => {
  const post = await postService.detail(id)

  if (!post) notFound()

  const url = generateUrlFormSlug(post.slug)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: post?.title,
    headline: post?.title,
    about: post?.title,
    author: {
      "@type": "Person",
      "@id": post?.user?.name,
      address: post?.user?.email,
      alternateName: post?.user?.name,
      email: post?.user?.email,
      image: post?.user?.avatar,
    },
    url,
    image: post?.thumbnail,
    articleBody: post?.description,
    wordCount: post?.content?.length ?? 0,
    dateCreated: post?.created_at,
    thumbnailUrl: post?.thumbnail,
    datePublished: post?.publish_at,
    dateModified: post?.updated_at,
    mainEntityOfPage: {
      "@type": "WebContent",
      "@id": generateUrlFormSlug(post?.slug),
    },
  }

  const content = await generateHtmlFromMarkdownVFile(processMarkdown(post.content))

  return (
    <div className="mx-auto mb-20">
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

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}

export default PostDetail
