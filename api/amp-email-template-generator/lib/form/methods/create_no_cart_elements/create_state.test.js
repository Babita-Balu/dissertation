/* global describe,it */

const assert = require('assert');
const createLoadedState = require('./create_state');
let product  = {pNum: 2, variants: [{id: '123'}]};
let html = createLoadedState(product);


describe('create product loaded states', function () {
  it('should return correct state', function () {
    assert.strictEqual(html.trim(),'"p2_btn_loaded": false,\n "p2": "123",');
  });
});
