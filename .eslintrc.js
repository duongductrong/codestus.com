/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "airbnb", // npx install-peerdeps --dev eslint-config-airbnb
    "airbnb/hooks", // npx install-peerdeps --dev eslint-config-airbnb
    "prettier", // npm install -D eslint-config-prettier eslint-plugin-prettier
    "plugin:@typescript-eslint/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  plugins: ["prettier", "import"],
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],

    "no-underscore-dangle": "off",
    "react/function-component-definition": "off",
    "import/extensions": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "react/button-has-type": "off",

    "react/default-props-match-prop-types": "warn",
    "react/jsx-props-no-spreading": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-empty-interface": "warn",

    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".jsx", ".tsx"],
      },
    ],

    "max-len": [
      "error",
      {
        code: 120,
        tabWidth: 2,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
  },
};
