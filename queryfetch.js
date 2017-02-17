class QueryFetch {
	constructor(arg) {
		this.src = arg
	}

	serialize(obj, pre) {
		let keys = Object.keys(obj || this.src),
			pairs = keys.map(k => {
				let item = this.src[k],
					p = pre ? `${pre}[${k}]` : k
				return item instanceof Object ? this.serialize(item, p) : [p, item].map(encodeURIComponent).join('=')
			})
		return pairs.join('&')
	}

	parse() {
		let data = {},
			query = this.src.startsWith('?') ? this.src.substr(1) : this.src,
			pairs = query.replace(/(;+|&+)/g, '&').split('&')

		pairs.forEach(pair => {
			let [k, v] = pair.split('=').map(decodeURIComponent)

			if (!k)
				return 0

			v = !v ? null : !isNaN(v) ? new Number(v).valueOf() : v

			if (!k.includes('['))
				return data[k] = !data.hasOwnProperty(k) ? v : Array.isArray(data[k]) ? data[k].push(v) : [data[k], v]

			let [o, t] = k.split('['),
				key = t ? t.replace(']', '') : 0,
				arr = !isNaN(key),
				pos = !key ? 0 : arr ? parseInt(key) : key

			data[o] = data.hasOwnProperty(o) ? data[o] : arr ? [] : {}

			return !pos ? data[o].push(v) : data[o][pos] = v
		})

		return data
	}

	form() {
		if (typeof FormData === 'undefined')
			return console.error('FormData not supported')

		if (this.src instanceof FormData)
			return this.src

		if (typeof HTMLFormElement !== 'undefined')
			if (this.src instanceof HTMLFormElement)
				return new FormData(this.src)

		if (this.src instanceof Object) {
			let form = new FormData
			try {
				for (let k in this.src)
					if (this.src.hasOwnProperty(k))
						form.append(k, this.src[k])
			} catch (e) {
				console.error(e.message)
			}
			return form
		}

		return this.src
	}
}

export default function (src) {
	return new QueryFetch(src)
}
