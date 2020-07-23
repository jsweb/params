import { deepEqual, equal } from 'assert'
import { form, parse, serialize } from '../index.js'

const qobj = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    a: 'a',
    b: 'b',
    c: 'c',
  },
  e: [1, 2, 3],
  f: [
    { a: 1, b: 2 },
    { a: 3, b: 4, c: { a: 'f.1.c.a' } },
  ],
}
const qstr =
  'a=1&b=2&c=3&d[a]=a&d[b]=b&d[c]=c&e[0]=1&e[1]=2&e[2]=3&f[0][a]=1&f[0][b]=2&f[1][a]=3&f[1][b]=4&f[1][c][a]=f.1.c.a'

class FormData {
  #data = {}
  append(k, val) {
    this.#data[k] = val
  }
}

Object.defineProperty(global, 'FormData', { value: FormData })

describe('@jsweb/params', () => {
  it('serialize(input) should join an object into a query string', () => {
    const test = serialize(qobj)
    equal(test, qstr)
  })

  it('parse(string) should split a query string to object', () => {
    const test = parse(qstr)
    deepEqual(test, qobj)
  })

  it('form(input) should transform query string or object into FormData', () => {
    const t1 = form(qstr)
    const t2 = form(qobj)
    equal(t1 instanceof FormData, true)
    equal(t2 instanceof FormData, true)
  })
})
