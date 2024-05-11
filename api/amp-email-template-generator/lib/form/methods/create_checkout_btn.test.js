/* global describe,it */

const assert = require('assert');
const createCheckoutBtn = require('./create_checkout_btn');

describe('create checkout button', function () {
  it('should have item counter if quantityStyle is default', function () {
    let html = createCheckoutBtn({},{});
    let find = !!html.match(/>items</);
    assert.strictEqual(find, true);
  });
  it('should have no item counter if quantityStyle is set to dropdown', function () {
    let html = createCheckoutBtn({},{quantityStyle:'dropdown'});
    let find = !!html.match(/>items</);
    assert.strictEqual(find, false);
  });
  it ('should hide dynamic checkout button when quantity is 1 and cartLayout is minimal', function (){
    let html = createCheckoutBtn({},{cartLayout: 'minimal'});
    let find  = !!html.match(/data-amp-bind-class='\(cart\.size < 1 \? "show":"hide"\)/);
    assert.strictEqual(find, true);
  });
});
