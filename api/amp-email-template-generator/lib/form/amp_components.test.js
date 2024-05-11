/* global describe,it */

const assert = require('assert');
const getAmpComponents = require('./amp_components');

let data = {
  products: [
    {
      pNum:1,
      id: '1', images: [
        {src:'https://example.com/1.png'}
      ],
      variants: [
        {
          id: 'x1',
          price: 99.99,
        },
      ]
    },
    {
      pNum:2,
      id: '2', images: [
        {src:'https://example.com/1.png'}
      ],
      variants: [
        {
          id: 'x2',
          price: 89.99,
        },
      ]
    },
  ],
  token: 'xyz',
};

let options = {
  purchaseLink: 'https://example.com',
  apiRoot: 'https://api.example.com'
};


describe('getAmpComponents', function () {
  describe('cartLayout: none', function () {
    let ampObject = getAmpComponents(data, {...options, cartLayout:'none'});
    it('should not have cart components when cartLayout is set to "none"', function () {
      assert.strictEqual(ampObject.cart, '');
    });
    it('should not have checkoutButton when cartLayout is set to "none"', function () {
      assert.strictEqual(ampObject.checkoutButton, '');
    });
    it('should a html form for each product', function () {
      assert.strictEqual((ampObject.products.join('').match(/<form/g) || []).length, 2);
    });
  });

});
