/* global describe,it */

const assert = require('assert');
const isSupported = require('./index');

// two items in group 1 with swatch
const data1 = {
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
        title: 'product 2',
        variants: [
          {id:3, option1: 'large', price:33},
          {id:4, option1: 'small', price:33},
        ],
      }
    ],
  ]
};

// two items in group 1 without swatch
const data2 = {
  token: '123',
  products: [
    [
      {
        pNum: 1,
        images: [
          {src: '444'}
        ],
        title: 'product 1',
        variants: [
          {id:4, option1: 'large', price:33},
          {id:5, option1: 'small', price:33},
        ],
      },

      {
        pNum: 2,
        images: [
          {src: '555'}
        ],
        title: 'product 2',
        variants: [
          {id:3, option1: 'large', price:33},
          {id:4, option1: 'small', price:33},
        ],
      }
    ],
  ]
};


//double nested products

const data3 = {
  token: '123',
  products: [
    [
      [
        {
          pNum: 1,
          images: [
            {src: '444'}
          ],
          title: 'product 1',
          variants: [
            {id:4, option1: 'large', price:33},
            {id:5, option1: 'small', price:33},
          ],
        },

        {
          pNum: 2,
          images: [
            {src: '555'}
          ],
          title: 'product 2',
          variants: [
            {id:3, option1: 'large', price:33},
            {id:4, option1: 'small', price:33},
          ],
        }
      ]
    ],
  ]
};


describe('is dynamic html supported', function () {
  it('should return true for single group of swatch grouped products', function () {
    let supported = isSupported(data1);
    assert.strictEqual(supported, true);

  });
  it('should return false if swatch is missing', function () {
    let supported = isSupported(data2);
    assert.strictEqual(supported, false);

  });
  it('should return false if it has double nested array', function () {
    let supported = isSupported(data3);
    assert.strictEqual(supported, false);

  });
});
