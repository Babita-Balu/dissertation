/* global describe,it */

const assert = require('assert');
const createActiveOptionLabels = require('./carete_active_option_labels');

const mockProduct = {
  pNum: 3,
  variants: [
    {
      option1: 'Large'
    },
    {
      option1: 'Small'
    },
    {
      option1: 'Middle'
    },
  ]
};
const mockProduct2 = {
  pNum: 3,
  variants: [
    {
      option1: 'Large'
    },
    {
      option1: 'Small'
    },
  ]
};

describe('create active label css', function () {
  it('should return correct css for a product', function () {
    let css = createActiveOptionLabels(mockProduct);
    let expectedRes = '#p3-opt1-1:checked~div #p3-opt1-1-la,#p3-opt1-2:checked~div #p3-opt1-2-la,#p3-opt1-3:checked~div #p3-opt1-3-la { border-bottom: 1px solid #aaa; }';
    assert.strictEqual(css,expectedRes);
  });
  it('should return less css for a smaller product', function () {
    let css = createActiveOptionLabels(mockProduct2);
    let expectedRes = '#p3-opt1-1:checked~div #p3-opt1-1-la,#p3-opt1-2:checked~div #p3-opt1-2-la { border-bottom: 1px solid #aaa; }';
    assert.strictEqual(css,expectedRes);
  });
});
