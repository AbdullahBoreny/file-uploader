// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";
export default defineConfig([
    {
        ignores: ["**/tests/**", "**/*.test.js", "**/*.spec.js"],
        languageOptions: {
            globals: globals.node,
            sourceType: "module",

        },
        rules: {

            semi: "error",
            "no-unused-vars": "error",
            "prefer-const": "error",
            "no-console": "warn",
            "no-undef": "error",
        },
    },
]);
