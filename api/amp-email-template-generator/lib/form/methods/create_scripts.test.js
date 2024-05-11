/* global describe,it */

const assert = require('assert');
const createScripts = require('./create_scripts');

describe('create scripts', function () {
  it('should not include carousel script if is set to false', function () {
    let html = createScripts({useCarousel: false});
    let html2 = createScripts({useCarousel: true});
    let find = !!html.match(/carousel/);
    let find2 = !!html2.match(/carousel/);
    assert.strictEqual(find, false);
    assert.strictEqual(find2, true);
  });
  it('should not include amp-list script if is set to false', function () {
    let html = createScripts({useAMPList: false});
    let html2 = createScripts({useAMPList: true});
    let find = !!html.match(/amp-list/);
    let find2 = !!html2.match(/amp-list/);
    assert.strictEqual(find, false);
    assert.strictEqual(find2, true);
  });
});
