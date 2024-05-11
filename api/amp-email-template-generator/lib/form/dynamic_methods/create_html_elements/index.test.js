/* global describe,it */

const assert = require('assert');
const createHtml = require('./index');

const defaultOptions = require('../../../../test-data/default-options');


//group of products with swatch
const data = {
  token: '123',
  products: [
    [
      {
        pNum: 1,
        swatch: {
          image: {
            src:'123',
          }
        },
        images: [
          {src: '444'}
        ],
        title: 'product 1',
        url : 'https://example.com',
        variants: [
          {id:4, option1: 'large', price:33},
          {id:5, option1: 'small', price:33},
        ],
      },

      {
        pNum: 2,
        swatch: {
          image: {
            src:'456',
          }
        },
        images: [
          {src: '555'}
        ],
        url : 'https://example.com',

        title: 'product 2',
        variants: [
          {id:3, option1: 'large', price:33},
          {id:4, option1: 'small', price:33},
        ],
      }
    ],
  ]
};

//single product no swatch
const data2 = {
  token: '123',
  products: [
    {
      pNum: 1,
      title: 'product 2',
      url : 'https://example.com',
      variants: [
        {id: 123, price:33, option1: 'large'}
      ],
      images: [
        {src: '555'}
      ],
    },
  ]
};

describe('create html elements for dynamic html', function () {
  it('should create html without error', function () {
    let html = createHtml(data, {...defaultOptions, purchaseLink: 'https://exmaple.com'});
    // should has html and no undefined value
    let test = (!html.match(/undefined/)) && !!html;
    assert.strictEqual(true,test);

  });
  it('should create html without error for single product no swatch', function () {
    let html = createHtml(data2, {...defaultOptions, purchaseLink: 'https://exmaple.com'});
    // should has html and no undefined value

    let test = (!html.match(/undefined/)) && !!html;
    assert.strictEqual(true,test);
  });


  it('should include product compact css class if email is configured with it', function (){
    let html = createHtml(data, {...defaultOptions, purchaseLink: 'https://example.com', productStyle: 'product-compact'});
    let html2 = createHtml(data, {...defaultOptions, purchaseLink: 'https://example.com'});
    assert.strictEqual(!!html.match(/product-compact"/), true);
    assert.strictEqual(!!html2.match(/product-compact"/), false);
  });
});
