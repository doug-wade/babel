# @babel/plugin-proposal-nullish-coalescing-operator

> Replace `enum` with a [polyfill helper](https://github.com/doug-wade/enum-polyfill).

## Example

**In**

```javascript
enum MetasyntacticVariables {
  FOO,
  BAR = 'BAR',
  BAZ
}
```

**Out**

```javascript
var MetasyntacticVariables = PolyfilledEnum({
  FOO: PolyfilledEnumEmptyValue,
  BAR: 'BAR',
  BAZ: PolyfilledEnumEmptyValue
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-enum
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-enum"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-enum script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-enum"]
});
```

## References

* [Proposal: Enums](https://github.com/doug-wade/proposal-enum-definitions)
