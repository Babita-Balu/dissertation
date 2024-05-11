/* global describe,it */

const assert = require('assert');
const createHtml = require('./create_option_inputs');
const product = {
  pNum: 3,
  variants: [
    {price: 99},
    {price: 89}
  ]
};

describe('create option inputs', function () {
  it('should has first radio button checked', function () {
    let html = createHtml(product);
    let test = !!html.match(/id="p3-opt1-1" checked/);
    assert.strictEqual(test, true);
  });
  it('should has not second radio button checked', function () {
    let html = createHtml(product);
    let test = !!html.match(/id="p3-opt1-2" checked/);
    assert.strictEqual(test, false);
  });
});
