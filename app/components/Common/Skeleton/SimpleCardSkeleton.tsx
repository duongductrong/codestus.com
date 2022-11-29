import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";

export interface SimpleCardSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {}

const SimpleCardSkeleton: FC<SimpleCardSkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(className, "w-full")}>
      <div className="animate-pulse">
        <div className="rounded-md bg-neutral-200 dark:bg-neutral-700 h-5 w-full max-w-[500px] mb-4"></div>
        <div className="rounded-md bg-neutral-200 dark:bg-neutral-700 h-7 w-full mb-4"></div>
        <div className="rounded-md bg-neutral-200 dark:bg-neutral-700 h-3 w-full"></div>
      </div>
    </div>
  );
};

export default SimpleCardSkeleton;
