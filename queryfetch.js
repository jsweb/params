let queryfetch = {}

queryfetch.serialize = (obj, pre) => {
	let keys = Object.keys(obj),
		pairs = keys.map(k => {
			let item = obj[k],
				p = pre ? `${pre}[${k}]` : k

			return item instanceof Object ?
				queryfetch.serialize(item, p) : [p, item].map(encodeURIComponent).join('=')
		})
	return pairs.join('&')
}

queryfetch.parse = qs => {
	let data = {},
		query = qs.startsWith('?') ? qs.substr(1) : qs,
		pairs = query.replace(/(;+|&+)/g, '&').split('&')

	pairs.forEach(pair => {
		let [k, v] = pair.split('=').map(decodeURIComponent)

		if (!k)
			return 0

		v = !v ? null : !isNaN(v) ? new Number(v).valueOf() : v

		if (!k.includes('['))
			return data[k] = !data.hasOwnProperty(k) ? v :
				Array.isArray(data[k]) ? data[k].push(v) : [data[k], v]

		let [o, t] = k.split('['),
			key = t ? t.replace(']', '') : 0,
			arr = !isNaN(key),
			pos = !key ? 0 : arr ? parseInt(key) : key

		data[o] = data.hasOwnProperty(o) ? data[o] : arr ? [] : {}

		return !pos ? data[o].push(v) : data[o][pos] = v
	})

	return data
}

queryfetch.form = o => {
	if (typeof FormData === 'undefined')
		return console.error('FormData not supported')

	if (o instanceof FormData)
		return o

	if (typeof HTMLFormElement !== 'undefined')
		if (o instanceof HTMLFormElement)
			return new FormData(o)

	if (o instanceof Object) {
		let form = new FormData
		try {
			for (let k in o)
				if (o.hasOwnProperty(k))
					form.append(k, o[k])
		} catch (e) {
			console.error(e.message)
		}
		return form
	}

    if (typeof o === 'string')
        return o
    
    return null
}

export default queryfetch
