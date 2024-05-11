/* global describe,it */

const assert = require('assert');
const createPrices = require('./create_prices');

const product = {
  pNum: 3,
  variants: [
    {price: 99},
    {price: 89}
  ]
};

describe('create prices', function () {
  it('should return correct prices', function () {
    let html = createPrices(product);
    let lines = html.split(/\n/).map(l=>l.trim()).filter(l=>!!l);
    assert.strictEqual(lines[0], '<div class="mt1 mb1 sk-hide sk-center sk-txt2" id="p3-price1">&#36;99.00</div>');
    assert.strictEqual(lines[1], '<div class="mt1 mb1 sk-hide sk-center sk-txt2" id="p3-price2">&#36;89.00</div>');
  });

});
