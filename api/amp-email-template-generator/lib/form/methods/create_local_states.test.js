/* global describe,it */

const assert = require('assert');
const createLocalStates = require('./create_local_states');
const data = {
  purchaseLink: 'https://example.com',
  token: '123',
  products: [{
    title: 'test123',
    images: [
      {src: 'xxx'}
    ],
    variants: [
      {
        id: 4,
        price:99,
        option1: 'test123',
      }
    ],
    pNum: 1,
  }]};
const nestedData = {
  token: '123',
  products: [
    [
      {
        title: 'test123',
        images: [
          {src: 'xxx'}
        ],
        swatch: {
          image: {src: 'yyy'}
        },
        variants: [
          {
            id: 4,
            price:99,
          },
          {
            id: 5,
            price:199,
          },
        ],
        pNum: 1,
      }
    ],
    [
      {
        title: 'test456',
        images: [
          {src: 'yyy'}
        ],
        swatch: {
          image: {src: 'yyy'}
        },
        variants: [
          {
            id: 1,
            price:299,
          },
          {
            id: 2,
            price:399,
          },
        ],
        pNum: 2,
      },
      {
        title: 'test456',
        images: [
          {src: 'yyy'}
        ],
        swatch: {
          image: {src: 'yyy'}
        },
        variants: [
          {
            id: 1,
            price:299,
          },
          {
            id: 2,
            price:399,
          },
        ],
        pNum: 3,
      }
    ],
  ]
};
const doubleNestedData = {
  token: '123',
  products: [
    [
      [ {
        title: 'test123',
        images: [
          {src: 'xxx'}
        ],
        swatch: {
          image: {src: 'yyy'}
        },
        variants: [
          {
            id: 4,
            price:99,
          },
          {
            id: 5,
            price:199,
          },
        ],
        pNum: 1,
      }]
    ],
    [
      [ {
        title: 'test456',
        images: [
          {src: 'yyy'}
        ],
        swatch: {
          image: {src: 'yyy'}
        },
        variants: [
          {
            id: 1111,
            price:299,
          },
          {
            id: 2222,
            price:399,
          },
        ],
        pNum: 2,
      }],
      [ {
        title: 'test456',
        images: [
          {src: 'yyy'}
        ],
        swatch: {
          image: {src: 'yyy'}
        },
        variants: [
          {
            id: 5555,
            price:299,
          },
          {
            id: 6666,
            price:399,
          },
        ],
        pNum: 3,
      }]
    ],
  ]
};

describe('create local states ', function () {
  it('should include opening and closing tags', function () {
    let html = createLocalStates(data, {});
    let start = html.match(/START OF SKIPIFY SHOPPABLE AMP STATES/);
    let end = html.match(/END OF SKIPIFY SHOPPABLE AMP STATES/);
    assert.strictEqual(start.length,1);
    assert.strictEqual(end.length, 1);
  });
  it('should include initial quantity as 1 for all products', function () {
    let html = createLocalStates(nestedData, {});
    let html2 = createLocalStates(doubleNestedData, {});
    let p1 = html.match(/p1_qty": 1/);
    let p2 = html.match(/p2_qty": 1/);
    let p3 = html.match(/p3_qty": 1/);
    let p1_2 = html2.match(/p1_qty": 1/);
    let p2_2 = html2.match(/p2_qty": 1/);
    let p3_2 = html2.match(/p3_qty": 1/);
    assert.strictEqual(p1.length,1);
    assert.strictEqual(p2.length,1);
    assert.strictEqual(p3.length,1);
    assert.strictEqual(p1_2.length,1);
    assert.strictEqual(p2_2.length,1);
    assert.strictEqual(p3_2.length,1);
  });
  it('should create default candidate state if button style is selected', function () {
    let html = createLocalStates(data, {option1Style: 'button'});
    let html2 = createLocalStates(nestedData, {option1Style: 'button'});
    let html3 = createLocalStates(doubleNestedData, {option1Style: 'button'});
    let find = !!html.match(/<amp-state id="p1_candidate"><script type="application\/json"> {"id":4} {2}<\/script><\/amp-state>/);
    let find2 = !!html2.match(/<amp-state id="p2_candidate"><script type="application\/json"> {"id":1} {2}<\/script><\/amp-state>/);
    let find3 = !!html3.match(/<amp-state id="p3_candidate"><script type="application\/json"> {"id":5555} {2}<\/script><\/amp-state>/);
    assert.strictEqual(find, true);
    assert.strictEqual(find2, true);
    assert.strictEqual(find3, true);
  });
});
