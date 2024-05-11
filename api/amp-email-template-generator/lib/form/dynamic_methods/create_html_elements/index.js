const createBuyBtns  = require('./create_buy_btns');

const createOptionInputs = require('./create_option_inputs');

const createOptionLabels = require('./create_option_labels');

const createPrice = require('./create_prices');

const createProductTitle = require('./create_product_title');

const createProductImage = require('./create_product_image');

const createSwatchLabels = require('./create_swatch_labels');

const createSwatchInputs = require('./create_swatch_inputs');

const createDynamicFallbackSwitch = require('./create_dynamic_fallback_switch');

const creatSingleProduct = (product, {groupNum=1, token, options} = {}) =>{
  let {productStyle = ''} = options;

  return `
<div class="sk-blk">
<!-- START OF PRODUCT GROUP ${groupNum} -->
${createDynamicFallbackSwitch(groupNum)}
  <div class="fallback">REPLACE THIS: PRODUCT GROUP ${groupNum} FALLBACK CONTENT</div>
  <div class="dynamic" style="display: none">   
  ${createOptionInputs(product)}
  <div class="pd-group-wrapper ${productStyle}">
  <div class="left">
  ${createProductImage(product)}
  </div>
  <div class="right">
  ${createProductTitle(product)}
  ${createPrice(product)}
  ${createOptionLabels(product)}
  ${createBuyBtns(product, {token, ...options})}
  </div>
  </div>
<!-- END OF PRODUCT GROUP ${groupNum} -->
`;
};


const createProductGroupWithSwatch = (productGroup, {options, token, groupNum= 1} = {}) =>{
  let {productStyle = ''} = options;
  return `
<!-- START OF PRODUCT GROUP ${groupNum} -->
<div class="sk-blk">
${createDynamicFallbackSwitch(groupNum)}
<div class="fallback">REPLACE THIS: PRODUCT GROUP ${groupNum} FALLBACK CONTENT</div>
<div class="dynamic" style="display: none">    
  ${createSwatchInputs(productGroup, {groupNum})}
    ${productGroup.map(product=>{
    return `
${createOptionInputs(product)}  
  `;
  }).join('')}    
  
  <div class="pd-group-wrapper ${productStyle}">
  <div class="left">
    ${productGroup.map(product=>{
    return `
<div class="p${product.pNum}-part sk-part sk-hide">
${createProductImage(product)}
  </div>
  
  `;
  }).join('')}
</div>
  <div class="right">
    ${productGroup.map(product=>{
    return `
<div class="p${product.pNum}-part sk-part sk-hide">
${createProductTitle(product)}
${createPrice(product)}
  </div>
  
  `;
  }).join('')}
  ${createSwatchLabels(productGroup)}
  ${productGroup.map(product=>{
    return `
<div class="p${product.pNum}-part sk-part sk-hide">
${createOptionLabels(product)}
${createBuyBtns(product, {token, ...options})}
  </div>
`;
  }).join('')}
</div>
  
  </div>  
    



</div>
</div>
<!-- END OF PRODUCT GROUP ${groupNum} -->  
`;
};



module.exports = (data, options)=>{
//language=html
  let html = `
`;
  let {products, token} = data;

  if (products.length === 0) {
    throw new Error('No products found');
  }
  let htmls = [];

  //loop through groups of product, each group can be either a list of products grouped by color swatches or just a
  //single product;  they require different html structure so it's written separately

  products.forEach((productGroup,index)=>{
    let groupNum = index + 1;
    if (Array.isArray(productGroup)) {
      //a group of products. use swatches

      htmls.push(createProductGroupWithSwatch(productGroup, {options, token, groupNum}));


    }  else {
      //just a single product, no swatches

      htmls.push(creatSingleProduct(productGroup, {options, token, groupNum}));


    }

  });


  html = html + `${htmls.join('\n<!-- DIVIDER -->\n')}`;


  //language=html
  html = html + `
  `;


  return html;


};