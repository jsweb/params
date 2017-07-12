const qf = require('../queryfetch'),
    assert = require('assert'),
    str = qf('a=1&b=2&c=3'),
    obj = qf({ a: 1, b: 2, c: 3 })

describe('queryfetch', () => {
    describe('obj.serialize()', () => {
        it('serializes a literal Object to a querystring', () => {
            const s = obj.serialize()
            assert.equal('string', typeof s)
            assert.equal('a=1&b=2&c=3', s)
        })
    })
    describe('str.parse()', () => {
        it('converts a querystring to a literal Object', () => {
            const o = str.parse()
            assert.equal(true, o instanceof Object)
            assert.equal(3, Object.keys(o).length)
            assert.equal(3, Object.values(o).length)
            assert.equal(1, o.a)
            assert.equal(2, o.b)
            assert.equal(3, o.c)
        })
    })
})