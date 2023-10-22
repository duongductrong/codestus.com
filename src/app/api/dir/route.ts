export function GET(request: Request, response: Response) {
  const q = new URL(request.url)
  const paths = q.searchParams.get("paths") || ""
  return Response.json({ ok: true, details: __dirname, paths: process.cwd() })
}
