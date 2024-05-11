const createCss = require('./methods/create_css');
const createScripts = require('./methods/create_scripts');
const createLocalStates = require('./methods/create_local_states');
const createProducts = require('./methods/create_products');
const createCheckoutButton = require('./methods/create_checkout_btn');
const createTemplates = require('./methods/create_templates');
const createCartForm = require('./methods/create_cart_form');


module.exports = (data, options) => {

  let components = {
    scripts: createScripts(options),
    css: createCss(options),
    templates: createTemplates(data, options), // required by cart  put it somewhere before cart
    states: createLocalStates(data, options), // required by cart, put it somewhere before cart
    products: createProducts(data, options).split('<!-- DIVIDER -->'),
    checkoutButton: createCheckoutButton(data, options),
    cart: createCartForm(data, options),
  };

  if (options.cartLayout === 'minimal'){
    components.checkoutButton = '';
    // in minimal cart layout, empty cart button and buy with 1-touch merged into one html element
    components.cart = `
      <div style="min-height: 100px;">
      ${createCheckoutButton(data, options)}
      ${createCartForm(data, options)}
      </div>
    `;
  }

  return components;
};