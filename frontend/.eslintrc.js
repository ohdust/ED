// 0 - turn the rule off
// 1 - turn the rule on as a warning (doesn't affect exit code)
// 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
    extends: ["eslint-config-google"],

    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },

    rules: {
        "camelcase": 2,
        "indent": [
      "error",
      4,
      {
        // How chaining and related is not consistently formatted in this application. But there are too many
        // instances of incorrectness to fix (2010)
          MemberExpression: "off",
        // This primarily occurs because of our old style of defining component specs with strings in arrays. Once
        // those are all shifted to template literals, this can be enabled (127 issues)
          ArrayExpression: "off",
        // Commented out code does not need to follow indenting standards
          ignoreComments: true,
      },
        ],
        "arrow-parens": 0,

    // Disables from the old JSCS file, these may be changed later:
        "max-len": 0,
        "no-trailing-spaces": 0,
        "one-var": 0,
        "no-multi-str": 0, // This only works in ES5 browsers, but those are our lowest targets
        "no-return-assign": 0, // Allow arrow functions to return assignments (Applies to Node.js code only)
        "no-negated-condition": 0, // Allow normal negated conditions to be used e.g. a !== b

    // ------
    // IMPORTANT
        "no-warning-comments": 2,
        "no-console": 0, // This would help eliminate log verbosity. Needs to be overridden in folders (41 errors)
        "no-unused-vars": 2,
        "no-undef": 2,
        "no-use-before-define": [
      2,
      {
          functions: false,
      },
        ], // Related to 'no-undef'
        "semi": 2, // Can cause confusing errors, but causes too many errors right now
        "no-implicit-coercion": 2,
        "block-scoped-var": 0, // This can lead to very confusing errors, but fixing could generate app errs (18 errors)
        "eqeqeq": 2, // There is almost no good reason to use == instead of ===
        "max-nested-callbacks": [2, 6],
        "no-const-assign": 2,
        "no-dupe-keys": 2,
        "no-var": 0, // Prioritizing let/const is important, but there are still some valid use cases for var

    // MEDIUM
        "new-cap": [
      2,
      {
          capIsNewExceptions: ["Snap"],
      },
        ],
        "max-statements-per-line": 2,
        "quote-props": 2,
        "no-unreachable": 2,
        "no-nested-ternary": 2,
        "guard-for-in": 2,
    // Especially, for non-additive operators (6 errors)
        "one-var-declaration-per-line": 0, // This is very confusing, but seems to be a standard in some places. So it
        "comma-dangle": 0, // Allow commas at the end of object literals and arrays
        "handle-callback-err": 2,
        "valid-jsdoc": 0, // Set to 2 to see all the errors across our system
        "prefer-promise-reject-errors": 0, // Promise rejects should only be given Error objects

    // LOW PRIORITY
        "operator-assignment": 0, // Probably a good idea, but it could be argued that not doing this is clearer.
    // spacing
        "no-useless-escape": 0, // This error only occurs remotely on CodeShip (which is confusing)
        "padded-blocks": 0, // Issues of blocks have things link 2 empty lines in them
        "no-multiple-empty-lines": 0, // Related to the above
        "comma-spacing": 0, // Space before comma issue
        "object-curly-spacing": 0, // Spacing issues around blocks
        "no-multi-spaces": 0, // Multiple spacing issue before blocks
        "keyword-spacing": 0, // If should have spaces after them
        "key-spacing": 1, // If keys in object literals should have spaces after them
        "semi-spacing": 0, // For and while semi-colon spacing
        "space-before-function-paren": [
      2,
      {
          anonymous: "never",
          named: "never",
          asyncArrow: "always",
      },
        ],
        "space-before-blocks": 0, // Opening brace space
        "generator-star-spacing": [
      2,
      {
          before: false,
          after: true,
      },
        ], // function* myFunction() is the only valid generator syntax
    // other
        "no-else-return": 0, // Not conforming to this rule results in verbose code, but not a big deal
        "require-jsdoc": 0, // There is currently no JSDoc commenting standard agreed upon yet
        "spaced-comment": 0, // Allow comments with more than 2 /, e.g. top of gulpfile.js. Related to above (447 errors)
        "no-extra-semi": 0, // Deal with this will make the code easier to read, but it is not a big deal
        "brace-style": 0, // Not allowing one line braces is debateable
        "no-loop-func": 0, // No functions within loops, this is debateable
        "default-case": 0, // I don't see why switch statements need default cases
        "quotes": 0, // Should single/double quotes be consistent?
        "prefer-const": 0, // Prefer const over let which is our policy. But it is inconsitently applied right now.
        "operator-linebreak": 0,

    // Enable this to see if returns are consistent. This can be used to check how much code has drifted since this:
    // https://github.com/zimit-io/zimit-webapp/pull/4279
    // Note that there will be errors for 'return;' which cannot be excluded via an option and are valid according
    // to our code style.
    // 'consistent-return': 2,
    },

    globals: {
        lodash: true,
    //testing keywords
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        describe: true,
        xdescribe: true,
        expect: true,
        expectAsync: true,
        fail: true,
        it: true,
        xit: true,
        inject: true,
        spyOn: true,
        componentTests: true,
        zTest: true,
        jasmine: true,
        Promise: true,
        Proxy: true,

        Set: true,
        Map: true,
        Uint8Array: true,
    },

    env: {
        browser: true, // Some API files are used client side, so browser objects need to be taken into account.
        node: true,
    },

    settings: {
        "import/resolver": {
            alias: {
                map: [
          ["backend", "./backend"],
          ["models", "./models"],
                ],
                extensions: [".js", ".json"],
            },
            ignore: ["./node_modules/.*", "tmp"],
        },
    },

    overrides: [
    {
        files: "*.ts",
        extends: ["plugin:@typescript-eslint/recommended"],

        rules: {
            "@typescript-eslint/ban-ts-comment": 0, // This is not a good practice, but there is too much legacy code to remove
            "@typescript-eslint/no-explicit-any": 0, // This is not a good practice, but there is too much legacy code to remove
            "@typescript-eslint/explicit-module-boundary-types": 0, // This is not a good practice, but there is too much legacy code to remove
            "@typescript-eslint/no-inferrable-types": 0, // Types should always be explicit
            "@typescript-eslint/no-empty-function": 0, // Empty functions are fine
        // Reference for this: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
            "@typescript-eslint/ban-types": [
          2,
          {
              types: {
                  "String": true,
                  "Boolean": true,
                  "Number": true,
                  "Symbol": true,
                  "{}": true,
                  "Object": true,
                  "object": true,
                  "Function": {
                      message:
                  "Define what the function expects explicitly. For example, OverrideTransportSuccessCallback in z-select.component.m.ts",
                  },
              },
          },
            ],
            "@typescript-eslint/no-unused-vars": 2,

        // Unfortunately, this conflicts with decorators like @NgModule, so they must be explicitly excluded
            "new-cap": [
          2,
          {
              capIsNewExceptionPattern: "Ng.*",
              capIsNewExceptions: [
              "Component",
              "Directive",
              "Input",
              "Output",
              "Inject",
              "Injectable",
              "ViewChild",
              ],
          },
            ],

        // Just for TypeScript files these recommended standards can be enforced since there is not too many now
            "no-var": 2,
            "prefer-const": 2,
            "block-scoped-var": 2,
            "one-var-declaration-per-line": 2,
            "valid-jsdoc": 2,
        },
    },
    {
        files: "*.model.ts",
        rules: {
        // These are used in the model header. So it cannot be removed
            "no-var": 0,
            "block-scoped-var": 0,
            "@typescript-eslint/no-var-requires": 0,
        },
    },
    ],
};
