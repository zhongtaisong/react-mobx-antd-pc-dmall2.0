module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: "eslint:recommended",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        parser: "@babel/eslint-parser",
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module",
        requireConfigFile: false,
    },
    plugins: [
        "react"
    ],
    rules: {
        "import/no-anonymous-default-export": "off",
        "no-undef": "off",
        "eqeqeq": "off",
        "no-unused-vars": "off",
        "no-extra-semi": "off",
        "no-sparse-arrays": "off",
        "no-constant-condition": "off"
    }
};