import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";

export interface ButtonProps extends HTMLAttributes<HTMLElement> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "px-6 py-3 bg-black dark:bg-white rounded-lg text-white dark:text-black font-medium hover:opacity-80 hover:shadow-md transition-all duration-300",
      )}>
      {children}
    </button>
  );
};

export default Button;
