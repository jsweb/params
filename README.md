# queryfetch

Simple JS module to parse/serialize HTTP query/params, useful for Fetch API or AJAX requests.

## Instalation

You can install it with Bower or NPM:

**Bower**

`bower i -S queryfetch`

**NPM**

`npm i -S queryfetch`

If you are using JSPM you can install **queryfetch** from NPM:

`jspm i queryfetch=npm:queryfetch`

## Usage

### ES6
```javascript
import queryfetch from 'queryfetch'
```

### CommonJS
```javascript
let queryfetch = require('queryfetch')
```

### AMD
```javascript
require(['queryfetch'], queryfetch => {
    //code go here
})
```

### Global
```html
<script src="path/to/queryfetch/queryfetch.umd.js"></script>
```

It's also possible to get it from the great UNPKG CDN:

```html
<script src="https://unpkg.com/queryfetch"></script>
```

## Instance

**queryfetch** is a function that returns a class object constructor.

It needs to receive a source argument which will be used at methods execution.

Examples:

```javascript
let str = queryfetch('a=1&b=2&c=3'),
	obj = queryfetch({ a: 1, b: 2, c: 3 })
```

## Methods

There are only 3 methods within **queryfetch**:

### str.parse()

It converts a querystring to a literal Object.

```javascript
let str = queryfetch('a=1&b=2&c=3') //with or without first '?' character

str.parse()   // returns { a: 1, b: 2, c: 3 }
```

### obj.serialize()

Serializes a literal Object to a querystring.

```javascript
let obj = queryfetch({ a: 1, b: 2, c: 3 })

obj.serialize()   // returns 'a=1&b=2&c=3'
```

### obj.form()

This method is a *bonus* to turn a literal Object into FormData instance.

```javascript
let obj = queryfetch({ a: 1, b: 2, c: 3 })

obj.form()   // returns a new FormData instance with obj fields/values
```
