module.exports = {
  root: true, // This is important for ESLint to know this is the base config for the functions directory
  env: {
    es6: true,
    node: true, // <--- THIS MUST BE HERE AND SET TO TRUE TO FIX 'module', 'require', 'exports' errors
  },
  parserOptions: {
    "ecmaVersion": 2018, // Adjust if you're using newer JS features like async/await (2017+)
  },
  extends: [
    "eslint:recommended",
    "google", // Google's style guide
  ],
  rules: {
    // Standard rules you might have:
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],

    // <--- THIS LINE IS CRUCIAL TO FIX THE 'context' IS DEFINED BUT NEVER USED ERROR
    "no-unused-vars": ["error", { "argsIgnorePattern": "context" }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"], // Rules for test files
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {}, // Any global variables not explicitly imported
};