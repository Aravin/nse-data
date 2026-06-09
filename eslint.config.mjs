import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".husky/**",
      "cookies.txt",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        afterEach: "readonly",
        beforeAll: "readonly",
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
);