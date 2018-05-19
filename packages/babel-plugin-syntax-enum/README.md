# @babel/plugin-syntax-enum

> Allow parsing of the enum keyword.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-enum
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-enum"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-enum script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-enum"]
});
```
