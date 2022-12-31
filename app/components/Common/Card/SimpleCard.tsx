/* eslint-disable jsx-a11y/anchor-has-content */
import type { Tag } from "@prisma/client";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import dayjs from "dayjs";
import type { FC, HTMLAttributes } from "react";
import React from "react";
import { MdRemove } from "react-icons/md";
import SimpleCardSkeleton from "../Skeleton/SimpleCardSkeleton";
import Chip from "../Tag/Tag";

export interface SimpleCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  desc?: string;
  url?: string;
  loadingSkeleton?: boolean;
  views?: number | string;
  estimateReadTime: number;
  lastUpdated?: string | Date;
  tags?: Tag[];
  tagUrl?: (slug?: string) => string;
}

const SimpleCard: FC<SimpleCardProps> = ({
  className,
  title,
  desc,
  url,
  views = 0,
  loadingSkeleton,
  lastUpdated,
  estimateReadTime = 1,
  tags = [],
  tagUrl,
  ...props
}) => {
  return loadingSkeleton ? (
    <SimpleCardSkeleton className="mb-8" />
  ) : (
    <div
      {...props}
      className={clsx(
        className,
        "relative",
        "flex items-start flex-col md:flex-row",
      )}>
      {/* Timestamp */}
      <div className="absolute bottom-8 md:bottom-0 md:relative w-[180px] pl-8 md:pl-0">
        <span className="text-gray-500 text-xs sm:text-sm">
          {dayjs(lastUpdated).format("MMMM DD, YYYY")}
        </span>
      </div>

      <div
        {...props}
        className={clsx(
          className,
          "relative pl-8 md:pl-12",
          "flex-1",
          "border-l border-l-gray-300 dark:border-l-gray-700",
          "duration-200 transition-all",
        )}>
        {/* Milestone circle */}
        <div
          className={clsx(
            "w-4 h-4 rounded-full",
            "absolute top-0 left-0 -translate-x-1/2",
            "bg-white border-gray-300 border-2",
          )}></div>

        {/* Content */}
        <div className="relative pb-12">
          {tags.length ? (
            <div className="space-x-2 mb-2">
              {tags.map((tag, index) => (
                <Link key={tag.slug} to={tagUrl ? tagUrl(tag.slug) : "#"}>
                  <Chip key={"tag-" + index} className="text-sm font-normal">
                    #{tag.name}
                  </Chip>
                </Link>
              ))}
            </div>
          ) : null}

          <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
            {title}
          </h2>
          <p className="font-normal text-md text-gray-500 line-clamp-3 mb-4">
            {desc}
          </p>

          <div className="space-x-4 flex items-center mb-4">
            <p className="font-normal text-xs sm:text-sm text-gray-500">
              {estimateReadTime} phút đọc
            </p>
            <MdRemove className="text-gray-300 dark:text-gray-500" />
            <p className="font-normal text-xs sm:text-sm text-gray-500">
              {views ?? 0} lượt xem
            </p>
          </div>

          <Link
            to={url ?? "/"}
            className="block text-sm font-bold text-gray-700 text-right absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleCard;
