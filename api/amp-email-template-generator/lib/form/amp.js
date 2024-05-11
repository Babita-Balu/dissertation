const createCss = require('./methods/create_css');
const createScripts = require('./methods/create_scripts');
const createLocalStates = require('./methods/create_local_states');
const createProducts = require('./methods/create_products');
const createCheckoutButton = require('./methods/create_checkout_btn');
const createTemplates = require('./methods/create_templates');
const createCartFrom = require('./methods/create_cart_form');

const header = (options) => `
<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ${createScripts(options)}
  <style amp4email-boilerplate>body {
      visibility: hidden
  }</style>
  <style amp-custom>
      ${createCss(options)}
  </style>

</head>
`;

const body = (data, options) => {
  //

  let checkoutCartGroup = `
  ${createCheckoutButton(data, options)}
  `;

  if (options.cartLayout === 'minimal') {
    checkoutCartGroup = `
  <div style="min-height: 100px;">
  ${createCheckoutButton(data, options)}
  </div>
  `;
  }

  // ${createCartFrom(data, options)}


  return `
  <body>
  <div class="sk_wrapper sk-blk">
  <!--START SKIPIFY DYNAMIC -->
  ${createTemplates(data, options)}
  ${createLocalStates(data, options)}
  <div data-amp-bind-class='(!cart.visible ? "show":"sk-hide-desktop") + " sk-blk"' class="sk-blk">
  ${createProducts(data, options)}
  </div>
  ${checkoutCartGroup}
  <!--END SKIPIFY DYNAMIC-->

  </div>
  </body>
  `;
};

const footer = `
</html>`;

module.exports = (data, options = {}) => {
  return header(options) + body(data, options) + footer;
};