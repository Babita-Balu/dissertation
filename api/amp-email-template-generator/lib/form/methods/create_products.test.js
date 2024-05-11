/* global describe,it */

const _ = require('lodash');
const assert = require('assert');
const createProducts = require('./create_products');
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
        pNum: 2,
      }
    ],
  ]
};

describe('create products methods', function () {
  it('should fallback to heroku json src if legacy mode is on', function () {
    let html = createProducts(nestedData, {cartLayout: 'default', useLegacyMode: true});
    let find = !!html.match(/src="https:\/\/skipify-staging-1\.herokuapp\.com\/amp\/123.json"/);
    assert.strictEqual(find,true);
  });
  it('should uses different style class if productStyle compact is set', function () {
    let html = createProducts(nestedData, {cartLayout: 'default', productStyle: 'product-compact'});
    let html2 = createProducts(nestedData, {cartLayout: 'default'});
    let find = !!html.match(/sk-pd-compact/);
    let find2 = !!html2.match(/sk-pd-compact/);
    assert.strictEqual(find,true);
    assert.strictEqual(find2,false);
  });
  it('should include opening comments for group 1', function () {
    let html = createProducts(data, {cartLayout: 'default'});
    let find = !!html.match(/<!-- START OF PRODUCT GROUP 1 -->/);
    let find2 = !!html.match(/<!-- START OF PRODUCT GROUP 2 -->/);
    assert.strictEqual(find,true);
    assert.strictEqual(find2,false);
  });
  it('should include opening comments for group 1 and group 2 for data with 2 items in base array', function () {
    let html = createProducts(nestedData, {cartLayout: 'default', useCarousel: false});
    let find = !!html.match(/<!-- START OF PRODUCT GROUP 1 -->/);
    let find2 = !!html.match(/<!-- START OF PRODUCT GROUP 2 -->/);
    assert.strictEqual(find,true);
    assert.strictEqual(find2,true);
  });
  it('should just print the option if that is the only option for the product ', function () {
    let html = createProducts(data, {cartLayout: 'default', useCarousel: false});
    let find = !!html.match(/<div class="sk-opt1"><\/div><div class="sk-txt2">test123<\/div>/);
    assert.strictEqual(find,true);
    html = createProducts(data, {cartLayout: 'default', option1Style: 'button'});
    let find2 = !!html.match(/<div class="sk-opt1"><div class="sk-opt-btn sk-active">test123<\/div><\/div>/);
    assert.strictEqual(find2,true);
  });
  describe('quantityStyle', function () {
    it('quantity should limit to 10 if quantityStyle is set to dropdown', function () {
      let html = createProducts(nestedData, {cartLayout: 'default', quantityStyle: 'dropdown'});
      let find = !!html.match(/data-amp-bind-disabled='cart\.p1_qty >= 10/);
      assert.strictEqual(find,true);
    });
    it('quantity should limit to user choices if maxQuantity is set in product data', function () {
      let modifiedData = _.cloneDeep(data);
      modifiedData.products[0].maxQuantity = 5;

      let html = createProducts(modifiedData, {cartLayout: 'default', quantityStyle: 'dropdown'});
      let find = !!html.match(/data-amp-bind-disabled='cart\.p1_qty >= 5/);
      assert.strictEqual(find,true);
    });

    it('should include opening comments for group 1 and group 2 for data with 2 items in base array', function () {
      let html = createProducts(nestedData, {cartLayout: 'default', useCarousel: false});
      let find = !!html.match(/<!-- START OF PRODUCT GROUP 1 -->/);
      let find2 = !!html.match(/<!-- START OF PRODUCT GROUP 2 -->/);
      assert.strictEqual(find,true);
      assert.strictEqual(find2,true);
    });
  });
  describe('option1Style', function () {
    it('should include disabled checkout button if option1Style is default', function () {
      let html = createProducts(nestedData, {cartLayout: 'default'});
      let find = !!html.match(/class="disabled/);
      assert.strictEqual(find,true);
    });
    it('should include has no disabled checkout button if option1Style is set to button', function () {
      // when option1 (size etc) is set to button style, one of the button is always selected
      let html = createProducts(nestedData, {cartLayout: 'default', option1Style: 'button'});
      let find = !!html.match(/class="disabled/);
      assert.strictEqual(find,false);
    });
  });
  describe('useCarousel', function () {
    it('should include amp-carousel tags if useCarousel is set to true', function () {
      let html = createProducts(nestedData, {cartLayout: 'default',  useCarousel: true});
      let find = !!html.match(/<amp-carousel/);
      let find2 = !!html.match(/\/amp-carousel/);
      assert.strictEqual(find,true);
      assert.strictEqual(find2,true);
    });
    it('should not include amp-carousel tags if useCarousel is set to false', function () {
      let html = createProducts(nestedData, {cartLayout: 'default',  useCarousel: false});
      let find = !!html.match(/<amp-carousel/);
      let find2 = !!html.match(/\/amp-carousel/);
      assert.strictEqual(find,false);
      assert.strictEqual(find2,false);
    });
  });
  
  describe('cartLayout', function (){
    it('should submit the form when change quantities when there is no cart', function () {
      let html = createProducts(nestedData, {cartLayout: 'none',  useCarousel: false});
      let html2 = createProducts(nestedData, {cartLayout: 'default',  useCarousel: false});
      let find = !!html.match(/change: AMP\.setState\({cart: {p1: event\.value, p1_btn_loaded: true}}\),skipify-cart-form-p1\.submit/);
      let find2 = !!html2.match(/change: AMP\.setState\({cart: {p1_qty: event\.value, p1_btn_loaded: true}}\),skipify-cart-form-p1\.submit/);
      assert.strictEqual(find, true);
      assert.strictEqual(find2, false);
    });
  });


});
