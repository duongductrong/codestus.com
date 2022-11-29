/* eslint-disable jsx-a11y/anchor-has-content */
import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";
import SimpleCardSkeleton from "../Skeleton/SimpleCardSkeleton";

export interface SimpleCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  desc?: string;
  url?: string;
  loadingSkeleton?: boolean;
  views?: number | string;
}

const SimpleCard: FC<SimpleCardProps> = ({
  className,
  title,
  desc,
  url,
  views = 0,
  loadingSkeleton,
  ...props
}) => {
  return loadingSkeleton ? (
    <SimpleCardSkeleton className="mb-8" />
  ) : (
    <div
      {...props}
      className={clsx(className, "")}>
      <div
        {...props}
        className={clsx(
          className,
          "relative ",
          "overflow-hidden rounded-md",
          "hover:translate-x-2 duration-200 transition-all",
        )}>
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
          {title}
        </h2>
        <p className="font-normal text-sm text-gray-500 line-clamp-3 mb-4">
          {desc}
        </p>

        <p className="font-normal text-sm text-gray-500 mb-4">{views ?? 0} views</p>

        <Link
          to={url ?? "/"}
          className="block text-sm font-bold text-gray-700 text-right absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default SimpleCard;
