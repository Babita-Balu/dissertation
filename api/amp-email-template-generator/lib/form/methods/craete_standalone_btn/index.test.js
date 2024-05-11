/* global describe,it */

const assert = require('assert');
const createStandaloneBtn = require('./');

const product1 =   {
  pNum: 5,
  swatch: {
    image: {
      src: '123'
    }
  },
  variants: [
    {id: 123, price: 99},
    {id: 456, price: 89}
  ],
};
const options1 = {
  token: 'xyz',
  purchaseLink: 'https://example.com',
  apiRoot: 'https://api.example.com'
};

let html = createStandaloneBtn(product1, options1);

describe('create standalone checkout button', function () {
  it('should wrap the elements with div with css class', function () {
    assert.strictEqual(true, !!html.match(/<div class="sk-no-cart-checkout">.*?<\/div>/s));
  });
});
