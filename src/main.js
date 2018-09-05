export default function (value) {
  return {
    get value () {
      return value
    },

    serialize(obj, pre) {
      const { value } = this
      const keys = Object.keys(obj || value)
      const pairs = keys.map(k => {
        const key = pre ? `${pre}['${k}']` : k
        const ant = pre ? pre.replace(/\[\'/g, '.').replace(/\'\]/g, '') : k
        const path = pre ? `${ant}.${k}` : k
        const item = path.split('.').reduce((a, i) => a[i], value)
        const deep = item instanceof Object

        return deep ? this.serialize(item, key) : [key, item].join('=')
      })

      return pairs.join('&').replace(/\'/g, '')
    },

    parse () {
      const data = {}
      const { value } = this
      const query = value.startsWith('?') ? value.substr(1) : value
      const pairs = query.replace(/(;+|&+)/g, '&').split('&')

      pairs.forEach(pair => {
        let [k, v] = pair.split('=').map(decodeURIComponent)

        if (!k) return 0

        v = !v ? null : !isNaN(v) ? new Number(v).valueOf() : v

        if (!k.includes('['))
          return data[k] = !data.hasOwnProperty(k) ?
            v : Array.isArray(data[k]) ?
            data[k].push(v) : [data[k], v]

        let [o, t] = k.split('['),
          key = t ? t.replace(']', '') : 0,
          arr = !isNaN(key),
          pos = !key ? 0 : arr ? parseInt(key) : key

        data[o] = data.hasOwnProperty(o) ? data[o] : arr ? [] : {}

        return !pos ? data[o].push(v) : data[o][pos] = v
      })

      return data
    },

    form () {
      let { value } = this

      if (typeof FormData === 'undefined')
        return console.error('FormData not supported')

      if (value instanceof FormData)
        return value

      if (typeof HTMLFormElement !== 'undefined')
        if (value instanceof HTMLFormElement)
          return new FormData(value)

      if (typeof value === 'string')
        value = this.parse()

      const form = new FormData

      try {
        Object.keys(value).forEach(k => {
          form.append(k, value[k])
        })
      } catch (e) {
        console.error(e.message)
      }

      return form
    }
  }
}
