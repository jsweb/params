import set from 'lodash/set'
import { serialize as objectToFormData } from 'object-to-formdata'

/**
 * Transforms an object to HTTP query string.
 * Returns a query string suitable for use in URL.
 * Does not include the question mark.
 *
 * @export Function
 * @param {Record<string, any>} input
 * @returns {String} String
 */
export function serialize(input: Record<string, any> = {}): string {
  const params = new URLSearchParams()

  const iterate = (obj: Record<string, any>, pre?: string) => {
    const keys = Object.keys(obj)

    keys.forEach((k) => {
      const param = obj[k]

      if (param === null || param === undefined) return null

      const key = pre ? `${pre}[${k}]` : k

      if (typeof param === 'object') return iterate(param, key)

      const val = Number.isFinite(param) ? param.toString() : param

      return val && params.set(key, val)
    })

    const qs = params.toString()
    const result = decodeURIComponent(qs)

    return result
  }

  return iterate(input)
}

/**
 * Transforms URL query string to an object.
 *
 * @export Function
 * @param {String} input
 * @returns {Record<string, any>} Object
 */
export function parse(input: string = ''): Record<string, any> {
  const data: Record<string, any> = {}
  const params = new URLSearchParams(input)

  Array.from(params.entries()).forEach(([key, val]) => {
    const value = !val ? null : /^\d+$/.test(val) ? Number(val) : val

    if (!key.includes('[')) return (data[key] = value)

    const path = key.replace(/\]/g, '').split('[')

    return set(data, path, value)
  })

  return data
}

/**
 * Transforms query string or object into FormData.
 *
 * @export Function
 * @param {*} input
 * @returns {*} *
 */
export function form(input: any): any {
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
