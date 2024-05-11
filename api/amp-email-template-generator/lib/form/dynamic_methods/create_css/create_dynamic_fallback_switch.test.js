/* global describe,it */

const assert = require('assert');
const createDynamicFallbackSwitch = require('./create_dynamic_fallback_switch');

describe('create dynamic fallback blocks switch', function () {
  it('should create correct css', function () {
    let expected = `
#dynamic-switch-2:checked~.dynamic {
display: block !important;
}

#dynamic-switch-2:checked~.fallback {
display: none !important;
}
`;
    let css = createDynamicFallbackSwitch(2);
    assert.strictEqual(expected, css);
  });
});
