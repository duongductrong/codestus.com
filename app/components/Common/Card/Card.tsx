/* eslint-disable jsx-a11y/anchor-has-content */
import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import { MdMotionPhotosOn } from "react-icons/md";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  desc?: string;
  source?: string;
  url?: string;
  pageViews?: number;
}

const Card: FC<CardProps> = ({ className, children, title, desc, source, url, pageViews, ...props }) => (
  <div
    {...props}
    className={clsx(
      className,
      "flex flex-col",
      "relative",
      "overflow-hidden border dark:border-neutral-700 bg-white dark:bg-transparent rounded-md shadow-sm",
      "hover:-translate-y-2 duration-200 transition-all",
    )}>
    {source && <img className="max-h-[170px] h-full w-full object-cover" src={source} alt={title} />}
    <div className="p-4 flex flex-col h-full">
      <h2 className="font-bold text-gray-700 dark:text-white mb-2">{title}</h2>
      <p className="font-normal text-sm text-gray-400 line-clamp-3 mb-4">{desc}</p>

      <div className="flex items-center mt-auto">
        {pageViews && (
          <span className="inline-flex items-center text-neutral-600 dark:text-neutral-400 text-sm">
            <MdMotionPhotosOn size={16} className="text-neutral-600 dark:text-neutral-400 mr-2" />
            {Intl.NumberFormat("vi-VN").format(pageViews)} views
          </span>
        )}
      </div>

      <Link
        to={url ?? "/"}
        className="block text-sm font-bold text-gray-700 text-right absolute top-0 left-0 w-full h-full"
      />
    </div>
  </div>
);

Card.defaultProps = {
  title: "",
  desc: "",
  source: "",
  url: "",
  pageViews: 0,
};

export default Card;
