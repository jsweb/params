import set from 'lodash/set'
import { objectToFormData } from 'object-to-formdata'

/**
 * Transform an object to HTTP query string.
 * Returns a query string suitable for use in URL.
 * Does not include the question mark.
 *
 * @export Function
 * @param {Object} input
 * @returns {String} String
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
    const result = decodeURIComponent(qs)

    return result
  }

  return iterate(input)
}

/**
 * Transform HTTP query string to literal object.
 *
 * @export Function
 * @param {String} input
 * @returns {Object} Object
 */
export function parse(input = '') {
  const data = {}
  const params = new URLSearchParams(input)

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
 * @export Function
 * @param {*} input
 * @returns {*} *
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
