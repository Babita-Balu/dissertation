/* global describe,it */

const assert = require('assert');
const createDynamicBtn = require('./create_dynamic_btn');
const product1 =   {
  pNum: 5,
  swatch: {
    image: {
      src: '123'
    }
  },
  variants: [
    {id: 123},
    {id: 456}
  ],
};
const options1 = {
  token: 'xyz',
  purchaseLink: 'https://example.com',
  apiRoot: 'https://api.example.com'
};
let html = createDynamicBtn(product1, options1);

describe('create dynamic standalone button for each product', function () {
  it('should include correct inputs', function () {
    assert.strictEqual(true, !!html.match(/<input hidden name="p5" data-amp-bind-value="cart\.p5"/));
    assert.strictEqual(true, !!html.match(/<input hidden type="number" name="p5_qty" data-amp-bind-value="cart\.p5_qty"/));
    assert.strictEqual(true, !!html.match(/<input hidden name="token" value="xyz"/));
    assert.strictEqual(true, !!html.match(/<input hidden name="t" value="tracking"/));
    assert.strictEqual(true, !!html.match(/<input hidden name="purchase_link" value="https:\/\/example\.com"/));
  });
  it('should create correct xhr url', function () {
    assert.strictEqual(true, !!html.match(/action-xhr="https:\/\/api\.example\.com\/link_checkouts\/email_form\/xyz"/));
  });
});
