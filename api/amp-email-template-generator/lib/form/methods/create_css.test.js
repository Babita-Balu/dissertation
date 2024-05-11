/* global describe,it */

const assert = require('assert');
const createCss = require('./create_css');



describe('create css', function () {
  it('should include opening and closings comments', function () {
    let html = createCss({});
    let find = !!html.match(/\/\*START OF SKIPIFY SHOPPABLE CSS\*\//);
    let find2 = !!html.match(/\/\*END OF SKIPIFY SHOPPABLE CSS\*\//);
    assert.strictEqual(find, true);
    assert.strictEqual(find2, true);
  });
  it('should include custom css if provided', function () {
    let html = createCss({customAmpCss: '123abc'});
    let find = !!html.match(/123abc/);
    assert.strictEqual(find, true);
  });
  it('should include buyButtonTextColor if provided', function () {
    let html = createCss({buyButtonTextColor: '456abc'});
    let find = !!html.match(/color: 456abc/);
    assert.strictEqual(find, true);
  });
  it('should include buyButtonBgColor if provided', function () {
    let html = createCss({buyButtonBgColor: '789abc'});
    let find = !!html.match(/background: 789abc/);
    assert.strictEqual(find, true);
  });
});
