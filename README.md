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

Tree shaking (since v3.1.0):

```javascript
import { serialize, parse, form } from '@jsweb/params'
```

### CommonJS

```javascript
const params = require('@jsweb/params')
```

### Global

If you install with CDN script tag, `params` object will be available globally at `window` scope.

## Methods

There are only 3 methods within **@jsweb/params**:

### serialize(input: array | object): string

Transform an object to HTTP query string.

```javascript
import { serialize } from '@jsweb/params'

const query = serialize({ a: 1, b: 2, c: 3 }) // returns 'a=1&b=2&c=3'
```

### parse(input: string): any

Transform an HTTP query string to literal object.

```javascript
import { parse } from '@jsweb/params'

const obj = parse('a=1&b=2&c=3')   // { a: 1, b: 2, c: 3 }
```

### form(input: any): any

Transform query string or object into FormData.

Input can be a query string, object or even an HTMLFormElement.

```javascript
import { form } from '@jsweb/params'

const data1 = form('a=1&b=2&c=3')          // FormData instance with fields/values
const data2 = form({ a: 1, b: 2, c: 3 })   // FormData instance with fields/values
```
