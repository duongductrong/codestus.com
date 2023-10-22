import fs from "fs"
import path from "path"
import { Options } from "rehype-pretty-code"
import shiki from "shiki"

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => path.join(process.cwd(), "src/lib/shiki")

const touched = { current: false }

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
  if (touched.current) {
    return
  }
  fs.readdirSync(getShikiPath())
  touched.current = true
}

const getHighlighter: Options["getHighlighter"] = async (options) => {
  // touchShikiPath()

  shiki.setCDN((process.env.APP_URL as string) || "https://codestus.com")
  return shiki.getHighlighter({
    ...(options as any),
    // paths: {
    //   languages: `${getShikiPath()}/languages/`,
    //   themes: `${getShikiPath()}/themes/`,
    // },
  })
}

export default getHighlighter
