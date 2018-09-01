# @jsweb/params

Simple JS module to parse/serialize HTTP query/params. Useful for Fetch API or AJAX requests.

## Instalation

You can install using NPM, Yarn or from CDN:

```
npm i -S @jsweb/params
```

```
yarn add @jsweb/params
```

```html
<script src="https://unpkg.com/@jsweb/params"></script>
```

## Usage

### ES6+

```javascript
import params from '@jsweb/params'
```

### CommonJS

```javascript
const params = require('@jsweb/params')
```

### Global

If you install with CDN script tag, `params` object will be available globally at `window` scope.

## Instance

**params** is a function that returns a class object constructor.

It needs to receive a source argument which will be used at methods execution.

Examples:

```javascript
const str = params('a=1&b=2&c=3')
const obj = params({ a: 1, b: 2, c: 3 })
```

## Methods

There are only 3 methods within **params**:

### params(str).parse()

It converts a query string to a literal Object.

```javascript
const str = params('a=1&b=2&c=3') // with or without first '?' char

str.parse()                       // returns { a: 1, b: 2, c: 3 }
```

### params(obj).serialize()

Serializes a literal Object to a query string.

```javascript
const obj = params({ a: 1, b: 2, c: 3 })

obj.serialize() // returns 'a=1&b=2&c=3'
```

### params(data).form()

This method is a *bonus* to build a FormData instance.

It can receive an entry as query string, literal Object or HTMLFormElement.

```javascript
const data = params(any)  // querystring, literal Object or HTMLFormElement

data.form()               // returns FormData instance with fields/values
```
