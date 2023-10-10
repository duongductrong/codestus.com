import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export interface LoadingProps {}

const Loading = (props: LoadingProps) => (
  <div className="flex gap-4 h-[500px]">
    <Skeleton className="flex-1 h-[50px] mx-auto" />
    <Skeleton className="flex-1 h-[50px] mx-auto" />
  </div>
)

export default Loading
