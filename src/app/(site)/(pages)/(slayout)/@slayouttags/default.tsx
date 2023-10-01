import { prisma } from "@/lib/prisma"
import SLayoutTagsItems from "../_components/slayout-tags-items"

export interface SLayoutTagsProps {}

const SLayoutTags = async (props: SLayoutTagsProps) => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return <SLayoutTagsItems tags={tags} />
}

export default SLayoutTags
