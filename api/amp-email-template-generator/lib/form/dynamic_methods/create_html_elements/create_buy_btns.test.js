/* global describe,it */

const assert = require('assert');
const createHtml = require('./create_buy_btns');
const product = {
  title: 'test123',
  images: [
    {src: 'xxx'}
  ],
  variants: [
    {
      id: 4
    },
    {
      id: 5
    },
  ],
  token: '123',
  pNum: 5,
};

describe('create buy buttons', function () {
  it('should create all links for each variant', function () {
    let html = createHtml(product, {token: 123, purchaseLink: 'https://example.com'});
    let test = !!html.match(/(https:\/\/example\.com\?variant_id=4&token=123)/);
    let test2 = !!html.match(/(https:\/\/example\.com\?variant_id=5&token=123)/);
    assert.strictEqual(test, true);
    assert.strictEqual(test2, true);
  });
});
