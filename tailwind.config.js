const plugin = require("tailwindcss/plugin");
const { container } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{tsx,ts,js,jsx,html}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        ...container.screens,
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1024px",
        "2xl": "1024px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addComponents }) => {
      addComponents({
        ".bg-dot-grid-light": {
          background: `linear-gradient(90deg, #fff 15px, transparent 1%) 50%,
          linear-gradient(#fff 15px, #3e4146 1%) 0%, hsla(0, 0%, 100%, 0.16) fixed`,
          backgroundSize: "16px 16px !important",
        },

        ".bg-dot-grid-dark": {
          background: `linear-gradient(90deg, #151618 15px, transparent 1%) 50%,
          linear-gradient(#151618 15px, #3e4146 1%) 0%, hsla(0, 0%, 100%, 0.16) fixed`,
          backgroundSize: "16px 16px !important",
        },
      });
    }),
  ],
};
