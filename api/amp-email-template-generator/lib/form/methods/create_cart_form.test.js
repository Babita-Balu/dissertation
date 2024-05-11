/* global describe,it */

const assert = require('assert');
const createCartForm = require('./create_cart_form');
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
        id: 4
      },
      {
        id: 5
      },
    ],

    pNum: 1,
  }]};
const nestedData = {
  products: [
    [
      {
        title: 'test123',
        images: [
          {src: 'xxx'}
        ],
        variants: [
          {
            id: 4
          },
          {
            id: 5
          },
        ],
        pNum: 1,
      }
    ],
    [
      [
        {
          title: 'test456',
          images: [
            {src: 'yyy'}
          ],
          variants: [
            {
              id: 1
            },
            {
              id: 2
            },
          ],
          pNum: 2,
        }
      ],
      [
        {
          title: 'test456',
          images: [
            {src: 'yyy'}
          ],
          variants: [
            {
              id: 1
            },
            {
              id: 2
            },
          ],
          pNum: 3,
        }
      ],
    ],
  ]
};

describe('create cart form', function () {
  it('should include input for p1 variant id user chooses', function () {
    let html = createCartForm(data, {cartLayout: 'default'});
    let find = !!html.match(/name="p1"/);
    assert.strictEqual(find,true);
  });
  it('should fallback to heroku xhr link if legacymode is on', function () {
    let html = createCartForm(data, {cartLayout: 'default', useLegacyMode: true});
    let find = !!html.match(/action-xhr="https:\/\/skipify-staging-1\.herokuapp\.com\/amp\/button"/);
    assert.strictEqual(find,true);
  });
  it('should include inputs for p1 - p3 variant id for nested product data', function () {
    let html = createCartForm(nestedData, {cartLayout: 'default'});
    let find = !!html.match(/name="p1"/);
    let find2 = !!html.match(/name="p2"/);
    let find3 = !!html.match(/name="p3"/);
    assert.strictEqual(find,true);
    assert.strictEqual(find2,true);
    assert.strictEqual(find3,true);
  });
  it('should include input for p1 option1 for future uses', function () {
    let html = createCartForm(data, {cartLayout: 'default'});
    let find = !!html.match(/name="p1_option1"/);
    assert.strictEqual(find,true);
  });
  it('should include input token with value provided', function () {
    let html = createCartForm(data, {cartLayout: 'default'});
    let find = !!html.match(/name="token" value="123"/);
    assert.strictEqual(find,true);
  });
  it('should include input t for tracking purpose', function () {
    let html = createCartForm(data, {cartLayout: 'default'});
    let find = !!html.match(/name="t"/);
    assert.strictEqual(find,true);
  });


  describe('cartLayout setting', function () {
    it('should return empty string if cartLayout is set to none', function () {
      let html = createCartForm(data, {cartLayout: 'none'});
      assert.strictEqual(html,'');
    });
    it('should not return empty string if cartLayout is set to minimal', function () {
      let html = createCartForm(data, {cartLayout: 'minimal'});
      assert.notStrictEqual(html, '');
    });
    it('default and minimal should has the same html form inputs', function () {
      let html = createCartForm(data, {cartLayout: 'default'});
      let html2 = createCartForm(data, {cartLayout: 'minimal'});
      assert.notStrictEqual(html, html2);
    });
  });

});
