import { LayoutProps } from "@/types/utilities"
// import FaceIcon from "./_components/face-icon"
import Image from "next/image"

export interface SLayoutProps extends LayoutProps<"slayouttags"> {}

const SLayout = ({ slayouttags, children }: SLayoutProps) => (
  <>
    {/* <FaceIcon className="w-52 h-52 mx-auto" /> */}
    <Image
      src="/assets/peeps-avatar-alpha-transparent.png"
      alt="Peeps Avatar"
      width={520}
      height={520}
      className="w-52 h-w-52 rounded-full mx-auto bg-amber-500 mb-8"
    />
    {/* <div className="px-5 py-4 w-full flex justify-center flex-wrap gap-3">{slayouttags}</div> */}
    {children}
  </>
)

export default SLayout
