import set from 'lodash/set'
import { objectToFormData } from 'object-to-formdata'

/**
 * Transform an object to HTTP query string.
 * Returns a string containing a query string suitable for use in a URL.
 * Does not include the question mark.
 *
 * @export {function}
 * @param {*} input
 * @returns {string}
 * @example
 * import { serialize } from '@jsweb/params'
 *
 * const query = serialize({ a: 1, b: 2, c: 3 })  // returns 'a=1&b=2&c=3'
 */
export function serialize(input = {}) {
  const params = new URLSearchParams()

  const iterate = (obj, pre) => {
    const keys = Object.keys(obj)

    keys.forEach((k) => {
      const param = obj[k]

      if (param === null || param === undefined) return null

      const key = pre ? `${pre}[${k}]` : k

      if (typeof param === 'object') return iterate(param, key)

      const nan = Number.isNaN(param)
      const val = nan ? param : param.toString()

      return val && params.set(key, val)
    })

    const qs = params.toString()

    return decodeURIComponent(qs)
  }

  return iterate(input)
}

/**
 * Transform an HTTP query string to literal object.
 *
 * @export {function}
 * @param {string} input
 * @returns {object}
 * @example
 * import { parse } from '@jsweb/params'
 *
 * const obj = parse('a=1&b=2&c=3')   // { a: 1, b: 2, c: 3 }
 */
export function parse(input = '') {
  const params = new URLSearchParams(input)
  const data = {}

  Array.from(params.entries()).forEach(([key, val]) => {
    if (!key) return null

    const value = !val ? null : isNaN(val) ? val : Number(val)

    if (!key.includes('[')) return (data[key] = value)

    const path = key.replace(/\]/g, '').split('[')

    return set(data, path, value)
  })

  return data
}

/**
 * Transform query string or object into FormData.
 *
 * @export {function}
 * @param {*} input
 * @returns {*}
 * @example
 * import { form } from '@jsweb/params'
 *
 * const data1 = form('a=1&b=2&c=3')          // FormData instance with fields/values
 * const data2 = form({ a: 1, b: 2, c: 3 })   // FormData instance with fields/values
 */
export function form(input) {
  if (typeof FormData === 'undefined') {
    console.error('FormData not supported')
    return input
  }

  if (input instanceof FormData) return input

  if (typeof HTMLFormElement !== 'undefined')
    if (input instanceof HTMLFormElement) return new FormData(input)

  if (typeof input === 'string') input = parse(input)

  return objectToFormData(input)
}
