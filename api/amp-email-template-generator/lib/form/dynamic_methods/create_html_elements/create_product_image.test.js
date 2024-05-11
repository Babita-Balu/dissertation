/* global describe,it */

const assert = require('assert');
const createProductImage = require('./create_product_image');
const product = {
  title: 'test123',
  images: [
    {src: 'xxx'}
  ]
};

describe('create product image html', function () {
  it('should return correct image', function () {
    let html = createProductImage(product);
    assert.strictEqual(html, '<div class="pd-img"><img src="xxx" /></div>');
  });
});
