import clsx from "clsx";
import type { ButtonHTMLAttributes, FC } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, type, ...props }) => (
  <button
    {...props}
    type={type ?? "button"}
    className={clsx(
      "px-6 py-3 font-medium hover:opacity-80 hover:shadow-md transition-all duration-300",
      "bg-black dark:bg-white rounded-lg text-white dark:text-black",
    )}>
    {children}
  </button>
);

export default Button;
