import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";

export type TagProps = HTMLAttributes<HTMLDivElement>;

const Tag: FC<TagProps> = ({ children, className, ...props }) => (
  <div className={clsx(className, "inline-block font-medium text-gray-500 hover:text-blue-600")}>{children}</div>
);

export default Tag;
