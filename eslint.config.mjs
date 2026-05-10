import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended"),
    ...compat.extends("plugin:react/recommended"),
    { ignores: ["builds/**", "archive/**"] },
    {
        settings: {
            react: { version: "19" }
        }
    },
    {
        files: ["scripts/**/*.{js,cjs}"],
        languageOptions: {
            globals: { ...globals.node }
        }
    },
    {
        ignores: ["scripts/**"],
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                React: true,
                JSX: true,
                DiscordNative: true
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    },
    {
        plugins: {
            react,
            "simple-import-sort": simpleImportSort,
            "unused-imports": unusedImports
        },
        rules: {
            "arrow-parens": ["error", "as-needed"],
            "comma-dangle": ["error", "never"],
            "comma-spacing": "error",
            "comma-style": "error",
            "eol-last": ["error", "always"],
            "func-call-spacing": ["error", "never"],
            indent: ["error", 4, { SwitchCase: 1 }],
            "keyword-spacing": "error",
            "max-len": [
                "error",
                {
                    code: 120,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreComments: true,
                    ignoreTemplateLiterals: true
                }
            ],
            "max-nested-callbacks": ["error", { max: 4 }],
            "max-statements-per-line": ["error", { max: 2 }],
            "no-console": "off",
            "no-empty-function": "error",
            "no-mixed-spaces-and-tabs": "error",
            "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
            "no-trailing-spaces": "error",
            "no-var": "error",
            "no-whitespace-before-property": "error",
            "object-curly-spacing": ["error", "always"],
            "prefer-const": "error",
            quotes: ["error", "double", { avoidEscape: true }],
            "react/jsx-key": "off",
            "react/no-unescaped-entities": "off",
            "react/prop-types": "off",
            semi: ["error", "always"],
            "space-before-blocks": "error",
            "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
            "space-in-parens": "error",
            "space-infix-ops": "error",
            "space-unary-ops": "error",
            "spaced-comment": "error",
            yoda: "error",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "unused-imports/no-unused-imports": "error"
        }
    }
];
