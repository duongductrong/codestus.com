import { prisma } from "./db.server";

class TagService {
  getTagBySlug(slug: string) {
    return prisma.tag.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }

  getTags() {
    return prisma.tag.findMany();
  }
}

const tagService = new TagService();

export default tagService;
