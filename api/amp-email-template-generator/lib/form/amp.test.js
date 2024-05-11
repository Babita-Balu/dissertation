/* global describe,it */

const assert = require('assert');
const getAmp = require('./amp');
const amphtmlValidator = require('amphtml-validator');
const defaultOptions = require('../../test-data/default-options');

let data = {
  products: [
    {
      pNum:1,
      id: '1', images: [
        {src:'https://example.com/1.png'}
      ],
      variants: [
        {
          id: 'x1',
          price: 99.99,
        },
      ]
    },
    {
      pNum:2,
      id: '2', images: [
        {src:'https://example.com/2.png'}
      ],
      variants: [
        {
          id: 'x2',
          option1: 'size 3',
          price: 99.99,
        },
        {
          id: 'x3',
          option1: 'size 2',
          price: 99.99,
        },
      ]
    },
  ],
  token: 'xyz',
};

describe('getAmp', function () {
  it('should creates valid AMP', async function () {
    let amp = getAmp(data, {...defaultOptions, useCarousel: false});
    let validator = await amphtmlValidator.getInstance();
    let result = validator.validateString(amp, 'AMP4EMAIL');
    assert.strictEqual(result.status, 'PASS');
  });
  it('should creates valid AMP when cartLayout is set to "none"', async function () {
    let amp = getAmp(data, {...defaultOptions, cartLayout: 'none', useCarousel: false});
    let validator = await amphtmlValidator.getInstance();
    let result = validator.validateString(amp, 'AMP4EMAIL');
    assert.strictEqual(result.status, 'PASS');
  });
  it('should not contain any [property] syntax bindings', async function () {
    let amp = getAmp(data, defaultOptions);
    let invalids = amp.match(/\[.*]=/);
    assert.strictEqual(null, invalids);
  });
  it('should not contain any [property] syntax bindings', async function () {
    let amp = getAmp(data, defaultOptions);
    let invalids = amp.match(/\[.*]=/);
    assert.strictEqual(null, invalids);
  });
  it('should allow custom buy button text', function () {
    let amp = getAmp(data, {...defaultOptions, buyButtonText: 'test text'});
    assert.strictEqual(true, !!amp.match('test text'));
  });
  it('should allow custom dropdown text', function () {
    let amp = getAmp(data, {...defaultOptions, dropdownText: 'select an option'});
    assert.strictEqual(true, !!amp.match('>select an option</option>'));
  });
  it('should allow custom dropdown height', function () {
    let amp = getAmp(data, {...defaultOptions, dropdownHeight: 70});
    assert.strictEqual(true, !!amp.match('<amp-list width="auto" height="70"'));
  });
});
