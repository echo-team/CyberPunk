module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "ignorePatterns": ["ESLint.js"],
    "rules": {
        "array-bracket-spacing": [2, "never"],
        "brace-style": [2, "allman", { "allowSingleLine": true }],
        "arrow-parens": [2, "always"],
        "arrow-spacing": [2, { "before": true, "after": true }],
        "block-scoped-var": 2,
        "block-spacing": [2, "always"],
        "camelcase": [2, { "properties": "always" }],
        "capitalized-comments": [2, "always"],
        "comma-dangle": [2, {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],
        "comma-spacing": [2, { "before": false, "after": true }],
        "computed-property-spacing": [2, "never"],
        "curly": 2,
        "dot-notation": 2,
        "eol-last": [2, "always"],
        "func-call-spacing": [2, "never"],
        "indent": [2, 4, { "SwitchCase": 1 }],
        "key-spacing": [2, { "beforeColon": false }],
        "lines-around-comment": [2, { "beforeBlockComment": true, "allowBlockStart": true }],
        "lines-between-class-members": [2, "always"],
        "new-cap": [2, { "newIsCap": true }],
        "new-parens": [2, "always"],
        "no-multi-spaces": 2,
        "no-multiple-empty-lines": 2,
        "quotes": [2, 'single'],
        "no-nested-ternary": 2,
    }
};