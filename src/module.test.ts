import {
  deepStrictEqual as deepEqual,
  strictEqual as equal,
} from 'assert';
import { form, parse, serialize } from './module';

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
  it('serialize(input) should join an object into a query string', () => {
    const test = serialize(qobj);
    equal(test, qstr);
  });

  it('parse(string) should split a query string to object', () => {
    const test = parse(qstr);
    deepEqual(test, qobj);
  });

  it('form(input) should transform query string or object into FormData', () => {
    const t1 = form(qstr);
    const t2 = form(qobj);
    equal(t1 instanceof FormData, true);
    equal(t2 instanceof FormData, true);
  });
});
