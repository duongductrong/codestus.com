import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";

export interface TagProps extends HTMLAttributes<HTMLDivElement> {}

const Tag: FC<TagProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        className,
        "inline-block font-semibold text-neutral-500",
      )}>
      {children}
    </div>
  );
};

export default Tag;
