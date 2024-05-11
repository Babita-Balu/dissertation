/* global describe,it */

const assert = require('assert');
const createHtml = require('./create_dynamic_fallback_switch');

describe('create dynamic fallback switch', function () {
  it('should return correct html', function () {
    let html = createHtml();
    assert.strictEqual(html, '<input type="radio" checked id="dynamic-switch-1" style="display: none">');
  });
});
