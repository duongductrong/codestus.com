import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export interface SimplePaginationProps extends HTMLAttributes<HTMLElement> {
  prevDisabled?: boolean;
  prevText?: string;
  prevTo?: string;
  nextDisabled?: boolean;
  nextText?: string;
  nextTo?: string;

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
  ...props
}) => {
  return (
    <nav
      {...props}
      className="flex items-center space-x-10">
      <Link
        to={prevTo ?? "/"}
        onClick={onPrev}
        className={clsx(
          "inline-flex items-center font-semibold hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-600 transition-all duration-300",
          {
            "pointer-events-none opacity-50": prevDisabled,
          },
        )}>
        <MdKeyboardArrowLeft
          size={24}
          className="mr-2"
        />{" "}
        {prevText ?? "Previous"}
      </Link>

      <Link
        to={nextTo ?? "/"}
        onClick={onNext}
        className={clsx(
          "inline-flex items-center font-semibold hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-600 transition-all duration-300",
          {
            "pointer-events-none opacity-50": nextDisabled,
          },
        )}>
        {nextText ?? "Next"}{" "}
        <MdKeyboardArrowRight
          size={24}
          className="ml-2"
        />
      </Link>
    </nav>
  );
};

export default SimplePagination;
