import OpenGraphImage from "@/assets/images/open-graph-image.png"
import BlogDetailed, { generateUrlFormSlug } from "@/features/blog/screens/detailed"
import { getPostBySlug } from "@/queries/post"
import { ParamsProps, SearchParamsProps } from "@/types/utilities"
import dayjs from "dayjs"
import compact from "lodash/compact"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 3600

export interface PageProps extends ParamsProps<"id">, SearchParamsProps {}

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
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

const Page = async ({ params: { id } }: PageProps) => <BlogDetailed id={id} />

export default Page
