import { strict } from 'assert';
import params from './main';

const { deepEqual, equal } = strict;
const qobj = { a: 1, b: 2, c: 3 };
const qstr = 'a=1&b=2&c=3';

class FormData {
  private data: any = {};
  public append(k: string, v: any) {
    this.data[k] = v;
  }
}

Object.defineProperty(global, 'FormData', { value: FormData });

describe('@jsweb/params', () => {
  it('import should return a function', () => {
    equal(params instanceof Function, true);
  });

  it('instance should return an object', () => {
    const test = params(qstr);
    equal(typeof test, 'object');
  });

  it('instance should accept an argument to store as value property', () => {
    const test = params(qstr);
    equal(test.value, qstr);
  });

  describe('params(obj).serialize()', () => {
    it('should join an object into a query string', () => {
      const test = params(qobj).serialize();
      equal(test, qstr);
    });
  });

  describe('params(qstr).parse()', () => {
    it('should split a query string to object', () => {
      const test = params(qstr).parse();
      deepEqual(test, qobj);
    });
  });

  describe('params(data).form()', () => {
    it('should transform params string or object into FormData', () => {
      const t1 = params(qstr).form();
      const t2 = params(qobj).form();
      equal(t1 instanceof FormData, true);
      equal(t2 instanceof FormData, true);
      deepEqual(t1.data, qobj);
      deepEqual(t2.data, qobj);
    });
  });
});
