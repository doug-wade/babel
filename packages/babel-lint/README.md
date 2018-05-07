# @babel/lint

> Babel linter.

**Warning: This README was written as part of README-driven development.  Some features may not be implemented yet**

A static analysis tool for helping you optimize you babel config and keep it
up-to-date.  When run in a project, it will check your config to make sure you
don't have any deprecated plugins or presets installed, and check for duplicate
plugins.

## Install

If you intend to run babel-lint regularly, for instance, as part of a lint
target, or on CI, install it as a devDependency.

```sh
npm install --save-dev @babel/lint
```

If, instead, you intend to run the linter irregularly and manually to lint your
config (for instance, only once), consider using `npx`

```
npx babel-lint
```

Which will install and use babel-lint.

## Usage

When you run babel-lint without any arguments, it will use the [babel config
lookup behavior](https://babeljs.io/docs/usage/babelrc/#lookup-behavior) to find
a `.babelrc` or equivalent hash in a `package.json` and lint that config

```sh
babel-lint
```

Alternatively, you can pass the path to your .babelrc or package.json

```sh
babel-lint path/to/babel/config
```

If would like, you can consider running babel-lint as part of a linting or CI
step by adding it to your scripts in package.json

```json
{
  "scripts": {
    "lint": "eslint && babel-lint",
    "ci": "npm test && babel-lint"
  }
  ...
}
```
