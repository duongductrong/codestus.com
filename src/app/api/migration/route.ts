import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"
import fs from "fs"
import path from "path"

export async function GET(request: Request, response: Response) {
  const contentDir = path.join(__dirname, "../../../../../src/contents")
  const files = fs.readdirSync(contentDir)

  const posts = await prisma.post.findMany({
    include: { post_tags: { include: { tags: true } }, user: true },
    orderBy: { publish_at: "desc" },
  })

  // Write post files to contentDir
  posts.forEach((post) => {
    process.nextTick(() => {
      fs.writeFileSync(
        path.join(contentDir, `${post.slug}.mdx`),
        `---
title: ${post.title}
description: ${post.description}
tags: ${post.post_tags.map((tag) => tag.tags.name).join(",")}
author: ${post.user?.name || "Trong Duong Duc"}
publishAt: ${dayjs(post.publish_at).toISOString()}
createdAt: ${dayjs(post.created_at).toISOString()}
updatedAt: ${dayjs(post.updated_at).toISOString()}
views: ${Number(post.views)}
slug: ${post.slug}
---

${post.content}
      `,
        {
          encoding: "utf-8",
        }
      )
    })
  })

  return Response.json({ ok: true, tags: await prisma.tag.findMany() })
}
