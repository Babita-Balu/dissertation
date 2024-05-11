/* global describe,it */

const assert = require('assert');
const createCss = require('./index');


//group of products with swatch
const data = {
  products: [
    [
      {
        pNum: 1,
        swatch: {
          image: {
            src:'123',
          }
        },
        title: 'product 1',
        variants: [
          {option1: 'large', price: '22'},
          {option1: 'small', price: '33'},
        ],
      },

      {
        pNum: 2,
        swatch: {
          image: {
            src:'456',
          }
        },
        title: 'product 2',
        variants: [
          {option1: 'large', price: '22'},
          {option1: 'small', price: '33'},
        ],
      }
    ],
  ]
};

//single product no swatch
const data2 = {
  products: [
    {
      pNum: 1,
      title: 'product 2',
      variants: [
        {price: '22'}
      ],
    },
  ]
};

describe('create css without error', function () {
  it('should create css without error', function () {
    let css = createCss(data, {purchaseLink: 'https://exmaple.com'});
    // should has css and no undefined value
    let test = (!css.match(/undefined/)) && !!css;
    assert.strictEqual(true,test);

  });
  it('should create css without error for single product no swatch', function () {
    let css = createCss(data2, {purchaseLink: 'https://exmaple.com'});
    // should has css and no undefined value
    let test = (!css.match(/undefined/)) && !!css;
    assert.strictEqual(true,test);
  });
});
