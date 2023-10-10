import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <section className="w-full flex flex-col gap-2">
    {Array(4)
      .fill(1)
      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={index} className="h-44" />
      ))}
  </section>
)

export default Loading
