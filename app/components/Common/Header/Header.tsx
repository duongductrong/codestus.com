import React, { useEffect, useState } from "react";
import type { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import { Link } from "@remix-run/react";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import { MdNightlight, MdWbSunny } from "react-icons/md";

export interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.remove(
      themeMode === "dark" ? "light" : "dark",
    );
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <header
      className={clsx(className, "container flex items-center mx-auto p-4")}>
      <h1 className="font-space font-extrabold text-2xl text-black dark:text-white">
        <Link to="/">Codestus</Link>
      </h1>

      <div className="ml-auto space-x-6 flex items-center">
        {/* <Link
          to={GENERAL_ROUTES.HOME}
          className="text-black dark:text-white font-semibold">
          Home
        </Link> */}
        <Link
          to={GENERAL_ROUTES.HOME}
          className="text-black dark:text-white font-semibold">
          Blog
        </Link>
        <span
          role="button"
          className="inline-block cursor-pointer text-black dark:text-white"
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}>
          {themeMode === "dark" ? (
            <MdWbSunny size={24} />
          ) : (
            <MdNightlight size={24} />
          )}
        </span>
      </div>
    </header>
  );
};

export default Header;
