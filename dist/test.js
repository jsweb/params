'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var assert = require('assert');
var params = _interopDefault(require('./params'));

const qobj = { a: 1, b: 2, c: 3 };
const qstr = 'a=1&b=2&c=3';

global.FormData = class FormData {
  constructor() {
    this.data = {};
  }
  append(k, v) {
    this.data[k] = v;
  }
};

describe('@jsweb/params', () => {
  it('import should return a function', () => {
    assert.equal(params instanceof Function, true);
  });

  it('instance should return an object', () => {
    const test = params(qstr);
    assert.equal(typeof test === 'object', true);
  });

  it('instance should accept an argument to store as value property', () => {
    const test = params(qstr);
    assert.equal(test.value, qstr);
  });

  describe('params(obj).serialize()', () => {
    it('should join an object into a query string', () => {
      const test = params(qobj).serialize();
      assert.equal(test, qstr);
    });
  });

  describe('params(qstr).parse()', () => {
    it('should split a query string to object', () => {
      const test = params(qstr).parse();
      assert.deepEqual(test, qobj);
    });
  });

  describe('params(data).form()', () => {
    it('should transform params string or object into FormData', () => {
      const t1 = params(qstr).form();
      const t2 = params(qobj).form();
      assert.equal(t1 instanceof FormData, true);
      assert.equal(t2 instanceof FormData, true);
      assert.deepEqual(t1.data, qobj);
      assert.deepEqual(t2.data, qobj);
    });
  });
});
