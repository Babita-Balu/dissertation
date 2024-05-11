/* global describe,it */

const assert = require('assert');
const createHtml = require('./create_option_labels');
const product = {
  pNum: 3,
  variants: [
    {price: 99, option1: 'large'},
    {price: 89, option1: 'small'}
  ]
};

describe('create swatch labels', function () {
  it('should return correct html for option buttons', function () {
    let html = createHtml(product);
    let test = !!html.match(/<label class="sk-btn opt-btn" id="p3-opt1-1-la" for="p3-opt1-1">large<\/label>/);
    let test2 = !!html.match(/<label class="sk-btn opt-btn" id="p3-opt1-2-la" for="p3-opt1-2">small<\/label>/);
    assert.strictEqual(test, true);
    assert.strictEqual(test2, true);
  });

});