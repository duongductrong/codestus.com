// import { prisma } from "@/lib/prisma"
import { allTags } from "@/constants/tags"
import SLayoutTagsItems from "../_components/slayout-tags-items"

export interface SLayoutTagsProps {}

const SLayoutTags = async (props: SLayoutTagsProps) => (
  // const tags = await prisma.tag.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  // })

  <SLayoutTagsItems tags={allTags} />
)

export default SLayoutTags
