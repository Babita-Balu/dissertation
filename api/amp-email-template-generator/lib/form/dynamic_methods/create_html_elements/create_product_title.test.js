/* global describe,it */

const assert = require('assert');
const createProductTitle = require('./create_product_title');
const product = {
  title: 'test123',
  url : 'https://example.com'
};

describe('create product title html', function () {
  it('should return correct title', function () {
    let html = createProductTitle(product);
    assert.strictEqual(html, '<div class="mt1 mb1 sk-center sk-txt1"><a href="https://example.com">test123</a></div>');
  });
});
