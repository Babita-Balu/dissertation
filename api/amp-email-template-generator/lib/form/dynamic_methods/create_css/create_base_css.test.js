/* global describe,it */

const assert = require('assert');
const createBaseCss = require('./create_base_css');

describe('create base css', function () {
  it('should return css', function () {
    let css = createBaseCss();
    let test = !!css;
    assert.strictEqual(test,true);
  });
});
