/* global describe,it */

const assert = require('assert');
const createDefaultBtn = require('./create_default_btn');

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
  purchaseLink: 'https://example.com'
};
let html = createDefaultBtn(product1, options1);

describe('create standalone checkout button', function () {
  it('should has default fallback with quantity of 1 ', function () {
    assert.strictEqual(true, !!html.match(/_1/));

  });
  it('should has default fallback with first variant selected', function () {
    assert.strictEqual(true, !!html.match(/123_/));
  });
  it('should include correct pNum for css class name', function (){
    assert.strictEqual(true, !!html.match(/data-amp-bind-hidden="!!cart\.p5_btn_loaded"/));
  });
  it('should include correct purchase link', function () {
    assert.strictEqual(true, !!html.match(/https:\/\/example\.com/));
  });
  it('should include correct token', function () {
    assert.strictEqual(true, !!html.match(/xyz/));
  });
});
