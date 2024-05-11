/* global describe,it */
const createTemplates = require('./create_templates');
const assert = require('assert');
const data = {products: [{
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
  token: '123',
  pNum: 5,
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
        pNum: 5,
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
          pNum: 6,
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
          pNum: 7,
        }
      ],
    ],
  ]
};

describe('create templates', function () {
  it('should return templates strings with correct opening comment', function () {
    let html = createTemplates(data, {cartLayout: 'default'});
    let find = !!html.match(/<!--START OF SKIPIFY SHOPPABLE TEMPLATES-->/);
    assert.strictEqual(find, true);
  });

  it('should return templates strings with correct closing comment', function () {
    let html = createTemplates(data, {cartLayout: 'default'});
    let find = !!html.match(/<!--END OF SKIPIFY SHOPPABLE TEMPLATES-->/);
    assert.strictEqual(find, true);
  });

  it('should return templates strings for p5 (pNum:5) on item list', function () {
    let html = createTemplates(data, {cartLayout: 'default'});
    let find = !!html.match(/{{#items\.p5}}/);
    assert.strictEqual(find, true);
  });

  it('should return templates strings for both p5 - p7 on item list for double nested data', function () {
    let html = createTemplates(nestedData, {cartLayout: 'default'});
    let find = !!html.match(/{{#items\.p5}}/);
    let find2 = !!html.match(/{{#items\.p6}}/);
    let find3 = !!html.match(/{{#items\.p7}}/);
    assert.strictEqual(find, true);
    assert.strictEqual(find2, true);
    assert.strictEqual(find3, true);
  });

  describe('cartLayout setting', function () {
    it('should display total price on buy button', function () {
      let html = createTemplates(data, {cartLayout: 'minimal'});
      let find = !!html.match(/\(&#36;{{total}}\)/);
      assert.strictEqual(find, true);
    });

    it('should not have an item list in cart if cartLayout is set to minimal', function () {
      let html = createTemplates(data, {cartLayout: 'minimal'});
      let find = !!html.match(/sk-thumb/);
      assert.strictEqual(find, false);
    });

    it('should display total price on top of buy button if cartLayout is set to none', function () {
      let html = createTemplates(data, {cartLayout: 'none'});
      let find = !!html.match(/Total: <\/span><span >&#36;{{total}}<\/span>/);
      assert.strictEqual(find, true);
    });

    it('should not have a cart if cartLayout is set to none', function () {
      let html = createTemplates(data, {cartLayout: 'none'});
      let find = !!html.match(/sk-thumb/);
      assert.strictEqual(find, false);
    });
  });


});
