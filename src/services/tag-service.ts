import { prisma } from "@/lib/prisma"

class TagService {
  detail(id: string) {
    return prisma.tag.findFirst({ where: { slug: id } })
  }
}

const tagService = new TagService()

export default tagService
