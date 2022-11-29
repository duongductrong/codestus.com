import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import React from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
}

const Section: FC<SectionProps> = ({
  children,
  className,
  title,
  subtitle,
  ...props
}) => {
  return (
    <section
      {...props}
      className={clsx(className)}>
      <h2 className="text-4xl text-black dark:text-white font-bold mb-2">
        {title}
      </h2>
      <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-6">
        {subtitle}
      </h3>
      {children}
    </section>
  );
};

export default Section;
