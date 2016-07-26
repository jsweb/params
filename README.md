# queryfetch

Simple JS module to parse/serialize HTTP query/params, useful for Fetch API or AJAX requests.

##Instalation

You can install it with Bower or NPM:

**Bower**

`bower i -S queryfetch`

**NPM**

`npm i -S queryfetch`

If you are using JSPM you can install **queryfetch** from NPM:

`jspm i queryfetch=npm:queryfetch`

##Usage

###ES6
```javascript
import queryfetch from 'queryfetch'
```

###CommonJS
```javascript
let queryfetch = require('queryfetch')
```

###AMD
```javascript
require(['queryfetch'], queryfetch => {
    //code go here
})
```

###Global
```html
<script src="path/to/queryfetch/queryfetch.min.js"></script>
```

##Methods

There are only 3 methods within **queryfetch**:

###queryfetch.serialize(obj)

Serializes a literal Object to a querystring.

```javascript
let obj = { a: 1, b: 2, c: 3 }

queryfetch.serialize(obj)   //returns 'a=1&b=2&c=3'
```

###queryfetch.parse(str)

Reverse a querystring to a literal Object.

```javascript
let str = 'a=1&b=2&c=3' //with or without first '?' character

queryfetch.parse(str)   //returns { a: 1, b: 2, c: 3 }
```

###queryfetch.form(obj)

This method is a *bonus* to turn a literal Object into FormData instance.

```javascript
let obj = { a: 1, b: 2, c: 3 }

queryfetch.form(obj)   //returns a new FormData instance with obj fields
```
