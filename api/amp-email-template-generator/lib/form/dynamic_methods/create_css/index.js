const createActiveOptionLabels = require('./carete_active_option_labels');
const createPrices = require('./create_prices');
const createBuyBtns = require('./create_buy_btns');
const createDynamicFallbackSwitch = require('./create_dynamic_fallback_switch');
const createBaseCss = require('./create_base_css');
const createActiveSwatches = require('./create_active_swatches');

const createSingleProductCss = (product) =>{
  return `
${createActiveOptionLabels(product)}
${createPrices(product)}
${createBuyBtns(product)} 
`;
};

const createProductGroupCss = (productGroup, {groupNum = 1} = {}) => {
  return `
${createActiveSwatches(productGroup)}
${
  productGroup.map(p=>{
    return createSingleProductCss(p);
  }).join('')
}
${createDynamicFallbackSwitch(groupNum)}
`;
};

module.exports = (data, options)=>{
  let {customHtmlCss} = options;
  let css = `${createBaseCss()}`;
  let cssArr = [];
  let {products} = data;
  if (products.length === 0) {
    throw new Error('No products found');
  }
  products.forEach((productGroup,index)=>{
    let groupNum = index + 1;
    if (Array.isArray(productGroup)) {
      //a group of products. use swatches

      cssArr.push(createProductGroupCss(productGroup, {groupNum}));

    }  else {
      //just a single product, no swatches

      let product = productGroup;
      cssArr.push(createSingleProductCss(product));
      cssArr.push(createDynamicFallbackSwitch(groupNum));

    }
  });

  css = `
/** START SKIPIFY CSS **/
${css}
${cssArr.join('\n')}
${customHtmlCss = ''}
/** END SKIPIFY CSS **/
  `;


  return css;


};