import { LayoutProps } from "@/types/utilities"

export interface SLayoutProps extends LayoutProps<"slayouttags"> {}

const SLayout = ({ slayouttags, children }: SLayoutProps) => (
  <>
    <div className="px-5 py-4 border-b border-border w-full flex flex-wrap gap-3">{slayouttags}</div>
    {children}
  </>
)

export default SLayout
