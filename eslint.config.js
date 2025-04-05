import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Settings shared by all overridden configs
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Add node globals if needed for Vite/other configs
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
  {
    // React specific configurations
    files: ["**/*.{ts,tsx}"], // Target TS and TSX files
    ...reactPlugin.configs.flat.recommended, // Apply React recommended rules
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Apply React Hooks rules
      // prettier-ignore
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off", // Not needed with React 17+ and Vite
      "react/prop-types": "off", // Disable prop-types rule if using TypeScript
    },
  },
  // Add Prettier recommended configuration
  // Make sure this is the last configuration in the array
  prettierRecommended,
  // Add Prettier overrides
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "crlf" }],
    },
  },
);
