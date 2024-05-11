/* global describe,it */

const assert = require('assert');
const createSwatchInputs = require('./create_swatch_inputs');

const products = [
  {
    pNum: 5,
    swatch: {
      image: {
        src: '123'
      }
    }
  },
  {
    pNum: 6,
    swatch: {
      image: {
        src: '456'
      }
    }
  }
];

describe('create swatch inputs', function () {
  it('should have first input checked by default', function () {
    let html = createSwatchInputs(products);
    let test = !!html.match(/id="p5-swatch" checked/);
    assert.strictEqual(test, true);
  });
  it('should create second inputs as well', function () {
    let html = createSwatchInputs(products);
    let test = !!html.match(/input name="g1-swatch" type="radio" id="p6-swatch"/);
    assert.strictEqual(test, true);
  });
  it('should have second input NOT checked by default', function () {
    let html = createSwatchInputs(products);
    let test = !!html.match(/id="p6-swatch" checked/);
    assert.strictEqual(test, false);
  });
});
