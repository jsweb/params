/**
 * Transform an object to HTTP query string.
 *
 * @export {function}
 * @param {(any[] | { [x: string]: any } | { [x: number]: any })} input
 * @returns {string}
 * @example
 * import { serialize } from '@jsweb/params'
 *
 * const query = serialize({ a: 1, b: 2, c: 3 })  // returns 'a=1&b=2&c=3'
 */
export function serialize(input: any[] | { [x: string]: any } | { [x: number]: any }): string {
  const iterate = (obj?: any, pre?: string) => {
    const keys = Object.keys(obj || input);
    const pairs: string[] = keys.map((k) => {
      const key = pre ? `${pre}['${k}']` : k;
      const ant = pre ? pre.replace(/\[\'/g, '.').replace(/\'\]/g, '') : k;
      const path = pre ? `${ant}.${k}` : k;
      const item = path.split('.').reduce((a: any, i) => a[i], input);
      const deep = item instanceof Object;

      return deep ? iterate(item, key) : [key, item].join('=');
    });

    return pairs.join('&').replace(/\'/g, '');
  };

  return iterate(input);
}

/**
 * Transform an HTTP query string to literal object.
 *
 * @export {function}
 * @param {string} input
 * @returns {*}
 * @example
 * import { parse } from '@jsweb/params'
 *
 * const obj = parse('a=1&b=2&c=3')   // { a: 1, b: 2, c: 3 }
 */
export function parse(input: string): any {
  const data: any = {};
  const query = input.startsWith('?') ? input.substr(1) : input;
  const pairs = query.replace(/(;+|&+)/g, '&').split('&');

  pairs.forEach((pair: string) => {
    const parts = pair.split('=').map(decodeURIComponent);
    const k = parts[0];
    let v: any = parts[1];

    if (!k) {
      return 0;
    }

    v = !v ? null : !isNaN(v) ? Number(v).valueOf() : v;

    if (!k.includes('[')) {
      return data[k] = !data.hasOwnProperty(k) ? v : Array.isArray(data[k]) ? data[k].push(v) : [data[k], v];
    }

    const [o, t] = k.split('[');
    const key = t ? t.replace(']', '') : 0;
    const arr = Number(key);
    const pos = arr ? Math.floor(arr) : key;

    data[o] = data[o] || arr ? [] : {};

    return pos ? data[o][pos] = v : data[o].push(v);
  });

  return data;
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
export function form(input: any): any {
  if (typeof FormData === 'undefined') {
    // tslint:disable-next-line:no-console
    console.error('FormData not supported');
    return input;
  }

  if (input instanceof FormData) {
    return input;
  }

  if (typeof HTMLFormElement !== 'undefined') {
    if (input instanceof HTMLFormElement) {
      return new FormData(input);
    }
  }

  if (typeof input === 'string') {
    input = parse(input);
  }

  const data = new FormData();

  try {
    Object.keys(input).forEach((k) => data.append(k, input[k]));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }

  return data;
}
