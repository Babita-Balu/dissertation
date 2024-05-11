/* global describe,it */

const assert = require('assert');
const createSwatchLabels = require('./create_swatch_labels');

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

describe('create swatch labels', function () {
  it('should return correct images for the labels', function () {
    let html = createSwatchLabels(products);
    let test = !!html.match(/<img src="123">.*<img src="456">/);
    assert.strictEqual(test, true);
  });
  it('should return correct ids for the labels', function () {
    let html = createSwatchLabels(products);
    let test = !!html.match(/p5-swatch-la".*p6-swatch-la"/);
    assert.strictEqual(test, true);
  });
  it('should return correct "for" attribute for the labels', function () {
    let html = createSwatchLabels(products);
    let test = !!html.match(/p5-swatch".*p6-swatch"/);
    assert.strictEqual(test, true);
  });
});
