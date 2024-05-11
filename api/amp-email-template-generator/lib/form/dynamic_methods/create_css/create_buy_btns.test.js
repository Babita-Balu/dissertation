/* global describe,it */

const assert = require('assert');
const createBuyBtns = require('./create_buy_btns');

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
describe('create buy btns', function () {
  it('should return correct css for a product', function () {
    let css = createBuyBtns(mockProduct);
    let expectedRes = '#p3-opt1-1:checked~div #p3-opt1-1-btn,#p3-opt1-2:checked~div #p3-opt1-2-btn,#p3-opt1-3:checked~div #p3-opt1-3-btn { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return correct css when option number changes', function () {
    let css = createBuyBtns(mockProduct, {optionIndex:2});
    let expectedRes = '#p3-opt2-1:checked~div #p3-opt2-1-btn,#p3-opt2-2:checked~div #p3-opt2-2-btn,#p3-opt2-3:checked~div #p3-opt2-3-btn { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return correct css when product number changes', function () {
    mockProduct.pNum = 4;
    let css = createBuyBtns(mockProduct, {optionIndex:2});
    let expectedRes = '#p4-opt2-1:checked~div #p4-opt2-1-btn,#p4-opt2-2:checked~div #p4-opt2-2-btn,#p4-opt2-3:checked~div #p4-opt2-3-btn { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return correct css when product has less options', function () {
    mockProduct.pNum = 4;
    mockProduct.variants = mockProduct.variants.slice(0,2);
    let css = createBuyBtns(mockProduct, {optionIndex:2});
    let expectedRes = '#p4-opt2-1:checked~div #p4-opt2-1-btn,#p4-opt2-2:checked~div #p4-opt2-2-btn { display: block; }';
    assert.strictEqual(css,expectedRes);
  });
});
