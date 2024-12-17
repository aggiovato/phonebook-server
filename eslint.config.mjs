import globals from "globals";
import pluginObject from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    plugins: { "@stylistic/js": pluginObject },
    rules: {
      "no-console": 0,
      eqeqeq: "error",
      "no-trailing-spaces": "error",
    },
    ignores: ["dist/**"],
  },
];
