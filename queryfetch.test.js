const query = require('./queryfetch'),
  qobj = { a: 1, b: 2, c: 3 },
  qstr = 'a=1&b=2&c=3'

class FormData {
  constructor() {
    this.data = {}
  }
  append(k, v) {
    this.data[k] = v
  }
}

global.FormData = FormData

it('should return a function', () => {
  expect(query instanceof Function).toBe(true)
})

it('should accept an argment to store as a property', () => {
  const test = query(qstr)
  expect(test.src).toBe(qstr)
})

it('serialize should join an object into a query string', () => {
  const test = query(qobj).serialize()
  expect(test).toBe(qstr)
})

it('parse should split a query string to an object', () => {
  const test = query(qstr).parse()
  expect(test).toMatchObject(qobj)
})

it('form should transform query string or object into FormData', () => {
  const t1 = query(qstr).form()
    t2 = query(qobj).form()
  expect(t1 instanceof FormData).toBe(true)
  expect(t2 instanceof FormData).toBe(true)
})
