export default function params(input: any) {
  return {
    get value() {
      return input;
    },

    serialize(obj?: any, pre?: string) {
      const { value } = this;
      const keys = Object.keys(obj || value);
      const pairs: string[] = keys.map((k) => {
        const key = pre ? `${pre}['${k}']` : k;
        const ant = pre ? pre.replace(/\[\'/g, '.').replace(/\'\]/g, '') : k;
        const path = pre ? `${ant}.${k}` : k;
        const item = path.split('.').reduce((a, i) => a[i], value);
        const deep = item instanceof Object;

        return deep ? this.serialize(item, key) : [key, item].join('=');
      });

      return pairs.join('&').replace(/\'/g, '');
    },

    parse() {
      const data: any = {};
      const { value } = this;
      const query = value.startsWith('?') ? value.substr(1) : value;
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
    },

    form() {
      let { value } = this;

      if (typeof FormData === 'undefined') {
        // tslint:disable-next-line:no-console
        console.error('FormData not supported');
        return ({} as any);
      }

      if (value instanceof FormData) {
        return value;
      }

      if (typeof HTMLFormElement !== 'undefined') {
        if (value instanceof HTMLFormElement) {
          return new FormData(value);
        }
      }

      if (typeof value === 'string') {
        value = this.parse();
      }

      const form = new FormData();

      try {
        Object.keys(value).forEach((k) => form.append(k, value[k]));
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e.message);
      }

      return form;
    },
  };
}
