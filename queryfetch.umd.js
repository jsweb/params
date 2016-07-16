(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('queryfetch', factory) :
	(global.queryfetch = factory());
}(this, function () { 'use strict';

	var queryfetch = {}

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
		var query = qs.startsWith('?') ? qs.substr(1) : qs,
			data = {}

		query.replace(/(;+|&+)/g, '&').split('&').forEach(function (pair) {
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