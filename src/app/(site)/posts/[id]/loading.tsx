import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export interface LoadingProps {}

const Loading = (props: LoadingProps) => (
  <div className="flex flex-col items-center justify-center gap-4 h-[500px]">
    Loading...
    {/* <Skeleton className="w-[500px] h-[50px] mx-auto" />

    <div className="flex items-center gap-4">
      <Skeleton className="w-[80px] h-[20px] mx-auto" />
      <Skeleton className="w-[80px] h-[20px] mx-auto" />
    </div>

    <div className="w-full h-[20px]" />
    <div className="w-full h-[40px]" />
    <div className="w-full h-[50px]" />
    <div className="w-full h-[20px]" />
    <div className="w-full h-[30px]" />
    <div className="w-full h-[50px]" /> */}
  </div>
)

export default Loading
