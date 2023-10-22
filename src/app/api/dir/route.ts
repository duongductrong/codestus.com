import path from "path"
import fs from "fs"

export function GET(request: Request, response: Response) {
  const q = new URL(request.url)
  const paths = q.searchParams.get("paths") || ""
  const files = fs.readdirSync(path.join(__dirname, paths))
  return Response.json({ ok: true, dir: __dirname, files, paths })
}
