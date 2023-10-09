import nord from "@/lib/shiki/themes/nord.json"
import { join as pathJoin } from "path"
import rehypePrettyCode, { Options as RehypeCodeOptions } from "rehype-pretty-code"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { unified } from "unified"
import * as shiki from "shiki"
import fs from "fs"
import RehypeVideo from "rehype-video"

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => pathJoin(process.cwd(), "src/lib/shiki")

const touched = { current: false }

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
  if (touched.current) return // only need to do once
  fs.readdir(getShikiPath(), () => null) // fire and forget
  touched.current = true
}

const getHighlighter: RehypeCodeOptions["getHighlighter"] = async (options) => {
  touchShikiPath()

  const highlighter = await shiki.getHighlighter({
    // This is technically not compatible with shiki's interface but
    // necessary for rehype-pretty-code to work
    // - https://rehype-pretty-code.netlify.app/ (see Custom Highlighter)
    ...(options as any),
    paths: {
      languages: `${getShikiPath()}/languages/`,
      themes: `${getShikiPath()}/themes/`,
    },
  })

  return highlighter
}

export const processMarkdown = (content: string | null | undefined) =>
  unified()
    .use(remarkToc)
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(RehypeVideo, { details: false })
    .use(rehypePrettyCode, {
      // See Options section below.
      theme: nord as any,
      getHighlighter,
    })
    .use(rehypeStringify)
    .process(content || "")

export const generateHtmlFromMarkdownVFile = async (data: ReturnType<typeof processMarkdown>) =>
  String(await data)
