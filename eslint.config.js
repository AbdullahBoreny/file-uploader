// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";
export default defineConfig([
    {
        ignores: [
            "**/tests/**",
            "**/*.test.js",
            "**/*.spec.js",
            'node_modules/**',
            'eslint.config.js',
            '**/ORM/**'


        ],
        languageOptions: {
            globals: globals.node,
            sourceType: "module",

        },
        rules: {

            semi: "error",
            "no-unused-vars": "error",
            "no-undef": "error",
        },
    },
]);
