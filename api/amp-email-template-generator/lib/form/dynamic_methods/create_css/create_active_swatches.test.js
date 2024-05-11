/* global describe,it */

const assert = require('assert');
const createActiveSwatches = require('./create_active_swatches');
const products = [
  {
    pNum: 1,
  },
  {
    pNum: 2,
  }
];

describe('create active swatches css', function () {
  it('should return css for highlight active swatch', function () {
    let css = createActiveSwatches(products);
    let lines = css.split('\n');
    assert.strictEqual(lines[0].trim(), '#p1-swatch:checked~div #p1-swatch-la,#p2-swatch:checked~div #p2-swatch-la {     border-bottom: 1px solid #aaa;  }');

  });
  it('should return css for show and hide product parts', function () {
    let css = createActiveSwatches(products);
    let lines = css.split('\n');
    assert.strictEqual(lines[1].trim(),'#p1-swatch:checked~div .p1-part,#p2-swatch:checked~div .p2-part { display: block; }');
  });
});
