import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";

export interface SimplePaginationProps extends HTMLAttributes<HTMLElement> {
  prevDisabled?: boolean;
  prevText?: string;
  prevTo?: string;
  nextDisabled?: boolean;
  nextText?: string;
  nextTo?: string;
  currentPage?: string | number;

  onNext?: () => void;
  onPrev?: () => void;
}

const SimplePagination: FC<SimplePaginationProps> = ({
  prevDisabled,
  prevText,
  prevTo,
  nextDisabled,
  nextText,
  nextTo,
  onNext,
  onPrev,
  className,
  currentPage,
  ...props
}) => (
  <nav
    {...props}
    className={clsx(
      className,
      "relative",
      "flex items-center",
      "bg-neutral-100/75 dark:bg-neutral-800/50",
      "space-x-10 px-4 py-2 rounded-md",
    )}>
    <Link
      to={prevTo ?? "/"}
      onClick={onPrev}
      className={clsx(
        "inline-flex items-center",
        "hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-600",
        "font-semibold  transition-all duration-300",
        {
          "pointer-events-none opacity-50": prevDisabled,
        },
      )}>
      {prevText ?? "Previous"}
    </Link>

    {currentPage && (
      <span className="font-semibold dark:text-neutral-400 dark:hover:text-neutral-600">{currentPage}</span>
    )}

    <Link
      to={nextTo ?? "/"}
      onClick={onNext}
      className={clsx(
        "inline-flex items-center",
        "hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-600",
        "font-semibold  transition-all duration-300",
        {
          "pointer-events-none opacity-50": nextDisabled,
        },
      )}>
      {nextText ?? "Next"}
    </Link>
  </nav>
);

SimplePagination.defaultProps = {
  prevDisabled: false,
  prevText: "",
  prevTo: "",
  nextDisabled: false,
  nextText: "",
  nextTo: "",
  currentPage: "",

  onNext: () => null,
  onPrev: () => null,
};

export default SimplePagination;
