import clsx from "clsx";
import type { FC, HTMLAttributes, ReactNode } from "react";

export interface ToastProps extends HTMLAttributes<HTMLElement> {
  open?: boolean;
  title?: string;
  describe?: string;
  prefixIcon?: ReactNode;
}

const Toast: FC<ToastProps> = ({
  open,
  children,
  className,
  title,
  describe,
  prefixIcon,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "fixed bottom-4 left-1/2 -translate-x-1/2 w-10/12 sm:max-w-[375px] sm:w-full sm:translate-x-0 sm:bottom-4 sm:left-auto sm:right-4",
        "border rounded-lg py-4 px-6 bg-[#151618] dark:bg-white shadow-lg",
        "text-sm text-white",
        "flex items-start",
        " transition-all duration-300",
        {
          "sm:translate-x-0": open,
          "opacity-0 sm:-translate-x-4": !open,
        },
      )}>
      <div>{prefixIcon}</div>
      <div className="h-full flex flex-col justify-center ml-3">
        <span className="font-bold text-white dark:text-black block">
          {title}
        </span>
        <span className="block text-white dark:text-black">{describe}</span>
      </div>
    </div>
  );
};

export default Toast;
