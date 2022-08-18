import test from 'ava'
import { form, parse, serialize } from './params'

const qobj: Partial<any> = {
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
  g: null,
  h: undefined,
}
const qstr =
  'a=1&b=2&c=3&d[a]=a&d[b]=b&d[c]=c&e[0]=1&e[1]=2&e[2]=3&f[0][a]=1&f[0][b]=2&f[1][a]=3&f[1][b]=4&f[1][c][a]=f.1.c.a'

class HTMLFormElement {}

class FormData {
  private data: Record<string, string> = {}
  append(k: string, val: string) {
    this.data[k] = val
  }
}

test('serialize(input) should transform an object into a query string', (t) => {
  t.is(serialize(qobj), qstr)
})

test('parse(input) should transform a query string into an object', (t) => {
  const input = qstr.concat('&g=&h=')
  const expected = { ...qobj, h: null }

  t.deepEqual(parse(input), expected)
})

test('form(input) should return the input if FormData is undefined', (t) => {
  t.is(form(qobj), qobj)
})

test('form(input) should return the input if input is a FormData', (t) => {
  Object.defineProperty(global, 'FormData', { value: FormData })

  const input = new FormData()
  t.is(form(input), input)
})

test('form(input) should transform HTMLFormElement into a FormData', (t) => {
  Object.defineProperty(global, 'HTMLFormElement', { value: HTMLFormElement })

  const input = new HTMLFormElement()
  const data = form(input)
  t.true(data instanceof FormData)
})

test('form(input) should transform an object into a FormData', (t) => {
  const data = form(qobj)
  t.true(data instanceof FormData)
})

test('form(input) should transform a query string into a FormData', (t) => {
  const data = form(qstr)
  t.true(data instanceof FormData)
})
