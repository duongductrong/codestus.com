import { Preview } from "@/layouts/admin/data"
import { PreviewCard } from "@/admin/post/components/preview-card"

interface PreviewSectionProps {
  previews: Preview[]
}

export function PreviewSection({ previews }: PreviewSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Recent Previews</h2>
      </div>
      <div className="grid gap-2">
        {previews.map((preview) => (
          <PreviewCard key={preview.id} preview={preview} />
        ))}
      </div>
    </section>
  )
}
