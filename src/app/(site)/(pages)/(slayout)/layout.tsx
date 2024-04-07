import { LayoutProps } from "@/types/utilities"
import FaceIcon from "./_components/face-icon"

export interface SLayoutProps extends LayoutProps<"slayouttags"> {}

const SLayout = ({ slayouttags, children }: SLayoutProps) => (
  <>
    <FaceIcon className="w-52 h-52 mx-auto" />
    <div className="px-5 py-4 w-full flex justify-center flex-wrap gap-3">
      {slayouttags}
    </div>
    {children}
  </>
)

export default SLayout
