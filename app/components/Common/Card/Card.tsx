/* eslint-disable jsx-a11y/anchor-has-content */
import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  desc?: string;
  source?: string;
  url?: string;
}

const Card: FC<CardProps> = ({
  className,
  children,
  title,
  desc,
  source,
  url,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "relative",
        "overflow-hidden border dark:border-neutral-700 bg-white dark:bg-transparent rounded-md shadow-sm",
        "hover:-translate-y-2 duration-200 transition-all",
      )}>
      {source && (
        <img
          className="max-h-[170px] h-full w-full object-cover"
          src={source}
          alt={title}
        />
      )}
      <div className="p-4">
        <h2 className="font-bold text-gray-700 dark:text-white mb-2">
          {title}
        </h2>
        <p className="font-normal text-sm text-gray-400 line-clamp-3 mb-4">
          {desc}
        </p>

        <Link
          to={url ?? "/"}
          className="block text-sm font-bold text-gray-700 text-right absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default Card;
