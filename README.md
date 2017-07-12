# queryfetch

Dead simple JS module to parse/serialize HTTP query/params. Useful for Fetch API or AJAX requests.

## Instalation

### CDN

```html
<script src="https://unpkg.com/queryfetch"></script>
```

### NPM

`npm i -S queryfetch`

### Yarn

`yarn add queryfetch`

### Snipacks

`snipacks add unpkg qf.js queryfetch`

## Usage

### ES6

```javascript
import queryfetch from 'queryfetch'
```

### CommonJS

```javascript
const queryfetch = require('queryfetch')
```

### AMD
```javascript
require(['queryfetch'], queryfetch => {
    //code go here
})
```

### Global

If you include with script tag, `queryfetch` object will be available globally.

## Instance

**queryfetch** is a function that returns a class object constructor.

It needs to receive a source argument which will be used at methods execution.

Examples:

```javascript
const str = queryfetch('a=1&b=2&c=3'),
	obj = queryfetch({ a: 1, b: 2, c: 3 })
```

## Methods

There are only 3 methods within **queryfetch**:

### str.parse()

It converts a querystring to a literal Object.

```javascript
const str = queryfetch('a=1&b=2&c=3') // with or without first '?' char

str.parse()   // returns { a: 1, b: 2, c: 3 }
```

### obj.serialize()

Serializes a literal Object to a querystring.

```javascript
const obj = queryfetch({ a: 1, b: 2, c: 3 })

obj.serialize()   // returns 'a=1&b=2&c=3'
```

### qf.form()

This method is a *bonus* to build a FormData instance.

It can receive an entry as querystring, literal Object or HTMLFormElement.

```javascript
let qf = queryfetch(any) // querystring, literal Object or HTMLFormElement

qf.form()   // returns FormData instance with fields/values
```
