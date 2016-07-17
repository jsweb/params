(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('queryfetch', factory) :
	(global.queryfetch = factory());
}(this, function () { 'use strict';

	var queryfetch = {}

	queryfetch.form = function (o) {
		if (typeof FormData === 'undefined')
			return console.error('FormData not supported')

		if (o instanceof FormData)
			return o

		if (typeof HTMLFormElement !== 'undefined')
			if (o instanceof HTMLFormElement)
				return new FormData(o)

		if (o instanceof Object) {
			var form = new FormData
			try {
				for (var k in o)
					if (o.hasOwnProperty(k))
						form.append(k, o[k])
			} catch (e) {
				console.error(e.message)
			}
			return form
		}

	}

	queryfetch.serialize = function (obj, pre) {
		var keys = Object.keys(obj),
			pairs = keys.map(function (k) {
				var item = obj[k],
					p = pre ? (pre + "[" + k + "]") : k

				return item instanceof Object ?
					queryfetch.serialize(item, p) : [p, item].map(encodeURIComponent).join('=')
			})
		return pairs.join('&')
	}

	queryfetch.parse = function (qs) {
		var data = {},
			query = qs.startsWith('?') ? qs.substr(1) : qs,
			pairs = query.replace(/(;+|&+)/g, '&').split('&')

		pairs.forEach(function (pair) {
			var ref = pair.split('=').map(decodeURIComponent);
			var k = ref[0];
			var v = ref[1];

			if (!k)
				return 0

			v = !v ? null : !isNaN(v) ? new Number(v).valueOf() : v

			if (!k.includes('['))
				return data[k] = !data.hasOwnProperty(k) ? v :
					Array.isArray(data[k]) ? data[k].push(v) : [data[k], v]

			var ref$1 = k.split('[');
			var o = ref$1[0];
			var t = ref$1[1];
			var key = t ? t.replace(']', '') : 0,
				arr = !isNaN(key),
				pos = !key ? 0 : arr ? parseInt(key) : key

			data[o] = data.hasOwnProperty(o) ? data[o] : arr ? [] : {}

			return !pos ? data[o].push(v) : data[o][pos] = v
		})

		return data
	}

	return queryfetch;

}));