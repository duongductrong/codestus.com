import OpenGraphImage from "@/assets/images/open-graph-image.png"
import BlogRenderer from "@/components/custom-markdowns/blog-renderer"
import Icon from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { PAGE_URLS } from "@/constants/urls"
import { generateHtmlFromMarkdownVFile, processMarkdown } from "@/lib/markdown"
import { getPostBySlug } from "@/queries/post"
import { ParamsProps, SearchParamsProps } from "@/types/utilities"
import { getSpeedReading } from "@/utils/speed-reading"
import dayjs from "dayjs"
import compact from "lodash/compact"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

export const revalidate = 3600

export interface PostDetailProps extends ParamsProps<"id">, SearchParamsProps {}

const generateUrlFormSlug = (slug?: string) => `${PAGE_URLS.POST_DETAIL.replace(":id", slug || "")}`

export async function generateMetadata(
  { params: { id } }: PostDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const now = dayjs()
  const post = await getPostBySlug(id)

  const unpublishYet = post?.publishAt
    ? post?.publishAt && dayjs(post.publishAt).isAfter(now)
    : false

  if (!post || unpublishYet) notFound()

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
      publishedTime: post?.publishAt?.toISOString(),
      emails: ["duongductrong06@gmail.com"],
      modifiedTime: post?.updatedAt?.toISOString(),
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
  const post = await getPostBySlug(id)

  const unpublishYet = post?.publishAt && dayjs(post.publishAt).isAfter(dayjs())

  if (!post || unpublishYet) notFound()

  const url = generateUrlFormSlug(post.slug)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: post?.title,
    headline: post?.title,
    about: post?.title,
    // author: {
    //   "@type": "Person",
    //   "@id": post?.user?.name,
    //   address: post?.user?.email,
    //   alternateName: post?.user?.name,
    //   email: post?.user?.email,
    //   image: post?.user?.avatar,
    // },
    author: {
      "@type": "Person",
      "@id": "duongductrong06@gmail.com",
      alternateName: "Duong Duc Trong",
      address: "duongductrong06@gmail.com",
      email: "duongductrong06@gmail.com",
      image: "https://avatars.githubusercontent.com/u/39333905?v=4",
    },
    url,
    image: post?.thumbnail,
    articleBody: post?.description,
    wordCount: post?.content?.length ?? 0,
    dateCreated: post?.createdAt,
    thumbnailUrl: post?.thumbnail,
    datePublished: post?.publishAt,
    dateModified: post?.updatedAt,
    mainEntityOfPage: {
      "@type": "WebContent",
      "@id": generateUrlFormSlug(post?.slug),
    },
  }

  const content = await generateHtmlFromMarkdownVFile(processMarkdown(post.content))

  return (
    <div className="mx-auto mb-20">
      {/* <HitPageViews id={id} /> */}
      <Text variant="h1" as="h1" className="mt-20 mb-8 text-center ml-auto mr-auto">
        {post.title}
      </Text>

      <div className="flex gap-2 mb-20 justify-center">
        <p className="text-sm font-normal text-muted-foreground">
          Published at:{" "}
          {dayjs(post.publishAt).isValid()
            ? dayjs(post.publishAt).format("DD/MM/YYYY")
            : "Unknown Date."}
        </p>
        <Icon name="dot" className="w-4 h-4 text-muted-foreground" />
        <p className="text-sm font-normal text-muted-foreground">
          {getSpeedReading(post.content)} mins read
        </p>
      </div>

      <BlogRenderer content={content} />

      {/* <article className="prose dark:prose-invert leading-8 max-w-full mx-auto">
        <MDXContent
          code={post.mdx}
          components={{
            code: ({ children, className }) => {
              const language = className?.replace("language-", "")
              return (
                <SyntaxHighlighter
                  showLineNumbers
                  wrapLines
                  wrapLongLines
                  style={dark}
                  language={language}
                  // eslint-disable-next-line react/no-children-prop
                  children={children as unknown as string}
                />
              )
            },
          }}
        />
      </article> */}

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}

export default PostDetail
