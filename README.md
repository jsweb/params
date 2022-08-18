# @jsweb/params

Simple JS module to parse/serialize HTTP query/params. Useful for Fetch API or AJAX requests.

See tests at [https://params.jsweb.app](https://params.jsweb.app)

![package-npm](https://img.shields.io/badge/package-npm-blue.svg?style=for-the-badge)
![module-es](https://img.shields.io/badge/module-es-blue.svg?style=for-the-badge)
![tests-ava](https://img.shields.io/badge/tests-ava-blue.svg?style=for-the-badge)

## New in v4.0.0

Now, its a full ES module, there is no UMD or CommonJS version.

In modern JS development ES modules are the pattern, already supported in newer versions of Node.js and modern borwsers natively.

Backward compatibility is not a concern here. If you use a module bundler (like Webpack or Rollup) to transpile your code, the result will be compatible according to your setup.

## Instalation

You can install it using NPM, Yarn or via Unpkg CDN:

`npm i -S @jsweb/params`

`yarn add @jsweb/params`

## Usage

### ES6

Tree shaking (since v3.1.0):

```javascript
import { serialize, parse, form } from '@jsweb/params'
```

### From CDN (installation not required)

```html
<script type="module">
  import { form } from 'https://unpkg.com/@jsweb/params'

  const data = form({ name: 'Lorem Ispum', mail: 'lorem@ipsum' })
</script>
```

## Methods

There are only 3 methods within **@jsweb/params**:

### serialize(input: object): string

Transform an object to HTTP query string.

```javascript
import { serialize } from '@jsweb/params'

const query = serialize({ a: 1, b: 2, c: 3 }) // returns 'a=1&b=2&c=3'
```

### parse(input: string): any

Transform an HTTP query string to literal object.

```javascript
import { parse } from '@jsweb/params'

const obj = parse('a=1&b=2&c=3') // { a: 1, b: 2, c: 3 }
```

### form(input: any): any

Transform query string or object into FormData.

Input can be a query string, object or even an HTMLFormElement.

```javascript
import { form } from '@jsweb/params'

const data1 = form('a=1&b=2&c=3') // FormData instance with fields/values
const data2 = form({ a: 1, b: 2, c: 3 }) // FormData instance with fields/values
```
