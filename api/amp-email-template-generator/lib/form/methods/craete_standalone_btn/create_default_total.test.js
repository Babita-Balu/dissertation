/* global describe,it */

const assert = require('assert');
const createDefaultTotal = require('./create_default_total');
const product1 =   {
  pNum: 5,
  swatch: {
    image: {
      src: '123'
    }
  },
  variants: [
    {id: 123, price: 99},
    {id: 456, price: 88},
  ],
};
let html = createDefaultTotal(product1);

describe('create default total for each product', function () {
  it('should return correct total for 1 quantity of first variant', function () {
    assert.strictEqual(true, !!html.match(/99\.00/));

  });
  it('should include correct pNum for css class name', function (){
    assert.strictEqual(true, !!html.match(/data-amp-bind-hidden="!!cart\.p5_btn_loaded"/));
  });

});
