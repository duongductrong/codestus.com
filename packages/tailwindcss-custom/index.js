// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents }) => {
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
});
