const createDefaultBtn = require('./create_default_btn');
const createDefaultTotal = require('./create_default_total');
const createDynamicBtn = require('./create_dynamic_btn');

module.exports = (product, options) => {

  //min height to prevent height of parent dom changes when loading new buttons
  return `
<div class="sk-no-cart-checkout">
${createDefaultTotal(product)}  
${createDefaultBtn(product, options)}
${createDynamicBtn(product, options)}
</div>
`;
};