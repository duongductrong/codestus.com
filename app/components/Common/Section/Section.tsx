import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  direction?: "left" | "center" | "right";
}

const Section: FC<SectionProps> = ({
  children,
  className,
  title,
  subtitle,
  direction,
  ...props
}) => {
  const directionClassName = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[direction ?? "left"];

  return (
    <section {...props} className={clsx(className)}>
      <h2
        className={clsx(
          directionClassName,
          "text-4xl text-black dark:text-white font-bold mb-2",
        )}>
        {title}
      </h2>
      <h3
        className={clsx(
          directionClassName,
          "text-lg text-gray-500 dark:text-gray-400 mb-16",
        )}>
        {subtitle}
      </h3>
      {children}
    </section>
  );
};

export default Section;
