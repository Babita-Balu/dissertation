/* global describe,it */

const assert = require('assert');
const createPrices = require('./create_prices');

const mockProduct = {
  pNum: 3,
  variants: [
    {
      price: 11,
      option1: 'Large'
    },
    {
      price: 22,
      option1: 'Small'
    },
    {
      price:33,
      option1: 'Middle'
    },
  ]
};
describe('create price css', function () {
  it('should return correct css for a product', function () {
    let css = createPrices(mockProduct);
    let expectedRes = '#p3-opt1-1:checked~div #p3-price1,#p3-opt1-2:checked~div #p3-price2,#p3-opt1-3:checked~div #p3-price3 { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return correct css when option number changes', function () {
    let css = createPrices(mockProduct, {optionIndex:2});
    let expectedRes = '#p3-opt2-1:checked~div #p3-price1,#p3-opt2-2:checked~div #p3-price2,#p3-opt2-3:checked~div #p3-price3 { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return correct css when product number changes', function () {
    mockProduct.pNum = 4;
    let css = createPrices(mockProduct, {optionIndex:2});
    let expectedRes = '#p4-opt2-1:checked~div #p4-price1,#p4-opt2-2:checked~div #p4-price2,#p4-opt2-3:checked~div #p4-price3 { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return correct css when product has less options', function () {
    mockProduct.pNum = 4;
    mockProduct.variants = mockProduct.variants.slice(0,2);
    let css = createPrices(mockProduct, {optionIndex:2});
    let expectedRes = '#p4-opt2-1:checked~div #p4-price1,#p4-opt2-2:checked~div #p4-price2 { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
});
